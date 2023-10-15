import {IAuthData, IUser} from "../models/IUser.ts";
import AuthApi from "../api/auth.ts";
import {responseHasError} from "../utils/api.utils.ts";
import Router from "../core/router.ts";
import {BASE_URLS} from "../config.ts";
import {initialStateApp, setStateUser} from "./app.ts";


const authApi = new AuthApi('/auth');
const signUp = async (data: IUser) => {
    const result = await authApi.signUp(data);
    const error=responseHasError(result);
    if (error) throw Error(error);
    if(!error) {
        const newUser=await getUser();
        setStateUser(newUser);
    }
    return JSON.parse(result.responseText);
}
const signIn = async (data: IAuthData) => {
    const result = await authApi.signIn(data);
    const error = responseHasError(result as XMLHttpRequest);
    if (error) throw Error(error);
    if (!error) {
        await initialStateApp();
        Router.getRouter().go(BASE_URLS['page-chat'])
    }
}

const getUser = async () => {
    const result = await authApi.getAuthUser() as XMLHttpRequest;
    const error=responseHasError(result);
    if (error) throw Error(error);
    if(!error)
    return JSON.parse(result.responseText);

}
const logOut = async () => {
    const result = await authApi.logOut() as XMLHttpRequest;
    const error = responseHasError(result);
    if (error) throw Error(error);
    setStateUser(null);
    Router.getRouter().go(BASE_URLS['page-login']);
}

export {
    signUp,
    signIn,
    getUser,
    logOut
}
