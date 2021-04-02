# Abrindo janelas do renderizador

Existem várias maneiras de controlar como as janelas são criadas a partir de conteúdo confiável ou não confiável dentro de um renderizador. O Windows pode ser criado a partir do renderizador de duas maneiras:

- clicando em links ou enviando formulários adornados com `target=_blank`
- JavaScript chamando `window.open()`

Em renderizadores não sandboxed, ou quando `nativeWindowOpen` é falso (o padrão), isso resulta na criação de um [`BrowserWindowProxy`](browser-window-proxy.md), um invólucro leve em torno de `BrowserWindow`.

No entanto, quando a opção `sandbox` (ou diretamente, `nativeWindowOpen`) é definida, uma `Window` instância é criada, como seria de esperar no navegador. Para a mesma origem conteúdo, a nova janela é criada dentro do mesmo processo, permitindo que o pai acesse diretamente a janela da criança. Isso pode ser muito útil para sub janelas de aplicativos que atuam como painéis de preferência, ou semelhantes, como o pai pode renderizar para a sub-janela diretamente, como se fosse um `div` no pai.

Electron emparelha este `Window` nativo do Chrome com uma Janela de Navegador sob o capô. Você pode aproveitar toda a personalização disponível ao criar uma BrowserWindow no processo principal usando `webContents.setWindowOpenHandler()` para janelas criadas por renderizades.

As opções de construtor do BrowserWindow são definidas por, em crescente precedência pedido: opções herdadas do pai, opções analisadas da cadeia de `features` de `window.open()`, webpreferências relacionadas à segurança herdadas do pai e opções dadas pelo [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler). Note que `webContents.setWindowOpenHandler` tem a palavra final e o privilégio total porque é invocado no processo principal.

### `window.open(url[, frameName][, recursos])`

* String `url`
* `frameName` String (opcional)
* `features` String (opcional)

Retornos [`BrowserWindowProxy`](browser-window-proxy.md) | [`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window)

`features` é uma lista de valores-chave separados por címulas, seguindo o formato padrão de o navegador. O elétron analisará `BrowserWindowConstructorOptions` desta lista de , sempre que possível, por conveniência. Para controle total e melhor ergonomia, considerar usar `webContents.setWindowOpenHandler` para personalizar a criação do BrowserWindow.

Um subconjunto de `WebPreferences` pode ser definido diretamente, sem esnésia, a partir da sequência de características: `zoomFactor`, `nodeIntegration`, `preload`, `javascript`, `contextIsolation`e `webviewTag`.

Como por exemplo:

```js
window.open ('https://github.com', '_blank', 'top=500,left=200,frame=false,nodeIntegration=no')
```

**Notas:**

* A integração de nó será sempre desativada no `window` aberto se desativado na janela dos pais.
* O isolamento do contexto será sempre ativado no `window` aberto se estiver habilitado na janela dos pais.
* JavaScript sempre será desativado no `window` aberto se for desativado em janela pai.
* Recursos não padronizados (que não são manuseados por Chromium ou Electron) dados em `features` serão passados para qualquer manipulador de eventos `did-create-window` registrado `webContents`no argumento `additionalFeatures` .

Para personalizar ou cancelar a criação da janela, você pode definir opcionalmente um manipulador de com `webContents.setWindowOpenHandler()` do processo principal . O retorno `false` cancela a janela, enquanto devolve um conjunto de objetos `BrowserWindowConstructorOptions` usado ao criar a janela. Observe que isso é mais poderoso do que passar opções através da string de recursos, já que o renderizador tem privilégios mais limitados na decisão de preferências de segurança do que o processo principal .

### `BrowserWindowProxy` exemplo

```javascript

principal.js
const mainWindow = novo BrowserWindow()

mainWindow.webContents.setWindowOpenHandler(({ url }) => {
  se (url.startsWith('https://github.com/') {
    retorno { action: 'allow' }
  }
  retorno { action: 'deny' }
})

mainWindow.webContents.on ('did-create-window', (childWindow) => {
  // Por exemplo...
  childWindow.webContents('will-navigate', (e) => {
    e.preventDefault()
  })
})
```

```javascript
renderer.js
janela constProxy = window.open ('https://github.com/', nulo, 'minimizável=falso')
janelaProxy.postMessage('hi', '*')
```

### Exemplo `Window` nativo

```javascript
principal.js
const mainWindow = novo BrowserWindow({
  webPreferências: {
    nativeWindowOpen: true
  }
})

// Neste exemplo, apenas janelas com a url 'about:blank' serão criadas.
Todas as outras urls serão bloqueadas.
mainWindow.webContents.setWindowOpenHandler(({ url }) => {
  se (url === 'sobre:blank') {
    retorno {
      quadro: falso,
      fullscreenable: falso,
      fundoColor: 'preto',
      webPreferências: {
        preload: 'my-child-window-preload-script.js'
      }
    }


  }
```

```javascript
processo de renderer (mainWindow)
const childWindow = window.open('', 'modal')
childWindow.document.write('<h1>Hello</h1>')
```
