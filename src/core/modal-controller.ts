import Block from "./block.ts";

class ModalController {
    private static __instance: ModalController;
    private dialog: HTMLDialogElement | null=null;

    constructor() {
        if (ModalController.__instance) {
            return ModalController.__instance;
        }
        ModalController.__instance = this;
        this.dialog= document.getElementById('dialog') as HTMLDialogElement;
    }

    public static getInstance() {
        return this.__instance;
    }

    public addModal(modal: Block) {
        const htmlElement = modal.getContent();
        if (!this.dialog?.firstElementChild) this.dialog?.append(document.createElement('div'));
        if(htmlElement)this.dialog?.firstElementChild?.replaceWith(htmlElement);
    }

    public openModal(){
        this.dialog?.showModal()
    }

    public closeModal(){
        this.dialog?.close()
    }

}
const modalController=new ModalController();
export default modalController;
