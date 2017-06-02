---
layout: post
title:  "Basic of Php Unit"
categories: QA
description: PhpUnit 的简单用法
---

简单来说, 单元测试就是摆脱复杂 debug 从小组件入手的测试, 对于 php 来说一个好用的工具就是 phpUnit

# Php Unit 的简单用法

## 基础语法

以下是其中一个例子

```php
assertTrue(true);   # SUCCESSFUL
assertEquals('orz', 'oxz', 'The string is not equal with orz');   #UNSUCCESSFUL
assertCount(1, array('Monday'));   # SUCCESSFUL
assertContains('PHP', array('PHP', 'Java', 'Ruby'));   # SUCCESSFUL
```

这些方法名自然不必多说了, 其中任何方法都可以在后面放置一个额外传入变量来指定输出.
