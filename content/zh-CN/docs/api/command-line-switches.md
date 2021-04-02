# 支持的命令行开关

> Electron支持的命令行开关.

您可以在[app][app] 模块的[ready][ready]事件生效之前，使用[app.commandLine.appendSwitch][append-switch]将它们附加到您的应用程序的主要脚本中：

```javascript
康斯特 { app } =需要（"电子"）
应用程序。命令行。附录开关（"远程调试端口"， "8315"）
应用程序.命令行。附录开关（"主机规则"，"MAP* 127.0.0.1"）



  > 应用程序。
```

## Electron CLI Flags

### --auth-server-whitelist=`url`

启用了集成身份验证的以逗号分隔的服务器列表。

例如：

```sh
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

则任何以`example.com`, `foobar.com`, `baz`结尾的`url`, 都需要考虑集成验证. 如果没有 `*` 前缀，URL必须完全匹配。

### --auth-negotiate-delegate-whitelist=`url`

需要授权用户凭据的服务器逗号分离列表。 如果没有 `*` 前缀，URL必须完全匹配。

### --禁用-无国他明-v2

禁用NTLM v2的posix平台，没有其他地方的影响。

### --disable-http-cache

禁用HTTP请求的磁盘缓存.

### --disable-http2

禁用HTTP/2和SPDY/3.1协议.

### --disable-renderer-backgrounding

防止Chromium降低不可见的页面渲染进程的优先级.

这个标识是全局的, 影响所有渲染进程. 如果你只想禁用一个窗口的节流保护，你可以采取[playing silent audio][play-silent-audio].

### --disk-cache-size=`size`

强制磁盘缓存使用的最大磁盘空间（以字节为单位）。

### --启用-阿皮过滤-记录

启用呼叫者堆栈记录以下 ABI（过滤事件）：

- `desktopCapturer.getSources()` / `desktop-capturer-get-sources`
- `remote.require()` / `remote-require`
- `remote.getGlobal()` / `remote-get-builtin`
- `remote.getBuiltin()` / `remote-get-global`
- `remote.getCurrentWindow()` / `remote-get-current-window`
- `remote.getCurrentWebContents()` / `remote-get-current-web-contents`

### --enable-logging

在控制台打印Chromium日志.

这个开关不能用于`app.commandLine.appendSwitch`, 因为它在用户应用程序加载之前就被解析了, 但是你可以设置`ELECTRON_ENABLE_LOGGING`环境变量来达到同样的效果.

### --host-rules=`rules`

以逗号分隔的`rules`列表，用于控制主机名的映射方式

例如：

* `MAP * 127.0.0.1` 强制将所有主机名映射到127.0.0.1
* `MAP *.google.com proxy` 强制所有google.com子域名解析到"proxy".
* `MAP test.com [::1]:77` 力"test.com"解决IPv6回路。 将 也迫使由此产生的插座地址的端口为 77。
* `MAP * baz, EXCLUDE www.google.com` 把所有地址重新映射到“baz”, 除了"www.google.com".

这些映射适用于网络请求中的端点主机. 网络请求包括TCP连接和直连的主机解析器, 以及HTTP代理连接中的`CONNECT`方式, 以及在`SOCKS`代理连接中的端点主机.

### --host-resolver-rules=`rules`

与`--host-rules`类似, 但是这些`rules`仅适用于主机解析器.

### --ignore-certificate-errors

忽略证书相关的错误.

### --ignore-connections-limit=`domains`

忽略由`,`分割的`domains`列表的连接限制.

### --js-flags=`flags`

指定传递到节点.js发动机的旗帜。 如果你想在主过程中启用 `flags` ，它必须经过 电子。

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

请参阅 [节点.js文档][node-cli] 或在终端中运行 `node --help` 以查看可用标志列表。 此外， `node --v8-options` 运行，查看专门指节点.js的 V8 JavaScript 发动机的旗帜列表。

### --lang

设置系统语言环境

### --log-net-log=`path`

启用需要保存的网络日志事件并将其写入`path`路径下.

### --no-proxy-server

不要使用代理服务器，并且始终进行直接连接。 覆盖已通过的任何其他 代理服务器标志。

### --无沙盒

禁用铬沙盒，现在默认启用。 应该只用于测试。

### --proxy-bypass-list=`hosts`

指示 Electron 绕过代理服务器，以获得给定的分号分离 主机列表。 只有与 `--proxy-server`同时使用，此标志才会有效果。

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

给出默认的最大活动 V 记录级别：0为默认值。 通常 正值用于 V 记录级别。

这个开关只有在`--enable-logging`也被传递时才起效.

### --vmodule=`pattern`

给定每个模块最大的V-logging等级, 覆盖`--v`设定的值. 如下: `my_module=2,foo*=3` 将更改 源文件中的所有代码的登录级别 `my_module.*` 和 `foo*.*`。

任何包含正斜杠或反斜杠的模式都将针对 整个路径名进行测试，而不仅仅是模块。 如下: `*/foo/bar/*=2` 将在 `foo/bar` 目录下更改源文件中所有代码的 记录级别。

这个开关只有在`--enable-logging`也被传递时才起效.

### --force_high_performance_gpu

当有多个GPU可用时，强制使用离散GPU。

### --force_low_power_gpu

当有多个GPU可用时，强制使用集成GPU。

## Node.js Flags

电子支持节点.js支持的一些</a>

CLI 标志。</p> 

**注意：** 通过不受支持的命令行切换到电子时，它不运行在 `ELECTRON_RUN_AS_NODE` 将没有效果。



### --检查-伯克[主机：]端口]

激活主机上的检查员：端口并在用户脚本开始时中断。 默认主机：端口为 127.0.0.1：9229。

别名 `--debug-brk=[host:]port`。



### --检查端口][主机：]端口

设置 `host:port` 在激活检查员时使用。 通过发送SIGUSR1信号激活检查员时很有用。 默认主机 `127.0.0.1`。

别名 `--debug-port=[host:]port`。



### --检查[主机：]端口]

`host:port`激活检查员。 默认值 `127.0.0.1:9229`。

V8 检查器集成允许诸如 Chrome DevTools 和 IDE 等工具进行诊断和配置文件电子实例。 这些工具通过 TCP 端口连接到电子实例，并使用 [铬开发工具协议进行通信，](https://chromedevtools.github.io/devtools-protocol/)。

有关详细信息，请参阅 [调试主流程][debugging-main-process] 指南。

别名 `--debug[=[host:]port`。



### --检查-发布-乌伊德-斯特德，赫特普

指定检查员网络插座网址暴露的方法。

默认情况下，检查员网套网址可在斯特德尔和/json/列表端点下http：//主机：端口/json/列表中提供。

[app]: app.md
[append-switch]: command-line.md#commandlineappendswitchswitch-value
[ready]: app.md#event-ready
[play-silent-audio]: https://github.com/atom/atom/pull/9485/files
[debugging-main-process]: ../tutorial/debugging-main-process.md
[node-cli]: https://nodejs.org/api/cli.html
