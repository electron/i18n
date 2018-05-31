# Arquitetura de Aplicativos Electron

Antes de nos aprofundarmos nas APIs do Electron, precisamos discutir os dois tipos de processo disponíveis no Electron. Eles têm conceitos diferentes e importantes para se entender.

## Processos Principal e de Renderização

No Electron, o processo que executa o script `main` do `package.json` é chamado de **processo principal**. O script que roda no processo principal pode apresentar uma interface gráfica através da criação de páginas web. Um aplicativo Electron sempre tem um processo principal, mas nunca mais de um.

Como o Electron usa o Chromium para a apresentação de páginas web, a arquitetura de multiprocessos do Chromium também é utilizada. Cada página web no Electron é executada em seu próprio processo, que é chamado de **processo de renderização**.

Em navegadores normais, as páginas web geralmente executam em um ambiente de área restrita e não têm a permissão de acessar recursos nativos. Usuários do Electron, por outro lado, têm o poder de usar as APIs do Node.js em páginas web, permitindo interações de baixo nível com o sistema operacional.

### Diferenças Entre o Processo Principal e o Processo de Renderização

O processo principal cria páginas web pela criação de instâncias de `BrowserWindow`. Cada instância de `BrowserWindow` executa a página web em seu próprio processo de renderização. Quando uma instância de `BrowserWindow` é destruída, o processo de renderização correspondente também é finalizado.

O processo principal gerencia todas as páginas web e seus processos de renderização correspondentes. Cada processo de renderização é isolado e só se preocupa com a página web que está rodando nele.

Em páginas web, chamar APIs nativas relacionadas à interface gráfica de usuário não é permitido, uma vez que o gerenciamento de recursos nativos em páginas web é muito perigoso e facilita a ocorrência de vazamento de recursos. Se você quiser executar operações de interface gráfica em uma página web, o processo de renderização da página deve estabelecer uma comunicação com o processo principal para requisitar que ele efetue essas operações.

> #### Aparte: Comunicação Entre Processos
> 
> No Electron, nós temos diversas maneiras de estabelecer uma comunicação entre o processo principal e os processos de renderização. Exemplos são os módulos [`ipcRenderer`](../api/ipc-renderer.md) e [`ipcMain`](../api/ipc-main.md) para o envio de mensagens, e o módulo [remote](../api/remote.md) para comunicação no estilo RPC. Também existe um tópico de perguntas frequentes sobre [como compartilhar dados entre páginas web](../faq.md#how-to-share-data-between-web-pages).

## Usando APIs do Electron

O Electron oferece uma série de APIs que auxiliam no desenvolvimento de um aplicativo desktop em ambos os processos principal e o de renderização. Em ambos os processos, você pode acessar as APIs do Electron importando o módulo:

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

Como a comunicação entre os processos é possível, um processo de renderização pode pedir para o processo principal realizar tarefas. O Electron vem com um módulo chamado `remote`, que expõe APIs que normalmente estariam disponíveis apenas para o processo principal. Para poder criar uma `BrowserWindow` a partir de um processo de renderização, usaríamos o remote como intermediário:

```javascript
// Isso vai funcionar em um processo de renderização, mas vai
// resultar em `undefined` no processo principal:
const { remote } = require('electron')
const { BrowserWindow } = remote

const win = new BrowserWindow()
```

## Usando Node.js APIs

O Electron permite acesso completo ao Node.js tanto no processo principal como no de renderização. Isso tem duas implicações importantes:

1) Todas as APIs disponíveis no Node.js estão disponíveis no Electron. Rodar o seguinte código a partir de um aplicativo Electron vai funcionar:

```javascript
const fs = require('fs')

const root = fs.readdirSync('/')

// Isso imprimirá todos os arquivos no diretório raiz
// do disco, seja ele '/' ou 'C:\'.
console.log(root)
```

Como você já pode ter adivinhado, isso tem implicações importantes de segurança se você tentar carregar conteúdo remoto. Você pode encontrar mais informações e orientações sobre carregamento de conteúdo remoto em nossa [documentação de segurança](./security.md).

2) Você pode usar módulos do Node.js em seu aplicativo. Escolha seu módulo favorito do npm. O npm oferece atualmente o maior repositório de código aberto do mundo - a capacidade de usar código bem estabelecido e testado que anteriormente era reservado para aplicações em servidores é uma das características principais do Electron.

Por exemplo, para usar o SDK oficial da AWS em seu aplicativo, primeiro você o instalaria como uma dependência:

```sh
npm install --save aws-sdk
```

Aí, em seu app Electron, você poderia importar e usar o módulo como se estivesse desenvolvendo uma aplicação no Node.js:

```javascript
// Um cliente do S3 prontinho para usar
const S3 = require('aws-sdk/clients/s3')
```

There is one important caveat: Native Node.js modules (that is, modules that require compilation of native code before they can be used) will need to be compiled to be used with Electron.

The vast majority of Node.js modules are *not* native. Only 400 out of the ~650.000 modules are native. However, if you do need native modules, please consult [this guide on how to recompile them for Electron](./using-native-node-modules.md).