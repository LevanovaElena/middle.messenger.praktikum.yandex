import {getUser} from "./auth.ts";
import Router from "../utils/Router.ts";
import {BASE_URLS} from "../config.ts";
import {IUser} from "../models/IUser.ts";
import {getChats, getChatUsers} from "./chat.ts";
import {IChat} from "../models/IChat.ts";

const initialStateApp = async () => {

    let result = null;
    try {
        result = await getUser();
    } catch (error) {
        Router.getRouter().go(BASE_URLS['page-login']);
        return;
    }
    setStateUser(result);
    console.log('window.user_initial', window.user, Router.getRouter());
    await initChatPage();
    /*const chats = await getChats();
    window.store.set({user: me, chats});
    navigate('emails')*/

}
const initChatPage = async () => {
    let result:IChat[]=[];
    try {
        result = await getChats();
    }
    catch (error) {
        window.chats = result;
    }
    console.log('window.chat_initial', result)
    window.chats = result;

}

const setStateCurrentChat = async (chat: IChat | null) => {
    if (chat) {
        let result:IUser[]=[];
        try {
            result = await getChatUsers(String(chat.id));
        }
        catch (error) {
            chat.users = result;
        }
        chat.users = result;
    }
    window.currentChat = chat;
}
const setStateUser = (user: IUser) => {
    window.user = user;
}
const setStateUsers = async () => {
    if (!window.currentChat) return;
    window.currentChat.users = await getChatUsers(String(window.currentChat.id));
}
export {
    initialStateApp,
    setStateUser,
    initChatPage,
    setStateCurrentChat,
    setStateUsers
}
