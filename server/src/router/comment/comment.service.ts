import { Comment,User } from '../../database/models';
import { isActiveEnum } from '../../database/models/enum';ww
import { userService } from '../user';
class UserService {
      constructor() {
      }
      getCommentsByIdBlog(blogId) {
            return Comment.find({blogId:blogId}).populate({ path: 'userId' ,  select: 'firstName lastName profileImage' }).populate({ path: 'reply.userId' ,  select: 'firstName lastName profileImage' });
        }  
      createComment(userId,blogId,content) {
            const user = User.findOne({_id:userId});
            if(user.isActive === isActiveEnum.BLOCKCOMMENT) 
            {
                  return new Error('User is blocked comment');
            }
            return Comment.create({userId:userId,blogId:blogId,content:content});
        }  
      async updateComment(userId, commentId, content) {
            const comment: any = await Comment.findById(commentId);
            console.log(comment.userId != userId);
            if( comment.userId == userId || await userService.isAdmin(userId) )
            {
                  return Comment.updateOne({_id:commentId},{$set:{content:content}});
            } else {
                  throw new Error('User is not owner comment');
            }
        }
      async deleteComment(userId, commentId) {
            const comment: any = Comment.findById(commentId);
            if( comment.userId == userId || await userService.isAdmin(userId) )
            {
                  return Comment.deleteOne({commentId});
            } else {
                  throw new Error('User is not owner comment');
            }
      }
      createReply(userId,commentId,content) {
            return Comment.updateOne({_id:commentId},{$push:{reply:{userId:userId,content:content}}});
      }
}
export default new UserService();
