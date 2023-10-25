import Block from "./block.ts";
import Route from "./route.ts";

class Router {
    private static __instance: Router;
    private routes: Route[] | undefined;
    private history: History | undefined;
    private _currentRoute: null | Route=null;
    private readonly _rootQuery: string | undefined;
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

    public get currentRoute(){
        return this._currentRoute;
    }
    public currentRoutePathName(){
        return this._currentRoute?this._currentRoute.pathname:null;
    }
    /**
     * use — регистрирует блок по пути в роут и возвращает себя — чтобы можно было выстроить в цепочку;
     * @param pathname
     * @param block
     */
    use(pathname:string, block:typeof Block) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes?.push(route);
        return this;
    }

    /**
     * start — по событию onpopstate запускает приложение.
     */
    start() {
        window.onpopstate = (event) => {
            this._onRoute((event?.currentTarget as Window)?.location?.pathname);
        };
        this._onRoute(window.location.pathname);
    }

   private _onRoute(pathname:string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.navigate(pathname);
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
        if(!this.routes||this.routes.length===0)return null;
        return this.routes.find(route => route.match(pathname));
    }
}

export default Router;
