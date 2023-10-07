import {IProps,Block} from "../../utils/Block.ts";
import {mockListMessages} from "../../mocks/chat-message.mocks.ts";
import {IChat} from "../../models/IChat.ts";
import {IUser} from "../../models/IUser.ts";
import {IChatMessage} from "../../models/IChatMessage.ts";
import Router from "../../utils/Router.ts";
import {BASE_URLS} from "../../config.ts";
import {initChatPage} from "../../services/app.ts";

export interface IPageChatProps extends IProps {
    currentUser:IUser|null,
    chatList:IChat[],
    messageList:IChatMessage[],
}
export class PageChat extends Block {

        constructor() {
            const props: IPageChatProps = {
                currentUser: window.user||null,
                chatList: [],
                messageList: mockListMessages,
                events: {}
            }
            super(props);
            if (!window.user) Router.getRouter().go(BASE_URLS['page-login']);
            initChatPage();
            console.log(window.chats)
        }
    public get props(){
        return this._props as IPageChatProps;
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
