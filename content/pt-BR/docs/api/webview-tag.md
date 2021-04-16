# `<webview>` Tag

## Aviso

A tag `webview` de Electron é baseada na `webview`</a>de

Chromium, que está passando por mudanças arquitetônicas dramáticas. Isso impacta na estabilidade de `webviews`, incluindo renderização, navegação e roteamento de eventos. Atualmente recomendamos não usar a tag `webview` e considerar alternativas, como `iframe`, `BrowserView`da Electron, ou uma arquitetura que evite o conteúdo incorporado completamente.</p> 



## Permitindo

Por padrão, a tag `webview` é desativada em >eletrônica = 5.  Você precisa ativar a tag definindo a opção `webviewTag` webPreferências ao construir seu `BrowserWindow`. Para mais informações, consulte os</a>de  do construtor browserwindow .</p> 



## Visão Geral



> Exibir conteúdo externo da Web em um quadro e processo isolados.

Processo: [Renderizador](../glossary.md#renderer-process)

Use a tag `webview` para incorporar conteúdo 'convidado' (como páginas da Web) em seu aplicativo Electron. O conteúdo do hóspede está contido no contêiner `webview` . Uma página incorporada dentro do seu aplicativo controla como o conteúdo do hóspede é definido e renderizado.

Ao contrário de um `iframe`, o `webview` é executado em um processo separado do seu aplicativo . Ele não tem as mesmas permissões que sua página web e todas as interações entre seu aplicativo e conteúdo incorporado serão assíncronsas. Isso mantém seu aplicativo seguro do conteúdo incorporado. **Nota:** A maioria dos métodos chamados na webview da página host exige uma chamada síncron sua para o processo principal.



## Exemplo

Para incorporar uma página da Web em seu aplicativo, adicione a tag `webview` à página de incorporadora do seu aplicativo (esta é a página do aplicativo que exibirá o conteúdo do convidado). Em sua forma mais simples de , a tag `webview` inclui a `src` da página web e estilos css que controlar a aparência do contêiner `webview` :



```html
<webview id="foo" src="https://www.github.com/" style="display:inline-flex; width:640px; height:480px"></webview>
```


Se você quiser controlar o conteúdo do hóspede de alguma forma, você pode escrever JavaScript que ouça `webview` eventos e responda a esses eventos usando os métodos `webview` . Aqui está o código de exemplo com dois ouvintes de eventos: um que ouve para a página da Web começar a carregar, o outro para a página da web parar de carregar, e exibe um "carregamento..." mensagem durante o tempo de carga:



```html
<script>
  onload = () => {
    const webview = document.querySelector ('webview')
    indicador de const = document.querySelector ('.indicador')

    início de carga const = () => {
      indicador.innerText = 'carregamento...'
    }

    const loadstop = () => {
      indicador.innerText = ''
    }

    webview.addEventListener('did-start-loading', loadstart)
    webview.addEventListener ('did-stop-loading', loadstop)
  }
</script>
```




## Implementação interna

Sob o capô `webview` é implementado com [iframes fora de processo (OOPIFs)](https://www.chromium.org/developers/design-documents/oop-iframes). A tag `webview` é essencialmente um elemento personalizado usando o DOM sombra para envolver um elemento `iframe` dentro dele.

Assim, o comportamento de `webview` é muito semelhante a um `iframe`de domínio cruzado, como exemplos:

* Ao clicar em um `webview`, o foco da página passará do quadro incorporador para `webview`.

* Você não pode adicionar ouvintes de eventos de teclado, mouse e pergaminho ao `webview`.

* Todas as reações entre o quadro do embedder e `webview` são assíncrodas.



## Notas de estilo CSS

Observe que o estilo da tag `webview` usa `display:flex;` internamente para garantir que o elemento `iframe` criança preencha toda a altura e largura de seu recipiente `webview` quando usado com layouts tradicionais e flexbox. Por favor, não sobreescreva a propriedade CSS padrão `display:flex;` , a menos que especifique `display:inline-flex;` para layout inline.



## Atributos de tag

A tag `webview` tem os seguintes atributos:



### `src`



```html
<webview src="https://www.github.com/"></webview>
```


Um `String` representando a URL visível. Escrever para este atributo inicia navegação de alto nível .

Atribuir `src` seu próprio valor recarregará a página atual.

O atributo `src` também pode aceitar URLs de dados, como `data:text/plain,Hello, world!`.



### `nodeintegration`



```html
<webview src="http://www.google.com/" nodeintegration></webview>
```


Um `Boolean`. Quando este atributo estiver presente, a página de convidados em `webview` terá integração de nós e poderá usar APIs de nó como `require` e `process` para acessar recursos de sistema de baixo nível . A integração de nó é desativada por padrão na página do hóspede.



### `nodeintegrationinsubframes`



```html
<webview src="http://www.google.com/" nodeintegrationinsubframes></webview>
```


Um `Boolean` para a opção experimental para habilitar o suporte nodeJS em subquadrados, como de iframes dentro do `webview`. Todas as suas pré-cargas serão carregadas para cada iframe, você pode usar `process.isMainFrame` para determinar se você está no quadro principal ou não. Esta opção é desativada por padrão na página do convidado.



### `habilitarmodule`



```html
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```


Um `Boolean`. Quando este atributo estiver `false` página de hóspedes em `webview` não terá acesso ao módulo [`remote`](remote.md) . O módulo remoto não está disponível por padrão.



### `plugins`



```html
<webview src="https://www.github.com/" plugins></webview>
```


Um `Boolean`. Quando este atributo estiver presente, a página de convidados `webview` poderá usar plugins do navegador. Os plugins são desativados por padrão.



### `Pré-carga`



```html
<webview src="https://www.github.com/" preload="./test.js"></webview>
```


Um `String` que especifica um script que será carregado antes que outros scripts sejam executados na página convidado. O protocolo da URL do script deve ser `file:` ou `asar:`, porque será carregado por `require` na página de convidados sob o capô.

Quando a página de convidado não tiver integração de nó, este script ainda terá acesso a todas as APIs do Nó, mas objetos globais injetados pelo Node serão excluídos após este script terminar de ser executado.

**Nota:** Esta opção aparecerá como `preloadURL` (não `preload`) em o `webPreferences` especificado para o evento `will-attach-webview` .



### `httpreferrer`



```html
<webview src="https://www.github.com/" httpreferrer="http://cheng.guru"></webview>
```


Um `String` que define a URL do remetente para a página de convidados.



### `Useragent`



```html
<webview src="https://www.github.com/" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"></webview>
```


Um `String` que define o agente do usuário para a página de convidados antes da página ser navegada. Uma vez que a página seja carregada, use o método `setUserAgent` para alterar o agente do usuário.



### `desativar a segurança da teia`



```html
<webview src="https://www.github.com/" disablewebsecurity></webview>
```


Um `Boolean`. Quando este atributo estiver presente, a página do convidado terá a segurança da Web desativada. A segurança da Web está ativada por padrão.



### `Partição`



```html
<webview src="https://github.com" partition="persist:github"></webview>
<webview src="https://electronjs.org" partition="electron"></webview>
```


Um `String` que define a sessão usada pela página. Se `partition` começar com `persist:`, a página usará uma sessão persistente disponível para todas as páginas do aplicativo com o mesmo `partition`. se não houver `persist:` prefixo, a página usará uma sessão na memória. Ao atribuir o mesmo `partition`, várias páginas podem compartilhar mesma sessão. Se o `partition` não for definido, a sessão padrão do aplicativo será usada.

Esse valor só pode ser modificado antes da primeira navegação, uma vez que a sessão de um processo de renderização ativa não pode ser alterada. As tentativas subsequentes de modificar o valor falharão com uma exceção do DOM.



### `permite popups`



```html
<webview src="https://www.github.com/" allowpopups></webview>
```


Um `Boolean`. Quando este atributo estiver presente, a página do convidado poderá abrir novas janelas . Popups são desativados por padrão.



### `webpreferências`



```html
<webview src="https://github.com" webpreferences="allowRunningInsecureContent, javascript=no"></webview>
```


Um `String` que é uma lista separada de séries que especifica as preferências da Web a serem definidas no webview. A lista completa de strings de preferência suportadas pode ser encontrada em [browserwindow](browser-window.md#new-browserwindowoptions).

A sequência segue o mesmo formato que a string de recursos em `window.open`. Um nome por si só é dado um `true` valor booleano. Uma preferência pode ser definida para outro valor, incluindo um `=`, seguido pelo valor. Valores `yes` e `1` são interpretados como `true`, enquanto `no` e `0` são interpretados como `false`.



### `habilitar características deblink`



```html
<webview src="https://www.github.com/" enableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```


Um `String` que é uma lista de strings que especifica os recursos de piscar a serem ativados separados por `,`. A lista completa de strings de recursos suportados pode ser encontrada no arquivo [RuntimeEnabledFeatures.json][runtime-enabled-features] 5.



### `desativação de características delink`



```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```


Um `String` que é uma lista de strings que especifica os recursos de pisca-pisca a serem desativados separados por `,`. A lista completa de strings de recursos suportados pode ser encontrada no arquivo [RuntimeEnabledFeatures.json][runtime-enabled-features] 5.



## Métodos

A tag `webview` tem os seguintes métodos:

**Nota:** O elemento webview deve ser carregado antes de usar os métodos.

**Exemplo**



```javascript
const webview = document.querySelector ('webview')
webview.addEventListener('dom-ready', () => {
  webview.openDevTools()
})
```




### `<webview>.loadURL(url[, opções])`

* `url` URL
* objeto `options` (opcional) 
    * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer url.
  * `userAgent` String (opcional) - Um agente do usuário originário da solicitação.
  * `extraHeaders` String (opcional) - Cabeçalhos extras separados por "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md)) (opcional)
  * `baseURLForDataURL` String (optional) - Base url (with trailing path separator) for files to be loaded by the data url. This is needed only if the specified `url` is a data url and needs to load other files.

Devoluções `Promise<void>` - A promessa será resolvida quando a página terminar de carregar (ver [`did-finish-load`](webview-tag.md#event-did-finish-load)), e rejeita se a página não carregar (ver [`did-fail-load`](webview-tag.md#event-did-fail-load)).

Carrega o `url` no webview, o `url` deve conter o prefixo do protocolo, por exemplo, o `http://` ou `file://`.



### `<webview>.downloadURL(url)`

* String `url`

Initiates a download of the resource at `url` without navigating.



### `<webview>.getURL()`

Devoluções `String` - A URL da página de convidados.



### `<webview>.getTitle()`

Retorna `String` - O título de página de convidado.



### `<webview>.isLoading()`

Devoluções `Boolean` - Se a página do hóspede ainda está carregando recursos.



### `<webview>.isLoadingMainFrame()`

Returns `Boolean` - Whether the main frame (and not just iframes or frames within it) is still loading.



### `<webview>.isWaitingForResponse()`

Devoluções `Boolean` - Se a página do convidado está esperando uma primeira resposta para o principal recurso da página.



### `<webview>.stop()`

Stops any pending navigation.



### `<webview>.reload()`

Recarrega a página do convidado.



### `<webview>.reloadIgnoringCache()`

Recarrega a página do convidado e ignora o cache.



### `<webview>.canGoBack()`

Devoluções `Boolean` - Se a página de convidados pode voltar.



### `<webview>.canGoForward()`

Devoluções `Boolean` - Se a página de convidados pode ir para a frente.



### `<webview>.canGoToOffset(offset)`

* `offset` Integer

Devolução `Boolean` - Se a página de convidados pode ir para `offset`.



### `<webview>.clearHistory()`

Clears the navigation history.



### `<webview>.goBack()`

Faz a página de convidados voltar.



### `<webview>.goForward()`

Faz a página do convidado ir para a frente.



### `<webview>.goToIndex(índice)`

* `index` Integer

Navega até o índice absoluto especificado.



### `<webview>.goToOffset(offset)`

* `offset` Integer

Navigates to the specified offset from the "current entry".



### `<webview>.isCrashed()`

Returns `Boolean` - Whether the renderer process has crashed.



### `<webview>.setUserAgent (userAgent)`

* `userAgent` String

Substitui o agente de usuário para a página de convidados.



### `<webview>.getUserAgent()`

Devolução `String` - O usuário é o agente de página de hóspedes.



### `<webview>.insertCSS(css)`

* `css` String

Devoluções `Promise<String>` - Uma promessa que se resolve com uma chave para o CSS inserido que pode ser usada posteriormente para remover o CSS via `<webview>.removeInsertedCSS(key)`.

Injects CSS into the current web page and returns a unique key for the inserted stylesheet.



### `<webview>.removeInsertedCSS(chave)`

* `key` Cordas

Returns `Promise<void>` - Resolves if the removal was successful.

Removes the inserted CSS from the current web page. The stylesheet is identified by its key, which is returned from `<webview>.insertCSS(css)`.



### `<webview>.executeJavaScript(code[, userGesture])`

* `code` String
* `userGesture` Boolean (optional) - Default `false`.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Evaluates `code` in page. If `userGesture` is set, it will create the user gesture context in the page. HTML APIs like `requestFullScreen`, which require user action, can take advantage of this option for automation.



### `<webview>.openDevTools()`

Opens a DevTools window for guest page.



### `<webview>.closeDevTools()`

Closes the DevTools window of guest page.



### `<webview>.isDevToolsOpened()`

Returns `Boolean` - Whether guest page has a DevTools window attached.



### `<webview>.isDevToolsFocused()`

Returns `Boolean` - Whether DevTools window of guest page is focused.



### `<webview>.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Starts inspecting element at position (`x`, `y`) of guest page.



### `<webview>.inspectSharedWorker()`

Opens the DevTools for the shared worker context present in the guest page.



### `<webview>.inspectServiceWorker()`

Opens the DevTools for the service worker context present in the guest page.



### `<webview>.setAudioMuted(muted)`

* `muted` Boolean

Set guest page muted.



### `<webview>.isAudioMuted()`

Returns `Boolean` - Whether guest page has been muted.



### `<webview>.isCurrentlyAudible()`

Returns `Boolean` - Whether audio is currently playing.



### `<webview>.undo()`

Executes editing command `undo` in page.



### `<webview>.redo()`

Executes editing command `redo` in page.



### `<webview>.cut()`

Executes editing command `cut` in page.



### `<webview>.copy()`

Executes editing command `copy` in page.



### `<webview>.paste()`

Executes editing command `paste` in page.



### `<webview>.pasteAndMatchStyle()`

Executes editing command `pasteAndMatchStyle` in page.



### `<webview>.delete()`

Executes editing command `delete` in page.



### `<webview>.selectAll()`

Executes editing command `selectAll` in page.



### `<webview>.unselect()`

Executes editing command `unselect` in page.



### `<webview>.replace(text)`

* `text` String

Executes editing command `replace` in page.



### `<webview>.replaceMisspelling(text)`

* `text` String

Executes editing command `replaceMisspelling` in page.



### `<webview>.insertText(text)`

* `text` String

Retornos `Promise<void>`

Inserts `text` to the focused element.



### `<webview>.findInPage(text[, options])`

* `text` String - Content to be searched, must not be empty.
* objeto `options` (opcional) 
    * `forward` Boolean (optional) - Whether to search forward or backward, defaults to `true`.
  * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.

Returns `Integer` - The request id used for the request.

Starts a request to find all matches for the `text` in the web page. The result of the request can be obtained by subscribing to [`found-in-page`](webview-tag.md#event-found-in-page) event.



### `<webview>.stopFindInPage(action)`

* `action` String - Specifies the action to take place when ending [`<webview>.findInPage`](#webviewfindinpagetext-options) request.
  
    * `clearSelection` - Clear the selection.
  * `keepSelection` - Translate the selection into a normal selection.
  * `activateSelection` - Focus and click the selection node.

Stops any `findInPage` request for the `webview` with the provided `action`.



### `<webview>.print([options])`

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
  * `pageRanges` Object[] (optional) - The page range to print. 
        * `from` Number - Index of the first page to print (0-based).
    * `to` Number - Index of the last page to print (inclusive) (0-based).
  * `duplexMode` String (optional) - Set the duplex mode of the printed web page. Can be `simplex`, `shortEdge`, or `longEdge`.
  * `dpi` Record<string, number> (optional) 
        * `horizontal` Number (optional) - The horizontal dpi.
    * `vertical` Number (optional) - The vertical dpi.
  * `header` String (optional) - String to be printed as page header.
  * `footer` String (optional) - String to be printed as page footer.
  * `pageSize` String | Size (optional) - Specify page size of the printed document. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height`.

Retornos `Promise<void>`

Prints `webview`'s web page. Same as `webContents.print([options])`.



### `<webview>.printToPDF(options)`

* objeto `options`
  
    * `headerFooter` Record<string, string> (optional) - the header and footer for the PDF. 
        * `title` String - The title for the PDF header.
    * `url` String - the url for the PDF footer.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin. and `width` in microns.
  * `scaleFactor` Number (optional) - The scale factor of the web page. Can range from 0 to 100.
  * `pageRanges` Record<string, number> (optional) - The page range to print. On macOS, only the first range is honored. 
        * `from` Number - Index of the first page to print (0-based).
    * `to` Number - Index of the last page to print (inclusive) (0-based).
  * `pageSize` String | Size (optional) - Specify page size of the generated PDF. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height`

  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.

  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.

Returns `Promise<Uint8Array>` - Resolves with the generated PDF data.

Prints `webview`'s web page as PDF, Same as `webContents.printToPDF(options)`.



### `<webview>.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The area of the page to be captured.

Retorna `Promise<NativeImage>` - Resolve com um</a>NativeImage </p> 

Captura um instantâneo da página dentro de `rect`. Omitir `rect` capturará toda a página visível.



### `<webview>.send(channel, ...args)`

* `channel` Cordas
* `...args` qualquer[]

Retornos `Promise<void>`

Send an asynchronous message to renderer process via `channel`, you can also send arbitrary arguments. The renderer process can handle the message by listening to the `channel` event with the [`ipcRenderer`](ipc-renderer.md) module.

See [webContents.send](web-contents.md#contentssendchannel-args) for examples.



### `<webview>.sendInputEvent(event)`

* `event`  [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

Retornos `Promise<void>`

Sends an input `event` to the page.

See [webContents.sendInputEvent](web-contents.md#contentssendinputeventinputevent) for detailed description of `event` object.



### `<webview>.setZoomFactor(factor)`

* `factor` Number - Zoom factor.

Changes the zoom factor to the specified factor. Zoom factor is zoom percent divided by 100, so 300% = 3.0.



### `<webview>.setZoomLevel(level)`

* `level` Number - Zoom level.

Changes the zoom level to the specified level. The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively. The formula for this is `scale := 1.2 ^ level`.



> **NOTE**: The zoom policy at the Chromium level is same-origin, meaning that the zoom level for a specific domain propagates across all instances of windows with the same domain. Differentiating the window URLs will make zoom work per-window.



### `<webview>.getZoomFactor()`

Returns `Number` - the current zoom factor.



### `<webview>.getZoomLevel()`

Returns `Number` - the current zoom level.



### `<webview>.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Retornos `Promise<void>`

Sets the maximum and minimum pinch-to-zoom level.



### `<webview>.showDefinitionForSelection()` _macOS_

Shows pop-up dictionary that searches the selected word on the page.



### `<webview>.getWebContentsId()`

Returns `Number` - The WebContents ID of this `webview`.



## DOM Events

The following DOM events are available to the `webview` tag:



### Event: 'load-commit'

Retorna:

* String `url`
* `isMainFrame` Boolean

Fired when a load has committed. This includes navigation within the current document as well as subframe document-level loads, but does not include asynchronous resource loads.



### Event: 'did-finish-load'

Fired when the navigation is done, i.e. the spinner of the tab will stop spinning, and the `onload` event is dispatched.



### Event: 'did-fail-load'

Retorna:

* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean

This event is like `did-finish-load`, but fired when the load failed or was cancelled, e.g. `window.stop()` is invoked.



### Event: 'did-frame-finish-load'

Retorna:

* `isMainFrame` Boolean

Fired when a frame has done navigation.



### Event: 'did-start-loading'

Corresponds to the points in time when the spinner of the tab starts spinning.



### Event: 'did-stop-loading'

Corresponds to the points in time when the spinner of the tab stops spinning.



### Event: 'dom-ready'

Fired when document in the given frame is loaded.



### Evento: 'page-title-updated'

Retorna:

* `title` String
* `explicitSet` Boolean

Fired when page title is set during navigation. `explicitSet` is false when title is synthesized from file url.



### Evento: 'page-title-updated'

Retorna:

* `favicons` String[] - Array de URLs.

Fired when page receives favicon urls.



### Evento: 'enter-html-full-screen'

Fired when page enters fullscreen triggered by HTML API.



### Evento: 'leave-html-full-screen'

Fired when page leaves fullscreen triggered by HTML API.



### Evento: 'console-message'

Retorna:

* `level` Integer - The log level, from 0 to 3. Para que corresponda a `verbose`, `info`, `warning` e `error`.
* `message` String - A mensagem real do console
* `line` Integer - The line number of the source that triggered this console message
* `sourceId` String

Fired when the guest window logs a console message.

The following example code forwards all log messages to the embedder's console without regard for log level or other properties.



```javascript
const webview = document.querySelector('webview')
webview.addEventListener('console-message', (e) => {
  console.log('Guest page logged a message:', e.message)
})
```




### Event: 'found-in-page'

Retorna:

* `result` Object 
    * `requestId` Integer
  * `activeMatchOrdinal` Integer - Position of the active match.
  * `matches` Integer - Number of Matches.
  * `selectionArea` Rectangle - Coordinates of first match region.
  * `finalUpdate` Boolean

Fired when a result is available for [`webview.findInPage`](#webviewfindinpagetext-options) request.



```javascript
const webview = document.querySelector('webview')
webview.addEventListener('found-in-page', (e) => {
  webview.stopFindInPage('keepSelection')
})

const requestId = webview.findInPage('test')
console.log(requestId)
```




### Evento: 'new-window'

Retorna:

* String `url`
* `frameName` String
* `disposition` String - Can be `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` and `other`.

* `options` BrowserWindowConstructorOptions - The options which should be used for creating the new [`BrowserWindow`](browser-window.md).

Fired when the guest page attempts to open a new browser window.

The following example code opens the new url in system's default browser.



```javascript
const { shell } = require('electron')
const webview = document.querySelector('webview')

webview.addEventListener('new-window', async (e) => {
  const protocol = (new URL(e.url)).protocol
  if (protocol === 'http:' || protocol === 'https:') {
    await shell.openExternal(e.url)
  }
})
```




### Evento: 'will-navigate'

Retorna:

* String `url`

Emitted when a user or the page wants to start navigation. It can happen when the `window.location` object is changed or a user clicks a link in the page.

This event will not emit when the navigation is started programmatically with APIs like `<webview>.loadURL` and `<webview>.back`.

It is also not emitted during in-page navigation, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Calling `event.preventDefault()` does __NOT__ have any effect.



### Event: 'did-navigate'

Retorna:

* String `url`

Emitted when a navigation is done.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.



### Event: 'did-navigate-in-page'

Retorna:

* `isMainFrame` Boolean
* String `url`

Emitted when an in-page navigation happened.

When in-page navigation happens, the page URL changes but does not cause navigation outside of the page. Examples of this occurring are when anchor links are clicked or when the DOM `hashchange` event is triggered.



### Evento: 'close'

Fired when the guest page attempts to close itself.

The following example code navigates the `webview` to `about:blank` when the guest attempts to close itself.



```javascript
const webview = document.querySelector('webview')
webview.addEventListener('close', () => {
  webview.src = 'about:blank'
})
```




### Event: 'ipc-message'

Retorna:

* `channel` Cordas
* `args` any[]

Fired when the guest page has sent an asynchronous message to embedder page.

With `sendToHost` method and `ipc-message` event you can communicate between guest page and embedder page:



```javascript
// In embedder page.
const webview = document.querySelector('webview')
webview.addEventListener('ipc-message', (event) => {
  console.log(event.channel)
  // Prints "pong"
})
webview.send('ping')
```




```javascript
// In guest page.
const { ipcRenderer } = require('electron')
ipcRenderer.on('ping', () => {
  ipcRenderer.sendToHost('pong')
})
```




### Event: 'crashed'

Fired when the renderer process is crashed.



### Event: 'plugin-crashed'

Retorna:

* `name` String
* `version` String

Fired when a plugin process is crashed.



### Event: 'destroyed'

Fired when the WebContents is destroyed.



### Event: 'media-started-playing'

Emitted when media starts playing.



### Event: 'media-paused'

Emitted when media is paused or done playing.



### Event: 'did-change-theme-color'

Retorna:

* `themeColor` String

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:



```html
<meta name='theme-color' content='#ff0000'>
```




### Event: 'update-target-url'

Retorna:

* String `url`

Emitted when mouse moves over a link or the keyboard moves the focus to a link.



### Event: 'devtools-opened'

Emitted when DevTools is opened.



### Event: 'devtools-closed'

Emitted when DevTools is closed.



### Event: 'devtools-focused'

Emitted when DevTools is focused / opened.

[runtime-enabled-features]: https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70
