export class Graph {
    constructor() {
        this._vertices = 0;
        this._edges = 0;
        // 邻接表
        this._adjacent = {};
    }

    v() {
        return this._vertices;
    }

    e() {
        return this._edges;
    }

    /**
     * 在顶点v和顶点w上加一条边Edge
     * @param {*} v
     * @param {*} w
     */
    addEdge(v, w) {
        if (!this._adjacent[v]) {
            this._adjacent[v] = {};
        }
        if (!this._adjacent[w]) {
            this._adjacent[w] = {};
        }
        this._adjacent[w] = v;
        this._adjacent[v] = w;
    }

    /**
     * 顶点v的邻居
     * @param {*} v
     */
    adjacent(v) {
        return Object.keys(this._adjacent[v] || {});
    }
}
