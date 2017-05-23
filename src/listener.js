/**
 * Should listen to events and return listener object.
 * Listener object can remove listener that it attached when
 * generated.
 * 
 * Each event dispatch object manages a list of listener objects.
 * When destroying itself, it stops listening on all of its listener objects.
 * This will be shared between listener and speaker.
 * Listener spawns its own event to remove itself.
 * 
 */
export class Listener{
	constructor(name, cb, arr, owner) {
		this.name = name;
		this.cb = cb;
		this.arr = arr;
		this.owner = owner || this;
		this.destroyed = false;
	}

	destroy() {
		if(this.destroyed){
			return;
		}
		this.destroyed = true;
		this.arr = util.reject(this.arr, this);
	}

	fire(args) {
		if(this.destroyed){
			return;
		}
		this.cb.apply(this.owner, args);
	}
}