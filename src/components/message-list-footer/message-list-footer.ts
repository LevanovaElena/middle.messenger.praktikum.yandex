import {IProps, Block} from "../../core/Block.ts";
import {IChatMessage} from "../../models/IChatMessage.ts";
import {IUser} from "../../models/IUser.ts";
import {validateMessage} from "../../utils/validates.utils.ts";
import {IChat} from "../../models/IChat.ts";
import {sendMessage} from "../../services/send-message.ts";


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

export class MessageListFooter extends Block {
    constructor(props: IMessageListProps) {
        props.isOpenedMenuMessage = false;
        props.onBlurMessage = () => this.validate();
        props.onClickSend = () => {
            if (!validateMessage(this.valueMessage())) {
                console.log('Send Message:' + this.valueMessage());
                sendMessage( this.valueMessage());
            }
            else console.log('Error! Can not send!')
        }
        props.openMenuMessage = () => {
            this.props.isOpenedMenuMessage = !this.props.isOpenedMenuMessage;
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

    protected render(): string {
        const { message = '',isOpenedMenuMessage} = this.props;

        return (`
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
        `)
    }
}
