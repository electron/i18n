# ipcRenderer

> Comunica de forma assíncrona de um processo de renderização para o processo principal.

Processo: [Renderizador](../glossary.md#renderer-process)

O módulo `ipcRenderer` é um</a>eventEmitter

. Ele fornece alguns métodos para que você possa enviar mensagens síncronas e assíncronas do processo de renderização (página da web) para o processo principal. Você também pode receber respostas do processo principal.</p> 

Veja [ipcMain](ipc-main.md) para exemplos de código.



## Métodos

O módulo `ipcRenderer` possui o seguinte método para ouvir eventos e enviar mensagens:



### `ipcRenderer.on(canal, ouvinte)`

* `channel` Cordas
* Função `listener` 
    * `event` IpcRendererEvent
  * `...args` qualquer[]

Ouve o `channel`, quando uma mensagem chega, o `listener` deve ser chamado com `listener(event, args...)`.



### `ipcRenderer.uma vez (canal, ouvinte)`

* `channel` Cordas
* Função `listener` 
    * `event` IpcRendererEvent
  * `...args` qualquer[]

Adiciona uma função de `listener` única vez para o evento. Este `listener` é invocado apenas na próxima vez que uma mensagem for enviada para `channel`, após a qual ela é removida.



### `ipcRenderer.removeListener(canal, ouvinte)`

* `channel` Cordas
* Função `listener` 
    * `...args` qualquer[]

Remove o `listener` especificado da matriz de ouvintes para o `channel`especificado .



### `ipcRenderer.removeAllListeners(canal)`

* `channel` Cordas

Remove todos os listeners, ou apenas os do `channel` especificado.



### `ipcRenderer.send(canal, ... args)`

* `channel` Cordas
* `...args` qualquer[]

Envie uma mensagem assíncrona para o processo principal através do `channel`, juntamente com argumentos. Os argumentos serão serializados com o algoritmo de clones estruturados [][SCA], assim como [`window.postMessage`][], para que as cadeias de protótipos não sejam incluídas . O envio de funções, promessas, símbolos, weakmaps ou WeakSets lançará uma exceção.



> **NOTA:** Enviar tipos JavaScript não padrão, como objetos DOM ou objetos elétrons especiais, lançará uma exceção.
> 
> Como o processo principal não tem suporte para objetos DOM como `ImageBitmap`, `File`, `DOMMatrix` e assim por diante, tais objetos não podem ser enviados IPC da Electron para o processo principal, pois o processo principal não teria como decodificar eles. Tentar enviar tais objetos sobre o IPC resultará em um erro.

O processo principal lida com isso ouvindo `channel` com o módulo [`ipcMain`](ipc-main.md) .

Se você precisar transferir um [`MessagePort`][] para o processo principal, use [`ipcRenderer.postMessage`](#ipcrendererpostmessagechannel-message-transfer).

Se você quiser receber uma única resposta do processo principal, como o resultado de uma chamada de método, considere usar [`ipcRenderer.invoke`](#ipcrendererinvokechannel-args).



### `ipcRenderer.invoke(canal, ... args)`

* `channel` Cordas
* `...args` qualquer[]

Retornos `Promise<any>` - Resolve com a resposta do processo principal.

Envie uma mensagem para o processo principal via `channel` e espere um resultado assincronicamente. Os argumentos serão serializados com o algoritmo de clones estruturados [][SCA], assim como [`window.postMessage`][], para que as cadeias de protótipos não sejam incluídas . O envio de funções, promessas, símbolos, weakmaps ou WeakSets lançará uma exceção.



> **NOTA:** Enviar tipos JavaScript não padrão, como objetos DOM ou objetos elétrons especiais, lançará uma exceção.
> 
> Como o processo principal não tem suporte para objetos DOM como `ImageBitmap`, `File`, `DOMMatrix` e assim por diante, tais objetos não podem ser enviados IPC da Electron para o processo principal, pois o processo principal não teria como decodificar eles. Tentar enviar tais objetos sobre o IPC resultará em um erro.

O processo principal deve ouvir `channel` com [`ipcMain.handle()`](ipc-main.md#ipcmainhandlechannel-listener).

Como por exemplo:



```javascript
Processo renderizador
ipcRenderer.invoke ('algum nome', someArgument).então((resultado) => {
  // ...
})

// Processo principal
ipcMain.handle ('algum nome', async (evento, someArgument) => {
  resultado const = aguard doSomeWork (someArgument)
  resultado de retorno
})
```


Se você precisar transferir um [`MessagePort`][] para o processo principal, use [`ipcRenderer.postMessage`](#ipcrendererpostmessagechannel-message-transfer).

Se você não precisar de uma resposta à mensagem, considere usar [`ipcRenderer.send`](#ipcrenderersendchannel-args).



### `ipcRenderer.sendSync(canal, ... args)`

* `channel` Cordas
* `...args` qualquer[]

Retornos `any` - O valor enviado de volta pelo manipulador de [`ipcMain`](ipc-main.md) .

Envie uma mensagem para o processo principal via `channel` e espere um resultado sincronizadamente. Os argumentos serão serializados com o algoritmo de clones estruturados [][SCA], assim como [`window.postMessage`][], para que as cadeias de protótipos não sejam incluídas . O envio de funções, promessas, símbolos, weakmaps ou WeakSets lançará uma exceção.



> **NOTA:** Enviar tipos JavaScript não padrão, como objetos DOM ou objetos elétrons especiais, lançará uma exceção.
> 
> Como o processo principal não tem suporte para objetos DOM como `ImageBitmap`, `File`, `DOMMatrix` e assim por diante, tais objetos não podem ser enviados IPC da Electron para o processo principal, pois o processo principal não teria como decodificar eles. Tentar enviar tais objetos sobre o IPC resultará em um erro.

O processo principal lida com isso ouvindo `channel` com [`ipcMain`](ipc-main.md) módulo, e respostas definindo `event.returnValue`.



> :warning: ****DE AVISO : O envio de uma mensagem síncronínua bloqueará todo o processo de renderização até que a resposta seja recebida, então use este método apenas como último recurso. É muito melhor usar a versão assíncroda, [`invoke()`](ipc-renderer.md#ipcrendererinvokechannel-args).



### `ipcRenderer.postMessage(canal, mensagem [transfer])`

* `channel` Cordas
* `message` qualquer
* `transfer` MessagePort[] (opcional)

Envie uma mensagem para o processo principal, transferindo opcionalmente a propriedade de objetos ou mais [`MessagePort`][] .

Os objetos `MessagePort` transferidos estarão disponíveis no processo principal, pois [`MessagePortMain`](message-port-main.md) objetos acessando a propriedade `ports` do evento emitido.

Como por exemplo:



```js
Processo renderizador
const { port1, port2 } = novo MessageChannel()
ipcRenderer.postMessage ('port', { message: 'hello' }, [port1])

// Processo principal
ipcMain.on ('port', (e, msg) => {
  const [port] = e.ports
  // ...
})
```


Para obter mais informações sobre o uso de `MessagePort` e `MessageChannel`, consulte o</a>de documentação MDN .</p> 



### `ipcRenderer.sendTo(webContentsId, canal, ... args)`

* Número de `webContentsId`
* `channel` Cordas
* `...args` qualquer[]

Envia uma mensagem para uma janela com `webContentsId` via `channel`.



### `ipcRenderer.sendToHost(canal, ... args)`

* `channel` Cordas
* `...args` qualquer[]

Como `ipcRenderer.send` , mas o evento será enviado para o elemento `<webview>` em página do host em vez do processo principal.



## Objeto de evento

A documentação do objeto `event` passou para o `callback` pode ser encontrada nos [`ipc-renderer-event`](structures/ipc-renderer-event.md) documentos da estrutura.

[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[`window.postMessage`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
[`MessagePort`]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
