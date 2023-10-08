import {IProps,Block} from "../../utils/Block";


export interface IMenuItemProps extends IProps {
    caption:string,
    icon:'media'|'file'|'location'|'plus'|'delete'|'avatar';
    onClick:()=>void;
}

export class MenuItem extends Block {
    constructor(props: IMenuItemProps) {
        super({
            ...props,
            events: {
                click: () => {
                    this.props.onClick();
                }
            }
        })
    }

    public renderForList=this.render;
    public get props(){
        return this._props as IMenuItemProps;
    }
    protected render(): string {
        const { caption='',icon} = this.props;
        return (`
            <li class="menu-item">
                <div class='menu-item__icon ${`menu-item__icon_` + icon}'></div>
                <p  class='menu-item__caption'>${caption}</p>               
            </li>
        `)
    }
}
