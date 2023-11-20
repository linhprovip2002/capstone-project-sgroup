import mongooseSlugPlugin from 'mongoose-slug-plugin';
import mongoose, { Schema, model } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import { ICategory } from './interface';
import pagination from 'mongoose-paginate-v2';

const categorySchema = new Schema<ICategory>({
    name: { type : String , required : true },
    slug: { type : String , slug : "name" , unique : true },
    description: { type : String , required : true },
    status: { type : String , enum : ['active' , 'inactive'] , default : 'active' },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
} , { timestamps: true} );
categorySchema.plugin(mongooseSlugPlugin , { tmpl: '<%=name%>' });
categorySchema.plugin(mongooseDelete , { overrideMethods: 'all',   deletedAt : true });
categorySchema.plugin(pagination);
const Category = model<ICategory>('Category', categorySchema);
export default Category;