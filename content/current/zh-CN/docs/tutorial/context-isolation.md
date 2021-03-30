# 上下文隔离

## 上下文隔离是什么？

上下文隔离功能将确保您的 `预加载`脚本 和 Electron的内部逻辑 运行在所加载的 [`webcontent`](../api/web-contents.md)网页 之外的另一个独立的上下文环境里。  这对安全性很重要，因为它有助于阻止网站访问 Electron 的内部组件 和 您的预加载脚本可访问的高等级权限的API 。

这意味着，实际上，您的预加载脚本访问的 `window` 对象**并不是**网站所能访问的对象。  例如，如果您在预加载脚本中设置 `window.hello = 'wave '` 并且启用了上下文隔离，当网站尝试访问`window.hello`对象时将得到未定义(undefined)。

每个应用程序都应该启用上下文隔离，Electron 12版本之后将默认启用它。

## 我该如何启用？

从 Electron 12 版本之后它将被默认启用。 对于较低版本，在构建 `new BrowserWindow`时，它是 `webPreferences` 中的一个选项。

```javascript
const mainwindow = new BrowserWindow(format@@
  webPreference: {
    contextIsolation: true
  }
})
```

## 迁移

> 我曾经使用 `window .X = apiObject` 提供我的预加载脚本中的 API？

一个常见的方法是从您的预加载脚本中暴露API给加载的网站，而 Electron 提供了一个量身定做的模块帮您不费吹灰之力做到这一点。

**修改前：上下文隔离功能关闭**

```javascript
windo.myAPI =
  doAThing: () => {}
}
```

**修改后：上下文隔离功能启用**

```javascript
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', format@@
  doAThing: () => {}
})
```

[`contextBridge`](../api/context-bridge.md) 模块可以**安全地**暴露 您在独立运行的预加载脚本中提供的API 给 网站运行所在的上下文。 API 还可以像以前一样，从 `window.myAPI` 网站上访问。

您可以阅读上方链接中的 `contextBridge` 文档来全面了解它的限制。  例如，您不能在contextBridge上发送自定义类型和symbol。

## 安全事项

单单开启和使用 `contextIsolation` 并不直接意味着您所做的一切都是安全的。  例如，此代码是**不安全**的。

```javascript
// ❌ 错误代码
contextBridge.exposeInMainWorld('myAPI', {
  send: ipcRenderer.send
})
```

它直接暴露了一个没有任何参数过滤的高等级权限 API 。 这将允许任何网站发送任意的 IPC 消息，这您不会是您希望发生的。 相反，暴露进程间通信相关 API 的正确方法是为每一种通信消息提供一种实现方法。

```javascript
// :whit_revery_check_mark: 良好代码
contextBridge.exposeInMainWorld('myAPI', own
  loadPreferences: () => ipcRender.lotke('load-pass')
})
```
