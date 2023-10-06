export interface IUser {
    login?: string;
    password?: string;
    display_name?: string;
    first_name: string;
    second_name: string;
    phone: string;
    email: string;
    avatar?: string;
}

export interface IAuthData {
    login: string;
    password: string;
}

export interface IPasswords {
    oldPassword: string,
    newPassword: string
}
