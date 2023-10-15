import {IProps, Block} from "../../core/block.ts";
import {BASE_URLS} from "../../config.ts";
import { signIn} from "../../services/auth.ts";
import {IUser} from "../../models/IUser.ts";
import {StoreEvents} from "../../core/store.ts";



export interface ILoginPageProps extends IProps {
    onLogin: (event: Event) => void;
    currentUser?: IUser|null;
    isLoading?: boolean;
}

export class LoginPage extends Block {
    constructor() {
        const onLogin=(event: Event) => {
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

        };
        const props: ILoginPageProps = {
            events:{
                submit:(event: Event)=>{
                    onLogin(event);
                }
            },
            onLogin: onLogin,
            currentUser:undefined,
            isLoading:window.store.getState().isLoading

        }
        window.store.on(StoreEvents.Updated, () => {
            this.props.currentUser = window.store.getState().user;
            this.props.isLoading = window.store.getState().isLoading;
            console.log( window.store.getState().user)
           this.setProps(this.props);
        });
        super(props);
    }
    public get props() {
        return this._props as ILoginPageProps;
    }

    protected render(): string {
        const {currentUser}=this.props;
        if(currentUser===undefined)
            return ` <div class="container container-center">
                 {{{Loader }}}
            </div>`;


        const children: string = `
        {{{ InputShort label='Login' type='text' name='login' validate=validate.login ref='login' }}}
        {{{ InputShort label='Password' type='password' name='password' validate=validate.password ref='password' }}}`;
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
