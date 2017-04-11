## Vue 01

-   v-if-else:

    -   这个就厉害了, v-if,v-else,v-else-if 都可以用,就写在tag的声明里即可
    -   达成条件的就渲染,否则不渲染!
    -   在llf里面用这个方法可以实现在登录页面里的时间设计.

-   v-on: 事件处理器

    -   v-keyup 比如说v-on:keyup="txtKeyup($event)" 当然,这需要jquery的选择器支持
    -   keyup的方法是用this.srcElement.tagName, id, innergtml来输出, 同时可以用event.key?event.key：""来打印出按了那个键

-   匈牙利命名法 btnOK

```Vue
Computed: {
      priceInTax: {
          get: function(){
              return this.price*1.08;
          },
          set: function(){
              this.price = value/1.08
          }
      }

}
```

-   计算属性 总而言之就是和data,method是一样的data类型,在html声明{{priceInTax}}就可以取得计算之后的值,和我们llf里面的update之类的方法其实效果相同!!!! 这个就太棒了!

    -   获得priceintax会走get, 赋值给priceintax会走set.

-   Watch

```Vue
Watch: {
    price: function(newVal,oldVal){
        console.log(newVal,oldVal);
        this.priceInTax = Math.round(this.price*1.08);
        this.princeChinaRMB = Math.round(this.priceInTax/16.75)
    }
}
```

-   方法来源angular
