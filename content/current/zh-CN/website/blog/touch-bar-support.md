---
title: 触摸条支持
author: kevinsawicki
date: '2017-03-08'
---

电子 [1.63][] 测试版包含对macOS [触摸杆][]的初始支持。

---

新的 Touch Bar API 允许您添加按钮、标签、弹出窗口、颜色 选取器、滑块和空格。 这些元素可以动态地更新， 当它们与之互动时，也会释放事件。

这是此 API 的第一个版本，因此它将在下一个 个少量Electron 版本中演变。 请查看版本说明以获取更多更新 并打开 [个问题](https://github.com/electron/electron/issues) 以获取任何问题 或缺失的功能。

You can install this version via `npm install electron@beta` and learn more about it in the [TouchBar](https://github.com/electron/electron/blob/master/docs/api/touch-bar.md) and [BrowserWindow](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsettouchbartouchbar-macos) Electron docs.

非常感谢 [@MarshallOfSound](https://github.com/MarshallOfSound) 为Electron做出贡献。 :tada:

## 触摸条示例

![触摸条边框](https://cloud.githubusercontent.com/assets/671378/23723516/5ff1774c-03fe-11e7-97b8-c693a0004dc8.gif)

下面是在触摸条中创建一个简单的栏位游戏的例子。 它演示如何创建一个触摸栏，样式条目，将其与 窗口关联， 按键点击事件并动态更新标签。

```js
康斯特 {app, BrowserWindow, TouchBar} =要求（'电子'）

锥 {TouchBarButton, TouchBarLabel, TouchBarSpacer} =TouchBar

让旋转=假

//卷轴标签
锥卷轴1=新的触摸巴拉贝尔（）
锥卷轴2=新的触摸杆卷轴（）
锥卷轴3= 新的 TouchBar 标签 （）

// 旋转结果标签
缺点结果 = 新的 TouchBar 标签 （）

// 旋转按钮
康斯特旋转 = 新的触摸巴按钮 （+
  标签： "🎰旋转"，
  背景颜色： '#7851A9'，
  单击：（）=> {
    //如果（旋转） {
      return
    }

    旋转

    旋转，请忽略单击。标签="

    让超时=10
    const旋转长=4*100 0//4秒
    const开始时间=日期。now（）

    const旋转音圈=（）=> =
      更新（）

      如果（（日期.now）-开始时间） >=旋转长）{
        完成Spin（）
      }其他{
        //每次旋转
        超时减慢一点*=1.1
        设置超时（旋转， 超时）
      =
    =

    旋转（）
  =
}）

连续获得随机值=（）=> {
  const值=[🍒'，'💎'，'7️♥'，'🍊'，'🔔' "⭐"， "🍇"， "🍀"]
  返回值 [Math. 地板 （数学. 随机 ）] [值. 长度]]
[

续更新] （） => [
  卷轴 1. 标签 = 获取随机价值 （）
  卷轴 2. 标签 = 获取随机价值 （）
  重新标记 = 获取
[

const 完成Spin = （） => =
  const 唯一价值 = 新集 （[卷轴 1.标签， 卷轴 2.标签， 卷轴 3.标签]）. 大小
  如果 （唯一价值 == 1） {
    // 所有 3 个值都是相同的
    结果 💰。
    result.textColor = '#FDFF00'
  } else if (uniqueValues === 2) {
    // 2 values are the same
    result.label = '😍 Winner!'
    结果.文本颜色="#FDFF00"
  }其他=
    //没有值是相同的
    结果。标签="🙁再次旋转"
    结果
  



  
  。
  新的触摸栏空间器（{size: 'large'}），
  卷轴1，
  新的触摸栏空间器（{size: 'small'}），
  卷轴2，
  个新的 TouchBarSpacer （{size: 'small'}），
  卷轴 3，
  个新的 TouchbarSpacer （{size: 'large'}），
  结果
]）

让窗口

应用程序
    
  > 。：假的，
    标题BarStyle：'隐藏嵌套'，
    宽度：200，
    高度：200，
    背景颜色："#000"
  }）
  窗口

  。
```

[1.63]: https://github.com/electron/electron/releases/tag/v1.6.3
[触摸杆]: https://developer.apple.com/macos/touch-bar

