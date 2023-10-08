import {IProps, Block} from "../../utils/Block";
import {IChat} from "../../models/IChat.ts";
import {ChatItem} from "../index.ts";
import {IChatItemProps} from "../chat-item/chat-item.ts";
import {IUser} from "../../models/IUser.ts";
import modalController from "../../utils/modal-controller.ts";
import ModalPrompt from "../modal-prompt";
import {createChat} from "../../services/chat.ts";
import {initChatPage} from "../../services/app.ts";

interface IChatListProps extends IProps {
    list: IChat[],
    currentUser: IUser | null,
    showModalAddChat:()=>void
}

export class ChatList extends Block {
    constructor(props: IChatListProps) {
        props.currentUser = window.user;
        props.list=window.chats||[];
        props.showModalAddChat = ()=>{
            modalController.addModal((new ModalPrompt({
                caption: 'Add Chat',
                labelText: 'Title Chat',
                okText: 'Add Chat',
                ref:"modal",
                okClick: (result:string) => {
                    console.log(result);
                    createChat(result).then(()=>initChatPage())
                },
            })) as unknown as Block);
            modalController.openModal();
        }

        super({
            ...props,
            events: {
                click: (e:Event) => {
                   if(!(e.target as HTMLElement).className.includes('chat-item__caption__name')) return;
                   console.log('load chat')
                }
            }
        })
        console.log(props.list)
    }

    getChats(list: IChat[]): string {
        if (!list || list.length === 0) return '';
        return list.map(chat => {
            const chatBlock = new ChatItem({chat: chat} as IChatItemProps)
            return (`
                ${chatBlock.renderForList()}
            `)
        }).join('')
    }

    protected render(): string {
        const {list,currentUser} = this._props as IChatListProps;

        return (`            
            <div class="chat-list">
                <nav class="chat-list__header">
                ${currentUser && `{{{ Avatar imageUrl='${currentUser.avatar}' size='sm' }}}`}
                {{{Button caption="New Chat" type='link' onClick=showModalAddChat }}}
                 {{{Link caption="Profile" href="/settings"  linkIcon=true }}}
                </nav>
                <div class="chat-list__search">
                    {{{ InputSearch }}}
                </div>
                <ul class="chat-list__chats">
                    ${this.getChats(list)}
                </ul>
            </div>
        `)
    }
}
