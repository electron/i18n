# ipcMain

> Comunica de forma assíncrona o processo principal aos processos de renderização.

Processo: [Main](../glossary.md#main-process)

O módulo `ipcMain` é um [emissor de eventos][event-emitter]. Quando usado no processo principal, ele lida com mensagens assíncronas e síncronas enviadas a partir de um processo de renderização (página da web). As mensagens enviadas de um renderizador serão emitidas para este módulo.

## Enviando Mensagens

Também é possível enviar mensagens do processo principal para o processo de renderização, veja [webContents.send][web-contents-send] para obter mais informações.

* Ao enviar uma mensagem, o nome do evento é o `channel`.
* Para responder a uma mensagem síncrona, você precisa de configurar `event.returnValue`.
* Para enviar uma mensagem assíncronda de volta ao remetente, você pode usar `event.reply(...)`.  Este método de auxiliar lidará automaticamente com mensagens provenientes de quadros que não são o quadro principal (por exemplo, iframes) enquanto `event.sender.send(...)` sempre enviarão para o quadro principal.

Um exemplo de enviar e manipular mensagens entre os processos de renderização e principais:

```javascript
No processo principal.
const { ipcMain } = require ('electron')
ipcMain.on ('assíncrona-mensagem', (evento, arg) => { console
  .log(arg) // i prints "ping"
  event.reply('assíncrona-resposta', 'pong')
})

ipcMain.on ('mensagem síncrona', (evento, arg) => { console
  .log(arg) // i prints "ping"
  event.returnValue = 'pong'
})
```

```javascript
No processo renderizador (página web).
const { ipcRenderer } = requer ('elétron')
console.log(ipcRenderer.sendSync('mensagem síncronia', 'ping')) // imprime "pong"

ipcRenderer.on('assíncronão-resposta', (evento, arg) => { console
  .log(arg) // i prints "pong"
})
ipcRenderer.send('assíncronão-mensagem', 'ping')
```

## Métodos

O módulo `ipcMain` possui o seguinte método para ouvir eventos:

### `ipcMain.on(canal, ouvinte)`

* `channel` Cordas
* Função `listener`
  * `event` IpcMainEvent
  * `...args` qualquer[]

Ouve o `channel`, quando uma mensagem chega, o `listener` deve ser chamado com `listener(event, args...)`.

### `ipcMain.once (canal, ouvinte)`

* `channel` Cordas
* Função `listener`
  * `event` IpcMainEvent
  * `...args` qualquer[]

Adiciona uma função de `listener` única vez para o evento. Este `listener` é invocado apenas na próxima vez que uma mensagem for enviada para `channel`, após a qual ela é removida.

### `ipcMain.removeListener (canal, ouvinte)`

* `channel` Cordas
* Função `listener`
  * `...args` qualquer[]

Remove o `listener` especificado da matriz de ouvintes para o `channel`especificado .

### `ipcMain.removeAllListeners([channel])`

* `channel` String (opcional)

Remove os ouvintes do `channel`especificado .

### `ipcMain.handle (canal, ouvinte)`

* `channel` Cordas
* <Promise\<void> | de função `listener` qualquer>
  * `event` IpcMainInvokeEvent
  * `...args` qualquer[]

Adiciona um manipulador para um IPC `invoke`capaz. Este manipulador será chamado sempre que um renderizador de chamar `ipcRenderer.invoke(channel, ...args)`.

Se `listener` retornar uma Promessa, o resultado final da promessa será devolvido como resposta ao chamador remoto. Caso contrário, o valor de retorno do ouvinte será usado como o valor da resposta.

```js
Processo principal
ipcMain.handle ('my-invokable-ipc', async (evento, ... args) => {
  resultado const = aguarde alguma Prossíção(... args) resultado de retorno

})

// Processo renderizador
async () => {
  resultado const = await ipcRenderer.invoke ('my-invokable-ipc', arg1, arg2)
  // ...
}
```

A `event` que é aprovada como o primeiro argumento para o manipulador é o mesmo que que passou para um ouvinte de eventos regular. Ele inclui informações sobre quais WebContents é a fonte da solicitação de invocação.

### `ipcMain.handleOnce (canal, ouvinte)`

* `channel` Cordas
* <Promise\<void> | de função `listener` qualquer>
  * `event` IpcMainInvokeEvent
  * `...args` qualquer[]

Manipula uma única mensagem IPC `invoke`capaz e, em seguida, remove o ouvinte. Veja `ipcMain.handle(channel, listener)`.

### `ipcMain.removeHandler(canal)`

* `channel` Cordas

Remove qualquer manipulador para `channel`, se estiver presente.

## Objeto IpcMainEvent

A documentação do objeto `event` passou para o `callback` pode ser encontrada nos [`ipc-main-event`](structures/ipc-main-event.md) documentos da estrutura.

## Objeto IpcMainInvokeEvent

A documentação do objeto `event` passou para `handle` retornos de chamadas pode ser encontrada nos documentos da estrutura [`ipc-main-invoke-event`](structures/ipc-main-invoke-event.md) .

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[web-contents-send]: web-contents.md#contentssendchannel-args
