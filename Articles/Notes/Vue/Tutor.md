作者：LowesYang
链接：https://zhuanlan.zhihu.com/p/25003235
来源：知乎
著作权归作者所有，转载请联系作者获得授权。

在双向绑定的简单实现——基于“脏检测”中，我们使用“脏检测”的机制，实现了一个简单的双向绑定计数器。尽管逻辑比较清晰简单，性能也还可以，但每次都遍历DOM节点，也是会有一些性能浪费的。ES5提供了Object.defineProperty与Object.defineProperties两个API，允许我们为对象的属性增设getter/setter函数。利用它们，我们可以很方便地监听数据变更，并且在变更时加入自己的逻辑。
本文我将利用ES5对象的getter/setter机制，模仿Vue的原理，来实现一个简单的双向绑定（暂且称为Lue吧）。


语法设计

本次我基于Vue的三个指令：v-model、v-bind和v-click，来实现数据双向绑定。DOM依然沿用上篇文章中的结构：

<div id="app">
    <form>
        <input type="text" v-model="count" />
        <button type="button" v-click="increment">increment</button>
    </form>
    <p v-bind="count"></p>
</div>
我们希望使用类似Vue的语法创建一个Lue实例：

var app=new Lue({
    el:"#app",
    data:{
        count:0,
    },
    methods:{
        increment:function(){
            this.count++;
        }
    }
})
开始

开始的开始，我们需要创建一个Lue类：

function Lue(options){
    this._init(options);
}
其中包含一个_init初始化函数，定义如下：

Lue.prototype._init=function(options){
    this.$options=options;                              //传入的实例配置
    this.$el=document.querySelector(options.el);        //实例绑定的根节点
    this.$data=options.data;                            //实例的数据域
    this.$methods=options.methods;                      //实例的函数域
};
绑定数据对象的改造

为了实现双向绑定，首先我们需要使用Object.defineProperty对data中的数据对象进行改造，添加getter/setter函数，使其在赋值和取值时能够被监听。

/**对象属性重定义
 * @param key 数据对象名称，本例为"count"
 * @param val 数据对象的值
 */
Lue.prototype.convert=function(key,val){
    Object.defineProperty(this.$data,key,{
        enumerable:true,
        configurable:true,
        get:function(){
            console.log(`获取${val}`);
            return val;
        },
        set:function(newVal){
            console.log(`更新${newVal}`);
            val=newVal;
        }
    })
};
对data中的数据对象进行遍历调用convert：

//遍历数据域，添加getter/setter
Lue.prototype._parseData=function(obj){
    var value;
    for(var key in obj){
        //排除原型链上的属性，仅仅遍历对象本身拥有的属性
        if(obj.hasOwnProperty(key)){
            value=obj[key];
            //如果属性值为对象，则递归解析
            if(typeof value ==='object'){
                this._parseData(value);
            }
            this.convert(key,value);
        }
    }
};
在控制台做如下测试，可以看到已经成功添加了getter与setter：


绑定函数的改造

对于methods域中的函数，由于API要求我们的函数作用域与vm.$data一致，因此需要对其中的函数进行改造：

//遍历函数域，对绑定的函数进行改造
Lue.prototype._parseFunc=function(funcList){
    var _this=this;
    for(var key in funcList){
        if(funcList.hasOwnProperty(key)) {
            var func=funcList[key];
            funcList[key] = (function () {
                return function () {
                    func.apply(_this.$data, arguments);
                }
            })();
        }
    }
};
上述两个改造流程必须发生在初始化阶段，因此我们需要更改一下之前定义的_init函数：

Lue.prototype._init=function(options){
    this.$options=options;                              //传入的实例配置
    this.$el=document.querySelector(options.el);        //实例绑定的根节点
    this.$data=options.data;                            //实例的数据域
    this.$methods=options.methods;                      //实例的函数域

    this._parseData(this.$data);
    this._parseFunc(this.$methods);
};
至此，对于Lue实例的数据与函数的初始化就完成了。下面需要考虑的是，当数据发生变化时，如何更新DOM元素呢？

最容易想到的一个做法是遍历所有含有v-bind指令的DOM模板，利用相应的绑定数据在内存中拼装成一个fragment，然后再将新的fragment替换旧的DOM结构。但是这个方案存在两个问题：

修改未绑定至DOM的数据时，也会引发DOM的重新渲染。
修改某个数据会导致所有DOM重新渲染，而非只更新数据变动了的相关DOM 。
为了解决这个问题，我们需要引入Directive。

Directive（指令）

Directive的作用就是建立一个DOM节点和对应数据的映射关系。它的定义和原型方法如下：

function Directive(name,el,vm,exp,attr){
    this.name=name;         //指令名称，例如文本节点，该值设为"text"
    this.el=el;             //指令对应的DOM元素
    this.vm=vm;             //指令所属Lue实例
    this.exp=exp;           //指令对应的值，本例如"count"
    this.attr=attr;         //绑定的属性值，本例为"innerHTML"

    this.update();          //首次绑定时更新
}
Directive.prototype.update=function(){
    //更新DOM节点的预设属性值
    this.el[this.attr]=this.vm.$data[this.exp];
};
如此便实现了更改某个数据，只触发其对应DOM节点的更新。
下面我们需要考虑的问题是，如何让数据对象的setter在触发时，调用与之相关的directive？

首先我们需要在实例化时建立一个_binding对象，该对象集合了真正与DOM绑定的那些数据对象（data中声明的对象的子集）。因此我们又一次修改_init函数：

Lue.prototype._init=function(options){
    this.$options=options;                              //传入的实例配置
    this.$el=document.querySelector(options.el);        //实例绑定的根节点
    this.$data=options.data;                            //实例的数据域
    this.$methods=options.methods;                      //实例的函数域

    //与DOM绑定的数据对象集合
    //每个成员属性有一个名为_directives的数组，用于在数据更新时触发更新DOM的各directive
    this._binding={};
    this._parseData(this.$data);
    this._parseFunc(this.$methods);
};
_binding对象中属性的一个例子如下：

this._binding={
    count:{
        _directives:[]          //该数据对象的相关指令数组
    }
}
然后我们改写遍历数据域的函数与绑定数据时的setter函数：

//遍历数据域，添加getter/setter
Lue.prototype._parseData=function(obj){
    var value;
    for(var key in obj){
//排除原型链上的属性，仅仅遍历对象本身拥有的属性
        if(obj.hasOwnProperty(key)){
            this._binding[key]={        //初始化与DOM绑定的数据对象
                _directives:[]
            };
            value=obj[key];
            //如果属性值为对象，则递归解析
            if(typeof value ==='object'){
                this._parseData(value);
            }
            this.convert(key,value);
        }
    }
};
set:function(newVal){
    console.log(`更新${newVal}`);
    if(val!==newVal){
        val=newVal;
        //遍历该数据对象的directive并依次调用update
        binding._directives.forEach(function(item){
            item.update();
        })
    }
}
如此，我们便能实现在数据变更后，进行精准的DOM节点更新。

编译DOM节点

实现双向绑定的最后一步，就是编译带有v-model、v-click与v-bind指令的DOM节点。我们加入一个名为_compile的原型函数：

//解析DOM的指令
Lue.prototype._compile=function(root){
    var _this=this;
    //获取指定作用域下的所有子节点
    var nodes=root.children;
    for(var i=0;i<nodes.length;i++){
        var node=nodes[i];
        //若该元素有子节点，则先递归编译其子节点
        if(node.children.length){
            this._compile(node);
        }

        if(node.hasAttribute("v-click")) {
            node.onclick = (function () {
            var attrVal=nodes[i].getAttribute("v-click");
                var args=/\(.*\)/.exec(attrVal);
                if(args) {              //如果函数带参数,将参数字符串转换为参数数组
                    args=args[0];
                    attrVal=attrVal.replace(args,"");
                    args=args.replace(/[\(|\)|\'|\"]/g,'').split(",");
                }
                else args=[];
                return function () {
                    _this.$methods[attrVal].apply(_this.$data,args);
                }
            })()
        }

        if(node.hasAttribute(("v-model"))
                && node.tagName=="INPUT" || node.tagName=="TEXTAREA"){
            //如果是input或textarea标签
            node.addEventListener("input", (function (key) {
                var attrVal=node.getAttribute("v-model");
                //将value值的更新指令添加至_directives数组
                _this._binding[attrVal]._directives.push(new Directive(
                        "input",
                        node,
                        _this,
                        attrVal,
                        "value"
                ))

                return function () {
                    _this.$data[attrVal] = nodes[key].value;
                }
            })(i));
        }

        if(node.hasAttribute("v-bind")){
            var attrVal=node.getAttribute("v-bind");
            //将innerHTML的更新指令添加至_directives数组
            _this._binding[attrVal]._directives.push(new Directive(
                    "text",
                    node,
                    _this,
                    attrVal,
                    "innerHTML"
            ))
        }
    }
}
改写Lue的_init原型方法，使其在初始化时即对DOM进行编译：

Lue.prototype._init=function(options){
    this.$options=options;                              //传入的实例配置
    this.$el=document.querySelector(options.el);        //实例绑定的根节点
    this.$data=options.data;                            //实例的数据域
    this.$methods=options.methods;                      //实例的函数域

    //与DOM绑定的数据对象集合
    //每个成员属性有一个名为_directives的数组，用于在数据更新时触发更新DOM的各directive
    this._binding={};
    this._parseData(this.$data);
    this._parseFunc(this.$methods);

    this._compile(this.$el);                //编译DOM节点
};
至此，我们便实现了一个基于getter/setter，模仿Vue的简单的双向绑定。整个体系搭建并不复杂，只需要注意其中三个核心的部分：getter/setter，Directive以及binding。细心的读者不难发现，在本文的实现中，如果线程频繁触发数据变更，会导致DOM频繁更新，非常影响性能。在真正的生产环境中，DOM的更新不是数据变更后立马更新，而是被加入到批处理队列，等待主线程运行完后再进行批处理。

整个Lue实例结构如下：


完整代码

<div id="app">
    <form>
        <input type="text" v-model="count" />
        <button type="button" v-click="increment">increment</button>
        <button type="button" v-click="alert('Hello world')">alert</button>
    </form>
    <p v-bind="count"></p>
</div>
<script>
    function Lue(options){
        this._init(options);
        console.log(this)
    }

    Lue.prototype._init=function(options){
        this.$options=options;                              //传入的实例配置
        this.$el=document.querySelector(options.el);        //实例绑定的根节点
        this.$data=options.data;                            //实例的数据域
        this.$methods=options.methods;                      //实例的函数域

        //与DOM绑定的数据对象集合
        //每个成员属性有一个名为_directives的数组，用于在数据更新时触发更新DOM的各directive
        this._binding={};
        this._parseData(this.$data);

        this._compile(this.$el);                //编译DOM节点
    };

    //遍历数据域，添加getter/setter
    Lue.prototype._parseData=function(obj){
        var value;
        for(var key in obj){
            //排除原型链上的属性，仅仅遍历对象本身拥有的属性
            if(obj.hasOwnProperty(key)){
                this._binding[key]={        //初始化与DOM绑定的数据对象
                    _directives:[]
                };
                value=obj[key];
                //如果属性值为对象，则递归解析
                if(typeof value ==='object'){
                    this._parseData(value);
                }
                this.convert(key,value);
            }
        }
    };

    /**对象属性重定义
     * @param key 数据对象名称，本例为"count"
     * @param val 数据对象的值
     */
    Lue.prototype.convert=function(key,val){
        var binding=this._binding[key];
        Object.defineProperty(this.$data,key,{
            enumerable:true,
            configurable:true,
            get:function(){
                console.log(`获取${val}`);
                return val;
            },
            set:function(newVal){
                console.log(`更新${newVal}`);
                if(val!=newVal){
                    val=newVal;
                    binding._directives.forEach(function(item){
                        item.update();
                    })
                }
            }
        })
    };

    function Directive(name,el,vm,exp,attr){
        this.name=name;         //指令名称，例如文本节点，该值设为"text"
        this.el=el;             //指令对应的DOM元素
        this.vm=vm;             //指令所属lue实例
        this.exp=exp;           //指令对应的值，本例如"count"
        this.attr=attr;         //绑定的属性值，本例仅实验innerHTML

        this.update();          //首次绑定时更新
    }

Directive.prototype.update=function(){
        //更新DOM节点的相应属性值
        this.el[this.attr]=this.vm.$data[this.exp];
    };

    //解析DOM的指令
    Lue.prototype._compile=function(root){
        var _this=this;
        //获取指定作用域下的所有子节点
        var nodes=root.children;
        for(var i=0;i<nodes.length;i++){
            var node=nodes[i];
            //若该元素有子节点，则先递归编译其子节点
            if(node.children.length){
                 this._compile(node);
            }

            if(node.hasAttribute("v-click")) {
                node.onclick = (function () {
                    var attrVal=nodes[i].getAttribute("v-click");
                    var args=/\(.*\)/.exec(attrVal);
                    if(args) {              //如果函数带参数,将参数字符串转换为参数数组
                        args=args[0];
                        attrVal=attrVal.replace(args,"");
                        args=args.replace(/[\(|\)|\'|\"]/g,'').split(",");
                    }
                    else args=[];
                    return function () {
                        _this.$methods[attrVal].apply(_this.$data,args);
                    }
                })()
            }

            if(node.hasAttribute(("v-model"))
                    && node.tagName=="INPUT" || node.tagName=="TEXTAREA"){
                //如果是input或textarea标签
                node.addEventListener("input", (function (key) {
                    var attrVal=node.getAttribute("v-model");
                    //将value值的更新指令添加至_directives数组
                    _this._binding[attrVal]._directives.push(new Directive(
                            "input",
                            node,
                            _this,
                            attrVal,
                            "value"
                    ))

                    return function () {
                        _this.$data[attrVal] = nodes[key].value;
                    }
                })(i));
            }

            if(node.hasAttribute("v-bind")){
                var attrVal=node.getAttribute("v-bind");
                //将innerHTML的更新指令添加至_directives数组
                _this._binding[attrVal]._directives.push(new Directive(
                        "text",
                        node,
                        _this,
                        attrVal,
                        "innerHTML"
                ))
            }
        }
    }

    window.onload=function(){
        var app=new Lue({
             el:"#app",
             data:{
                count:0,
             },
             methods:{
                increment:function(){
                this.count++;
            },
            alert:function(msg){
                alert(msg)
                }
            }
        })
    }
</script>
推荐阅读

Vue源码解析

ES5关于Object的新特性
