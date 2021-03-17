# Guia de início rápido

## QuickStart

Electron é um framework que permite criar aplicações desktop com JavaScript, HTML e CSS. Essas aplicações podem ser empacotadas para serem executadas diretamente no macOS, Windows, ou Linux, ou distribuídas através da Mac App Store ou da Microsoft Store.

Normalmente, você cria um aplicativo no computador para um sistema operacional (OS) usando frameworks de aplicativo nativos específicos de cada sistema operacional. Electron torna possível escrever seu aplicativo uma vez usando tecnologias que você já conhece.

### Pré-requisitos

Antes de prosseguir com o Electron você precisa instalar o [Node.js](https://nodejs.org/en/download/). Recomendamos que você instale a versão mais recente `LTS` ou `atual` disponível.

> Por favor, instale o Node.js usando instaladores pré-construídos para sua plataforma. Você pode encontrar problemas de incompatibilidade com diferentes ferramentas de desenvolvimento caso contrário.

Para verificar se o Node.js foi instalado corretamente, digite os seguintes comandos em seu cliente de terminal:

```sh
node -v
npm -v
```

Os comandos devem imprimir as versões do Node.js e npm de acordo. Se ambos os comandos forem bem-sucedidos, você estará pronto para instalar o Electron.

### Criar uma aplicação básica

De uma perspectiva de desenvolvimento, um aplicativo Electron é essencialmente um aplicativo Node.js. Isso significa que o ponto de partida de sua aplicação Electron será um arquivo `package.json` como em qualquer outro aplicativo Node.js. Uma aplicação mínima do Electron tem a seguinte estrutura:

```plaintext
my-electron-app/
├── package.json
├── main.js
├── preload.js
└── index.html
```

Vamos criar uma aplicação básica baseada na estrutura acima.

#### Install Electron

Crie uma pasta para seu projeto e instale o Electron lá:

```sh
mkdir my-electron-app && cd my-electron-app
npm init -y
npm i --save-dev electron
```

#### Criar o arquivo de script principal

O script principal especifica o ponto de entrada da sua aplicação Electron (no nosso caso, o arquivo `main.js` que irá executar o processo principal. Normalmente, o script que é executado no processo principal controla o ciclo de vida da aplicação, exibe a interface gráfica do usuário e seus elementos, executa interações nativas do sistema operacional e cria processos de Renderização nas páginas web. Uma aplicação Electron pode ter apenas um processo principal.

O script principal pode ser assim:

```javascript fiddle='docs/fiddles/quick-start'
const { app, BrowserWindow } = require('electron')
const path = require('path')

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

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

##### O que se está a passar?

1. Linha 1: Primeiro, você importa os módulos de aplicativo `` e `BrowserWindow` do pacote `electron` para ser capaz de gerenciar os eventos do ciclo de vida de seu aplicativo, Além de criar e controlar janelas do navegador.
2. Line 2: Second, you import the `path` package which provides utility functions for file paths.
3. Line 4: After that, you define a function that creates a [new browser window](../api/browser-window.md#new-browserwindowoptions) with a preload script, loads `index.html` file into this window (line 13, we will discuss the file later).
4. Linha 16: Você cria uma nova janela do navegador invocando a função `createWindow` quando o aplicativo Electron [for inicializado](../api/app.md#appwhenready).
5. Line 18: You add a new listener that creates a new browser window only if when the application has no visible windows after being activated. Por exemplo, depois de lançar o aplicativo pela primeira vez, ou reiniciando o aplicativo já em execução.
6. Line 25: You add a new listener that tries to quit the application when it no longer has any open windows. Este listener é um no-op no macOS devido ao [comportamento de gerenciamento de janelas do sistema operacional](https://support.apple.com/en-ca/guide/mac-help/mchlp2469/mac).

#### Criar uma página da web

Esta é a página da web que você deseja exibir uma vez que o aplicativo é inicializado. Esta página web representa o processo Renderer. Você pode criar várias janelas do navegador, onde cada janela usa seu próprio Renderizador independente. You can optionally grant access to additional Node.js APIs by exposing them from your preload script.

A página `index.html` será a seguinte:

```html fiddle='docs/fiddles/quick-start'
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
</head>
<body style="background: white;">
    <h1>Hello World!</h1>
    <p>
        We are using Node.js <span id="node-version"></span>,
        Chromium <span id="chrome-version"></span>,
        and Electron <span id="electron-version"></span>.
    </p>
</body>
</html>
```

#### Define a preload script

Your preload script acts as a bridge between Node.js and your web page. It allows you to expose specific APIs and behaviors to your web page rather than insecurely exposing the entire Node.js API. In this example we will use the preload script to read version information from the `process` object and update the web page with that info.

```javascript fiddle='docs/fiddles/quick-start'
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
```

##### What's going on above?

1. On line 1: First you define an event listener that tells you when the web page has loaded
2. On line 2: Second you define a utility function used to set the text of the placeholders in the `index.html`
3. On line 7: Next you loop through the list of components whose version you want to display
4. On line 8: Finally, you call `replaceText` to look up the version placeholders in `index.html` and set their text value to the values from `process.versions`

#### Modifique seu arquivo package.json

Sua aplicação Electron usa o arquivo `package.json` como ponto de entrada principal (como qualquer outro aplicativo Node.js). O script principal de sua aplicação é o `main.js`, então modifique o arquivo `package.json` de acordo:

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "author": "your name",
    "description": "My Electron app",
    "main": "main.js"
}
```

> NOTA: Se o campo `principal` for omitido, o Electron tentará carregar um índice `. s` arquivo do diretório que contém `package.json`.

> NOTE: The `author` and `description` fields are required for packaging, otherwise error will occur when running `npm run make`.

Por padrão, o comando `npm start` executará o script principal com Node.js. Para executar o script com o Electron, você precisa alterá-lo como tal:

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "author": "your name",
    "description": "My Electron app",
    "main": "main.js",
    "scripts": {
        "start": "electron ."
    }
}
```

#### Execute sua aplicação

```sh
início do npm
```

Seu aplicativo Electron em execução deve se parecer com o seguinte:

![Simplesmente aplicativo Electron](../images/simplest-electron-app.png)

### Empacotar e distribuir o aplicativo

A maneira mais simples e mais rápida de distribuir seu recém-criado aplicativo é usando [Electron Forge](https://www.electronforge.io).

1. Importar Electron Forge para a pasta do aplicativo:

    ```sh
    npm install --save-dev @electron-forge/cli
    npx electron-forge import

    ✔ Checking your system
    ✔ Initializing Git Repository
    ✔ Writing modified package.json file
    ✔ Installing dependencies
    ✔ Writing modified package.json file
    ✔ Fixing .gitignore

    We have ATTEMPTED to convert your app to be in a format that electron-forge understands.

    Obrigado por usar "electron-forge"!!!
    ```

1. Criar um distribuidor:

    ```sh
    npm run make

    > meu-gsod-electron-app@1.0. faça /my-electron-app
    > electron-forge make

    ✔ Verificando seu sistema
    ✔ Resolvendo a configuração do Forge
    Nós precisamos empacotar sua aplicação antes de podermos fazê-lo
    ✔ Preparando o Aplicativo de Pacote para arco: x64
    ✔ Preparando dependências nativas
    ✔ Aplicação de empacotamento
    Fazendo para os seguintes alvos: zip
    ✔ Criando para o alvo: zip - Na plataforma: darwin - Para arco: x64
    ```

    O Electron-forge cria a pasta `` onde seu pacote será localizado:

    ```plain
    // Exemplo para MacOS
    de saída/
    ── out/make/zip/darwin/x64/my-electron-app-darwin-x64-1.0.0.zip
    ── ...
    ─ out/my-electron-app-darwin-x64/my-electron-app.app/Contents/MacOS/my-electron-app
    ```

## Aprendendo os conceitos básicos

Esta seção guia você sobre o básico de como o Electron funciona por debaixo do pano. Visa reforçar o conhecimento sobre o Electron e o aplicativo criado anteriormente na seção QuickStart.

### Arquitetura da aplicação

O Electron é composto por três pilares principais:

* **Chromium** para exibir conteúdo da web.
* **Node.js** para trabalhar com o sistema de arquivos local e o sistema operacional.
* **APIs personalizadas** para trabalhar com funções nativas do sistema operacional frequentemente necessárias.

Desenvolver um aplicativo com Electron é como construir um aplicativo Node.js com uma interface web ou construir páginas web com integração perfeita de Node.js.

#### Processos Principal e de Renderização

Como foi mencionado anteriormente, o Electron tem dois tipos de processos: Principal e Renderizador.

* O processo principal **cria** páginas web criando instâncias de `BrowserWindow`. Cada `instância do BrowserWindow` executa a página web em seu processo de renderização. Quando uma instância de `BrowserWindow` é destruída, o processo de renderização correspondente também é encerrado.
* O processo principal **gerencia** todas as páginas web e seus processos de renderização correspondentes.

----

* O processo Renderer **gerencia** apenas a página web correspondente. Uma falha num processo de Renderização não afecta outros processos de Renderização.
* O processo Renderer **se comunica** com o processo principal através do IPC para executar operações GUI em uma página web. Chamadas nativas de APIs relacionadas a interface GUI do processo Renderer são restringidas diretamente devido a preocupações de segurança e potencial vazamento de recursos.

----

A comunicação entre processos é possível através de módulos de Comunicação Inter-Processo (IPC): [`ipcMain`](../api/ipc-main.md) e [`ipcRenderer`](../api/ipc-renderer.md).

#### APIs

##### Electron API

APIs Electron são atribuídas com base no tipo de processo, significando que alguns módulos podem ser usados do processo Principal ou Renderizador, e alguns de ambos. A documentação da API do Electron indica qual processo pode ser usado em cada módulo.

Por exemplo, para acessar a API do Electron em ambos os processos, requer o módulo incluído:

```js
const electron = require('electron')
```

Para criar uma janela, chame a classe `BrowserWindow` , que está disponível apenas no processo principal:

```js
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
```

Para chamar o processo principal do Renderizador, use o módulo IPC:

```js
// In the Main process
const { ipcMain } = require('electron')

ipcMain.handle('perform-action', (event, ...args) => {
  // ... do actions on behalf of the Renderer
})
```

```js
// No processo Renderer
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('perform-action', ...args)
```

> NOTA: Porque Processos de Renderização podem executar código não confiável (especialmente de terceiros), é importante validar cuidadosamente os pedidos que chegam ao processo principal.

##### Node.js API

> NOTE: To access the Node.js API from the Renderer process, you need to set the `nodeIntegration` preference to `true` and the `contextIsolation` preference to `false`.  Please note that access to the Node.js API in any renderer that loads remote content is not recommended for [security reasons](../tutorial/security.md#2-do-not-enable-nodejs-integration-for-remote-content).

Electron expõe acesso total à API do Node.js e seus módulos nos processos Principal e Renderer. Por exemplo, você pode ler todos os arquivos do diretório raiz:

```js
const fs = require('fs')

const root = fs.readdirSync('/')

console.log(root)
```

Para usar um módulo do Node.js, primeiro você precisa instalá-lo como uma dependência:

```sh
npm install --save aws-sdk
```

Em seguida, em seu aplicativo Electron, requer o módulo:

```js
const S3 = require('aws-sdk/clients/s3')
```
