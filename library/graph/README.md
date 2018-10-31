### Graph

#### 1. 背景
  
Graph实例中保存了一个有向图，  
```
{
    a:[
        b,
        c,
        x
    ],
    b:[
        c
    ]
}
```
  
并且提供了一些常用的图操作方法，  
（1）给有向图添加边  
（2）获取所有的顶点  
（3）转换成JSON  
（4）获取顶点路径依赖的顶点集合  
（5）获取顶点被哪些顶点直接依赖、路径依赖  
  
#### 2. 接口

##### 2.1 构造函数

**（1）无参构造函数**  
```
new Graph();
```
创建一个空的有向图。  

**（2）传入邻接表**  
```
new Graph(adjacencyList);
```
根据邻接表创建一个有向图。  

##### 2.2 添加边

```
graph.addEdges(vertex, otherVertexes);
```
添加从`vertex`到`otherVertexes`的多条边。  

##### 2.3 获取所有顶点

```
{
    a:[
        b,
        c,
        x
    ],
    b:[
        c
    ]
}
```
如上有向图，`c`它不依赖其他顶点（出度为`0`），  
在获取顶点时，是否包含`c`这样的顶点，我们提供了两个方法。  

**（1）获取所有顶点（不包括出度为`0`的顶点）**  

```
graph.getAllVertexes();
```

**（2）获取所有顶点（包含出度为`0`的顶点）**

```
graph.getAllDepVertexes();
```

##### 2.4 转换成JSON

我们可以将图转换成邻接表进行保存，它是一个JSON，  
```
graph.toJSON();
```

##### 2.5 获取给定顶点所路径依赖的顶点合集

```
graph.getDeps(vertexes, includeSelf);
```

其中，`includeSelf`表示结果中是否包含当前给定的这些顶点。  

##### 2.6 获取给定顶点被哪些顶点所路径依赖

```
graph.getRefs(vertexes, includeSelf);
```

其中，`includeSelf`表示结果中是否包含当前给定的这些顶点。  

##### 2.7 获取给定节点被哪些节点直接依赖

```
graph.getDirectRefs(vertexes);
```

##### 2.8 合并两个有向图

```
graph.merge(anotherGraph, noDuplicateKey);
```

其中，`noDuplicateKey`表示遇到重名顶点时是否报错。  
