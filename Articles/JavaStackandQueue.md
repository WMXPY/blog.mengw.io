# 堆栈和队列

### 堆栈

在Java中堆栈是util库中提供的，调用方法为mystack = new Stack();  
使用mystack.push(E)方法可以将E元素压入栈中，使用pop将其取出，使用peek可以return栈中第一个元素而使其保持在栈中不移除。

### 队列

队列的调用方法是myqueue = new Queue();  
调用方法和堆栈相似，即myqueue.add, remove, 如果出现期待以外的情况就会抛出指针错误。  
但是队列还有另一套方法，也是推荐使用的

1.  offer -> 添加一个元素并return ture 如果队列已满返回false
2.  poll -> 移除并返问队列头部的元素，如果队列为空，则返回null 
3.  peek -> 返回队列头部的元素， 如果队列为空，则返回null
