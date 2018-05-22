# Escrevendo Seu Primeiro Aplicativo com Electron

Electron permite criar aplicações desktop com JavaScript puro, fornecendo em tempo de execução uma API rica e nativa do sistema operacional. Você pode ver como uma variação da runtime do Node.js com foco em aplicações de desktop em vez de servidores web.

Isso não significa que o Electron é uma ligação de Javascript a bibliotecas de interface gráfica de usuário (GUI). Pelo contrário, o Electron utiliza páginas web como sua interface gráfica, de modo que você pode vê-lo como um simples navegador Chromium, controlado por Javascript.

**Nota**: Este exemplo também está disponível em um repositório você pode [baixa-lo e executa-lo imediatamente](#trying-this-example).

O desenvolvimento pode ser preocupante, porém, uma aplicação Electron é essencialmente uma aplicação Node.js. O pronto de entrada é o `package.json`, semelhante ao módulos do Node.js. Uma aplicação Electron simples terá a estrutura abaixo:

```text
seu-app/
├── package.json
├── main.js
└── index.html
```

Crie uma nova pasta vazia para seu novo aplicativo em Electron. Abra seu terminal e execute `npm init` nessa mesma pasta.

```sh
npm init
```

npm vai guiá-lo você para criação de um arquivo básico o `package.json`. O script especificado pelo campo `main` é o script de inicialização do seu app, que irá executar o processo principal. Um exemplo de como seu `package.json` possa parecer:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js"
}
```

**Nota**: se o campo `main` não se encontra em `package.json`, Electron tentará carregar um `index.js` (assim como Node.js faz). Se isso fosse realmente um simples aplicativo em Node, você adicionaria um script `start`, para instruir o `node` para executar o pacote atual:

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

Transformar esse aplicativo em Node para Electron é bastante simples - nós vamos substituir o termo `node` com para o runtime `electron`.

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

Nesse ponto, você vai precisará instalar o `electron`. A maneira recomendada de fazer isso é instalá-lo como uma dependência de desenvolvimento em seu aplicativo, que permite você trabalhe em múltiplos aplicativos com diferentes versões do Electron. Para fazer isso, execute o seguinte comando no diretório do seu aplicativo:

```sh
npm install --save-dev electron
```

Há outros meios para instalar o Electron. Por favor, consulte o [guia de instalação ](installation.md) para aprender mais sobre com usar com proxies, espelhos e caches personalizados.

## Desenvolvimento Electron em um Nutshell

Os apps em Electron são desenvolvidos em JavaScript usando os mesmos princípios e métodos encontrados no desenvolvimento Node.js. Todas as APIs e funcionalidades encontradas no Electron estão acessíveis através do módulo do `electron`, que pode ser necessário, como qualquer outro módulo Node.js:

```javascript
const electron = require('electron')
```

O módulo de `elétron` expõe recursos em namespaces. Como exemplos, o ciclo de vida da aplicação é gerenciado pelo `electron.app`, janelas podem ser criadas utilizando a classe `electron.BrowserWindow`. Um simples arquivo `main.js` que espera a aplicação estar pronta para então abrir uma janela:

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

function createWindow () {
  // Criar uma janela (browser window).
  win = new BrowserWindow({width: 800, height: 600})

  // e carrega index.html do app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
}

app.on('ready', createWindow)
```

The `main.js` should create windows and handle all the system events your application might encounter. A more complete version of the above example might open developer tools, handle the window being closed, or re-create windows on macOS if the user clicks on the app's icon in the dock.

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

## Executando Seu Aplicativo

Depois de criar seus arquivos iniciais `main.js`,`index.html` e `package.json`, você pode tentar executar seu aplicativo com `npm start` no diretório do seu aplicativo.

## Experimente esse Exemplo

Clona e execute o código nesse tutorial utilizando o repositório [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start).

**Nota**: A execução desse exemplo requer [Git](https://git-scm.com).

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

For a list of boilerplates and tools to kick-start your development process, see the [Boilerplates and CLIs documentation](./boilerplates-and-clis.md).