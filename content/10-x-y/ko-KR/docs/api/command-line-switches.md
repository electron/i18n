# 지원되는 명령행 스위치

> Electron에서 지원하는 커맨드 명령줄 스위치입니다.

애플리케이션 메인 스크립트의 [app][app]모듈에서 [ready][ready] 이벤트가 실행되기 전에 [app.commandLine.appendSwitch][append-switch]를 호출하면, 애플리케이션의 명령줄 옵션을 추가로 지정할 수 있습니다:

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.whenReady().then(() => {
  // Your code here
})
```

## Electron CLI Flags

### --auth-server-whitelist=`url`

A comma-separated list of servers for which integrated authentication is enabled.

예시:

```sh
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

then any `url` ending with `example.com`, `foobar.com`, `baz` will be considered for integrated authentication. Without `*` prefix the URL has to match exactly.

### --auth-negotiate-delegate-whitelist=`url`

A comma-separated list of servers for which delegation of user credentials is required. Without `*` prefix the URL has to match exactly.

### --disable-ntlm-v2

Disables NTLM v2 for posix platforms, no effect elsewhere.

### --disable-http-cache

HTTP 요청 캐시를 비활성화합니다.

### --disable-http2

HTTP/2와 SPDY/3.1 프로토콜을 비활성화합니다.

### --disable-renderer-backgrounding

Prevents Chromium from lowering the priority of invisible pages' renderer processes.

This flag is global to all renderer processes, if you only want to disable throttling in one window, you can take the hack of [playing silent audio][play-silent-audio].

### --disk-cache-size=`size`

Forces the maximum disk space to be used by the disk cache, in bytes.

### --enable-api-filtering-logging

Enables caller stack logging for the following APIs (filtering events):
- `desktopCapturer.getSources()` / `desktop-capturer-get-sources`
- `remote.require()` / `remote-require`
- `remote.getGlobal()` / `remote-get-builtin`
- `remote.getBuiltin()` / `remote-get-global`
- `remote.getCurrentWindow()` / `remote-get-current-window`
- `remote.getCurrentWebContents()` / `remote-get-current-web-contents`

### --enable-logging

Prints Chromium's logging into console.

This switch can not be used in `app.commandLine.appendSwitch` since it is parsed earlier than user's app is loaded, but you can set the `ELECTRON_ENABLE_LOGGING` environment variable to achieve the same effect.

### --host-rules=`rules`

A comma-separated list of `rules` that control how hostnames are mapped.

예시:

* `MAP * 127.0.0.1` Forces all hostnames to be mapped to 127.0.0.1
* `MAP *.google.com proxy` Forces all google.com subdomains to be resolved to "proxy".
* `MAP test.com [::1]:77` Forces "test.com" to resolve to IPv6 loopback. Will also force the port of the resulting socket address to be 77.
* `MAP * baz, EXCLUDE www.google.com` Remaps everything to "baz", except for "www.google.com".

These mappings apply to the endpoint host in a net request (the TCP connect and host resolver in a direct connection, and the `CONNECT` in an HTTP proxy connection, and the endpoint host in a `SOCKS` proxy connection).

### --host-resolver-rules=`rules`

Like `--host-rules` but these `rules` only apply to the host resolver.

### --ignore-certificate-errors

Ignores certificate related errors.

### --ignore-connections-limit=`domains`

`domains` 리스트 (`,`로 구분)의 연결 제한을 무시합니다.

### --js-flags=`flags`

Specifies the flags passed to the Node.js engine. It has to be passed when starting Electron if you want to enable the `flags` in the main process.

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

See the [Node.js documentation][node-cli] or run `node --help` in your terminal for a list of available flags. Additionally, run `node --v8-options` to see a list of flags that specifically refer to Node.js's V8 JavaScript engine.

### --lang

Set a custom locale.

### --log-net-log=`path`

Enables net log events to be saved and writes them to `path`.

### --no-proxy-server

Don't use a proxy server and always make direct connections. Overrides any other proxy server flags that are passed.

### --no-sandbox

Disables Chromium sandbox, which is now enabled by default. Should only be used for testing.

### --proxy-bypass-list=`hosts`

Instructs Electron to bypass the proxy server for the given semi-colon-separated list of hosts. This flag has an effect only if used in tandem with `--proxy-server`.

예시:

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Will use the proxy server for all hosts except for local addresses (`localhost`, `127.0.0.1` etc.), `google.com` subdomains, hosts that contain the suffix `foo.com` and anything at `1.2.3.4:5678`.

### --proxy-pac-url=`url`

지정한 `url`의 PAC 스크립트를 사용합니다.

### --proxy-server=`address:port`

시스템 설정의 프록시 서버를 무시하고 지정한 서버로 연결합니다. HTTP와 HTTPS 요청에만 적용됩니다. 시스템 프록시 서버 설정을 무시하고 지정한 서버로 연결합니다. 이 스위치는 HTTP와 HTTPS 그리고 WebSocket 요청에만 적용됩니다. 그리고 모든 프록시 서버가 HTTPS가 WebSocket 요청을 지원하지 않고 있을 수 있으므로 사용시 주의해야 합니다.   The proxy URL does not support username and password authentication [per Chromium issue](https://bugs.chromium.org/p/chromium/issues/detail?id=615947).

### --remote-debugging-port=`port`

지정한 `port`에 HTTP 기반의 리모트 디버거를 활성화합니다. (개발자 도구)

### --ppapi-flash-path=`path`

Sets the `path` of the pepper flash plugin.

### --ppapi-flash-version=`version`

Sets the `version` of the pepper flash plugin.

### --v=`log_level`

Gives the default maximal active V-logging level; 0 is the default. Normally positive values are used for V-logging levels.

This switch only works when `--enable-logging` is also passed.

### --vmodule=`pattern`

Gives the per-module maximal V-logging levels to override the value given by `--v`. 예: `my_module=2,foo*=3` would change the logging level for all code in source files `my_module.*` and `foo*.*`.

Any pattern containing a forward or backward slash will be tested against the whole pathname and not only the module. 예: `*/foo/bar/*=2` would change the logging level for all code in the source files under a `foo/bar` directory.

This switch only works when `--enable-logging` is also passed.

## Node.js Flags

Electron supports some of the [CLI flags][node-cli] supported by Node.js.

**Note:** Passing unsupported command line switches to Electron when it is not running in `ELECTRON_RUN_AS_NODE` will have no effect.

### --inspect-brk[=[host:]port]

Activate inspector on host:port and break at start of user script. Default host:port is 127.0.0.1:9229.

Aliased to `--debug-brk=[host:]port`.

### --inspect-port=[host:]port

Set the `host:port` to be used when the inspector is activated. Useful when activating the inspector by sending the SIGUSR1 signal. Default host is `127.0.0.1`.

Aliased to `--debug-port=[host:]port`.

### --inspect[=[host:]port]

Activate inspector on `host:port`. Default is `127.0.0.1:9229`.

V8 inspector integration allows tools such as Chrome DevTools and IDEs to debug and profile Electron instances. The tools attach to Electron instances via a TCP port and communicate using the [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/).

See the [Debugging the Main Process][debugging-main-process] guide for more details.

Aliased to `--debug[=[host:]port`.

### --inspect-publish-uid=stderr,http
Specify ways of the inspector web socket url exposure.

By default inspector websocket url is available in stderr and under /json/list endpoint on http://host:port/json/list.

[app]: app.md
[append-switch]: app.md#appcommandlineappendswitchswitch-value
[ready]: app.md#event-ready
[play-silent-audio]: https://github.com/atom/atom/pull/9485/files
[debugging-main-process]: ../tutorial/debugging-main-process.md
[node-cli]: https://nodejs.org/api/cli.html
[node-cli]: https://nodejs.org/api/cli.html
