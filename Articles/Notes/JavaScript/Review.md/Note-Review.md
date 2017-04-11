## 我在写Review.md时了解的东西1

-   传递方法
    -   在很多时候直接调用方法是不行的，因为javascript的延迟激活，比如setinterval之类的，再比如在Review.md的读取文件，ajax，加载完成之后之类的。
    -   传递方法 -> 传递一个方法在当地调用，这个时候this的位置就改变了
        -   this的位置，variable.function()这类的调用方法只是js的语法糖，实际对于object调用方法的function只有call，而call的构建是\*.call(this,con1,con2)这样this的位置实际是自己控制的，而当使用语法糖的时候this的位置及就是当前的object，如果并没有这样的object那么this指代window。
        -   传递方法的时候this的位置改变了，我们无从考证的话就尽量避免使用this调用
-   Github RAW文件，可以在github存一些静态文件当作cdn使用，也可以放在上面让别人贡献简单可以当时好使的cdn
-   getURLVar， 这个方法我写在这个目录下面，可以在网址后面带上变量href时传递变量。这个值不能当时修改
-   另一个在那的方法可以通过正则表达式将传递到php的时候避免&和+还有?转为id，这样可以避免弄没了那些符号，因为在带过去的时候会自动把些符号当成分隔符吧，不知道
    -   这个可以完善一下
