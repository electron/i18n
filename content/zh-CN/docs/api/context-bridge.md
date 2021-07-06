# contextBridge

> 在隔离的上下文中创建一个安全的、双向的、同步的桥梁。

进程: [渲染进程](../glossary.md#renderer-process)

如下，是一个从隔离的预加载脚本将 API 暴露给渲染器的示例：

```javascript
// Preload (Isolated World)
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'electron',
  {
    doThing: () => ipcRenderer.send('do-a-thing')
  }
)
```

```javascript
// Renderer (Main World)

window.electron.doThing()
```

## 词汇表

### Main World

"Main World"是主渲染器代码运行的 JavaScript 上下文。 默认情况下，你在渲染器中加载的页面在此环境中执行代码。

### Isolated World

当你在`webPreferences`属性中启用`contextIsolation` (Electron 12.0.0 及以上版本默认启用)，你的`预加载`脚本将运行在一个“被隔离的环境”中。  您可以在[Security](../tutorial/security.md#3-enable-context-isolation-for-remote-content) 文档中阅读更多关于上下文隔离及其影响的信息。

## 方法

`contextBridge`模块有以下方法:

### `contextBridge.exposeInMainWorld(apiKey, api)`

* `apiKey` String - 将 API 注入到 `窗口` 的键。  API 将可通过 `window[apiKey]` 访问。
* `api` any - 你的 API可以是什么样的以及它是如何工作的相关信息如下。

## 用法

### API

提供给 [`exposeInMainWorld`](#contextbridgeexposeinmainworldapikey-api) 的 `api` 必须是一个 `Function`， `String`， `Number`， `Array`， `Boolean`；或一个键为字符串，值为一个 `Function`， `String`， `Number`， `Array`， `Boolean`的对象；或其他符合相同条件的嵌套对象。

`Function` 类型的值被代理到其他上下文中，所有其他类型的值都会被 **复制** 并 **冻结**。 在 API 中发送的任何数据 /原始数据将不可改变，在桥接器其中一侧的更新不会导致另一侧的更新。

复杂 API 的示例如下：

```javascript
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
  'electron',
  {
    doThing: () => ipcRenderer.send('do-a-thing'),
    myPromises: [Promise.resolve(), Promise.reject(new Error('whoops'))],
    anAsyncFunction: async () => 123,
    data: {
      myFlags: ['a', 'b', 'c'],
      bootTime: 1234
    },
    nestedAPI: {
      evenDeeper: {
        youCanDoThisAsMuchAsYouWant: {
          fn: () => ({
            returnData: 123
          })
        }
      }
    }
  }
)
```

### API Functions

你通过 `contextBridge` 绑定的 `Function` 值会被 Electron 代理，以确保保持上下文隔离。  这导致了我们在下面概述的一些键的限制。

#### 参数 / 错误 / 返回类型支持

因为当参数、错误和返回值在桥接器上发送时会被 **复制** ，所以只有某些类型可以使用。 从上层来看，如果你想要使用的类型可以序列化并反序列化为同一个对象，这个类型可以使用。  为确保完整性，下面列出了一份类型支持表：

| 类型                                                                                                             | 复杂度 | 有入参 | 有返回值 | 局限性                                                                            |
| -------------------------------------------------------------------------------------------------------------- | --- | --- | ---- | ------------------------------------------------------------------------------ |
| `字符串`                                                                                                          | 简单  | ✅   | ✅    | N/A                                                                            |
| `Number`                                                                                                       | 简单  | ✅   | ✅    | N/A                                                                            |
| `Boolean`                                                                                                      | 简单  | ✅   | ✅    | N/A                                                                            |
| `Object - 过滤器对象，包含过滤参数`                                                                                        | 复杂  | ✅   | ✅    | 键仅支持使用此表中的“简单”的类型。  值必须在此表中支持的值。  修改prototype将被丢弃。  发送自定义类将复制值，但不会包含prototype。 |
| `Array`                                                                                                        | 复杂  | ✅   | ✅    | 与 `Object` 类型相同的限制                                                             |
| `Error`                                                                                                        | 复杂  | ✅   | ✅    | 所抛出的错误也会被复制，这可能导致消息和堆栈跟踪的错误略有变化，由于在不同的上下文中抛出                                   |
| `Promise`                                                                                                      | 复杂  | ✅   | ✅    | 只有当 promise 是返回值或确切参数时，它们才会被代理。  嵌套在数组或对象中的Promise将被丢弃。                        |
| `Function - 回调函数`                                                                                              | 复杂  | ✅   | ✅    | 修改prototype将被丢弃。  发送类或构造函数将不起作用。                                               |
| [Cloneable Types](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) | 简单  | ✅   | ✅    | 点击链接查看可克隆类型的文档                                                                 |
| `Element`                                                                                                      | 复杂  | ✅   | ✅    | 修改prototype将被丢弃。  发送自定义元素将不生效。                                                 |
| `Symbol`                                                                                                       | N/A | ❌   | ❌    | Symbol不能跨上下文复制，因此会丢弃它们                                                         |

如果您关心的类型不在上表中，可能是因为不支持该类型。

### 暴露Node Global Symbols

`contextBridge` 可以被预加载脚本用来让您的渲染器访问Node API。 上面所述的支持类型表也适用于您通过 `contextBridge`暴露的Node API。 请注意许多Node的API授权访问本地系统资源。 请非常谨慎地暴露全局变量和api给不受信任的远程内容。

```javascript
const { contextBridge } = require('electron')
const crypto = require('crypto')
contextBridge.exposeInMainWorld('nodeCrypto', {
  sha256sum (data) {
    const hash = crypto.createHash('sha256')
    hash.update(data)
    return hash.digest('hex')
  }
})
```
