import Block, {IProps} from "../block.ts";
import { expect} from "chai";
import sinon from "sinon";

describe('Block', () => {

    interface IComponent extends IProps {
        text:string
    }
    class Component extends Block {
        constructor(props:IComponent ) {
            super(props);
        }
        public get props() {
            return this._props as IComponent;
        }
        render(): string {
            return '<div></div>'
        }
    }
    it('Create Component is correct', () => {

        const block=new Component({text:'text'});
        expect(block.getContent()).not.null;
    });
    it('Component should render', () => {

        const block=new Component({text:'text'});
       const render= sinon.spy(block,'render');
        expect(render.calledOnce);
    });
    it('Component should render again after change props', () => {

        const block=new Component({text:'text'});
        const render= sinon.spy(block,'render');
        expect(render.calledOnce);
        block.props.text='new text';
        block.setProps( block.props);
        expect(render.called);
    });
});
