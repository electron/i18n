# Switches de Linha de Comando Suportadas

> Opções de linha de comando suportados pelo Electron.

Você pode usar [app.commandLine.appendSwitch][append-switch] para apêndice-los o script principal do seu aplicativo antes que o [pronto][ready] evento do [][app] módulo do aplicativo seja emitido:

```javascript
const { app } = require ('electron')
app.commandLine.appendSwitch ('porta de depuração remota', '8315')
app.commandLine.appendSwitch('regras do host', 'MAP * 127.0.0.1')

app.whenReady().then((()=> {
  // Seu código aqui
})
```

## Bandeiras de Elétrons CLI

### --auth-server-whitelist=`url`

Uma lista separada de címula de servidores para os quais a autenticação integrada está ativada.

Como por exemplo:

```sh
--auth-server-whitelist='*exemplo.com, *foobar.com, *baz'
```

então qualquer `url` terminando com `example.com`, `foobar.com`, `baz` será considerado para autenticação integrada. Sem `*` prefixo a URL tem que corresponder exatamente.

### --auth-negotiate-delegado-whitelist=`url`

Uma lista separada de címula de servidores para os quais a delegação de credenciais de usuário é necessária. Sem `*` prefixo a URL tem que corresponder exatamente.

### --desativar-ntlm-v2

Desativa NTLM v2 para plataformas posix, sem efeito em outros lugares.

### --desativar-http-cache

Desabilita o cache de disco para as requisições HTTP.

### --desativar-http2

Desativar protocolos HTTP/2 e SPDY/3.1.

### --desativar-renderizar-fundo

Impede o Chromium de diminuir a prioridade dos processos de renderização de páginas invisíveis .

Esta bandeira é global para todos os processos renderizadores, se você só quiser desativar estrangulamento em uma janela, você pode pegar o hack de [reproduzindo áudio silencioso][play-silent-audio].

### --tamanho de cache de disco=`size`

Força o máximo de espaço em disco a ser usado pelo cache de disco, em bytes.

### --habilitar-api-filtragem-registro

Permite o registro de pilha de chamadas para as seguintes APIs (eventos de filtragem):

- `desktopCapturer.getSources()` / `desktop-capturer-get-sources`
- `remote.require()` / `remote-require`
- `remote.getGlobal()` / `remote-get-builtin`
- `remote.getBuiltin()` / `remote-get-global`
- `remote.getCurrentWindow()` / `remote-get-current-window`
- `remote.getCurrentWebContents()` / `remote-get-current-web-contents`

### --ativar-registro

Imprime o login do Chromium no console.

Este switch não pode ser usado em `app.commandLine.appendSwitch` uma vez que é analisado antes do aplicativo do usuário é carregado, mas você pode definir a variável ambiente `ELECTRON_ENABLE_LOGGING` para alcançar o mesmo efeito.

## --force-fieldtrials=`trials`

Field trials to be forcefully enabled or disabled.

For example: `WebRTC-Audio-Red-For-Opus/Enabled/`

### --regras de host=`rules`

A comma-separated list of `rules` that control how hostnames are mapped.

Como por exemplo:

* `MAP * 127.0.0.1` Força todos os nomes de host a serem mapeados para 127.0.0.1
* forças `MAP *.google.com proxy` todos os subdomínios google.com a serem resolvidos para "proxy".
* `MAP test.com [::1]:77` Forças "test.com" para resolver o loopback IPv6. Será também forçará a porta do endereço de soquete resultante a ser 77.
* `MAP * baz, EXCLUDE www.google.com` remaps tudo para "baz", exceto para "www.google.com".

These mappings apply to the endpoint host in a net request (the TCP connect and host resolver in a direct connection, and the `CONNECT` in an HTTP proxy connection, and the endpoint host in a `SOCKS` proxy connection).

### --host-resolver-rules=`rules`

Like `--host-rules` but these `rules` only apply to the host resolver.

### --ignorar erros de certificado

Ignores certificate related errors.

### --ignorar-conexões-limite=`domains`

Ignora o limite de conexão por `domains` lista separada por `,`.

### --js-flags=`flags`

Specifies the flags passed to the Node.js engine. It has to be passed when starting Electron if you want to enable the `flags` in the main process.

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" seu-app
```

See the [Node.js documentation][node-cli] or run `node --help` in your terminal for a list of available flags. Additionally, run `node --v8-options` to see a list of flags that specifically refer to Node.js's V8 JavaScript engine.

### --lang

Definir uma localidade customizada.

### -log-net-log=`path`

Enables net log events to be saved and writes them to `path`.

### --não-proxy-servidor

Don't use a proxy server and always make direct connections. Overrides any other proxy server flags that are passed.

### --sem caixa de areia

Disables Chromium sandbox, which is now enabled by default. Should only be used for testing.

### -proxy-lista de bypass=`hosts`

Instructs Electron to bypass the proxy server for the given semi-colon-separated list of hosts. This flag has an effect only if used in tandem with `--proxy-server`.

Como por exemplo:

```javascript
const { app } = require ('electron')
app.commandLine.appendSwitch('lista de bypass proxy', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Will use the proxy server for all hosts except for local addresses (`localhost`, `127.0.0.1` etc.), `google.com` subdomains, hosts that contain the suffix `foo.com` and anything at `1.2.3.4:5678`.

### -proxy-pac-url=`url`

Uses the PAC script at the specified `url`.

### -proxy-server=`address:port`

Use a specified proxy server, which overrides the system setting. This switch only affects requests with HTTP protocol, including HTTPS and WebSocket requests. It is also noteworthy that not all proxy servers support HTTPS and WebSocket requests. The proxy URL does not support username and password authentication [per Chromium issue](https://bugs.chromium.org/p/chromium/issues/detail?id=615947).

### --porta de depuração remota=`port`

Habilita depuração remota sobre o HTTP na `port` especificada.

### --v=`log_level`

Gives the default maximal active V-logging level; 0 is the default. Normally positive values are used for V-logging levels.

This switch only works when `--enable-logging` is also passed.

### --vmodule=`pattern`

Gives the per-module maximal V-logging levels to override the value given by `--v`. Ex. `my_module=2,foo*=3` would change the logging level for all code in source files `my_module.*` and `foo*.*`.

Any pattern containing a forward or backward slash will be tested against the whole pathname and not only the module. Ex. `*/foo/bar/*=2` would change the logging level for all code in the source files under a `foo/bar` directory.

This switch only works when `--enable-logging` is also passed.

### force_high_performance_gpu

Force using discrete GPU when there are multiple GPUs available.

### -force_low_power_gpu

Force using integrated GPU when there are multiple GPUs available.

## Node.js Flags

Electron supports some of the [CLI flags][node-cli] supported by Node.js.

**Note:** Passing unsupported command line switches to Electron when it is not running in `ELECTRON_RUN_AS_NODE` will have no effect.

### --inspecionar-brk[=[host:]porta]

Activate inspector on host:port and break at start of user script. Default host:port is 127.0.0.1:9229.

Aliased to `--debug-brk=[host:]port`.

### -inspecionar porta=[host:]porta

Set the `host:port` to be used when the inspector is activated. Useful when activating the inspector by sending the SIGUSR1 signal. Default host is `127.0.0.1`.

Aliased to `--debug-port=[host:]port`.

### --inspecionar[=[host:]porta]

Activate inspector on `host:port`. Default is `127.0.0.1:9229`.

V8 inspector integration allows tools such as Chrome DevTools and IDEs to debug and profile Electron instances. The tools attach to Electron instances via a TCP port and communicate using the [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/).

See the [Debugging the Main Process][debugging-main-process] guide for more details.

Aliased to `--debug[=[host:]port`.

### --inspecionar-publicar-uid=stderr,http

Specify ways of the inspector web socket url exposure.

By default inspector websocket url is available in stderr and under /json/list endpoint on http://host:port/json/list.

[app]: app.md

[app]: app.md
[append-switch]: command-line.md#commandlineappendswitchswitch-value
[ready]: app.md#event-ready
[play-silent-audio]: https://github.com/atom/atom/pull/9485/files
[debugging-main-process]: ../tutorial/debugging-main-process.md
[node-cli]: https://nodejs.org/api/cli.html
[node-cli]: https://nodejs.org/api/cli.html
