# Depuração de Aplicativos

Sempre que seu aplicativo Electron não estiver se comportando do jeito que você queria, você pode usar uma gama de ferramentas te dão uma força para descobrir erros no seu código, gargalos de desempenho e oportunidades de otimização.

## Processo de Renderização

A ferramenta mais recomendada para depurar processos de renderização individuais é o Chromium DevTools. Ele está disponível em todos os processos de renderização, incluindo instâncias de `BrowserWindow`, `BrowserView` e `WebView`. Você pode abrí-lo a partir do seu código chamando a API `openDevTools()` no `webContents` da instância:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow()
win.webContents.openDevTools()
```

O Google oferece [uma excelente documentação de suas ferramentas de desenvolvimento][devtools]. Recomendamos que você aprenda bem a usá-lo - ele está entre as ferramentas mais poderosas no cinto de utilidades de qualquer desenvolvedor Electron.

## Processo Principal

Depurar o processo principal é um pouquinho mais complicado, já que não dá de abrir ferramentas de desenvolvimento pra ele. O Chromium DevTools pode [ser usado para depurar o processo principal do Electron][node-inspect] graças a uma colaboração mais próxima entre o Google / Chrome e o Node.js, mas você poderá encontrar algumas desvantagens, como a indisponibilidade do método `require` no console.

Para mais informações, consulte o documento [Depurando o Processo Principal][main-debug].

## Travamento V8

Se o contexto V8 parar de funcionar, as ferramentas de desenvolvimento mostratão a seguinte mensagem.

`DevTools was disconnected from the page. Once page is reloaded, DevTools will automatically reconnect.`

Logs para Chromium podem ser habilitados através da variável de ambiente `ELECTRON_ENABLE_LOGGING`. Para mais informações, consulte o documento [Variáveis de ambiente](https://www.electronjs.org/docs/api/environment-variables#electron_enable_logging).

Alternativamente, o argumento da linha de comando `--enable-logging` pode ser passado. Mais informações estão disponíveis na documentação de [Alteradores de linha de comando](https://www.electronjs.org/docs/api/command-line-switches#--enable-logging).

[node-inspect]: https://nodejs.org/en/docs/inspector/
[devtools]: https://developers. google. com/web/tools/chrome-devtools/
[main-debug]: ./debugging-main-process.md
