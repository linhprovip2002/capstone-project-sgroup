import { HttpResponseBuilder } from "../../middleware/error";
import userService from "./user.service";
// import { authenticateService } from "../authentication";
class UserController {
    _constructor() {
    }
    async getUsers(req, res, next) {
        try {
            const { page, limit } = req.query;
            page ? page : null;
            limit ? limit : null;
            const users = await userService.getUsers( page, limit );
            return HttpResponseBuilder.buildOK(res, users);
        }catch(error:any)
        {   
            error.status = 404;
            next(error);
        }
    }
    async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const { body } = req;
            const idToken = req.userToken.id;
            const user = await userService.updateUser(idToken, id, body);
            return HttpResponseBuilder.buildOK(res,{ message: 'User updated successfully' , user });
        }catch(error)
        {
            next(error);
        }
    }
    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userService.deleteUser(id);
            return HttpResponseBuilder.buildOK(res,{ message: 'User deleted successfully' , user });
        }catch(error)
        {
            next(error);
        }
    }
    async changeStatus(req, res, next) {
        const { id } = req.params;
        const { isActive } = req.body;
        try {
            console.log(" status " , isActive);
            const user = await userService.changeStatus(id, isActive);
            return HttpResponseBuilder.buildOK(res, { message: 'User status changed successfully' , user });
        } catch(error) {
            next(error);
        }
    }
    async getUserById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);
            return HttpResponseBuilder.buildOK(res, user);
        } catch(error) {
            next(error);
        }
    }
    async changeRole(req, res, next) {
        try {
            const { id } = req.params;
            const { role } = req.body;
            const user = await userService.changeRole(id, role);
            return HttpResponseBuilder.buildOK(res, { message: 'User role changed successfully' , user });
        } catch(error) {
            next(error);
        }
    }
    async changeAvatar(req, res, next) {
        try {
            const { id } = req.params;
            const { avatar } = req.body;
            const user = await userService.changeAvatar(id, avatar);
            return HttpResponseBuilder.buildOK(res, { message: 'User avatar changed successfully' , user });
        } catch(error) {
            next(error);
        }
    }
    async getMe(req, res, next) {
        try {
            const id = req.userToken.id;
            const user = await userService.getUserById(id);
            return HttpResponseBuilder.buildOK(res, user);
        } catch(error) {
            next(error);
        }
    }
    async getBlogsByUserId(req, res, next) {
        try {
            console.log("aaaaa");
            
            const { id } = req.params;
            const { page, limit } = req.query;
            const blogs = await userService.getBlogsByUserId(id, page, limit);
            return HttpResponseBuilder.buildOK(res, blogs);
        } catch(error) {
            next(error);
        }
    }

}

export default new UserController();