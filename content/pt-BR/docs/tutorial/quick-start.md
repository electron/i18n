# Início Rápido

Este guia guiará você através do processo de criação de um aplicativo barebones Hello World no Electron, similar a [`electron/electron-quick-start`][quick-start].

Ao final deste tutorial, sua aplicação abrirá uma janela do navegador que exibe uma página com informações sobre qual Chromium, Node.js, e versões do Electron estão sendo executadas.

## Pré-requisitos

Para usar o Electron, você precisa instalar o [Node.js][node-download]. Recomendamos que você use a versão mais recente disponível do `LTS`.

> Por favor, instale o Node.js usando instaladores específicos para sua plataforma. Caso contrário, você pode encontrar problemas de incompatibilidade com ferramentas de desenvolvimento diferentes.

Para verificar se o Node.js foi instalado corretamente, digite os seguintes comandos em seu terminal de comando:

```sh
node -v
npm -v
```

Os comandos devem imprimir as versões do Node.js e npm, respectivamente.

** Observação: ** como o Electron incorpora Node.js em seu binário, a versão do Node.js em execução seu código não está relacionado à versão em execução em seu sistema.

## Crie seu aplicativo

### Scaffold the project

Aplicativos Electron seguem a mesma estrutura geral que outros projetos Node.js. Comece criando uma pasta e inicializando um pacote npm.

```sh npm2yarn
mkdir my-electron-app && cd my-electron-app
npm init
```

O comando interativo `init` solicitará que você defina alguns campos em sua configuração. Existem algumas regras a seguir para os propósitos deste tutorial:

* `entry point` deve ser `main.js`.
* `author` e `description` podem ser de qualquer valor, mas são necessários para o [pacote do aplicativos](#package-and-distribute-your-application).

Seu arquivo `package.json` deve ser parecido com isto:

```json
{
  "name": "my-electron-app",
  "version": "1.0.0",
  "description": "Hello World!",
  "main": "main.js",
  "author": "Jane Doe",
  "license": "MIT"
}
```

Em seguida, instale o pacote `electron` nas `devDependencies` do seu aplicativo.

```sh npm2yarn
$ npm install --save-dev electron
```

> Nota: Se você estiver encontrando algum problema com a instalação do Electron, por favor consulte o guia de [Instalação avançada][advanced-installation].

Finalmente, você deve ser capaz de executar o Electron. No campo [`scripts`][package-scripts] de sua `package.json` config, adicione um comando `start` assim:

```json
{
  "scripts": {
    "start": "electron ."
  }
}
```

Este comando `start` permitirá que você abra seu aplicativo em modo de desenvolvimento.

```sh npm2yarn
npm start
```

> Nota: Este script diz ao Electron para ser executado na pasta raiz do seu projeto. Neste estágio, o seu aplicativo lançará imediatamente um erro informando que ele não consegue encontrar um aplicativo para executar.

### Execute o processo principal

O ponto de entrada de qualquer aplicação Electron é o script `main`. Este script controla o **processo principal**, que é executado em um ambiente Node.js completo e é responsável por controlar o ciclo de vida de seu aplicativo, exibindo interfaces nativas, realizando todas as operações necessárias e gerenciando os processos de renderização (mais sobre isso mais tarde).

During execution, Electron will look for this script in the [`main`][package-json-main] field of the app's `package.json` config, which you should have configured during the [app scaffolding](#scaffold-the-project) step.

Para inicializar o script `main`, crie um arquivo vazio com o nome `main.js` na pasta raíz do seu projeto.

> Nota: Se você executar o script `start` novamente neste ponto, sua aplicação não irá lançar qualquer erro! Entretanto, ela não fará nada, visto que não adicionamos nenhum código no arquivo `main.js`.

### Crie uma página web

Antes de criarmos uma janela para a nossa aplicação, precisamos criar o conteúdo que será carregado dentro dela. No Electron, cada janela exibe um conteúdo web, que pode ser carregado de um arquivo HTML local ou de um URL remoto.

Para este tutorial, você fará a página html primeiro. Crie um arquivo `index.html` na pasta raíz do seu projeto:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    Estamos utilizando Node.js <span id="node-version"></span>,
    Chromium <span id="chrome-version"></span>,
    e Electron <span id="electron-version"></span>.
  </body>
</html>
```

> Nota: Olhando para este documento HTML, você pode observar que os números das versões estão faltando dentro do texto. Nós vamos inserir manualmente mais tarde, utilizando JavaScript.

### Abrindo sua página web em uma janela do navegador

Agora que você já tem uma página web, carregue-a na janela do aplicativo. Para fazer isso, você precisa de dois módulos do Electron:

* O módulo [`app`][app], que controla os eventos do ciclo de vida de sua aplicação.
* O módulo [`BrowserWindow`][browser-window], que cria e gerencia as janelas da sua aplicação.

Pelo fato do processo principal ser executado em Node.js, você pode importá-los como módulos [CommonJS][commonjs] no topo de seu arquivo:

```js
const { app, BrowserWindow } = require('electron')
```

Então, adicione a função `createWindow()` que carregará o arquivo `index.html` em uma nova instância do `BrowserWindow`.

```js
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}
```

O próximo passo é chamar a função `createWindow()` que abrirá a janela.

No Electron, janelas do navegador só podem ser criadas após o módulo `app` disparar o evento [`ready`][app-ready]. Você pode esperar por este evento utilizando a API [`app.whenReady()`][app-when-ready]. Chame a função `createWindow()` após `whenReady()` resolver a Promise.

```js
app.whenReady().then(() => {
  createWindow()
})
```

> Nota: Neste ponto do tutorial, sua aplicação Electron deve abrir uma janela que mostra o conteúdo de sua página web!

### Gerencie o ciclo de vida de sua janela

Although you can now open a browser window, you'll need some additional boilerplate code to make it feel more native to each platform. Application windows behave differently on each OS, and Electron puts the responsibility on developers to implement these conventions in their app.

In general, you can use the `process` global's [`platform`][node-platform] attribute to run code specifically for certain operating systems.

#### Encerrar a aplicação quando todas as janelas estiverem fechadas (Windows e Linux)

No Windows e no Linux, fechar todas as janelas geralmente encerra totalmente a aplicação.

Para implementar isso, "ouça" o módulo [`window-all-closed`][window-all-closed] do `app` e chame [`app.quit()`][app-quit] se o usuário não estiver utilizando macOS (`darwin`).

```js
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
```

#### Open a window if none are open (macOS)

Whereas Linux and Windows apps quit when they have no windows open, macOS apps generally continue running even without any windows open, and activating the app when no windows are available should open a new one.

To implement this feature, listen for the `app` module's [`activate`][activate] event, and call your existing `createWindow()` method if no browser windows are open.

Because windows cannot be created before the `ready` event, you should only listen for `activate` events after your app is initialized. Do this by attaching your event listener from within your existing `whenReady()` callback.

```js
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
```

> Note: At this point, your window controls should be fully functional!

### Access Node.js from the renderer with a preload script

Now, the last thing to do is print out the version numbers for Electron and its dependencies onto your web page.

Accessing this information is trivial to do in the main process through Node's global `process` object. However, you can't just edit the DOM from the main process because it has no access to the renderer's `document` context. They're in entirely different processes!

> Note: If you need a more in-depth look at Electron processes, see the [Process Model][] document.

This is where attaching a **preload** script to your renderer comes in handy. A preload script runs before the renderer process is loaded, and has access to both renderer globals (e.g. `window` and `document`) and a Node.js environment.

Create a new script named `preload.js` as such:

```js
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
```

The above code accesses the Node.js `process.versions` object and runs a basic `replaceText` helper function to insert the version numbers into the HTML document.

To attach this script to your renderer process, pass in the path to your preload script to the `webPreferences.preload` option in your existing `BrowserWindow` constructor.

```js
// include the Node.js 'path' module at the top of your file
const path = require('path')

// modify your existing createWindow() function
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}
// ...
```

There are two Node.js concepts that are used here:

* The [`__dirname`][dirname] string points to the path of the currently executing script (in this case, your project's root folder).
* The [`path.join`][path-join] API joins multiple path segments together, creating a combined path string that works across all platforms.

We use a path relative to the currently executing JavaScript file so that your relative path will work in both development and packaged mode.

### Bonus: Add functionality to your web contents

At this point, you might be wondering how to add more functionality to your application.

For any interactions with your web contents, you want to add scripts to your renderer process. Because the renderer runs in a normal web environment, you can add a `<script>` tag right before your `index.html` file's closing `</body>` tag to include any arbitrary scripts you want:

```html
<script src="./renderer.js"></script>
```

The code contained in `renderer.js` can then use the same JavaScript APIs and tooling you use for typical front-end development, such as using [`webpack`][webpack] to bundle and minify your code or [React][react] to manage your user interfaces.

### Recap

After following the above steps, you should have a fully functional Electron application that looks like this:

![Simplest Electron app](../images/simplest-electron-app.png)

<!--TODO(erickzhao): Remove the individual code blocks for static website -->
The full code is available below:

```js
// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. Você também pode colocar eles em arquivos separados e requeridos-as aqui.
```

```js
// preload.js

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
```

```html
<!--index.html-->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using Node.js <span id="node-version"></span>,
    Chromium <span id="chrome-version"></span>,
    and Electron <span id="electron-version"></span>.

    <!-- You can also require other files to run in this process -->
    <script src="./renderer.js"></script>
  </body>
</html>
```
```fiddle docs/fiddles/quick-start
```

To summarize all the steps we've done:

* We bootstrapped a Node.js application and added Electron as a dependency.
* We created a `main.js` script that runs our main process, which controls our app
  and runs in a Node.js environment. In this script, we used Electron's `app` and
  `BrowserWindow` modules to create a browser window that displays web content
  in a separate process (the renderer).

* In order to access certain Node.js functionality in the renderer, we attached
  a preload script to our `BrowserWindow` constructor.

## Package and distribute your application

The fastest way to distribute your newly created app is using
[Electron Forge](https://www.electronforge.io).

1. Add Electron Forge as a development dependency of your app, and use its `import` command to set up
Forge's scaffolding:

    ```sh npm2yarn
    npm install --save-dev @electron-forge/cli
    npx electron-forge import

    ✔ Checking your system
    ✔ Initializing Git Repository
    ✔ Writing modified package.json file
    ✔ Installing dependencies
    ✔ Writing modified package.json file
    ✔ Fixing .gitignore

    We have ATTEMPTED to convert your app to be in a format that electron-forge understands.

    Thanks for using "electron-forge"!!!
    ```

1. Create a distributable using Forge's `make` command:

    ```sh npm2yarn
    npm run make

    > my-electron-app@1.0.0 make /my-electron-app
    > electron-forge make

    ✔ Checking your system
    ✔ Resolving Forge Config
    We need to package your application before we can make it
    ✔ Preparing to Package Application for arch: x64
    ✔ Preparing native dependencies
    ✔ Packaging Application
    Making for the following targets: zip
    ✔ Making for target: zip - On platform: darwin - For arch: x64
    ```

    Electron Forge creates the `out` folder where your package will be located:

    ```plain
    // Example for macOS
    out/
    ├── out/make/zip/darwin/x64/my-electron-app-darwin-x64-1.0.0.zip
    ├── ...
    └── out/my-electron-app-darwin-x64/my-electron-app.app/Contents/MacOS/my-electron-app
    ```

[quick-start]: https://github.com/electron/electron-quick-start

[node-download]: https://nodejs.org/en/download/

[advanced-installation]: ./installation.md
[package-scripts]: https://docs.npmjs.com/cli/v7/using-npm/scripts

[package-json-main]: https://docs.npmjs.com/cli/v7/configuring-npm/package-json#main

[app]: ../api/app.md
[browser-window]: ../api/browser-window.md
[commonjs]: https://nodejs.org/docs/latest/api/modules.html#modules_modules_commonjs_modules
[app-ready]: ../api/app.md#event-ready
[app-when-ready]: ../api/app.md#appwhenready

[node-platform]: https://nodejs.org/api/process.html#process_process_platform
[window-all-closed]: ../api/app.md#appquit

[activate]: ../api/app.md#event-activate-macos

[Process Model]: ./process-model.md
[dirname]: https://nodejs.org/api/modules.html#modules_dirname
[path-join]: https://nodejs.org/api/path.html#path_path_join_paths

[webpack]: https://webpack.js.org
[react]: https://reactjs.org
