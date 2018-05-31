# Depuração de Aplicativos

Sempre que seu aplicativo Electron não estiver se comportando do jeito que você queria, você pode usar uma gama de ferramentas te dão uma força para descobrir erros no seu código, gargalos de desempenho e oportunidades de otimização.

## Processo de Renderização

A ferramenta mais recomendada para depurar processos de renderização individuais é o Chromium DevTools. Ele está disponível em todos os processos de renderização, incluindo instâncias de `BrowserWindow`, `BrowserView` e `WebView`. Você pode abrí-lo a partir do seu código chamando a API `openDevTools()` no `webContents` da instância:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow()
win.webContents.openDevTools()
```

O Google oferece [uma excelente documentação de suas ferramentas de desenvolvimento](https://developers. google. com/web/tools/chrome-devtools/). Recomendamos que você aprenda bem a usá-lo - ele está entre as ferramentas mais poderosas no cinto de utilidades de qualquer desenvolvedor Electron.

## Processo Principal

Depurar o processo principal é um pouquinho mais complicado, já que não dá de abrir ferramentas de desenvolvimento pra ele. O Chromium DevTools pode [ser usado para depurar o processo principal do Electron](https://nodejs.org/en/docs/inspector/) graças a uma colaboração mais próxima entre o Google / Chrome e o Node.js, mas você poderá encontrar algumas desvantagens, como a indisponibilidade do método `require` no console.

Para mais informações, consulte o documento [Depurando o Processo Principal](./debugging-main-process.md).