---
layout: post
title: "Miscellaneous Coding of Python and CV"
categories: blog
description: 内心让他真实地了解自己，一旦了解了自己也就了解了世界。
---

## 为 Python，cv，机器学习准备的面试问题

> 他惊讶地向我转过身来，疑惑的表情似乎是在向我询问。我对他说，走过去吧，那里树叶会向你招手，石头会向你微笑，河水会向你问候。那里没有贫贱也没有富贵，没有悲伤也没有疼痛，没有仇也没有恨……那里人人死而平等。   
> 他问：“那是什么地方？”   
> 我说：“死无葬身之地。”  
> --余华

## Python

### 什么是 Monkey Patching （猴子布丁）？

指在函数声明之后更改其 Behavior 的行为。一般用在 Mock 的情况下，生产环境应该避免

深入：什么是 Mock，为什么要避免猴子布丁？

### 什么是 *args **kwargs？

*的代表是额外的传入参数，**代表是所有的命名传入参数。比如在：

```py
def hello(a, b, *args, **kwargs): 
```

中，ab 之后的直接传入都是 args，kwargs 是 `xxx=xxx` 的参数。

深入：为什么要这么做，什么样的函数应该使用这些传入参数扩展符？

### Python 的原生多线程是如何实现的，是个好主意吗？

Python 原生不支持多线程，虽然默认提供了（threading）包但是这个包并不是用来提高同步代码的运行速度的。原因是 `Global Interpreter Lock` 经常简称 `GIL` 这个东西是万恶之源，他会确保你在执行多线程的时候只有一个线程在同步运行。在你想实现比如说多线程下载的时候当然要开多线程，但是如果你希望能通过多线程提高并行计算的速度的话，显然 Python 不是一个好主意。

深入：实现多线程的正确姿势是什么？

可以考虑使用 c 语言的代码实现多线程计算然后在 Python 中调用。这是直线的思维，还有一种方式是换引擎，比如说 Spark 和 Hadoop 可以在外部开多线程运行同一份（或者不同）的 Python 代码来曲线救国实现多线程。

### Python 的垃圾回收机制是什么样的？

当变量的引用发生变化的时候，Python 会检查它的引用计数，如果是 0 就会被销毁。每过一段时间 Python 会遍历变量寻找循环引用，让两个变量只剩下循环引用的时候就会被销毁。需要注意的是 Python 很难处理大于两个变量之间的循环引用，请避免。每一个变量被建立的时候都会被分配一个代 (generation) 比较新的变量会被优先销毁，这是一种启发式 (heuristics) 算法。

## 机器学习

### 逻辑回归和朴素贝叶斯有什么区别

关键词：
- 逻辑回归 Logistic regression
- 朴素贝叶斯 Multinomial naive Bayes

朴素贝叶斯有很强的条件假设，条件独立假设。条件独立假设特征之间都是相互独立的，没有耦合的，互不干扰的。就是所有条件都是相对独立的。我们写一个逻辑公式，我们输入特征，计算概率，是否大于0则来判断是否，这就完成完成了分类任务。这就是朴素贝叶斯分类，简而言之：

```
贝叶斯公式 + 条件独立假设 = 朴素贝叶斯方法
```

> 逻辑回归实际上是用线性回归模型的预测结果去逼近后验概率的逻辑发生比，就是讲一个概率式写成多项式。  
> 但二者还是有区别的，用两种方法求出来的权重是不一样。产生差别的原因在于朴素贝叶斯方法的条件独立假设。因为条件独立假设，朴素贝叶斯可以不使用梯度下降，而直接通过统计每个特征的逻辑发生比来当做权重。而逻辑回归，条件独立假设并不成立，通过梯度下降法，可以得到特征之间的耦合信息，从而得到相应的权重。

优化目标不同，lr 优化的后验 likelihood `p(y|x)`，nb 优化的是联合 likelihood `p(x,y)`。

还有就是一个是判别模型（LR），一个是生成模型（NB）。

扩展：什么是判别模型，什么是生成模型？

在机器学习领域判别模型是一种对未知数据 y 与已知数据 x 之间关系进行建模的方法。判别模型是一种基于概率理论的方法。已知输入变量 x，判别模型通过构建条件概率分布 `P(y|x)` 预测 y。与生成模型不同，判别模型不考虑 x 与 y 间的联合分布。对于诸如分类和回归问题，由于不考虑联合概率分布，采用判别模型可以取得更好的效果。而生成模型在刻画复杂学习任务中的依赖关系方面则较判别模型更加灵活。大部分判别模型本身是监督学习模型，不易扩展用于非监督学习过程。实践中，需根据应用的具体特性来选取判别模型或生成模型。

在概率统计理论中, 生成模型是指能够随机生成观测数据的模型，尤其是在给定某些隐含参数的条件下。它给观测值和标注数据序列指定一个联合概率分布。在机器学习中，生成模型可以用来直接对数据建模（例如根据某个变量的概率密度函数进行数据采样），也可以用来建立变量间的条件概率分布。条件概率分布可以由生成模型根据贝叶斯定理形成。

深入：还有什么是判别模型？

- 逻辑回归 Logistic regression
- 线性回归 Linear regression
- 支持向量机 Support vector machine
- 提升方法 Boosting
  - 是一种可以用来减小监督式学习中偏差的机器学习算法。面对的问题是迈可·肯斯（Michael Kearns）提出的：一组“弱学习者”的集合能否生成一个“强学习者”？弱学习者一般是指一个分类器，它的结果只比随机分类好一点点；强学习者指分类器的结果非常接近真值。
- 条件随机场 conditional random field
  - 是一种鉴别式机率模型，是随机场的一种，常用于标注或分析序列资料，如自然语言文字或是生物序列。
- 人过神经网络 Artificial Neural Network
  - 人工神经网络（英语：Artificial Neural Network，ANN），简称神经网络（Neural Network，NN）或类神经网络，在机器学习和认知科学领域，是一种模仿生物神经网络（动物的中枢神经系统，特别是大脑）的结构和功能的数学模型或计算模型，用于对函数进行估计或近似。神经网络由大量的人工神经元联结进行计算。大多数情况下人工神经网络能在外界信息的基础上改变内部结构，是一种自适应系统，通俗的讲就是具备学习功能。现代神经网络是一种非线性统计性数据建模工具。
- 随机森林 Random forest
  - 随机森林是一个包含多个决策树的分类器，并且其输出的类别是由个别树输出的类别的众数而定。

深入：机器学习中，LR 和 SVM 有什么区别？

- 两者都可以处理非线性问题；LR 和 SVM 最初都是针对二分类问题的。
- SVM 最大化间隔平面，LR 极大似然估计；SVM只能输出类别，不能给出分类概率。
- 两者loss function不同；LR的可解释性更强；SVM自带有约束的正则化。

## CV

### 如何写程序将图片放大缩小？

差值，放大任意倍数都可以用插值算法 （Interpolation）

深入：都有哪些插值算法？

- 最近点插值 - 更烂
- 线性插值 - 更平滑
- 兰索斯插值 - 更清晰

这些算法其实已经顾名思义了

### Opencv 对于图像颜色的默认储存方式是什么，BGR 还是 RGB？

BGR，深入为什么没有必要，应该是历史遗留问题。

### 什么是 HOG 特征 Histogram of Oriented Gradient？

特征是一种在计算机视觉和图像处理中用来进行物体检测的特征描述子。它通过计算和统计图像局部区域的梯度方向直方图来构成特征。Hog 特征结合 SVM 分类器已经被广泛应用于图像识别中，尤其在行人检测中获得了极大的成功。

主要的思想： 在一副图像中，局部目标的表象和形状（appearance and shape）能够被梯度或边缘的方向密度分布很好地描述。（本质：梯度的统计信息，而梯度主要存在于边缘的地方）
主要实现方法：首先将图像分成小的连通区域，我们把它叫细胞单元。然后采集细胞单元中各像素点的梯度的或边缘的方向直方图。最后把这些直方图组合起来就可以构成特征描述器。
优点： 与其他的特征描述方法相比，HOG有很多优点。首先，由于HOG是在图像的局部方格单元上操作，所以它对图像几何的和光学的形变都能保持很好的不变性，这两种形变只会出现在更大的空间领域上。其次，在粗的空域抽样、精细的方向抽样以及较强的局部光学归一化等条件下，只要行人大体上能够保持直立的姿势，可以容许行人有一些细微的肢体动作，这些细微的动作可以被忽略而不影响检测效果。因此HOG特征是特别适合于做图像中的人体检测的。

深入：你还用过什么边缘检测算法？Canny 用过吗，HOG 和 Canny 的关系是什么？它们检测边缘的区别是什么？

### 什么是 Canny 算法？

1. 图像降噪。我们知道梯度算子可以用于增强图像，本质上是通过增强边缘轮廓来实现的，也就是说是可以检测到边缘的。但是，它们受噪声的影响都很大。那么，我们第一步就是想到要先去除噪声，因为噪声就是灰度变化很大的地方，所以容易被识别为伪边缘。
2. 计算图像梯度，得到可能边缘。计算图像梯度能够得到图像的边缘，因为梯度是灰度变化明显的地方，而边缘也是灰度变化明显的地方。当然这一步只能得到可能的边缘。因为灰度变化的地方可能是边缘，也可能不是边缘。这一步就有了所有可能是边缘的集合。
3. 非极大值抑制。通常灰度变化的地方都比较集中，将局部范围内的梯度方向上，灰度变化最大的保留下来，其它的不保留，这样可以剔除掉一大部分的点。将有多个像素宽的边缘变成一个单像素宽的边缘。即“胖边缘”变成“瘦边缘”。
4. 双阈值筛选。通过非极大值抑制后，仍然有很多的可能边缘点，进一步的设置一个双阈值，即低阈值（low），高阈值（high）。灰度变化大于high的，设置为强边缘像素，低于low的，剔除。在 low 和 high 之间的设置为弱边缘。进一步判断，如果其领域内有强边缘像素，保留，如果没有，剔除。

扩展：噪声要怎么去除？高斯模糊。
深入：为什么 CV 要把降噪算法放在 Canny 函数外面，因为噪声就是灰度，梯度变化大的地方，需要额外的步骤和调整。