---
layout: post
title: "Gender by Name"
categories: JavaScript
description: 凭借名字计算性别的概率!
---

## 迷

最早是从这个仓库看到的两年前有人用 python 把名字猜成性别, 所以我打算用 JS 再实现一次  
原理是用贝叶斯定理公式, 也就是  
![](https://wikimedia.org/api/rest_v1/media/math/render/svg/71d8066a406fb22ce08eec25dd04870779345cd3)  
这个玩意, 每一个变量的意思如下

-   P(A\|B)是已知B发生后A的条件概率，也由于得自B的取值而被称作A的后验概率。
-   P(B\|A)是已知A发生后B的条件概率，也由于得自A的取值而被称作B的后验概率。
-   P(A)是A的先验概率（或边缘概率）。之所以称为"先验"是因为它不考虑任何B方面的因素。
-   P(B)是B的先验概率或边缘概率。

然后以下是在 python 里面的实现

```python
def prob_for_gender(self, firstname, gender=0):
        p = 1. * self.female_total / self.total \
            if gender == 0 \
            else 1. * self.male_total / self.total

        for char in firstname:
            p *= self.freq.get(char, (0, 0))[gender]

        return p
```

这个作者的这东西好是好, 但是感觉还有不少缺点, 比如说翁胜男这个名字三个字都是男性化的, 但是连起来就大概率是一个女性化名字, 再比如说刘璇这个名字璇是女性化的字,但是这个其实偏中性.  
对于这些我列了个小计划, 以后随时可以改, 把这个玩意完成了

-   导入 avi 开房记录, 建立数据库
-   实现贝叶斯定理

说实话, 暂时就这样了:D, 等把这两项简单写一下再说吧. 这个项目也不知道啥时候能开始.
