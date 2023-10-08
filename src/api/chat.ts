import HTTPTransport from "../utils/Http.ts";
import {IChatUsersData} from "../models/IChat.ts";

export class ChatApi {
    private httpTransport = new HTTPTransport();
    private readonly baseUrl: string = '/chats';

    constructor(baseUrl?: string) {
        if (baseUrl) this.baseUrl = baseUrl;
    }

    public getChats() {
        return this.httpTransport.get(this.baseUrl);
    }

    public createChat(title: string) {
        return this.httpTransport.post(this.baseUrl, {data: {title: title}});
    }

    public addChatUsers(userData: IChatUsersData) {
        return this.httpTransport.put(this.baseUrl + '/users', {data: userData});
    }
    public deleteChatUsers(userData: IChatUsersData) {
        return this.httpTransport.delete(this.baseUrl + '/users', {data: userData});
    }

    public getChatUsers(id: string) {
        return this.httpTransport.get(this.baseUrl + `/${id}/users`);
    }

    /*  public logOut() {
       return  this.httpTransport.post(this.baseUrl + '/logout');
   }*/
}

export default ChatApi
