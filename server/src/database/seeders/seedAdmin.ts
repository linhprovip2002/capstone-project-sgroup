import { User } from "../models";
import bcrypt from "bcrypt";
import { isActiveEnum, roleNameEnum } from "../models/enum";
import crypto from 'crypto';
import { dbConfig } from "../config";

async function seedData() {
    try {
        await dbConfig.connect();
        const salt = bcrypt.genSaltSync(10);
        const hashPasswordUser = bcrypt.hashSync('admin', salt);
        const passwordResetToken = crypto.randomBytes(10).toString('hex');
        await User.create({
            email: 'admin@gmail.com',
            password: hashPasswordUser,
            passwordResetToken: passwordResetToken,
            firstName: 'admin',
            isActive: isActiveEnum.ACTIVE,
            roleName: roleNameEnum.ADMIN
        });

        await User.create({
            email: 'moderator@gmail.com',
            password: bcrypt.hashSync('moderator', salt),
            passwordResetToken: passwordResetToken,
            firstName: 'moderator',
            isActive: isActiveEnum.ACTIVE,
            roleName: roleNameEnum.MODERATOR
        });
        return;
    } catch (error) {
        throw error;
    }
}

seedData();
