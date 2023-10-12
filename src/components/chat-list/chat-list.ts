import {IProps, Block} from "../../core/block.ts";
import {IChat} from "../../models/IChat.ts";
import {IUser} from "../../models/IUser.ts";
import modalController from "../../core/modal-controller.ts";
import ModalPrompt from "../modal-prompt";
import {createChat} from "../../services/chat.ts";
import {updateChats, setStateCurrentChat} from "../../services/app.ts";
import {StoreEvents} from "../../core/store.ts";


interface IChatListProps extends IProps {
    list: IChat[],
    currentUser: IUser | null,
    showModalAddChat: () => void,
    setCurrentChat: (chat: string) => void
}

export class ChatList extends Block {
    constructor(props: IChatListProps) {

        props.currentUser = window.store.getState().user;
        props.list = window.store.getState().chats || [];
        props.showModalAddChat = () => {
            modalController.addModal((new ModalPrompt({
                caption: 'Add Chat',
                labelText: 'Title Chat',
                okText: 'Add Chat',
                ref: "modal",
                okClick: (result: string) => {
                    createChat(result).then(async () => await updateChats())
                },
            })) as unknown as Block);
            modalController.openModal();
        }
        props.setCurrentChat = (id: string) => {
            const chat = this.props.list.find(item => item.id === Number(id)) || null;
            setStateCurrentChat(chat).then(() => {
                this.setProps(this.props)
            })
        }


        super({
            ...props
        })

        window.store.on(StoreEvents.Updated, () => {
            this.props.currentUser = window.store.getState().user;
            this.props.list = window.store.getState().chats || [];
            this.setProps(this.props);
        });
    }

    public get props() {
        return this._props as IChatListProps;
    }

    getChats(list: IChat[]): string {
        if (!list || list.length === 0) return '';
        return list.map(chat => {
            return (`  {{{ChatItem 
                    onClick=setCurrentChat 
                    id='${chat.id} '
                    title='${chat.title} '
                    avatar='${chat.avatar} '
                    unread_count='${chat.unread_count > 0 ? String(chat.unread_count) : ''}'
                    last_message_content='${chat.last_message ? chat.last_message.content : 'no messages'} '
                    last_message_time='${chat.last_message ? chat.last_message.time : ''}' }}} `)
        }).join('')
    }

    protected render(): string {
        const {list, currentUser} = this.props;
        //if (!list || list.length === 0) return '';
        return (`            
            <div class="chat-list">
                <nav class="chat-list__header">
                ${currentUser && `{{{ Avatar imageUrl='${currentUser.avatar || ''}' size='sm' }}}`}
                {{{Button caption="New Chat" type='link' onClick=showModalAddChat }}}
                 {{{Link caption="Profile" href="/settings"  linkIcon=true }}}
                </nav>
<!--                <div class="chat-list__search">
                    {{{ InputSearch }}}
                </div>-->
                <ul class="chat-list__chats">
                    ${this.getChats(list)}                   
                </ul>
                <div class="chat-list__footer">
                  
                </div>
            </div>
        `)
    }
}
