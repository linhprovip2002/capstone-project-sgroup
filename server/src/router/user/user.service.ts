import { User } from '../../database/models'
import { Pagination } from '../../service';

class UserService {
    _constructor() {
    }
    async getUsers(page? , limit?) {
        try {
            page ? page : null;
            limit ? limit : null;
            // const skipCount = (page - 1) * limit
            // const users = await User.find({deleted:false}).limit(limit).skip(skipCount);
            // return users;
            const users = await User.find({deleted:false});
            const pagination = new Pagination(users,page,limit);
            return pagination.paginationData();
        } catch(error) {
            throw error;
        }
    }
    async updateUser(id, body) {    
        try {
            const user = await User.findById({_id:id,deleted:false});
            if(!user) throw new Error('User not found');
            user.set(body);
            await user.save();
        } catch(error) {
            throw error;
        }
    }
    async deleteUser(id) {
        try {
            const user = await User.findById({_id:id,deleted:false});
            if(!user) throw new Error('User not found');
            await user.set({deleted:true});
            await user.save();
        } catch(error) {
            throw error;
        }
    }
    async changeStatus(id, isActive) {
        try {
            const user = await User.findById({_id:id,deleted:false});
            if(!user) throw new Error('User not found');
            await user.set({isActive:isActive});
            await user.save();
        } catch(error) {
            throw error;
        }
    }
    async getUserById(id) {
        try {
            const user = await User.findById({_id:id,deleted:false});
            if(!user) throw new Error('User not found');
            return user;
        } catch(error) {
            throw error;
        }
    }
}
export default new UserService();