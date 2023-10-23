import Block from "../block.ts";
import {assert} from "chai";
//import {expect} from "chai";

describe('Block', () => {
    it('Create Block is correct', () => {

        const block=new Block({});
        console.log(block.getContent())
        assert.equal(block.getContent(),null)
    });

   /* describe('Проверка авторизации через форму', () => {
        it('Проверяем валидные данные в signin', () => {
        });

        it('Проверяем валидные данные в signup', () => {
        });
    });

    describe('Дополнительный функционал при авторизации', () => {
        it('Что-то дополнительно связанное с авторизацией', () => {
        });
    });*/
});
