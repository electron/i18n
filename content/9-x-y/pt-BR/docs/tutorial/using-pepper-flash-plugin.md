# Usando o Plugin Pepper Flash

Electron supports the Pepper Flash plugin. To use the Pepper Flash plugin in Electron, you should manually specify the location of the Pepper Flash plugin and then enable it in your application.

## Preparando uma copia do Plugin Flash

No macOS e Linux, os detalhes do plugin Pepper Flash podem ser encontrados navegando até `chrome://flash` no navegador Chrome. Sua localização e versão são úteis para o suporte do Pepper Flash do Electron. Você também pode copiá-lo para outro local.

## Adicionar interruptor Electron

Você pode adicionar diretamente `--ppapi-flash-path` e `--ppapi-flash-version` à linha de comando Electron ou usando o aplicativo `. Método ommandLine.appendSwitch` antes do evento pronto na aplicação. Além disso, ative a opção de `plugins` para `BrowserWindow`.

Como por exemplo:

```javascript
const { app, BrowserWindow } = require('electron')
const path = require('path')

// Specify flash path, supposing it is placed in the same directory with main.js.
let pluginName
switch (process.platform) {
  case 'win32':
    pluginName = 'pepflashplayer.dll'
    break
  case 'darwin':
    pluginName = 'PepperFlashPlayer.plugin'
    break
  case 'linux':
    pluginName = 'libpepflashplayer.so'
    break
}
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))

// Optional: Specify flash version, for example, v17.0.0.169
app.commandLine.appendSwitch('ppapi-flash-version', '17.0.0.169')

app.whenReady().then(() => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      plugins: true
    }
  })
  win.loadURL(`file://${__dirname}/index.html`)
  // Something else
})
```

Você também pode tentar carregar o plugin de sistema amplo Pepper Flash ao invés de enviar os plugins você mesmo, seu caminho pode ser recebido ao ligar para `aplicativo. etPath('pepperFlashSystemPlugin')`.

## Habilitar o Plugin Flash em uma Tag `<webview>`

Adicione o atributo `plugins` para a tag `<webview>`.

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## Solução de Problemas

Você pode verificar se o plugin Pepper Flash foi carregado inspecionando o `navigador. lança` no console de devtools (embora você não possa saber se o caminho do plugin está correto).

The architecture of Pepper Flash plugin has to match Electron's one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

On Windows the path passed to `--ppapi-flash-path` has to use `\` as path delimiter, using POSIX-style paths will not work.

Para algumas operações, como o streaming de mídia usando RTMP, é necessário conceder mais permissões aos arquivos `.swf` dos jogadores. Uma maneira de fazer isso, é usar o [nw-flashtrust](https://github.com/szwacz/nw-flash-trust).
