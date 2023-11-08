import mongoose, { Schema, model } from "mongoose";
import mongooseDelete from "mongoose-delete";
import { INotification } from "./interface";

const notificationSchema = new Schema<INotification>(
    {
        receiveUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: { type: String, required: true }, 
    }
)

notificationSchema.plugin(mongooseDelete, { overrideMethods: 'all' });

const Notification = model<INotification>('Notification', notificationSchema);
export default Notification;