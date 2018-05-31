# Depuração de Aplicativos

Sempre que seu aplicativo Electron não estiver se comportando do jeito que você queria, você pode usar uma gama de ferramentas te dão uma força para descobrir erros no seu código, gargalos de desempenho e oportunidades de otimização.

## Processo de Renderização

A ferramenta mais recomendada para depurar processos de renderização individuais é o Chromium DevTools. Ele está disponível em todos os processos de renderização, incluindo instâncias de `BrowserWindow`, `BrowserView` e `WebView`. Você pode abrí-lo a partir do seu código chamando a API `openDevTools()` no `webContents` da instância:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow()
win.webContents.openDevTools()
```

O Google oferece [uma excelente documentação de suas ferramentas de desenvolvimento](https://developers. google. com/web/tools/chrome-devtools/). We recommend that you make yourself familiar with them - they are usually one of the most powerful utilities in any Electron Developer's tool belt.

## Processo Principal

Debugging the main process is a bit trickier, since you cannot open developer tools for them. The Chromium Developer Tools can [be used to debug Electron's main process](https://nodejs.org/en/docs/inspector/) thanks to a closer collaboration between Google / Chrome and Node.js, but you might encounter oddities like `require` not being present in the console.

For more information, see the [Debugging the Main Process documentation](./debugging-main-process.md).