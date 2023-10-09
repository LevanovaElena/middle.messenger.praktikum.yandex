import  {IProps,Block} from "../../core/Block.ts";

interface IButtonProps extends IProps{
    type: 'arrow' | 'dots'|'paperclip'|'cancel'|'number'|'close',
    caption: string,
    page: string,
    onClick: () => void
}

export class Button extends Block {
    constructor(props: IButtonProps) {
        super({
            ...props,
            events: {
                click: props.onClick || (() => {})
            }
        })
    }

    protected render(): string {
        const { type='', caption='', page='' } = this._props as IButtonProps;
        return (`
            <button type="button" class="button ${type?"button-"+type:""}" 
            ${page ? `page="${page}"` : ''}> 
                ${caption}
            </button>
        `)
    }
}
