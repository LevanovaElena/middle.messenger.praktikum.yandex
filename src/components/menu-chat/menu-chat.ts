import {IProps, Block} from "../../core/block.ts";
import {IChat} from "../../models/IChat.ts";
import modalController from "../../core/modal-controller.ts";
import {ModalAvatar, ModalChatUsers} from "../index.ts";
import ModalPrompt from "../modal-prompt";
import {deleteChat} from "../../services/chat.ts";
import {setStateCurrentChat, updateChats} from "../../services/app.ts";


interface IMenuChatProps extends IProps {
    currentChat: IChat | null,
    isOpenedMenu: boolean,
    addUser: () => void,
    deleteUser: () => void,
    changeAvatarChat: () => void,
    closeMenu: () => void,
    deleteChat: () => void,
}

export class MenuChat extends Block {
    constructor(props: IMenuChatProps) {
        props.currentChat = window.store.getState().currentChat;
        props.addUser = () => {
            modalController.addModal((new ModalChatUsers({
                users: [],
                type: 'add',
                ref: "modal",
                okClick: (result: string) => {
                    console.log(result);
                },
            })) as unknown as Block);
            modalController.openModal();
            this.props.closeMenu();
        }
        props.deleteUser = () => {
            modalController.addModal((new ModalChatUsers({
                users: window.store.getState().currentChat?.users || [],
                type: 'delete',
                ref: "modal",
                okClick: (result: string) => {
                    console.log(result);
                },
            })) as unknown as Block);
            modalController.openModal();
            this.props.closeMenu();
        }
        props.changeAvatarChat = () => {
            modalController.addModal((new ModalAvatar({
                oldAvatar: window.store.getState().currentChat?.avatar || '',
                type: 'chat'
            })) as unknown as Block);
            modalController.openModal();
            this.props.closeMenu();
        }

        props.deleteChat = () => {
            modalController.addModal((new ModalPrompt({
                caption: 'Delete Chat',
                labelText: 'Are you sure you want to delete the chat?',
                okText: 'Delete Chat',
                ref: "modal",
                info: true,
                okClick: () => {
                    if (!window.store.getState().currentChat) return;
                    const id = window.store.getState().currentChat?.id;
                    if (!id) return;
                    deleteChat(id)
                        .then(async () => {
                            await updateChats();
                            await setStateCurrentChat(null);
                            modalController.closeModal();
                        })
                        .catch((error) => console.warn(error));
                },
            })) as unknown as Block);
            modalController.openModal();
        }
        super({
            ...props
        })
    }

    public get props() {
        return this._props as IMenuChatProps;
    }

    protected render(): string {
        const {isOpenedMenu = false} = this.props;
        return (`            
            <nav class='${`menu menu-chat container-shadow ${isOpenedMenu ? 'opened' : 'hide'}`}'>
                <ul >
                    {{{ MenuItem caption='Add User' onClick=addUser icon='plus' }}}
                    {{{ MenuItem caption='Delete User' onClick=deleteUser icon='delete' }}}
                    {{{ MenuItem caption='Change Chat Avatar' onClick=changeAvatarChat icon='avatar' }}}
                    {{{ MenuItem caption='Delete Chat' onClick=deleteChat icon='danger' }}}
                </ul>
            </nav>
        `)
    }
}
