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
    
});
