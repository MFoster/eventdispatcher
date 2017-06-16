import Broadcaster from "../src/broadcaster";
import sinon from "sinon";
import { assert } from "chai";

describe("Event broadcaster", ()=>{
    it("should listen and fire a single event", ()=>{
        let b = new Broadcaster(),
            spy = sinon.spy();
            
        b.listen("derp", spy);
        b.fire("derp");

        assert.isTrue(spy.calledOnce);
    });

    it("should fire a single event and destroy the listener", ()=>{
        let b = new Broadcaster(),
            spy = sinon.spy();
        
        let listener = b.listen("derp", spy);
        b.fire("derp");
        listener.destroy();
        b.fire("derp");

        assert.isTrue(spy.calledOnce);
    });

    it("should be able to call the same event multiple times", ()=>{
        let b = new Broadcaster(),
            spy = sinon.spy();

        b.listen("derp", spy);
        for (let i = 0; i < 10; i++) {
            b.fire("derp");
        }

        assert.isTrue(10 === spy.callCount);
    });

    it("should be able to call various events and not interfere", ()=>{
        let b = new Broadcaster(),
            spyUno = sinon.spy(),
            spyDos = sinon.spy();

        b.listen("uno", spyUno);
        b.listen("dos", spyDos);

        b.fire("uno");
        b.fire("dos");
        b.fire("dos");

        assert.isTrue(spyUno.calledOnce);
        assert.isTrue(spyDos.calledTwice);

    });

    it("should not fire events after destroy", ()=>{
        let b = new Broadcaster(),
            spy = sinon.spy();

        b.listen("derp", spy);
        b.fire("derp");
        b.destroy();
        b.fire("derp");

        assert.isTrue(spy.calledOnce);
    });

    it("should stop listening to one event by name", ()=>{
        let b = new Broadcaster(),
            spyUno = sinon.spy(),
            spyDos = sinon.spy();
        
        b.listen("one", spyUno);
        b.listen("two", spyDos);
        b.fire("one");
        b.fire("two");
        b.stopListening("one");
        b.fire("one");
        b.fire("two")

        assert.isTrue(spyUno.calledOnce);
        assert.isTrue(spyDos.calledTwice);
    });

    it("should be able to call destroy twice", ()=>{
        let b = new Broadcaster();
        
        let listener = b.listen("derp");

        listener.destroy();
        listener.destroy();
    });

    it("should clear all events when stopListening is sent no name", ()=>{
        let b = new Broadcaster(),
            spy = sinon.spy();
        
        const cannon = ()=>{
            b.fire("one");
            b.fire("two");
            b.fire("three");
        };

        b.listen("one", spy);
        b.listen("two", spy);
        b.listen("three", spy);
        cannon();
        b.stopListening();
        cannon();

        assert.isTrue(spy.calledThrice);
    });
});
