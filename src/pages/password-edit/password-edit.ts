import Block from "../../utils/Block.ts";
import {mockUser} from "../../mocks/user-profile.mocks.ts";

export class PagePasswordEdit extends Block {
    constructor() {
        super({
            user:mockUser,
            onChange: (event: Event) => {

                event.preventDefault();
                const oldPassword = this.refs.form.getRefs()?.oldPassword.value();
                const newPassword = this.refs.form.getRefs()?.newPassword.value();
                const repeatPassword = this.refs.form.getRefs()?.repeatPassword.value();

                console.log({
                    oldPassword,
                    newPassword,
                    repeatPassword,
                })
            }
        });
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
                {{{ FormProfile withButton=true  children="${this.getChildren()}" ref="form" buttonPage='pageProfile' onClickOkButton=onChange buttonText='Save Password' }}}
            </form>`)
    }
}
