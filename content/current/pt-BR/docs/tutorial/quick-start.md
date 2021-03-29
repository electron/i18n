# Guia de início rápido

## QuickStart

Electron é um framework que te permite criar aplicações desktop com JavaScript, HTML e CSS. Essas aplicações podem então ser empacotadas para executar diretamente no macOS, Windows, ou Linux, ou distribuídas através da Mac App Store ou da Microsoft Store.

Normalmente, você cria um aplicativo desktop para um sistema operacional (OS) usando frameworks de aplicativo nativos específicos de cada sistema operacional. Electron torna possível escrever seu aplicativo uma vez usando tecnologias que você já conhece.

### Pré-requisitos

Antes de prosseguir com o Electron você precisa instalar o [Node.js](https://nodejs.org/en/download/). Recomendamos que você instale a versão `LTS` mais recente ou a versão `atual` disponível.

> Por favor, instale o Node.js usando instaladores específicos para sua plataforma. Caso contrário, você pode encontrar problemas de incompatibilidade com ferramentas de desenvolvimento diferentes.

Para verificar se o Node.js foi instalado corretamente, digite os seguintes comandos em seu terminal de comando:

```sh
node -v
npm -v
```

Os comandos devem imprimir as versões do Node.js e npm, respectivamente. Se ambos os comandos forem bem-sucedidos, você estará pronto para instalar o Electron.

### Crie uma aplicação básica

De uma perspectiva de desenvolvimento, um aplicativo Electron é essencialmente um aplicativo Node.js. Isso significa que o ponto de partida de sua aplicação Electron será um arquivo `package.json` como em qualquer outro aplicativo Node.js. A estrutura mínima de uma aplicação Electron é a seguinte:

```plaintext
my-electron-app/
├── package.json
├── main.js
├── preload.js
└── index.html
```

Vamos criar um aplicativo básico baseado na estrutura acima.

#### Instalando Electron

Crie uma pasta para seu projeto e instale o Electron nela:

```sh
mkdir my-electron-app && cd my-electron-app
npm init -y
npm i --save-dev electron
```

#### Crie o arquivo de script principal

O script principal especifica o ponto de entrada da sua aplicação Electron (no nosso caso, o arquivo `main.js`) que irá executar o processo principal. Normalmente, o script que executa o processo principal controla o ciclo de vida da aplicação, exibe a interface gráfica do usuário e seus elementos, executa interações nativas do sistema operacional e cria processos de Renderização nas páginas web. Uma aplicação Electron só pode ter apenas um processo principal.

O script principal pode ser como a seguir:

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
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

##### O que está acontecendo acima?

1. Linha 1: Primeiro, você importa os módulos `app` e `BrowserWindow` do pacote `electron` para ser capaz de gerenciar os eventos do ciclo de vida de seu aplicativo, bem como criar e controlar janelas do navegador.
2. Linha 2: Segundo, você importa o pacote `path`, o qual fornece funções úteis para caminhos de arquivos.
3. Linha 4: Após isso, você define uma função que cria uma [nova janela de navegador](../api/browser-window.md#new-browserwindowoptions) com um script de pré-carregamento, carrega o arquivo `index.html` nesta janela (linha 13, falaremos sobre este arquivo mais tarde).
4. Linha 16: Você cria uma nova janela do navegador invocando a função `createWindow` quando o aplicativo Electron [for inicializado](../api/app.md#appwhenready).
5. Linha 19: Você adiciona um novo listener que cria uma nova janela de navegador somente se a aplicação não tem janela visível sendo ativada. Por exemplo, depois de iniciar a aplicação pela primeira vez, ou reiniciando a aplicação já em execução.
6. Linha 26: Você adiciona um novo listener que tenta sair da aplicação quando ela não tem mais nenhuma janela aberta. Este listener é um no-op no macOS devido ao [comportamento de gerenciamento de janelas do sistema operacional](https://support.apple.com/en-ca/guide/mac-help/mchlp2469/mac).

#### Crie uma página web

Esta é a página da web que você deseja exibir uma vez que o aplicativo é inicializado. Esta página web representa o processo renderizador. Você pode criar várias janelas de navegador, onde cada janela usa seu próprio renderizador independente. Opcionalmente, você pode permitir o acesso a APIs Node.js adicionais, expondo-as a partir de seu script de pré-carregamento.

A página `index.html` parece com a seguinte:

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

#### Defina um script de pré-carregamento

Seu script de pré-carregamento atua como uma ponte entre Node.js e sua página web. Isso lhe permite expor APIs e comportamentos específicos para a sua página web, em vez de expor de forma insegura toda a API do Node.js. Neste exemplo, usaremos o script de pré-carregamento para ler informações da versão do objeto `process` e atualizar a página web com essa informação.

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

##### O que está acontecendo acima?

1. Na linha 1: Primeiro você define um event listener que te informa quando a página web carregou
2. Na linha 2: Segundo, você define uma função útil usada para definir o texto dos espaços reservados no arquivo `index.html`
3. Na linha 7: Em seguida, você faz um loop através da lista de componentes cuja versão deseja exibir
4. Na linha 8: Finalmente, você chama `replaceText` para procurar os espaços reservados no `index.html` e definir seus valores de texto para os valores de `process.versions`

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

> NOTA: Se o campo `main` é omitido, o Electron tentará carregar um arquivo `index.js` do diretório contendo o arquivo `package.json`.

> NOTA: Os campos `author` e `description` são necessários para fazer o empacotamento, caso contrário, um erro irá ocorrer quando executar o comando `npm run make`.

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

### Empacote e distribua a aplicação

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

* O processo principal **cria** páginas web criando instâncias de `BrowserWindow`. Cada instância do `BrowserWindow` executa a página web em seu processo de renderização. Quando uma instância de `BrowserWindow` é destruída, o processo de renderização correspondente também é encerrado.
* O processo principal **gerencia** todas as páginas web e seus processos de renderização correspondentes.

----

* O processo de renderização **gerencia** apenas a página web correspondente. Uma falha num processo de renderização não afeta outros processos de renderização.
* O processo de renderização **se comunica** com o processo principal através de IPC (instruções por ciclo) para executar operações na GUI (interface gráfica do usuário) em uma página web. Chamar APIs relacionadas a GUI nativas diretamente do processo de renderização é restrito, devido a questões de segurança e potencial vazamento de recursos.

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

> NOTA: Para acessar a API do Node.js do processo de renderização, você precisa definir a preferência `nodeIntegration` para `true` e a preferência `contextIsolation` para `false`.  Por favor, note que o acesso à API do Node.js em qualquer renderizador que carrega conteúdo remoto não é recomendado por [razões de segurança](../tutorial/security.md#2-do-not-enable-nodejs-integration-for-remote-content).

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
