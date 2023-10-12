import {getUser} from "./auth.ts";
import Router from "../core/router.ts";
import {BASE_URLS} from "../config.ts";
import {IUser} from "../models/IUser.ts";
import {getChats, getChatToken, getChatUsers} from "./chat.ts";
import {IChat} from "../models/IChat.ts";
import {cloneDeep} from "../utils/object.utils.ts";
import { openConnectMessages} from "./send-message.ts";

const initialStateApp = async () => {
    let store= window.store.getState();
    let user = null;
    try {
        user = await getUser();
    } catch (error) {
        Router.getRouter().go(BASE_URLS['page-login']);
        return;
    }
    store.user=user;
    console.log('user_initial', window.store.getState());
    await updateChats();

}
const updateChats = async () => {
    let chats: IChat[] = [];
    try {
        chats = await getChats();
    } catch (error) {
        setStateChats(chats)
    }
    console.log('chats_initial', chats)
    setStateChats(chats)

}
const initChatUsers = async (chat: IChat | null) => {
    if (!chat) return;
    let users: IUser[] = [];
    try {
        users = await getChatUsers(String(chat.id));
    } catch (error) {
        setStateUsers(chat, [])
    }
    console.log('users_initial', users);
    setStateUsers(chat, users)
}
const initChatToken = async (chat: IChat | null) => {
    if (!chat) return;
    let token = '';
    try {
        token = await getChatToken(String(chat.id));
    } catch (error) {
        setStateToken(chat, token)
    }
    console.log('token_initial', token);
    setStateToken(chat, token)
}
const setStateUser = (user: IUser | null) => {
    window.store.set({user: user});
}
const setStateChats = (chats: IChat[] | null) => {
    window.store.set({chats: chats});
}
const setStateUsers = (chat: IChat, users: IUser[]) => {
    chat.users = [...users];
}
const setStateToken = (chat: IChat, token: string) => {
    chat.token = token;
}
const setStateCurrentChat = async (chat: IChat | null) => {
    await initChatUsers(chat);
    await initChatToken(chat);
    const user = window.store.getState().user;
    if (chat && user) {
        openConnectMessages(chat, user);
        const foundedChat= window.store.getState().chats?.find(_chat => _chat.id === chat.id);
        if(foundedChat) {
            foundedChat.unread_count =0;
        }
    }
    window.store.set({currentChat: cloneDeep(chat),chats: window.store.getState().chats});
}


export {
    initialStateApp,
    setStateUser,
    updateChats,
    setStateCurrentChat,
    setStateUsers,
    initChatToken,
    initChatUsers,
    setStateToken
}
