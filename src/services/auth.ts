import {IAuthData, IUser} from "../models/IUser.ts";
import AuthApi from "../api/auth.ts";
import {responseHasError} from "../utils/api.utils.ts";
import Router from "../utils/Router.ts";
import {BASE_URLS} from "../config.ts";
import {initialStateApp} from "./app.ts";


const authApi=new AuthApi('/auth');
const signUp = async (data: IUser) => {
    const result= await authApi.signUp(data);
    console.log(result)
}
const signIn= async (data: IAuthData) => {
    const result=await authApi.signIn(data);
    responseHasError(result as  XMLHttpRequest);
   await initialStateApp();
}

const getUser= async () => {
    const result=await authApi.getAuthUser() as  XMLHttpRequest;
    responseHasError(result);
    return JSON.parse( result.responseText);

}
const logOut= async () => {
    const result=await authApi.logOut() as  XMLHttpRequest;
    const error=responseHasError(result);
    if(error) throw Error(error);
    window.user=null;
    Router.getRouter().go(BASE_URLS['page-login']);
}

export {
    signUp,
    signIn,
    getUser,
    logOut
}
