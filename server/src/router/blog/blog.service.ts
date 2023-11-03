import { Blog, User } from "../../database/models";
import { isActiveEnum, statusBlogEnum } from "../../database/models/enum";
import { myCustomLabels } from "../../constant";
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
    async updateBlogByIdUser(userId, id, blog) {
        try {
            const blogUpdated = await Blog.findOneAndUpdate({ _id: id, userId }, blog, { new: true });
            return blogUpdated;
        } catch (error) {
            throw new Error('You do not have permission to edit this post');
        }
    }
    async getBlogAwaitingApproval(page,limit) {
        if (page === undefined || limit === undefined) {
            return await Blog.paginate({ deleted: false, status: statusBlogEnum.PENDING }, { myCustomLabels });
        }
        return await Blog.paginate({ deleted: false, status: statusBlogEnum.PENDING }, { page, limit, myCustomLabels });
    }
    async approvedOrRejectBlog(id, status) {
        const blog = await Blog.findById(id);
        if (!blog) {
            throw new Error('Blog not found');
        }
        console.log("aaaaaaaaaa" + statusBlogEnum);
        
        blog.status = statusBlogEnum[status];
        const blogUpdated = await blog.save();
        return blogUpdated;
    }
}

export default new blogService();