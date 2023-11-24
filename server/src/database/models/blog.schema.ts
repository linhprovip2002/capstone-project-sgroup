import { Schema, model } from 'mongoose';
import MongooseDelete, { SoftDeleteModel } from 'mongoose-delete';
import { statusBlogEnum } from './enum';
import { IBlog } from './interface';
import paginate from 'mongoose-paginate-v2';
const blogSchema = new Schema<IBlog>({
   
    userId: { type: Schema.Types.ObjectId, ref: 'User',required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category'},
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
    reactionCount: { type: Number, default: 0 },
  } , { timestamps: true} );

blogSchema.plugin(MongooseDelete , { overrideMethods: 'all',   deletedAt : true });
blogSchema.plugin(paginate);
blogSchema.pre<IBlog>('save', function (next) {
    if( this.reaction.length > 0 ) 
    {
        this.reactionCount = this.reaction.length;
    } else {
        this.reactionCount = 0;
    }
    next();
  });
const Blog:SoftDeleteModel = model<IBlog>('Blog', blogSchema);

export default Blog;

