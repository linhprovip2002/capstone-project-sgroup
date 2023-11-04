import {blogService} from './index'
import { HttpResponseBuilder } from '../../middleware/error';
class blogController {
    constructor() {
    }
    async getBlogs(req, res, next) {
        try {
            const { page, limit } = req.query;
            page ? page : null;
            limit ? limit : null;
            const blogs = await blogService.getAllBlogs(page,limit);
            return HttpResponseBuilder.buildOK(res, blogs);
        } catch (error:any) {
            next(HttpResponseBuilder.buildBadRequest(res,error.message));
        }
    }
    async createBlog(req, res, next) {
        try {
            const userId = req.userToken.id           
            const blog = await blogService.createBlogByIdUser(userId,req.body);
            return HttpResponseBuilder.buildCreated(res, blog);
        } catch (error:any) {
            next(HttpResponseBuilder.buildBadRequest(res,error.message));
       }
    }
    async updateBlog(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.userToken.id;
            console.log(userId);
            const blog = await blogService.updateBlogByIdUser(userId,id,req.body);
            return HttpResponseBuilder.buildOK(res, blog);
        } catch (error:any) {
            next(HttpResponseBuilder.buildBadRequest(res,error.message));
        }
    }
    async getBlogAwaitingApproval(req, res, next) {
        try {
            const { page, limit } = req.query;
            const blogs = await blogService.getBlogAwaitingApproval(page,limit);
            return res.status(200).json(blogs);
        } catch (error:any) {
            next(HttpResponseBuilder.buildBadRequest(res,error.message));
        }
    }
    async approvedOrRejectBlog(req, res, next) {
        try {
            const { id } = req.params;
            const { status} = req.body;
            
            const blog = await blogService.approvedOrRejectBlog(id,status);
            console.log(blog);
            
            return HttpResponseBuilder.buildOK(res,{message: 'Approved or reject blog successfully'});
        } catch (error:any) {
            next(HttpResponseBuilder.buildBadRequest(res,error.message));
        }
    }
}

export default new blogController();