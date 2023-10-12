import {IChat} from "../models/IChat.ts";
import {BASE_SOCKET_CHAT} from "../config.ts";
import {IUser} from "../models/IUser.ts";
import SocketIO from "../api/socket.ts";

export const openConnectMessages = (chat: IChat, currentUser: IUser) => {
        if (!chat.id) return;
        if(!chat.users)return;
        if(chat.users.length<2)return chat;
        if(chat.connection&&chat.connection.getState()==='OPEN')return;
        const socket = new SocketIO(BASE_SOCKET_CHAT, currentUser.id, String(chat.id), chat.token);
        socket.open(() => {
            if(chat.unread_count>0) getAllNewMessage(0);
            setInterval(()=>{
                socket.ping();
            },5000);

        })
       socket.message((event: MessageEvent) => {
            //console.log('Message!', event.data);
           const message = JSON.parse(event.data);
           if(message.type==='message'||Array.isArray(message)) {

               console.log('mesages', message)
               if (!chat.messages) chat.messages = [];
               if (Array.isArray(message)) {
                   message.reverse();
                   chat.messages = [...chat.messages, ...message];
               } else chat.messages.push(message);
               if(chat.id=== window.store.getState().currentChat?.id) window.store.set({currentChat: {...chat}});
               else {
                  const findedChat= window.store.getState().chats?.find(_chat => _chat.id === chat.id);
                  if(findedChat) {
                      findedChat.unread_count += 1;
                      window.store.set({chats: window.store.getState().chats});
                  }
               }
           }

           if(event.data.type==='user connected') {
               console.log('user connected', event.data)
           }
        })
    /*  socket.error((event: Event) => console.log('Error!', event));*/
        chat.connection = socket;
       return chat;

}

export const sendMessage = (message: string) => {
    const chat = window.store.getState().currentChat;
    if (!chat) throw Error('Select Chat!');
    if (chat.connection) {
        console.log(chat.connection)
        chat.connection.sendMessage(message);
    }
}

export const getAllNewMessage=(limit:number)=>{
    {
        const chat = window.store.getState().currentChat;
        if (!chat) throw Error('Select Chat!');
        if (chat.connection) {
              chat.connection.sendRequestForgetMessage(limit);
              chat.unread_count=0;
        }
    }
}
