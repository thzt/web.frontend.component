### Dependency
#### 1. 父子依赖关系
Dependency实例中保存了一些父子依赖关系，  
  
假设有以下两个依赖关系，  
```
parentKey -> childKey2,childValue1
parentKey -> childKey2,childValue2
```
  
Dependency，会采用两级Map进行存储，  
```
[ (parentKey -> [ (childKey1 -> childValue1), (childKey2 -> childValue2), ... ], ... ]
```
  
#### 2. 接口
##### 2.1 实例化
（1）构造函数  
```
const dependency = new Dependency;
```
  
（2）静态方法  
```
const dependency = Dependency.fromJSON(adjacentList);
```
  
其中`adjacentList`的结构如下，  
```
{
  "a": {
      "b": "x1",
      "c": "x2"
  },
  "b": {
      "d": "x3"
  }
}
```
  
##### 2.2 添加依赖
```
dependency.add({
    parent: {
        key: ...,
    },
    child: {
        key: ...,
        value: ...,
    },
});
```
  
如果已存在相同的父子依赖关系，会抛异常。  
```
Error: 已存在父子依赖关系\nparent: ${parentKey}\nchild: ${childKey}
```
  
##### 2.3 查询依赖关系
获取某个依赖关系中，保存在child中的值。  
```
dependency.getChildValue({
    parent: {
        key: ...,
    },
    child: {
        key: ...,
    },
});
```
  
##### 2.4 导出为JSON
```
const adjacentList = dependency.toJSON();
```
  
##### 2.5 遍历
```
const iter = dependency.walk();
const {done, value} = iter.next();
```
  
其中，`value`的结构如下，  
```
{
    parent: {
        key,
    },
    child: {
        key,
        value,
    },
    isLeaf,
}
```
  
包含了当前遍历到的父子依赖关系信息，以及是否叶子节点。  
  
### 3. 例子
```
const dep = new Dependency;

dep.add({parent:{key:'a'},child:{key:'b',value:'x1'}});
dep.add({parent:{key:'a'},child:{key:'c',value:'x2'}});
dep.add({parent:{key:'b'},child:{key:'d',value:'x3'}});

const json = dep.toJSON();
// {
//   "a": {
//       "b": "x1",
//       "c": "x2"
//   },
//   "b": {
//       "d": "x3"
//   }
// }

const iter = dep.walk({
    parent: {
        key: 'a',
    },
});

while(true){
    const {done,value} = iter.next();
    if(done){
        break;
    }

    console.log(JSON.stringify(value));
}
// {"parent":{"key":"a"},"child":{"key":"b","value":"x1"},"isLeaf":false}
// {"parent":{"key":"b"},"child":{"key":"d","value":"x3"},"isLeaf":true}
// {"parent":{"key":"a"},"child":{"key":"c","value":"x2"},"isLeaf":true}
```

