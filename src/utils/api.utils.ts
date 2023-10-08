import {BASE_URLS} from "../config.ts";
import Router from "./Router.ts";
import alertController from "./alert-controller.ts";
import Alert from "../components/alert";
import Block from "./Block.ts";


export const responseHasError = (response: XMLHttpRequest) => {
    switch (response.status) {
        case 200:
            return false;
        case 500:
            Router.getRouter().go(BASE_URLS['page-500']);
            break;
        default: {
            const error = JSON.parse(response.responseText).reason;
            if (error.includes('Cookie')) {
                showAlert('Please, login!');
            } else showAlert(error);
            if (error) throw Error(error);
        }

    }
}

export const showAlert = (message: string) => {
    alertController.addModal((new Alert({
        message: message || ''
    })) as unknown as Block);
    alertController.openModal();
}
