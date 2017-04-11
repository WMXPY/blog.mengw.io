## Vue 02

-   表单控件绑定 v-model

    -   这个不难，重点在于如果在v-model中多个对象绑定一个array，既可以实现复选框

-   元素显示 v-show

    -   标记是否显示html元素
    -   简单例子： v-show=“result” 如果rusult是true即显示否则不显示！
    -   重点是在DOM中v-show不显示的元素不会消失！！！
        -   相对来说v-if-else-if， DOM只会渲染应该显示的元素。
