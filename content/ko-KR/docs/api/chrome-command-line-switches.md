# Chrome 의 Command Line Switches 지원

> Electron에서 지원하는 커맨드 명령줄 스위치입니다.

애플리케이션 메인 스크립트의 [app](app.md)모듈에서 [ready](app.md#event-ready) 이벤트가 실행되기 전에 [app.commandLine.appendSwitch](app.md#appcommandlineappendswitchswitch-value)를 호출하면, 애플리케이션의 명령줄 옵션을 추가로 지정할 수 있습니다:

```javascript
const {app} = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.on('ready', () => {
  // Your code here
})
```

## --ignore-connections-limit=`domains`

`domains` 리스트 (`,`로 구분)의 연결 제한을 무시합니다.

## --disable-http-cache

HTTP 요청 캐시를 비활성화합니다.

## --disable-http2

HTTP/2와 SPDY/3.1 프로토콜을 비활성화합니다.

## --lang

Set a custom locale.

## --inspect=`port` and --inspect-brk=`port`

디버깅관련 플래그입니다. 자세한 내용은 [메인프로세스 디버깅하기] [Debugging the Main Process](../tutorial/debugging-main-process.md) 안내서를 보세요.

## --remote-debugging-port=`port`

지정한 `port`에 HTTP 기반의 리모트 디버거를 활성화합니다. (개발자 도구)

## --disk-cache-size=`size`

Forces the maximum disk space to be used by the disk cache, in bytes.

## --js-flags=`flags`

Node JS 엔진에 지정한 플래그를 전달합니다. `flags`를 메인 프로세스에서 활성화하고자 한다면, Electron이 시작되기 전에 스위치를 전달해야 합니다.

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

가능한 플래그 목록은 [Node 문서](https://nodejs.org/api/cli.html)를 보거나 터미널에서 <0>node --help</0> 명령을 실행하세요. 또한, 구체적으로 노드의 V8 자바스크립트 엔진과 관련있는 플래그의 목록을 보려면 <0>node --v8-options</0> 를 실행하세요. 

## --proxy-server=`address:port`

시스템 설정의 프록시 서버를 무시하고 지정한 서버로 연결합니다. HTTP와 HTTPS 요청에만 적용됩니다. 시스템 프록시 서버 설정을 무시하고 지정한 서버로 연결합니다. 이 스위치는 HTTP와 HTTPS 그리고 WebSocket 요청에만 적용됩니다. 그리고 모든 프록시 서버가 HTTPS가 WebSocket 요청을 지원하지 않고 있을 수 있으므로 사용시 주의해야 합니다. 

## --proxy-bypass-list=`hosts`

Instructs Electron to bypass the proxy server for the given semi-colon-separated list of hosts. This flag has an effect only if used in tandem with `--proxy-server`.

예시:

```javascript
const {app} = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Will use the proxy server for all hosts except for local addresses (`localhost`, `127.0.0.1` etc.), `google.com` subdomains, hosts that contain the suffix `foo.com` and anything at `1.2.3.4:5678`.

## --proxy-pac-url=`url`

지정한 `url`의 PAC 스크립트를 사용합니다.

## --no-proxy-server

프록시 서버를 사용하지 않습니다. 다른 프록시 서버 플래그 및 설정을 무시하고 언제나 직접 연결을 사용합니다.

## --host-rules=`rules`

A comma-separated list of `rules` that control how hostnames are mapped.

예시:

* `MAP * 127.0.0.1` Forces all hostnames to be mapped to 127.0.0.1
* `MAP *.google.com proxy` Forces all google.com subdomains to be resolved to "proxy".
* `MAP test.com [::1]:77` Forces "test.com" to resolve to IPv6 loopback. Will also force the port of the resulting socket address to be 77.
* `MAP * baz, EXCLUDE www.google.com` Remaps everything to "baz", except for "www.google.com".

These mappings apply to the endpoint host in a net request (the TCP connect and host resolver in a direct connection, and the `CONNECT` in an HTTP proxy connection, and the endpoint host in a `SOCKS` proxy connection).

## --host-resolver-rules=`rules`

Like `--host-rules` but these `rules` only apply to the host resolver.

## --auth-server-whitelist=`url`

A comma-separated list of servers for which integrated authentication is enabled.

예시:

```sh
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

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