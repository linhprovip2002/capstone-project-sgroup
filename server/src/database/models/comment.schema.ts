import mongoose, { Schema, model } from "mongoose";
import mongooseDelete from "mongoose-delete";
import { IComment } from "./interface";
const commentSchema = new Schema<IComment>({
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
const Comment = model<IComment>('Comment', commentSchema);
export default Comment;