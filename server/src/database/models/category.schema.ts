import mongooseSlugPlugin from 'mongoose-slug-plugin';
import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const categorySchema = new mongoose.Schema({
    name: { type : String , required : true },
    slug: { type : String , slug : "name" , unique : true },
    description: { type : String , required : true },
    status: { type : String , enum : ['active' , 'inactive'] , default : 'active' },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
} , { timestamps: true} );
categorySchema.plugin(mongooseSlugPlugin , { tmpl: '<%=name%>' });
categorySchema.plugin(mongooseDelete , { overrideMethods: 'all',   deletedAt : true });
const Category = mongoose.model('Category', categorySchema);
export default Category;