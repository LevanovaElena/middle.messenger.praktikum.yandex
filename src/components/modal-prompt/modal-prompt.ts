import {IProps, Block} from "../../core/block.ts";
import modalController from "../../core/modal-controller.ts";

interface IModalPromptProps extends IProps {
    caption: string,
    labelText: string,
    okText: string,
    okClick?: (result?:string) => void,
    okInputClick?: (event:Event) => void,
    cancelClick?: () => void,
    ref?:string,
    info?:boolean
}

export class ModalPrompt extends Block {
    constructor(props: IModalPromptProps) {
        props.okInputClick = (event:Event) => {
            event.preventDefault();
            if(props.info){
                this.props.okClick&&this.props.okClick();
                return;
            }
            const input = this.refs.modal.getRefs().input.value();
            if (!input) {
                return;
            }
            this.props.okClick&&this.props.okClick(input);
            modalController.closeModal();
        }
        props.cancelClick = () => {
            modalController.closeModal();
        }



        super({
            ...props
        })
    }


    public get props() {
        return this._props as IModalPromptProps;
    }

    getChildren() {
        const {labelText = '',info=false} = this.props;
        if(info)
            return `<h6>${labelText}</h6>`
        return (
            `
                {{{ InputShort label='${labelText}' type='text' name='input' validate=validate.nameChat ref='input' }}}             
            `
        )
    }

    protected render(): string {
        return (`
                 {{{  Modal 
                         caption='${this.props.caption}' 
                         okText='${this.props.okText}' 
                         cancelText='Cancel' 
                         okClick=okInputClick 
                         cancelClick=cancelClick 
                         children="${this.getChildren()}" 
                         ref='modal'
                 }}}
        `)
    }
}
