import {IProps, Block} from "../../utils/Block";
import modalController from "../../utils/modal-controller.ts";
import { ModalAvatar} from "../index.ts";
import {BASE_RESOURCES_URL} from "../../config.ts";

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
                    if(!props.isLoadAvatar)return;
                    modalController.addModal((new ModalAvatar({
                        oldAvatar:window.user?.avatar||''
                    })) as unknown as Block);
                    modalController.openModal();
                }
            }
        })

    }

    protected render(): string {
        const {size = 'md', isLoadAvatar = false, imageUrl = ''} = this._props as IAvatarProps;
        return (`
            <div class="avatar ${size}">
                ${imageUrl ? `
                    <img src='${BASE_RESOURCES_URL+imageUrl}' alt="image avatar" class="avatar__image"/>` : ``}
                ${isLoadAvatar ? `
                    <div class="avatar__hover">
                        <div class="avatar__hover__text">Load New Avatar</div>                        
                    </div>` : ""}
            </div>
                 `)
    }
}
