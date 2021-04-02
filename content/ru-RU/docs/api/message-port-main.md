# СообщениеПортМейн

`MessagePortMain` является основным эквивалентом DOM- [`MessagePort`][] объекта. Он ведет себя аналогично версии DOM, за исключением , что он использует систему событий Node.js `EventEmitter` , а не DOM `EventTarget` систему. Это означает, что вы `port.on('message', ...)` для прослушивания событий, а не `port.onmessage = ...` или `port.addEventListener('message', ...)`

Для получения дополнительной [об использовании][] обмена сообщениями канала сообщениями канала.

`MessagePortMain` является \[EventEmitter\]\[event-emitter\].

## Класс: MessagePortMain

Процесс: [Основной](../glossary.md#main-process)

### Методы экземпляра

#### `port.postMessage (сообщение, [transfer])`

* `message` any
* `transfer` MessagePortMain (по желанию)

Отправляет сообщение из порта и, по желанию, передает право собственности на объекты в другие контексты просмотра.

#### `port.start()`

Начинается отправка сообщений в очереди в порту. Сообщения будут стоять в очереди тех пор, пока этот метод не будет вызван.

#### `port.close()`

Отключает порт, поэтому он больше не активен.

### События экземпляра

#### Событие: 'message'

Возвращает:

* `messageEvent` объект
  * `data` любой
  * `ports` СообщениеПортМайна

Испускаемый, когда объект MessagePortMain получает сообщение.

#### Событие: 'close'

Испускаемый при отключении удаленного конца объекта MessagePortMain.

[`MessagePort`]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
[об использовании]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
