import { Schema, model } from 'mongoose';
import MongooseDelete, { SoftDeleteModel } from 'mongoose-delete';
import paginate from 'mongoose-paginate-v2';
import { isActiveEnum,roleNameEnum } from './enum';
import IUser from './interface/user.interface';
declare module 'mongoose' {
  interface Document {
    publicFields: () => Partial<IUser>;
  }
}
const userSchema = new Schema<IUser>({
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
userSchema.methods.publicFields = function () {
  return {
    fullName : this.firstName + ' ' + this.lastName,
    gender: this.gender,
    phone: this.phone,
    email: this.email,
    dayOfBirth: this.dayOfBirth,
    profileImage: this.profileImage,
    isActive: this.isActive,
    roleName: this.roleName,
    createAt: this.createAt,
    updateAt: this.updateAt
  }
}

userSchema.plugin(MongooseDelete , { deletedAt : true, overrideMethods: 'all' });
userSchema.plugin(paginate);
const User:SoftDeleteModel = model<IUser>('User', userSchema);
export default User;




