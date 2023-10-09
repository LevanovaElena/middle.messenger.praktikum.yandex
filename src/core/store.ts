import EventBus from "./event-bus.ts";

export enum StoreEvents {
    Updated = 'Updated'
}

export class Store<State extends Record<string, any>> extends EventBus {
    private state: State = {} as State;

    constructor(initState: State) {
        super();
        this.state = initState;
        this.on(StoreEvents.Updated, this._set.bind(this));
    }

    public getState() {
        return this.state;
    }

    private _set(nextState: Partial<State>) {
        const prevState = {...this.state};
        this.set(nextState);
        this.emit(StoreEvents.Updated, prevState, nextState);
    }

    public set(nextState: Partial<State>) {
        this.state = {...this.state, ...nextState};
    }
}
