# Arquitetura de Aplicativos Electron

Antes de nos aprofundarmos nas APIs do Electron, precisamos discutir os dois tipos de processo disponíveis no Electron. Eles têm conceitos diferentes e importantes para se entender.

## Processos Principal e de Renderização

No Electron, o processo que executa o script `main` do `package.json` é chamado de __processo principal__. O script que roda no processo principal pode apresentar uma interface gráfica através da criação de páginas web. Um aplicativo Electron sempre tem um processo principal, mas nunca mais de um.

Como o Electron usa o Chromium para a apresentação de páginas web, a arquitetura de multiprocessos do Chromium também é utilizada. Cada página web no Electron executa seu próprio processo, que é chamado de __processo de renderização__.

Em navegadores normais, as páginas web geralmente rodam em um ambiente de área restrita e não têm a permissão de acessar recursos nativos. Usuários do Electron, por outro lado, têm o poder de usar as APIs do Node.js em páginas web, permitindo interações de baixo nível com o sistema operacional.

### Diferenças entre o processo principal e o processo de renderização

O processo principal cria páginas web pela criação de instâncias de `BrowserWindow`. Cada instância de `BrowserWindow` executa a página web em seu próprio processo de renderização. Quando uma instância de `BrowserWindow` é destruída, o processo de renderização correspondente também é finalizado.

O processo principal gerencia todas as páginas web e seus processos de renderização correspondentes. Cada processo de renderização é isolado e só se preocupa com a página web que está rodando nele.

Em páginas web, chamar APIs nativas relacionadas à interface gráfica de usuário não é permitido, uma vez que o gerenciamento de recursos nativos em páginas web é muito perigoso e facilita a ocorrência de vazamento de recursos. Se você quiser executar operações de interface gráfica em uma página web, o processo de renderização da página deve estabelecer uma comunicação com o processo principal para requisitar que ele efetue essas operações.

> #### Aparte: Comunicação entre processos
> 
> In Electron, communicating between the main process and renderer processes, is done through the [`ipcRenderer`](../api/ipc-renderer.md) and [`ipcMain`](../api/ipc-main.md) modules. There is also an FAQ entry on [how to share data between web pages](../faq.md#how-to-share-data-between-web-pages).


## Usando APIs do Electron

O Electron oferece uma série de APIs que auxiliam no desenvolvimento de um aplicativo desktop em ambos os processos principal e de renderização. Em ambos os processos, você pode acessar as APIs do Electron importando o módulo:

```javascript
const electron = require('electron')
```

Todas as APIs do Electron são atribuídas a um tipo de processo. Muitas delas só podem ser acessadas a partir do processo principal, algumas a partir do processo de renderização e outras em ambos. A documentação de cada uma dessas APIs informará em qual tipo de processo ela pode ser usada.

Uma janela no Electron, por exemplo, é criada usando a classe `BrowserWindow`. Disponível apenas no processo principal.

```javascript
// Isso funcionaria no processo principal, mas em um processo de renderização,
// a constante seria inicializada como `undefined`:
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
```

Since communication between the processes is possible, a renderer process can call upon the main process to perform tasks through IPC.

```javascript
// In the main process:
const { ipcMain } = require('electron')

ipcMain.handle('perform-action', (event, ...args) => {
  // ... do something on behalf of the renderer ...
})

// In the renderer process:
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('perform-action', ...args)
```

Note that code in the renderer may not be trustworthy, so it's important to carefully validate in the main process requests that come from renderers, especially if they host third-party content.

## Usando Node.js APIs

O Electron permite acesso completo ao Node.js tanto no processo principal como no de renderização. Isso tem duas implicações importantes:

1) Todas as APIs disponíveis no Node.js estão disponíveis no Electron. Rodar o seguinte código a partir de um aplicativo Electron vai funcionar:

```javascript
const fs = require('fs')

const root = fs.readdirSync('/')

// Isso imprimirá todos os arquivos presentes no 
// diretório raiz do disco, seja ele '/' ou 'C:\'.
console.log(root)
```

Como você já pode ter adivinhado, isso tem implicações importantes de segurança se você tentar carregar conteúdo remoto. Você pode encontrar mais informações e orientações sobre carregamento de conteúdo remoto em nossa [documentação de segurança](./security.md).

2) Você pode usar módulos do Node.js em seu aplicativo. Escolha seu módulo favorito do npm. O npm oferece atualmente o maior repositório de código aberto do mundo. A capacidade de usar código bem estabelecido e testado que anteriormente era reservado para aplicações em servidores é um dos pontos fortes do Electron.

Por exemplo, para usar o SDK oficial da AWS em seu aplicativo, primeiro você o instalaria como uma dependência:

```sh
npm install --save aws-sdk
```

Aí, em seu app Electron, você poderia importar e usar o módulo como se estivesse desenvolvendo uma aplicação no Node.js:

```javascript
// Um cliente do S3 prontinho para usar
const S3 = require('aws-sdk/clients/s3')
```

Existe uma ressalva importante: módulos nativos do Node.js (ou seja, módulos que precisam ser compilados em código nativo antes de serem usados) precisam antes, é claro, ser compilados para poderem ser usados no Electron.

A grande maioria dos módulos do Node.js _não_ é nativa. Apenas 400 dos cerca de 650,000 módulos são nativos. No entanto, se você precisar de módulos nativos, consulte [este guia sobre como recompilá-los para o Electron](./using-native-node-modules.md).
