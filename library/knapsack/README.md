### 0-1 背包问题

给定 `N` 种物品和一个容量为 `C` 的背包。
物品 `i` 的重量为 `w[i]`，其价值为 `v[i]`。

问应该如何选择装入背包中的物品，使得装入背包中物品的总价值最大？

- - -

### 例子

```
n = 3
c = 4
```

| 价值 | 重量 |
| --- | --- |
| 3 | 4 |
| 2 | 3 |
| 1.5 | 1 |

|     | 剩余 0 | 1   | 2   | 3   | 4   |
| --- | ---   | --- | --- | --- | --- |
|物品1 | 0     | 0   | 0   | 0   | 3   |
|物品2 | 0     | 0   | 0   | 2   | 3   |
|物品3 | 0     | 1.5 | 1.5 | 2   | 3.5 |

- - -

### Ref
+ https://www.youtube.com/watch?v=6rIn-G79r8c  
+ https://www.jianshu.com/p/a66d5ce49df5  
+ https://augustineaykara.github.io/Knapsack-Calculator/
+ https://stackoverflow.com/questions/29853579/do-you-need-to-sort-inputs-for-dynamic-programming-knapsack
+ https://stackoverflow.com/questions/44148051/why-swap-the-item-order-of-the-knapsack-lead-to-the-same-solution
