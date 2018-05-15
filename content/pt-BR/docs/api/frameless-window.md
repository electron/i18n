# Frameless Window

> Abra uma janela sem barra de ferramentas, bordas ou outros elementos gráficos do "Chrome".

Uma janela 'frameless' é uma janela que não possui [chrome](https://developer.mozilla.org/en-US/docs/Glossary/Chrome), ou seja, não possui partes da janela que não são partes da página web, como a barra de ferramentas. Estas são opções na classe [`BrowserWindow`](browser-window.md).

## Criando uma frameless window

Para criar uma frameless window, você precisa definir `frame` como `false` nas `options` da [BrowserWindow](browser-window.md):

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({width: 800, height: 600, frame: false})
win.show()
```

### Alternativas no macOS

No macOS 10.9 Mavericks ou superior, existe uma alternativa para definir uma janela sem 'chrome'. Ao invés de definir `frame` como `false`, o que desabilita tanto a barra do título quanto os controles de janela, você pode querer esconder a barra de título e o conteúdo ocupar o tamanho completo da janela, ainda preservando os controles ("semáforo") para ações de janela padrão. Você pode fazê-lo, especificando a opção `titleBarStyle`:

#### `hidden`

Resultando em uma janela com a barra do título escondida e o conteúdo ocupando o tamanho inteiro da janela, no entanto, a janela ainda possuirá os controles no canto superior esquerdo.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'hidden'})
win.show()
```

#### `hiddenInset`

Resulta em uma barra de título escondida com uma aparência alternativa, onde os botões de controle da janela estão um pouco mais dentro do limite da janela.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'hiddenInset'})
win.show()
```

#### `customButtonsOnHover`

Utiliza botões customizados para fechar, minimizar e colocar tela cheia que aparecem quando passar o mouse no canto superior da janela. Esses botões customizados evitam erros com eventos do mouse que ocorrem com os botões da barra de ferramentas padrão. Essa opção é apenas aplicável para frameless windows.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'customButtonsOnHover', frame: false})
win.show()
```

## Janela transparente

Definindo a opção `transparent` como `true` você também pode fazer a frameless window transparente:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({transparent: true, frame: false})
win.show()
```

### Limitações

* Você não pode clicar através da área transparente. Nós iremos introduzir uma API para definir a forma da janela para solucionar isto, veja [nosso issue no Github](https://github.com/electron/electron/issues/1335) para mais detalhes.
* Janelas transparentes não são redimensionáveis. Definindo `resizable` para `true` pode fazer a janela transparente parar de funcionar em algumas plataformas.
* O filtro `blur` apenas se aplica a página web, logo, não há uma maneira de aplicar o efeito de borrado ao conteúdo abaixo da janela (ou seja, outras aplicações abertas no sistema do usuário).
* On Windows operating systems, transparent windows will not work when DWM is disabled.
* On Linux, users have to put `--enable-transparent-visuals --disable-gpu` in the command line to disable GPU and allow ARGB to make transparent window, this is caused by an upstream bug that [alpha channel doesn't work on some NVidia drivers](https://code.google.com/p/chromium/issues/detail?id=369209) on Linux.
* On Mac, the native window shadow will not be shown on a transparent window.

## Click-through window

To create a click-through window, i.e. making the window ignore all mouse events, you can call the [win.setIgnoreMouseEvents(ignore)](browser-window.md#winsetignoremouseeventsignore) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setIgnoreMouseEvents(true)
```

### Forwarding

Ignoring mouse messages makes the web page oblivious to mouse movement, meaning that mouse movement events will not be emitted. On Windows operating systems an optional parameter can be used to forward mouse move messages to the web page, allowing events such as `mouseleave` to be emitted:

```javascript
let win = require('electron').remote.getCurrentWindow()
let el = document.getElementById('clickThroughElement')
el.addEventListener('mouseenter', () => {
  win.setIgnoreMouseEvents(true, {forward: true})
})
el.addEventListener('mouseleave', () => {
  win.setIgnoreMouseEvents(false)
})
```

This makes the web page click-through when over `el`, and returns to normal outside it.

## Draggable region

By default, the frameless window is non-draggable. Apps need to specify `-webkit-app-region: drag` in CSS to tell Electron which regions are draggable (like the OS's standard titlebar), and apps can also use `-webkit-app-region: no-drag` to exclude the non-draggable area from the draggable region. Note that only rectangular shapes are currently supported.

Note: `-webkit-app-region: drag` is known to have problems while the developer tools are open. See this [GitHub issue](https://github.com/electron/electron/issues/3647) for more information including a workaround.

To make the whole window draggable, you can add `-webkit-app-region: drag` as `body`'s style:

```html
<body style="-webkit-app-region: drag">
</body>
```

And note that if you have made the whole window draggable, you must also mark buttons as non-draggable, otherwise it would be impossible for users to click on them:

```css
button {
  -webkit-app-region: no-drag;
}
```

If you're setting just a custom titlebar as draggable, you also need to make all buttons in titlebar non-draggable.

## Text selection

In a frameless window the dragging behaviour may conflict with selecting text. For example, when you drag the titlebar you may accidentally select the text on the titlebar. To prevent this, you need to disable text selection within a draggable area like this:

```css
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
```

## Context menu

On some platforms, the draggable area will be treated as a non-client frame, so when you right click on it a system menu will pop up. To make the context menu behave correctly on all platforms you should never use a custom context menu on draggable areas.