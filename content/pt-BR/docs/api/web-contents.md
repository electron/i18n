# webContents

> Renderizar e controlar páginas da Web.

Processo: [Main](../glossary.md#main-process)

`webContents` é um [][event-emitter]eventEmitter. É responsável por renderizar e controlar uma página web e é propriedade de o objeto [`BrowserWindow`](browser-window.md) . Um exemplo de acessar o objeto `webContents` :

```javascript
const { BrowserWindow } = require ('electron')

const win = novo BrowserWindow({ width: 800, height: 1500 })
win.loadURL('http://github.com')

conteúdo de const = win.webContents
console.log(conteúdo)
```

## Métodos

Esses métodos podem ser acessados a partir do módulo `webContents` :

```javascript
const { webContents } = require('electron')
console.log(webContents)
```

### `webContents.getAllWebContents()`

Devoluções `WebContents[]` - Uma série de todas as `WebContents` instâncias. Isso conterá conteúdo da Web para todas as janelas, webviews, devtools abertos e páginas de fundo de extensão de devtools.

### `webContents.getFocusedWebContents()`

Retornos `WebContents` - O conteúdo da Web focado neste aplicativo, caso contrário, retorna `null`.

### `webContents.fromId(id)`

* `id` Inteiro

Retorno `WebContents` | indefinido - Uma instância do WebContents com o ID dado, ou `undefined` se não houver WebContents associados ao ID dado.

## Class: WebContents

> Renderizar e controlar o conteúdo de uma instância do BrowserWindow.

Processo: [Main](../glossary.md#main-process)

### Eventos de instância

#### Evento: 'fez-acabamento-carga'

Emitido quando a navegação é feita, ou seja, o rotador da guia parou girar, e o `onload` evento foi despachado.

#### Evento: 'did-fail-load'

Retorna:

* `event` Event
* `errorCode` Integer
* `errorDescription` Cordas
* `validatedURL` Cordas
* `isMainFrame` Booleano
* `frameProcessId` Integer
* `frameRoutingId` Integer

Este evento é como `did-finish-load` mas emitido quando a carga falhou. A lista completa de códigos de erro e seu significado está disponível [aqui](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h).

#### Evento: 'fez-fail-provisório-load'

Retorna:

* `event` Event
* `errorCode` Integer
* `errorDescription` Cordas
* `validatedURL` Cordas
* `isMainFrame` Booleano
* `frameProcessId` Integer
* `frameRoutingId` Integer

Este evento é como `did-fail-load` mas emitido quando a carga foi cancelada (por exemplo. `window.stop()` foi invocado).

#### Evento: 'did-frame-finish-load'

Retorna:

* `event` Event
* `isMainFrame` Booleano
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitido quando um quadro fez navegação.

#### Evento: 'fez-start-loading'

Corresponde aos pontos no tempo em que o rotador da guia começou a girar.

#### Evento: 'fez stop-loading'

Corresponde aos pontos no tempo em que o rotador da guia parou de girar.

#### Evento: 'dom-ready'

Retorna:

* `event` Event

Emitido quando o documento no quadro dado é carregado.

#### Evento: 'page-title-updated'

Retorna:

* `event` Event
* `title` String
* `explicitSet` Boolean

Acionado quando o título da página é definido durante a navegação. `explicitSet` é falso quando título é sintetizado a partir de url de arquivo.

#### Evento: 'page-title-updated'

Retorna:

* `event` Event
* `favicons` String[] - Array de URLs.

Emitido quando a página recebe urls de favicon.

#### Evento: 'nova janela' __preterido

Retorna:

* `event` NewWindowWebContentsEvent
* String `url`
* `frameName` String
* `disposition` String - Pode ser `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` e `other`.
* `options` BrowserWindowConstructorOptions - As opções que serão usadas para criar o novo [`BrowserWindow`](browser-window.md).
* `additionalFeatures` String[] - Os recursos não padronizados (características não manuseadas por Cromo ou Elétron) dadas a `window.open()`.
* `referrer` [Referidor](structures/referrer.md) - O remetente que será passado para a nova janela. Pode ou não resultar na `Referer` cabeçalho sendo enviado, dependendo da política de encaminhamento.
* `postBody` [PostBody](structures/post-body.md) (opcional) - Os dados postais que serão enviados para a nova janela, juntamente com os cabeçalhos apropriados que serão definidos. Se nenhum dado de postagem for enviado, o valor será `null`. Só definiu quando a janela está sendo criada por uma forma que define `target=_blank`.

Preterido em favor de [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler).

Emitido quando a página solicita a abertura de uma nova janela para um `url`. Pode ser solicitado por `window.open` ou um link externo como `<a target='_blank'>`.

Por padrão, uma nova `BrowserWindow` será criada para o `url`.

Chamar `event.preventDefault()` impedirá a Electron de criar automaticamente um [`BrowserWindow`](browser-window.md) novo . Se você chamar `event.preventDefault()` e criar manualmente um novo [`BrowserWindow`](browser-window.md) , então você deve definir `event.newGuest` para referenciar a nova instância [`BrowserWindow`](browser-window.md) , não fazê-lo pode resultar em comportamento inesperado. Como por exemplo:

```javascript
myBrowserWindow.webContents.on ('new-window', (evento, url, frameName, disposição, opções, adicionalFeatures, referrer, postBody) => {
  event.preventDefault()
  const win = novo BrowserWindow({
    webContents: options.webContents, // use webContents existentes se fornecido
    show: falso
  })
  ganhar.uma vez('pronto'.-para-mostrar', () => win.show())
  se (!opções.webContents) {
    const loadOptions = {
      httpReferrer: referrer
    }
    if (postBody != null) {
      const { data, contentType, boundary } = postBody
      loadOptions.postData = postBody.data
      loadOptions.extraHeaders = 'tipo de conteúdo: ${contentType}; boundary=${boundary}'
    }

    win.loadURL(url, loadOptions) // os webContents existentes serão navegados automaticamente
  }
  evento.newGuest = win
})
```

#### Evento: 'did-create-window'

Retorna:
* `window` BrowserWindow
* objeto `details`
    * `url` String - URL para a janela criada.
    * `frameName` String - Nome dado à janela criada na chamada `window.open()` .
    * `options` BrowserWindowConstructorOptions - As opções usadas para criar o BrowserWindow. Eles são mesclados em crescente precedência: opções herdadas do pai, opções analisadas da `features` de `window.open()`, e opções dadas por [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler). As opções não reconhecidas não são filtradas.
    * `additionalFeatures` String[] - Os recursos não padronizados (características não manipuladas Chromium ou Electron) __preteridos
    * `referrer` [Referidor](structures/referrer.md) - O remetente que será passado para a nova janela. Pode ou não resultar no `Referer` cabeçalho ser enviado, dependendo da política de encaminhamento.
    * `postBody` [PostBody](structures/post-body.md) (opcional) - Os dados postais que serão enviados para a nova janela, juntamente com os cabeçalhos apropriados que serão definidos. Se nenhum dado de postagem for enviado, o valor será `null`. Só definido quando a janela está sendo criada por uma forma que define `target=_blank`.
    * `disposition` String - Pode ser `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` e `other`.

Emitido _após_ criação bem sucedida de uma janela via `window.open` na renderização. Não emitido se a criação da janela for cancelada de [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler).

Veja [`window.open()`](window-open.md) para mais detalhes e como usá-lo em conjunto com `webContents.setWindowOpenHandler`.

#### Evento: 'will-navigate'

Retorna:

* `event` Event
* String `url`

Emitido quando um usuário ou a página quiser iniciar a navegação. Isso pode acontecer quando o objeto `window.location` é alterado ou um usuário clica em um link na página.

Este evento não emitirá quando a navegação for iniciada programáticamente com APIs como `webContents.loadURL` e `webContents.back`.

Também não é emitido para navegaçãos na página, como clicar em links de âncora ou atualizar o `window.location.hash`. Use `did-navigate-in-page` evento para este propósito.

Ligar `event.preventDefault()` impedirá a navegação.

#### Evento: 'fez-start-navigation'

Retorna:

* `event` Event
* String `url`
* `isInPlace` Booleano
* `isMainFrame` Booleano
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitido quando qualquer quadro (incluindo principal) começa a navegar. `isInPlace` será `true` para navegaçãos na página.

#### Evento: 'vai redirecionar'

Retorna:

* `event` Event
* String `url`
* `isInPlace` Booleano
* `isMainFrame` Booleano
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitido como um redirecionamento lateral do servidor ocorre durante a navegação.  Por exemplo, um redirecionamento de 302 .

Este evento será emitido após `did-start-navigation` e sempre antes do evento `did-redirect-navigation` para a mesma navegação.

Chamar `event.preventDefault()` impedirá a navegação (não apenas o redirecionar).

#### Evento: 'fez-redirecionamento-navegação'

Retorna:

* `event` Event
* String `url`
* `isInPlace` Booleano
* `isMainFrame` Booleano
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitido após um redirecionamento lateral do servidor ocorre durante a navegação.  Por exemplo, um redirecionamento de 302 .

Este evento não pode ser evitado, se você quiser evitar redirecionamentos, você deve o check-out do `will-redirect` evento acima.

#### Evento: 'did-navigate'

Retorna:

* `event` Event
* String `url`
* `httpResponseCode` Inteiro - -1 para navegaçãos não HTTP
* `httpStatusText` String - vazio para navegaçãos não HTTP

Emitido quando uma navegação de quadro principal é feita.

Este evento não é emitido para navegaçãos na página, como clicar em links de âncora ou atualizar o `window.location.hash`. Use `did-navigate-in-page` evento para este propósito.

#### Evento: 'did-frame-navigate'

Retorna:

* `event` Event
* String `url`
* `httpResponseCode` Inteiro - -1 para navegaçãos não HTTP
* `httpStatusText` String - vazio para navegação não HTTP,
* `isMainFrame` Booleano
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitido quando qualquer navegação de quadro é feita.

Este evento não é emitido para navegaçãos na página, como clicar em links de âncora ou atualizar o `window.location.hash`. Use `did-navigate-in-page` evento para este propósito.

#### Evento: 'fez navegação na página'

Retorna:

* `event` Event
* String `url`
* `isMainFrame` Booleano
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitido quando uma navegação na página aconteceu em qualquer quadro.

Quando a navegação na página acontece, a URL da página muda, mas não causa navegação fora da página. Exemplos disso ocorrendo são quando links de âncora são clicados ou quando o evento `hashchange` DOM é acionado.

#### Evento: 'vai-prevenir-descarregar'

Retorna:

* `event` Event

Emitido quando um manipulador de eventos `beforeunload` está tentando cancelar um descarregamento de página.

Ligar para `event.preventDefault()` ignorará o do manipulador de eventos `beforeunload` e permitirá que a página seja descarregada.

```javascript
const { BrowserWindow, dialog } = require('electron')
const win = novo BrowserWindow({ width: 800, height: 600 })
win.webContents.on('will-prevent-unload', (event) => {
  escolha const = dialog.showMessageBoxSync(win, {
    tipo: 'pergunta',
    botões: ['Leave', 'Stay', 'Stay', 'Stay', '']
    título: 'Você quer sair deste site?',
    mensagem: 'As alterações feitas não podem ser salvas.',
    defaultId: 0,
    cancelId: 1
  })
  licença const = (escolha === 0)
  se (sair) {
    evento.preventDefault()

}
```

#### Evento: 'caiu' __preterido

Retorna:

* `event` Event
* `killed` Boolean

Emitido quando o processo de renderização falha ou é morto.

**Preterido:** Este evento é superado pelo evento `render-process-gone` que contém mais informações sobre por que o processo de renderização desapareceu. Não é sempre porque caiu.  O `killed` booleano pode ser substituído por verificando `reason === 'killed'` quando você mudar para esse evento.

#### Evento: 'render-processo-gone'

Retorna:

* `event` Event
* objeto `details`
  * `reason` String - A razão pela qual o processo de renderização se foi.  Valores possíveis:
    * `clean-exit` - Processo saiu com um código de saída de zero
    * `abnormal-exit` - Processo saiu com um código de saída não-zero
    * `killed` - Processo foi enviado um SIGTERM ou de outra forma morto externamente
    * `crashed` - Processo caiu
    * `oom` - Processo ficou sem memória
    * `launch-failed` - Processo nunca lançado com sucesso
    * `integrity-failure` - Verificações de integridade de código do Windows falharam
  * `exitCode` Integer - O código de saída do processo, a menos que `reason` seja `launch-failed`, nesse caso `exitCode` será um código de erro de falha de lançamento específico plataforma.

Emitido quando o processo de renderização desaparece inesperadamente.  Isso normalmente é porque foi acidentado ou morto.

#### Evento: 'unresponsive'

Emitido quando a página web fica sem resposta.

#### Evento: 'responsive'

Emitido quando a página web sem resposta se torna responsiva novamente.

#### Evento: 'plugin-crash'

Retorna:

* `event` Event
* `name` String
* `version` Cordas

Emitido quando um processo de plugin caiu.

#### Evento: 'destruído'

Emitido quando `webContents` é destruído.

#### Evento: 'antes do evento de entrada'

Retorna:

* `event` Event
* `input` Objeto - Propriedades de entrada.
  * `type` String - `keyUp` ou `keyDown`.
  * `key` String - Equivalente a [KeyboardEvent.key][keyboardevent].
  * `code` String - Equivalente a [KeyboardEvent.code][keyboardevent].
  * `isAutoRepeat` Booleano - Equivalente a [KeyboardEvent.repeat][keyboardevent].
  * `isComposing` Booleano - Equivalente a [KeyboardEvent.isComposing][keyboardevent].
  * `shift` Booleano - Equivalente a [KeyboardEvent.shiftKey][keyboardevent].
  * `control` Booleano - Equivalente a [KeyboardEvent.controlKey][keyboardevent].
  * `alt` Booleano - Equivalente a [KeyboardEvent.altKey][keyboardevent].
  * `meta` Booleano - Equivalente a [KeyboardEvent.metaKey][keyboardevent].

Emitido antes de despachar os eventos `keydown` e `keyup` na página. Ligar para `event.preventDefault` impedirá que os eventos de `keydown`/`keyup` da página e os atalhos do menu.

Para evitar apenas os atalhos do menu, use [`setIgnoreMenuShortcuts`](#contentssetignoremenushortcutsignore):

```javascript
const { BrowserWindow } = require ('electron')

const win = novo BrowserWindow({ width: 800, height: 600 })

win.webContents.on('antes-entrada-evento', (evento, entrada) => {
  // Por exemplo, só habilita os atalhos do teclado do menu do aplicativo quando
  // Ctrl/Cmd estão para baixo.
  win.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)
})
```

#### Evento: 'enter-html-full-screen'

Emitido quando a janela entra em um estado de tela cheia acionado pela API HTML.

#### Evento: 'leave-html-full-screen'

Emitido quando a janela deixa um estado de tela cheia acionado pela API HTML.

#### Evento: 'zoom-changed'

Retorna:

* `event` Event
* `zoomDirection` String - Pode ser `in` ou `out`.

Emitido quando o usuário está solicitando para alterar o nível de zoom usando a roda do mouse.

#### Evento: 'devtools-abertos'

Emitido quando o DevTools é aberto.

#### Evento: 'devtools-fechados'

Emitido quando DevTools é fechado.

#### Evento: 'focado em devtools'

Emitido quando o DevTools está focado /aberto.

#### Evento: 'certificate-error'

Retorna:

* `event` Event
* String `url`
* `error` String - O código do erro.
* `certificate` [Certificate](structures/certificate.md)
* `callback` Function
  * `isTrusted` Boolean - Indica se o certificado pode ser considerado confiável.

Emitido quando não foi verificado o `certificate` para `url`.

O uso é o mesmo com [o `certificate-error` evento de `app`](app.md#event-certificate-error).

#### Evento: 'select-client-certificate'

Retorna:

* `event` Event
* `url` URL
* `certificateList` [Certificate[]](structures/certificate.md)
* `callback` Function
  * `certificate` [Certificado](structures/certificate.md) - Deve ser um certificado da lista dada.

Emitido quando um certificado de cliente é solicitado.

O uso é o mesmo com [o `select-client-certificate` evento de `app`](app.md#event-select-client-certificate).

#### Evento: 'login'

Retorna:

* `event` Event
* objeto `authenticationResponseDetails`
  * `url` URL
* objeto `authInfo`
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function
  * `username` String (opcional)
  * `password` String (opcional)

Emitido quando `webContents` quer fazer uma autenticação básica.

O uso é o mesmo com [o `login` evento de `app`](app.md#event-login).

#### Evento: 'encontrado na página'

Retorna:

* `event` Event
* objeto `result`
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - Posição do jogo ativo.
  * `matches` Inteiro - Número de Partidas.
  * `selectionArea` Retângulo - Coordenadas da primeira região do jogo.
  * `finalUpdate` Booleano

Emitido quando um resultado está disponível para [`webContents.findInPage`] solicitação.

#### Evento: 'media-started-playing'

Emitido quando a mídia começa a jogar.

#### Evento: 'media-paused'

Emitido quando a mídia é pausada ou feita de reprodução.

#### Evento: 'did-change-tema-color'

Retorna:

* `event` Event
* `color` (String | null) - A cor tema está no formato de '#rrggbb'. É `null` quando nenhuma cor temática é definida.

Emitido quando a cor do tema de uma página muda. Isso geralmente é devido ao encontro uma meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

#### Evento: 'update-target-url'

Retorna:

* `event` Event
* String `url`

Emitido quando o mouse se move sobre um link ou o teclado move o foco para um link.

#### Evento: 'cursor-changed'

Retorna:

* `event` Event
* `type` Cordas
* `image` [NativeImage](native-image.md) (opcional)
* `scale` Float (opcional) - fator de escala para o cursor personalizado.
* `size` [Tamanho](structures/size.md) (opcional) - do tamanho do `image`.
* `hotspot` [Point](structures/point.md) (opcional) - coordenadas do hotspot do cursor personalizado.

Emitido quando o tipo do cursor muda. O parâmetro `type` pode ser `default`, `crosshair`, `pointer`, `text`, `wait`, `help`, `e-resize`, `n-resize`, `ne-resize`, `nw-resize`, `s-resize`, `se-resize`, `sw-resize`, `w-resize`, `ns-resize`, `ew-resize`, `nesw-resize`, `nwse-resize`, `col-resize`, `row-resize`, `m-panning`, `e-panning`, `n-panning`, `ne-panning`, `nw-panning`, `s-panning`, `se-panning`, `sw-panning`, `w-panning`, `move`, `vertical-text`, `cell` `context-menu`, `alias`, `progress`, `nodrop`, `copy`, `none`, `not-allowed`, `zoom-in`, `zoom-out`, `grab`, `grabbing` ou `custom`.

Se o parâmetro `type` for `custom`, o parâmetro `image` manterá a imagem do cursor personalizada em uma [`NativeImage`](native-image.md)e `scale`, `size` e `hotspot` conterá informações adicionais sobre o cursor personalizado.

#### Evento: 'menu de contexto'

Retorna:

* `event` Event
* objeto `params`
  * `x` Integer - x coordenada.
  * `y` Integer - y coordenada.
  * `linkURL` String - URL do link que inclui o nó no menu de contexto foi invocado.
  * `linkText` String - Texto associado ao link. Pode ser uma sequência de vazia se o conteúdo do link for uma imagem.
  * `pageURL` String - URL da página de nível superior que o menu de contexto foi invocado.
  * `frameURL` String - URL do subframe no do menu de contexto.
  * `srcURL` String - URL de origem para o elemento no do menu de contexto foi invocado. Elementos com URLs de origem são imagens, áudio e vídeo.
  * `mediaType` String - Tipo do nó no que o menu de contexto foi invocado. Pode ser `none`, `image`, `audio`, `video`, `canvas`, `file` ou `plugin`.
  * `hasImageContents` Booleano - Se o menu de contexto foi invocado em uma imagem que tem conteúdo não vazio.
  * `isEditable` Booleano - Se o contexto é editável.
  * `selectionText` String - Texto da seleção em que o menu de contexto foi invocado .
  * `titleText` String - Título ou texto alt da seleção em que o contexto foi invocado.
  * `misspelledWord` String - A palavra mal escrito sob o cursor, se houver.
  * `dictionarySuggestions` String[] - Uma série de palavras sugeridas para mostrar ao usuário para substituir o `misspelledWord`.  Só disponível se houver uma palavra e um verificador ortográfico mal escrito.
  * `frameCharset` String - A codificação do caractere do quadro no qual o menu foi invocado.
  * `inputFieldType` String - Se o menu de contexto foi invocado em um campo de entrada , o tipo desse campo. Os valores possíveis são `none`, `plainText`, `password`, `other`.
  * `menuSourceType` String - Fonte de entrada que invocou o menu de contexto. Pode ser `none`, `mouse`, `keyboard`, `touch` ou `touchMenu`.
  * `mediaFlags` Objeto - As bandeiras para o elemento de mídia no menu de contexto foram invocadas.
    * `inError` Boolean - Se o elemento da mídia caiu.
    * `isPaused` Booleano - Se o elemento de mídia é pausado.
    * `isMuted` Booleano - Se o elemento da mídia é silenciado.
    * `hasAudio` Booleano - Se o elemento de mídia tem áudio.
    * `isLooping` Booleano - Se o elemento de mídia está looping.
    * `isControlsVisible` Booleano - Se os controles do elemento de mídia são visíveis.
    * `canToggleControls` Boolean - Se os controles do elemento de mídia são alternado.
    * `canRotate` Booleano - Se o elemento de mídia pode ser girado.
  * `editFlags` Objeto - Essas bandeiras indicam se o renderizador acredita que é capaz de executar a ação correspondente.
    * `canUndo` Booleano - Se o renderizador acredita que pode desfazer.
    * `canRedo` Booleano - Se o renderizador acredita que pode refazer.
    * `canCut` Boolean - Se o renderizador acredita que pode cortar.
    * `canCopy` Booleano - Se o renderizador acredita que pode copiar
    * `canPaste` Booleano - Se o renderizador acredita que pode colar.
    * `canDelete` Booleano - Se o renderizador acredita que pode apagar.
    * `canSelectAll` Booleano - Se o renderizador acredita que pode selecionar tudo.

Emitido quando há um novo menu de contexto que precisa ser manipulado.

#### Evento: 'select-bluetooth-device'

Retorna:

* `event` Event
* `devices` [BluetoothDevice[]](structures/bluetooth-device.md)
* `callback` Function
  * `deviceId` String

Emitido quando o dispositivo bluetooth precisa ser selecionado de plantão para `navigator.bluetooth.requestDevice`. Para usar `navigator.bluetooth` api `webBluetooth` deve ser habilitado. Se `event.preventDefault` não for chamado, primeiro dispositivo disponível será selecionado. `callback` deve ser chamado com `deviceId` a serem selecionados, passando a corda vazia para `callback` cancelará a solicitação.

```javascript
const { app, BrowserWindow } = require ('electron')

let win = nulo
app.commandLine.appendSwitch ('enable-experimental-web-platform-features')

app.whenReady().then(()=>
  = novo BrowserWindow({ width: 800, height: 600 })
  win.webContents.on('select-bluetooth-device', (evento, deviceList, callback) => {
    event.preventDefault()
    resultado const = deviceList.find((dispositivo) => {
      dispositivo de retorno.deviceName =deviceName === 'teste'
    })
    se (!resultado) {
      callback('')
    } else {
      callback (result.deviceId)
    }
  })
})
```

#### Evento: 'pintura'

Retorna:

* `event` Event
* </a>de Retângulo `dirtyRect`

</li> 
  
  * `image` [NativeImage](native-image.md) - Os dados de imagem de todo o quadro.</ul> 

Emitido quando um novo quadro é gerado. Apenas a área suja é passada no buffer.



```javascript
const { BrowserWindow } = require ('electron')

const win = novo BrowserWindow({ webPreferências: { offscreen: true } })
win.webContents.on ('paint', (evento, sujo, imagem) => {
  // updateBitmap (sujo, image.getBitmap())
})
win.loadURL ('http://github.com')
```




#### Evento: 'devtools-reload-page'

Emitido quando a janela de devtools instrui os webContents a recarregar



#### Evento: 'vai anexar-webview'

Retorna:

* `event` Event
* `webPreferences` WebPreferências - As preferências da Web que serão usadas pela página convidado. Este objeto pode ser modificado para ajustar as preferências da página convidado.

* `params`<string, string> Record - Os outros parâmetros `<webview>` , como a URL `src` . Este objeto pode ser modificado para ajustar os parâmetros da página do convidado.

Emitido quando um conteúdo da web de um `<webview>`está sendo anexado a este conteúdo de web. Ligar para `event.preventDefault()` destruirá a página dos convidados.

Este evento pode ser usado para configurar `webPreferences` para o `webContents` de um `<webview>` antes de ser carregado, e fornece a capacidade de definir configurações que não podem ser definidas através de atributos `<webview>` .

**Nota:** A opção de script `preload` especificada aparecerá como `preloadURL` (não `preload`) no objeto `webPreferences` emitido com este evento.



#### Evento: 'did-attach-webview'

Retorna:

* `event` Event
* `webContents` WebContents - O conteúdo da web de hóspedes que é usado pelo `<webview>`.

Emitido quando um `<webview>` foi anexado a este conteúdo da Web.



#### Evento: 'console-message'

Retorna:

* `event` Event
* `level` Inteiro - O nível de registro, de 0 a 3. Para que corresponda a `verbose`, `info`, `warning` e `error`.
* `message` String - A mensagem real do console
* `line` Integer - O número de linha da fonte que acionou esta mensagem de console
* `sourceId` Cordas

Emitido quando a janela associada registra uma mensagem de console.



#### Evento: 'erro de pré-carga'

Retorna:

* `event` Event
* `preloadPath` Cordas
* `error` Error

Emitido quando o script de pré-carga `preloadPath` lança uma exceção não manuseada `error`.



#### Evento: 'ipc-message'

Retorna:

* `event` Event
* `channel` Cordas
* `...args` qualquer[]

Emitido quando o processo de renderização envia uma mensagem assíncronós por `ipcRenderer.send()`.



#### Evento: 'ipc-message-sync'

Retorna:

* `event` Event
* `channel` Cordas
* `...args` qualquer[]

Emitido quando o processo de renderização envia uma mensagem síncronente via `ipcRenderer.sendSync()`.



#### Evento: 'desktop-capturer-get-sources'

Retorna:

* `event` Event

Emitido quando `desktopCapturer.getSources()` é chamado no processo renderizador. Ligar para `event.preventDefault()` fará com que devolva fontes vazias.



#### Evento: 'remota-require' __preterido

Retorna:

* `event` IpcMainEvent
* `moduleName` String

Emitido quando `remote.require()` é chamado no processo renderizador. Evocando `event.preventDefault()` irá prevenir o módulo de ser retornado. Valores personalizados podem ser retornados pela configuração `event.returnValue`.



#### Evento: 'remoto-get-global' __preterido

Retorna:

* `event` IpcMainEvent
* `globalName` String

Emitido quando `remote.getGlobal()` é chamado no processo renderizador. Evocando `event.preventDefault()` irá previnir o global ser retornado. Valores personalizados podem ser retornados pela configuração `event.returnValue`.



#### Evento: ' _de  preterido_s

Retorna:

* `event` IpcMainEvent
* `moduleName` String

Emitido quando `remote.getBuiltin()` é chamado no processo renderizador. Evocando `event.preventDefault()` irá prevenir o módulo de ser retornado. Valores personalizados podem ser retornados pela configuração `event.returnValue`.



#### Evento: 'janela remota-get-current-window' __preterido

Retorna:

* `event` IpcMainEvent

Emitido quando `remote.getCurrentWindow()` é chamado no processo renderizador. Ligar para `event.preventDefault()` impedirá que o objeto seja devolvido. Valores personalizados podem ser retornados pela configuração `event.returnValue`.



#### Evento: 'remote-get-current-content' _Preterido_

Retorna:

* `event` IpcMainEvent

Emitido quando `remote.getCurrentWebContents()` é chamado no processo renderizador. Ligar para `event.preventDefault()` impedirá que o objeto seja devolvido. Valores personalizados podem ser retornados pela configuração `event.returnValue`.



#### Evento: 'preferencialmente-size-changed'

Retorna:

* `event` Event
* `preferredSize` [Tamanho](structures/size.md) - O tamanho mínimo necessário para conter o layout do documento — sem exigir rolagem.

Emitido quando o tamanho preferido `WebContents` mudou.

Este evento só será emitido quando `enablePreferredSizeMode` for definido para `true` em `webPreferences`.



### Métodos de Instância



#### `contents.loadURL(url[, opções])`

* String `url`
* objeto `options` (opcional) 
    * `httpReferrer` (| de cordas [Referidor](structures/referrer.md)) (opcional) - Uma url http referrer.
  * `userAgent` String (opcional) - Um agente do usuário originário da solicitação.
  * `extraHeaders` String (opcional) - Cabeçalhos extras separados por "\n".
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md)) (opcional)
  * `baseURLForDataURL` String (opcional) - Url base (com separador de caminho de trailing) para que os arquivos sejam carregados pela url de dados. Isso só é necessário se o `url` especificado for uma url de dados e precisar carregar outros arquivos.

Retorna `Promise<void>` - a promessa será resolvida quando a página terminar de carregar (ver [`did-finish-load`](web-contents.md#event-did-finish-load)), e rejeita se a página não carregar (ver [`did-fail-load`](web-contents.md#event-did-fail-load)). Um manipulador de rejeição noop já está conectado, o que evita erros de rejeição não manuseados.

Carrega o `url` na janela. O `url` deve conter o prefixo do protocolo, por exemplo, o `http://` ou `file://`. Se a carga deve contornar o cache http, então usar o cabeçalho `pragma` para alcançá-lo.



```javascript
const { webContents } = require ('electron')
opções de const = { extraHeaders: 'pragma: no-cache\n' }
webContents.loadURL ('https://github.com', opções)
```




#### `contents.loadFile(filePath[, options])`

* `filePath` Cordas
* objeto `options` (opcional) 
    * `query` Record<String, String> (opcional) - Passou para `url.format()`.
  * `search` String (opcional) - Passou para `url.format()`.
  * `hash` String (opcional) - Passou para `url.format()`.

Retorna `Promise<void>` - a promessa será resolvida quando a página terminar de carregar (ver [`did-finish-load`](web-contents.md#event-did-finish-load)), e rejeita se a página não carregar (ver [`did-fail-load`](web-contents.md#event-did-fail-load)).

Carrega o arquivo dado na janela, `filePath` deve ser um caminho para um arquivo HTML em relação à raiz do seu aplicativo.  Por exemplo, uma estrutura de aplicativo como esta:



```sh
|
| raiz - pacote.json
| - SRC
|   - principal.js
|   - índice.html
```


Exigiria código como este



```js
win.loadFile('src/index.html')
```




#### `contents.downloadURL(url)`

* String `url`

Inicia um download do recurso em `url` sem navegar. O `will-download` evento de `session` será acionado.



#### `contents.getURL()`

Devoluções `String` - A URL da página web atual.



```javascript
const { BrowserWindow } = require ('electron')
const win = novo BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com').então((() => {
  const currentURL = win.webContents.getURL()
  console.log(currentURL)
})
```




#### `contents.getTitle()`

Retorna `String` - O título da página web atual.



#### `contents.isDestroyed()`

Devoluções `Boolean` - Se a página da Web está destruída.



#### `contents.focus()`

Foca a página da web.



#### `contents.isFocused()`

Retornos `Boolean` - Se a página da Web está focada.



#### `contents.isLoading()`

Devoluções `Boolean` - Se a página da Web ainda está carregando recursos.



#### `contents.isLoadingMainFrame()`

Devoluções `Boolean` - Se o quadro principal (e não apenas serames ou quadros dentro dele) está ainda carregando.



#### `contents.isWaitingForResponse()`

Retornos `Boolean` - Se a página da Web está esperando uma primeira resposta do principal recurso da página.



#### `contents.stop()`

Interrompe qualquer navegação pendente.



#### `contents.reload()`

Recarrega a página web atual.



#### `contents.reloadIgnoringCache()`

Recarrega a página atual e ignora o cache.



#### `contents.canGoBack()`

Devoluções `Boolean` - Se o navegador pode voltar à página web anterior.



#### `contents.canGoForward()`

Devoluções `Boolean` - Se o navegador pode avançar para a próxima página da Web.



#### `contents.canGoToOffset(offset)`

* `offset` Integer

Devoluções `Boolean` - Se a página da Web pode ir para `offset`.



#### `contents.clearHistory()`

Limpa o histórico de navegação.



#### `contents.goBack()`

Faz com que o navegador volte a ser uma página web.



#### `contents.goForward()`

Faz com que o navegador avance uma página da Web.



#### `contents.goToIndex(índice)`

* `index` Integer

Navega pelo navegador até o índice de página web absoluto especificado.



#### `contents.goToOffset(offset)`

* `offset` Integer

Navega até o deslocamento especificado da "entrada atual".



#### `contents.isCrashed()`

Devoluções `Boolean` - Se o processo de renderização caiu.



#### `conteúdo.vigorosamenteCrashRenderer()`

Termina com força o processo de renderização que está hospedando este `webContents`. Isso fará com que o evento `render-process-gone` seja emitido com o `reason=killed || reason=crashed`. Observe que alguns webContents compartilham processos de renderização e, portanto, chamar esse método também pode travar o processo de host para outros webContents também.

Ligar para `reload()` imediatamente após chamar esse método de forçará a recarga a ocorrer em um novo processo. Isso deve ser usado quando esse processo é instável ou inutilizável, por exemplo, a fim de recuperar do evento `unresponsive` .



```js
contents.on('não responde', async () => {
  const { response } = aguard dialog.showMessageBox({
    mensagem: 'O aplicativo X ficou sem resposta',
    título: 'Você quer tentar recarregar o aplicativo com força?',
    botões: ['OK', 'Cancelar'],
    cancelId: 1
  })
  se (resposta === 0) {
    contents.vigorosamenteCrashRenderer()
    conteúdo.reload()

}
```




#### `contents.setUserAgent (userAgent)`

* `userAgent` Cordas

Substitui o agente de usuário por esta página da Web.



#### `contents.getUserAgent()`

Retornos `String` - O usuário é o agente do usuário para esta página.



#### `contents.insertCSS(css[, opções])`

* `css` Cordas
* objeto `options` (opcional) 
    * `cssOrigin` String (opcional) - Pode ser 'usuário' ou 'autor'; Especificar 'usuário' permite impedir que sites sobrepondam o CSS inserido. Padrão é 'autor'.

Devoluções `Promise<String>` - Uma promessa que se resolve com uma chave para o CSS inserido que pode ser usada posteriormente para remover o CSS via `contents.removeInsertedCSS(key)`.

Injeta CSS na página web atual e retorna uma chave exclusiva para a folha de inserida.



```js
contents.on ('did-finish-load', () => {
  contents.insertCSS('html, corpo { cor de fundo: #f00; }')
})
```




#### `contents.removeInsertedCSS(chave)`

* `key` Cordas

Devoluções `Promise<void>` - Resolve se a remoção foi bem sucedida.

Remove o CSS inserido da página web atual. A folha de estilo é identificada por sua chave, que é devolvida de `contents.insertCSS(css)`.



```js
contents.on ('did-finish-load', async () => {
  tecla const = aguarde conteúdos.insertCSS('html, corpo { cor de fundo: #f00; }')
  conteúdo.removeInsertedCSS(key)
})
```




#### `conteúdo.executeJavaScript(código[, userGesture])`

* `code` String
* `userGesture` Booleano (opcional) - Padrão é `false`.

Devoluções `Promise<any>` - Uma promessa que resolve com o resultado do código executado ou é rejeitada se o resultado do código for uma promessa rejeitada.

Avalia `code` na página.

Na janela do navegador algumas APIs HTML como `requestFullScreen` só podem ser invocadas por um gesto do usuário. A configuração `userGesture` para `true` removerá essa limitação.

A execução do código será suspensa até que a página da Web pare de carregar.



```js
contents.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").então(resp => resp.json()', true)
  .then((resultado) => {
    console.log(resultado) // Será o objeto JSON da chamada de busca
  })
```




#### `contents.executeJavaScriptInIsolatedWorld (worldId, scripts[, userGesture])`

* `worldId` Integer - O ID do mundo para executar o javascript, `0` é o mundo padrão, `999` é o mundo usado pelo recurso `contextIsolation` da Electron.  Você pode fornecer qualquer inteiro aqui.
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Booleano (opcional) - Padrão é `false`.

Devoluções `Promise<any>` - Uma promessa que resolve com o resultado do código executado ou é rejeitada se o resultado do código for uma promessa rejeitada.

Funciona como `executeJavaScript` , mas avalia `scripts` em um contexto isolado.



#### `contents.setIgnoreMenuShortcuts(ignorar)`

* `ignore` Booleano

Ignore os atalhos do menu do aplicativo enquanto este conteúdo da Web estiver focado.



#### `contents.setWindowOpenHandler(manipulador)`

* Função `handler`<{action: 'deny'} | {action: 'allow', overrideBrowserWindowOptions?: BrowserWindowConstructorOptions}> 
    * objeto `details` 
        * `url` String - A versão</em> _resolvida da URL passou para `window.open()`. por exemplo, abrir uma janela com `window.open('foo')` vai render algo como `https://the-origin/the/current/path/foo`.</li> 
      
          * `frameName` String - Nome da janela fornecida em `window.open()`
    * `features` String - Lista separada de gama de recursos de janela fornecidos ao `window.open()`. Retorno `{action: 'deny'} | {action: 'allow', overrideBrowserWindowOptions?: BrowserWindowConstructorOptions}` - `deny` cancela a criação da nova janela de . `allow` permitirá que a nova janela seja criada. Especificar `overrideBrowserWindowOptions` permite a personalização da janela criada. Devolver um valor não reconhecido, como um nulo, indefinido ou um objeto sem um valor de "ação" reconhecido, resultará em um erro de console e o mesmo efeito que o retorno `{action: 'deny'}`.</ul></li> </ul></li> </ul> 

Chamado antes de criar uma janela quando `window.open()` é chamado do renderizador . Veja [`window.open()`](window-open.md) para mais detalhes e como usá-lo em conjunto com `did-create-window`.



#### `contents.setAudioMuted(silenciado)`

* `muted` Booleano

Silencie o áudio na página web atual.



#### `contents.isAudioMuted()`

Devolução `Boolean` - Se esta página foi silenciada.



#### `conteúdo.isCurrentlyAudible()`

Retorna `Boolean` - Se o áudio está sendo reproduzido no momento.



#### `contents.setZoomFactor(fator)`

* `factor` fator Double - Zoom; padrão é 1.0.

Altera o fator de zoom para o fator especificado. O fator zoom é por cento de zoom dividido por 100, então 300% = 3,0.

O fator deve ser maior que 0,0.



#### `contents.getZoomFactor()`

Retorna `Number` - o fator zoom atual.



#### `contents.setZoomLevel(nível)`

* número `level` - Nível de zoom.

Altera o nível de zoom para o nível especificado. O tamanho original é 0 e cada incremento acima ou abaixo representa um zoom 20% maior ou menor para padrão limites de 300% e 50% do tamanho original, respectivamente. A fórmula para isso é `scale := 1.2 ^ level`.



> **NOTA**: A política de zoom no nível do Chromium é de mesma origem, o que significa que o nível de zoom para um domínio específico se propaga em todas as instâncias de janelas com mesmo domínio. Diferenciar os URLs da janela fará com que o zoom funcione por janela.



#### `contents.getZoomLevel()`

Retorna `Number` - o nível de zoom atual.



#### `contents.setVisualZoomLevelLimits(mínimoNível, máximoNível)`

* Número de `minimumLevel`
* Número de `maximumLevel`

Retornos `Promise<void>`

Define o nível máximo e mínimo de pinch-to-zoom.



> ****NOTA : O zoom visual é desativado por padrão em Electron. Para ree enablei-lo, ligue:
> 
> ```js
> contents.setVisualZoomLevelLimits(1, 3)
> ```



#### `conteúdo.desfazer()`

Executa o comando de edição `undo` na página da Web.



#### `contents.redo()`

Executa o comando de edição `redo` na página da Web.



#### `contents.cut()`

Executa o comando de edição `cut` na página da Web.



#### `contents.copy()`

Executa o comando de edição `copy` na página da Web.



#### `contents.copyImageAt(x, y)`

* `x` Integer
* `y` Integer

Copie a imagem na posição dada para a área de transferência.



#### `contents.paste()`

Executa o comando de edição `paste` na página da Web.



#### `contentseAndMatchStyle()`

Executa o comando de edição `pasteAndMatchStyle` na página da Web.



#### `conteúdo.delete()`

Executa o comando de edição `delete` na página da Web.



#### `contents.selectAll()`

Executa o comando de edição `selectAll` na página da Web.



#### `conteúdo.unselect()`

Executa o comando de edição `unselect` na página da Web.



#### `conteúdo.substituir (texto)`

* `text` String

Executa o comando de edição `replace` na página da Web.



#### `conteúdo.substituirMesspelling (texto)`

* `text` String

Executa o comando de edição `replaceMisspelling` na página da Web.



#### `contents.insertText(texto)`

* `text` String

Retornos `Promise<void>`

Insere `text` ao elemento focal.



#### `contents.findInPage (texto[, opções])`

* `text` String - Conteúdo a ser pesquisado, não deve estar vazio.
* objeto `options` (opcional) 
    * `forward` Booleano (opcional) - Quer pesquise para frente ou para trás, é padrão para `true`.
  * `findNext` Booleano (opcional) - Se a operação é primeira solicitação ou um acompanhamento, inadimplência para `false`.
  * `matchCase` Booleano (opcional) - Se a pesquisa deve ser sensível a casos, padrão para `false`.

Devolução `Integer` - O id de solicitação utilizado para a solicitação.

Inicia uma solicitação para encontrar todas as partidas para o `text` na página web. O resultado da solicitação pode ser obtido mediante a inscrição [`found-in-page`](web-contents.md#event-found-in-page) evento.



#### `contents.stopFindInPage(ação)`

* `action` String - Especifica que a ação ocorrerá ao encerrar solicitação [`webContents.findInPage`].
  
    * `clearSelection` - Limpe a seleção.
  * `keepSelection` - Traduza a seleção em uma seleção normal.
  * `activateSelection` - Concentre-se e clique no nó de seleção.

Solicitamos `findInPage` solicitação `webContents` fornecida `action`s.



```javascript
const { webContents } = requer ('elétron')
webContents.on ('found-in-page', (evento, resultado) => {
  se (resultado.finalUpdate) webContents.stopFindInPage ('clearSelection')
})

const requestId = webContents.findInPage ('api')
console.log(requestId)
```




#### `contents.capturePage ([rect])`

* `rect` [Retângulo](structures/rectangle.md) (opcional) - A área da página a ser capturada.

Retorna `Promise<NativeImage>` - Resolve com um</a>NativeImage </p> 

Captura um instantâneo da página dentro de `rect`. Omitir `rect` capturará toda a página visível.



#### `contents.isBeingCaptured()`

Devolução `Boolean` - Se esta página está sendo capturada. Ele retorna verdadeiro quando a contagem de capturas é grande do que 0.



#### `contents.incrementCapturerCount ([tamanho, stayHidden])`

* `size` [Tamanho](structures/size.md) (opcional) - O tamanho preferido para o captador.
* `stayHidden` Boolean (opcional) - Mantenha a página escondida em vez de visível.

Aumente a contagem de captador em um. A página é considerada visível quando sua janela do navegador está oculta e a contagem de capturadores não é zero. Se você quiser que a página fique escondida, você deve garantir que `stayHidden` seja definida como verdadeira.

Isso também afeta a API de visibilidade da página.



#### `contents.decrementCapturerCount ([stayHidden])`

* `stayHidden` Boolean (opcional) - Mantenha a página em estado oculto em vez de visível.

Diminua a contagem de captador em um. A página será definida como estado oculto ou ocluído quando sua janela de do navegador estiver oculta ou ocluída e a contagem de capturadores atingir zero. Se você quiser diminuir a contagem de captador oculto, em vez disso, você deve definir `stayHidden` como verdadeira.



#### `contents.getPrinters()`

Pegue a lista da impressora do sistema.

Retornos [`PrinterInfo[]`](structures/printer-info.md)



#### `conteúdo.print ([options], [callback])`

* objeto `options` (opcional)
  
    * `silent` Boolean (opcional) - Não peça ao usuário configurações de impressão. Por padrão é `false`.
  * `printBackground` Boolean (opcional) - Imprime a cor de fundo e a imagem de página web. Por padrão é `false`.
  * `deviceName` String (opcional) - Defina o nome do dispositivo da impressora para usar. Deve ser o nome definido pelo sistema e não o nome 'amigável', por exemplo, 'Brother_QL_820NWB' e não 'Irmão QL-820NWB'.
  * `color` Boolean (opcional) - Definir se a página da Web impressa estará em cores ou em escala de cinza. O padrão é `true`.
  * objeto `margins` (opcional) 
        * `marginType` String (opcional) - Pode ser `default`, `none`, `printableArea`ou `custom`. Se `custom` for escolhido, você também precisará especificar `top`, `bottom`, `left`e `right`.
    * `top` Número (opcional) - A margem superior da página web impressa, em pixels.
    * `bottom` Número (opcional) - A margem inferior da página web impressa, em pixels.
    * `left` Número (opcional) - A margem esquerda da página web impressa, em pixels.
    * `right` Número (opcional) - A margem certa da página web impressa, em pixels.
  * `landscape` Boolean (opcional) - Se a página da Web deve ser impressa no modo paisagem. Por padrão é `false`.
  * `scaleFactor` Número (opcional) - O fator escala da página web.
  * `pagesPerSheet` Número (opcional) - O número de páginas para imprimir por folha de página.
  * `collate` Boolean (opcional) - Se a página da Web deve ser colhida.
  * `copies` Número (opcional) - O número de cópias da página web para imprimir.
  * `pageRanges` Object[] (opcional) - O intervalo de página para imprimir. No macOS, apenas uma faixa é honrada. 
        * número `from` - Índice da primeira página a ser impressa (baseada em 0).
    * número `to` - Índice da última página para imprimir (inclusive) (0-based).
  * `duplexMode` String (opcional) - Defina o modo duplex da página web impressa. Pode ser `simplex`, `shortEdge`ou `longEdge`.
  * `dpi` Record<string, number> (opcional) 
        * `horizontal` Número (opcional) - O dpi horizontal.
    * `vertical` Número (opcional) - O dpi vertical.
  * `header` String (opcional) - String a ser impresso como cabeçalho de página.
  * `footer` String (opcional) - String a ser impresso como rodapé de página.
  * | de cordas `pageSize` Tamanho (opcional) - Especifique o tamanho da página do documento impresso. Pode ser `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` ou um objeto contendo `height`.
* função `callback` (opcional)
  
    * `success` Boolean - Indica o sucesso da chamada de impressão.
  * `failureReason` String - Descrição do erro chamada de volta se a impressão falhar.

Quando uma `pageSize` personalizada é aprovada, o Chromium tenta validar valores mínimos específicos da plataforma para `width_microns` e `height_microns`. Largura e altura devem ser mínimas de 353 mícrons, mas podem ser mais altas em alguns sistemas operacionais.

Imprime a página da janela. Quando `silent` estiver definida para `true`, a Electron escolherá impressora padrão do sistema se `deviceName` estiver vazia e as configurações padrão para impressão.

Use `page-break-before: always;` estilo CSS para forçar a impressão em uma nova página.

Uso de exemplo:



```js
opções de const = {
  silencioso: verdadeiro,
  dispositivoNo nome: 'Minha impressora',
  pageRanges: [{
    from: 0,
    to: 1
  }]
}
win.webContents.print(opções, (sucesso, erroType) => {
  se (!sucesso) console.log(errorType)
})
```




#### `contents.printToPDF(options)`

* objeto `options`
  
    * `headerFooter` Gravar<string, string> (opcional) - o cabeçalho e o rodapé para o PDF. 
        * `title` String - O título para o cabeçalho PDF.
    * `url` String - a url para o rodapé PDF.
  * `landscape` Booleano (opcional) - `true` para paisagem, `false` para retrato.
  * `marginsType` Inteiro (opcional) - Especifica o tipo de margem a ser usada. Usa 0 para margem padrão, 1 para nenhuma margem e 2 para margem mínima.
  * `scaleFactor` Número (opcional) - O fator escala da página web. Pode variar de 0 a 100.
  * `pageRanges` Record<string, number> (opcional) - A faixa de página para imprimir. 
        * número `from` - Índice da primeira página a ser impressa (baseada em 0).
    * número `to` - Índice da última página para imprimir (inclusive) (0-based).
  * | de cordas `pageSize` Tamanho (opcional) - Especifique o tamanho da página do PDF gerado. Pode ser `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` ou um Objeto contendo `height` e `width` em mícrons.

  * `printBackground` Boolean (opcional) - Se imprimir os fundos CSS.

  * `printSelectionOnly` Boolean (opcional) - Somente para imprimir a seleção.

Devoluções `Promise<Buffer>` - Resolve com os dados PDF gerados.

Imprime a página da web da janela como PDF com a visualização do Chromium imprimindo configurações personalizadas de .

O `landscape` será ignorado se `@page` regra do CSS for usada na página da Web.

Por padrão, uma `options` vazia será considerada como:



```javascript
{ margens
  Só: 0,
  impressãoVerme: falso,
  printSelectionOnly: falso,
  paisagem: falso,
  pageSize: 'A4',
  scaleFactor: 100
}
```


Use `page-break-before: always;` estilo CSS para forçar a impressão em uma nova página.

Um exemplo de `webContents.printToPDF`:



```javascript
const { BrowserWindow } = require ('electron')
const fs = require('fs')
caminho const = require('path')
const os = require('os')

vitória const = novo BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com
    ')

win.webContents.on ('did-finish-load', () => {
  // Use opções de impressão padrão
  win.webContents.printToPDF({}).então(dados => {
    const pdfPath = path.join(os.homedir(), 'Desktop', 'temp.pdf')
    fs.writeFile(pdfPath, dados, (erro) => {
      se (erro) jogar erro
      console.log('Escreveu PDF com sucesso para ${pdfPath}')
    })
  }).catch(erro => { console .log('Não conseguiu gravar PDF para ${pdfPath}: ', erro)
  })
})
```




#### `contents.addWorkSpace(path)`

* `path` String

Adiciona o caminho especificado ao espaço de trabalho DovTools. Deve ser usado após a criação DevTools:



```javascript
const { BrowserWindow } = require ('electron')
const win = novo BrowserWindow()
win.webContents.on('devtools-aberto', () => {
  win.webContents.addWorkSpace(__dirname)
})
```




#### `contents.removeWorkSpace(path)`

* `path` String

Remove o caminho especificado do espaço de trabalho DovTools.



#### `contents.setDevToolsWebContents(devToolsWebContents)`

* `devToolsWebContents` WebContents

Usa o `devToolsWebContents` como alvo `WebContents` para mostrar devtools.

O `devToolsWebContents` não deve ter feito nenhuma navegação, e não deve ser usado para outros fins após a chamada.

Por padrão, a Electron gerencia os devtools criando uma `WebContents` interna com visão nativa, da qual os desenvolvedores têm controle muito limitado. Com o método `setDevToolsWebContents` , os desenvolvedores podem usar qualquer `WebContents` para mostrar os devtools nele, incluindo `BrowserWindow`, `BrowserView` e tag `<webview>` .

Note que fechar as ferramentas não destrói o `devToolsWebContents`, é responsabilidade do chamador destruir `devToolsWebContents`.

Um exemplo de mostrar devtools em uma tag `<webview>` :



```html
<html>
<head>
  <style type="text/css">
    * { margem: 0; }
    #browser { altura: 70%; }
    #devtools { altura: 30%; }
  </style>
</head>
<body>
  <webview id="browser" src="https://github.com"></webview>
  <webview id="devtools" src="about:blank"></webview>
  <script>
    const { ipcRenderer } = require ('electron')
    const emitidoOnce = (elemento, eventName) => nova Promessa(resolver => {
      elemento.addEventListener(eventName, evento => resolver (evento), { once: true })
    })
    navegador constView = document.getElementById('browser')
    const devtoolsVer = document.getElementById('devtools')
    navegador constReady = emitidoOnce (browserView , 'dom-ready')
    const devtoolsReady = emitidoOnce(devtoolsView, 'dom-ready')
    Promise.all([browserReady, devtoolsReady]).então(() => {
      const targetId = browserView.getWebContentsId()
      const devtoolsId = devtoolsView.getWebContentsId()
      ipcRenderer.send('open-devtools', targetId, devtoolsId)
    })
  </script>
</body>
</html>
```




```js
Processo principal
const { ipcMain, webContents } = require ('elétron')
ipcMain.on ('open-devtools', (evento, targetContentsId, devtoolsContentsId) => {
  alvo const = webContents.fromId (targetContentsId)
  const devtools = webContents.fromId(devtoolsContentsId)
  alvo.setDevToolsWebContents(devtools)
  target.openDevTools()
})
```


Um exemplo de mostrar devtools em um `BrowserWindow`:



```js
const { app, BrowserWindow } = require ('electron')

deixar vencer = nulo
deixar devtools =

nulo app.whenReady().then(((() => {
  win = novo BrowserWindow()
  devtools = novo BrowserWindow()
  win.loadURL ('https://github.com')
  win.webContents.setDevToolsWebContents(devtools.webContents)
  win.webContents.openDevTools ({ mode: 'detach' })
})
```




#### `contents.openDevTools([options])`

* objeto `options` (opcional) 
    * `mode` String - Abre as ferramentas com estado de doca especificado, pode ser `right`, `bottom`, `undocked`, `detach`. Inadimplência para o último estado de doca usado. No modo `undocked` é possível voltar atrás. No `detach` modo não é.
  * `activate` Booleano (opcional) - Se levar a janela de devtools aberta para o primeiro plano. O padrão é `verdadeiro`.

Abre os devtools.

Quando `contents` é uma tag `<webview>` , o `mode` seria `detach` por padrão, passar explicitamente um `mode` vazio pode forçar o uso do último estado de doca usado.



#### `contents.closeDevTools()`

Fecha os devtools.



#### `contents.isDevToolsOpened()`

Retornos `Boolean` - Se os devtools são abertos.



#### `contents.isDevToolsFocused()`

Retornos `Boolean` - Se a visão de devtools está focada .



#### `contents.toggleDevTools()`

Alterna as ferramentas do desenvolvedor.



#### `conteúdo.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Começa a inspecionar elemento na posição (`x`, `y`).



#### `contents.inspectSharedWorker()`

Abre as ferramentas do desenvolvedor para o contexto do trabalhador compartilhado.



#### `contents.inspectSharedWorkerById (workerId)`

* `workerId` Cordas

Inspeciona o trabalhador compartilhado com base em sua ID.



#### `contents.getAllSharedWorkers()`

Retornos [`SharedWorkerInfo[]`](structures/shared-worker-info.md) - Informações sobre todos os Trabalhadores Compartilhados.



#### `contents.inspectServiceWorker()`

Abre as ferramentas de desenvolvedor para o contexto do trabalhador de serviços.



#### `contents.send(canal, ... args)`

* `channel` Cordas
* `...args` qualquer[]

Envie uma mensagem assíncroda para o processo de renderização via `channel`, juntamente com argumentos. Os argumentos serão serializados com o algoritmo de clones estruturados [][SCA], assim como [`postMessage`][], para que as cadeias de protótipos não sejam incluídas . O envio de funções, promessas, símbolos, weakmaps ou WeakSets lançará uma exceção.



> ****NOTE : O envio de tipos JavaScript não padrão, como objetos DOM ou objetos elétrons especiais, lançará uma exceção.

O processo de renderização pode lidar com a mensagem ouvindo `channel` com o módulo [`ipcRenderer`](ipc-renderer.md) .

Um exemplo de envio de mensagens do processo principal para o processo de renderização:



```javascript
// No processo main.
const { app, BrowserWindow } = require ('electron')
let win = null

app.whenReady().(()=> {
  win = novo BrowserWindow({ width: 800, height: 600 })
  win.loadURL('arquivo://${__dirname}/index.html')
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('ping', 'whoooooooh!')
  }) 
})
```




```html<!-- índice.html --><html>
<body>
  <script>
    requerem ('elétron').ipcRenderer.on('ping', (evento, mensagem) => { console
      .log(mensagem) // Imprime 'whoooooooh!'
    })
  </script>
</body>
</html>
```




#### `contents.sendToFrame (frameId, canal, ... args)`

* `frameId` | Integer [número, número] - o ID do quadro para enviar, ou um par de de `[processId, frameId]` se o quadro estiver em um processo diferente do quadro principal .

* `channel` Cordas

* `...args` qualquer[]

Envie uma mensagem assíncroda para um quadro específico em um processo de renderização via `channel`, juntamente com argumentos. Os argumentos serão serializados com o</a>do Algoritmo de Clone Estruturado , assim como [`postMessage`][], para que as cadeias de protótipo não sejam incluídas. O envio de funções, promessas, símbolos, weakmaps ou WeakSets lançará uma exceção.</p> 



> **NOTA:** Enviar tipos JavaScript não padrão, como objetos DOM ou objetos elétrons especiais, lançará uma exceção.

O processo de renderização pode lidar com a mensagem ouvindo `channel` com o módulo [`ipcRenderer`](ipc-renderer.md) .

Se você quiser obter a `frameId` de um determinado contexto renderizador, você deve usar o valor `webFrame.routingId` .  Ex.



```js
Em um processo de renderização
console.log('Meu frameId é:', requer ('elétron').webFrame.routingId)
```


Você também pode ler `frameId` de todas as mensagens IPC recebidas no processo principal.



```js
No processo principal
ipcMain.on ('ping', (evento) => {
  console.info('Mensagem veio de frameId:', event.frameId)
})
```




#### `contents.postMessage(canal, mensagem [transfer])`

* `channel` Cordas
* `message` qualquer
* `transfer` MessagePortMain[] (opcional)

Envie uma mensagem para o processo de renderização, transferindo opcionalmente a propriedade de zero ou mais [`MessagePortMain`][] objetos.

Os objetos `MessagePortMain` transferidos estarão disponíveis no processo de renderização acessando a propriedade `ports` do evento emitido. Quando chegar na renderização, serão objetos nativos do DOM `MessagePort` .

Como por exemplo:



```js
Principal processo
const { port1, port2 } = novo MessageChannelMain()
webContents.postMessage ('port', { message: 'hello' }, [port1])

// Processo renderer
ipcRenderer.on('port', (e, msg) => {
  const [port] = e.ports
  // ...
})
```




#### `contents.enableDeviceEmulation(parâmetros)`

* objeto `parameters`
  
    * `screenPosition` String - Especifique o tipo de tela para emular (padrão: `desktop`):
    
        * `desktop` - Tipo de tela de desktop.
    * `mobile` - Tipo de tela móvel.
  * `screenSize` [Tamanho](structures/size.md) - Defina o tamanho da tela emulada (screenPosition == mobile).
  * `viewPosition` [point](structures/point.md) - Posicione a visualização na tela (screenPosition == mobile) (padrão: `{ x: 0, y: 0 }`).

  * `deviceScaleFactor` Inteiro - Defina o fator de escala do dispositivo (se zero padrão para fator de escala original do dispositivo) (padrão: `0`).

  * `viewSize` [Tamanho](structures/size.md) - Defina o tamanho da vista emulada (vazio significa sem substituição)

  * `scale` Float - Escala de visualização emulada dentro do espaço disponível (não em condições de modo de exibição) (padrão: `1`).

Habilite a emulação do dispositivo com os parâmetros determinados.



#### `contents.desabilitarDeviceEmulação()`

Desativar a emulação do dispositivo habilitada por `webContents.enableDeviceEmulation`.



#### `contents.sendInputEvent (inputEvent)`

* `inputEvent` [](structures/mouse-input-event.md) | do MouseInputEvent</a> | mousewheelevent de  [KeyboardInputEvent](structures/keyboard-input-event.md)</li> </ul> 
  
  Envia uma `event` de entrada para a página. **Nota:** O [`BrowserWindow`](browser-window.md) contendo o conteúdo precisa estar focado para `sendInputEvent()` funcionar.
  
  

#### `conteúdo.beginFrameSubscription([onlyDirty ]callback)`

* `onlyDirty` Booleano (opcional) - Inadimplência para `false`.
* `callback` Function 
    * `image` [NativeImage](native-image.md)
  * </a>de Retângulo `dirtyRect` </li> </ul></li> </ul> 
    
    Comece a se inscrever para eventos de apresentação e quadros capturados, o `callback` será chamado com `callback(image, dirtyRect)` quando houver uma apresentação evento.
    
    O `image` é um exemplo de [NativeImage](native-image.md) que armazena o quadro capturado.
    
    O `dirtyRect` é um objeto com propriedades `x, y, width, height` que descreve qual parte da página foi repintada. Se `onlyDirty` estiver definido para `true`, `image` conterá apenas a área repintada. `onlyDirty` inadimplência para `false`.
    
    

#### `conteúdo.endFrameSubscription()`

Final de inscrição para eventos de apresentação de quadros.



#### `contents.startDrag(item)`

* objeto `item` 
    * | de `file` String String - O caminho(s) para o arquivo(s) sendo arrastado.
  * `icon` [NativeImage](native-image.md) | String - A imagem deve ser não vazia no macOS.

Define o `item` como item de arrasto para a operação de arrastar-drop atual, `file` é o caminho absoluto do arquivo a ser arrastado, e `icon` é a imagem que mostra sob cursor ao arrastar.



#### `contents.savePage (fullPath, saveType)`

* `fullPath` String - O caminho completo do arquivo.
* `saveType` String - Especifique o tipo de salvamento. 
    * `HTMLOnly` - Salve apenas o HTML da página.
  * `HTMLComplete` - Salve a página completa html.
  * `MHTML` - Salve a página completa como MHTML.

Devoluções `Promise<void>` - resolve se a página for salva.



```javascript
const { BrowserWindow } = require ('electron')
const win = novo BrowserWindow()

win.loadURL ('https://github.com')

win.webContents.on ('did-finish-load', async () => {
  win.webContents.savePage('/tmp/test.html', 'HTMLComplete').então(() => {
    console.log('Page foi salvo com sucesso.')
  }).catch(err => { console
    .log(err)
  })
})
```




#### `contents.showDefinitionForSelection()` no _macOS_

Mostra o dicionário pop-up que pesquisa a palavra selecionada na página.



#### `contents.isOffscreen()`

Devolução `Boolean` - Indica se *renderização offscreen* está habilitada.



#### `contents.startPainting()`

Se *renderização offscreen* estiver habilitada e não pintar, comece a pintar.



#### `contents.stopPainting()`

Se *renderização offscreen* estiver habilitada e pintar, pare de pintar.



#### `contents.isPainting()`

Devoluções `Boolean` - Se *renderização offscreen* for habilitado retorna se ele está atualmente pintando.



#### `contents.setFrameRate(fps)`

* `fps` Integer

Se *renderização offscreen* estiver habilitada, definirá a taxa de quadros para o número especificado. Apenas valores entre 1 e 240 são aceitos.



#### `contents.getFrameRate()`

Retornos `Integer` - Se *renderização offscreen* estiver habilitado, a taxa de quadros atual.



#### `conteúdo.invalidate()`

Agenda uma repintação completa da janela em que este conteúdo da Web está.

Se *renderização offscreen* estiver habilitado invalida o quadro e gera um novo através do evento `'paint'` .



#### `contents.getWebRTCIPHandlingPolicy()`

Devolução `String` - Retorna a Política de Manuseio de IP do WebRTC.



#### `conteúdo.setWebRTCIPHandlingPolicy(política)`

* `policy` String - Especifique a Política de Manuseio de IP do WebRTC.
  
    * `default` - Expõe os IPs públicos e locais do usuário. Este é o comportamento padrão . Quando essa política é usada, o WebRTC tem o direito de enumerar todas as interfaces e vinculá-las a descobrir interfaces públicas.

  * `default_public_interface_only` - Expõe o IP público do usuário, mas não expõe o IP local do usuário. Quando esta política for usada, o WebRTC deve usar apenas a rota padrão usada por http. Isso não expõe nenhum endereço local.

  * `default_public_and_private_interfaces` - Expõe os IPs públicos e locais do usuário . Quando esta política for usada, o WebRTC deve usar apenas a rota padrão usada por http. Isso também expõe o endereço privado padrão associado. A rota padrão é a rota escolhida pelo SO em um ponto final multi-homed.

  * `disable_non_proxied_udp` - Não expõe IPs públicos ou locais. Quando essa política de for usada, o WebRTC só deve usar o TCP para contatar pares ou servidores, a menos que servidor proxy suporte o UDP.

Definir a política de manipulação de IP do WebRTC permite que você controle quais IPs estão expostos via WebRTC. Consulte [browserLeaks](https://browserleaks.com/webrtc) para mais detalhes.



#### `contents.getOSProcessId()`

Devoluções `Integer` - O sistema operacional `pid` do processo de renderizador associado.



#### `contents.getProcessId()`

Retorna `Integer` - A `pid` interna do Cromo do renderizador associado. Pode ser comparado com o `frameProcessId` passado por de navegação específicos de quadro (por exemplo. `did-frame-navigate`)



#### `contents.takeHeapSnapshot(filePath)`

* `filePath` String - Caminho para o arquivo de saída.

Devoluções `Promise<void>` - Indica se o snapshot foi criado com sucesso.

Tira um instantâneo de pilha V8 e salva-o para `filePath`.



#### `contents.getBackgroundThrottling()`

Retorna `Boolean` - se este WebContents irá ou não acelerar animações e temporizadores quando a página ficar em segundo plano. Isso também afeta a API de visibilidade da página.



#### `conteúdo.setBackgroundThrottling (permitido)`

* `allowed` Booleano

Controla se este WebContents irá ou não acelerar animações e temporizadores quando a página ficar em segundo plano. Isso também afeta a API de visibilidade da página.



#### `contents.getType()`

Retorna `String` - o tipo de webContent. Pode ser `backgroundPage`, `window`, `browserView`, `remote`, `webview` ou `offscreen`.



### Propriedades de Instância



#### `conteúdo.audioMuted`

Uma propriedade `Boolean` que determina se esta página é silenciada.



#### `contents.userAgent`

Uma propriedade `String` que determina o usuário para esta página da Web.



#### `conteúdo.zoomLevel`

Uma propriedade `Number` que determina o nível de zoom para este conteúdo da Web.

O tamanho original é 0 e cada incremento acima ou abaixo representa um zoom de 20% maior ou menor para limites padrão de 300% e 50% do tamanho original, respectivamente. A fórmula para isso é `scale := 1.2 ^ level`.



#### `conteúdo.zoomFactor`

Uma propriedade `Number` que determina o fator zoom para este conteúdo da Web.

O fator zoom é a porcentagem de zoom dividida por 100, então 300% = 3,0.



#### `conteúdo.frameRate`

Uma propriedade `Integer` que define a taxa de quadros do conteúdo da Web para o número especificado. Apenas valores entre 1 e 240 são aceitos.

Só é aplicável se *renderização offscreen* estiver ativada.



#### `contents.id` _Readonly_

Um `Integer` representando o ID exclusivo deste WebContents. Cada ID é único entre todas as `WebContents` instâncias de toda a aplicação electron.



#### `contents.session` _Readonly_

Uma [`Session`](session.md) usada por este webContents.



#### `contents.hostWebContents` _Readonly_

Um caso [`WebContents`](web-contents.md) que pode ser dono deste `WebContents`.



#### `contents.devToolsWebContents` _Readonly_

Uma propriedade `WebContents | null` que representa o de DevTools `WebContents` associada a uma determinada `WebContents`.

**Nota:** Os usuários nunca devem armazenar esse objeto porque ele pode se tornar `null` quando o DevTools for fechado.



#### `contents.debugger` _Readonly_

Um [`Debugger`](debugger.md) exemplo para este webContents.



#### `conteúdo.backgroundThrottling`

Uma propriedade `Boolean` que determina se este WebContents irá ou não acelerar animações e temporizadores quando a página ficar em segundo plano. Isso também afeta a API de visibilidade da página.



#### `contents.mainFrame` _Readonly_

Uma propriedade [`WebFrameMain`](web-frame-main.md) que representa o quadro superior da hierarquia de quadros da página.

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[`postMessage`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
