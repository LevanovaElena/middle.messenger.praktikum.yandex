import {IUser} from "../models/IUser.ts";
import AuthApi from "../api/auth.ts";

const authApi=new AuthApi('/auth');
const signup = async (data: IUser) => {
     await authApi.signUp(data);


}

export {
    signup,
}
