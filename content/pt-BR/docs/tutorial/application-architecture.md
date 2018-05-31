# Arquitetura de Aplicativos Electron

Antes de nos aprofundarmos nas APIs do Electron, precisamos discutir os dois tipos de processo disponíveis no Electron. Eles têm conceitos diferentes e importantes para se entender.

## Processos Principal e de Renderização

No Electron, o processo que executa o script `main` do `package.json` é chamado de **processo principal**. O script que executa no processo principal pode apresentar uma interface gráfica através da criação de páginas web. Um aplicativo Electron sempre tem um processo principal, mas nunca mais de um.

Uma vez que o Electron utiliza o Chromium para a apresentação de páginas web, a arquitetura de multiprocessamento do Chromium também é utilizada. Cada página web no Electron executa seu próprio processo, que é chamado de **processo de renderização**.

Em navegadores normais, as páginas web geralmente executam em um ambiente de área restrita e não têm a permissão de acessar recursos nativos. Usuários do Electron, por outro lado, têm o poder de usar as APIs do Node.js em páginas web, permitindo interações de baixo nível com o sistema operacional.

### Diferenças Entre o Processo Principal e o Processo de Renderização

O processo principal cria páginas web pela criação de instâncias de `BrowserWindow`. Cada instância de `BrowserWindow` executa a página web em seu próprio processo de renderização. Quando uma instância de `BrowserWindow` é destruída, o processo de renderização correspondente também é finalizado.

O principal processo gerencia todas as web páginas e seus correspondentes processos de renderização. Cada processo de renderização é isolado e só se preocupa com a web página que nele executa.

Em páginas web, chamar APIs nativas relacionadas à interface gráfica de usuário não é permitido, uma vez que o gerenciamento de recursos nativos em páginas web é muito perigoso e facilita a ocorrência de vazamento de recursos. Se você quiser executar operações de interface gráfica em uma página web, o processo de renderização da página deve estabelecer uma comunicação com o processo principal para requisitar que ele efetue essas operações.

> #### Aparte: Comunicação Entre Processos
> 
> No Electron, nós temos diversas maneiras de estabelecer uma comunicação entre o processo principal e os processos de renderização. Como os módulos [`ipcRenderer`](../api/ipc-renderer.md) e [`ipcMain`](../api/ipc-main.md) para o envio de mensagens, e o módulo [remote](../api/remote.md) para comunicação no estilo RPC. Também existe um tópico de perguntas frequentes sobre [como compartilhar dados entre páginas web](../faq.md#how-to-share-data-between-web-pages).

## Usando Electron APIs

Electron oferece uma série de APIs que suportam o desenvolvimento de uma aplicação desktop em ambos, o processos principal e o processo de renderização. Em ambos os processos, você pode acessa Electron APIs exigindo seu módulo:

```javascript
const electron = require('electron')
```

Todas as Electron APIs são atribuídas em um tipo de processo. Muitos deles só podem ser usados a partir do processo principal, algumas a partir do processo de renderização e outros em ambos. The documentation for each individual API will state which process it can be used from.

Uma janela no Electron, por exemplo, é criada usando a classe `BrowserWindow`. Disponível apenas no processo principal.

```javascript
// Isso funcionaria no processo principal, mas em um processo de renderização,
// a constante seria inicializada como `undefined`:
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
```

Since communication between the processes is possible, a renderer process can call upon the main process to perform tasks. Electron comes with a module called `remote` that exposes APIs usually only available on the main process. In order to create a `BrowserWindow` from a renderer process, we'd use the remote as a middle-man:

```javascript
// This will work in a renderer process, but be `undefined` in the
// main process:
const { remote } = require('electron')
const { BrowserWindow } = remote

const win = new BrowserWindow()
```

## Usando Node.js APIs

Electron exposes full access to Node.js both in the main and the renderer process. This has two important implications:

1) All APIs available in Node.js are available in Electron. Calling the following code from an Electron app works:

```javascript
const fs = require('fs')

const root = fs.readdirSync('/')

// This will print all files at the root-level of the disk,
// either '/' or 'C:\'.
console.log(root)
```

As you might already be able to guess, this has important security implications if you ever attempt to load remote content. You can find more information and guidance on loading remote content in our [security documentation](./security.md).

2) You can use Node.js modules in your application. Pick your favorite npm module. npm offers currently the world's biggest repository of open-source code – the ability to use well-maintained and tested code that used to be reserved for server applications is one of the key features of Electron.

As an example, to use the official AWS SDK in your application, you'd first install it as a dependency:

```sh
npm install --save aws-sdk
```

Then, in your Electron app, require and use the module as if you were building a Node.js application:

```javascript
// A ready-to-use S3 Client
const S3 = require('aws-sdk/clients/s3')
```

There is one important caveat: Native Node.js modules (that is, modules that require compilation of native code before they can be used) will need to be compiled to be used with Electron.

The vast majority of Node.js modules are *not* native. Only 400 out of the ~650.000 modules are native. However, if you do need native modules, please consult [this guide on how to recompile them for Electron](./using-native-node-modules.md).