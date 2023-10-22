import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
const commentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true },
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog',required: true },
    content: { type : String , required : true },
    reply: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true },
            content: { type : String , required : true },
        }
    ],
} , { timestamps: true} );
commentSchema.plugin(mongooseDelete , { overrideMethods: 'all',   deletedAt : true });
const Comment = mongoose.model('Comment', commentSchema);
export default Comment;