import {IProps, Block} from "../../core/block.ts";
import alertController from "../../core/alert-controller.ts";

interface IModalProps extends IProps {
    message: string,
    okClick?: (event: Event) => void,
}

export class Alert extends Block {
    constructor(props: IModalProps) {
       props.okClick=()=>{
           alertController.closeModal();
       }

        super({
            ...props
        })
    }

    public get props() {
        return this._props as IModalProps;
    }

    protected render(): string {
        const {message = ''} = this.props;
        return (`
                <div class="alert">
                    <p class="alert__message">
                        ${message}
                    </p>                   
                    <div class="alert__close">
                     {{{ Button onClick=okClick type='close'}}}</div>
                </div>
        `)
    }
}
