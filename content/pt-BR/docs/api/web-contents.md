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
* `image` [NativeImage](native-image.md) (optional)
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

* `userAgent` String

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

* `handler` Function<{action: 'deny'} | {action: 'allow', overrideBrowserWindowOptions?: BrowserWindowConstructorOptions}>
  
    * objeto `details` 
        * `url` String - The _resolved_ version of the URL passed to `window.open()`. e.g. opening a window with `window.open('foo')` will yield something like `https://the-origin/the/current/path/foo`.
    * `frameName` String - Name of the window provided in `window.open()`
    * `features` String - Comma separated list of window features provided to `window.open()`.
Returns `{action: 'deny'} | {action: 'allow', overrideBrowserWindowOptions?: BrowserWindowConstructorOptions}` - `deny` cancels the creation of the new window. `allow` will allow the new window to be created. Specifying `overrideBrowserWindowOptions` allows customization of the created window. Returning an unrecognized value such as a null, undefined, or an object without a recognized 'action' value will result in a console error and have the same effect as returning `{action: 'deny'}`.

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

Sets the maximum and minimum pinch-to-zoom level.



> **NOTE**: Visual zoom is disabled by default in Electron. To re-enable it, call:
> 
> ```js
> contents.setVisualZoomLevelLimits(1, 3)
> ```



#### `contents.undo()`

Executes the editing command `undo` in web page.



#### `contents.redo()`

Executes the editing command `redo` in web page.



#### `contents.cut()`

Executes the editing command `cut` in web page.



#### `contents.copy()`

Executes the editing command `copy` in web page.



#### `contents.copyImageAt(x, y)`

* `x` Integer
* `y` Integer

Copy the image at the given position to the clipboard.



#### `contents.paste()`

Executes the editing command `paste` in web page.



#### `contents.pasteAndMatchStyle()`

Executes the editing command `pasteAndMatchStyle` in web page.



#### `contents.delete()`

Executes the editing command `delete` in web page.



#### `contents.selectAll()`

Executes the editing command `selectAll` in web page.



#### `contents.unselect()`

Executes the editing command `unselect` in web page.



#### `contents.replace(text)`

* `text` String

Executes the editing command `replace` in web page.



#### `contents.replaceMisspelling(text)`

* `text` String

Executes the editing command `replaceMisspelling` in web page.



#### `contents.insertText(text)`

* `text` String

Retornos `Promise<void>`

Inserts `text` to the focused element.



#### `contents.findInPage(text[, options])`

* `text` String - Content to be searched, must not be empty.
* objeto `options` (opcional) 
    * `forward` Boolean (optional) - Whether to search forward or backward, defaults to `true`.
  * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.

Returns `Integer` - The request id used for the request.

Starts a request to find all matches for the `text` in the web page. The result of the request can be obtained by subscribing to [`found-in-page`](web-contents.md#event-found-in-page) event.



#### `contents.stopFindInPage(action)`

* `action` String - Specifies the action to take place when ending [`webContents.findInPage`] request.
  
    * `clearSelection` - Clear the selection.
  * `keepSelection` - Translate the selection into a normal selection.
  * `activateSelection` - Focus and click the selection node.

Stops any `findInPage` request for the `webContents` with the provided `action`.



```javascript
const { webContents } = require('electron')
webContents.on('found-in-page', (event, result) => {
  if (result.finalUpdate) webContents.stopFindInPage('clearSelection')
})

const requestId = webContents.findInPage('api')
console.log(requestId)
```




#### `contents.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The area of the page to be captured.

Retorna `Promise<NativeImage>` - Resolve com um</a>NativeImage </p> 

Captura um instantâneo da página dentro de `rect`. Omitir `rect` capturará toda a página visível.



#### `contents.isBeingCaptured()`

Returns `Boolean` - Whether this page is being captured. It returns true when the capturer count is large then 0.



#### `contents.incrementCapturerCount([size, stayHidden])`

* `size` [Size](structures/size.md) (optional) - The preferred size for the capturer.
* `stayHidden` Boolean (optional) -  Keep the page hidden instead of visible.

Increase the capturer count by one. The page is considered visible when its browser window is hidden and the capturer count is non-zero. If you would like the page to stay hidden, you should ensure that `stayHidden` is set to true.

This also affects the Page Visibility API.



#### `contents.decrementCapturerCount([stayHidden])`

* `stayHidden` Boolean (optional) -  Keep the page in hidden state instead of visible.

Decrease the capturer count by one. The page will be set to hidden or occluded state when its browser window is hidden or occluded and the capturer count reaches zero. If you want to decrease the hidden capturer count instead you should set `stayHidden` to true.



#### `contents.getPrinters()`

Get the system printer list.

Returns [`PrinterInfo[]`](structures/printer-info.md)



#### `contents.print([options], [callback])`

* objeto `options` (opcional)
  
    * `silent` Boolean (optional) - Don't ask user for print settings. Por padrão é `false`.
  * `printBackground` Boolean (optional) - Prints the background color and image of the web page. Por padrão é `false`.
  * `deviceName` String (optional) - Set the printer device name to use. Must be the system-defined name and not the 'friendly' name, e.g 'Brother_QL_820NWB' and not 'Brother QL-820NWB'.
  * `color` Boolean (optional) - Set whether the printed web page will be in color or grayscale. O padrão é `true`.
  * `margins` Object (optional) 
        * `marginType` String (optional) - Can be `default`, `none`, `printableArea`, or `custom`. If `custom` is chosen, you will also need to specify `top`, `bottom`, `left`, and `right`.
    * `top` Number (optional) - The top margin of the printed web page, in pixels.
    * `bottom` Number (optional) - The bottom margin of the printed web page, in pixels.
    * `left` Number (optional) - The left margin of the printed web page, in pixels.
    * `right` Number (optional) - The right margin of the printed web page, in pixels.
  * `landscape` Boolean (optional) - Whether the web page should be printed in landscape mode. Por padrão é `false`.
  * `scaleFactor` Number (optional) - The scale factor of the web page.
  * `pagesPerSheet` Number (optional) - The number of pages to print per page sheet.
  * `collate` Boolean (optional) - Whether the web page should be collated.
  * `copies` Number (optional) - The number of copies of the web page to print.
  * `pageRanges` Object[]  (optional) - The page range to print. On macOS, only one range is honored. 
        * `from` Number - Index of the first page to print (0-based).
    * `to` Number - Index of the last page to print (inclusive) (0-based).
  * `duplexMode` String (optional) - Set the duplex mode of the printed web page. Can be `simplex`, `shortEdge`, or `longEdge`.
  * `dpi` Record<string, number> (optional) 
        * `horizontal` Number (optional) - The horizontal dpi.
    * `vertical` Number (optional) - The vertical dpi.
  * `header` String (optional) - String to be printed as page header.
  * `footer` String (optional) - String to be printed as page footer.
  * `pageSize` String | Size (optional) - Specify page size of the printed document. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height`.
* `callback` Function (optional)
  
    * `success` Boolean - Indicates success of the print call.
  * `failureReason` String - Error description called back if the print fails.

When a custom `pageSize` is passed, Chromium attempts to validate platform specific minimum values for `width_microns` and `height_microns`. Width and height must both be minimum 353 microns but may be higher on some operating systems.

Prints window's web page. When `silent` is set to `true`, Electron will pick the system's default printer if `deviceName` is empty and the default settings for printing.

Use `page-break-before: always;` CSS style to force to print to a new page.

Example usage:



```js
const options = {
  silent: true,
  deviceName: 'My-Printer',
  pageRanges: [{
    from: 0,
    to: 1
  }]
}
win.webContents.print(options, (success, errorType) => {
  if (!success) console.log(errorType)
})
```




#### `contents.printToPDF(options)`

* objeto `options`
  
    * `headerFooter` Record<string, string> (optional) - the header and footer for the PDF. 
        * `title` String - The title for the PDF header.
    * `url` String - the url for the PDF footer.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `scaleFactor` Number (optional) - The scale factor of the web page. Can range from 0 to 100.
  * `pageRanges` Record<string, number> (optional) - The page range to print. 
        * `from` Number - Index of the first page to print (0-based).
    * `to` Number - Index of the last page to print (inclusive) (0-based).
  * `pageSize` String | Size (optional) - Specify page size of the generated PDF. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height` and `width` in microns.

  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.

  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.

Returns `Promise<Buffer>` - Resolves with the generated PDF data.

Prints window's web page as PDF with Chromium's preview printing custom settings.

The `landscape` will be ignored if `@page` CSS at-rule is used in the web page.

By default, an empty `options` will be regarded as:



```javascript
{
  marginsType: 0,
  printBackground: false,
  printSelectionOnly: false,
  landscape: false,
  pageSize: 'A4',
  scaleFactor: 100
}
```


Use `page-break-before: always;` CSS style to force to print to a new page.

An example of `webContents.printToPDF`:



```javascript
const { BrowserWindow } = require('electron')
const fs = require('fs')
const path = require('path')
const os = require('os')

const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

win.webContents.on('did-finish-load', () => {
  // Use default printing options
  win.webContents.printToPDF({}).then(data => {
    const pdfPath = path.join(os.homedir(), 'Desktop', 'temp.pdf')
    fs.writeFile(pdfPath, data, (error) => {
      if (error) throw error
      console.log(`Wrote PDF successfully to ${pdfPath}`)
    })
  }).catch(error => {
    console.log(`Failed to write PDF to ${pdfPath}: `, error)
  })
})
```




#### `contents.addWorkSpace(path)`

* `path` String

Adds the specified path to DevTools workspace. Must be used after DevTools creation:



```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.webContents.on('devtools-opened', () => {
  win.webContents.addWorkSpace(__dirname)
})
```




#### `contents.removeWorkSpace(path)`

* `path` String

Removes the specified path from DevTools workspace.



#### `contents.setDevToolsWebContents(devToolsWebContents)`

* `devToolsWebContents` WebContents

Uses the `devToolsWebContents` as the target `WebContents` to show devtools.

The `devToolsWebContents` must not have done any navigation, and it should not be used for other purposes after the call.

By default Electron manages the devtools by creating an internal `WebContents` with native view, which developers have very limited control of. With the `setDevToolsWebContents` method, developers can use any `WebContents` to show the devtools in it, including `BrowserWindow`, `BrowserView` and `<webview>` tag.

Note that closing the devtools does not destroy the `devToolsWebContents`, it is caller's responsibility to destroy `devToolsWebContents`.

An example of showing devtools in a `<webview>` tag:



```html
<html>
<head>
  <style type="text/css">
    * { margin: 0; }
    #browser { height: 70%; }
    #devtools { height: 30%; }
  </style>
</head>
<body>
  <webview id="browser" src="https://github.com"></webview>
  <webview id="devtools" src="about:blank"></webview>
  <script>
    const { ipcRenderer } = require('electron')
    const emittedOnce = (element, eventName) => new Promise(resolve => {
      element.addEventListener(eventName, event => resolve(event), { once: true })
    })
    const browserView = document.getElementById('browser')
    const devtoolsView = document.getElementById('devtools')
    const browserReady = emittedOnce(browserView, 'dom-ready')
    const devtoolsReady = emittedOnce(devtoolsView, 'dom-ready')
    Promise.all([browserReady, devtoolsReady]).then(() => {
      const targetId = browserView.getWebContentsId()
      const devtoolsId = devtoolsView.getWebContentsId()
      ipcRenderer.send('open-devtools', targetId, devtoolsId)
    })
  </script>
</body>
</html>
```




```js
// Main process
const { ipcMain, webContents } = require('electron')
ipcMain.on('open-devtools', (event, targetContentsId, devtoolsContentsId) => {
  const target = webContents.fromId(targetContentsId)
  const devtools = webContents.fromId(devtoolsContentsId)
  target.setDevToolsWebContents(devtools)
  target.openDevTools()
})
```


An example of showing devtools in a `BrowserWindow`:



```js
const { app, BrowserWindow } = require('electron')

let win = null
let devtools = null

app.whenReady().then(() => {
  win = new BrowserWindow()
  devtools = new BrowserWindow()
  win.loadURL('https://github.com')
  win.webContents.setDevToolsWebContents(devtools.webContents)
  win.webContents.openDevTools({ mode: 'detach' })
})
```




#### `contents.openDevTools([options])`

* objeto `options` (opcional) 
    * `mode` String - Opens the devtools with specified dock state, can be `right`, `bottom`, `undocked`, `detach`. Defaults to last used dock state. In `undocked` mode it's possible to dock back. In `detach` mode it's not.
  * `activate` Boolean (optional) - Whether to bring the opened devtools window to the foreground. O padrão é `verdadeiro`.

Opens the devtools.

When `contents` is a `<webview>` tag, the `mode` would be `detach` by default, explicitly passing an empty `mode` can force using last used dock state.



#### `contents.closeDevTools()`

Closes the devtools.



#### `contents.isDevToolsOpened()`

Returns `Boolean` - Whether the devtools is opened.



#### `contents.isDevToolsFocused()`

Returns `Boolean` - Whether the devtools view is focused .



#### `contents.toggleDevTools()`

Toggles the developer tools.



#### `contents.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Starts inspecting element at position (`x`, `y`).



#### `contents.inspectSharedWorker()`

Opens the developer tools for the shared worker context.



#### `contents.inspectSharedWorkerById(workerId)`

* `workerId` String

Inspects the shared worker based on its ID.



#### `contents.getAllSharedWorkers()`

Returns [`SharedWorkerInfo[]`](structures/shared-worker-info.md) - Information about all Shared Workers.



#### `contents.inspectServiceWorker()`

Opens the developer tools for the service worker context.



#### `contents.send(channel, ...args)`

* `channel` Cordas
* `...args` qualquer[]

Send an asynchronous message to the renderer process via `channel`, along with arguments. Arguments will be serialized with the [Structured Clone Algorithm][SCA], just like [`postMessage`][], so prototype chains will not be included. O envio de funções, promessas, símbolos, weakmaps ou WeakSets lançará uma exceção.



> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects will throw an exception.

The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.

An example of sending messages from the main process to the renderer process:



```javascript
// No processo main.
const { app, BrowserWindow } = require('electron')
let win = null

app.whenReady().then(() => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL(`file://${__dirname}/index.html`)
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('ping', 'whoooooooh!')
  }) 
})
```




```html
<!-- index.html -->
<html>
<body>
  <script>
    require('electron').ipcRenderer.on('ping', (event, message) => {
      console.log(message) // Prints 'whoooooooh!'
    })
  </script>
</body>
</html>
```




#### `contents.sendToFrame(frameId, channel, ...args)`

* `frameId` Integer | [number, number] - the ID of the frame to send to, or a pair of `[processId, frameId]` if the frame is in a different process to the main frame.

* `channel` Cordas

* `...args` qualquer[]

Send an asynchronous message to a specific frame in a renderer process via `channel`, along with arguments. Arguments will be serialized with the [Structured Clone Algorithm][SCA], just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.



> **NOTA:** Enviar tipos JavaScript não padrão, como objetos DOM ou objetos elétrons especiais, lançará uma exceção.

The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.

If you want to get the `frameId` of a given renderer context you should use the `webFrame.routingId` value.  Ex.



```js
// In a renderer process
console.log('My frameId is:', require('electron').webFrame.routingId)
```


You can also read `frameId` from all incoming IPC messages in the main process.



```js
// In the main process
ipcMain.on('ping', (event) => {
  console.info('Message came from frameId:', event.frameId)
})
```




#### `contents.postMessage(channel, message, [transfer])`

* `channel` Cordas
* `message` qualquer
* `transfer` MessagePortMain[] (opcional)

Send a message to the renderer process, optionally transferring ownership of zero or more [`MessagePortMain`][] objects.

The transferred `MessagePortMain` objects will be available in the renderer process by accessing the `ports` property of the emitted event. When they arrive in the renderer, they will be native DOM `MessagePort` objects.

Como por exemplo:



```js
// Main process
const { port1, port2 } = new MessageChannelMain()
webContents.postMessage('port', { message: 'hello' }, [port1])

// Renderer process
ipcRenderer.on('port', (e, msg) => {
  const [port] = e.ports
  // ...
})
```




#### `contents.enableDeviceEmulation(parameters)`

* `parameters` Object
  
    * `screenPosition` String - Specify the screen type to emulate (default: `desktop`):
    
        * `desktop` - Desktop screen type.
    * `mobile` - Mobile screen type.
  * `screenSize` [Size](structures/size.md) - Set the emulated screen size (screenPosition == mobile).
  * `viewPosition` [Point](structures/point.md) - Position the view on the screen (screenPosition == mobile) (default: `{ x: 0, y: 0 }`).

  * `deviceScaleFactor` Integer - Set the device scale factor (if zero defaults to original device scale factor) (default: `0`).

  * `viewSize` [Size](structures/size.md) - Set the emulated view size (empty means no override)

  * `scale` Float - Scale of emulated view inside available space (not in fit to view mode) (default: `1`).

Enable device emulation with the given parameters.



#### `contents.disableDeviceEmulation()`

Disable device emulation enabled by `webContents.enableDeviceEmulation`.



#### `contents.sendInputEvent(inputEvent)`

* `inputEvent` [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

Sends an input `event` to the page. **Note:** The [`BrowserWindow`](browser-window.md) containing the contents needs to be focused for `sendInputEvent()` to work.



#### `contents.beginFrameSubscription([onlyDirty ,]callback)`

* `onlyDirty` Boolean (optional) - Defaults to `false`.
* `callback` Function 
    * `image` [NativeImage](native-image.md)
  * </a>de Retângulo `dirtyRect` </li> </ul></li> </ul> 
    
    Begin subscribing for presentation events and captured frames, the `callback` will be called with `callback(image, dirtyRect)` when there is a presentation event.
    
    The `image` is an instance of [NativeImage](native-image.md) that stores the captured frame.
    
    The `dirtyRect` is an object with `x, y, width, height` properties that describes which part of the page was repainted. If `onlyDirty` is set to `true`, `image` will only contain the repainted area. `onlyDirty` defaults to `false`.
    
    

#### `contents.endFrameSubscription()`

End subscribing for frame presentation events.



#### `contents.startDrag(item)`

* `item` Object 
    * `file` String[] | String - The path(s) to the file(s) being dragged.
  * `icon` [NativeImage](native-image.md) | String - The image must be non-empty on macOS.

Sets the `item` as dragging item for current drag-drop operation, `file` is the absolute path of the file to be dragged, and `icon` is the image showing under the cursor when dragging.



#### `contents.savePage(fullPath, saveType)`

* `fullPath` String - The full file path.
* `saveType` String - Specify the save type. 
    * `HTMLOnly` - Save only the HTML of the page.
  * `HTMLComplete` - Save complete-html page.
  * `MHTML` - Save complete-html page as MHTML.

Returns `Promise<void>` - resolves if the page is saved.



```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.loadURL('https://github.com')

win.webContents.on('did-finish-load', async () => {
  win.webContents.savePage('/tmp/test.html', 'HTMLComplete').then(() => {
    console.log('Page was saved successfully.')
  }).catch(err => {
    console.log(err)
  })
})
```




#### `contents.showDefinitionForSelection()` no _macOS_

Shows pop-up dictionary that searches the selected word on the page.



#### `contents.isOffscreen()`

Returns `Boolean` - Indicates whether *offscreen rendering* is enabled.



#### `contents.startPainting()`

If *offscreen rendering* is enabled and not painting, start painting.



#### `contents.stopPainting()`

If *offscreen rendering* is enabled and painting, stop painting.



#### `contents.isPainting()`

Returns `Boolean` - If *offscreen rendering* is enabled returns whether it is currently painting.



#### `contents.setFrameRate(fps)`

* `fps` Integer

If *offscreen rendering* is enabled sets the frame rate to the specified number. Only values between 1 and 240 are accepted.



#### `contents.getFrameRate()`

Returns `Integer` - If *offscreen rendering* is enabled returns the current frame rate.



#### `contents.invalidate()`

Schedules a full repaint of the window this web contents is in.

Se *renderização offscreen* estiver habilitado invalida o quadro e gera um novo através do evento `'paint'` .



#### `contents.getWebRTCIPHandlingPolicy()`

Returns `String` - Returns the WebRTC IP Handling Policy.



#### `contents.setWebRTCIPHandlingPolicy(policy)`

* `policy` String - Specify the WebRTC IP Handling Policy.
  
    * `default` - Exposes user's public and local IPs. This is the default behavior. When this policy is used, WebRTC has the right to enumerate all interfaces and bind them to discover public interfaces.

  * `default_public_interface_only` - Exposes user's public IP, but does not expose user's local IP. When this policy is used, WebRTC should only use the default route used by http. This doesn't expose any local addresses.

  * `default_public_and_private_interfaces` - Exposes user's public and local IPs. When this policy is used, WebRTC should only use the default route used by http. This also exposes the associated default private address. Default route is the route chosen by the OS on a multi-homed endpoint.

  * `disable_non_proxied_udp` - Does not expose public or local IPs. When this policy is used, WebRTC should only use TCP to contact peers or servers unless the proxy server supports UDP.

Setting the WebRTC IP handling policy allows you to control which IPs are exposed via WebRTC. See [BrowserLeaks](https://browserleaks.com/webrtc) for more details.



#### `contents.getOSProcessId()`

Returns `Integer` - The operating system `pid` of the associated renderer process.



#### `contents.getProcessId()`

Returns `Integer` - The Chromium internal `pid` of the associated renderer. Can be compared to the `frameProcessId` passed by frame specific navigation events (e.g. `did-frame-navigate`)



#### `contents.takeHeapSnapshot(filePath)`

* `filePath` String - Path to the output file.

Returns `Promise<void>` - Indicates whether the snapshot has been created successfully.

Tira um instantâneo de pilha V8 e salva-o para `filePath`.



#### `contents.getBackgroundThrottling()`

Returns `Boolean` - whether or not this WebContents will throttle animations and timers when the page becomes backgrounded. This also affects the Page Visibility API.



#### `contents.setBackgroundThrottling(allowed)`

* `allowed` Boolean

Controls whether or not this WebContents will throttle animations and timers when the page becomes backgrounded. This also affects the Page Visibility API.



#### `contents.getType()`

Returns `String` - the type of the webContent. Can be `backgroundPage`, `window`, `browserView`, `remote`, `webview` or `offscreen`.



### Propriedades de Instância



#### `contents.audioMuted`

A `Boolean` property that determines whether this page is muted.



#### `contents.userAgent`

A `String` property that determines the user agent for this web page.



#### `contents.zoomLevel`

A `Number` property that determines the zoom level for this web contents.

The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively. The formula for this is `scale := 1.2 ^ level`.



#### `contents.zoomFactor`

A `Number` property that determines the zoom factor for this web contents.

The zoom factor is the zoom percent divided by 100, so 300% = 3.0.



#### `contents.frameRate`

An `Integer` property that sets the frame rate of the web contents to the specified number. Only values between 1 and 240 are accepted.

Only applicable if *offscreen rendering* is enabled.



#### `contents.id` _Readonly_

A `Integer` representing the unique ID of this WebContents. Each ID is unique among all `WebContents` instances of the entire Electron application.



#### `contents.session` _Readonly_

A [`Session`](session.md) used by this webContents.



#### `contents.hostWebContents` _Readonly_

A [`WebContents`](web-contents.md) instance that might own this `WebContents`.



#### `contents.devToolsWebContents` _Readonly_

A `WebContents | null` property that represents the of DevTools `WebContents` associated with a given `WebContents`.

**Note:** Users should never store this object because it may become `null` when the DevTools has been closed.



#### `contents.debugger` _Readonly_

A [`Debugger`](debugger.md) instance for this webContents.



#### `contents.backgroundThrottling`

A `Boolean` property that determines whether or not this WebContents will throttle animations and timers when the page becomes backgrounded. This also affects the Page Visibility API.



#### `contents.mainFrame` _Readonly_

A [`WebFrameMain`](web-frame-main.md) property that represents the top frame of the page's frame hierarchy.

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
[`postMessage`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
