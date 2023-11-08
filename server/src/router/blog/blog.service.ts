import { Blog, User } from "../../database/models";
import { isActiveEnum, statusBlogEnum } from "../../database/models/enum";
import { myCustomLabels } from "../../constant";
import { Category } from "../../database/models";
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
    async getAllBlogs(page,limit) {
        if(page === undefined || limit === undefined)
        {
            return await Blog.find({ deleted: false, status: statusBlogEnum.APPROVED });
        }
        const options = {
            page,
            limit,
            populate: { path: 'userId', select: 'name' },
            sort: { createdAt: -1 },
            myCustomLabels,
        };
        const blogs = await Blog.paginate({ deleted: false, status: statusBlogEnum.APPROVED }, options, function (err, result) {
            if (err)
            throw new Error('Error');
            return result;
        });
        return blogs;
    }
    async createBlogByIdUser(userId, body) {
        console.log("aaaa" + userId);
        
        if ( !this.checkUserBlockPosting(userId) ) {
            throw new Error('User is blocked posting');
        }
        const blog = new Blog( {
            userId: userId,
            title: body.title,
            content: body.content,
            blogImage: body.blogImages,
            status: statusBlogEnum.PENDING,
        })
        const blogCreated = await Blog.create(blog);
        return blogCreated;
    }
    async updateBlogByIdUser(userId, id, body) {
        try {
            if(body.category) {
                body.category = await Category.findById(body.category);
                const blogUpdated = await Blog.findOneAndUpdate({ _id: id, deleted:false }, body, { new: true });
            return blogUpdated;
            } 
            if(body.blogImages) {
                const blogUpdated = await Blog.findOneAndUpdate({ _id: id, deleted:false  }, body, { new: true });
            return blogUpdated;
            }
            if(body.reaction) {
                console.log(body.reaction);
                
                const blog = await Blog.findOne({ _id: id, deleted: false, status: statusBlogEnum.APPROVED});
                console.log(blog);
                
                blog.reaction.push({
                    userId: userId,
                    reaction: body.reaction,
                });
                const updatedBlog = await blog.save();
            return updatedBlog;
            }
        } catch (error:any) {
            throw new Error(error.message);
        }
    }
    async getBlogAwaitingApproval(page,limit) {
        if(page === undefined || limit === undefined)
        {
            return await Blog.find({ deleted: false, status: statusBlogEnum.PENDING });
        }
        return await Blog.paginate({ deleted: false, status: statusBlogEnum.PENDING }, { page, limit, myCustomLabels });
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
    async getNewestBlog() {
        return await Blog.find({ deleted: false, status: statusBlogEnum.APPROVED }).sort({ createdAt: -1 }).limit(5);
    }
    async getPopularBlog() {
        // function get popular blog find follow reaction lenght > 10
        const popularBlogs = await Blog.aggregate([
            {
                $match: {
                    deleted: false,
                    status: statusBlogEnum.APPROVED
                }
            },
            {
                $addFields: {
                    reactionCount: { $size: "$reaction" }
                }
            },
            {
                $match: {
                    reactionCount: { $gt: 1 }
                }
            }
        ]);
    
        return popularBlogs;
    }
}

export default new blogService();