import { Document } from "mongoose";

export default interface INotification extends Document {
    receiveUserId: object;
    content: string;
}