import {IProps,Block} from "../../utils/Block.ts";
import {mockUser} from "../../mocks/user-profile.mocks.ts";
import {mockListChats} from "../../mocks/chat.mocks.ts";
import {mockListMessages} from "../../mocks/chat-message.mocks.ts";
import {IChat} from "../../models/IChat.ts";
import {IUser} from "../../models/IUser.ts";
import {IChatMessage} from "../../models/IChatMessage.ts";
import Router from "../../utils/Router.ts";
import {BASE_URLS} from "../../config.ts";

export interface IPageChatProps extends IProps {
    currentUser:IUser,
    chatList:IChat[],
    messageList:IChatMessage[],
}
export class PageChat extends Block {

        constructor() {
            console.log('window.user', window.user)
            const props:IPageChatProps={
                currentUser:mockUser,
                chatList:mockListChats,
                messageList:mockListMessages,
                events:{}
            }
            super(props);
            if(!window.user)    Router.getRouter().go(BASE_URLS['page-login']);
    }

    protected render(): string {
        return (`
           <div class="chat-page">
                <div class="chat-page__left">
                    {{{ ChatList list=chatList }}}
                </div>
                <div class="chat-page__main">
                    {{{ MessageList messageList=messageList currentUser=currentUser }}}
                </div>
            </div>
        `)
    }
}
