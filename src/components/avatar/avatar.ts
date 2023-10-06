import {IProps, Block} from "../../utils/Block";
import modalController from "../../utils/modal-controller.ts";
import {Modal} from "../index.ts";

interface IAvatarProps extends IProps {
    size: 'sm' | 'md',
    isLoadAvatar: boolean,
    onClickLoadAvatar: () => void,
    imageUrl: string
}

export class Avatar extends Block {
    constructor(props: IAvatarProps) {
        super({
            ...props,
            events: {
                click: () => {
                    console.log('cancel')
                    modalController.openModal();
                }
            }
        })
        modalController.addModal((new Modal({
            okText: "Save",
            cancelClick: () => {
                console.log('cancel')
                //modalController.closeModal()
            },
            okClick: () => console.log('ok'),
            cancelText: 'Cancel',
            caption: 'Add Avatar'
        })) as unknown as Block);
    }

    protected render(): string {
        const {size = 'md', isLoadAvatar = false, imageUrl = ''} = this._props as IAvatarProps;
        return (`
            <div class="avatar ${size}">
                ${imageUrl ? `
                    <img src='${imageUrl}' alt="image avatar" class="avatar__image"/>` : ``}
                ${isLoadAvatar ? `
                    <div class="avatar__hover">
                        <div class="avatar__hover__text">Load New Avatar</div>                        
                    </div>` : ""}
            </div>
                 `)
    }
}
