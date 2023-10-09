import {responseHasError} from "../utils/api.utils.ts";
import ChatApi from "../api/chat.ts";
import {IChat, IChatUsersData} from "../models/IChat.ts";
import {initChatPage} from "./app.ts";
import {IUser} from "../models/IUser.ts";


const chatApi=new ChatApi('/chats');
const getChats= async ():Promise<IChat[]> => {
    const result=await chatApi.getChats() as  XMLHttpRequest;
    responseHasError(result);
    return JSON.parse( result.responseText);
}
const createChat= async (title:string):Promise<IChat> => {
    const result=await chatApi.createChat(title) as  XMLHttpRequest;
    const error=responseHasError(result);
    if(error) throw Error(error);
    return JSON.parse( result.responseText);
}

const addChatUser= async (data:IChatUsersData) => {
    const result=await chatApi.addChatUsers(data) as  XMLHttpRequest;
    const error=responseHasError(result);
    if(error) throw Error(error);
    await initChatPage();
}
const deleteChatUsers= async (data:IChatUsersData) => {
    const result=await chatApi.deleteChatUsers(data) as  XMLHttpRequest;
    const error=responseHasError(result);
    if(error) throw Error(error);
    await initChatPage();
}

const getChatUsers=async (idChat:string):Promise<IUser[]> => {
    const result=await chatApi.getChatUsers(idChat) as  XMLHttpRequest;
    const error=responseHasError(result);
    if(error) throw Error(error);
    return JSON.parse( result.responseText);
}
const getChatToken=async (idChat:string):Promise<string> => {
    const result=await chatApi.getChatToken(idChat) as  XMLHttpRequest;
    const error=responseHasError(result);
    if(error) throw Error(error);
    return JSON.parse( result.responseText).token;
}


export {
    getChats,
    createChat,
    addChatUser,
    getChatUsers,
    deleteChatUsers,
    getChatToken
}
