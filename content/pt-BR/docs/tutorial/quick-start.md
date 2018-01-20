# Início Rápido

Electron permite criar aplicações desktop com JavaScript puro, fornecendo em tempo de execução uma API rica e nativa do sistema operacional. Você pode ver como uma variação da runtime do Node.js com foco em aplicações de desktop em vez de servidores web.

Isso não significa que o Electron é uma ligação de Javascript a bibliotecas de interface gráfica de usuário (GUI). Pelo contrário, o Electron utiliza páginas web como sua interface gráfica, de modo que você pode vê-lo como um simples navegador Chromium, controlado por Javascript.

### Processo Principal

No Electron, o processo que executa o script `main` do `package.json` é chamado de **processo principal**. O script que executa no processo principal pode apresentar uma interface gráfica através da criação de páginas web.

### Processo de Renderização

Uma vez que o Electron utiliza o Chromium para a apresentação de páginas web, a arquitetura de multiprocessamento do Chromium também é utilizada. Cada página web no Electron executa seu próprio processo, que é chamado de **processo de renderização**.

Em navegadores normais, as páginas web geralmente executam em um ambiente de área restrita e não têm a permissão de acessar recursos nativos. Usuários do Electron, por outro lado, têm o poder de usar as APIs do Node.js em páginas web, permitindo interações de baixo nível com o sistema operacional.

### Diferenças Entre o Processo Principal e o Processo de Renderização

O processo principal cria páginas web pela criação de instâncias de `BrowserWindow`. Cada instância de `BrowserWindow` executa a página web em seu próprio processo de renderização. Quando uma instância de `BrowserWindow` é destruída, o processo de renderização correspondente também é finalizado.

O processo principal gerencia todas as páginas web e seus processos de renderização correspondentes. Cada processo de renderização é isolado e apenas se preocupa com a página web executando nele.

Em páginas web, chamar APIs nativas relacionadas à interface gráfica de usuário não é permitido, uma vez que o gerenciamento de recursos nativos em páginas web é muito perigoso e facilita a ocorrência de vazamento de recursos. Se você quiser executar operações de interface gráfica em uma página web, o processo de renderização da página deve estabelecer uma comunicação com o processo principal para requisitar que ele efetue essas operações.

No Electron, nós temos diversas maneiras de estabelecer uma comunicação entre o processo principal e os processos de renderização. Como os módulos [`ipcRenderer`](../api/ipc-renderer.md) e [`ipcMain`](../api/ipc-main.md) para o envio de mensagens, e o módulo [remote](../api/remote.md) para comunicação no estilo RPC. Também existe um tópico no FAQ sobre [como compartilhar dados entre páginas web](../faq.md#how-to-share-data-between-web-pages).

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

Uma vez criados seus arquivos `main.js`, `index.html` e `package.json` iniciais, você provavelmente vai querer tentar rodar seu aplicativo localmente para testá-lo e garantir que ele está funcionando conforme o esperado.

### `electron`

[`electron`](https://github.com/electron-userland/electron-prebuilt) é um módulo `npm` que contém versões pré-compiladas do Electron.

Se você o instalou globalmente com o `npm`, então você vai precisar apenas executar o seguinte comando no diretório principal do seu aplicativo:

```sh
electron .
```

Se você o instalou localmente, então execute:

#### macOS / Linux

```sh
$ ./node_modules/.bin/electron .
```

#### Windows

```sh
$ .\node_modules\.bin\electron .
```

#### Node v8.2.0 and later

```sh
$ npx electron .
```

### Binário do Electron Baixado Manualmente

Se você efetuou o download manual do Electron, você também pode utilizar o binário incluído para executar seu aplicativo diretamente.

#### macOS

```sh
$ ./Electron.app/Contents/MacOS/Electron seu-app/
```

#### Linux

```sh
$ ./electron/electron seu-app/
```

#### Windows

```sh
$ .\electron\electron.exe seu-app\
```

O `Electron.app` aqui é parte do pacote de liberação do Electron, você pode baixá-lo [aqui](https://github.com/electron/electron/releases).

### Executar como uma distribuição

Depois de terminar de escrever seu aplicativo, você pode criar uma distribuição seguinte o guia de [Distribuição de Aplicações](./application-distribution.md) e depois executar o aplicativo empacotado.

### Experimente esse Exemplo

Clone e execute o código nesse tutorial utilizando o repositório [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start).

**Nota**: Para executar esse aplicativo, é necessário possuir o [Git](https://git-scm.com) e o [Node.js](https://nodejs.org/en/download/) (que também inclui o [npm](https://npmjs.org)) instalados no seu sistema.

```sh
# Clone o repositório
$ git clone https://github.com/electron/electron-quick-start
# Vá para o repositório
$ cd electron-quick-start
# Instale as dependências
$ npm install
# Execute o aplicativo
$ npm start
```

Para mais aplicativos de exemplo, veja a [lista de boilerplates](https://electronjs.org/community#boilerplates) criada pela fantástica comunicade do Electron.