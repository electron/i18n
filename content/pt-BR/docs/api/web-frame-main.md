# webFrameMain

> Controle páginas da Web e iframes.

Processo: [Main](../glossary.md#main-process)

O módulo `webFrameMain` pode ser usado para procurar quadros em instâncias [`WebContents`](web-contents.md) existentes. Eventos de navegação são o caso de uso comum.

```javascript
const { BrowserWindow, webFrameMain } = require ('electron')

const win = novo BrowserWindow({ width: 800, height: 1500 })
win.loadURL('https://twitter.com')

win.webContents.on(
  'did-frame-navigate',
  (evento, url, isMainFrame, frameProcessId, frameRoutingId) => {
    quadro const = webFrameMain.fromId(frameProcessId, frameRoutingId)
    se (quadro) {
      código const = 'document.body.innerHTML = document.body.innerHTML.replaceAll("heck", "h*ck")'
      frame.. executarJavaScript(código)
    }
  }
)
```

Você também pode acessar quadros de páginas existentes usando a de propriedade `mainFrame` de [`WebContents`](web-contents.md).

```javascript
const { BrowserWindow } = require ('electron')

async function main () {
  const win = novo BrowserWindow({ width: 800, height: 600 })
  aguardam win.loadURL('https://reddit.com')

  const youtubeEmbeds = win.webContents.mainFrame.frames.frames.filtro((quadro) => {
    try {
      url const = novo URL (frame.url)
      return url.host === 'www.youtube.com'
    } catch {
      return false
    }
  })

  console.log(youtubeEmbeds)
}

principal()
```

## Métodos

Esses métodos podem ser acessados a partir do módulo `webFrameMain` :

### `webFrameMain.fromId(processId, roteamentoId)`

* `processId` Integer - Um `Integer` representando a ID interna do processo que possui o quadro.
* `routingId` Integer - Um `Integer` representando o ID de quadro único no processo de renderização atual . Os IDs de roteamento podem ser recuperados de `WebFrameMain` instâncias (`frame.routingId`) e também são passados por quadro eventos específicos de navegação `WebContents` (por exemplo. `did-frame-navigate`).

Devoluções `WebFrameMain | undefined` - Um quadro com os IDs de processo e roteamento, ou `undefined` se não houver WebFrameMain associado aos IDs indicados.

## Classe: WebFrameMain

Processo: [Main](../glossary.md#main-process)

### Métodos de Instância

#### `frame.executeJavaScript(código[, userGesture])`

* `code` String
* `userGesture` Booleano (opcional) - Padrão é `false`.

Devoluções `Promise<unknown>` - Uma promessa que se resolve com o resultado do código de executado ou é rejeitada se a execução for lance ou resulte em uma promessa rejeitada.

Avalia `code` na página.

Na janela do navegador algumas APIs HTML como `requestFullScreen` só podem ser invocadas por um gesto do usuário. A configuração `userGesture` para `true` removerá essa limitação.

#### `frame.reload()`

Devoluções `boolean` - Se a recarga foi iniciada com sucesso. Só resulta em `false` quando o quadro não tem histórico.

#### `frame.send(canal, ... args)`

* `channel` Cordas
* `...args` qualquer[]

Envie uma mensagem assíncroda para o processo de renderização via `channel`, juntamente com argumentos. Os argumentos serão serializados com o algoritmo de clone estruturado[SCA], assim como [`postMessage`][], de modo que as cadeias de protótipos não serão incluídas . O envio de funções, promessas, símbolos, weakmaps ou WeakSets lançará uma exceção.

O processo de renderização pode lidar com a mensagem ouvindo `channel` com o módulo [`ipcRenderer`](ipc-renderer.md) .

#### `frame.postMessage(canal, mensagem [transfer])`

* `channel` Cordas
* `message` qualquer
* `transfer` MessagePortMain[] (opcional)

Envie uma mensagem para o processo de renderização, transferindo opcionalmente a propriedade de zero ou mais [`MessagePortMain`][] objetos.

Os objetos `MessagePortMain` transferidos estarão disponíveis no processo de renderização acessando a propriedade `ports` do evento emitido. Quando chegar na renderização, serão objetos nativos do DOM `MessagePort` .

Como por exemplo:

```js
Principal processo
const { port1, port2 } = novo MessageChannelMain()
webContents.mainFrame.postMessage('porta', { message: 'hello' }, [port1]) processo

// Processo renderizador
ipcRenderer.on('port', (e, msg) => {
  const [port] = e.portas
  // ...
})
```

### Propriedades de Instância

#### `frame.url` _Readonly_

Um `string` representando a URL atual do quadro.

#### `frame.top` _Readonly_

Um `WebFrameMain | null` representando o quadro superior na hierarquia de quadros à qual `frame` pertence.

#### `frame.parent` _Readonly_

Um `WebFrameMain | null` representando o quadro pai de `frame`, a propriedade seria `null` se `frame` é o quadro superior na hierarquia do quadro.

#### `frame.frames` _Readonly_

Uma coleção `WebFrameMain[]` contendo os descendentes diretos de `frame`.

#### `frame.framesInSubtree` _Readonly_

Uma coleção `WebFrameMain[]` contendo cada quadro no subarmálvoro de `frame`, incluindo a si mesmo. Isso pode ser útil ao atravessar todos os quadros.

#### `frame.frameTreeNodeId` _Readonly_

Um `Integer` representando a id do frameTreeNode interno do quadro instância. Esta id é global do navegador e identifica exclusivamente um quadro que hospeda conteúdo. O identificador é fixado na criação do quadro e permanece constante para a vida útil do quadro. Quando o quadro é removido, o id é não é usado novamente.

#### `frame.name` _Readonly_

Um `String` representando o nome da moldura.

#### `frame.osProcessId` _Readonly_

Um `Integer` representando o sistema operacional `pid` do processo que possui esse quadro.

#### `frame.processId` _Readonly_

Um `Integer` representando a `pid` interna do Chromium do processo que possui este quadro. Isso não é o mesmo que o ID do processo de SO; para ler esse uso `frame.osProcessId`.

#### `frame.routingId` _Readonly_

Um `Integer` representando o id de quadro único no processo de renderização atual. Casos `WebFrameMain` distintos que se referem ao mesmo quadro subjacente terão o mesmo `routingId`.
