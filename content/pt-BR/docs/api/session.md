# session

> Gerencie sessões de navegador, cookies, cache, configurações de proxy, etc.

Processo: [Main](../glossary.md#main-process)

O módulo `session` pode ser usado para criar novos objetos `Session` .

Você também pode acessar a `session` das páginas existentes usando a propriedade `session` de [`WebContents`](web-contents.md)ou do módulo `session` .

```javascript
const { BrowserWindow } = require ('electron')

const win = novo BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```

## Métodos

O módulo `session` tem os seguintes métodos:

### `session.fromPartition(partition[, options])`

* `partition` Cordas
* objeto `options` (opcional)
  * `cache` Booleano - Quer ativar o cache.

Retornos `Session` - Uma instância de sessão de `partition` string. Quando houver uma `Session` existente com o mesmo `partition`, ela será devolvida; caso contrário, uma nova instância de `Session` será criada com `options`.

Se `partition` começar com `persist:`, a página usará uma sessão persistente disponível para todas as páginas do aplicativo com o mesmo `partition`. se não houver `persist:` prefixo, a página usará uma sessão na memória. Se o `partition` estiver vazio, a sessão padrão do aplicativo será devolvida.

Para criar um `Session` com `options`, você tem que garantir que o `Session` com o `partition` nunca tenha sido usado antes. Não há como mudar a `options` de um objeto `Session` existente.

## Propriedades

O módulo `session` tem as seguintes propriedades:

### `session.defaultsession`

Um objeto `Session` , o objeto de sessão padrão do aplicativo.

## Class: Session

> Obtenha e defina propriedades de uma sessão.

Processo: [Main](../glossary.md#main-process)

Você pode criar um objeto `Session` no módulo `session` :

```javascript
const { session } = require ('electron')
const ses = session.fromPartition ('persist:name')
console .log(ses.getUserAgent())
```

### Eventos de instância

Os seguintes eventos estão disponíveis em instâncias de `Session`:

#### Evento: 'vai baixar'

Retorna:

* `event` Event
* `item` [DownloadItem](download-item.md)
* `webContents` [WebContents](web-contents.md)

Emitido quando a Electron está prestes a baixar `item` em `webContents`.

Ligando para `event.preventDefault()` cancelará o download e `item` não estará disponível a partir do próximo tique do processo.

```javascript
const { session } = require ('electron')
session.defaultSession.on ('will-download', (evento, item, webContents) => {
  event.preventDefault()
  requer ('request')(item.getURL(), (dados) => {
    requerem ('fs').writeFileSync('/somewhere', dados)
  })
})  })
```

#### Evento: 'extensão carregada'

Retorna:

* `event` Event
* </a>de extensão `extension`</li> </ul> 
  
  Emitido após uma extensão é carregado. Isso ocorre sempre que uma extensão é adicionada ao conjunto de extensões "habilitadas". Isso inclui:
  
  - Extensões sendo carregadas de `Session.loadExtension`.
- Extensões sendo recarregadas: 
    * de um acidente.
  * se a prorrogação solicitou ([`chrome.runtime.reload()`](https://developer.chrome.com/extensions/runtime#method-reload)).



#### Evento: 'extensão descarregada'

Retorna:

* `event` Event
* </a>de extensão `extension` </li> </ul> 
  
  Emitido após uma extensão ser descarregada. Isso ocorre quando `Session.removeExtension` é chamada.
  
  

#### Evento: 'pronto para extensão'

Retorna:

* `event` Event
* </a>de extensão `extension` </li> </ul> 
  
  Emitido após uma extensão ser carregada e todo o estado necessário do navegador é inicializado para suportar o início da página de fundo da extensão.
  
  

#### Evento: 'pré-conexão'

Retorna:

* `event` Event
* `preconnectUrl` String - A URL que está sendo solicitada para pré-conexão pelo renderizador .

* `allowCredentials` Booleano - É verdade que o renderizador esteja solicitando que a conexão inclua credenciais (veja a especificação [](https://w3c.github.io/resource-hints/#preconnect) para obter mais detalhes.)

Emitido quando um processo de renderização solicita a pré-conexão a uma URL, geralmente devido a uma dica de recurso [](https://w3c.github.io/resource-hints/).



#### Evento: 'spellcheck-dictionary-initialized'

Retorna:

* `event` Event
* `languageCode` String - O código de idioma do arquivo do dicionário

Emitido quando um arquivo de dicionário hunspell foi inicializado com sucesso. Esta ocorre depois que o arquivo foi baixado.



#### Evento: 'spellcheck-dictionary-download-begin'

Retorna:

* `event` Event
* `languageCode` String - O código de idioma do arquivo do dicionário

Emitido quando um arquivo dicionário hunspell começa a baixar



#### Evento: 'spellcheck-dictionary-download-success'

Retorna:

* `event` Event
* `languageCode` String - O código de idioma do arquivo do dicionário

Emitido quando um arquivo dicionário hunspell foi baixado com sucesso



#### Evento: 'spellcheck-dictionary-download-failure'

Retorna:

* `event` Event
* `languageCode` String - O código de idioma do arquivo do dicionário

Emitido quando um download de arquivo de dicionário hunspell falha.  Para obter detalhes sobre a falha, você deve coletar um netlog e inspecionar a solicitação de de download.



#### Evento: 'select-serial-port' _Experimental_

Retorna:

* `event` Event
* `portList` [SerialPort[]](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)
* `callback` Function 
    * `portId` Cordas

Emitido quando uma porta serial precisa ser selecionada quando uma chamada para `navigator.serial.requestPort` é feita. `callback` deve ser chamado com `portId` a serem selecionados, passando uma sequência vazia para `callback` cancelará a solicitação.  Além disso, a permissão em `navigator.serial` pode ser gerenciada usando [ses.setPermissionCheckHandler (manipulador)](#sessetpermissioncheckhandlerhandler) com a permissão `serial` .

Porque este é um recurso experimental, ele é desativado por padrão.  Para habilitar esse recurso, você precisará usar o switch de linha de comando `--enable-features=ElectronSerialChooser` .  Além disso, porque este é um recurso experimental do Chromium, você precisará definir `enableBlinkFeatures: 'Serial'` na propriedade `webPreferences` ao abrir uma Janela de Navegador.



```javascript
const { app, BrowserWindow } = require ('electron')

deixar ganhar = nulo
app.commandLine.appendSwitch ('recursos de habilitação', 'ElectronSerialChooser')

app.whenReady().then(()=> {
  win = novo BrowserWindow({
    largura: 800,
    altura: 600,
    webPreferências: {
      enableBlinkFeatures: 'Serial'
    }
  })
  win.webContents.session.on('select-serial-port', (evento, portList, callback) => {
    event.preventDefault()
    const selectedPort = portList.find((device) => {
      dispositivo de retorno.vendorId === 0x2341 && dispositivo.productId === 0x0043
    })
    se (!selectedPort) {
      callback('')
    } else {
      callback (result1.portId)
    }
  })
})
```




#### Evento: 'serial-port-added' __experimental

Retorna:

* `event` Event
* `port` [](structures/serial-port.md)SerialPort
* `webContents` [WebContents](web-contents.md)

Emitido após `navigator.serial.requestPort` foi chamado e `select-serial-port` foi demitido se uma nova porta serial estiver disponível.  Por exemplo, este evento será acionado quando um novo dispositivo USB estiver conectado.



#### Evento: 'serial-port-removed' __Experimental

Retorna:

* `event` Event
* `port` [](structures/serial-port.md)SerialPort
* `webContents` [WebContents](web-contents.md)

Emitido após `navigator.serial.requestPort` foi chamado e `select-serial-port` foi demitido se uma porta serial foi removida.  Por exemplo, este evento será acionado quando um dispositivo USB é desligado.



### Métodos de Instância

Os seguintes métodos estão disponíveis em instâncias de `Session`:



#### `ses.getCacheSize()`

Retorna `Promise<Integer>` - o tamanho atual do cache da sessão, em bytes.



#### `ses.clearCache()`

Devolução `Promise<void>` - resolve quando a operação de cache está concluída.

Limpa o cache HTTP da sessão.



#### `ses.clearStorageData([options])`

* objeto `options` (opcional) 
    * `origin` String (opcional) - Deve seguir `scheme://host:port`de representação da `window.location.origin`.
  * `storages` String[] (opcional) - Os tipos de armazenamentos a serem limpos, podem conter: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`. Se não especificado, limpe todos os tipos de armazenamento.
  * `quotas` String[] (opcional) - Os tipos de cotas a serem desocentas, podem conter: `temporary`, `persistent`, `syncable`. Se não for especificado, limpe todas as cotas.

Devoluções `Promise<void>` - resolve quando os dados de armazenamento foram limpos.



#### `ses.flushStorageData()`

Grava dados do DOMStorage não escritos em disco.



#### `ses.setProxy(config)`

* objeto `config`
  
    * `mode` String (opcional) - O modo proxy. Deve ser um dos `direct`, `auto_detect`, `pac_script`, `fixed_servers` ou `system`. Se não for especificado, ele será automaticamente determinado com base em outras opções especificadas.
    
        * `direct` No modo direto, todas as conexões são criadas diretamente, sem qualquer proxy envolvido.

    * `auto_detect` No modo auto_detect, a configuração proxy é determinada por um script PAC que pode ser baixado em http://wpad/wpad.dat.

    * `pac_script` No modo pac_script, a configuração proxy é determinada por um script PAC que é recuperado da URL especificada no `pacScript`. Este é o modo padrão se `pacScript` for especificado.

    * `fixed_servers` No modo fixed_servers, a configuração proxy é especificada em `proxyRules`. Este é o modo padrão se `proxyRules` for especificado.

    * `system` No modo de sistema, a configuração proxy é retirada do sistema operacional. Observe que o modo do sistema é diferente de configurar nenhuma configuração proxy. Neste último caso, a Electron recua para as configurações do sistema apenas se nenhuma opção de linha de comando influenciar a configuração proxy.

  * `pacScript` String (opcional) - A URL associada ao arquivo PAC.

  * `proxyRules` String (opcional) - Regras que indiquem quais proxies usar.
  * `proxyBypassRules` String (opcional) - Regras que indiquem quais URLs devem contornar as configurações de proxy.

Devoluções `Promise<void>` - Resolve quando o processo de configuração de proxy estiver concluído.

Define as configurações de proxy.

Quando `mode` não é especificado, `pacScript` e `proxyRules` são fornecidos em conjunto, a opção `proxyRules` é ignorada e `pacScript` configuração é aplicada.

Você pode precisar `ses.closeAllConnections` para fechar atualmente em conexões de voo para evitar que tomadas agrupadas usando proxy anterior sejam reutilizadas por solicitações futuras.

O `proxyRules` tem que seguir as regras abaixo:



```sh
proxyRules = schemeProxies[";"<schemeProxies>]
schemeProxies = [<urlScheme>"="]<proxyURIList>
urlScheme = "http" | "https" | "ftp" | "meias"
proxyURIList = <proxyURL>[","<proxyURIList>]
proxyURL = [<proxyScheme>"://"]<proxyHost>[":"<proxyPort>]
```


Como por exemplo:

* `http=foopy:80;ftp=foopy2` - Use `foopy:80` proxy HTTP para URLs `http://` e `foopy2:80` proxy HTTP para URLs `ftp://` .

* `foopy:80` - Use `foopy:80` proxy HTTP para todas as URLs.

* `foopy:80,bar,direct://` - Use `foopy:80` proxy HTTP para todas as URLs, não para `bar` se `foopy:80` estiver indisponível e depois disso não usando nenhum proxy.

* `socks4://foopy` - Use `foopy:1080` proxy SOCKS v4 para todas as URLs.

* `http=foopy,socks5://bar.com` - Use `foopy` proxy HTTP para URLs http e não para o `bar.com` proxy SOCKS5 se `foopy` não estiver disponível.

* `http=foopy,direct://` - Use `foopy` proxy HTTP para URLs http e não use nenhum proxy se `foopy` estiver indisponível.

* `http=foopy;socks=foopy2` - Use `foopy` proxy HTTP para URLs http e use `socks4://foopy2` para todos os outros URLs.

O `proxyBypassRules` é uma lista separada de címulas de regras descritas abaixo:

* `[ URL_SCHEME "://" ] HOSTNAME_PATTERN <port>`
  
  Combine todos os nomes de host que correspondem ao padrão HOSTNAME_PATTERN.
  
  Exemplos: "foobar.com", "*foobar.com", "*.foobar.com", "*foobar.com:99", "https://x.*.y.com:99"

* `"." HOSTNAME_SUFFIX_PATTERN [ ":" PORT ]`
  
  Combine um sufixo de domínio específico.
  
  Exemplos: ".google.com", ".com", "http://.google.com"

* `[ ESQUEMA "://" ] IP_LITERAL [ ":" PORT ]`
  
  Combine URLs que são literais de endereço IP.
  
  Exemplos: "127.0.1", "[0:0:1]", "[::1]", "http://[:1]:99"

* `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS`
  
  Combine qualquer URL que seja de um IP literal que cai entre o alcance dado. A gama IP é especificada usando notação CIDR.
  
  Exemplos: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`
  
  Combine endereços locais. O significado de `<local>` é se o hospedar corresponde a um dos: "127.0.0.1", "::1", "localhost".



#### `ses.resolveProxy(url)`

* `url` URL

Devoluções `Promise<String>` - Resolve com as informações de proxy para `url`.



#### `ses.forceReloadProxyConfig()`

Devoluções `Promise<void>` - Resolve quando todos os estados internos do serviço proxy são redefinidos e a configuração proxy mais recente é reaplicada se já estiver disponível. O script pac será obtido de `pacScript` novamente se o modo proxy estiver `pac_script`.



#### `ses.setDownloadPath (caminho)`

* `path` String - O local de download.

Define diretório de salvamento de download. Por padrão, o diretório de download será o `Downloads` sob a respectiva pasta de aplicativo.



#### `ses.enableNetworkEmulation(options)`

* objeto `options` 
    * `offline` Boolean (opcional) - Se deve emular a paralisação da rede. Os padrões falsos.
  * `latency` Double (opcional) - RTT em ms. Padrão para 0 que desativará estrangulamento de latência.
  * `downloadThroughput` Double (opcional) - Taxa de download em Bps. Padrão para 0 que desativará o estrangulamento de download.
  * `uploadThroughput` Double (opcional) - Taxa de upload em Bps. Padrão para 0 que desativará o estrangulamento de upload.

Emula rede com a configuração dada para o `session`.



```javascript
Para emular uma conexão GPRS com rendimento de 50kbps e latência de 500 ms.
window.webContents.session.enableNetworkEmulation ({
  latency: 500,
  downloadThroughput: 6400,
  uploadThroughput: 6400
})

// Para emular uma paralisação de rede.
window.webContents.session.enableNetworkEmulation ({ offline: true })
```




#### `ses.preconnect(options)`

* objeto `options` 
    * `url` String - URL para pré-conexão. Apenas a origem é relevante para a abertura do soquete.
  * `numSockets` Número (opcional) - número de soquetes para pré-conexão. Deve ter entre 1 e 6 anos. Padrão para 1.

Preconecta o número dado de soquetes a uma origem.



#### `ses.closeAllConnections()`

Devoluções `Promise<void>` - Resolve quando todas as conexões são fechadas.

**Nota:** Ele vai encerrar / falhar todas as solicitações atualmente em voo.



#### `ses.desabilitar a Redeemulação()`

Desativa qualquer emulação de rede já ativa para o `session`. Resets para a configuração de rede original.



#### `ses.setCertificateVerifyProc(proc)`

* | de função `proc` Null 
    * objeto `request` 
        * `hostname` Cordas
    * `certificate` [Certificate](structures/certificate.md)
    * </a>de Certificado `validatedCertificate` </li> 
      
          * `verificationResult` String - Resultado de verificação de cromo.
    * `errorCode` Integer - Código de erro.</ul></li> 

  * `callback` Function 
        * `verificationResult` Inteiro - O valor pode ser um dos códigos de erro de certificado de [aqui](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h). Além dos códigos de erro do certificado, podem ser usados os seguintes códigos especiais. 
            * `0` - Indica o sucesso e desativa a verificação da Transparência do Certificado.
      * `-2` - Indica falha.
      * `-3` - Utiliza o resultado da verificação do cromo.</ul></li> </ul> 

Define o certificado de verificação proc para `session`, o `proc` será chamado com `proc(request, callback)` sempre que um certificado de servidor verificação for solicitado. Chamando `callback(0)` aceita o certificado, chamando `callback(-2)` rejeita.

A chamada `setCertificateVerifyProc(null)` voltará ao certificado padrão verificar proc.



```javascript
const { BrowserWindow } = require ('electron')
const win = novo BrowserWindow()

win.webContents.session.setCertificateVerifyProc((solicitação, retorno de chamada) => {
  const { hostname } = solicitação
  se (hostname === 'github.com') {
    callback(0)
  } else {
    callback(-2)
  }
})
```




> **NOTA:** O resultado deste procedimento é armazenado em cache pelo serviço de rede.



#### `ses.setPermissionRequestHandler(manipulador)`

* | de função `handler` Null
  
    * `webContents` [WebContents](web-contents.md) - WebContents solicitando a permissão.  Por favor, note que se a solicitação vem de um subquadro, você deve usar `requestingUrl` para verificar a origem da solicitação.
  * `permission` String - O tipo de permissão solicitada. 
        * `clipboard-read` - Solicitar acesso à leitura da área de transferência.
    * `media` - Solicite acesso a dispositivos de mídia como câmera, microfone e alto-falantes.
    * `display-capture` - Solicite acesso para capturar a tela.
    * `mediaKeySystem` - Solicitar acesso ao conteúdo protegido pelo DRM.
    * `geolocation` - Solicitar acesso à localização atual do usuário.
    * `notifications` - Solicitar a criação de notificação e a capacidade de exibi-las na bandeja do sistema do usuário.
    * `midi` - Solicitar acesso MIDI na API `webmidi` .
    * `midiSysex` - Solicitar o uso de mensagens exclusivas do sistema na API `webmidi` .
    * `pointerLock` - Solicitar interpretar diretamente os movimentos do mouse como um método de entrada. Clique [aqui](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API) para saber mais.
    * `fullscreen` - Solicite que o aplicativo entre no modo fullscreen.
    * `openExternal` - Solicitar a abertura de links em aplicações externas.
  * `callback` Function 
        * `permissionGranted` Booleano - Permitir ou negar a permissão.
  * `details` Objeto - Algumas propriedades só estão disponíveis em determinados tipos de permissão.
    
        * `externalURL` String (opcional) - A url da solicitação `openExternal` .
    * `mediaTypes` String[] (opcional) - Os tipos de acesso à mídia que estão sendo solicitados, os elementos podem ser `video` ou `audio`

    * `requestingUrl` String - A última URL do quadro solicitando carregado

    * `isMainFrame` Booleano - Se o quadro que faz a solicitação é o quadro principal

Define o manipulador que pode ser usado para responder a solicitações de permissão para o `session`. Ligar `callback(true)` permitirá a permissão e `callback(false)` a rejeitará. Para limpar o manipulador, ligue para `setPermissionRequestHandler(null)`.



```javascript
const { session } = require ('electron')
session.fromPartition ('some-partition').setPermissionRequestHandler((webContents, permissão, retorno) => {
  se (webContents.getURL() === permissão de && de 'algum host' === 'notificações') {
    retorno callback(falso) // negado.
  }

  callback (true)
})
```




#### `ses.setPermissionCheckHandler (manipulador)`

* função `handler` \<Boolean> | nulo
  
    * `webContents` [WebContents](web-contents.md) - WebContents verificando a permissão.  Por favor, note que se a solicitação vem de um subquadro, você deve usar `requestingUrl` para verificar a origem da solicitação.
  * `permission` String - Tipo de verificação de permissão.  Os valores válidos são `midiSysex`, `notifications`, `geolocation`, `media`,`mediaKeySystem`,`midi`, `pointerLock`, `fullscreen`, `openExternal`, ou `serial`.
  * `requestingOrigin` String - A URL de origem da verificação de permissões
  * `details` Objeto - Algumas propriedades só estão disponíveis em determinados tipos de permissão.
    
        * `securityOrigin` String - A origem da segurança da verificação `media` .
    * `mediaType` String - O tipo de acesso à mídia que está sendo solicitado, pode ser `video`, `audio` ou `unknown`

    * `requestingUrl` String - A última URL do quadro solicitando carregado

    * `isMainFrame` Booleano - Se o quadro que faz a solicitação é o quadro principal

Define o manipulador que pode ser usado para responder a verificações de permissão para o `session`. O retorno `true` permitirá a permissão e `false` a rejeitará. Para limpar o manipulador, ligue para `setPermissionCheckHandler(null)`.



```javascript
const { session } = require ('electron')
session.fromPartition ('some-partition').setPermissionCheckHandler((webContents, permissão) => {
  se (webContents.getURL() === permissão de && de 'algum host' === 'notificações') {
    devolver falso // negado
  }

  devolver true
})
```




#### `ses.clearHostResolverCache()`

Devolução `Promise<void>` - Resolve quando a operação estiver concluída.

Limpa o cache de resolver do host.



#### `ses.allowNTLMCredentialsForDomains(domínios)`

* `domains` String - Uma lista separada de címulas de servidores para os quais autenticação integrada está habilitada.

Define dinamicamente se enviar sempre credenciais para HTTP NTLM ou negociar autenticação.



```javascript
const { session } = requer ('elétron')
// considere qualquer url terminando com 'example.com', 'foobar.com', 'baz'
// para autenticação integrada.
session.defaultSession.allowNTLMCredentialsForDomains('*exemplo.com, *foobar.com, *baz')

// considere todas as urls para autenticação integrada.
session.defaultSession.allowNTLMCredentialsForDomains('*')
```




#### `ses.setUserAgent (userAgent[, acceptLanguages])`

* `userAgent` Cordas
* `acceptLanguages` String (opcional)

Substitui o `userAgent` e `acceptLanguages` para esta sessão.

O `acceptLanguages` deve separar uma lista de códigos de idiomas separados, para exemplo `"en-US,fr,de,ko,zh-CN,ja"`.

Isso não afeta os `WebContents`existentes, e cada `WebContents` pode usar `webContents.setUserAgent` para substituir o agente de usuário em toda a sessão.



#### `ses.isPersistent()`

Retornos `Boolean` - Se esta sessão é ou não persistente. The default `webContents` session of a `BrowserWindow` is persistent. When creating a session from a partition, session prefixed with `persist:` will be persistent, while others will be temporary.



#### `ses.getUserAgent()`

Returns `String` - The user agent for this session.



#### `ses.setSSLConfig(config)`

* objeto `config` 
    * `minVersion` String (optional) - Can be `tls1`, `tls1.1`, `tls1.2` or `tls1.3`. The minimum SSL version to allow when connecting to remote servers. Defaults to `tls1`.
  * `maxVersion` String (optional) - Can be `tls1.2` or `tls1.3`. The maximum SSL version to allow when connecting to remote servers. Defaults to `tls1.3`.
  * `disabledCipherSuites` Integer[] (optional) - List of cipher suites which should be explicitly prevented from being used in addition to those disabled by the net built-in policy. Supported literal forms: 0xAABB, where AA is `cipher_suite[0]` and BB is `cipher_suite[1]`, as defined in RFC 2246, Section 7.4.1.2. Unrecognized but parsable cipher suites in this form will not return an error. Ex: To disable TLS_RSA_WITH_RC4_128_MD5, specify 0x0004, while to disable TLS_ECDH_ECDSA_WITH_RC4_128_SHA, specify 0xC002. Note that TLSv1.3 ciphers cannot be disabled using this mechanism.

Sets the SSL configuration for the session. All subsequent network requests will use the new configuration. Existing network connections (such as WebSocket connections) will not be terminated, but old sockets in the pool will not be reused for new connections.



#### `ses.getBlobData(identifier)`

* `identifier` String - Valid UUID.

Returns `Promise<Buffer>` - resolves with blob data.



#### `ses.downloadURL(url)`

* String `url`

Initiates a download of the resource at `url`. The API will generate a [DownloadItem](download-item.md) that can be accessed with the [will-download](#event-will-download) event.

**Note:** This does not perform any security checks that relate to a page's origin, unlike [`webContents.downloadURL`](web-contents.md#contentsdownloadurlurl).



#### `ses.createInterruptedDownload(options)`

* objeto `options` 
    * `path` String - Absolute path of the download.
  * `urlChain` String[] - Complete URL chain for the download.
  * `mimeType` String (optional)
  * `offset` Integer - Start range for the download.
  * `length` Integer - Total length of the download.
  * `lastModified` String (optional) - Last-Modified header value.
  * `eTag` String (optional) - ETag header value.
  * `startTime` Double (optional) - Time when download was started in number of seconds since UNIX epoch.

Allows resuming `cancelled` or `interrupted` downloads from previous `Session`. The API will generate a [DownloadItem](download-item.md) that can be accessed with the [will-download](#event-will-download) event. The [DownloadItem](download-item.md) will not have any `WebContents` associated with it and the initial state will be `interrupted`. The download will start only when the `resume` API is called on the [DownloadItem](download-item.md).



#### `ses.clearAuthCache()`

Returns `Promise<void>` - resolves when the session’s HTTP authentication cache has been cleared.



#### `ses.setPreloads(preloads)`

* `preloads` String[] - An array of absolute path to preload scripts

Adds scripts that will be executed on ALL web contents that are associated with this session just before normal `preload` scripts run.



#### `ses.getPreloads()`

Returns `String[]` an array of paths to preload scripts that have been registered.



#### `ses.setSpellCheckerEnabled(enable)`

* `enable` Booleano

Sets whether to enable the builtin spell checker.



#### `ses.isSpellCheckerEnabled()`

Returns `Boolean` - Whether the builtin spell checker is enabled.



#### `ses.setSpellCheckerLanguages(languages)`

* `languages` String[] - An array of language codes to enable the spellchecker for.

The built in spellchecker does not automatically detect what language a user is typing in.  In order for the spell checker to correctly check their words you must call this API with an array of language codes.  You can get the list of supported language codes with the `ses.availableSpellCheckerLanguages` property.

**Note:** On macOS the OS spellchecker is used and will detect your language automatically.  This API is a no-op on macOS.



#### `ses.getSpellCheckerLanguages()`

Returns `String[]` - An array of language codes the spellchecker is enabled for.  If this list is empty the spellchecker will fallback to using `en-US`.  By default on launch if this setting is an empty list Electron will try to populate this setting with the current OS locale.  This setting is persisted across restarts.

**Note:** On macOS the OS spellchecker is used and has its own list of languages.  This API is a no-op on macOS.



#### `ses.setSpellCheckerDictionaryDownloadURL(url)`

* `url` String - A base URL for Electron to download hunspell dictionaries from.

By default Electron will download hunspell dictionaries from the Chromium CDN.  If you want to override this behavior you can use this API to point the dictionary downloader at your own hosted version of the hunspell dictionaries.  We publish a `hunspell_dictionaries.zip` file with each release which contains the files you need to host here, the file server must be **case insensitive** you must upload each file twice, once with the case it has in the ZIP file and once with the filename as all lower case.

Se os arquivos presentes em `hunspell_dictionaries.zip` estiverem disponíveis em `https://example.com/dictionaries/language-code.bdic` então você deve chamar esta api com `ses.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')`.  Tome atenção à barra no final.  A URL para os dicionários é formada como `${url}${filename}`.

**Note:** On macOS the OS spellchecker is used and therefore we do not download any dictionary files.  This API is a no-op on macOS.



#### `ses.listWordsInSpellCheckerDictionary()`

Returns `Promise<String[]>` - An array of all words in app's custom dictionary. Resolves when the full dictionary is loaded from disk.



#### `ses.addWordToSpellCheckerDictionary(word)`

* `word` String - The word you want to add to the dictionary

Retorna `Boolean` - Se a palavra foi escrita com sucesso no dicionário personalizado. This API will not work on non-persistent (in-memory) sessions.

**Nota:** No macOS e Windows 10, esta palavra será escrita também no dicionário personalizado do sistema operacional



#### `ses.removeWordFromSpellCheckerDictionary(word)`

* `word` String - The word you want to remove from the dictionary

Returns `Boolean` - Whether the word was successfully removed from the custom dictionary. This API will not work on non-persistent (in-memory) sessions.

**Note:** On macOS and Windows 10 this word will be removed from the OS custom dictionary as well



#### `ses.loadExtension(path[, options])`

* `path` String - Path to a directory containing an unpacked Chrome extension
* objeto `options` (opcional) 
    * `allowFileAccess` Boolean - Whether to allow the extension to read local files over `file://` protocol and inject content scripts into `file://` pages. This is required e.g. for loading devtools extensions on `file://` URLs. Defaults to false.

Returns `Promise<Extension>` - resolves when the extension is loaded.

This method will raise an exception if the extension could not be loaded. If there are warnings when installing the extension (e.g. if the extension requests an API that Electron does not support) then they will be logged to the console.

Note that Electron does not support the full range of Chrome extensions APIs. See [Supported Extensions APIs](extensions.md#supported-extensions-apis) for more details on what is supported.

Note that in previous versions of Electron, extensions that were loaded would be remembered for future runs of the application. This is no longer the case: `loadExtension` must be called on every boot of your app if you want the extension to be loaded.



```js
const { app, session } = require('electron')
const path = require('path')

app.on('ready', async () => {
  await session.defaultSession.loadExtension(
    path.join(__dirname, 'react-devtools'),
    // allowFileAccess is required to load the devtools extension on file:// URLs.
    { allowFileAccess: true }
  )
  // Note that in order to use the React DevTools extension, you'll need to
  // download and unzip a copy of the extension.
})
```


This API does not support loading packed (.crx) extensions.

**Nota:** Esta API não pode ser chamada antes que o evento `ready` do módulo `app` seja emitido.

**Note:** Loading extensions into in-memory (non-persistent) sessions is not supported and will throw an error.



#### `ses.removeExtension(extensionId)`

* `extensionId` String - ID of extension to remove

Unloads an extension.

**Nota:** Esta API não pode ser chamada antes que o evento `ready` do módulo `app` seja emitido.



#### `ses.getExtension(extensionId)`

* `extensionId` String - ID of extension to query

Returns `Extension` | `null` - The loaded extension with the given ID.

**Nota:** Esta API não pode ser chamada antes que o evento `ready` do módulo `app` seja emitido.



#### `ses.getAllExtensions()`

Returns `Extension[]` - A list of all loaded extensions.

**Nota:** Esta API não pode ser chamada antes que o evento `ready` do módulo `app` seja emitido.



### Propriedades de Instância

As seguintes propriedades estão disponíveis em instâncias de `Session`:



#### `ses.availableSpellCheckerLanguages` _Readonly_

Uma matriz `String[]` que consiste em todas as linguagens de correção ortográfica disponíveis.  Providing a language code to the `setSpellCheckerLanguages` API that isn't in this array will result in an error.



#### `ses.spellCheckerEnabled`

A `Boolean` indicating whether builtin spell checker is enabled.



#### `ses.cookies` _Readonly_

Um objeto [`Cookies`](cookies.md) para esta sessão.



#### `ses.serviceWorkers` _Readonly_

A [`ServiceWorkers`](service-workers.md) object for this session.



#### `ses.webRequest` _Readonly_

Um objeto [`WebRequest`](web-request.md) para esta sessão.



#### `ses.protocol` _Readonly_

Um objeto [`Protocol`](protocol.md) para esta sessão.



```javascript
const { app, session } = require('electron')
const path = require('path')

app.whenReady().then(() => {
  const protocol = session.fromPartition('some-partition').protocol
  if (!protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({ path: path.normalize(`${__dirname}/${url}`) })
  })) {
    console.error('Failed to register protocol')
  }
})
```




#### `ses.netLog` _Readonly_

Um objeto [`NetLog`](net-log.md) para esta sessão.



```javascript
const { app, session } = require('electron')

app.whenReady().then(async () => {
  const netLog = session.fromPartition('some-partition').netLog
  netLog.startLogging('/path/to/net-log')
  // After some network events
  const path = await netLog.stopLogging()
  console.log('Net-logs written to', path)
})
```
