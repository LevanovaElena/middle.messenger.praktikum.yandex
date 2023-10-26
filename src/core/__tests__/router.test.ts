import {assert, expect} from "chai";
import Router from "../router.ts";
import { Page404, Page500, } from "../../pages";
import sinon from "sinon";


describe('Router', () => {
    let router: Router;

    beforeEach(() => {
        router = new Router(".app");

    });
    const setRouters = () => {
        if (router) {
            router.use('/login', Page404)
                .use('/sign-up', Page500)
        }
    }
    it('Object should create correct', () => {
        expect(router).not.null;
        expect(router.currentRoute).null;
        expect(router.currentRoutePathName()).null;
    });
    it('Object should get only one instance', () => {

        const router1 = new Router(".app1");
        assert.equal(router1, router);
    });
    describe('Router Methods', () => {
        it('use return instance of router and added route', () => {
            assert.equal(router.getRoute('/login'), null);
            assert.equal(router.use('/login', Page404), router);
            expect(router.getRoute('/login')).not.null;
        });
        it('getRoute should return route or null', () => {
            setRouters();
            expect(router.getRoute('/login')).not.null;
        });


        it('start added event onpopstate', () => {
            assert.equal(window.onpopstate, null);
            router.start();
            expect(window.onpopstate).not.null;
        });

        describe('Navigate Methods', () => {
            beforeEach(() => {
                setRouters();
            });
            it('go works correct', () => {
                const pushState = sinon.spy(window.history, "pushState");
                assert.equal(window.location.pathname, '/');
                router.go('/login');
                assert.equal(window.location.pathname, '/login');
                assert(pushState.calledOnce);
            });

            it('back works correct', () => {
                const back = sinon.spy(window.history, "back");
                router.go('/login');
                router.go('/signup');
                router.back();
                assert(back.calledOnce);
            });
            it('forward works correct', () => {
                const forward = sinon.spy(window.history, "forward");
                router.forward();
                assert(forward.calledOnce);
            });
        });
    });
});
