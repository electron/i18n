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

只有在应用程序发出 `ready` 事件后才能使用 `net` API。 Trying to use the module before the `ready` event will throw an error.

## 方法

` net ` 模块具有以下方法:

### `net.request(options)`

* `options` (ClientRequestConstructorOptions | String) - The `ClientRequest` constructor options.

返回 [`ClientRequest`](./client-request.md)

使用 ` options ` 创建 [` ClientRequest `](./client-request.md) 实例, 这些选项直接转发到 ` ClientRequest ` 的构造函数。 ` net.request ` 方法将根据 ` options ` 对象中的指定协议方案, 去发送安全和不安全的 HTTP 请求（ both secure and insecure HTTP requests）。

### `net.isOnline()`

Returns `Boolean` - Whether there is currently internet connection.

A return value of `false` is a pretty strong indicator that the user won't be able to connect to remote sites. However, a return value of `true` is inconclusive; even if some link is up, it is uncertain whether a particular connection attempt to a particular remote site will be successful.

## Properties

### `net.online` _Readonly_

A `Boolean` property. Whether there is currently internet connection.

A return value of `false` is a pretty strong indicator that the user won't be able to connect to remote sites. However, a return value of `true` is inconclusive; even if some link is up, it is uncertain whether a particular connection attempt to a particular remote site will be successful.
