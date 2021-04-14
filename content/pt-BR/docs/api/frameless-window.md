# Janela sem moldura

> Abra uma janela sem barra de ferramentas, bordas ou outros elementos gráficos do "Chrome".

Uma janela 'frameless' é uma janela que não possui [chrome](https://developer.mozilla.org/en-US/docs/Glossary/Chrome), ou seja, não possui partes da janela que não são partes da página web, como a barra de ferramentas. Estas são opções na classe [`BrowserWindow`](browser-window.md).

## Criando uma frameless window

Para criar uma frameless window, você precisa definir `frame` como `false` nas `options` da [BrowserWindow](browser-window.md):

```javascript
const { BrowserWindow } = require('electron')
const win = novo BrowserWindow({ width: 800, height: 600, frame: false })
win.show()
```

### Alternativas no macOS

Há uma maneira alternativa de especificar uma janela sem cromado. Em vez de definir `frame` para `false` que desativa tanto a barra de título quanto os controles de janela, você pode querer ter a barra de título escondida e seu conteúdo estender-se ao tamanho total da janela, ainda preservar os controles de janela ("semáforos") para ações de janela padrão. Você pode fazê-lo, especificando a opção `titleBarStyle`:

#### `hidden`

Resultando em uma janela com a barra do título escondida e o conteúdo ocupando o tamanho inteiro da janela, no entanto, a janela ainda possuirá os controles no canto superior esquerdo.

```javascript
const { BrowserWindow } = require('electron')
const win = novo BrowserWindow({ titleBarStyle: 'hidden' })
win.show()
```

#### `hiddenInset`

Resulta em uma barra de título escondida com uma aparência alternativa, onde os botões de controle da janela estão um pouco mais dentro do limite da janela.

```javascript
const { BrowserWindow } = require('electron')
const win = novo BrowserWindow({ titleBarStyle: 'hiddenInset' })
win.show()
```

#### `customButtonsOnHover`

Usa botões personalizados desenhados perto e miniaturize que exibem ao pairar no canto superior esquerdo da janela. O botão fullscreen não está disponível devido a restrições de janelas sem moldura, pois interface com as máscaras de janela macOS da Apple. Esses botões personalizados evitam problemas com eventos do mouse que ocorrem com os botões padrão da barra de ferramentas da janela. Esta opção só é aplicável para janelas sem moldura.

```javascript
const { BrowserWindow } = require('electron')
const win = novo BrowserWindow({ titleBarStyle: 'customButtonsOnHover', frame: false })
win.show()
```

## Janela transparente

Definindo a opção `transparent` como `true` você também pode fazer a frameless window transparente:

```javascript
const { BrowserWindow } = require('electron')
const win = novo BrowserWindow({ transparent: true, frame: false })
win.show()
```

### Limitações

* Você não pode clicar através da área transparente. Nós iremos introduzir uma API para definir a forma da janela para solucionar isto, veja [nosso issue no Github](https://github.com/electron/electron/issues/1335) para mais detalhes.
* Janelas transparentes não são resizáveis. A configuração `resizable` para `true` pode fazer com que uma janela transparente pare de funcionar em algumas plataformas.
* O filtro `blur` apenas se aplica a página web, logo, não há uma maneira de aplicar o efeito de borrado ao conteúdo abaixo da janela (ou seja, outras aplicações abertas no sistema do usuário).
* The window will not be transparent when DevTools is opened.
* On Windows operating systems,
  * transparent windows will not work when DWM is disabled.
  * transparent windows can not be maximized using the Windows system menu or by double clicking the title bar. The reasoning behind this can be seen on [this pull request](https://github.com/electron/electron/pull/28207).
* On Linux, users have to put `--enable-transparent-visuals --disable-gpu` in the command line to disable GPU and allow ARGB to make transparent window, this is caused by an upstream bug that [alpha channel doesn't work on some NVidia drivers](https://bugs.chromium.org/p/chromium/issues/detail?id=369209) on Linux.
* On Mac, the native window shadow will not be shown on a transparent window.

## Janela click-through

Para criar uma janela de cliques, ou seja, fazer com que a janela ignore todos os eventos de do mouse, você pode chamar o [win.setIgnoreMouseEvents(ignorar)][ignore-mouse-events] API:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.setIgnoreMouseEvents(true)
```

### Encaminhamento

Ignorar mensagens do mouse torna a página da Web alheia ao movimento do mouse, o que significa que os eventos de movimento do mouse não serão emitidos. Nos sistemas operacionais Windows, um parâmetro opcional pode ser usado para encaminhar mensagens de movimento do mouse para a página da Web, permitindo que eventos como `mouseleave` sejam emitidos:

```javascript
const { ipcRenderer } = require ('electron')
const el = document.getElementById ('clickThroughElement')
el.addEventListener ('mouseenter', () => {
  ipcRenderer.send ('set-ignore-mouse-events', true, { forward: true })
})
el.addEventListener ('mouseleave', () => {
  ipcRenderer.send ('set-ignore-mouse-events', false)
})

// Processo principal
const { ipcMain } = require ('electron')
ipcMain.on ('set-ignore-mouse-events', (evento, ... args) => {
  BrowserWindow.fromWebContents(event.sender).setIgnoreMouseEvents(... args)
})
```

Isso faz com que a página da Web clique quando `el`e retorna ao normal fora dela.

## Região arrastada

Por padrão, a janela sem moldura é não-arrastada. Os aplicativos precisam especificar `-webkit-app-region: drag` em CSS para dizer ao Electron quais regiões são arrastadas (como a barra de título padrão do SISTEMA OPERACIONAL), e os aplicativos também podem usar `-webkit-app-region: no-drag` para excluir a área não-arrastada da região arrastada. Observe que apenas formas retangulares são suportadas no momento.

Nota: `-webkit-app-region: drag` é conhecido por ter problemas enquanto as ferramentas do desenvolvedor estão abertas. Veja este [problema do GitHub](https://github.com/electron/electron/issues/3647) para obter mais informações, incluindo uma solução alternativa.

Para tornar toda a janela arrastada, você pode adicionar `-webkit-app-region: drag` como estilo `body`:

```html
<body style="-webkit-app-region: drag">
</body>
```

E note que se você fez toda a janela arrastável, você também deve marcar botões como não-arrastados, caso contrário, seria impossível para os usuários clicar em -los:

```css
botão {
  -webkit-app-região: no-drag;
}
```

Se você está apenas definindo uma barra de título personalizada como draggable, você também precisa fazer todos os botões na barra de títulos não-draggable.

## Seleção de texto

Em uma janela sem moldura, o comportamento de arrasto pode entrar em conflito com a seleção de texto. Por exemplo, quando você arrasta a barra de títulos, você pode selecionar acidentalmente o texto na a barra de títulos. Para evitar isso, você precisa desativar a seleção de texto dentro de uma área arrastada como esta:

```css
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
```

## Menu de contexto

Em algumas plataformas, a área de arrasto será tratada como um quadro não-cliente, de modo quando você clicar com o botão direito do mouse nele, um menu do sistema aparecerá. Para tornar o menu de contexto se comportar corretamente em todas as plataformas, você nunca deve usar um menu de contexto personalizado em áreas arrastadas.

[ignore-mouse-events]: browser-window.md#winsetignoremouseeventsignore-options
