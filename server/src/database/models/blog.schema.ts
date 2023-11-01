import { Schema, model } from 'mongoose';
import MongooseDelete, { SoftDeleteModel } from 'mongoose-delete';
import { statusBlogEnum } from './enum';
import { IBlog } from './interface';
import paginate from 'mongoose-paginate-v2';
const blogSchema = new Schema<IBlog>({
   
    userId: { type: Schema.Types.ObjectId, ref: 'User',required: true },
    title: { type : String , required : true },
    content: { type : String , required : true },
    blogImage:[ { type : String , required : true } ],
    status:{ type: String, enum: statusBlogEnum },
    reaction: [
        {
            userId: { type: Schema.Types.ObjectId, ref: 'User',required: true },
            reaction: { type: String, enum: ['like', 'dislike'] },
            
        }
    ],
  } , { timestamps: true} );

blogSchema.plugin(MongooseDelete , { overrideMethods: 'all',   deletedAt : true });
blogSchema.plugin(paginate);
const Blog:SoftDeleteModel = model<IBlog>('Blog', blogSchema);

export default Blog;

