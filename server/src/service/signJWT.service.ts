import jwt from 'jsonwebtoken';

function signJwt(user: any, email: string ) {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        throw new Error('JWT secret is not defined. Please set the JWT_SECRET environment variable.');
    }
    
    return jwt.sign(
        {
            IDUser: user?._id,
            name: user.lastName + ' ' + user.firstName,
            email: email,
            roles: user.Roles
        },
        jwtSecret,
        { expiresIn: '1h', algorithm: 'HS256' }
    );
}

export { signJwt }