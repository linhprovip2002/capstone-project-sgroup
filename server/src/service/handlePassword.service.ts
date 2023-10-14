import crypto from 'crypto';
 function hashPassword(plainText: String):Object
{
    const salt = crypto.randomBytes(32).toString('hex');
    const hashObject = crypto.createHash('sha256');
    const passwordHashed = hashObject.update(plainText + salt).digest('hex');
    return { salt , passwordHashed };
}

 function hashPasswordSalt(salt,plainText):String
{
    const hashObject = crypto.createHash('sha256');
    const hashPassword = hashObject.update(plainText + salt).digest('hex');
    return hashPassword;
}

export { hashPassword, hashPasswordSalt };