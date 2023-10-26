import HTTPTransport from "../core/http.ts";
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
    public deleteChat(id: number) {
        return this.httpTransport.delete(this.baseUrl, {data: {chatId: id}});
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

    public getChatToken(id: string) {
        return this.httpTransport.post(this.baseUrl + `/token/${id}`);
    }

    public updateChatAvatar(file: FormData, chatId: number) {
        file.append('chatId', String(chatId));
        return this.httpTransport.put(this.baseUrl + '/avatar', {data: file});
    }
}

export default ChatApi
