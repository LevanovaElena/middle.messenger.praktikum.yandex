import {assert} from "chai";
import Route from "../route.ts";
import {Page404} from "../../pages";

describe('Route', () => {
    it('Object should create correct', () => {
        const route = new Route('/login', Page404, {});
        assert.equal(route.pathname, '/login');
    });
    describe('Route Methods', () => {
        let route:Route;
        beforeEach(()=>{
            route = new Route('/login', Page404, {});
        })

        it('match return true for pathname', () => {
            assert.equal( route.match('/login'),true);
        });

        it('match return false for another pathname', () => {
            assert.equal(  route.match('/signup'),false);
        });
        it('navigate works correct', () => {
            route.navigate('/login');
        });

        it('leave works correct', () => {
            route.leave();
        });

    });
});
