import './styles/main.pcss';
import * as Components from './components';
import * as Pages from './pages';
import {registerComponent} from "./utils/registerComponents";
import Router from "./utils/Router.ts";
import Block from "./utils/Block.ts";
import {BASE_URLS} from "./config.ts";
import {IUser} from "./models/IUser.ts";
import { initialStateApp} from "./services/app.ts";
import {IChat} from "./models/IChat.ts";




const allComponents = {
    'Button': Components.Button,
    'Avatar': Components.Avatar,
    'Badge': Components.Badge,
    'Input': Components.Input,
    'InputShort': Components.InputShort,
    'InputWide': Components.InputWide,
    'InputSearch': Components.InputSearch,
    'Link': Components.Link,
    'Error': Components.Error,
    'ChatItem': Components.ChatItem,
    'ChatList': Components.ChatList,
    'Message': Components.Message,
    'MessageList': Components.MessageList,
    'Loader': Components.Loader,
    'Modal': Components.Modal,
    'ModalAvatar': Components.ModalAvatar,
    'ModalPrompt': Components.ModalPrompt,
    'FormAuth': Components.FormAuth,
    'FormProfile': Components.FormProfile,
    'MenuItem': Components.MenuItem,
    'MenuMessage': Components.MenuMessage,
}
Object.entries(allComponents).forEach(([name, component]) => {
    registerComponent(name, component);
});

declare global {
    interface Window {
        user: IUser|null;
        chats:IChat[]|null;
        currentChat:IChat|null;
    }

    type Nullable<T> = T | null;

}
await initialStateApp();


const router = new Router(".app");

router.use(BASE_URLS['page-default'], Pages.PageChat as unknown as Block)
    .use(BASE_URLS['page-all-components'], Pages.AllComponentsPage as unknown as Block)
    .use(BASE_URLS['page-login'], Pages.LoginPage as unknown as Block)
    .use(BASE_URLS['page-sign-up'], Pages.PageRegistration as unknown as Block)
    .use(BASE_URLS['page-profile'], Pages.PageProfile as unknown as Block)
    .use(BASE_URLS['page-profile-edit'], Pages.PageProfileEdit as unknown as Block)
    .use(BASE_URLS['page-password-edit'], Pages.PagePasswordEdit as unknown as Block)
    .use(BASE_URLS['page-404'], Pages.Page404 as unknown as Block)
    .use(BASE_URLS['page-500'], Pages.Page500 as unknown as Block)
    .use(BASE_URLS['page-chat'], Pages.PageChat as unknown as Block)
    .start();
