# 支持的命令行开关

> Electron支持的命令行开关.

您可以在[app](app.md) 模块的[ready](app.md#event-ready)事件生效之前，使用[app.commandLine.appendSwitch](app.md#appcommandlineappendswitchswitch-value)将它们附加到您的应用程序的主要脚本中：

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.on('ready', () => {
  // 你的代码
})
```

## --ignore-connections-limit=`domains`

忽略由`,`分割的`domains`列表的连接限制.

## --disable-http-cache

禁用HTTP请求的磁盘缓存.

## --disable-http2

禁用HTTP/2和SPDY/3.1协议.

## --lang

设置系统语言环境

## --inspect=`port` and --inspect-brk=`port`

调试相关的标识, 更多详细信息请查看 [Debugging the Main Process](../tutorial/debugging-main-process.md)指南.

## --remote-debugging-port=`port`

在指定`端口`开启HTTP远程调试.

## --disk-cache-size=`size`

强制磁盘缓存使用的最大磁盘空间（以字节为单位）。

## --js-flags=`flags`

Specifies the flags passed to the Node.js engine. It has to be passed when starting Electron if you want to enable the `flags` in the main process.

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

See the [Node.js documentation](https://nodejs.org/api/cli.html) or run `node --help` in your terminal for a list of available flags. Additionally, run `node --v8-options` to see a list of flags that specifically refer to Node.js's V8 JavaScript engine.

## --proxy-server=`address:port`

使用指定的覆盖系统设置的代理服务器. 这个开关只影响HTTP协议请求, 包括HTTPS和WebSocket请求. 值得注意的是并不是所有的代理服务器都支持HTTPS和WebSocket请求. 代理 URL 不支持用户名和密码认证方式 [Chromium 的问题](https://bugs.chromium.org/p/chromium/issues/detail?id=615947)。

## --proxy-bypass-list=`hosts`

Instructs Electron to bypass the proxy server for the given semi-colon-separated list of hosts. This flag has an effect only if used in tandem with `--proxy-server`.

例如：

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

上面的代码, 除了本地地址(`localhost`,`127.0.0.1`等等.), `google.com`子域名, 包含`foo.com`后缀的主机地址, 以及任何在`1.2.3.4:5678`上的地址以外的所有主机都将使用代理服务器.

## --proxy-pac-url=`url`

在指定`url`中使用PAC脚本.

## --no-proxy-server

Don't use a proxy server and always make direct connections. Overrides any other proxy server flags that are passed.

## --host-rules=`rules`

以逗号分隔的`rules`列表，用于控制主机名的映射方式

例如：

* `MAP * 127.0.0.1` 强制将所有主机名映射到127.0.0.1
* `MAP *.google.com proxy` 强制所有google.com子域名解析到"proxy".
* `MAP test.com [::1]:77` Forces "test.com" to resolve to IPv6 loopback. Will also force the port of the resulting socket address to be 77.
* `MAP * baz, EXCLUDE www.google.com` 把所有地址重新映射到“baz”, 除了"www.google.com".

这些映射适用于网络请求中的端点主机. 网络请求包括TCP连接和直连的主机解析器, 以及HTTP代理连接中的`CONNECT`方式, 以及在`SOCKS`代理连接中的端点主机.

## --host-resolver-rules=`rules`

与`--host-rules`类似, 但是这些`rules`仅适用于主机解析器.

## --auth-server-whitelist=`url`

启用了集成身份验证的以逗号分隔的服务器列表。

例如：

```sh
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

则任何以`example.com`, `foobar.com`, `baz`结尾的`url`, 都需要考虑集成验证. Without `*` prefix the URL has to match exactly.

## --auth-negotiate-delegate-whitelist=`url`

A comma-separated list of servers for which delegation of user credentials is required. Without `*` prefix the URL has to match exactly.

## --ignore-certificate-errors

忽略证书相关的错误.

## --ppapi-flash-path=`path`

设置pepper flash插件的`path`属性.

## --ppapi-flash-version=`version`

设置pepper flash插件的`version`属性.

## --log-net-log=`path`

启用需要保存的网络日志事件并将其写入`path`路径下.

## --disable-renderer-backgrounding

防止Chromium降低不可见的页面渲染进程的优先级.

这个标识是全局的, 影响所有渲染进程. 如果你只想禁用一个窗口的节流保护，你可以采取[playing silent audio](https://github.com/atom/atom/pull/9485/files).

## --enable-logging

在控制台打印Chromium日志.

这个开关不能用于`app.commandLine.appendSwitch`, 因为它在用户应用程序加载之前就被解析了, 但是你可以设置`ELECTRON_ENABLE_LOGGING`环境变量来达到同样的效果.

## --v=`log_level`

Gives the default maximal active V-logging level; 0 is the default. Normally positive values are used for V-logging levels.

这个开关只有在`--enable-logging`也被传递时才起效.

## --vmodule=`pattern`

给定每个模块最大的V-logging等级, 覆盖`--v`设定的值. 例如, `my_module=2,foo*=3`将改变所有`my_module.*`和`foo*.*`源文件的代码的日志等级.

任何包含正斜杠或反斜杠的模式都将针对 整个路径名进行测试，而不仅仅是模块。 例如, `*/foo/bar/*=2`会改变`foo/bar`目录下源文件的所有代码的日志等级.

这个开关只有在`--enable-logging`也被传递时才起效.

## --enable-api-filtering-logging

Enables caller stack logging for the following APIs (filtering events):
- `desktopCapturer.getSources()` / `desktop-capturer-get-sources`
- `remote.require()` / `remote-require`
- `remote.getGlobal()` / `remote-get-builtin`
- `remote.getBuiltin()` / `remote-get-global`
- `remote.getCurrentWindow()` / `remote-get-current-window`
- `remote.getCurrentWebContents()` / `remote-get-current-web-contents`
- `remote.getGuestWebContents()` / `remote-get-guest-web-contents`

## --no-sandbox

Disables Chromium sandbox, which is now enabled by default. Should only be used for testing.
