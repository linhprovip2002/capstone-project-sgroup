import { Document } from 'mongoose';
import { SoftDeleteDocument } from 'mongoose-delete';
interface IUser extends Document , SoftDeleteDocument  {
  firstName: string;
  lastName: string;
  gender: boolean;
  phone: number;
  email: string;
  password: string;
  passwordResetToken: string;
  dayOfBirth: Date;
  profileImage: string;
  isActive: string;
  roleName: string;
  createdAt: Date;
  updateAt: Date;
}

export default IUser;