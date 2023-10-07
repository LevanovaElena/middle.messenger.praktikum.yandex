import {responseHasError} from "../utils/api.utils.ts";
import ChatApi from "../api/chat.ts";
import {IChat} from "../models/IChat.ts";


const chatApi=new ChatApi('/chats');
const getChats= async ():Promise<IChat[]> => {
    const result=await chatApi.getChats() as  XMLHttpRequest;
    const error=responseHasError(result);
    if(error) throw Error(error);
    return JSON.parse( result.responseText);
}
const createChat= async (title:string):Promise<IChat> => {
    const result=await chatApi.createChat(title) as  XMLHttpRequest;
    const error=responseHasError(result);
    if(error) throw Error(error);
    return JSON.parse( result.responseText);
}
export {
    getChats,
    createChat
}
