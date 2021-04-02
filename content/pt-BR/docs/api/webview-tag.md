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
    * `httpReferrer` (| de cordas [Referidor](structures/referrer.md)) (opcional) - Uma url http referrer.
  * `userAgent` String (opcional) - Um agente do usuário originário da solicitação.
  * `extraHeaders` String (opcional) - Cabeçalhos extras separados por "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md)) (opcional)
  * `baseURLForDataURL` String (opcional) - Url base (com separador de caminho de trailing) para que os arquivos sejam carregados pela url de dados. Isso só é necessário se o `url` especificado for uma url de dados e precisar carregar outros arquivos.

Devoluções `Promise<void>` - A promessa será resolvida quando a página terminar de carregar (ver [`did-finish-load`](webview-tag.md#event-did-finish-load)), e rejeita se a página não carregar (ver [`did-fail-load`](webview-tag.md#event-did-fail-load)).

Carrega o `url` no webview, o `url` deve conter o prefixo do protocolo, por exemplo, o `http://` ou `file://`.



### `<webview>.downloadURL(url)`

* String `url`

Inicia um download do recurso em `url` sem navegar.



### `<webview>.getURL()`

Devoluções `String` - A URL da página de convidados.



### `<webview>.getTitle()`

Retorna `String` - O título de página de convidado.



### `<webview>.isLoading()`

Devoluções `Boolean` - Se a página do hóspede ainda está carregando recursos.



### `<webview>.isLoadingMainFrame()`

Devoluções `Boolean` - Se o quadro principal (e não apenas serames ou quadros dentro dele) está ainda carregando.



### `<webview>.isWaitingForResponse()`

Devoluções `Boolean` - Se a página do convidado está esperando uma primeira resposta para o principal recurso da página.



### `<webview>.stop()`

Interrompe qualquer navegação pendente.



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

Limpa o histórico de navegação.



### `<webview>.goBack()`

Faz a página de convidados voltar.



### `<webview>.goForward()`

Faz a página do convidado ir para a frente.



### `<webview>.goToIndex(índice)`

* `index` Integer

Navega até o índice absoluto especificado.



### `<webview>.goToOffset(offset)`

* `offset` Integer

Navega até o deslocamento especificado da "entrada atual".



### `<webview>.isCrashed()`

Devoluções `Boolean` - Se o processo de renderização caiu.



### `<webview>.setUserAgent (userAgent)`

* `userAgent` Cordas

Substitui o agente de usuário para a página de convidados.



### `<webview>.getUserAgent()`

Devolução `String` - O usuário é o agente de página de hóspedes.



### `<webview>.insertCSS(css)`

* `css` Cordas

Devoluções `Promise<String>` - Uma promessa que se resolve com uma chave para o CSS inserido que pode ser usada posteriormente para remover o CSS via `<webview>.removeInsertedCSS(key)`.

Injeta CSS na página web atual e retorna uma chave exclusiva para a folha de inserida.



### `<webview>.removeInsertedCSS(chave)`

* `key` Cordas

Devoluções `Promise<void>` - Resolve se a remoção foi bem sucedida.

Remove o CSS inserido da página web atual. A folha de estilo é identificada por sua chave, que é devolvida de `<webview>.insertCSS(css)`.



### `<webview>.executeJavaScript(código[, userGesture])`

* `code` String
* `userGesture` Booleano (opcional) - `false`padrão .

Devoluções `Promise<any>` - Uma promessa que resolve com o resultado do código executado ou é rejeitada se o resultado do código for uma promessa rejeitada.

Avalia `code` na página. Se `userGesture` for definido, criará o contexto de gestos do usuário na página. APIs HTML como `requestFullScreen`, que exigem ação do usuário, podem aproveitar essa opção para automação.



### `<webview>.openDevTools()`

Abre uma janela de DevTools para a página de convidados.



### `<webview>.closeDevTools()`

Fecha a janela de convidados do DevTools.



### `<webview>.isDevToolsOpened()`

Devoluções `Boolean` - Se a página de hóspedes tiver uma janela DevTools anexada.



### `<webview>.isDevToolsFocused()`

Retornos `Boolean` - Se a janela de hóspedes da DevTools está focada.



### `<webview>.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Começa a inspecionar elementos na posição (`x`, `y`) da página de convidados.



### `<webview>.inspectSharedWorker()`

Abre o DevTools para o contexto do trabalhador compartilhado presente na página de convidados.



### `<webview>.inspectServiceWorker()`

Abre o DevTools para o contexto do trabalhador de serviços presente na página de convidados.



### `<webview>.setAudioMuted(silenciado)`

* `muted` Booleano

Definir página de convidado silenciado.



### `<webview>.isAudioMuted()`

Devoluções `Boolean` - Se a página de hóspedes foi silenciada.



### `<webview>.isCurrentlyAudible()`

Retorna `Boolean` - Se o áudio está sendo reproduzido no momento.



### `<webview>.desfazer()`

Executa o comando de edição `undo` na página.



### `<webview>.redo()`

Executa o comando de edição `redo` na página.



### `<webview>.cut()`

Executa o comando de edição `cut` na página.



### `<webview>.copy()`

Executa o comando de edição `copy` na página.



### `<webview>.colar()`

Executa o comando de edição `paste` na página.



### `<webview>.pasteAndMatchStyle()`

Executa o comando de edição `pasteAndMatchStyle` na página.



### `<webview>.delete()`

Executa o comando de edição `delete` na página.



### `<webview>.selectAll()`

Executa o comando de edição `selectAll` na página.



### `<webview>.unselect()`

Executa o comando de edição `unselect` na página.



### `<webview>.substituir (texto)`

* `text` String

Executa o comando de edição `replace` na página.



### `<webview>.substituirMessestra(texto)`

* `text` String

Executa o comando de edição `replaceMisspelling` na página.



### `<webview>.insertText(texto)`

* `text` String

Retornos `Promise<void>`

Insere `text` ao elemento focal.



### `<webview>.findInPage(texto[, opções])`

* `text` String - Conteúdo a ser pesquisado, não deve estar vazio.
* objeto `options` (opcional) 
    * `forward` Booleano (opcional) - Quer pesquise para frente ou para trás, é padrão para `true`.
  * `findNext` Booleano (opcional) - Se a operação é primeira solicitação ou um acompanhamento, inadimplência para `false`.
  * `matchCase` Booleano (opcional) - Se a pesquisa deve ser sensível a casos, padrão para `false`.

Devolução `Integer` - O id de solicitação utilizado para a solicitação.

Inicia uma solicitação para encontrar todas as partidas para o `text` na página web. O resultado da solicitação pode ser obtido mediante a inscrição [`found-in-page`](webview-tag.md#event-found-in-page) evento.



### `<webview>.stopFindInPage(ação)`

* `action` String - Especifica que a ação ocorrerá ao encerrar [`<webview>.findInPage`](#webviewfindinpagetext-options) solicitação.
  
    * `clearSelection` - Limpe a seleção.
  * `keepSelection` - Traduza a seleção em uma seleção normal.
  * `activateSelection` - Concentre-se e clique no nó de seleção.

Solicitamos `findInPage` solicitação `webview` fornecida `action`s.



### `<webview>.print ([options])`

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
  * `pageRanges` Object[] (opcional) - O intervalo de página para imprimir. 
        * número `from` - Índice da primeira página a ser impressa (baseada em 0).
    * número `to` - Índice da última página para imprimir (inclusive) (0-based).
  * `duplexMode` String (opcional) - Defina o modo duplex da página web impressa. Pode ser `simplex`, `shortEdge`ou `longEdge`.
  * `dpi` Record<string, number> (opcional) 
        * `horizontal` Número (opcional) - O dpi horizontal.
    * `vertical` Número (opcional) - O dpi vertical.
  * `header` String (opcional) - String a ser impresso como cabeçalho de página.
  * `footer` String (opcional) - String a ser impresso como rodapé de página.
  * | de cordas `pageSize` Tamanho (opcional) - Especifique o tamanho da página do documento impresso. Pode ser `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` ou um objeto contendo `height`.

Retornos `Promise<void>`

Impressões `webview`página da web. O mesmo que `webContents.print([options])`.



### `<webview>.printToPDF(opções)`

* objeto `options`
  
    * `headerFooter` Gravar<string, string> (opcional) - o cabeçalho e o rodapé para o PDF. 
        * `title` String - O título para o cabeçalho PDF.
    * `url` String - a url para o rodapé PDF.
  * `landscape` Booleano (opcional) - `true` para paisagem, `false` para retrato.
  * `marginsType` Inteiro (opcional) - Especifica o tipo de margem a ser usada. Usa 0 para margem padrão, 1 para nenhuma margem e 2 para margem mínima. e `width` em mícrons.
  * `scaleFactor` Número (opcional) - O fator escala da página web. Pode variar de 0 a 100.
  * `pageRanges` Record<string, number> (opcional) - A faixa de página para imprimir. No macOS, apenas a primeira gama é honrada. 
        * número `from` - Índice da primeira página a ser impressa (baseada em 0).
    * número `to` - Índice da última página para imprimir (inclusive) (0-based).
  * | de cordas `pageSize` Tamanho (opcional) - Especifique o tamanho da página do PDF gerado. Pode ser `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` ou um objeto contendo `height`

  * `printBackground` Boolean (opcional) - Se imprimir os fundos CSS.

  * `printSelectionOnly` Boolean (opcional) - Somente para imprimir a seleção.

Devoluções `Promise<Uint8Array>` - Resolve com os dados PDF gerados.

Imprime `webview`página da web como PDF, o mesmo que `webContents.printToPDF(options)`.



### `<webview>.capturePage ([rect])`

* `rect` [Retângulo](structures/rectangle.md) (opcional) - A área da página a ser capturada.

Retorna `Promise<NativeImage>` - Resolve com um</a>NativeImage </p> 

Captura um instantâneo da página dentro de `rect`. Omitir `rect` capturará toda a página visível.



### `<webview>.enviar (canal, ... args)`

* `channel` Cordas
* `...args` qualquer[]

Retornos `Promise<void>`

Envie uma mensagem assíncroda para o processo de renderização via `channel`, você também pode enviar argumentos arbitrários. O processo de renderização pode lidar com a mensagem ouvir o evento `channel` com o módulo [`ipcRenderer`](ipc-renderer.md) .

Consulte [webContents.enviar](web-contents.md#contentssendchannel-args) para exemplos.



### `<webview>.sendInputEvent(evento)`

* `event`  [](structures/mouse-input-event.md) | do MouseInputEvent</a> | mousewheelevent de  [KeyboardInputEvent](structures/keyboard-input-event.md)</li> </ul> 
  
  Retornos `Promise<void>`
  
  Envia uma `event` de entrada para a página.
  
  Consulte [webContents.sendInputEvent](web-contents.md#contentssendinputeventinputevent) para obter uma descrição detalhada do objeto `event` .
  
  

### `<webview>.setZoomFactor(fator)`

* `factor` Número - Fator Zoom.

Altera o fator de zoom para o fator especificado. O fator zoom é por cento de zoom dividido por 100, então 300% = 3,0.



### `<webview>.setZoomLevel(nível)`

* número `level` - Nível de zoom.

Altera o nível de zoom para o nível especificado. O tamanho original é 0 e cada incremento acima ou abaixo representa um zoom 20% maior ou menor para padrão limites de 300% e 50% do tamanho original, respectivamente. A fórmula para isso é `scale := 1.2 ^ level`.



> **NOTA**: A política de zoom no nível do Chromium é de mesma origem, o que significa que o nível de zoom para um domínio específico se propaga em todas as instâncias de janelas com mesmo domínio. Diferenciar os URLs da janela fará com que o zoom funcione por janela.



### `<webview>.getZoomFactor()`

Retorna `Number` - o fator zoom atual.



### `<webview>.getZoomLevel()`

Retorna `Number` - o nível de zoom atual.



### `<webview>.setVisualZoomLevelLimits(mínimoNível, máximoNível)`

* Número de `minimumLevel`
* Número de `maximumLevel`

Retornos `Promise<void>`

Define o nível máximo e mínimo de pinch-to-zoom.



### `<webview>.showDefinitionForSelection()` __macOS

Mostra o dicionário pop-up que pesquisa a palavra selecionada na página.



### `<webview>.getWebContentsId()`

Retornos `Number` - O ID webcontents deste `webview`.



## Eventos DOM

Os seguintes eventos DOM estão disponíveis para a tag `webview` :



### Evento: 'load-commit'

Retorna:

* String `url`
* `isMainFrame` Booleano

Disparado quando uma carga se compromete. Isso inclui a navegação dentro do documento de atual, bem como cargas de nível de documento de subquadro, mas não inclui cargas de recursos assíncronsas.



### Evento: 'fez-acabamento-carga'

Acionado quando a navegação estiver pronta, o rotador da guia deixará de girar e o `onload` evento é despachado.



### Evento: 'did-fail-load'

Retorna:

* `errorCode` Integer
* `errorDescription` Cordas
* `validatedURL` Cordas
* `isMainFrame` Booleano

Este evento é como `did-finish-load`, mas disparado quando a carga falhou ou foi cancelado, por exemplo. `window.stop()` é invocado.



### Evento: 'did-frame-finish-load'

Retorna:

* `isMainFrame` Booleano

Disparado quando um quadro fez navegação.



### Evento: 'fez-start-loading'

Corresponde aos pontos no tempo em que o rotador da guia começa a girar.



### Evento: 'fez stop-loading'

Corresponde aos pontos no tempo em que o rotador da guia pára de girar.



### Evento: 'dom-ready'

Acionado quando o documento no quadro dado é carregado.



### Evento: 'page-title-updated'

Retorna:

* `title` String
* `explicitSet` Boolean

Acionado quando o título da página é definido durante a navegação. `explicitSet` é falso quando título é sintetizado a partir de url de arquivo.



### Evento: 'page-title-updated'

Retorna:

* `favicons` String[] - Array de URLs.

Acionado quando a página recebe urls favicon.



### Evento: 'enter-html-full-screen'

Acionado quando a página entra na tela cheia acionada pela API HTML.



### Evento: 'leave-html-full-screen'

Acionado quando a página sai da tela cheia acionada pela API HTML.



### Evento: 'console-message'

Retorna:

* `level` Inteiro - O nível de registro, de 0 a 3. Para que corresponda a `verbose`, `info`, `warning` e `error`.
* `message` String - A mensagem real do console
* `line` Integer - O número de linha da fonte que acionou esta mensagem de console
* `sourceId` Cordas

Acionado quando a janela do hóspede registra uma mensagem de console.

O código de exemplo a seguir encaminha todas as mensagens de registro para o console do incorporador sem considerar o nível de log ou outras propriedades.



```javascript
const webview = document.querySelector ('webview')
webview.addEventListener('console-message', (e) => {
  console.log ('Página do hóspede registrou uma mensagem:', e.message)
})
```




### Evento: 'encontrado na página'

Retorna:

* objeto `result` 
    * `requestId` Integer
  * `activeMatchOrdinal` Integer - Posição do jogo ativo.
  * `matches` Inteiro - Número de Partidas.
  * `selectionArea` Retângulo - Coordenadas da primeira região do jogo.
  * `finalUpdate` Booleano

Demitido quando um resultado está disponível para [`webview.findInPage`](#webviewfindinpagetext-options) solicitação.



```javascript
const webview = document.querySelector ('webview')
webview.addEventListener('found-in-page', (e) => {
  webview.stopFindInPage('keepSelection')
})

pedido constIdId = webview.findInPage('test')
console.log(solicitação)
```




### Evento: 'new-window'

Retorna:

* String `url`
* `frameName` String
* `disposition` String - Pode ser `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` e `other`.

* `options` BrowserWindowConstructorOptions - As opções que devem ser usadas para criar o novo [`BrowserWindow`](browser-window.md).

Acionado quando a página do hóspede tenta abrir uma nova janela do navegador.

O código de exemplo a seguir abre a nova url no navegador padrão do sistema.



```javascript
const { shell } = require ('electron')
const webview = document.querySelector ('webview')

webview.addEventListener ('nova janela', async (e) => {
  protocolo const = (novo URL(e.url)).protocolo
  se (protocolo === 'http:' protocolo || === 'https:') {
    aguardam shell.openExternal(e.url)
  }
})
```




### Evento: 'will-navigate'

Retorna:

* String `url`

Emitido quando um usuário ou a página quiser iniciar a navegação. Isso pode acontecer quando o objeto `window.location` é alterado ou um usuário clica em um link na página.

Este evento não emitirá quando a navegação for iniciada programáticamente com APIs como `<webview>.loadURL` e `<webview>.back`.

Ele também não é emitido durante a navegação na página, como clicar em links de âncora ou atualizar o `window.location.hash`. Use `did-navigate-in-page` evento para este propósito.

Ligar `event.preventDefault()` não ____ tem qualquer efeito.



### Evento: 'did-navigate'

Retorna:

* String `url`

Emitido quando uma navegação é feita.

Este evento não é emitido para navegaçãos na página, como clicar em links de âncora ou atualizar o `window.location.hash`. Use `did-navigate-in-page` evento para este propósito.



### Evento: 'fez navegação na página'

Retorna:

* `isMainFrame` Booleano
* String `url`

Emitido quando uma navegação na página aconteceu.

Quando a navegação na página acontece, a URL da página muda, mas não causa navegação fora da página. Exemplos disso ocorrendo são quando links de âncora são clicados ou quando o evento `hashchange` DOM é acionado.



### Evento: 'close'

Demitido quando a página do convidado tenta fechar-se.

O código de exemplo a seguir navega pelo `webview` para `about:blank` quando o convidado tenta se fechar.



```javascript
const webview = document.querySelector ('webview')
webview.addEventListener('close', () => {
  webview.src = 'about:blank'
})
```




### Evento: 'ipc-message'

Retorna:

* `channel` Cordas
* `args` qualquer[]

Demitido quando a página do convidado enviou uma mensagem assíncroda para a página do incorporador.

Com `sendToHost` método e `ipc-message` evento, você pode comunicar entre a página do convidado e a página do incorporador:



```javascript
Na página do embedder.
const webview = document.querySelector ('webview')
webview.addEventListener('ipc-message', (evento) => {
  console.log(event.channel)
  // Prints "pong"
})
webview.send('ping')
```




```javascript
Na página de convidados.
const { ipcRenderer } = require ('electron')
ipcRenderer.on('ping', () => {
  ipcRenderer.sendToHost('pong')
})
```




### Evento: 'caiu'

Disparado quando o processo de renderização é travado.



### Evento: 'plugin-crash'

Retorna:

* `name` String
* `version` Cordas

Disparado quando um processo de plugin é travado.



### Evento: 'destruído'

Disparado quando os WebContents são destruídos.



### Evento: 'media-started-playing'

Emitido quando a mídia começa a jogar.



### Evento: 'media-paused'

Emitido quando a mídia é pausada ou feita de reprodução.



### Evento: 'did-change-tema-color'

Retorna:

* `themeColor` Cordas

Emitido quando a cor do tema de uma página muda. Isso geralmente é devido ao encontro de uma meta tag:



```html
<meta name='theme-color' content='#ff0000'>
```




### Evento: 'update-target-url'

Retorna:

* String `url`

Emitido quando o mouse se move sobre um link ou o teclado move o foco para um link.



### Evento: 'devtools-abertos'

Emitido quando o DevTools é aberto.



### Evento: 'devtools-fechados'

Emitido quando DevTools é fechado.



### Evento: 'focado em devtools'

Emitido quando o DevTools está focado /aberto.

[runtime-enabled-features]: https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70
