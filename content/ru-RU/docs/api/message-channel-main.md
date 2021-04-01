# MessageChannelMain

`MessageChannelMain` является основным эквивалентом DOM- [`MessageChannel`][] объекта. Его особая функция заключается в создании пары связанных [`MessagePortMain`](message-port-main.md) объектов.

Для получения дополнительной [об использовании][] обмена сообщениями канала сообщениями канала.

## Класс: MessageChannelMain

Процесс: [Основной](../glossary.md#main-process)

Пример:

```js
Основной процесс
const { port1, port2 } - новый MessageChannelMain ()
w.webContents.postMessage ('port', null, [port2])
port1.postMessage ({ some: 'message' })

// Процесс рендерера
const { ipcRenderer } - требуют (электрон')
ipcRenderer.on ('port'port', e)>
  // e.ports — это список портов, отправленных вместе с этим сообщением
  e.ports[0].on ('message', (messageEvent) -> -
    консоли.log (сообщениеEvent.data)
  )
)
```

### Свойства экземпляра

#### `channel.port1`

Недвижимость [`MessagePortMain`](message-port-main.md) дома.

#### `channel.port2`

Недвижимость [`MessagePortMain`](message-port-main.md) дома.

[`MessageChannel`]: https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel
[об использовании]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
