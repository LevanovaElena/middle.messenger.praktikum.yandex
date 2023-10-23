import Block from "../block.ts";
import {assert} from "chai";

describe('Route', () => {
    it('Create Block is correct', () => {

        const block = new Block({});
        console.log(block.getContent())
        assert.equal(block.getContent(), null)
    });
});
