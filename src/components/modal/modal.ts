import {IProps, Block} from "../../utils/Block";
import {ALL_VALIDATE_FIELDS, IValidateType} from "../../models/IValidateType.ts";

interface IModalProps extends IProps {
    caption: string,
    okText: string,
    okClick: (event: Event) => void,
    cancelText: string,
    cancelClick: () => void,
    children?: string,
    validate?: IValidateType,
}

export class Modal extends Block {
    constructor(props: IModalProps) {
        props.validate= ALL_VALIDATE_FIELDS;
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
