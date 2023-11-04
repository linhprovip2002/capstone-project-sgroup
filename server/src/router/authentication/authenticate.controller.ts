import authenticateService from "./authenticate.service";
import { HttpResponseBuilder } from "../../middleware/error";
class AuthenticationController {
    constructor() {
    }
    async register(req, res, next) {
        try {
            const { password, email } = req.body;      
            await authenticateService.register( password, email)
            return HttpResponseBuilder.buildOK(res, {message:"Register successfully."});
        } catch (error) {
            console.error("Error while saving:", error);
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const token = await authenticateService.login(email, password);
            return HttpResponseBuilder.buildOK(res,{message:"Login successfully.", token: token});
        } catch (error:any) {
            next(HttpResponseBuilder.buildBadRequest(res, error.message));
          }
    }
    async forgotPassword(req, res, next) {
        try {
           const { email } = req.body;
           await authenticateService.forgotPassword(email);
           return HttpResponseBuilder.buildOK(res,{message:"Email sent successfully."});        
        } catch (error:any) {
            next(HttpResponseBuilder.buildBadRequest(res, error.message));
          }
    }
    async resetPassword(req, res, next) {
        try {
            const { tokenResetPassword } = req.params;
            const { password } = req.body;
            await authenticateService.resetPassword(tokenResetPassword, password);
            return HttpResponseBuilder.buildOK(res,{message:"Password reset successfully."});
        } catch (error:any) {
            next(HttpResponseBuilder.buildBadRequest(res, error.message));
          }
    }

}
export default new AuthenticationController();