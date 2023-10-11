import {IChat} from "../models/IChat.ts";
import {BASE_SOCKET_CHAT} from "../config.ts";
import {IUser} from "../models/IUser.ts";
import SocketIO from "../api/socket.ts";

export const openConnectMessages = (chat: IChat, currentUser: IUser) => {
    if (chat.connection) {
        chat.connection.ping();
    } else {
        if (!chat.id) return;
        const socket = new SocketIO(BASE_SOCKET_CHAT, currentUser.id, String(chat.id), chat.token);
        socket.open(() => console.log('Open connect!'))
        socket.message((event: MessageEvent) => console.log('Message!', event.data))
        socket.error((event: Event) => console.log('Error!', event));
        chat.connection = socket;
        window.store.set({currentChat: chat});
    }
}

export const sendMessage = (message: string) => {
    const chat = window.store.getState().currentChat;
    if (!chat) throw Error('Select Chat!');
    if (chat.connection) {
        console.log(chat.connection)
        chat.connection.send(message);
    }
}
