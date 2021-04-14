# 简介

> 如何使用 Node.js 和 Electron APIs

Node. js 的所有 [ 内置模块 ](https://nodejs.org/api/) 都在Electron中可用， 第三方 node 模块中也完全支持 (包括 [ 原生模块 ](../tutorial/using-native-node-modules.md))。

Electron 还为开发原生桌面应用程序提供了一些额外的内置模块。 某些模块仅在主进程中可用, 有些仅在渲染进程 (web 页) 中可用, 而有些在这两个进程中都可以使用。

基本规则是: 如果一个模块是 [ GUI ][gui] 或底层系统相关的, 那么它应该只在主进程中可用。 你需要熟悉 [主进程和渲染进程](../tutorial/quick-start.md#main-and-renderer-processes) 的概念，才能更好的使用这些模块。

主进程脚本就像一个普通的Node.js脚本：

```javascript
康斯特 { app, BrowserWindow } =要求（'电子'）
让赢=空

应用程序。当准备（然后）=> {
  赢=新的浏览器窗口（{ width: 800, height: 600 }）
  赢
.com。
```

如果 `nodeIntegration` 被启用，那么渲染进程除了额外能够使用node模块的能力外，与普通网页没有什么区别

```html
<！doctype html>
<html>
<body>
<script>
  康斯特 fs = 需要 （'fs'）
  控制台.log （fs. 阅读文件同步 （__filename， 'utf8'）
</script>
</body>
</html>
```

要运行你的app, 请阅读 [ Run your app ](../tutorial/quick-start.md#run-your-application)。

## 解构赋值

从0.37开始，可以使用 [destructuring assignment][destructuring-assignment] (es6解构赋值)来使内置模块更容易使用。

```javascript
康斯特 { app, BrowserWindow } =要求（'电子'）

让赢

应用程序。当准备（然后）=> {
  赢=新的浏览器窗口（）
  赢
.com。
```

如果您需要整个 ` electron ` 模块, 则可以`require`它, 然后使用 destructuring 从 ` electron ` 访问各个模块。

```javascript
康斯特电子=需要（'电子'）
const { app, BrowserWindow } =电子

让赢得

应用程序。当准备好时。然后（）=> {
  赢=新的浏览器窗口（）
  赢
.com。
```

这等效于以下代码:

```javascript
康斯特电子=需要（'电子'）
const应用程序=electron.app
浏览器窗口=电子。浏览器窗口
让赢

应用程序。当准备好时，然后=> {
  赢=新的浏览器窗口（）
  赢
.com。
```

[gui]: https://en.wikipedia.org/wiki/Graphical_user_interface
[destructuring-assignment]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
