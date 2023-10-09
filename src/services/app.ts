import {getUser} from "./auth.ts";
import Router from "../core/router.ts";
import {BASE_URLS} from "../config.ts";
import {IUser} from "../models/IUser.ts";
import {getChats, getChatToken, getChatUsers} from "./chat.ts";
import {IChat} from "../models/IChat.ts";

const initialStateApp = async () => {

    let user = null;
    try {
        user = await getUser();
    } catch (error) {
        Router.getRouter().go(BASE_URLS['page-login']);
        return;
    }
    setStateUser(user);
    console.log('user_initial', window.store.getState());
    await initChatPage();

}
const initChatPage = async () => {
    let chats:IChat[]=[];
    try {
        chats = await getChats();
    }
    catch (error) {
        setStateChats(chats)
    }
    console.log('chats_initial', chats)
    setStateChats(chats)

}
const initChatUsers = async (chat: IChat | null) => {
    if (!chat) return;
    let users:IUser[]=[];
    try {
        users = await getChatUsers(String(chat.id));
    }
    catch (error) {
        setStateUsers(chat,[])
    }
    console.log('users_initial', users);
    setStateUsers(chat,users)
}
const initChatToken = async (chat: IChat | null) => {
    if (!chat) return;
    let token='';
    try {
        token = await getChatToken(String(chat.id));
    }
    catch (error) {
        setStateToken(chat,token)
    }
    console.log('token_initial', token);
    setStateToken(chat,token)
}
const setStateUser = (user: IUser|null) => {
    window.store.set({user:user});
}
const setStateChats = (chats: IChat[]|null) => {
    window.store.set({chats:chats});
}
const setStateUsers = (chat:IChat,users:IUser[]) => {
    chat.users=[...users];
    window.store.set({currentChat:chat});
}
const setStateToken = (chat:IChat,token:string) => {
    chat.token=token;
    window.store.set({currentChat:chat});
}
const setStateCurrentChat = async (chat: IChat | null) => {
    await initChatUsers(chat);
    await initChatToken(chat);
    window.store.set({currentChat: chat});
}




export {
    initialStateApp,
    setStateUser,
    initChatPage,
    setStateCurrentChat,
    setStateUsers,
    initChatToken,
    initChatUsers,
    setStateToken
}
