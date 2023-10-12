import {IProps, Block} from "../../core/block.ts";
import {IChat} from "../../models/IChat.ts";


interface IMenuMessageProps extends IProps {
    currentChat: IChat | null,
    isOpenedMenu: boolean,
    addMedia: () => void,
    addFile: () => void,
    addLocation: () => void,
    closeMenu: () => void,
}

export class MenuMessage extends Block {
    constructor(props: IMenuMessageProps) {
        props.currentChat = window.store.getState().currentChat;
        props.addMedia = () => {
            console.log('add media!');
            this.props.closeMenu();
        }
        props.addFile = () => {
            console.log('add file!');
            this.props.closeMenu();
        }
        props.addLocation = () => {
            console.log('add location!');
            this.props.closeMenu();
        }

        super({
            ...props
        })
    }

    public get props() {
        return this._props as IMenuMessageProps;
    }

    protected render(): string {
        const {isOpenedMenu = false} = this.props;
        return (`            
            <nav class='${`menu menu-message container-shadow ${isOpenedMenu ? 'opened' : 'hide'}`}'>
                <ul >
                    {{{ MenuItem caption='Picture or Video' onClick=addMedia icon='media' }}}
                    {{{ MenuItem caption='File' onClick=addFile icon='file' }}}
                    {{{ MenuItem caption='Location' onClick=addLocation icon='location' }}}
                </ul>
            </nav>
        `)
    }
}
