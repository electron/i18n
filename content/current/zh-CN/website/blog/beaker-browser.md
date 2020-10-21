---
title: '每周的项目：Beaker 浏览器'
author:
  - pfrazee
  - zeke
date: '2017-02-07'
---

This week we caught up with [Paul Frazee](http://pfrazee.github.io/), creator of [Beaker Browser](https://beakerbrowser.com/). Beaker是一个实验性的 点对点网页浏览器，它使用 Dat 协议来托管来自用户的 设备。

---<iframe width="100%" height="420" src="https://www.youtube.com/embed/Bem9nRpyPEs" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

## Beaker是什么，你为什么要创建它？

Beaker是一个参与式浏览器。 它是供indie 黑客使用的浏览器。

网络是封闭源. 如果你想要影响社交媒体的工作方式，你必须在 Facebook 或 Twitter 上工作。 搜索，Google。 控制权掌握在公司而不是用户自己手中。

通过Beaker，我们有一个新的 Web 协议： [分散存档传输](https://datprotocol.com)。 "数据." 它可以免费创建站点，然后从设备中共享。 无需服务器。 这是我们的创新。

![贝克尔人协议](https://cloud.githubusercontent.com/assets/2289/22560648/3defed5c-e92a-11e6-93f8-956cafafe3be.jpg)

当你访问Beaker的Dat网站时，你会下载这些文件。 站点永远是你的。 您可以保存它，派生它，修改它，并免费分享您的新版本。 它都是开源的。

所以这是我们的目的：我们正在为开源网站制作一个浏览器。 我们希望它成为社会黑客的工具包。

## 谁应该使用Beaker？

黑客。 调制解调器。 创意类型。 喜欢搭车的人。

## 如何创建一个使用数据的新项目？

我们有 [个命令行工具，叫做bkr](https://github.com/beakerbrowser/bkr) 这种类型就像git + npm。 下面正在创建站点：

```bash
$cd ~/my-site
$bkr init
$echo "Hello, world!" > index.html
$bkr 发布
```

下面是一个站点：

```bash
$ bkr fork dat://0ff7d4c7644d0aa19914247dc5dbf502d6a02ea89a5145e7b178d57db00504cd/ ~/my-fork
$ cd ~/my-fork
echo "我的叉不考虑上一个索引。 tml!" > index.html
$ bkr 发布
```

然后这些网站从您的浏览器中托管。 这点就像BitTorren；你分享一个P2P网格中的网站。

如果你想要GUI，我们有一些基本的工具内置于浏览器中，但我们正在将这些工具推送到用户手中。 它都是可调用的用户应用程序。

## 您为什么选择在 Electron 上建造Beaker？

对这个项目来说是显而易见的。 如果我自己派生了Chrome，我现在就写了 C++ ！ 没有人想要这样做。 我知道网页堆栈，我可以很快地与它合作。 它是一个没有脑海的人。

事实真相是，我不敢肯定我可以在没有Electron的情况下做任何这件事。 这是一部伟大的软件。

## 构建Beaker时面临什么挑战？

其中一半人正在玩弄工具，并想出我能够解救多少人。

让浏览器本身非常容易。 Electron实际上是制作浏览器的一个工具包。 ...除了浏览器标签；这使我永远变得对了。 我终于打破僵局，学会了如何做特殊用途小武器小武器小武器小武器小武器小武器小武器。 看起来好得多，但是在我得到这个正确之前它需要经过三到四次迭代。

## 应在哪些领域改进Electron？

如果我可以在网页视图中停靠devtools，这真是很棒的。

## Beaker下一步是什么？

Dat 站点的安全域名. 一个社交配置的 URL 方案，名为 ["应用方案"](https://github.com/beakerbrowser/beaker/wiki/App-Scheme) 更多Dat API。

## 对于那些可能有兴趣为该项目作出贡献的民间团体来说，Beaker在哪些领域需要帮助？

我们有许多悬而未决的问题。 不要害怕我。 #beaker浏览器开启免费版。 我们为贡献者</a> 保留一个
页，我们会将您添加到它。 如果你访问奥斯坦，我会买一只啤酒。</p> 



## 任何可能对其他开发者有用的 Electron 提示？

1. 在那里使用构建配刀。 你不想用你自己的解决方案来挣扎，信任我。 使用 electron-builder。 使用一个锅炉仓库.
2. 如果你需要在 Electron 仓库中打开一个问题，请花额外的英尺来让它更容易复制它。 您将更快地得到响应，团队将对此表示感谢。 甚至更好，试着自己修复它。 看到内核实际上很有趣。
3. 至少一次阅读所有指南和高级文档。
4. 不要建立浏览器，它是一个饱和的市场。

