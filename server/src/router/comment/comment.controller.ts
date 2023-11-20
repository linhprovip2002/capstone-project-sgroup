import { commentService } from './index';
import { HttpResponseBuilder } from '../../middleware/error';
class CommentController {
    constructor() {
    }  
    async getComments(req, res, next) {
        try {
            const blogId  = req.params.blogId;
            const data = await commentService.getCommentsByIdBlog(blogId);
            return HttpResponseBuilder.buildOK(res,data);
        } catch (error:any) {
            error.status = 404;
            next(error);
        }
    }
    async createComment(req, res, next) {

        try {            
            const { blogId } = req.params;
            const  id  = req.userToken.id
            const { content } = req.body;
            console.log("userId",id + "blogId",blogId + "content",content);
            
            const data = await commentService.createComment( id, blogId, content);
            return HttpResponseBuilder.buildCreated(res,data);
        } catch (error) {
            next(error)
        }
    }
    async updateComment(req, res, next) {
        try {
            const { commentId } = req.params;
            const  userId  = req.userToken.id
            const { content } = req.body;
            await commentService.updateComment( userId, commentId, content);
            return HttpResponseBuilder.buildOK(res,{'message':'update comment success'});
        } catch (error) {
            next(error)
        }
    }
    async deleteComment(req, res, next) {
        try {
            const commentId  = req.params;
            const userId = req.userToken.id;
            await commentService.deleteComment(userId, commentId);
            return HttpResponseBuilder.buildOK(res,{commentId});
        } catch (error) {
            next(error)
        }
    }
    async createReply(req, res, next) {
        try {
            const { commentId } = req.params;
            const { content } = req.body;
            const userId = req.userToken.id;
            await commentService.createReply(userId,commentId,content);
            return HttpResponseBuilder.buildOK(res,{message:'create reply success'});
        } catch (error) {
            next(error)
        }
    }
}

export default new CommentController();