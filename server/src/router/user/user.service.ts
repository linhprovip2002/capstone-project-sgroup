// import { User,Role,Permission } from '../../database/models'


// class UserService {
//     _constructor() {
//     }
//     async getUsers(page? , limit?) {
//         try {
//             page ? page : null;
//             limit ? limit : null;
//             const skipCount = (page - 1) * limit
//             const users = await User.find({deleted:false}).limit(limit).skip(skipCount);
//             return users;
//         } catch(error) {
//             throw error;
//         }
//     }
//     async updateUser(id, body) {
//         try {
//             const user = await User.findById({id,deleted:false});
//             if(!user) throw new Error('User not found');
//             user.set(body);
//             await user.save();
//         } catch(error) {
//             throw error;
//         }
//     }
//     async deleteUser(id) {
//         try {
//             const user = await User.findById({id,deleted:false});
//             if(!user) throw new Error('User not found');
//             await user.set({deleted:true});
//             await user.save();
//         } catch(error) {
//             throw error;
//         }
//     }
//     async getRoles(users: any[]) {
//         try {
//             const resultData: any[] = [];
    
//             // Use Promise.all to map users to their corresponding roles
//             await Promise.all(users.map(async (user) => {
//                 console.log("here is user role", user.Roles);
//                 const role = await Role.findById({ _id: user.Roles, deleted: false });
//                 // Combine user and role data into a single object
//                 const userDataWithRole = {
//                     user,
//                     role,
//                 };
//                 resultData.push(userDataWithRole);
//             }));
    
//             return resultData;
//         } catch (error) {
//             throw error;
//         }
//     }
    
//     async getPermissions(page?, limit?) {
//         try {
//             const skipCount = (page - 1) * limit
//             const permissions = await Permission.find({deleted:false}).limit(limit).skip(skipCount);
//             return permissions;
            
//         } catch (error) {
//             throw error;
//         }
//     }
//     async addPermissionForRole(roleID, body) {
//         try {
//             const role = await Role.findById({roleID,deleted:false});
//             if(!role) throw new Error('Role not found');
//             console.log("here is body",body);
//             role.set(body);
//             await role.save();
//         } catch (error) {
//             throw error;
//         }
//     }
//     async getAllRoles() {
//         try {
//             const roles = await Role.find({deleted:false});
//             return roles;
//         } catch (error) {
//             throw error;
//         }
//     }
//     async addRoleForUser(userID, roleId) {
//         try {
//             const user = await User.findById({userID,deleted:false});
//             if(!user) throw new Error('User not found');
//             user.updateOne({Roles:roleId});
//             return true;
//         } catch (error) { 
//             throw error;
//         }
//     }
// }
// export default new UserService();