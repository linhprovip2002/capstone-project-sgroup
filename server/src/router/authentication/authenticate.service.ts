import { User } from "../../database/models";
import { signJwt } from "../../service";
import { mailService } from "../../service";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
class AuthenticationService {
    constructor() {

    }
    async register(password, email) {
        try {
            const existingUser = await User.findOne({ email: email, deleted: false });
            if (existingUser) {
                throw new Error("Email already exists");
            }
    
            const salt = bcrypt.genSaltSync(10);
            const hashPasswordUser = bcrypt.hashSync(password, salt);
            
            const passwordResetToken = crypto.randomBytes(20).toString('hex');
            await User.create({ email: email, password: hashPasswordUser, passwordResetToken: passwordResetToken });
            return;
        } catch (error) {
            throw error;
        }
    }
    
    async login(email, password) {
        try {
            const user =await User.findOne({ email: email, deleted: false });
            if (user === null) {
                throw new Error("Email not exists");
            }
            console.log("aaaa" + user.email);
            
            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch) {
                throw new Error("Password incorrect");
            }
            const token = await signJwt(user, email);
            return token;
        }catch(error)
        {
            throw error;
        }
    }
    async forgotPassword(email) {
        const user =await User.findOne({ email: email, deleted: false });
            if (user === null) {
                throw new Error("Email not exists");
            }
        const htmlTemplate = `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    background-image: url('https://img.freepik.com/premium-vector/forgot-password-concept-isolated-white_263070-194.jpg');
                    background-size: cover;
                    background-position: center;
                }
                h1 {
                    color: #333;
                    text-align: center;
                    font-size: 28px;
                }
                p {
                    color: #666;
                    text-align: center;
                    font-size: 18px;
                }
                a {
                    display: inline-block;
                    color: #007BFF;
                    text-decoration: none;
                    font-size: 18px;
                    padding: 10px 20px;
                    border-radius: 5px;
                    margin-top: 20px;
                    transition: background-color 0.3s ease;
                }
                a:hover {
                    background-color: rgba(0, 123, 255, 0.1);
                    text-decoration: none;
                }
                @keyframes rotate {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
                .rotate {
                    animation: rotate 2s linear infinite;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Forgot Password?</h1>
                <p>Click the button below to reset your password</p>
                <a href="http://localhost:3000/api/auth/reset-password/${user.passwordResetToken}" class="rotate">Reset Password</a>
            </div>
        </body>
        </html>
        `;
        try {
            mailService.sendMail(email, "Forgot Password", "", htmlTemplate);
        } catch (error) {
            throw error;
        }
    }
    
    async resetPassword(tokenResetPassword, password)
    {
        try {
           const user = await User.findOne({ passwordResetToken: tokenResetPassword, deleted: false });
              if (user === null) {
                throw new Error("Token not exists");
              }
            const salt = bcrypt.genSaltSync(10);
            const hashPasswordUser = bcrypt.hashSync(password, salt);
            await user.set({password: hashPasswordUser});
            await user.save();
            return;
        }
        catch(error)
        {
            throw error;
        }
    }
    async findAccountByEmail(email)
    {
        try {
    
        }
        catch(error)
        {
            throw error;
        }
    }
    async findNamePermissionById(ids)
    {
        try{
           

        }catch(error)
        {   
            throw error;
        }
    }
}

export default new AuthenticationService();