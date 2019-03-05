---
layout: post
title:  "Quick Sort"
categories: blog
description: 快速排序
---

关于快速排序的文章很多，内容很翔实，只想完善一些细节。 ：D

- 快速排序的优势之一为可以原地排序，所以需要额外的空间的算法就没有什么优点了。
- 如果快速排序的基准数从最左侧开始选，我们应该从最右侧开始遍历。
- 快速排序不是一个稳定算法，这意味着如果一个数组中有两个元素的内容相同，它们可能会被交换。

## 代码

为了能说明基准数和开始点的问题，这里给一个`ts`的原地快速排序实现：

```ts
const swap = <T>(arr: T[],left: number: 0,right: number = arr.length - 1): void => {

    const temp: T = arr[left];

    arr[left] = arr[right];
    arr[right] = temp;
    return;
};

const quickSort = <T>(arr: T[],left: number: 0,right: number = arr.length - 1) => {

  if(left > right){
    return;
  }

  let lp = left; // 左游标
  let rp = right; // 右游标

  const pivot: T = arr[left]; // 基准数选择最左侧的数

  while(lp != rp) {

    // 在游标不越过彼此的情况下，从右向左，寻找下一个比基准数小的数
    while(lp < rp && arr[rp] >= pivot) {
        rp--;
    }
    // 在游标不越过彼此的情况下，从左向右，寻找下一个比基准数大的数
    while(lp < rp && arr[lp] <= pivot) {
        lp++;
    }

    // 在游标不越过彼此的情况下，交换两个数，使比基准数小的右侧数放置于油表左侧
    if(lp < rp) {
        swap(arr, lp, rp)
    }
  }

  // 交换基准数
  arr[left] = arr[lp];
  arr[lp] = pivot;

  // 递归
  quickSort(arr, left, lp - 1);
  quickSort(arr, lp + 1, right);

  return arr;
};
```

## 基准数和开始点

举一个例子 `4 1 7 9 10 5 2`

1. 选择最左侧的基准数`4`
2. 左游标处于`4`的位置，从右向左寻找