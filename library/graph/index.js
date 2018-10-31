const union = require('./union');

// 一个与有向图相关的操作类
class Graph {
    constructor(adjacencyList = {}) {
        const graph = this;
        graph.adjacencyList = adjacencyList;
    }

    // 为给定顶点添加多条边
    addEdges(vertex, otherVertexes) {
        const graph = this;
        const { adjacencyList } = graph;

        adjacencyList[vertex] = adjacencyList[vertex] == null
            ? otherVertexes
            : adjacencyList[vertex].concat(otherVertexes);

        return graph;
    }

    // 获取所有的顶点
    getAllVertexes() {
        const graph = this;
        const { adjacencyList } = graph;

        return Object.keys(adjacencyList);
    }
    
    // 获取所有被依赖的顶点
    getAllDepVertexes() {
        const graph = this;
        const { adjacencyList } = graph;

        const result = Object.keys(adjacencyList).reduce((memo, vertex) => {
            const depVertexes = adjacencyList[vertex];

            depVertexes.forEach(depVertex => {
                memo[depVertex] = true;
            });

            return memo;
        }, {});

        return Object.keys(result);
    }

    // 转换成json
    toJSON() {
        const graph = this;
        const { adjacencyList } = graph;

        // deep copy
        // 使用stringify和parse复制一份全新的json对象，防止返回引用对象被误修改
        return JSON.parse(JSON.stringify(adjacencyList));
    }

    // 获取某些顶点所路径依赖顶点的并集，includeSelf表示结果是否包含当前这些顶点
    getDeps(vertexes, includeSelf = true) {
        const graph = this;
        const { adjacencyList } = graph;

        const search = (vertexes, adjacencyList) =>
            union(...vertexes.map(vertex => adjacencyList[vertex] == null ? [] : adjacencyList[vertex]))

        const depVertexes = graph._recursiveSearch(vertexes, search);
        return includeSelf ? union(vertexes, depVertexes) : depVertexes;
    }

    // 获取某些顶点被哪些节点所路径依赖，includeSelf表示结果是否包含当前这些顶点
    getRefs(vertexes, includeSelf = true) {
        const graph = this;
        const { adjacencyList } = graph;

        const search = (vertexes, adjacencyList) => graph.getDirectRefs(vertexes);

        const refVertexes = graph._recursiveSearch(vertexes, search);
        return includeSelf ? union(vertexes, refVertexes) : refVertexes;
    }

    // 获取顶点的一级依赖而不是路径依赖的顶点集合
    getDirectRefs(vertexes) {
        const graph = this;
        const { adjacencyList } = graph;

        const directRefs = Object.keys(adjacencyList).filter(vertex =>
            adjacencyList[vertex].some(depVertex => vertexes.some(vertex => depVertex === vertex)));

        return directRefs;
    }

    // 合并两个graph，noDuplicateKey表示遇到重名顶点时是否报错
    merge(anotherGraph, noDuplicateKey = true) {
        const graph = this;

        const json1 = graph.toJSON();
        const json2 = anotherGraph.toJSON();

        Object.keys(json2).forEach(key => {
            const value = json2[key];

            if (json1[key] != null && noDuplicateKey) {
                throw new Error(`duplicate key: ${key}`);
            }

            json1[key] = value;
        });

        return new Graph(json1);
    }

    // private method 

    // 一个递归函数，用来递归搜索路径依赖关系，直到最后一级的依赖为空
    _recursiveSearch(vertexes, search) {
        const graph = this;
        const { adjacencyList } = graph;

        const resultVertexes = search(vertexes, adjacencyList);
        if (resultVertexes.length === 0) {
            return resultVertexes;
        }

        return union(resultVertexes, graph._recursiveSearch(resultVertexes, search));
    }
}

module.exports = Graph;