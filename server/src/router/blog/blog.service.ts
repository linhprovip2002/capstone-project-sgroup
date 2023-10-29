import { Blog, User } from "../../database/models";
import { isActiveEnum, statusBlogEnum } from "../../database/models/enum";
import { Pagination } from "../../service";
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
        const blogs = await Blog.find({deleted: false, status: statusBlogEnum.APPROVED}).populate({ path: 'userId', select: 'name'});
        const pagination = new Pagination(blogs,page,limit);
        return pagination.paginationData();
    }
    async createBlogByIdUser(userId, blog) {
        if ( !this.checkUserBlockPosting(userId) ) {
            throw new Error('User is blocked posting');
        }
        const blogCreated = await Blog.create({ ...blog, userId });
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
}

export default new blogService();