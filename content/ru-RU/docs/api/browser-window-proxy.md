## Класс: BrowserWindowProxy

> Манипулирование дочерним окном браузера

Процесс: [Renderer](../glossary.md#renderer-process)

`window.open` возвращает `BrowserWindowProxy` и предоставляет ограниченное управление дочерним окном.

### Методы экземпляра

Экземпляр объекта `BrowserWindowProxy` содержит следующие методы:

#### `win.blur()`

Дефокусирует дочернее окно.

#### `win.close()`

Принудительно закрывает дочернее окно без вызова события отгрузки.

#### `win.eval(code)`

* Строка `code`

Позволяет запускать код в дочернем окне.

#### `win.focus()`

Производит фокусировку дочернего окна (переносит окно на передний план).

#### `win.print()`

Вызывает диалог print в рамках дочернего окна.

#### `win.postMessage(message, targetOrigin)`

* Строка `message`
* Строка `targetOrigin`

Sends a message to the child window with the specified origin or `*` for no origin preference.

In addition to these methods, the child window implements `window.opener` object with no properties and a single method.

### Свойства экземпляра

Экземпляр объекта `BrowserWindowProxy` содержит следующие свойства:

#### `win.closed`

`Булево значение`, которое возвращает true после того как дочернее окно закрывается.