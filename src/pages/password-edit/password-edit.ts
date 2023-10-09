import {IProps,Block} from "../../core/Block.ts";
import {IUser} from "../../models/IUser.ts";
import {updateUserPassword} from "../../services/user-settings.ts";

export interface ILoginPageProps extends IProps {
    onChange:(event:Event)=>void,
    user:IUser|null
}
export class PagePasswordEdit extends Block {

    constructor() {
        const props:ILoginPageProps={
            events:{},
            user:window.store.getState().user,
            onChange: async (event: Event) => {
                event.preventDefault();
                const oldPassword = this.refs.form.getRefs()?.oldPassword.value();
                const newPassword = this.refs.form.getRefs()?.newPassword.value();
                const repeatPassword = this.refs.form.getRefs()?.repeatPassword.value();

                if (oldPassword && newPassword && newPassword === repeatPassword) await updateUserPassword({
                    oldPassword,
                    newPassword
                })
            }
        }

        super(props);

    }

    getChildren() {
        return (
            `{{{ InputWide label='Old Password' type='password' name='oldPassword' validate=validate.password ref='oldPassword' readOnly=false  }}}
            {{{ InputWide label='New Password' type='password' name='newPassword' validate=validate.password ref='newPassword' readOnly=false  }}}
            {{{ InputWide label='Repeat New Password' type='password' name='repeatPassword' validate=validate.password ref='repeatPassword' readOnly=false }}}
            
            `
        )
    }

    protected render(): string {
        return (`
            <form class="container">
                {{{ FormProfile user=user withButton=true  children="${this.getChildren()}" ref="form" buttonPage='pageProfile' onClickOkButton=onChange buttonText='Save Password' }}}
            </form>`)
    }
}
