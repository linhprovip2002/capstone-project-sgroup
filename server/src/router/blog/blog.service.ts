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