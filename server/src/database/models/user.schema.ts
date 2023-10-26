import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import { isActiveEnum,roleNameEnum } from './enum';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: Boolean,
    phone: Number,
    email: { type: String, required: true, unique: true },
    password: String,
    passwordResetToken: { type: String, required: true },
    dayOfBirth: Date,
    profileImage: String,
    isActive: { type: String, enum: isActiveEnum, default: isActiveEnum.ACTIVE },
    roleName: { type: String, enum: roleNameEnum, default: roleNameEnum.USER },
  } , { timestamps: true});

userSchema.plugin(mongooseDelete , { deletedAt : true });

const User = mongoose.model('User', userSchema);

export default User;




