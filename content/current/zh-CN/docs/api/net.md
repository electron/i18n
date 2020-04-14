# 网络

> 使用Chromium的原生网络库发出HTTP / HTTPS请求

进程：[主进程](../glossary.md#main-process)

`net` 模块是一个发送 HTTP(S) 请求的客户端API。 它类似于Node.js的[HTTP](https://nodejs.org/api/http.html) 和 [HTTPS](https://nodejs.org/api/https.html) 模块 ，但它使用的是Chromium原生网络库来替代Node.js的实现，提供更好的网络代理支持。 

下面是一个非详尽的列表, 用于说明为什么使用 ` net ` 模块而不是原生Node. js 模块:

* 系统代理配置的自动管理, 支持 wpad 协议和代理 pac 配置文件。
* HTTPS 请求的自动隧道。
* 支持使用basic、digest、NTLM、Kerberos 或协商身份验证方案对代理进行身份验证。
* 支持传输监控代理: 类似于Fiddler代理，用于访问控制和监视。

The API components (including classes, methods, properties and event names) are similar to those used in Node.js.

Example usage:

```javascript
const { app } = require('electron')
app.on('ready', () => {
  const { net } = require('electron')
  const request = net.request('https://github.com')
  request.on('response', (response) => {
    console.log(`STATUS: ${response.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
    response.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`)
    })
    response.on('end', () => {
      console.log('No more data in response.')
    })
  })
  request.end()
})
```

只有在应用程序发出 ` ready ` 事件之后, 才能使用 ` net ` API。尝试在 ` ready ` 事件之前使用该模块将抛出一个错误。

## 方法

` net ` 模块具有以下方法:

### `net.request(options)`

* `options` (ClientRequestConstructorOptions | String) - The `ClientRequest` constructor options.

返回 [`ClientRequest`](./client-request.md)

使用 ` options ` 创建 [` ClientRequest `](./client-request.md) 实例, 这些选项直接转发到 ` ClientRequest ` 的构造函数。 ` net.request ` 方法将根据 ` options ` 对象中的指定协议方案, 去发送安全和不安全的 HTTP 请求（ both secure and insecure HTTP requests）。