// import mongoose from 'mongoose';
import dbConfig from '../config/db.config';
import { Account,Role,User} from '../models';
import { hashPassword } from "../../service";
import crypto from 'crypto';
const userDataSeed = require( './migrations/user.json');

async function seedData() {
    try {
        await dbConfig.connect();
        const ObjectPassword:any = hashPassword(userDataSeed.password);
        const account = new Account({
            userName: userDataSeed.userName,
            password: ObjectPassword.passwordHashed,
            email: userDataSeed.email,
            salt: ObjectPassword.salt,
            passwordResetToken: crypto.randomBytes(20).toString('hex')
        });
        await account.save();
        console.log(account._id);
        const roleUser = await Role.findOne({ roleName: "superUser",deleted: false });
        const user = new User({
            account: account,
            Roles: roleUser,
            firstName: userDataSeed.firstName,
            lastName: userDataSeed.lastName,
            gender: userDataSeed.gender
        });
        await user.save();
        console.log("super created successfully.");
        return;
    } catch (error) {
        throw error;
    }
}

seedData();
