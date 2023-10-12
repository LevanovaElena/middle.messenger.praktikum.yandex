import {Block} from "../../core/block.ts";

export class Loader extends Block {
    protected render(): string {
        return (`
            <span class="loader"></span>
        `)
    }
}
