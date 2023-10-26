import authenticateService from "./authenticate.service";
class AuthenticationController {
    constructor() {
    }
    async register(req, res, next) {
        try {
            const { password, email } = req.body;      
            await authenticateService.register( password, email)
            return res.status(200).json({message:"User created successfully."});
        } catch (error) {
            console.error("Error while saving:", error);
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const token = await authenticateService.login(email, password);
            return res.status(200).json({message:"Login successfully.", token: token});
        } catch (error) {
            next(error);
          }
    }
    async forgotPassword(req, res, next) {
        try {
           const { email } = req.body;
           await authenticateService.forgotPassword(email);
           return res.status(200).json({message:"Email sent successfully."});        
        } catch (error) {
            next(error);
          }
    }
    async resetPassword(req, res, next) {
        try {
            const { tokenResetPassword } = req.params;
            const { password } = req.body;
            await authenticateService.resetPassword(tokenResetPassword, password);
            return res.status(200).json({message:"Password reset successfully."});
        } catch (error) {
            next(error);
          }
    }

}
export default new AuthenticationController();