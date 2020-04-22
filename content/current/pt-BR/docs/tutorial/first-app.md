# Escrevendo Seu Primeiro Aplicativo com Electron

Electron permite criar aplicações desktop com JavaScript puro, fornecendo em tempo de execução uma API rica e nativa do sistema operacional. Você pode vê-lo como uma variação da runtime do Node.js com foco em aplicações de desktop em vez de servidores web.

Isso não significa que o Electron é uma ligação de Javascript a bibliotecas de interface gráfica de usuário (GUI). Pelo contrário, o Electron utiliza páginas web como sua interface gráfica, de modo que você pode vê-lo como um simples navegador Chromium, controlado por Javascript.

**Nota**: Este exemplo também está disponível como um repositório, você pode [baixar e executar imediatamente](#trying-this-example).

O desenvolvimento pode ser preocupante, porém, uma aplicação Electron é essencialmente uma aplicação Node.js. O ponto de entrada é o `package.json`, semelhante ao módulos do Node.js. Uma aplicação Electron simples terá a estrutura abaixo:

```plaintext
seu-app/
├── package.json
├── main.js
└── index.html
```

Crie uma nova pasta vazia para seu novo aplicativo em Electron. Abra seu terminal e execute `npm init` nessa mesma pasta.

```sh
npm init
```

npm vai guiá-lo para criação de um arquivo básico o `package.json`. O script especificado pelo campo `main` é o script de inicialização do seu app, que irá executar o processo principal. Um exemplo de como seu `package.json` possa parecer:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js"
}
```

__Nota__: Se o campo `main` não se encontra em `package.json`, Electron tentará carregar um `index.js` (assim como Node.js faz). Se isso fosse realmente um simples aplicativo em Node, você adicionaria um script `start`, para instruir o `node` para executar o pacote atual:

```json
{
  "name": "seu-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "node ."
  }
}
```

Transformar esse aplicativo em Node para Electron é bastante simples - nós vamos substituir o termo `node` para o runtime `electron`.

```json
{
  "name": "seu-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  }
}
```

## Instalando o Electron

Nesse ponto, você precisará instalar o `electron`. A maneira recomendada de fazer isso é instalá-lo como uma dependência de desenvolvimento em seu aplicativo, permite que você trabalhe em múltiplos aplicativos com diferentes versões do Electron. Para fazer isso, execute o seguinte comando no diretório do seu aplicativo:

```sh
npm install --save-dev electron
```

Há outros meios para instalar o Electron. Por favor, consulte o [guia de instalação ](installation.md) para aprender mais sobre com usar com proxies, espelhos e caches personalizados.

## Desenvolvimento Electron em um Nutshell

Os apps em Electron são desenvolvidos em JavaScript usando os mesmos princípios e métodos encontrados no desenvolvimento com Node.js. Todas as APIs e funcionalidades encontradas no Electron estão acessíveis através do módulo do `electron`, que pode ser necessário, como qualquer outro módulo Node.js:

```javascript
const electron = require('electron')
```

O módulo de `electron` expõe recursos em namespaces. Como exemplos, o ciclo de vida da aplicação é gerenciado pelo `electron.app`, janelas podem ser criadas utilizando a classe `electron.BrowserWindow`. Um simples arquivo `main.js` que espera a aplicação estar pronta para então abrir uma janela:

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Cria uma janela de navegação.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // e carregar o index.html do aplicativo.
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)
```

O `main.js` deve conter a criação de janelas e manipular todos os eventos que seu sistema possa conter. Uma versão mais completa do exemplo acima poderia abrir ferramentas de desenvolvedores, armazenar a janela que está sendo fechada ou recriar janelas no macOS caso o usuário clique no ícone do aplicativo.

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Cria uma janela de navegação.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
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
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. Você também pode colocar eles em arquivos separados e requeridos-as aqui.
```

Finalmente, o `index.html` é a pagina da web que você quer mostrar:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <!-- https://electronjs.org/docs/tutorial/security#csp-meta-tag -->
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## Executando Seu Aplicativo

Depois de criar seus arquivos iniciais `main.js`,`index.html` e `package.json`, você pode tentar executar seu aplicativo com `npm start` no diretório do seu aplicativo.

## Experimente esse Exemplo

Clone e execute o código nesse tutorial utilizando o repositório [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start).

**Note**: Running this requires [Git](https://git-scm.com) and [npm](https://www.npmjs.com/).

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

Para uma lista de padrões e ferramentas para iniciar seu processo de desenvolvimento, consulte [Boilerplates e documentação CLI](./boilerplates-and-clis.md).
