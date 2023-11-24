import { Blog, User } from "../../database/models";
import { isActiveEnum, statusBlogEnum } from "../../database/models/enum";
import { myCustomLabels } from "../../constant";
import { userService } from "../user";

class blogService {
    constructor() {
    }
    async checkUserBlockPosting(userId) {
        const user = await User.findById(userId);
        if (user?.isActive === isActiveEnum.BLOCKPOSTING) {
            return true;
        }
        return false;
    }
    async getAllBlogs(page=1,limit=1000, title, content, category) {
        const options = {
            page,
            limit,
            search: { title, content, category },
            populate: { path: 'userId category' , select:'_id firstName lastName email gender phone dayOfBirth profileImage isActive roleName createdAt updatedAt name slug status' },
            sort: { createdAt: -1 },
            myCustomLabels,
        };
        const query:any = {
            deleted: false,
            status: statusBlogEnum.APPROVED,
          };
        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }
        if (content) {
            query.content = { $regex: content, $options: 'i' };
        }
        if (category) {
            query.category = category;
        }
        return await Blog.paginate(query, options, function (err, result) {
            if (err)
            throw new Error('Error');
            return result;
        });
    }
    async createBlogByIdUser(userId, body) {
        console.log("aaaa" + userId);
        
        if ( !this.checkUserBlockPosting(userId) ) {
            throw new Error('User is blocked posting');
        }
        const blog = new Blog( {
            userId: userId,
            title: body.title,
            category: body.category,
            content: body.content,
            blogImage: body.blogImages,
            status: statusBlogEnum.PENDING,
        })
        const blogCreated = await Blog.create(blog);
        return blogCreated;
    }
    async updateBlogByIdUser(userId, id, body) {
            const blog = await Blog.findOne({ _id: id, deleted: false, status: statusBlogEnum.APPROVED });
            if (body.reaction) {
                // check user is reaction
                const index = blog.reaction.findIndex((item) => item.userId == userId);
                if (index !== -1) {
                    // check like or dislike
                    if (blog.reaction[index].reaction == body.reaction)
                    {
                        blog.reaction.splice(index, 1);
                    } else {
                        blog.reaction[index].reaction = body.reaction;
                    }
                } else {
                blog.reaction.push({
                    userId: userId,
                    reaction: body.reaction,
                });
            } 
            return await blog.save();
            }
            if (!blog) {
                throw new Error('Blog not found or not approved.');
            }
            if (blog.userId.toString() == userId || await userService.isAdmin(userId)) {
                if (body.title) {
                    blog.title = body.title;
                }
        
                if (body.content) {
                    blog.content = body.content;
                }
        
                if (body.blogImage) {
                    blog.blogImage = body.blogImage;
                }
        
                // if (body.reaction) {
                //     // check user is reaction
                //     const index = blog.reaction.findIndex((item) => item.userId == userId);
                //     if (index !== -1) {
                //         // check like or dislike
                //         if (blog.reaction[index].reaction == body.reaction)
                //         {
                //             blog.reaction.splice(index, 1);
                //         } else {
                //             blog.reaction[index].reaction = body.reaction;
                //         }
                //     } else {
                //     blog.reaction.push({
                //         userId: userId,
                //         reaction: body.reaction,
                //     });
                // }
                // }
                const updatedBlog = await blog.save();
                return updatedBlog;
            } else {
                throw new Error('User is not owner of blog');
            }
    }
    
    async getBlogAwaitingApproval(page=1,limit=1000) {
        const options = {
            page,
            limit,
            populate: { path: 'userId category' , select:'_id firstName lastName email gender phone dayOfBirth profileImage isActive roleName createdAt updatedAt name slug status' },
            sort: { createdAt: -1 },
            myCustomLabels,
        };
        return await Blog.paginate({ deleted: false, status: statusBlogEnum.PENDING }, options, function (err, result) {
            if (err) throw new Error('Error');
            return result;
        });
    }
    async approvedOrRejectBlog(id, status) {
        const blog = await Blog.findById(id);
        if (!blog) {
            throw new Error('Blog not found');
        }
        
        blog.status = statusBlogEnum[status];
        const blogUpdated = await blog.save();
        return blogUpdated;
    }
    async getNewestBlog(limit=100000, page=1) {
        const options = {
            page,
            limit,
            populate: { path: 'userId category' , select:'_id firstName lastName email gender phone dayOfBirth profileImage isActive roleName createdAt updatedAt name slug status' },
            sort: { createdAt: -1 },
            myCustomLabels,
        };
        console.log(options);
        
        return await Blog.paginate({ deleted: false, status: statusBlogEnum.APPROVED }, options, function (err, result) {
            if (err) throw new Error('Error');
            return result;
        })  
    }
    async getPopularBlog(page = 1, limit = 5) {
        try {
          const options = {
            page,
            limit,
            populate: {
              path: 'userId category',
              select: '_id firstName lastName email gender phone dayOfBirth profileImage isActive roleName createdAt updatedAt name slug status',
            },
            sort: {
              reactionCount: -1, // Sort in descending order based on the "reactionCount" field
            },
          };
      
          const query = {
            deleted: false,
            status: statusBlogEnum.APPROVED,
          };
          const result = await Blog.paginate(query, options);
          return result;
        } catch (error:any) {
          throw new Error(error.message);
        }
      }
    async getBlogById(id) {
        const blog = await Blog.findById(id).populate({ path: 'userId category' , select:'_id firstName lastName email gender phone dayOfBirth profileImage isActive roleName createdAt updatedAt name slug status' })
        if (!blog) {
            throw new Error('Blog not found');
        }
        return blog;
    }
    async deleteBlogByIdUser(userId, id) {
        const blog = await Blog.findOne({ _id: id, deleted: false });
        if (!blog) {
            throw new Error('Blog not found');
        }
        if (blog.userId.toString() == userId || await userService.isAdmin(userId)) {
            return await Blog.delete();
        } else {
            throw new Error('User is not owner of blog');
        }
    }
}

export default new blogService();