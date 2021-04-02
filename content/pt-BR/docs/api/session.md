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

Retornos `Boolean` - Se esta sessão é ou não persistente. A sessão de `webContents` padrão de um `BrowserWindow` é persistente. Ao criar uma sessão a partir de uma partição, a sessão prefixada com `persist:` será persistente, enquanto outras serão temporárias.



#### `ses.getUserAgent()`

Retornos `String` - O agente do usuário para esta sessão.



#### `ses.setSSLConfig(config)`

* objeto `config` 
    * `minVersion` String (opcional) - Pode ser `tls1`, `tls1.1`, `tls1.2` ou `tls1.3`. O versão SSL mínima para permitir a conexão com servidores remotos. Inadimplência para `tls1`.
  * `maxVersion` String (opcional) - Pode ser `tls1.2` ou `tls1.3`. A versão máxima do SSL permitir ao se conectar a servidores remotos. Inadimplência para `tls1.3`.
  * `disabledCipherSuites` Integer[] (opcional) - Lista de suítes cifradas que devem ser explicitamente impedidas de serem usadas, além daquelas desativadas pela política de entrada líquida. Formas literais suportadas: 0xAABB, onde o AA é `cipher_suite[0]` e bb é `cipher_suite[1]`, conforme definido na RFC 2246, Seção 7.4.1.2. Suítes cifras não reconhecidas, mas analisadas neste formulário, não retornarão um erro. Ex: Para desabilitar TLS_RSA_WITH_RC4_128_MD5, especifique 0x0004, enquanto desativar TLS_ECDH_ECDSA_WITH_RC4_128_SHA, especifique 0xC002. Observe que as cifras TLSv1.3 não podem ser desativadas usando este mecanismo.

Define a configuração SSL para a sessão. Todas as solicitações de rede subsequentes usarão a nova configuração. As conexões de rede existentes (como conexões WebSocket) não serão encerradas, mas as tomadas antigas na piscina não serão reutilizadas para novas conexões.



#### `ses.getBlobData (identificador)`

* `identifier` String - UUID válido.

Devolução `Promise<Buffer>` - resolve com dados de bolhas.



#### `ses.downloadURL(url)`

* String `url`

Inicia o download do recurso em `url`. A API vai gerar um</a> downloaditem que pode ser acessado com o [evento de](#event-will-download) de download.</p> 

**Nota:** Isso não realiza verificações de segurança relacionadas à origem de uma página, ao contrário [`webContents.downloadURL`](web-contents.md#contentsdownloadurlurl).



#### `ses.createInterruptedDownload(options)`

* objeto `options` 
    * `path` String - Caminho absoluto do download.
  * `urlChain` String[] - Cadeia completa de URL para o download.
  * `mimeType` String (opcional)
  * `offset` Integer - Faixa inicial para o download.
  * `length` Integer - Duração total do download.
  * `lastModified` String (opcional) - Valor do cabeçalho modificado pela última vez.
  * `eTag` String (opcional) - Valor do cabeçalho ETag.
  * `startTime` Double (opcional) - Tempo em que o download foi iniciado em número de segundos desde a época UNIX.

Permite retomar `cancelled` ou `interrupted` downloads de `Session`anteriores . A API vai gerar um</a> de DownloadItem [que pode ser acessado com o [o evento de](#event-will-download) . O](download-item.md) downloaditem [não terá nenhuma `WebContents` associada a ele e o estado inicial será `interrupted`. O download só começará quando a API `resume` for chamada no](download-item.md)downloaditem .</p> 



#### `ses.clearAuthCache()`

Devoluções `Promise<void>` - resolve quando o cache de autenticação HTTP da sessão foi limpo.



#### `ses.setPreloads(pré-cargas)`

* `preloads` String[] - Uma matriz de caminho absoluto para scripts de pré-carregamento

Adiciona scripts que serão executados em TODOS os conteúdos da Web que estão associados a esta sessão pouco antes do `preload` scripts normais serem executados.



#### `ses.getPreloads()`

Os retornos `String[]` uma série de caminhos para scripts pré-carregados que foram registrados.



#### `ses.setSpellCheckerEnabled (habilitação)`

* `enable` Booleano

Define se habilita o verificador ortomeiro construído.



#### `ses.isSpellCheckerEnabled()`

Devoluções `Boolean` - Se o verificador ortomeiro construído está ativado.



#### `ses.setSpellCheckerLanguages (idiomas)`

* `languages` String[] - Uma série de códigos de idioma para habilitar o verificador ortográfico para.

O verificador ortográfico incorporado não detecta automaticamente em que idioma um usuário está digitando.  Para que o verificador ortografo verifique corretamente suas palavras, você deve chamar esta API com uma variedade de códigos de idioma.  Você pode obter a lista de códigos de idioma suportados com a propriedade `ses.availableSpellCheckerLanguages` .

**Nota:** No macOS, o verificador ortográfico do SISTEMA OPERACIONAL é usado e detectará seu idioma automaticamente.  Esta API é um não-op no macOS.



#### `ses.getSpellCheckerLanguages()`

Devoluções `String[]` - Uma matriz de códigos de idioma para o que o verificador ortográfico está habilitado.  Se esta lista estiver vazia, o do spellchecker recuará ao usar `en-US`.  Por padrão no lançamento, se esta configuração for uma lista vazia, a Electron tentará preencher esta configuração com a localização atual do SISTEMA OPERACIONAL.  Esta configuração é persistindo em reinicializações.

**Nota:** No macOS o verificador ortográfico do SO é usado e tem sua própria lista de idiomas.  Esta API é um não-op no macOS.



#### `ses.setSpellCheckerDictionaryDownloadURL(url)`

* `url` String - Uma URL base para a Electron para baixar dicionários hunspell de.

Por padrão, a Electron baixará dicionários hunspell do CDN chromium.  Se você quiser substituir esse comportamento , você pode usar esta API para apontar o downloader de dicionário em sua própria versão hospedada dos dicionários hunspell .  Publicamos um arquivo `hunspell_dictionaries.zip` com cada versão que contém os arquivos que você precisa para hospedar aqui, o servidor de arquivos deve ser **caso insensível** você deve carregar cada arquivo duas vezes, uma vez com o caso que tem no arquivo ZIP e uma vez com o nome do arquivo como todos os casos inferiores.

Se os arquivos presentes em `hunspell_dictionaries.zip` estiverem disponíveis em `https://example.com/dictionaries/language-code.bdic` então você deve chamar esta api com `ses.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')`.  Tome atenção à barra no final.  A URL para os dicionários é formada como `${url}${filename}`.

**Nota:** No macOS o verificador ortográfico do SO é usado e, portanto, não baixamos nenhum arquivo de dicionário.  Esta API é um não-op no macOS.



#### `ses.listWordsInSpellCheckerDictionary()`

Devoluções `Promise<String[]>` - Uma série de todas as palavras no dicionário personalizado do aplicativo. Resolve quando o dicionário completo é carregado a partir do disco.



#### `ses.addWordToSpellCheckerDictionary(palavra)`

* `word` String - A palavra que você quer adicionar ao dicionário

Retorna `Boolean` - Se a palavra foi escrita com sucesso no dicionário personalizado. Esta API não funcionará em sessões não persistentes (na memória).

**Nota:** No macOS e Windows 10, esta palavra será escrita também no dicionário personalizado do sistema operacional



#### `ses.removeWordFromSpellCheckerDictionary(palavra)`

* `word` String - A palavra que você quer remover do dicionário

Devoluções `Boolean` - Se a palavra foi removida com sucesso do dicionário personalizado. Esta API não funcionará em sessões não persistentes (na memória).

**Nota:** No macOS e Windows 10 esta palavra também será removida do dicionário personalizado do SISTEMA OPERACIONAL



#### `ses.loadExtension(caminho[, opções])`

* `path` String - Caminho para um diretório contendo uma extensão chrome não embalada
* objeto `options` (opcional) 
    * `allowFileAccess` Boolean - Se permitir que a extensão leia arquivos locais sobre `file://` protocolo e injete scripts de conteúdo em páginas `file://` . Isto é necessário, por exemplo, para carregar extensões de devtools em URLs `file://` . Padrão para falso.

Devoluções `Promise<Extension>` - resolve quando a extensão é carregada.

Este método levantará uma exceção se a extensão não puder ser carregada. Se houver avisos ao instalar a extensão (por exemplo, se a extensão solicitar uma API que a Electron não suporta) então eles serão registrados no console .

Observe que a Electron não suporta toda a gama de APIs de extensões do Chrome. Consulte [APIs de extensões suportadas](extensions.md#supported-extensions-apis) para mais detalhes sobre o que é suportado.

Note que nas versões anteriores do Electron, extensões que eram carregadas seriam lembradas para futuras corridas do aplicativo. Este não é mais o caso: `loadExtension` deve ser chamado em cada inicialização do seu aplicativo se você quiser que a extensão seja carregada.



```js
const { app, session } = requer ('elétron')
caminho const = require ('path')

app.on ('pronto', async () => {
  aguardam session.defaultSession.loadExtension(
    path.join(__dirname, 'react-devtools'),
    // permite que oFileAccess seja necessário para carregar a extensão de devtools em URLs file://.
    { allowFileAccess: true }
  )
  // Observe que para usar a extensão React DevTools, você precisará
  // baixar e descompactar uma cópia da extensão.
})
```


Esta API não suporta extensões de carregamento (.crx).

**Nota:** Esta API não pode ser chamada antes que o evento `ready` do módulo `app` seja emitido.

**Nota:** O carregamento de extensões em sessões de memória (não persistente) não é suportado e irá jogar um erro.



#### `ses.removeExtension(extensionId)`

* `extensionId` String - ID de extensão para remover

Descarrega uma extensão.

**Nota:** Esta API não pode ser chamada antes que o evento `ready` do módulo `app` seja emitido.



#### `ses.getExtension(extensionId)`

* `extensionId` String - ID de extensão para consulta

Retorno `Extension` | `null` - A extensão carregada com o 1999.

**Nota:** Esta API não pode ser chamada antes que o evento `ready` do módulo `app` seja emitido.



#### `ses.getAllExtensions()`

Devoluções `Extension[]` - Uma lista de todas as extensões carregadas.

**Nota:** Esta API não pode ser chamada antes que o evento `ready` do módulo `app` seja emitido.



### Propriedades de Instância

As seguintes propriedades estão disponíveis em instâncias de `Session`:



#### `ses.availableSpellCheckerLanguages` _Readonly_

Uma matriz `String[]` que consiste em todas as linguagens de correção ortográfica disponíveis.  Fornecer um código de de idiomas para a API `setSpellCheckerLanguages` que não está nesta matriz resultará em um erro.



#### `ses.spellCheckerEnabled`

Um `Boolean` indicando se o verificador ortomfeito incorporado está ativado.



#### `ses.cookies` _Readonly_

Um objeto [`Cookies`](cookies.md) para esta sessão.



#### `ses.serviceWorkers` _Readonly_

Um objeto [`ServiceWorkers`](service-workers.md) para esta sessão.



#### `ses.webRequest` _Readonly_

Um objeto [`WebRequest`](web-request.md) para esta sessão.



#### `ses.protocol` _Readonly_

Um objeto [`Protocol`](protocol.md) para esta sessão.



```javascript
const { app, session } = require ('electron')
caminho const = require('path')

app.whenReady().then((() => {
  protocolo const = session.fromPartition ('some-partition').protocolo
  se (!protocol.registerFileProtocol('átomo', (solicitação, retorno de chamada) => {
    url const = request.url.substr(7)
    callback({ path: path.normalize('${__dirname}/${url}') })
  })) {
    console.error('Falha no registro do protocolo')
  }
})
```




#### `ses.netLog` _Readonly_

Um objeto [`NetLog`](net-log.md) para esta sessão.



```javascript
const { app, session } = require ('electron')

app.whenReady().then(async () => {
  const netLog = session.fromPartition ('some-partition').netLog
  Log.startLogging ('/path/to/net-log')
  // Depois de alguns eventos de rede
  caminho const = aguard netLog.stopLogging()
  console.log('Net-logs escritos para', caminho)
})
```
