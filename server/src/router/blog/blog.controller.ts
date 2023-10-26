import {blogService} from './index'
class blogController {
    constructor() {
    }
    async getBlogs(req, res, next) {
        try {
            const { page, limit } = req.query;
            page ? page : null;
            limit ? limit : null;
            const blogs = await blogService.getAllBlogs(page,limit);
            res.status(200).json(blogs);
        } catch (error) {
            next(error);
        }
    }
    async createBlog(req, res, next) {
        try {
            const userId = req.userToken._id;
            const blog = await blogService.createBlogByIdUser(userId,req.body);
            res.status(200).json(blog);
        } catch (error) {
            next(error);
        }
    }
    async updateBlog(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.userToken._id;
            const blog = await blogService.updateBlogByIdUser(userId,id,req.body);
            res.status(200).json(blog);
        } catch (error) {
            next(error);
        }
    }
}

export default new blogController();