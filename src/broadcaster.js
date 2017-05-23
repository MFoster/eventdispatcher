/**
 * The problem is when you have one object listen to another
 * its sending it a function reference.  This reference is used by the 
 * broadcasting object to invoke when the event is fired.  The issue
 * is that when the listening object is destroyed, the broadcasting function
 * maintains a reference to the now destroyed objects function reference.
 * If the broadcaster were to fire the event, the innate listener would still
 * be there.
 * 
 * Backbones solution is to use a hash map and all event aware object a
 * listening id to purge references from the broadcasters' event chain.
 * 
 * This solution is to create a listener object when attaching an 
 * event object.  The Listener class would allow both the listening object
 * and the broadcaster to share a reference to the listener that would 
 * manage the following things.
 * 1) The function reference that will be invoked when the event is fired
 * 2) The name of the event
 * 3) A reference to the array that will hold itself.  When the listener is destroyed
 * it will remove the reference from the array, ensuring it will not be invoked
 * after the listening object has been destroyed.
 */
import Listener from "./listener";
import util from "../node_modules/lodash/lodash";

export default class Broadcaster {
	constructor() {
		//The listeners this object has attached to other objects events
		this.listeners = [];
		//A hash of listeners that this object will fire when its event is triggered.
		this.events = {};
	}
 	listen(name, cb, owner) {
		this.events[name] = this.events[name] || [];
		let listener = this.createListener(name, cb, owner);
		this.events[name].push(listener);
		return listener;
	}
	createListener(name, cb, owner) {
		return new Listener(name, cb, this.events[name], owner);
	}
	fire() {
		let args = Array.prototype.slice.call(arguments),
		    name = args.shift(),
		    arr = this.events[name] || [];
		for(let i = 0, len = arr.length; i < len; i++) {
			arr[i].fire(args);
		}
	}
    stopListening(param) {
		if(util.isString(param)){
			this.events[name] = [];
		} else {
			this.events = {};
		}
	}
	destroy() {
		util.invoke(this.listeners, 'destroy');
		this.listeners = [];
		this.events = {};
	}
}