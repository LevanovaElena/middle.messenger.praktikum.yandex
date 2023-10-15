import UserSettingsApi from "../api/user-settings.ts";
import {IPasswords, IUser} from "../models/IUser.ts";
import {responseHasError} from "../utils/api.utils.ts";
import {setStateUser} from "./app.ts";
import Router from "../core/router.ts";


const userApi=new UserSettingsApi('/user');

const  updateUserProfile=async (newUserData: IUser) => {
    const result= await userApi.changeUserProfile(newUserData);
    const error=responseHasError(result);
    if(error) throw Error(error);
    if(!error)setStateUser(JSON.parse(result.responseText));

}
const  updateUserPassword=async (newUserPasswords: IPasswords) => {
    const result= await userApi.changeUserPassword(newUserPasswords);
    const error=responseHasError(result);
    if(error) throw Error(error);
    Router.getRouter().back();
}

const  updateUserAvatar=async (newAvatar:FormData) => {
    const result= await userApi.changeUserAvatar(newAvatar);
    const error=responseHasError(result);
    if(error) throw Error(error);
    setStateUser(JSON.parse(result.responseText));
    return JSON.parse(result.responseText);
}

const  searchUsersByLogin=async (login:string) => {
    const result= await userApi.searchUser(login);
    const error=responseHasError(result);
    if(error) throw Error(error);
    return JSON.parse(result.responseText);
}

export {
    updateUserProfile,
    updateUserPassword,
    updateUserAvatar,
    searchUsersByLogin
}
