import { Blog } from "../../database/models";
import { statusBlogEnum } from "../../database/models/enum";
class blogService {
    constructor() {
    }
    async getAllBlogs(page,limit) {
        const skipCount = (page - 1) * limit;
        const blogs = await Blog.find({deleted: false, status: statusBlogEnum.APPROVED}).populate({ path: 'userId', select: 'name'}).limit(limit).skip(skipCount);
        return blogs;
    }
    async createBlogByIdUser(userId, blog) {
        const blogCreated = await Blog.create({ ...blog, userId });
        return blogCreated;
    }
    async updateBlogByIdUser(userId, id, blog) {
        const blogUpdated = await Blog.findOneAndUpdate({ _id: id, userId }, blog, { new: true });
        return blogUpdated;
    }
}

export default new blogService();