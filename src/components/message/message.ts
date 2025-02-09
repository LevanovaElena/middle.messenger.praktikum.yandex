import {IProps,Block} from "../../core/block.ts";
import {IChatMessage} from "../../models/IChatMessage.ts";
import {getShortDate} from "../../utils/date.utils.ts";
import {BASE_RESOURCES_URL} from "../../config.ts";

export interface IMessageProps extends IProps{
    message:IChatMessage;
    myMessage:boolean;
    userName:string;
}

export class Message extends Block {
    constructor(props: IMessageProps) {
        super(props);
    }
    public renderForList=this.render;
    public get props(){
        return this._props as IMessageProps;
    }
    protected render(): string {
        const { message,myMessage,userName } = this.props;
        return (`
            <li class="message  ${myMessage?' message-my':''}">
               ${message.file?`
                    <article class="message__file">
                        ${!myMessage?` <div class="message__user">
                            ${userName}
                        </div>`:''}
                        <img src=${BASE_RESOURCES_URL+ message.file.path} alt="included_file"/>
                        <div class="message__time">
                            {{{ Badge text="${getShortDate(message.time)}" type="primary" }}}
                        </div>
                    </article>`:`<article class="message__text">
                        ${!myMessage?` <div class="message__user">
                            ${userName}
                        </div>`:''}
                       
                        <p>${message.content}</p>
                        <div class="message__time">
                            {{{Badge text="${getShortDate(message.time)}" }}}
                        </div>
                    </article>`
                }
            </li>
        `)
    }
}
