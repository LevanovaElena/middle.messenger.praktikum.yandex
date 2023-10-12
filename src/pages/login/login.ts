import {IProps, Block} from "../../core/block.ts";
import {BASE_URLS} from "../../config.ts";
import { signIn} from "../../services/auth.ts";



export interface ILoginPageProps extends IProps {
    onLogin: (event: Event) => void;
}

export class LoginPage extends Block {
    constructor() {
        const props: ILoginPageProps = {
            events: {},
            onLogin: (event: Event) => {
                event.preventDefault();
                const login = this.refs.formLogin.getRefs()?.login.value();
                const password = this.refs.formLogin.getRefs()?.password.value();

                if (!login) {
                    return;
                }
                if (!password) {
                    return;
                }
                signIn({login, password}).catch((error)=>console.log('login',error))

            }
        }
        super(props);
    }

    protected render(): string {
        const children: string = `
        {{{ InputShort label='Login' type='text' name='login' validate=validate.login ref='login' }}}
        {{{ InputShort label='Password' type='password' name='password' validate=validate.password ref='password' }}}`
        return (`
            <form class="container container-center">
                {{{ FormAuth 
                        caption="Login" 
                        captionOk="Login" 
                        captionCancel="Sign up"                
                        onClickOkButton=onLogin 
                        children="${children}" 
                        ref="formLogin" 
                        cancelLink="${BASE_URLS['page-sign-up']}"
                }}}
            </form>`)
    }
}
