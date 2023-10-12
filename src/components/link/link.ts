import {IProps,Block} from "../../core/block.ts";
import Router from "../../core/router.ts";

interface ILinkProps extends IProps{
    caption: string,
    page?: string,
    href?: string,
    type: string,
    linkIcon?:boolean
    linkLine?:boolean
}

export class Link extends Block {
    constructor(props: ILinkProps) {
        super({
            ...props,
            events: {
                click: ()=>{
                    Router.getRouter().go(props.href||'/');
                }
            }
        })
    }
    public get props(){
        return this._props as ILinkProps;
    }
    protected render(): string {
        const {  caption='', page='' ,linkIcon=false,linkLine=false,type=''} = this.props;
        const classLink=`link ${type?`link-${type}`:''} ${linkLine?'link-line':''}`
        return (`
            <a 
               class="${classLink}"
               ${page?`page=${page}`:''}>
                ${caption}
                ${linkIcon ? '<div class="link-icon"></div>' : ''}
            </a>
        `)
    }
}
