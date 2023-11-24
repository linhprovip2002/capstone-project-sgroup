import { Document } from "mongoose";
import { SoftDeleteDocument } from 'mongoose-delete';
export default interface ICategory extends Document,SoftDeleteDocument {
    name: string;
    slug: string;
    description: string;
    status: string;
    createdAt: Date;
    updateAt: Date;
    parentId: object;
}