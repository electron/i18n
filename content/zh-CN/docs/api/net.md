# 网络

> 使用Chromium的原生网络库发出HTTP / HTTPS请求

进程：[主进程](../glossary.md#main-process)

`net` 模块是一个发送 HTTP(S) 请求的客户端API。 它类似于Node.js的[HTTP](https://nodejs.org/api/http.html) 和 [HTTPS](https://nodejs.org/api/https.html) 模块 ，但它使用的是Chromium原生网络库来替代Node.js的实现，提供更好的网络代理支持。 它还支持检查网络状态。

下面是一个非详尽的列表, 用于说明为什么使用 ` net ` 模块而不是原生Node. js 模块:

* 系统代理配置的自动管理, 支持 wpad 协议和代理 pac 配置文件。
* HTTPS 请求的自动隧道。
* 支持使用basic、digest、NTLM、Kerberos 或协商身份验证方案对代理进行身份验证。
* 支持传输监控代理: 类似于Fiddler代理，用于访问控制和监视。

API 组件（包括类、方法、属性和事件名称）与 节点中使用的组件相似.js。

示例用法：

```javascript
康斯特 { app } =需要（"电子"）
应用程序。当准备好时。然后（）=> =
 { net } =要求（"电子"）
  请求=net.请求（"https：//github.com"）
  请求。 （响应）=> •
    控制台.log（"状态： ${response.statusCode}"）
    控制台.log（"标题：$JSON.stringify（响应。heads）"）
    响应。 （块）=> {
      控制台.log（"BODY： ${chunk}"）
    ）
    响应.log
      > 。
    [）
  }）
  请求。结束（）
}）
```

只有在应用程序发出 `ready` 事件后才能使用 `net` API。 尝试在 `ready` 事件之前使用模块会抛出错误。

## 方法

` net ` 模块具有以下方法:

### `net.request(options)`

* `options` （客户要求建筑|字符串） - `ClientRequest` 构造器选项。

返回 [`ClientRequest`](./client-request.md)

使用 ` options ` 创建 [` ClientRequest `](./client-request.md) 实例, 这些选项直接转发到 ` ClientRequest ` 的构造函数。 ` net.request ` 方法将根据 ` options ` 对象中的指定协议方案, 去发送安全和不安全的 HTTP 请求（ both secure and insecure HTTP requests）。

### `网。在线（）`

返回 `Boolean` - 是否有当前的互联网连接。

`false` 的返回值是用户 无法连接到远程站点的一个相当有力的指标。 然而， `true` 的回报价值没有定论：即使某些链接已打开，也不确定 特定连接到特定远程站点 是否会成功。

## Properties

### `net.online` _·里德利·_

`Boolean` 属性。 目前是否有互联网连接。

`false` 的返回值是用户 无法连接到远程站点的一个相当有力的指标。 然而， `true` 的回报价值没有定论：即使某些链接已打开，也不确定 特定连接到特定远程站点 是否会成功。
