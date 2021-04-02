# Atalhos do Teclado

## Visão Geral

Este recurso permite configurar atalhos de teclado locais e globais para o aplicativo Electron.

## Exemplo

### Atalhos Locais

Os atalhos de teclado locais são acionados apenas quando o aplicativo está focado. Para configurar um atalho de teclado local, você precisa especificar uma propriedade [`accelerator`][] ao criar um</a> [MenuItem dentro do módulo][] menu.</p> 

Começando com um aplicativo de trabalho do</a>do Guia de Início Rápido , atualize o arquivo `main.js` com as seguintes linhas :</p> 



```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/local'
const { Menu, MenuItem } = require ('electron')

menu const = novo Menu() menu() menu
.append(novo MenuItem({
  rótulo: 'Elétron',
  submenu: [{
    papel: 'ajuda', acelerador
    : process.platform == 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
    clique: () => { console.log('Rochas eletrônicas!') }
  }]
}))

Menu.setApplicationMenu(menu)
```




> NOTA: No código acima, você pode ver que o acelerador difere com base no sistema operacional do usuário. Para o MacOS, é `Alt+Cmd+I`, enquanto para Linux e Windows, é `Alt+Shift+I`.

Depois de iniciar o aplicativo Electron, você deve ver o menu de aplicação juntamente com o atalho local que você acabou de definir:

![Menu com um atalho local](../images/local-shortcut.png)

Se você clicar em `Help` ou pressionar o acelerador definido e, em seguida, abrir o terminal de onde você executou sua aplicação Electron, você verá a mensagem que foi gerada após o desencadeamento do evento `click` : "Rochas eletrônicas!".



### Atalhos Globais

Para configurar um atalho global do teclado, você precisa usar o módulo</a> global globalshortcut para detectar eventos de teclado mesmo quando o aplicativo não tem foco no teclado.</p> 

Começando com um aplicativo de trabalho do</a>do Guia de Início Rápido , atualize o arquivo `main.js` com as seguintes linhas :</p> 



```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/global'
const { app, globalShortcut } = require ('electron')

app.whenReady().then((((() => {
  globalShortcut.register('Alt+CommandOrControl+I', () => {
    console.log('Electron ama atalhos globais!')
  })
}).então(criar Janela)
```




> NOTA: No código acima, a combinação `CommandOrControl` usa `Command` no macOS e `Control` no Windows/Linux.

Depois de lançar a aplicação Electron, se você pressionar a combinação de de teclas definida, então abra o terminal de onde você executou sua aplicação Electron, você verá que a Electron adora atalhos globais!



### Atalhos em uma janela do navegador



#### Usando APIs web

Se você quiser lidar com atalhos de teclado dentro de um</a>[BrowserWindow, você pode ouvir os `keyup` e `keydown` [eventos DOM][dom-events] dentro do processo de renderização usando o][]de API addEventListener () .</p> 



```js
window.addEventListener('keyup', fazerAlgumaCoisa, true)
```


Note que o terceiro parâmetro `true` indica que o ouvinte sempre receberá pressionam-se antes de outros ouvintes para que eles não possam ter `stopPropagation()` chamados.



#### Interceptação de eventos no processo principal

O evento [`before-input-event`](../api/web-contents.md#event-before-input-event) é emitido antes enviar os eventos `keydown` e `keyup` na página. Ele pode ser usado para capturar e manipular atalhos personalizados que não estão visíveis no menu.



##### Exemplo

Começando com um aplicativo de trabalho do</a>do Guia de Início Rápido , atualize o arquivo `main.js` com as seguintes linhas :</p> 



```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/interception-from-main'
const { app, BrowserWindow } = require ('electron')

app.whenReady().then((((() => {
  const win = novo BrowserWindow({ largura: 800, altura: 600, webPreferências: { nodeIntegration: true } })

  win.loadFile ('index.html')
  win.webContents.on ('antes do evento de entrada', (evento, entrada) => {
    se (entrada.control && entrada.key.toLowerCase() === 'i') { console
      .log('Pressed Control+I')
      event.preventDefault()
    }
  })
})  })
```


Depois de lançar a aplicação Electron, se você abrir o terminal que executou sua aplicação Electron e pressionar `Ctrl+I` combinação de teclas, você verá que esta combinação de teclas foi interceptada com sucesso.



#### Usando bibliotecas de terceiros

Se você não quiser fazer análise manual de atalhos, existem bibliotecas que detecção avançada de chaves, como [][]de ratoeira . Abaixo estão exemplos de uso do `mousetrap` em execução no processo Renderer:



```js
Mousetrap.bind ('4', () => { console.log('4') })
Mousetrap.bind('?', () => { console.log('mostrar atalhos!') })
Mousetrap.bind ('esc', () => { console.log('escape') }, 'keyup')

// combinações
Mousetrap.bind ('command+shift+k', () => { console.log('switch de comando k') })

// mapear múltiplas combinações para o mesmo callback
Mousetrap.bind(['command+k', 'ctrl+k'], () => {
  console.log ('comando k ou controle k')

  // retornar falso para evitar o comportamento padrão e impedir que o evento borbulhar
  retornar falsas
})

// sequências de estilo do gmail
Mousetrap.bind().bind('g i', () => { console.log('vá para a caixa de entrada') })
Mousetrap.bind('* a', () => { console.log('selecione tudo') })

// código konami!
Mousetrap.bind('up up down down left right left right b a enter', () => {
  console.log('konami code')
})
```

[MenuItem dentro do módulo]: ../api/menu-item.md
[`accelerator`]: ../api/accelerator.md
[BrowserWindow, você pode ouvir os `keyup` e `keydown` [eventos DOM][dom-events] dentro do processo de renderização usando o]: ../api/browser-window.md
[5]: https://github.com/ccampbell/mousetrap
[6]: https://github.com/ccampbell/mousetrap
[dom-events]: https://developer.mozilla.org/en-US/docs/Web/Events
