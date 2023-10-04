import {IProps,Block} from "../../utils/Block";
import {IUser} from "../../models/IUser.ts";
import {ALL_VALIDATE_FIELDS, IValidateType} from "../../models/IValidateType.ts";

interface IFormProfileProps extends IProps{
    user:IUser,
    withButton:boolean,
    children: string,
    buttonText:string,
    buttonPage:string,
    buttonCancelPage:string,
    onClickOkButton: (event:Event) => void,
    validate:IValidateType,

}
export class FormProfile extends Block {
    constructor(props:IFormProfileProps) {
        props.validate= ALL_VALIDATE_FIELDS;

        super(props);
    }

    protected render(): string {
        const {user,withButton=false,children='',buttonText='',
            buttonCancelPage=''}=this._props as IFormProfileProps;
        const {avatar,first_name,second_name}=user;

        return(`
      
        <div class="profile">
            <div class="profile__avatar">
                {{{ Avatar image=${avatar} isLoadAvatar=true }}}
                <h2 class="profile__avatar__name">${first_name} ${second_name}</h2>
            </div>
            ${user ?
            `<div class = "profile__main" >
                ${children}
            </div>`:''
            }
             ${withButton ?
                `<div class="profile__button">
                    {{{ Button caption="${buttonText}" onClick=onClickOkButton }}}
                </div>`:            
                `<div class="profile__buttons">
                    {{{Link caption="Change IUser Data" href='/profile-edit' type='success' linkLine=true  }}}
                    {{{Link caption="Change Password" href='/password-edit' type='success' linkLine=true  }}}
                    {{{Link caption="Cancel" href='/chat' type='danger' }}}
                </div>`}
            </div>
            <div class="block-cancel">
                {{{ Button type="cancel" page="${buttonCancelPage}" }}}
            </div>
        `)
    }
}
