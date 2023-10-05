import {BASE_URLS} from "../config.ts";
import Router from "./Router.ts";



export const responseHasError=(response:XMLHttpRequest)=>{
    switch (response.status) {
        case 200:return false;
        case 500:
            Router.getRouter().go(BASE_URLS['page-500']);
            break;
        default:
            return JSON.parse( response.responseText).reason;

    }
}
