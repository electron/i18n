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

## --inspect=`port` and --inspect-brk=`port`

调试相关的标识, 更多详细信息请查看 [Debugging the Main Process](../tutorial/debugging-main-process.md)指南.

## --remote-debugging-port=`port`

在指定`端口`开启HTTP远程调试.

## --disk-cache-size=`size`

强制磁盘缓存使用的最大磁盘空间（以字节为单位）。

## --js-flags=`flags`

指定传递给Node JS引擎的标志. 如果你想在主进程中启用`flags`, 则必须在启动Electron时传递.

```bash
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

访问[Node documentation](https://nodejs.org/api/cli.html)文档或者在终端中运行`node --help`命令查看flags变量列表. 此外，还可以运行`node --v8-options`来查看与Node的V8 JavaScript引擎特定相关的flags列表。

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

控制主机名映射方式的`rules`的逗号分隔列表.

例如：

* `MAP * 127.0.0.1` 强制将所有主机名映射到127.0.0.1
* `MAP *.google.com proxy` 强制所有google.com子域名解析到"proxy".
* `MAP test.com [::1]:77` 强制"test.com"解析为IPv6环回地址. 也将强制生成的套接字地址端口为77.
* `MAP * baz, EXCLUDE www.google.com` 把所有地址重新映射到“baz”, 除了"www.google.com".

These mappings apply to the endpoint host in a net request (the TCP connect and host resolver in a direct connection, and the `CONNECT` in an HTTP proxy connection, and the endpoint host in a `SOCKS` proxy connection).

## --host-resolver-rules=`rules`

Like `--host-rules` but these `rules` only apply to the host resolver.

## --auth-server-whitelist=`url`

A comma-separated list of servers for which integrated authentication is enabled.

例如：

    --auth-server-whitelist='*example.com, *foobar.com, *baz'
    

then any `url` ending with `example.com`, `foobar.com`, `baz` will be considered for integrated authentication. Without `*` prefix the url has to match exactly.

## --auth-negotiate-delegate-whitelist=`url`

A comma-separated list of servers for which delegation of user credentials is required. Without `*` prefix the url has to match exactly.

## --ignore-certificate-errors

Ignores certificate related errors.

## --ppapi-flash-path=`path`

Sets the `path` of the pepper flash plugin.

## --ppapi-flash-version=`version`

Sets the `version` of the pepper flash plugin.

## --log-net-log=`path`

Enables net log events to be saved and writes them to `path`.

## --disable-renderer-backgrounding

Prevents Chromium from lowering the priority of invisible pages' renderer processes.

This flag is global to all renderer processes, if you only want to disable throttling in one window, you can take the hack of [playing silent audio](https://github.com/atom/atom/pull/9485/files).

## --enable-logging

Prints Chromium's logging into console.

This switch can not be used in `app.commandLine.appendSwitch` since it is parsed earlier than user's app is loaded, but you can set the `ELECTRON_ENABLE_LOGGING` environment variable to achieve the same effect.

## --v=`log_level`

Gives the default maximal active V-logging level; 0 is the default. Normally positive values are used for V-logging levels.

This switch only works when `--enable-logging` is also passed.

## --vmodule=`pattern`

Gives the per-module maximal V-logging levels to override the value given by `--v`. E.g. `my_module=2,foo*=3` would change the logging level for all code in source files `my_module.*` and `foo*.*`.

Any pattern containing a forward or backward slash will be tested against the whole pathname and not just the module. E.g. `*/foo/bar/*=2` would change the logging level for all code in the source files under a `foo/bar` directory.

This switch only works when `--enable-logging` is also passed.