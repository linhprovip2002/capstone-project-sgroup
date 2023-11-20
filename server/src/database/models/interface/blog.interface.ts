import { Document } from 'mongoose';
import { SoftDeleteDocument } from 'mongoose-delete';
interface IBlog extends Document,SoftDeleteDocument {
    userId: object;
    category:object;
    title: string;
    content: string;
    blogImage: string[];
    reactionCount: number;
    status: string;
    reaction: [
        {
        userId: object;
        reaction: string;
        }
    ];
    createdAt: Date;
    updateAt: Date;
}
export default IBlog;