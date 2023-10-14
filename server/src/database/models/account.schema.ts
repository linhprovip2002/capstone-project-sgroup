import mongoose from "mongoose";
const mongoose_delete = require('mongoose-delete');

const accountSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: { type: String, required: true, unique: true, maxlength: 20 },
    password: { type: String, required: true },
    email: { type: String, required: true },
    salt: { type: String, required: true },
    passwordResetToken: { type: String },
    lastLogin: { type: Date },
}, { timestamps: true });


accountSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Account = mongoose.model('Account', accountSchema);
export default Account;