import {IProps, Block} from "../../core/Block.ts";
import {IChatMessage} from "../../models/IChatMessage.ts";
import {IUser} from "../../models/IUser.ts";
import {Message } from "../index.ts";
import {IMessageProps} from "../message/message.ts";
import {IChat} from "../../models/IChat.ts";
import {StoreEvents} from "../../core/store.ts";

interface IMessageListProps extends IProps {
    messageList: IChatMessage[];
    currentUser: IUser;
    currentChat: IChat|null;
    openMenuMessage?: () => void;
    openMenuChat?: () => void;
    isOpenedMenuChat: boolean;
}

export class MessageList extends Block {
    constructor(props: IMessageListProps) {
        props.currentChat = window.store.getState().currentChat;
        props.messageList = window.store.getState().currentChat?.messages||[];
        super(props);
        window.store.on(StoreEvents.Updated, () => {
            this.props.currentUser=window.store.getState().user as IUser;
            this.props.messageList = window.store.getState().currentChat?.messages||[];
            this.props.currentChat = window.store.getState().currentChat;
            this.setProps(this.props);
        });
    }

    public get props() {
        return this._props as IMessageListProps;
    }

    getListMessages(list: IChatMessage[]): string {
        if (!list || list.length === 0) return '';
        return list.map(message => {
            const messageBlock = new Message({message: message, myMessage: String(message.user_id)===String(this.props.currentUser.id)} as IMessageProps)
            return (`
            <div class="message-list__main__message">
                ${messageBlock.renderForList()}
                </div>
            `)
        }).join('')
    }

    protected render(): string {
        const {messageList,currentChat} = this.props;
        if(!currentChat)
            return (`<div class="message-list__empty">
                        <p class="">Select a chat to write a message</p>
                    </div>`)
        const users=currentChat.users?.length||0;
        return (`
           <div class="message-list">
              {{{ MessageListHeader }}}
              ${users>1?
                ` <ul class="message-list__main">
                    ${this.getListMessages(messageList)}                   
                    </ul>
                     {{{MessageListFooter }}}
                `:
                `<div class="message-list__empty">
                     <p class="">Add users to chat</p>
                </div>`
        }
               
            </div>
        `)
    }
}
