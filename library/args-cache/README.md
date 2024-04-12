请实现一个 m 函数，使其具备以下能力：

神秘的 m 方法...
```
function m() {}
```

比如有一个方法 sum
```
function sum(a: number, b: number) {
  return a + b
}
```

```
const msum = m(sum)

msum(1, 2) // 返回 3，结果通过计算得到
msum(1, 2) // 第二次以及之后的调用，直接从缓存中返回 3
```