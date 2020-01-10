---
layout: post
title: "Start over or Maintain"
categories: blog
description: 也不能总是重新来过
---

> 我们可以度过美好时光，也可以虚度光阴，但我希望你活得精彩。我希望你能看到令你惊叹的事物，我希望你体会从未有过的感觉，我希望你遇见具有不同观点的人，我希望你的一生能让自己过得自豪。如果你发现你的生活并非如此，我希望你能有勇气重新来过。  
> --司各特·菲茨杰拉德

## 重写重构重规划

迷信什么都重新写，把旧的轮子用全新的思维方式诠释一番不是一人之心吧，总觉得如果不重新设计就对不起崭新的理解和想法。新的理解固然可以改变很多旧的问题，不过成本和收益难免不成正比。 如果啥都不懂，项目小的可怜，重新来过未免不可。当随着你懂了一点点，略微摸到了一点皮毛，往往重写就很难造成真正的质变了，正确的程序都是相似的，而错误的程序各有各的错误。把错误的程序改成正确的其实就是把不同的程序写成一样的。

重构和重写的区别其实没有那么大，重写的时候复制一下业务逻辑，重构的时候整个打翻也并不是什么新鲜事。只是说到重构，更多指的是滚滚长江的一叉支流，上游。写着写着一个组件变成了两个组件，五个组件变成了一百个组件，代码相互依赖便不谈了，即便不相互依赖，汇聚成河也难免发现想改这处得先解决另一处。其实全都分开也并不是太有意义，我就打成一个包说不定还更方便快捷一些。

## 增减删查搞一坨

到了重写重构的份上其实不见得是因为程序已经用不了，没法再扩展了。只要不是太差，总能找到个地方缝缝补补，没准解藕一番还成了插件化的典范，颇有什么控制反转，测试驱动的大将之风。那么重构的推动力究竟是什么呢？

说到底，讲道理，还是因为看不顺眼。看不顺眼了，也就没有动力了，想到要做没有动力的事谁不会发怵呢，看不顺眼了，重构一番也许还真应了那句磨刀不误砍柴工。

正能量为正，负能量即为负。你说这文章何以由此界定？但说再搞来搞去，把代码重新整理一番，有心情添加优化那些其实不是很明白的业务逻辑，界定个毛。从过程上看，这是为了未来考虑，这是未雨绸缪，广积粮缓称王。从结果上看，解决了顽疾也舒缓了内心，这是一本万利，左右逢源。既然如此，重构的推动力是什么？重写的成本是什么，不过是朝三暮四罢了。