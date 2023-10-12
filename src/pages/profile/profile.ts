import {IProps,Block} from "../../core/block.ts";
import {IUser} from "../../models/IUser.ts";
import {StoreEvents} from "../../core/store.ts";

export interface IPageProfileProps extends IProps {
    user:IUser|null
}
export class PageProfile extends Block {

    constructor() {
        const props:IPageProfileProps= {
            user: window.store.getState().user,
            events: {}
        }
        window.store.on(StoreEvents.Updated, () => {
            this.props.user={...window.store.getState().user}as IUser;
            this.setProps(this.props);
        });
        super(props);
    }
    public get props(){
        return this._props as IPageProfileProps;
    }
    getChildren() {
        const user=(this._props as IPageProfileProps).user;
        if(!user )return ''
        const {email,login,first_name,second_name,display_name,phone}=user;
        return (
            `{{{ InputWide label='Email' type='email' name='email' validate=validate.email ref='email' readOnly=true value='${email}' }}}
            {{{ InputWide label='Login' type='text' name='login' validate=validate.login ref='login' readOnly=true value='${login}'  }}}
            {{{ InputWide label='First Name' type='first_name' name='first_name' validate=validate.name ref='first_name' readOnly=true value='${first_name}'  }}}
            {{{ InputWide label='Second Name' name='second_name' validate=validate.name ref='second_name' readOnly=true value='${second_name}'  }}}
            {{{ InputWide label='Name in Chat' name='display_name' validate=validate.name ref='display_name' readOnly=true  value='${display_name||''}' }}}
            {{{ InputWide label='Phone'  name='phone' validate=validate.phone ref='phone' readOnly=true  value='${phone}' }}}            
            `
        )

    }

    protected render(): string {
        if((this._props as IPageProfileProps).user){
            return (`
            <form class="container">
                {{{ FormProfile user=user withButton=false  children="${this.getChildren()}" ref="form"  }}}
            </form>`)
        }
        else return ''

    }
}
