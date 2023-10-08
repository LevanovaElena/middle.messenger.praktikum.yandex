import {IProps, Block} from "../../utils/Block";
import {IChat} from "../../models/IChat.ts";
import modalController from "../../utils/modal-controller.ts";
import {ModalChatUsers} from "../index.ts";



interface IMenuChatProps extends IProps {
    currentChat: IChat | null,
    isOpenedMenu: boolean,
    addUser: () => void,
    deleteUser: () => void,
    changeAvatarChat: () => void,
    closeMenu: () => void,
}

export class MenuChat extends Block {
    constructor(props: IMenuChatProps) {
        props.currentChat = window.currentChat;
        props.addUser = () => {
            console.log('add user!',props.currentChat);
            modalController.addModal((new ModalChatUsers({
                users: [],
                type:'add',
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
                users: window.currentChat?.users||[],
                type:'delete',
                ref: "modal",
                okClick: (result: string) => {
                    console.log(result);
                },
            })) as unknown as Block);
            modalController.openModal();
            this.props.closeMenu();
        }
        props.changeAvatarChat = () => {
            console.log(' add Avatar Chat!');
            this.props.closeMenu();
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
                </ul>
            </nav>
        `)
    }
}
