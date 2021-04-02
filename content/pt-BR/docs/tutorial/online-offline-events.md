# Detecção de Evento Online/Offline

## Visão Geral

[detecção de](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) de eventos on-line e off-line podem ser implementados no processo Renderer usando o atributo [`navigator.onLine`](http://html5index.org/Offline%20-%20NavigatorOnLine.html) , parte da API HTML5 padrão.

O atributo `navigator.onLine` retorna:

* `false` se todas as solicitações de rede forem garantidas a falhar (por exemplo, quando desconectadas da rede).
* `true` em todos os outros casos.

Como muitos casos retornam `true`, você deve tratar com situações de cuidado recebendo falsos positivos, pois nem sempre podemos assumir que `true` valor significa que a Electron pode acessar a Internet. Por exemplo, nos casos em que o computador está executando um software de virtualização que tem adaptadores Ethernet virtuais em estado "sempre conectado". Portanto, se você quiser determinar o acesso à Internet status da Electron, você deve desenvolver meios adicionais para esta verificação.

## Exemplo

### Detecção de eventos no processo Renderer

Começando com um aplicativo de trabalho do</a>do Guia de Início Rápido, atualize o de arquivos `main.js` com as seguintes linhas:</p> 



```javascript
const { app, BrowserWindow } = require ('electron')

deixar onlineStatusWindow

app.whenReady().then((((() => {
  on-lineStatusWindow = novo BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL('arquivo://${__dirname}/index.html')
})
```


no arquivo `index.html` , adicione a seguinte linha antes do fechar `</body>` tag:



```html
<script src="renderer.js"></script>
```


e adicione o arquivo</code> de renderização do `renderers:</p>

<pre><code class="javascript fiddle='docs/fiddles/features/online-detection/renderer'">const alertaOnlineStatus = () => { window.alert(navigator.onLine ? 'on-line' : 'offline') }

janela.addEventListener ('online', alertaOnlineStatus)
janela.addEventListener('offline', alertaOnlineStatus)

alertaOnlineStatus()
`</pre> 

Após iniciar o aplicativo Electron, você verá a notificação:

![Detecção de eventos on-line-off-off-line](../images/online-event-detection.png)



### Detecção de eventos no processo Principal

Pode haver situações em que você deseja responder a eventos on-line/off-line em o processo Principal também. O processo Principal, no entanto, não tem um objeto `navigator` e não consegue detectar esses eventos diretamente. Neste caso, você necessidade de encaminhar os eventos para o processo Principal usando os utilitários de comunicação (IPC) interprocesso da Electron.

Começando com um aplicativo de trabalho do</a>do Guia de Início Rápido , atualize o de arquivos `main.js` com as seguintes linhas:</p> 



```javascript
const { app, BrowserWindow, ipcMain } = require ('electron')
deixar onlineStatusWindow

app.whenReady().then((()=> {
  on-lineStatusWindow = nova browserWindow(largura: 0, altura: 0, show: falso, webPreferências: { nodeIntegration: true } })
  onlineStatusWindow.loadURL('arquivo://${__dirname}/index.html')
})

ipcMain.on('online-status-changed', (evento, status) => {
  console.log(status)
})
```


no arquivo `index.html` , adicione a seguinte linha antes do fechar `</body>` tag:



```html
<script src="renderer.js"></script>
```


e adicione o arquivo</code> de renderização do `renderers:</p>

<pre><code class="javascript fiddle='docs/fiddles/features/online-detection/main'">const { ipcRenderer } = require ('electron')
atualização constOnlineStatus = () => { ipcRenderer.send ('online-status-changed', navigator.onLine ? 'on-line' : 'offline') }

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

updateOnlineStatus()
`</pre> 

Depois de lançar o aplicativo Electron, você deve ver a notificação no console :



```sh
npm iniciar

> electron@1.0.0 start /elétron
> elétron .

Online
```
