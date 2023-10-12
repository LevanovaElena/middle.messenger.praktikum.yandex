import {IProps,Block} from "../../core/block.ts";

interface IInputSearch extends IProps{
    name: string,
    value: string,
    errorText: string,
    error:boolean ,
}

export class InputSearch extends Block {

    constructor(props:IInputSearch) {
        props.errorText='';
        props.error=false;
        super(props);

    }

    public value() {

        return this.refs?.input?.value()
    }
    protected render(): string {
        const { name = '', value = ''} = this._props as IInputSearch;

        return (`
           <label class="input-search">
                <span class="input-search__label">Search...</span>
                {{{ Input 
                    ref='input' 
                    type="text"
                    classes="input-search__value" 
                    value='${value}'
                    name="${name}"
                    placeholder=' '
                }}}
            </label>
        `)
    }
}
