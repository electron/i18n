# 上下文桥

> 在孤立的环境中创建安全、双向、同步的桥梁

进程: [渲染进程](../glossary.md#renderer-process)

下文提供了从孤立的预加载脚本将 API 暴露给渲染器的示例：

```javascript
预加载（孤立的世界）
const { contextBridge, ipcRenderer } =要求（"电子"）

上下文Bridge.暴露世界（
  "电子"，
  {
    做什么：（）=> ipcRenderer.发送（'做一件事'）
  =
）
```

```javascript
渲染器（主世界）

窗口。
```

## 词汇表

### 主世界

"主世界"是主渲染器代码运行中的 JavaScript 上下文。 默认情况下，您在渲染器中加载的 页面在此世界中执行代码。

### 孤立的世界

当你在`webPreferences`属性中启用`contextIsolation` (Electron 12.0.0 及以上版本默认启用)，你的`预加载`脚本将运行在一个“被隔离的环境”中。  您可以阅读更多有关上下文隔离及其在 [安全](../tutorial/security.md#3-enable-context-isolation-for-remote-content) 文档中的影响。

## 方法

`contextBridge` 模块有以下方法：

### `contextBridge.exposeInMainWorld(apiKey, api)` _实验_

* `apiKey` 字符串 - 将 API 注入 `window` 的关键。  API 将于 `window[apiKey]`日访问。
* `api` 任何 - 您的 API，有关此 API 可以是什么以及它的工作原理的更多信息，请了解以下信息。

## 用法

### API

提供给 [`exposeInMainWorld`](#contextbridgeexposeinmainworldapikey-api-experimental) 的 `api` 必须是 `Function`、 `String`、 `Number`、 `Array`、 `Boolean`，或钥匙是字符串和值的对象 为 `Function`、 `String`、 `Number`、 `Array`、 `Boolean`或其他符合相同条件的嵌套对象。

`Function` 值是接近其他上下文和所有其他值 **复制** 和 **冻结**。 API 发送的任何数据/原始数据将变得不可变，桥的两侧的更新不会导致另一侧的更新。

复杂 API 的示例如下：

```javascript
康斯特 { contextBridge } =要求（'电子'）

上下文Bridge.暴露世界（
  '电子'，
  {
    做什么：（）=> ipcRenderer.发送（'做一件事'），
    我的建议：[承诺。解决（），承诺拒绝（新错误（'哎呀'）
    一个不对称功能：不对称（）=> 123，
    数据：{
      我的火焰：['a'， 'b'，'c'，
      引导时间：1234
    }，
    嵌套API：{
      甚至迪珀：{
        你可以做这个作为你：{
          fn：（）=> （{
            returnData: 123
          }）
        }
      }
    }
  }
）
```

### API 功能

通过 Electron 将您绑定在 `contextBridge` 中的`Function` 值是近似的，以确保上下文保持孤立。  此 导致我们概述以下一些关键限制。

#### 参数/错误/返回类型支持

由于参数、错误和返回值 **在桥上发送时** 复制，因此只能使用某些类型。 在高层次上，如果您想要使用的类型可以序列化并去除为同一对象，它将工作。  为了完整性，下面包含了类型支持 表：

| 类型                                                                                                   | 复杂性 | 参数支持 | 回报价值支持 | 局限性                                                             |
| ---------------------------------------------------------------------------------------------------- | --- | ---- | ------ | --------------------------------------------------------------- |
| `字符串`                                                                                                | 简单  | ✅    | ✅      | 不适用                                                             |
| `Number`                                                                                             | 简单  | ✅    | ✅      | 不适用                                                             |
| `Boolean`                                                                                            | 简单  | ✅    | ✅      | 不适用                                                             |
| `Object - 过滤器对象，包含过滤参数`                                                                              | 复杂  | ✅    | ✅      | 必须仅使用此表中的"简单"类型支持密钥。  在此表中必须支持值。  原型修改被丢弃。  发送自定义类将复制值，但不会复制原型。 |
| `Array`                                                                                              | 复杂  | ✅    | ✅      | 与 `Object` 类型的限制相同                                              |
| `错误`                                                                                                 | 复杂  | ✅    | ✅      | 抛出的错误也会被复制，这可能导致错误的消息和堆栈跟踪由于被扔在不同的上下文中而略有变化                     |
| `承诺`                                                                                                 | 复杂  | ✅    | ✅      | 只有当承诺是回报值或确切参数时，才会接近承诺。  嵌套在阵列或对象中的承诺将被丢弃。                      |
| `Function - 回调函数`                                                                                    | 复杂  | ✅    | ✅      | 原型修改被丢弃。  发送类或构造器将无法工作。                                         |
| [可克隆类型](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) | 简单  | ✅    | ✅      | 查看有关可克隆类型的链接文档                                                  |
| `象征`                                                                                                 | 不适用 | ❌    | ❌      | 符号不能跨上下文复制，因此它们被丢弃                                              |

如果您关心的类型不在上表中，则可能不支持该类型。

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
