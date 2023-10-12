import {IProps, Block} from "../../core/Block.ts";
import {getShortDate} from "../../utils/date.utils.ts";

export interface IChatItemProps extends IProps {
    id: number;
    title: string;
    avatar: string|null;
    unread_count: string|null;
    last_message_content:string|null;
    last_message_time:string|null;

    onClick: (id:string) => void
}

export class ChatItem extends Block {
    constructor(props: IChatItemProps) {
        super({
            ...props,
            events: {
                click: (e: Event) => {
                    e.stopPropagation();
                    props.onClick(String(this.props.id));
                }
            }
        })
    }

    public get props() {
        return this._props as IChatItemProps;
    }

    protected render(): string {
        const {id,title,avatar,unread_count,last_message_content,last_message_time} = this._props as IChatItemProps;

        return (`
            <li class="chat-item">
                <div class="chat-item__avatar">
                  {{{ Avatar imageUrl=${avatar} isLoadAvatar=false size='sm' }}}
                </div>
                <div class="chat-item__caption">
                    <div class="chat-item__caption__name" id='${id}'>
                        ${title}
                    </div>
                    ${last_message_time ? `<div class="chat-item__caption__time">
                        ${ getShortDate(last_message_time)}
                    </div>` : ``}
                    
                </div>
                 ${last_message_content ? ` <div class="chat-item__message">
                    <div class="chat-item__message__content">
                        <p> ${last_message_content}</p>
                    </div>
                    ${unread_count ? `{{{ Button type="number" caption='${unread_count}' }}}` : ''}
                </div>` : ` <div class="chat-item__message__content">
                        <p> no messages</p>
                    </div>`}
               
            </li>
        `)
    }
}
