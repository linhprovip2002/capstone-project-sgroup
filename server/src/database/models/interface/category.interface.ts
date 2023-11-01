import { Document } from "mongoose";

export default interface ICategory extends Document {
    name: string;
    slug: string;
    description: string;
    status: string;
    createdAt: Date;
    updateAt: Date;
    parentId: object;
}