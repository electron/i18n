# MessagePortMain

`MessagePortMain` é o equivalente principal do objeto [`MessagePort`][] DOM. Ele se comporta de forma semelhante à versão DOM, com a exceção de que usa o sistema de eventos Node.js `EventEmitter` , em vez do sistema `EventTarget` do dom . Isso significa que você deve usar `port.on('message', ...)` para ouvir eventos, em vez de `port.onmessage = ...` ou `port.addEventListener('message', ...)`

Consulte a API de mensagens do canal [][] documentação para obter mais informações sobre o uso de mensagens de canal.

`MessagePortMain` é um \[EventEmitter\]\[event-emitter\].

## Classe: MessagePortMain

Processo: [Main](../glossary.md#main-process)

### Métodos de Instância

#### `port.postMessage(mensagem, [transfer])`

* `message` qualquer
* `transfer` MessagePortMain[] (opcional)

Envia uma mensagem da porta e, opcionalmente, transfere a propriedade de objetos para outros contextos de navegação.

#### `port.start()`

Começa o envio de mensagens na fila na porta. As mensagens serão enfileiidas até que este método seja chamado.

#### `port.close()`

Desliga a porta, por isso não está mais ativa.

### Eventos de instância

#### Evento: 'mensagem'

Retorna:

* objeto `messageEvent`
  * `data` qualquer
  * `ports` MessagePortMain[]

Emitido quando um objeto MessagePortMain recebe uma mensagem.

#### Evento: 'close'

Emitido quando o fim remoto de um objeto MessagePortMain é desconectado.

[`MessagePort`]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
