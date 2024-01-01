class IncrementId {
    constructor() {
        this._id = -1;
    }

    getId() {
        this._id++;
        return this._id;
    }

    reset() {
        this._id = -1;
    }
}

const incrementIdTarget = {
    id: -1,
    reset() {
        this.id = -1;
    }
};

const incrementIdByProxy = new Proxy(incrementIdTarget, {
    get(target, prop) {
        if (prop === 'id') {
            target.id = target.id + 1;
            return target.id;
        }
        if (prop === 'reset') {
            return target.reset;
        }
    }
});


// console.log(incrementIdByProxy.id);
// console.log(incrementIdByProxy.id);
// console.log(incrementIdByProxy.id);
// console.log(incrementIdByProxy.id);
// console.log(incrementIdByProxy.id);
// incrementIdByProxy.reset()
// console.log(incrementIdByProxy.id);
// console.log(incrementIdByProxy.id);
// console.log(incrementIdByProxy.id);
// console.log(incrementIdByProxy.id);
// console.log(incrementIdByProxy.id);
