import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import { statusBlogEnum } from './enum';

const blogSchema = new mongoose.Schema({
   
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true },
    title: { type : String , required : true },
    content: { type : String , required : true },
    blogImage:[ { type : String , required : true } ],
    status:{ type: String, enum: statusBlogEnum },
    reaction: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true },
            reaction: { type: String, enum: ['like', 'dislike'] },
            
        }
    ],
  } , { timestamps: true} );

blogSchema.plugin(mongooseDelete , { overrideMethods: 'all',   deletedAt : true });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;

