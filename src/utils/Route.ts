import Block, {IProps} from "./Block.ts";

class Route {
    private _pathname: string;
    private readonly _blockClass: Block;
    private _block:Block|null=null;
    private readonly _props: IProps;

    constructor(pathname:string, view:Block, props:object) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    /**
     * navigate — метод для отображения вьюшки, если переданный URL совпадает с URL текущего Route;
     * @param pathname
     */
    navigate(pathname:string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    /**
     * leave — вызывает hide у элемента;
     */
    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname:string) {
        return pathname===this._pathname;
    }

/**
 * render — создаёт блок, если тот ещё не был создан (нужно создавать блок только после первого
 * перехода на страницу), иначе вызывает у блока метод show.
 * */
    render() {
        if (!this._block) {
            // @ts-ignore
            this._block = new this._blockClass(this._props);
            this.render();
            return;
        }

        this._block.show();
    }
}
export default Route
