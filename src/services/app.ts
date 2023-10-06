import {getUser} from "./auth.ts";
import Router from "../utils/Router.ts";
import {BASE_URLS} from "../config.ts";

const initialStateApp = async () => {

    let result = null;
    try {
        result = await getUser();
    } catch (error) {
        Router.getRouter().go(BASE_URLS['page-login']);
        return;
    }
    window.user=result;
    console.log('window.user_initial', window.user,Router.getRouter())
    /*const chats = await getChats();
    window.store.set({user: me, chats});
    navigate('emails')*/

}


export{
    initialStateApp
}
