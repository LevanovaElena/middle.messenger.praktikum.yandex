import UserSettingsApi from "../api/user-settings.ts";
import {IPasswords, IUser} from "../models/IUser.ts";
import {responseHasError} from "../utils/api.utils.ts";
import {setStateUser} from "./app.ts";
import Router from "../utils/Router.ts";


const userApi=new UserSettingsApi('/user');

const  updateUserProfile=async (newUserData: IUser) => {
    const result= await userApi.changeUserProfile(newUserData);
    const error=responseHasError(result);
    if(error) throw Error(error);
    setStateUser(JSON.parse(result.responseText));
    Router.getRouter().back();
}
const  updateUserPassword=async (newUserPasswords: IPasswords) => {
    const result= await userApi.changeUserPassword(newUserPasswords);
    const error=responseHasError(result);
    if(error) throw Error(error);
    Router.getRouter().back();
}



export {
    updateUserProfile,
    updateUserPassword
}
