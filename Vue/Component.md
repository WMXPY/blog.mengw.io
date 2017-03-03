### Component.md

Vue的组件主要是用来把多次复用的内容封装起来，简单的内容复制粘贴便于修改还蛮好的，但是比如类似标题，账户天气预报类型的内容封装起来复用还蛮好的。  

# Vue的组件

```html
<comp></comp>
```

```javascript
Vue.component('comp',{
    template: '<div>COMPDSAJDHIK!</div>'
});
var myApp = new Vue({
    el: '#myApp'
});
```

用这样的方法就可以将无意义的comp标签赋予意义  
注册comp组件的逻辑也就是代码里var myApp一项必须写在组件声明之后。
