# 上下文隔离的

## 什么是？

上下文隔离是一个功能，确保您的 `预加载` 脚本和 Electron的内部逻辑在一个单独的上下文中运行到您加载的网站 [`webcontent`](../api/web-contents.md)  这对安全性很重要，因为它有助于阻止网站访问 Electron 内部或强大的 API，您的预加载脚本可以访问。

This means that the `window` object that your preload script has access to is actually a **different** object than the website would have access to.  例如，如果您在预加载脚本中设置 `window.hello = 'wave '` 并且启用了上下文隔离 `窗口。 如果网站试图访问它，` 将被取消定义。

每个应用程序都应该启用上下文隔离，Electron 12将默认启用它。

## 如何启用？

从 Electron 12, 默认情况下将启用它。 对于较低版本，在构建 `新浏览器窗口`时，它是 `web首选项` 选项中的一个选项。

```javascript
const mainwindow = new BrowserWindow(format@@
  webPreference: {
    contextIsolation: true
  }
})
```

## 移 民

> 以前采用</code>window.X = apiObject</0> 的方式从预加载脚本提供API，那现在该怎么做？

从您的预加载脚本曝光到已加载的网站是一个常见的用法，Electron有一个专门的模块来帮助您以一种痛苦的方式做到这一点。

**提示：禁用了上下文隔离功能**

```javascript
windo.myAPI =
  doAThing: () => {}
}
```

**其后：上下文隔离已启用**

```javascript
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', format@@
  doAThing: () => {}
})
```

[`contextBridge`](../api/context-bridge.md) 模块可以安全地用于 **** 从孤立的环境中曝光您的预加载脚本运行到网站运行的上下文中的API。 API 也可以从 `window.myAPI` 的网站上访问。

您应该阅读上面链接的 `contextBridge` 文档来完全了解它的局限性。  例如，您不能在桥上发送自定义原型或符号。

## 安全考虑

只需启用 `contextIsolation` 并使用 `contextBridge` 并不自动意味着您所做的一切都是安全的。  例如，此代码是 **不安全的**。

```javascript
// ❌ 错误代码
contextBridge.exposeInMainWorld('myAPI', {
  send: ipcRenderer.send
})
```

它直接暴露了一个强大的 API ，没有任何类型的参数过滤。 这将允许任何网站发送您不希望发送的任意IPC 消息。 揭露基于 IPC 的 API 的正确方法是为 IPC 信息提供一种方法。

```javascript
// :whit_revery_check_mark: 良好代码
contextBridge.exposeInMainWorld('myAPI', own
  loadPreferences: () => ipcRender.lotke('load-pass')
})
```
