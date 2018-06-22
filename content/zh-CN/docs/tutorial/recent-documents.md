# 最近文档 (Windows & macOS)

Windows 和 macOS 分别通过打开跳转列表（JumpList）和dock菜单使应用程序能够快速的访问最近打开的文档列表。

**跳转列表**

![跳转列表最近的文件](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

**应用 dock 菜单**

![macOS Dock 菜单](https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png)

若要增加一个文件到最近文件列表，你可以使用[app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-macos-windows) API:

```javascript
const { app } = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

你也可以使用 [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-macos-windows) API 来清空最近文件列表。

```javascript
const { app } = require('electron')
app.clearRecentDocuments()
```

## Windows 注意事项

为了在 Windows 上使用这个特性，你的应用需要被注册为这类文件的处理程序，否则，在你注册之前，文件是不会出现在跳转列表里的。 你可以在 [Application Registration](https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx) 里找到所有关于注册事宜的说明。

当用户点击“跳转列表”上的一个文件时，系统会启动一个新的应用程序的实例 ，而文件的路径将作为一个命令行参数被传入这个实例。

## macOS 注意事项

从 "最近文档" 菜单中请求文件时, 将为其发出 ` app ` 模块的 ` open-file ` 事件。