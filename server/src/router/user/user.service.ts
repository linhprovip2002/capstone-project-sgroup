import { Blog, User } from '../../database/models';
import { myCustomLabels } from '../../constant';
class UserService {
    _constructor() {
    }
    async getUsers(page=1 , limit=1000) {
        try {
         
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
    async isAdmin(id) {
            const user =await User.findById({_id:id,deleted:false});
            if(!user) throw new Error('User not found');
            if(user.roleName == 'ADMIN' || user.roleName == 'MODERATOR') return true;
            return false;
    }
        
    async updateUser(idToken, id, body) {    
        try {
            
            // check admin or moderator can edit user
            if (idToken == id || await this.isAdmin(idToken)) {
            const user = await User.findById({_id:id,deleted:false});
            if(!user) throw new Error('User not found');
            user.set(body);
            await user.save();
            } else {
                throw new Error('You are not allowed to edit this user');
            }
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
    async getBlogsByUserId(id, page=1, limit=1000) {
        try {
            const options = {
                page,
                limit,
                populate: { path: 'userId' , select:'_id firstName lastName email gender phone dayOfBirth profileImage isActive roleName createdAt updatedAt' },
                sort: { createdAt: -1 },
                select: 'category title content blogImage reaction createdAt updatedAt',
                myCustomLabels,
            };
            return await Blog.paginate({ userId: id, deleted: false }, options, function (err, result) {
                if (err) throw new Error('Error');
                return result;
            });
        } catch(error) {
            throw error;
        }
    }
}
export default new UserService();