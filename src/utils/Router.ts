import Block from "./Block.ts";
import Route from "./Route.ts";

class Router {
    private static __instance: Router;
    private routes: Route[] | undefined;
    private history: History | undefined;
    private _currentRoute: null | Route=null;
    private _rootQuery: string | undefined;
    constructor(rootQuery:string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    public static getRouter(){
        return this.__instance;
    }
    /**
     * use — регистрирует блок по пути в роут и возвращает себя — чтобы можно было выстроить в цепочку;
     * @param pathname
     * @param block
     */
    use(pathname:string, block:Block) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes?.push(route);
        return this;
    }

    /**
     * start — по событию onpopstate запускает приложение.
     */
    start() {
        // Реагируем на изменения в адресной строке и вызываем перерисовку
        window.onpopstate = event => {
            // @ts-ignore
            this._onRoute(event?.currentTarget?.location?.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname:string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            // @ts-ignore
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    /**
     * go — переходит на нужный роут и отображает нужный блок;
     * @param pathname
     */
    go(pathname:string) {
        this.history?.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    /**
     * back — возвращает в прошлое состояние и показывает блок, соответствующий тому состоянию;
     */
    back() {
        this.history?.back();

    }

    /**
     * forward — переходит в следующие состояние и показывает соответствующий блок;
     */
    forward() {
        this.history?.forward();

    }

    getRoute(pathname:string) {
        return this.routes?.find(route => route.match(pathname));
    }
}

export default Router;
