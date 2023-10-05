import {IProps,Block} from "../../utils/Block";
import {ALL_VALIDATE_FIELDS, IValidateType} from "../../models/IValidateType.ts";

interface IFormAuthProps extends IProps {
    caption: string,
    children: string,
    onClickOkButton: (event:Event) => void,
    onClickCancelButton: (event:Event) => void,
    captionOk: string,
    captionCancel: string,
    validate:IValidateType,
    cancelLink:string
}
export class FormAuth extends Block {
    constructor(props:IFormAuthProps) {
        props.validate= ALL_VALIDATE_FIELDS;
        /*props.onClickOk={
            console.log('OK');
            props.onClickOkButton(event)
        }*/
        super(props);
    }

    protected render(): string {
        const {caption='Login',children='',captionOk,captionCancel,cancelLink}=this._props as IFormAuthProps;
        return(`
            <div class="container-form container-shadow">
            <h2 class="container-form__header">
                ${caption}
            </h2>
            <div>
                ${children}
            </div>
            <div class="container-form__buttons">
                {{{ Button caption="${captionOk}"  onClick=onClickOkButton }}}
                {{{ Link caption="${captionCancel}" href="${cancelLink}" }}}
            </div>
        </div>
        `)
    }
}
