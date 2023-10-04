import './styles/main.pcss';
import * as Components from './components';
import * as Pages from './pages';
import {registerComponent} from "./utils/registerComponents";
import Router from "./utils/Router.ts";
import Block from "./utils/Block.ts";



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
    'FormAuth': Components.FormAuth,
    'FormProfile': Components.FormProfile,
}
Object.entries(allComponents).forEach(([name, component]) => {
    registerComponent(name, component);
});


const router = new Router(".app");

// Можно обновиться на /user и получить сразу пользователя
router.use("/", Pages.LoginPage as unknown as Block)
    .use("/all", Pages.AllComponentsPage as unknown as Block)
    .use("/login", Pages.LoginPage as unknown as Block)
    .use("/sign-up", Pages.PageRegistration as unknown as Block)
    .use("/settings", Pages.PageProfile as unknown as Block)
    .use("/settings-edit", Pages.PageProfileEdit as unknown as Block)
    .use("/password-edit", Pages.PagePasswordEdit as unknown as Block)
    .use("/404", Pages.Page404 as unknown as Block)
    .use("/500", Pages.Page500 as unknown as Block)
    .use("/messenger", Pages.PageChat as unknown as Block)
    .start();
