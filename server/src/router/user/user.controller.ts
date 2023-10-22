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
            return res.status(200).json(users);
        }catch(error)
        {
            next(error);
        }
    }
    async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const { body } = req;
            const user = await userService.updateUser(id, body);
            return res.status(200).json({ message: 'User updated successfully' , user });
        }catch(error)
        {
            next(error);
        }
    }
    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userService.deleteUser(id);
            return res.status(200).json({ message: 'User deleted successfully' , user });
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
            return res.status(200).json({ message: 'User status changed successfully' , user });
        } catch(error) {
            next(error);
        }
    }
}

export default new UserController();