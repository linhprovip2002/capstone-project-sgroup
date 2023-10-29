import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const notificationSchema = new mongoose.Schema(
    {
        receiveUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: { type: String, required: true }, 
    }
)

notificationSchema.plugin(mongooseDelete, { overrideMethods: 'all' });

export default mongoose.model('Notification', notificationSchema);