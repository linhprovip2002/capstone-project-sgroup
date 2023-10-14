interface IUser {
    IDUser: string;
    Roles: [string];
    firstName: string;
    lastName: string;
    gender: boolean;
    phone: number;
    dayOfBirth: Date;
    lastLogin: Date;
    Address: string;
    profilePicture?: string;
}
export { IUser }