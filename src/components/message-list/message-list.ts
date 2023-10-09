import {IProps, Block} from "../../core/Block.ts";
import {IChatMessage} from "../../models/IChatMessage.ts";
import {IUser} from "../../models/IUser.ts";
import {Message} from "../index.ts";
import {IMessageProps} from "../message/message.ts";
import {validateMessage} from "../../utils/validates.utils.ts";
import {IChat} from "../../models/IChat.ts";

interface IMessageListProps extends IProps {
    messageList: IChatMessage[];
    currentUser: IUser;
    currentChat: IChat|null;
    onBlurMessage?: () => void;
    message?: string;
    onClickSend?: () => void;
    openMenuMessage?: () => void;
    openMenuChat?: () => void;
    isOpenedMenuMessage: boolean;
    isOpenedMenuChat: boolean;
}

export class MessageList extends Block {
    constructor(props: IMessageListProps) {
        props.isOpenedMenuMessage = false;
        props.isOpenedMenuChat = false;
        props.currentChat = window.store.getState().currentChat;
        props.onBlurMessage = () => this.validate();
        props.onClickSend = () => {
            if (!validateMessage(this.valueMessage())) console.log('Send Message:' + this.valueMessage());
            else console.log('Error! Can not send!')
        }
        props.openMenuMessage = () => {
            this.props.isOpenedMenuMessage = !this.props.isOpenedMenuMessage;
            this.setProps(this.props);
        }
        props.openMenuChat = () => {
            this.props.isOpenedMenuChat = !this.props.isOpenedMenuChat;
            this.setProps(this.props);
        }

        super(props);
    }

    public get props() {
        return this._props as IMessageListProps;
    }

    public valueMessage() {
        if (!this.validate()) {
            return '';
        }
        return this.refs?.message.value()
    }

    private validate() {
        const value = this.refs?.message.value();
        const error = validateMessage(value);

        this.props.message = value;
        if (error) {
            console.log('Message can not be blank')
            this.setProps(this.props);
            return false;
        }
        this.setProps(this.props);
        return true;
    }

    getListMessages(list: IChatMessage[]): string {
        if (!list || list.length === 0) return '';
        return list.map(message => {
            const messageBlock = new Message({message: message, myMessage: message.main || false} as IMessageProps)
            return (`
            <div class="message-list__main__message">
                ${messageBlock.renderForList()}
                </div>
            `)
        }).join('')
    }

    protected render(): string {
        const {messageList, message = '',isOpenedMenuMessage,isOpenedMenuChat,currentChat} = this.props;
        const countUsers=currentChat?.users?.length||1;
        if(!currentChat)
            return (`<div class="message-list__empty">
                        <p class="">Select a chat to write a message</p>
                    </div>`)
        const {avatar,title} = currentChat;
        return (`
           <div class="message-list">
                <div class="message-list__header">
                    <div class="message-list__header__avatar">
                        {{{ Avatar imageUrl='${avatar||''}' size='sm' }}}
                        <div class="message-list__header__title">
                            <span>${title}</span>
                            <p>${countUsers+' members'}</p>
                        </div>
                    </div>
                    {{{ Button type="dots" onClick=openMenuChat}}}
                    {{{ MenuChat isOpenedMenu=${isOpenedMenuChat } closeMenu=openMenuChat}}}
                </div>
                <ul class="message-list__main">
                    ${this.getListMessages(messageList)}                   
                </ul>
                <div class="message-list__footer">
                    {{{ MenuMessage isOpenedMenu=${isOpenedMenuMessage } closeMenu=openMenuMessage}}}
                    {{{ Button type="paperclip" onClick=openMenuMessage}}}
                    {{{ Input 
                        ref="message"
                        type="text" 
                        classes="message-list__footer__input" 
                        value='${message}'
                        placeholder="Message" 
                        name="message"
                        onBlur=onBlurMessage
                    }}}
                    {{{ Button type="arrow" onClick=onClickSend}}}
                </div>
            </div>
        `)
    }
}
