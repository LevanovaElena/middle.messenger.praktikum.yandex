import {IProps, Block} from "../../utils/Block";

interface IModalProps extends IProps {
    caption: string,
    okText: string,
    okClick: () => void,
    cancelText: string,
    cancelClick: () => void,
    children?: string,
}

export class Modal extends Block {
    constructor(props: IModalProps) {
        super({
            ...props
        })
    }

    public get props() {
        return this._props as IModalProps;
    }

    protected render(): string {
        const {caption = '', okText = '', cancelText = '',children=''} = this.props;
        return (`
                <form class="modal ">
                    <h2 class="modal__header">
                        ${caption}
                    </h2>
                     <div>
                        ${children}
                    </div>
                    <div class="modal__footer">
                        {{{ Button caption="${okText}" onClick=okClick }}}
                        {{{ Button caption="${cancelText}" onClick=cancelClick type='link'}}}
                    </div>
                </form>
        `)
    }
}
