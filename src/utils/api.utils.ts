import {BASE_URLS} from "../config.ts";
import Router from "../core/router.ts";
import alertController from "../core/alert-controller.ts";
import Alert from "../components/alert";
import Block from "../core/block.ts";
import modalController from "../core/modal-controller.ts";


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
               // showAlert('Please, login!');
                return error;
            } else {
                if(modalController.opened)showModalAlert(error);
                else showAlert(error);
            }
            //if (error) throw Error(error);
            return error;
        }

    }
}

export const showAlert = (message: string) => {
    alertController.addModal((new Alert({
        message: message || ''
    })) as unknown as Block);
    alertController.openModal();
}

export const showModalAlert = (message: string) => {
    alertController.addModal((new Alert({
        message: message || ''
    })) as unknown as Block);
    alertController.open();
}
