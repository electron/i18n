# webFrameMain

> Управление веб-страницами и iframes.

Процесс: [Основной](../glossary.md#main-process)

Модуль `webFrameMain` использоваться для осмотра кадров в существующих [`WebContents`](web-contents.md) экземплярах. Навигационные события являются общим использования.

```javascript
const { BrowserWindow, webFrameMain } - require ('electron')

const win - новый BrowserWindow ({ width: 800, height: 1500 })
win.loadURL ('https://twitter.com')

win.webContents.on (
  'did-frame-navigate',
  (событие, URL, isMainFrame, isMainFrame, frameProcessId, рамкаRoutingId) -> -
    const frame - webFrameMain.fromId (frameProcessId, frameRoutingId)
    если (рамка)
      -
      const code - 'document.body.innerHTML - document.body.innerHTML.replaceAll", "heck", "h'ck") (код)
    -
  -
)
```

Вы также можете получить доступ к кадрам существующих страниц, используя `mainFrame` свойство [`WebContents`](web-contents.md).

```javascript
const { BrowserWindow } - требуют ('электрон')

async функции основной () -
  const выиграть - новый BrowserWindow ({ width: 800, height: 600 })
  ждут win.loadURL ('https://reddit.com')

  const youtubeEmbeds - win.webContents.mainFrame.frames .filter ((рамка) -> -
    попробуйте -
      const URL - новый URL (frame.url)
      url.host - 'www.youtube.com'
    - catch {
      return false
    }
  )

  console.log (youtubeEmbeds)
-

main()
```

## Методы

Эти методы можно получить из `webFrameMain` модуля:

### `webFrameMain.fromId (processId, маршрутизацияId)`

* `processId` Integer - `Integer` представляющий внутренний идентификатор процесса, которому принадлежит кадр.
* `routingId` Integer - `Integer` представляющий уникальный идентификатор кадра в процессе рендеринга. СВУ маршрутизации могут быть извлечены из `WebFrameMain` экземпляров (`frame.routingId`), а также передаются по конкретным `WebContents` навигационным событиям (например. `did-frame-navigate`).

Возвращает `WebFrameMain | undefined` - кадр с данным процессом и iD-адресами маршрутизации, или `undefined` если нет WebFrameMain, связанного с данными ID.

## Класс: WebFrameMain

Процесс: [Основной](../glossary.md#main-process)

### Методы экземпляра

#### `frame.executeJavaScript (код, userGesture)`

* `code` String
* `userGesture` Boolean (опиционально) - по умолчанию `false`.

Возвращает `Promise<unknown>` - Обещание, которое разрешается с результатом выполненного кода или отвергается, если выполнение бросает или приводит к отклонению обещания.

Вычисляет `code` на странице.

В окне браузера некоторые HTML API как `requestFullScreen` может быть только вызван жестом пользователя. Указание `userGesture` как `true` снимает это ограничение.

#### `frame.reload ()`

Возвращает `boolean` - Была ли перезагрузка начата успешно. Только приводит к `false` когда кадр не имеет истории.

#### `frame.send (канал, ... аргс)`

* `channel` String (Строка)
* `...args` any[]

Отправить асинхронное сообщение процессу рендерера через `channel`, наряду с аргументами. Аргументы будут сериализованы с «Структурированным клоном алгоритмом»[SCA], так же, как и`postMessage`, поэтому прототип цепи не будут включены. Функции отправки, обещания, символы, WeakMaps или WeakSets вы можете сделать исключение.

Процесс рендерера может обрабатывать сообщение, слушая `channel` с [`ipcRenderer`](ipc-renderer.md) модулем.

#### `frame.postMessage (канал, сообщение, [transfer])`

* `channel` String (Строка)
* `message` any
* `transfer` MessagePortMain (по желанию)

Отправить сообщение процессу рендерера, по желанию передав право собственности на ноль или более -`MessagePortMain`объектов.

Переданные `MessagePortMain` объекты будут доступны в процессе , получить доступ `ports` к свойству испускаемого события. Когда они в рендер, они будут родными DOM `MessagePort` объектов.

Например:

```js
Основной процесс
const { port1, port2 } - новый MessageChannelMain ()
webContents.mainFrame.postMessage ('port', { message: 'hello' }, [port1])

// Процесс рендерера
ipcRenderer.on ('port', (e, msg) -> -
  const [port] и e.ports
  // ...
})
```

### Свойства экземпляра

#### `frame.url` _Только чтение_

Веб `string` , представляющий текущий URL-адрес кадра.

#### `frame.top` _Только чтение_

В `WebFrameMain | null` , к которой принадлежит `frame` , верхняя рамка.

#### `frame.parent` _Только чтение_

В `WebFrameMain | null` , представляющем родительский `frame`, свойство будет `null` , `frame` это верхний кадр в иерархии кадров.

#### `frame.frames` _Только чтение_

Коллекция `WebFrameMain[]` , содержащая прямых потомки `frame`.

#### `frame.framesInSubtree` _Только чтение_

Большая `WebFrameMain[]` , содержащая каждый кадр в подтриме `frame`, себя. Это может быть полезно при прохождении через все кадры.

#### `frame.frameTreeNodeId` _Только чтение_

Например `Integer` представляет идентификатор внутреннего кадра FrameTreeNode кадра. Этот идентификатор является браузер-глобальный и однозначно определяет кадр, который контента. Идентификатор фиксируется при создании кадра и остается постоянным в течение всего срока службы кадра. При снятии кадра идентификатор не использоваться.

#### `frame.name` _Только чтение_

В `String` , представляющий имя кадра.

#### `frame.osProcessId` _Только чтение_

Проект `Integer` представляющий операционную систему `pid` процесса, которому принадлежит этот кадр.

#### `frame.processId` _Только чтение_

Проект `Integer` представляющий внутренний `pid` процесса, которому принадлежит этот кадр. Это не то же самое, что идентификатор процесса ОС; читать, что использование `frame.osProcessId`.

#### `frame.routingId` _Только чтение_

`Integer` представляющий уникальный идентификатор кадра в текущем процессе рендеринга. Отдельные `WebFrameMain` , которые относятся к той же основной будут иметь тот же `routingId`.
