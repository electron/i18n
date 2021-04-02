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

### --regras de host=`rules`

Uma lista separada de címulas de `rules` que controlam como os nomes dos host são mapeados.

Como por exemplo:

* `MAP * 127.0.0.1` Força todos os nomes de host a serem mapeados para 127.0.0.1
* forças `MAP *.google.com proxy` todos os subdomínios google.com a serem resolvidos para "proxy".
* `MAP test.com [::1]:77` Forças "test.com" para resolver o loopback IPv6. Será também forçará a porta do endereço de soquete resultante a ser 77.
* `MAP * baz, EXCLUDE www.google.com` remaps tudo para "baz", exceto para "www.google.com".

Esses mapeamentos se aplicam ao host de ponto final em uma solicitação de rede (o TCP conecta e o host resolver em uma conexão direta, e o `CONNECT` em uma conexão proxy HTTP e o host de ponto final em uma conexão proxy `SOCKS` ).

### --host-resolver-rules=`rules`

Como `--host-rules` mas estes `rules` só se aplicam ao resolver host.

### --ignorar erros de certificado

Ignora erros relacionados ao certificado.

### --ignorar-conexões-limite=`domains`

Ignora o limite de conexão por `domains` lista separada por `,`.

### --js-flags=`flags`

Especifica as bandeiras passadas para o mecanismo .js Nó. Ele tem que ser passado ao iniciar Electron se você quiser habilitar o `flags` no processo principal.

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" seu-app
```

Consulte a documentação [.js node.js][node-cli] ou execute `node --help` em seu terminal para obter uma lista de bandeiras disponíveis. Além disso, execute `node --v8-options` para ver uma lista de bandeiras que se referem especificamente ao motor V8 JavaScript do Node.js.

### --lang

Definir uma localidade customizada.

### -log-net-log=`path`

Permite que os eventos de log líquido sejam salvos e os grava para `path`.

### --não-proxy-servidor

Não use um servidor proxy e sempre faça conexões diretas. Substitui quaisquer outras bandeiras de servidor proxy que forem aprovadas.

### --sem caixa de areia

Desativa a caixa de areia Chromium, que agora está habilitada por padrão. Só deve ser usado para testes.

### -proxy-lista de bypass=`hosts`

Instrui a Electron a contornar o servidor proxy para a lista de hosts separados por cólons. Esta bandeira só tem um efeito se usada em conjunto com `--proxy-server`.

Como por exemplo:

```javascript
const { app } = require ('electron')
app.commandLine.appendSwitch('lista de bypass proxy', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Usará o servidor proxy para todos os hosts, exceto para endereços locais (`localhost`, `127.0.0.1` etc.), `google.com` subdomínios, hosts que contêm o sufixo `foo.com` e qualquer coisa em `1.2.3.4:5678`.

### -proxy-pac-url=`url`

Usa o script PAC no `url`especificado .

### -proxy-server=`address:port`

Use um servidor proxy especificado, que substitui a configuração do sistema. Este switch afeta apenas solicitações com protocolo HTTP, incluindo solicitações de HTTPS e WebSocket. Também vale ressaltar que nem todos os servidores proxy suportam solicitações HTTPS e WebSocket. A URL proxy não suporta nome de usuário e autenticação de de senha [por problema do Chromium](https://bugs.chromium.org/p/chromium/issues/detail?id=615947).

### --porta de depuração remota=`port`

Habilita depuração remota sobre o HTTP na `port` especificada.

### --v=`log_level`

Dá o nível de registro V ativo padrão; 0 é o padrão. Normalmente valores positivos são usados para níveis de registro em V.

Este interruptor só funciona quando `--enable-logging` também é passado.

### --vmodule=`pattern`

Dá aos níveis máximos de registro V por módulo para substituir o valor dado pelo `--v`. Ex. `my_module=2,foo*=3` alteraria o nível de registro de todos os códigos em arquivos de origem `my_module.*` e `foo*.*`.

Qualquer padrão contendo uma barra para frente ou para trás será testado contra o nome de caminho inteiro e não apenas o módulo. Ex. `*/foo/bar/*=2` alteraria o nível de registro de para todos os códigos nos arquivos de origem sob um diretório `foo/bar` .

Este interruptor só funciona quando `--enable-logging` também é passado.

### force_high_performance_gpu

Force usando GPU discreta quando houver várias GPUs disponíveis.

### -force_low_power_gpu

Force usando GPU integrada quando houver várias GPUs disponíveis.

## Bandeiras .js nó

A Electron suporta algumas das bandeiras [CLI][node-cli] suportadas pelo Node.js.

**Nota:** Passar comutações de linha de comando sem suporte para Electron quando não estiver sendo executado em `ELECTRON_RUN_AS_NODE` não terá efeito.

### --inspecionar-brk[=[host:]porta]

Ativar inspetor no host:porta e quebra no início do script do usuário. Host padrão:porta é 127.0.0.1:9229.

Codinomes a `--debug-brk=[host:]port`.

### -inspecionar porta=[host:]porta

Defina o `host:port` a ser usado quando o inspetor for ativado. Útil ao ativar o inspetor enviando o sinal SIGUSR1. O host padrão está `127.0.0.1`.

Codinomes a `--debug-port=[host:]port`.

### --inspecionar[=[host:]porta]

Ativar inspetor em `host:port`. O padrão é `127.0.0.1:9229`.

A integração do inspetor V8 permite que ferramentas como Chrome DevTools e IDEs depurem e perfilem instâncias eletrônicas. As ferramentas se conectam às instâncias eletrônicas através de uma porta TCP e se comunicam usando o protocolo [Chrome DevTools](https://chromedevtools.github.io/devtools-protocol/).

Consulte o guia [Depurando o processo principal][debugging-main-process] para mais detalhes.

Codinomes a `--debug[=[host:]port`.

### --inspecionar-publicar-uid=stderr,http

Especifique as formas de exposição da url do soquete web do inspetor.

Por url websocket do inspetor padrão está disponível em stderr e em /json/list endpoint em http://host:port/json/list.

[app]: app.md

[app]: app.md
[append-switch]: command-line.md#commandlineappendswitchswitch-value
[ready]: app.md#event-ready
[play-silent-audio]: https://github.com/atom/atom/pull/9485/files
[debugging-main-process]: ../tutorial/debugging-main-process.md
[node-cli]: https://nodejs.org/api/cli.html
[node-cli]: https://nodejs.org/api/cli.html
