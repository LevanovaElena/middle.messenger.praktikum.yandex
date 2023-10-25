import Block from "../block.ts";
import { expect} from "chai";
import sinon from "sinon";

describe('Block', () => {

    class Component extends Block {
        constructor(props :{text:string,events:{}} ) {
            super(props);
        }
        public get props() {
            return this._props as {text:string,events:{}};
        }
        render(): string {
            return '<div></div>'
        }
    }
    it('Create Component is correct', () => {

        const block=new Component({text:'text',events:{}});
        expect(block.getContent()).not.null;
    });
    it('Component should render', () => {

        const block=new Component({text:'text',events:{}});
       const render= sinon.spy(block,'render');
        expect(render.calledOnce);
    });
    it('Component should render again after change props', () => {

        const block=new Component({text:'text',events:{}});
        const render= sinon.spy(block,'render');
        expect(render.calledOnce);
        block.props.text='new text';
        block.setProps( block.props);
        expect(render.called);
    });
});
