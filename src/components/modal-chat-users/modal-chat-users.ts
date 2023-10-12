import {IProps, Block} from "../../core/Block.ts";
import modalController from "../../core/modal-controller.ts";
import {searchUsersByLogin} from "../../services/user-settings.ts";
import {IUser} from "../../models/IUser.ts";
import {UserItem} from "../index.ts";
import {addChatUser, deleteChatUsers} from "../../services/chat.ts";
import { setStateCurrentChat} from "../../services/app.ts";

interface IModalChatUsersProps extends IProps {
    okClick?: (result: string) => void,
    okInputClick?: (event: Event) => void,
    cancelClick?: () => void,
    ref?: string,
    type: 'add' | 'delete',
    users: IUser[] | null
}

export class ModalChatUsers extends Block {
    constructor(props: IModalChatUsersProps) {
        props.okInputClick = (event: Event) => {
            event.preventDefault();
            event.stopPropagation();
            const input = this.refs.modal.getRefs().input.value();
            if (!input) {
                return;
            }
            searchUsersByLogin(input).then((users) => {
                this.props.users = users;
                this.setProps(this.props)
            })
        }
        props.cancelClick = () => {
            modalController.closeModal();
        }


        super({
            ...props,
            events: {
                click: (e: Event) => {
                    e.stopPropagation();
                    const id = (e.target as HTMLElement).id;
                    const chat=window.store.getState().currentChat;
                    if ( chat&& id&&props.type==='add') {
                        addChatUser({
                            users: [Number(id)],
                            chatId: chat.id
                        }).then(() => {
                            setStateCurrentChat(chat).then(() => modalController.closeModal());
                        })
                    }
                    if(props.type==='delete'&&chat){
                        deleteChatUsers({
                            users: [Number(id)],
                            chatId:chat.id
                        }).then(() => {
                            setStateCurrentChat(chat).then(()=>modalController.closeModal());
                        })
                    }
                }
            }
        })
    }


    public get props() {
        return this._props as IModalChatUsersProps;
    }

    getChildren() {
        const {users, type} = this.props;
        const result = users?.reduce((sum, user) => {
            const item = new UserItem({user: user, icon: type === 'add' ? 'plus' : 'delete'});
            return sum + item.renderForList();
        }, '');
        return (
            `
                ${type === 'add' ? 
                `{{{ InputShort label='Login' type='text' name='input' validate=validate.login ref='input' }}} ` : ''}
                 
                <div class='modal-users'>${result}</div>                        
            `
        )
    }

    protected render(): string {
        return (`
                 {{{  Modal 
                         caption='${this.props.type === 'add' ? 'Add User' : 'Delete User'}' 
                         okText='${this.props.type === 'add' ?'Find users':'OK'}'
                         cancelText='Cancel' 
                         okClick=okInputClick 
                         cancelClick=cancelClick 
                         children="${this.getChildren()}" 
                         ref='modal'
                 }}}
        `)
    }
}
