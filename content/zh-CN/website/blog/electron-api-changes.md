---
title: API 更改在 Electron 1.0
author: zcbenz
date: '2015-11-17'
---

自Electron开始以来，当它曾经被称为Atom-Shell时，开始返回， 我们一直在尝试为Chromium的内容模块和本机GUI组件提供一个漂亮的跨平台JavaScript API。 API机构是非常有机地启动的，随着时间的推移，我们已经做了几处修改，以改进初始设计。

---

现在在 Electron 准备发布了 1.0 版本后，我们想通过处理最新的 API 详细信息来抓住机会进行修改。 下面描述的更改包含在 **0.35。**, 使用旧的 API 报告过时警告, 以便您可以获得未来1.0 版本的最新信息。 一个 Electron 1.0 将在几个月内不会退出，这样您就有一些时间才能打断这些更改。

## 过时警告

默认情况下，警告将显示是否使用已废弃的 API。 若要关闭它们，您可以将 `process.no废弃` 设置为 `true`。 要跟踪废弃的 API 使用源，您可以设置 `进程。 hrow废弃` 到 `true` 来丢弃异常而不是打印警告，或者设置 `流程。 竞技过时` 到 `true` 打印过失痕迹。

## 使用内置模块的新方式

内置模块现在分成一个模块，而不是分成独立模块， 这样您就可以使用它们 [而不会与其他模块](https://github.com/electron/electron/issues/387) 相冲突：

```javascript
var app = require('electron').app
var Browserwindow = require('electron').BrowserWindow
```

`要求的旧方式('app')` 仍然支持向后兼容性，但如果关闭，您也可以转向：

```javascript
require('electron').hideInternalModules()
require('app') // 丢失错误。
```

## 更容易使用 `远程` 模块

由于使用内置模块的方式已经改变，我们更容易在渲染过程中使用主处理模块。 您现在可以访问 `远程`的属性来使用它们：

```javascript
/ 新方式
var app = require('electron').remote.app
var BrowserWindow = require('electron').remote.BrowserWindow
```

不需要使用长链：

```javascript
/ 旧路径。
var app = require('electron').remote.require('app')
var Browserwindow = require('electron').remote.require('BrowserWindow')
```

## 拆分 `ipc` 模块

`ipc` 模块存在于主进程和渲染器进程中，每一方的 API 不同。 这对新用户来说相当混乱。 我们在主流程中将模块重命名为 `ipcMain` ，并且 `ipcRenderer` 在渲染器过程中避免混淆：

```javascript
// 在主进程中.
var ipcMain = require('electron').ipcMain
```

```javascript
// 在渲染过程中。
var ipcRenderer = require('electron').ipcRenderer
```

对于 `ipcRenderer` 模块，收到消息时添加了额外的 `事件` 对象 匹配如何在 `ipcMain` 模块中处理消息：

```javascript
ipcRender.on('message', function (event) v.
  console.log(event)
})
```

## 将 `浏览器窗口` 选项标准化

`浏览器窗口` 选项有不同的风格，基于其他API的选项， 并且在JavaScript中使用起来有点困难，因为 `-` 在名称中。 它们现在已经标准化为传统的 JavaScript 名称：

```javascript
new BrowserWindow({ minWidth: 800, minHeight: 600 })
```

## 关注DOM的 API 名称协议

Electron中用于所有API名称的 API 名称， 像 `Url` to `URL`, 但DOM 有自己的惯例. 他们更喜欢 `URL` 而喜欢 `Url`当使用 `Id` 而不是 `ID` 时。 我们做了以下API重命名以匹配DOM的样式：

* `Url` 已重命名为 `URL`
* `Csp` 已重命名为 `CSP`

由于这些更改，您将会在为您的应用使用 Electron v0.35.0 时注意到许多废弃之处。 修复它们的一种简单方式是用 `URL` 替换所有 `Url` 的实例。

## 更改为 `托盘`的事件名称

`托盘` 事件名称的风格与其他模块有些不同，所以已经重命名以使它与其他模块相匹配。

* `点击` 重新命名为 `点击`
* `双击` 被重命名为 `双击`
* `右键点击` 已重命名为 ``

