# 支持的 Chrome 命令行开关

> Electron支持的命令行开关.

您可以在[app](app.md) 模块的[ready](app.md#event-ready)事件生效之前，使用[app.commandLine.appendSwitch](app.md#appcommandlineappendswitchswitch-value)将它们附加到您的应用程序的主要脚本中：

```javascript
const {app} = require('electron')
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

指定传递给Node JS引擎的标志. 如果你想在主进程中启用`flags`, 则必须在启动Electron时传递.

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

访问[Node documentation](https://nodejs.org/api/cli.html)文档或者在终端中运行`node --help`命令查看可用的标志列表. 此外，还可以运行`node --v8-options`来查看与Node的V8 JavaScript引擎特定相关的flags列表。

## --proxy-server=`address:port`

使用指定的覆盖系统设置的代理服务器. 这个开关只影响HTTP协议请求, 包括HTTPS和WebSocket请求. 值得注意的是并不是所有的代理服务器都支持HTTPS和WebSocket请求.

## --proxy-bypass-list=`hosts`

指示 Electron绕过给定的分号分隔的代理服务器主机列表. 这个标志只有在与`--proxy-server`配合使用时才会生效。

例如：

```javascript
const {app} = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

上面的代码, 除了本地地址(`localhost`,`127.0.0.1`等等.), `google.com`子域名, 包含`foo.com`后缀的主机地址, 以及任何在`1.2.3.4:5678`上的地址以外的所有主机都将使用代理服务器.

## --proxy-pac-url=`url`

在指定`url`中使用PAC脚本.

## --no-proxy-server

不要使用代理服务器，并始终直接连接. 覆盖传递的任何其他代理服务器标志。

## --host-rules=`rules`

以逗号分隔的`rules`列表，用于控制主机名的映射方式

例如：

* `MAP * 127.0.0.1` 强制将所有主机名映射到127.0.0.1
* `MAP *.google.com proxy` 强制所有google.com子域名解析到"proxy".
* `MAP test.com [::1]:77` 强制"test.com"解析为IPv6环回地址. 也将强制生成的套接字地址端口为77.
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

则任何以`example.com`, `foobar.com`, `baz`结尾的`url`, 都需要考虑集成验证. 没有`*`前缀，则url必须完全匹配.

## --auth-negotiate-delegate-whitelist=`url`

需要身份验证的服务器的逗号分隔列表. 没有`*`前缀则url必须完全匹配.

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

给定默认的最大的有效V-logging等级; 0是默认值。 通常V-logging等级为正值.

这个开关只有在`--enable-logging`也被传递时才起效.

## --vmodule=`pattern`

给定每个模块最大的V-logging等级, 覆盖`--v`设定的值. 例如, `my_module=2,foo*=3`将改变所有`my_module.*`和`foo*.*`源文件的代码的日志等级.

针对完整的路径名, 任何包含斜杠或反斜杠的格式都要被检测, 对于模块也不例外. 例如, `*/foo/bar/*=2`会改变`foo/bar`目录下源文件的所有代码的日志等级.

这个开关只有在`--enable-logging`也被传递时才起效.