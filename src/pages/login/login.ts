import {IProps, Block} from "../../utils/Block";
import {BASE_URLS} from "../../config.ts";
import { signIn} from "../../services/auth.ts";
import Router from "../../utils/Router.ts";


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

                console.log({
                    login,
                    password
                })
                if (!login) {
                    return;
                }
                if (!password) {
                    return;
                }
                signIn({login, password}).catch((error)=>console.log(error)).then(()=>Router.getRouter().go(BASE_URLS['page-chat']))
            }
        }
       // getUser().catch(error=>console.log(error))
        super(props);
        //console.log('window.user', window.user)
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
