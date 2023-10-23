import {IProps,Block} from "../../core/block.ts";

interface IBadgeProps extends IProps{
    type: 'primary' | 'ready',
    text: string,
}

export class Badge extends Block {
    constructor(props: IBadgeProps) {
        super(props);
    }

    protected render(): string {
        const { type='', text=''} = this._props as IBadgeProps;
        return (`
            <div class="badge ${type?"badge-"+type:""}">
                <span>${text}</span>
            </div>
        `)
    }
}
