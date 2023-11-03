import { User } from '../../database/models';
import { myCustomLabels } from '../../constant';
class UserService {
    _constructor() {
    }
    async getUsers(page? , limit?) {
        try {
            page ? page : null;
            limit ? limit : null;
              const options = {
                page,
                limit,
                sort: { createdAt: -1 },
                // select: User.publicFields(),
                select: '_id firstName lastName email gender phone dayOfBirth profileImage isActive roleName createdAt updatedAt',
                myCustomLabels,
              };  

            const users = await User.paginate({ deleted: false}, options, function (err, result) {
                if (err) throw new Error('Error');
                return result;
              });
            return users;
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
            // await user.set({deleted:true});
            // await user.save();
            user.delete();
            return
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
    async changeRole(id, role) {
        try {
            const user = await User.findById({_id:id,deleted:false});
            if(!user) throw new Error('User not found');
            await user.set({role:role});
            await user.save();
        } catch(error) {
            throw error;

        }
    }
    async changeAvatar(id, avatar) {
        const user = await User.findById({_id:id,deleted:false});
        if(!user) throw new Error('User not found');
        await user.set({profileImage:avatar});
        await user.save();
    }
}
export default new UserService();