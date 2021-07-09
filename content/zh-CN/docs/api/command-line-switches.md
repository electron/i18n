# 支持的命令行开关

> Electron支持的命令行开关.

您可以在[app][app] 模块的[ready][ready]事件生效之前，使用[app.commandLine.appendSwitch][append-switch]将它们附加到您的应用程序的主要脚本中：

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.whenReady().then(() => {
  // Your code here
})
```

## Electron CLI 标志

### --auth-server-whitelist=`url`

启用了集成身份验证的以逗号分隔的服务器列表。

例如：

```sh
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

则任何以`example.com`, `foobar.com`, `baz`结尾的`url`, 都需要考虑集成验证. 没有 `*` 前缀的 URL 必须完全匹配。

### --auth-negotiate-delegate-whitelist=`url`

需要授权用户凭据的以逗号分隔的服务器列表。 没有 `*` 前缀的 URL 必须完全匹配。

### --disable-ntlm-v2

禁用NTLM v2的posix平台，对别处没有影响。

### --disable-http-cache

禁用HTTP请求的磁盘缓存.

### --disable-http2

禁用HTTP/2和SPDY/3.1协议.

### --disable-renderer-backgrounding

防止Chromium降低不可见的页面渲染进程的优先级.

这个标识是全局的, 影响所有渲染进程. 如果你只想禁用一个窗口的节流保护，你可以采取[playing silent audio][play-silent-audio].

### --disk-cache-size=`size`

强制磁盘缓存使用的最大磁盘空间（以字节为单位）。

### --enable-api-filtering-logging

开启以下API 的调用堆栈日志记录(过滤事件)：

* `desktopCapturer.getSources()` / `desktop-capturer-get-sources`
* `remote.require()` / `remote-require`
* `remote.getGlobal()` / `remote-get-builtin`
* `remote.getBuiltin()` / `remote-get-global`
* `remote.getCurrentWindow()` / `remote-get-current-window`
* `remote.getCurrentWebContents()` / `remote-get-current-web-contents`

### --enable-logging

在控制台打印Chromium日志.

这个开关不能用于`app.commandLine.appendSwitch`, 因为它在用户应用程序加载之前就被解析了, 但是你可以设置`ELECTRON_ENABLE_LOGGING`环境变量来达到同样的效果.

### --force-fieldtrials=`trials`

试用特性将强制启用或禁用。

例如： `WebRTC-Audio-Red-For-Opus/Enabled/`

### --host-rules=`rules`

以逗号分隔的`rules`列表，用于控制主机名的映射方式

例如：

* `MAP * 127.0.0.1` 强制将所有主机名映射到127.0.0.1
* `MAP *.google.com proxy` 强制所有google.com子域名解析到"proxy".
* `MAP test.com [::1]:77` 强制将 "test.com" 解析到 IPv6 环回接口。 也会强制目标套接字地址的端口为77。
* `MAP * baz, EXCLUDE www.google.com` 把所有地址重新映射到“baz”, 除了"www.google.com".

这些映射适用于网络请求中的端点主机. 网络请求包括TCP连接和直连的主机解析器, 以及HTTP代理连接中的`CONNECT`方式, 以及在`SOCKS`代理连接中的端点主机.

### --host-resolver-rules=`rules`

与`--host-rules`类似, 但是这些`rules`仅适用于主机解析器.

### --ignore-certificate-errors

忽略证书相关的错误.

### --ignore-connections-limit=`domains`

忽略由`,`分割的`domains`列表的连接限制.

### --js-flags=`flags`

指定传递到 Node.js 引擎的flags。 如果您想在主进程中启用 `flags` ，则必须在一开始运行Electron的时候就传递。

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

查看[Node.js 文档][node-cli]或者在终端中运行`node --help`命令查看可用的flags列表。 此外，还可以运行`node --v8-options`来查看与Node.js的V8 JavaScript引擎特定相关的flags列表。

### --lang

设置系统语言环境

### --log-net-log=`path`

启用需要保存的网络日志事件并将其写入`path`路径下.

### --no-proxy-server

不使用代理服务器，并始终保持直连。 会覆盖其他代理服务器标记。

### --no-sandbox

禁用 Chromium [沙箱](https://www.chromium.org/developers/design-documents/sandbox)。 强制渲染器进程和Chromium助手进程以非沙盒化运行。 应该只在测试时使用。

### --proxy-bypass-list=`hosts`

指示Electron绕过使用; 分号; 分割的给定的主机列表中的代理服务器。 这个标志只有在与` --proxy-server ` 同时使用时才具有效果。

例如：

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

上面的代码, 除了本地地址(`localhost`,`127.0.0.1`等等.), `google.com`子域名, 包含`foo.com`后缀的主机地址, 以及任何在`1.2.3.4:5678`上的地址以外的所有主机都将使用代理服务器.

### --proxy-pac-url=`url`

在指定`url`中使用PAC脚本.

### --proxy-server=`address:port`

使用指定的覆盖系统设置的代理服务器. 这个开关只影响HTTP协议请求, 包括HTTPS和WebSocket请求. 值得注意的是并不是所有的代理服务器都支持HTTPS和WebSocket请求. 代理 URL 不支持用户名和密码认证方式 [Chromium 的问题](https://bugs.chromium.org/p/chromium/issues/detail?id=615947)。

### --remote-debugging-port=`port`

在指定`端口`开启HTTP远程调试.

### --v=`log_level`

指定默认的最大活跃V-logging级别；默认值为0。 通常 V-logging 级别为正数。

这个开关只有在`--enable-logging`也被传递时才起效.

### --vmodule=`pattern`

给定每个模块最大的V-logging等级, 覆盖`--v`设定的值. 如下: `my_module=2,foo*=3` 会更改所有代码在源文件 `my_module.*` 和 `foo*.*` 中的日志级别。

任何包含正斜杠或反斜杠的模式都将针对 整个路径名进行测试，而不仅仅是模块。 如下: `*/foo/bar/*=2` 会更改`foo/bar` 目录下源文件中所有代码的日志级别。

这个开关只有在`--enable-logging`也被传递时才起效.

### --force_high_performance_gpu

当有多个GPU可用时，强制使用独立显卡。

### --force_low_power_gpu

当有多个GPU可用时，强制使用集成显卡。

## Node.js Flags

Electron 支持一些 Node.js 支持的 [CLI flags][node-cli]。

**注意：** 当Electron 不是以 `ELECTRON_RUN_AS_NODE`运行时，传递不支持的命令行参数到Electron 不会起作用。

### --inspect-brk[=[host:]port]

在 主机:端口 上激活检查器并在用户脚本开始运行后中断。 默认 主机:端口 为127.0.0.1:9229。

是 `--debug-brk=[host:]port`的别名

### --inspect-port=[host:]port

当检查器被激活时要使用的 `主机:端口`。 常用于通过发送 SIGUSR1 信号激活检查器时。 默认主机是 `127.0.0.1`。

是 `--debug-port=[host:]port`的别名

### --inspect[=[host:]port]

在 `主机:端口` 上激活检查器。 默认是 `127.0.0.1:9229`。

集成V8 检查器允许Chrome 开发者工具和 IDE 这些工具调试和修改 Electron 实例。 这些工具通过 TCP 端口连接到 Electron 实例，并使用 [Chrome 开发者工具协议](https://chromedevtools.github.io/devtools-protocol/)进行通信。

调试相关的标识, 更多详细信息请查看 [Debugging the Main Process][debugging-main-process]指南。

是 `--debug[host:]port`的别名

### --inspect-publish-uid=stderr,http

指定检查器的 web 套接字url 公开方式。

默认情况下，websocket url在 stderr 中和在 http://host:port/json/list 的 /json/list 端点下都是可用的。

[app]: app.md
[append-switch]: command-line.md#commandlineappendswitchswitch-value
[ready]: app.md#event-ready
[play-silent-audio]: https://github.com/atom/atom/pull/9485/files
[debugging-main-process]: ../tutorial/debugging-main-process.md
[node-cli]: https://nodejs.org/api/cli.html
[node-cli]: https://nodejs.org/api/cli.html
