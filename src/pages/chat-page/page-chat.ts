import {IProps, Block} from "../../core/block.ts";

export class PageChat extends Block {

    constructor() {
        const props: IProps = {
            events: {}
        }
        super(props);
    }

    protected render(): string {
        return (`
           <div class="chat-page">
                <div class="chat-page__left">
                    {{{ ChatList }}}
                </div>
                <div class="chat-page__main">
                    {{{ MessageList }}}
                </div>
            </div>
        `)
    }
}
