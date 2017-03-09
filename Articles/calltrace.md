# js 的调度栈与抛出错误

在调用js的方法的时候，该方法会被压入调度栈，我们可以通过console.trace()方法输出调度栈

```javascript
function a(){
    b();
}
function b(){
    console.trace()
    return;
}
```

在以上的代码被执行时，我们可以看到b方法的栈位置在a之上。如果b方法抛出了一个错误，整个栈会被关闭。  
在使用trycatch代码块时，调度栈会被独立处理，如果在try代码块中抛出错误catch(error)函数被执行，而try代码块的调度栈会被跳过并继续执行余下的代码。  
try还可以嵌套try

```javascript
try{
    try{
        throw new Error('a error');
    }catch(error){
        console.log(error);
    }
}catch(error){
    console.log(error);
}
```

在以上的代码中，try抛出了a error错误，而两个catch会接连嵌套的打印a error错误。
