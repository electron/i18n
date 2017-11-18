# Início Rápido

Electron permite criar aplicações desktop com JavaScript puro, fornecendo em tempo de execução uma API rica e nativa do sistema operacional. You could see it as a variant of the Node.js runtime that is focused on desktop applications instead of web servers.

This doesn't mean Electron is a JavaScript binding to graphical user interface (GUI) libraries. Instead, Electron uses web pages as its GUI, so you could also see it as a minimal Chromium browser, controlled by JavaScript.

### Processo Principal

In Electron, the process that runs `package.json`'s `main` script is called **the main process**. The script that runs in the main process can display a GUI by creating web pages.

### Renderer Process

Since Electron uses Chromium for displaying web pages, Chromium's multi-process architecture is also used. Each web page in Electron runs in its own process, which is called **the renderer process**.

In normal browsers, web pages usually run in a sandboxed environment and are not allowed access to native resources. Electron users, however, have the power to use Node.js APIs in web pages allowing lower level operating system interactions.

### Differences Between Main Process and Renderer Process

The main process creates web pages by creating `BrowserWindow` instances. Each `BrowserWindow` instance runs the web page in its own renderer process. When a `BrowserWindow` instance is destroyed, the corresponding renderer process is also terminated.

The main process manages all web pages and their corresponding renderer processes. Each renderer process is isolated and only cares about the web page running in it.

In web pages, calling native GUI related APIs is not allowed because managing native GUI resources in web pages is very dangerous and it is easy to leak resources. If you want to perform GUI operations in a web page, the renderer process of the web page must communicate with the main process to request that the main process perform those operations.

In Electron, we have several ways to communicate between the main process and renderer processes. Like [`ipcRenderer`](../api/ipc-renderer.md) and [`ipcMain`](../api/ipc-main.md) modules for sending messages, and the [remote](../api/remote.md) module for RPC style communication. There is also an FAQ entry on [how to share data between web pages](../faq.md#how-to-share-data-between-web-pages).

## Escreva seu primeiro aplicativo com Electron

Geralmente, um aplicativo em Electron é estruturado como esse:

```text
seu-app/
├── package.json
├── main.js
└── index.html
```

O formato de `package.json` e exatamente o mesmo que os módulos do Node, e o script especificado pelo campo `main` é o script de inicialização do seu app, que executará no processo principal. Um exemplo de como seu `package.json` possa parecer:

```json
{
  "name"    : "seu-app",
  "version" : "0.1.0",
  "main"    : "main.js"
}
```

**Nota**: Se o campo `main` não estiver presente em `package.json`, Electron tentará carregar `index.js`.

O `main.js` deve criar janelas e lidar com eventos do sistema, um tipico exemplo disso:

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Mantenha uma referencia global do objeto da janela, se você não fizer isso, a janela será
// fechada automaticamente quando o objeto JavaScript for coletado.
let win

function createWindow () {
  // Criar uma janela de navegação.
  win = new BrowserWindow({width: 800, height: 600})

  // e carrega index.html do app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Abre o DevTools.
  win.webContents.openDevTools()

  // Emitido quando a janela é fechada.
  win.on('closed', () => {
    // Elimina a referência do objeto da janela, geralmente você iria armazenar as janelas
    // em um array, se seu app suporta várias janelas, este é o momento
    // quando você deve excluir o elemento correspondente.
    win = null
  })
}

// Este método será chamado quando o Electron tiver finalizado
// a inicialização e está pronto para criar a janela browser.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.on('ready', createWindow)

// Finaliza quando todas as janelas estiverem fechadas.
app.on('window-all-closed', () => {
  // No macOS é comum para aplicativos e sua barra de menu 
  // permaneçam ativo até que o usuário explicitamente encerre com Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// Neste arquivo, você pode incluir o resto do seu aplicativo especifico do processo
// principal. Você também pode colocar eles em arquivos separados e requeridos-as aqui.
```

Finalmente, o `index.html` é a pagina da web que você quer mostrar:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Olá Mundo!</title>
  </head>
  <body>
    <h1>Olá Mundo!</h1>
    Nos estamos usando node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    e Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## Executar seu aplicativo

Once you've created your initial `main.js`, `index.html`, and `package.json` files, you'll probably want to try running your app locally to test it and make sure it's working as expected.

### `electron`

[`electron`](https://github.com/electron-userland/electron-prebuilt) is an `npm` module that contains pre-compiled versions of Electron.

If you've installed it globally with `npm`, then you will only need to run the following in your app's source directory:

```bash
electron .
```

If you've installed it locally, then run:

#### macOS / Linux

```bash
$ ./node_modules/.bin/electron .
```

#### Windows

    $ .\node_modules\.bin\electron .
    

### Manually Downloaded Electron Binary

If you downloaded Electron manually, you can also use the included binary to execute your app directly.

#### macOS

```bash
$ ./Electron.app/Contents/MacOS/Electron your-app/
```

#### Linux

```bash
$ ./electron/electron your-app/
```

#### Windows

    $ .\electron\electron.exe your-app\
    

`Electron.app` here is part of the Electron's release package, you can download it from [here](https://github.com/electron/electron/releases).

### Run as a distribution

After you're done writing your app, you can create a distribution by following the [Application Distribution](./application-distribution.md) guide and then executing the packaged app.

### Try this Example

Clone and run the code in this tutorial by using the [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) repository.

**Note**: Running this requires [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which includes [npm](https://npmjs.org)) on your system.

```bash
# Clone o repositório
$ git clone https://github.com/electron/electron-quick-start
# Vá para o repositório
$ cd electron-quick-start
# Instale as dependências
$ npm install
# Run the app
$ npm start
```

For more example apps, see the [list of boilerplates](https://electron.atom.io/community/#boilerplates) created by the awesome electron community.