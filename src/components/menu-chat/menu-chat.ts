import {IProps, Block} from "../../utils/Block";
import {IChat} from "../../models/IChat.ts";


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
            console.log('add user!');
            this.props.closeMenu();
        }
        props.deleteUser = () => {
            console.log('delete User!');
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
