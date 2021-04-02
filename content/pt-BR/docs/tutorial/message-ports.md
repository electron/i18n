# MensagensPorts em Elétron

[`MessagePort`][]s são um recurso da Web que permite passar mensagens entre contextos diferentes. É como `window.postMessage`, mas em canais diferentes. O objetivo deste documento é descrever como a Electron estende o modelo de mensagens de do Canal e dar alguns exemplos de como você pode usar messageports em seu aplicativo.

Aqui está um exemplo muito breve do que é um MessagePort e como ele funciona:

```js
renderer.js //////
// MensagensAsAs são criadas em pares. Um par de portas de mensagem conectadas é
// chamado de canal.
canal const = novo MessageChannel()

// A única diferença entre porta1 e porta2 está na forma como você os usa. As mensagens
// enviadas ao port1 serão recebidas pelo port2 e vice-versa.
const port1 = canal.port1
const port2 = canal.port2

// Não há problema em enviar uma mensagem no canal antes que a outra extremidade tenha registrado
// um ouvinte. As mensagens serão enfileiidas até que um ouvinte seja registrado.
port2.postMessage ({ answer: 42 })

// Aqui enviamos a outra extremidade do canal, port1, para o processo principal. É
// também possível enviar MessagePorts para outros quadros, ou para os Web Workers, etc.
ipcRenderer.postMessage('port', nulo, [port1])
```

```js
principal.js ///////
// No processo principal, recebemos a porta.
ipcMain.on('port', (evento) => {
  // Quando recebemos um MessagePort no processo principal, torna-se um
  // MessagePortMain.
  porta const = event.ports[0]

  // MessagePortMain usa a API de eventos no estilo Node.js, em vez da API de eventos
  // estilo web. Então .on('message', ...) em vez de .onmessage = ...
  port.on('message', (event) => {
    // os dados são { answer: 42 }
    dados de const = event.data
  })

  // MessagePortMain faz filas até que o método .start().
  port.start()
})
```

A documentação</a> de mensagens do canalé uma ótima maneira de aprender mais sobre como o MessagePorts funciona.</p> 



## MessagePorts no processo principal

Na renderização, a classe `MessagePort` se comporta exatamente como na web. O processo principal não é uma página da Web, porém — não tem integração blink — e por isso não tem as classes `MessagePort` ou `MessageChannel` . Para lidar e interagir com messageports no processo principal, a Electron adiciona duas novas classes: [`MessagePortMain`][] e [`MessageChannelMain`][]. Estes se comportam semelhantes às classes análogas na renderização.

`MessagePort` objetos podem ser criados no renderizador ou no processo principal de , e passados para frente e para trás usando os métodos [`ipcRenderer.postMessage`][] e [`WebContents.postMessage`][] . Observe que os métodos usuais de IPC, como `send` e `invoke` não podem ser usados para transferir `MessagePort`s, apenas os métodos de `postMessage` podem transferir `MessagePort`s.

Ao passar `MessagePort`s através do processo principal, você pode conectar duas páginas que pode não ser capaz de se comunicar (por exemplo, devido à mesma origem restrições).



## Extensão: `close` evento

A Electron adiciona um recurso a `MessagePort` que não está presente na web, para tornar o MessagePorts mais útil. Esse é o `close` evento, que é emitido quando a outra extremidade do canal é fechada. Os portos também podem ser implicitamente fechados por serem coletados com lixo.

Na renderização, você pode ouvir o evento `close` , atribuindo a `port.onclose` ou ligando para `port.addEventListener('close', ...)`. No processo principal , você pode ouvir o evento `close` ligando para `port.on('close',
...)`.



## Casos de uso de exemplo



### Processo do trabalhador

Neste exemplo, seu aplicativo tem um processo de trabalhador implementado como uma janela oculta. Você quer que a página do aplicativo seja capaz de se comunicar diretamente com o processo do trabalhador, sem a sobrecarga de desempenho de retransmissão através do processo principal.



```js
principal.js //////
const { BrowserWindow, Browser app, ipcMain, MessageChannelMain } = require ('electron')

app.whenReady().then(async () => {
  // O processo do trabalhador é um BrowserWindow oculto, de modo que ele terá acesso
  // a um contexto de Blink completo (incluindo, por exemplo. <canvas>, áudio, buscar(), etc.)
  trabalhador const = novo BrowserWindow({
    show: falso,
    webPreferências: { nodeIntegration: true }
  })
  aguardar o trabalhador.loadFile ('trabalhador.html')

  // A janela principal enviará trabalho ao processo do trabalhador e receberá resultados
  // por meio de uma MensagemPort.
  const mainWindow = novo BrowserWindow({
    webPreferências: { nodeIntegration: true }
  })
  mainWindow.loadFile ('app.html')

  // Não podemos usar ipcMain.handle() aqui, porque a resposta precisa transferir um
  // MessagePort.
  ipcMain.on ('request-worker-channel', (evento) => {
    // Por razões de segurança, vamos garantir que apenas os quadros que esperamos possam
    // acessar o trabalhador.
    se (event.senderFrame === mainWindow.webContents.mainFrame) {
      // Criar um novo canal ...
      const { port1, port2 } = novo MessageChannelMain()
      // ... enviar uma ponta para o trabalhador ...
      worker.webContents.postMessage('novo cliente', nulo, [port1])
      // ... e a outra extremidade para a janela principal.
      event.senderFrame.postMessage ('provide-worker-channel', nulo, [port2])
      // Agora a janela principal e o trabalhador pode se comunicar uns com os outros
      // sem passar pelo processo principal!
    }
  })
})
```




```html<!-- trabalhador.html ------------------------------------------------------------><script>
const { ipcRenderer } = requer ('elétron') função

doWork (entrada) {
  // Algo intensivo em cpu.
  entrada de retorno * 2
}

// Podemos obter vários clientes, por exemplo, se houver várias janelas,
// ou se a janela principal recarregar.
ipcRenderer.on('novo cliente', (evento) => {
  const = event.ports
  port.onmessage = (evento) => {
    // Os dados do evento podem ser qualquer objeto serializável (e o evento pode até
    // levar outras MensagensPorts com ele!)
    resultado const = doWork (event.data)
    port.postMessage(resultado)
  }
})
</script>
```




```html
<!-- app.html --------------------------------------------------------------->
<script>
const { ipcRenderer } = require ('elétron')

// Solicitamos que o processo principal nos envie um canal que possamos usar para
// comunicar com o trabalhador.
ipcRenderer.send('request-worker-channel')

ipcRenderer.once ('provide-worker-channel', (event) => {
  // Uma vez que recebemos a resposta, podemos tomar a porta...
  const [ porta ] = event.ports
  // ... registrar um manipulador para receber resultados ...
  port.onmessage = (evento) => { console
    .log('resultado recebido:', event.data)
  }
  // ... e começar a enviá-lo funcionar!
  port.postMessage(21)
})
</script>
```




### Fluxos de resposta

Os métodos IPC incorporados da Electron só suportam dois modos: de fogo e esquecer (por exemplo. `send`), ou solicitação-resposta (por exemplo. `invoke`). Usando o MessageChannels, você pode implementar um "fluxo de resposta", onde uma única solicitação responde com um fluxo de dados.



```js
renderizador.js /////

função fazer Com que oStreamingRequest (elemento, elemento callback) {
  // MessageChannels são leves - é barato criar um novo para cada
  // solicitação.
  const { port1, port2 } = novo MessageChannel()

  // Enviamos uma extremidade da porta para o processo principal ...
  ipcRenderer.postMessage(
    'give-me-a-stream',
    { element, count: 10 },
    [port2]
  )

  // ... e nos agarramos ao outro lado. O processo principal enviará mensagens
  // até o final da porta e o fechará quando estiver pronto.
  port1.onmessage = (evento) => {
    callback (event.data)
  }
  port1.onclose = () => { console
    .log ('stream ended')
  }
}

makeStreamingRequest(42, (dados) => {
  console.log ('tem dados de resposta:', event.data)
})
// Veremos "obter dados de resposta: 42" 10 vezes.
```




```js
principal.js ////

ipcMain.on ('give-me-a-stream', (event, msg) => {
  // O renderizador nos enviou um MessagePort que quer que enviemos nosso
  // resposta.
  const [replyPort] = event.ports

  // Aqui enviamos as mensagens de forma sincronizada, mas poderíamos facilmente armazenar
  // a porta em algum lugar e enviar mensagens assincronicamente.
  para (let i = 0; i < msg.count; i++) {
    replyPort.postMessage(msg.element)
  }

  // Fechamos a porta quando terminarmos para indicar para o outro lado que
  // não enviaremos mais mensagens. Isso não é estritamente necessário - se
  // não fechar explicitamente o porto, eventualmente seria lixo
  // coletado, o que também desencadearia o evento 'close' na renderização.
  replyPort.close()
})
```




### Comunicando-se diretamente entre o processo principal e o mundo principal de uma página isolada de contexto

Quando [isolamento do contexto][] é habilitado, as mensagens IPC do processo principal para renderizador são entregues ao mundo isolado, e não ao principal mundo. Às vezes você quer entregar mensagens para o mundo principal diretamente, sem ter que passar pelo mundo isolado.



```js
principal.js //////
/const const { BrowserWindow, app, MessageChannelMain } = require ('electron')
caminho const = require('path')

app.whenReady().then(async () => {
  // Criar uma Janela de Navegador com contextualização habilitada.
  const bw = novo BrowserWindow({
    webPreferências: {
      contextIsolação: verdadeiro,
      pré-carga: path.join (__dirname, 'preload.js')
    }
  })
  bw.loadURL('index.html')

  // Enviaremos uma extremidade deste canal para o mundo principal da página
  // context-isolated.
  const { port1, port2 } = novo MessageChannelMain()

  // Não há problema em enviar uma mensagem no canal antes que a outra extremidade tenha
  // registrou um ouvinte. As mensagens serão enfileiidas até que um ouvinte seja
  // registrado.
  port2.postMessage ({ test: 21 })

  // Também podemos receber mensagens do mundo principal do renderizador.
  port2.on('message', (event) => {
    console.log('do renderer main world:', event.data)
  })
  port2.start(()

  // O script de pré-carga receberá esta mensagem IPC e transferirá a porta
  // para o mundo principal.
  bw.webContents.postMessage ('main-world-port', nulo, [port1])
})
```




```js
pré-carga.js ///////////////////////
const { ipcRenderer } = require ('elétron')

// Precisamos esperar até que o mundo principal esteja pronto para receber a mensagem antes de
// enviar a porta. Criamos essa promessa na pré-carga para que seja garantido
// para registrar o ouvinte de carga antes que o evento de carga seja acionado.
const janelaCarregada = nova Promessa(resolver => {
  janela.onload = resolver
})

ipcRenderer.on ('main-world-port', async (event) => {
  aguardam janelaScarregada
  // Usamos janela regular.postMessage para transferir a porta do
  isolado // mundo para o mundo principal.
  window.postMessage ('main-world-port', '*', event.ports)
})
```




```html<!-- índice.html -------------------------------------------------------------><script>
janela.onmessage = (evento) => {
  // event.source === janela significa que a mensagem vem do pré-carregamento
  // script, em oposição a uma <iframe> ou outra fonte.
  se (event.source === janela && event.data === 'main-world-port') {
    const [ porta ] = event.ports
    // Uma vez que tenhamos a porta, podemos comunicar diretamente com o principal
    // processo.
    port.onmessage = (evento) => { console
      .log('do processo principal:', event.data)
      port.postMessage(event.data * 2)
    }
  }
}
</script>
```

[isolamento do contexto]: context-isolation.md
[`ipcRenderer.postMessage`]: ../api/ipc-renderer.md#ipcrendererpostmessagechannel-message-transfer
[`WebContents.postMessage`]: ../api/web-contents.md#contentspostmessagechannel-message-transfer
[`MessagePortMain`]: ../api/message-port-main.md
[`MessageChannelMain`]: ../api/message-channel-main.md
[`MessagePort`]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
