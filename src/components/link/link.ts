import {IProps,Block} from "../../core/block.ts";
import Router from "../../core/router.ts";

interface ILinkProps extends IProps{
    caption: string,
    page?: string,
    href?: string,
    id?: string,
    type: string,
    linkIcon?:boolean,
    linkLine?:boolean,
    onClick:(event: Event)=>void,
}

export class Link extends Block {
    constructor(props: ILinkProps) {
        super({
            ...props,
            events: {
                click: (event: Event)=>{
                    if(!this.props.onClick)Router.getRouter().go(props.href||'/');
                    this.props.onClick&& this.props.onClick(event);
                }
            }
        })
    }
    public get props(){
        return this._props as ILinkProps;
    }
    protected render(): string {
        const {  caption='', page='' ,linkIcon=false,linkLine=false,type='',id} = this.props;
        const classLink=`link ${type?`link-${type}`:''} ${linkLine?'link-line':''}`
        return (`
            <a 
               class="${classLink}"
               ${page ? `page=${page}` : ''}
               id='${id ? id : ''}'
               >
                ${caption}
                ${linkIcon ? '<div class="link-icon"></div>' : ''}
            </a>
        `)
    }
}
