import {getUser} from "./auth.ts";
import Router from "../utils/Router.ts";
import {BASE_URLS} from "../config.ts";
import {IUser} from "../models/IUser.ts";
import {getChats} from "./chat.ts";

const initialStateApp = async () => {

    let result = null;
    try {
        result = await getUser();
    } catch (error) {
        Router.getRouter().go(BASE_URLS['page-login']);
        return;
    }
    setStateUser(result);
    console.log('window.user_initial', window.user,Router.getRouter());
    await initChatPage();
    /*const chats = await getChats();
    window.store.set({user: me, chats});
    navigate('emails')*/

}
const initChatPage = async () => {
    const result=await getChats();
    console.log('window.chat_initial', result)
    window.chats=result;
}
const setStateUser=(user:IUser)=>{
    window.user=user;
}

export{
    initialStateApp,
    setStateUser,
    initChatPage,

}
