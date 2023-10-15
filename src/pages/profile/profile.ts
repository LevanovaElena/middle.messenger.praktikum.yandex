import {IProps, Block} from "../../core/block.ts";
import {IUser} from "../../models/IUser.ts";
import {StoreEvents} from "../../core/store.ts";
import {showAlert} from "../../utils/api.utils.ts";
import {updateUserPassword, updateUserProfile} from "../../services/user-settings.ts";
import Router from "../../core/router.ts";

export interface IPageProfileProps extends IProps {
    user: IUser | null;
    isEditPassword?: boolean;
    isEditProfile?: boolean;
    onChangePassword: (event: Event) => void,
    onChangeProfile: (event: Event) => void,
    onChangeStateForm: (isEditPassword: boolean, isEditProfile: boolean) => void,
    onCancel: () => void,
}

export class PageProfile extends Block {

    constructor() {

        const props: IPageProfileProps = {
            user: window.store.getState().user,
            events: {
                submit: (event: Event) => {
                    console.log('sub')
                    if (this.props.isEditPassword) {
                        this.props.onChangeProfile(event)
                    }
                    if (this.props.isEditProfile) {
                        this.props.onChangeProfile(event)
                    }
                }
            },
            onCancel: () => {
                if (this.props.isEditProfile || this.props.isEditPassword) {
                    this.props.onChangeStateForm(false, false);
                    return;
                }
                Router.getRouter().back();
            },
            onChangeStateForm: (isEditPassword: boolean, isEditProfile: boolean) => {
                this.props.isEditProfile = isEditProfile;
                this.props.isEditPassword = isEditPassword;
                this.setProps(this.props);
            },
            onChangePassword: async (event: Event) => {
                event.preventDefault();
                const oldPassword = this.refs.form.getRefs()?.oldPassword.value();
                const newPassword = this.refs.form.getRefs()?.newPassword.value();
                const repeatPassword = this.refs.form.getRefs()?.repeatPassword.value();

                if (newPassword !== repeatPassword) showAlert('Repeat new password correct!');
                if (oldPassword && newPassword && newPassword === repeatPassword) {
                    await updateUserPassword({
                        oldPassword,
                        newPassword
                    });
                    this.props.onChangeStateForm(false, false);
                }
            },
            onChangeProfile: async (event: Event) => {
                event.preventDefault();
                const login = this.refs.form.getRefs()?.login.value();
                const email = this.refs.form.getRefs()?.email.value();
                const phone = this.refs.form.getRefs()?.phone.value();
                const first_name = this.refs.form.getRefs()?.first_name.value();
                const second_name = this.refs.form.getRefs()?.second_name.value();
                const display_name = this.refs.form.getRefs()?.display_name.value();

                const userData: IUser = {
                    login,
                    second_name,
                    first_name,
                    display_name,
                    phone,
                    email
                }
                if (login && first_name && second_name && phone && email) {
                    await updateUserProfile(userData);
                    this.props.onChangeStateForm(false, false);
                }
            }
        }
        window.store.on(StoreEvents.Updated, () => {
            this.props.user = window.store.getState().user;
            this.setProps(this.props);
        });
        super(props);
    }

    public get props() {
        return this._props as IPageProfileProps;
    }

    getChildrenPassword() {
        return (
            `{{{ InputWide label='Old Password' type='password' name='oldPassword' validate=validate.password ref='oldPassword' readOnly=false  }}}
            {{{ InputWide label='New Password' type='password' name='newPassword' validate=validate.password ref='newPassword' readOnly=false  }}}
            {{{ InputWide label='Repeat New Password' type='password' name='repeatPassword' validate=validate.password ref='repeatPassword' readOnly=false }}}
            
            `
        )
    }

    getChildrenEditProfile() {
        const {user, isEditProfile = false} = this.props;
        if (!user) return ''
        const {email, login, first_name, second_name, display_name, phone} = user;
        return (
            `{{{ InputWide label='Email' type='email' name='email' validate=validate.email ref='email' readOnly=${!isEditProfile} value='${email}' }}}
            {{{ InputWide label='Login' type='text' name='login' validate=validate.login ref='login' readOnly=${!isEditProfile} value='${login}'  }}}
            {{{ InputWide label='First Name' type='first_name' name='first_name' validate=validate.name ref='first_name' readOnly=${!isEditProfile} value='${first_name}'  }}}
            {{{ InputWide label='Second Name' name='second_name' validate=validate.name ref='second_name' readOnly=${!isEditProfile} value='${second_name}'  }}}
            {{{ InputWide label='Name in Chat' name='display_name' validate=validate.displayName ref='display_name' readOnly=${!isEditProfile}  value='${display_name || ''}' }}}
            {{{ InputWide label='Phone'  name='phone' validate=validate.phone ref='phone' readOnly=${!isEditProfile}  value='${phone}' }}} 
                    
            `
        )

    }

    protected render(): string {
        const {user, isEditProfile = false, isEditPassword = false} = this.props;
        if (!user) return (`
        <div class="container container-center">
             {{{Loader }}}
        </div>
        `);
        return (`
            <form class="container">
                {{{ FormProfile user=user 
                    withButton=${isEditProfile || isEditPassword}  
                    children="${isEditPassword ? this.getChildrenPassword() : this.getChildrenEditProfile()}"
                    ref="form"
                    onChangeStateForm=onChangeStateForm
                    onCancel=onCancel
                    ${isEditProfile ?
            `onClickOkButton=onChangeProfile buttonText='Save User Profile' ` :
            isEditPassword ?
                `onClickOkButton=onChangePassword buttonText='Save Password'` : ''
        }
                    
                   
                }}}
            </form>`)
    }

}
