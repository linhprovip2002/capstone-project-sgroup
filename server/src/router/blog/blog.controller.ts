import {blogService} from './index'
import { HttpResponseBuilder } from '../../middleware/error';
class blogController {
    constructor() {
    }
    async getBlogs(req, res, next) {
        try {
            const { page, limit, title, content, category } = req.query;
            page ? page : null;
            limit ? limit : null;
            const blogs = await blogService.getAllBlogs(page,limit, title, content, category);
            return HttpResponseBuilder.buildOK(res, blogs);
        } catch (error:any) {
            error.status = 400;
            next(error);
        }
    }
    async createBlog(req, res, next) {
        try {
            console.log("aaaa create blog");
            
            const userId = req.userToken.id           
            const blog = await blogService.createBlogByIdUser(userId,req.body);
            return HttpResponseBuilder.buildCreated(res, blog);
        } catch (error:any) {
            error.status = 400;
            next(error);
       }
    }
    async updateBlog(req, res, next) {
        try {
            console.log("update aaaaa");
            
            const { id } = req.params;
            const userId = req.userToken.id;
            const blog = await blogService.updateBlogByIdUser(userId,id,req.body);
            return HttpResponseBuilder.buildOK(res, blog);
        } catch (error:any) {
            error.status = 400;
            next(error);
        }
    }
    async getBlogAwaitingApproval(req, res, next) {
        try {
            const { page, limit } = req.query;
            const blogs = await blogService.getBlogAwaitingApproval(page,limit);
            return HttpResponseBuilder.buildOK(res,blogs);
        } catch (error:any) {
            error.status = 404;
            next(error);
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
            error.status = 404;
            next(error);
        }
    }
    async getNewestBlog(req, res, next) {
        try {
            
            const blogs = await blogService.getNewestBlog();
            return HttpResponseBuilder.buildOK(res, blogs);
        } catch (error:any) {
            error.status = 404;
            next(error);
        }
    }
    async getPopularBlog(req, res, next) {
        try {
            const blogs = await blogService.getPopularBlog();
            return HttpResponseBuilder.buildOK(res, blogs);
        } catch (error:any) {
            error.status = 404;
            next(error);
        }
    }
    async getBlogById(req, res, next) {
        try {
            const { id } = req.params;
            const blog = await blogService.getBlogById(id);
            return HttpResponseBuilder.buildOK(res, blog);
        } catch (error:any) {
            next(error);
        }
    }
    async deleteBlog(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.userToken.id;
            const blog = await blogService.deleteBlogByIdUser(userId,id);
            return HttpResponseBuilder.buildOK(res, { message: 'Blog deleted successfully' , blog });
        } catch (error:any) {
            error.status = 400;
            next(error);
        }
    }
}

export default new blogController();