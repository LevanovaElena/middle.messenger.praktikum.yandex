import './styles/main.pcss';
import * as Components from './components';
import * as Pages from './pages';
import {registerComponent} from "./core/register-components.ts";
import Router from "./core/router.ts";
import Block from "./core/Block.ts";
import {BASE_URLS} from "./config.ts";
import { initialStateApp} from "./services/app.ts";
import {IAppState} from "./models/IAppState.ts";
import {Store} from "./core/store.ts";

Object.entries(Components).forEach(
    ([componentName, component]) => registerComponent(componentName, component)
)


declare global {
    interface Window {
        store: Store<IAppState>;
    }

    type Nullable<T> = T | null;

}

const initState: IAppState = {
    error: null,
    user: null,
    currentChat:null,
    chats: []
}

window.store =new Store<IAppState>(initState);

const router = new Router(".app");
await initialStateApp();




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
