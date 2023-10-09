import {IProps,Block} from "../../core/Block.ts";
import {IChat} from "../../models/IChat.ts";
import {IUser} from "../../models/IUser.ts";
import {IChatMessage} from "../../models/IChatMessage.ts";
import {initChatPage, setStateCurrentChat} from "../../services/app.ts";

export interface IPageChatProps extends IProps {
    currentUser:IUser|null,
    currentChat:IChat|null,
    chatList:IChat[],
    messageList:IChatMessage[],
    setCurrentChat:(chat:IChat)=>void
}
export class PageChat extends Block {

        constructor() {
            const props: IPageChatProps = {
                currentUser: window.store.getState().user || null,
                currentChat: window.store.getState().currentChat || null,
                chatList: [],
                messageList: [],
                setCurrentChat: (chat: IChat) => {
                    setStateCurrentChat(chat);
                    this.props.currentChat = chat;
                    this.setProps(this.props)
                },
                events: {}
            }
            super(props);
            //if (!window.user) Router.getRouter().go(BASE_URLS['page-login']);

        }
    public get props(){
        return this._props as IPageChatProps;
    }
    protected render(): string {
        return (`
           <div class="chat-page">
                <div class="chat-page__left">
                    {{{ ChatList list=chatList setCurrentChat=setCurrentChat}}}
                </div>
                <div class="chat-page__main">
                    {{{ MessageList messageList=messageList currentUser=currentUser currentChat=${this.props.currentChat} }}}
                </div>
            </div>
        `)
    }
}
