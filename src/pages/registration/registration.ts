import {IProps, Block} from "../../core/block.ts";
import {signUp} from "../../services/auth.ts";
import {IUser} from "../../models/IUser.ts";
import {BASE_URLS} from "../../config.ts";
import {showAlert} from "../../utils/api.utils.ts";
import Router from "../../core/router.ts";

export interface IPageRegistrationProps extends IProps {
    onLogin: (event: Event) => void,
}

export class PageRegistration extends Block {
    constructor() {
        const onLogin = async (event: Event) => {
            event.preventDefault();
            const login = this.refs.form.getRefs()?.login.value();
            const email = this.refs.form.getRefs()?.email.value();
            const phone = this.refs.form.getRefs()?.phone.value();
            const first_name = this.refs.form.getRefs()?.first_name.value();
            const second_name = this.refs.form.getRefs()?.second_name.value();
            const password = this.refs.form.getRefs()?.password.value();
            const password2 = this.refs.form.getRefs()?.password2.value();
            if (password !== password2) {
                showAlert('Repeat passwords correct!');
                return;
            }
            const data = {
                first_name,
                second_name,
                login,
                email,
                password,
                phone
            } as IUser;
            if (Object.values(data).findIndex(value=>value==='')===-1) {

                await signUp(data);
                Router.getRouter().go(BASE_URLS['page-chat']);
            }

        }
        const props: IPageRegistrationProps = {
            events: {
                submit: async (event: Event) => {
                    await onLogin(event);
                }
            },
            onLogin: onLogin
        }

        super(props);

    }

    getChildren() {
        return (
            `{{{ InputShort label='Email' type='email' name='email' validate=validate.email ref='email' }}}
            {{{ InputShort label='Login' type='text' name='login' validate=validate.login ref='login' }}}
            {{{ InputShort label='First Name' type='first_name' name='first_name' validate=validate.name ref='first_name' }}}
            {{{ InputShort label='Second Name' name='second_name' validate=validate.name ref='second_name' }}}
            {{{ InputShort label='Phone'  name='phone' validate=validate.phone ref='phone' }}}
            {{{ InputShort label='Password' type='password' name='password' validate=validate.password ref='password' }}}
            {{{ InputShort label='Password (2nd time)' type='password' name='password2' validate=validate.password ref='password2' }}}`
        )
    }

    protected render(): string {

        return (`
            <form class="container container-center">
                {{{ FormAuth 
                    caption="Registration" 
                    captionOk="sign up" 
                    captionCancel="Cancel" 
                    pageOk="allPages" 
                    pageCancel="loginPage" 
                    onClickOkButton=onLogin 
                    children="${this.getChildren()}" 
                    ref="form" 
                    cancelLink="${BASE_URLS['page-login']}" 
                }}}
            </form>`)
    }
}
