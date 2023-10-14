import mongoose from "mongoose";
const mongoose_delete = require('mongoose-delete');
const roleSchema = new mongoose.Schema({
    IDrole: mongoose.Schema.Types.ObjectId,
    IDUser: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    roleName: { type: String, required: true, unique: true, length: 20 },
    roleDescription: { type: String, required: true },
}, { timestamps: true });
roleSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Role = mongoose.model('Role', roleSchema);
export { Role };