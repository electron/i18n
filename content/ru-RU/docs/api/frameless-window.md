# Окно без рамки

> Откройте окно без панелей инструментов, границ или другого графического «chrome».

Безрамное окно - окно, в котором нет [chrome](https://developer.mozilla.org/en-US/docs/Glossary/Chrome) частей окна, например панели инструментов, которые не являются частью веб-страницы. Эти варианты в классе [`BrowserWindow`](browser-window.md).

## Создание безрамного окна

Для создания безрамного окна, нужно установить `frame: false` в `параметрах` [BrowserWindow](browser-window.md):

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ width: 800, height: 600, frame: false })
win.show()
```

### Альтернативы на macOS

Существует альтернативный способ указать окно chromeless. Вместо установки `frame` в `false`, которая отключает элементы заголовка и окна, вы можете скрыть строку заголовка, и ваш контент будет расширен до полного размера окна, при этом по-прежнему сохранятся элементы управления окном («светофор») для стандартных действий окна. Вы можете сделать это, указав параметр `titleBarStyle`:

#### `hidden`

В результате скроется заголовок и содержимое станет во все окно, но заголовок по-прежнему будет иметь стандартное окно контроля ("светофоры") сверху слева.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ titleBarStyle: 'hidden' })
win.show()
```

#### `hiddenInset`

В результате скрытый заголовок с альтернативным видом, где кнопки контролирования немного больше вставки от края окна.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ titleBarStyle: 'hiddenInset' })
win.show()
```

#### `customButtonsOnHover`

Использует кастомные кнопки закрыть и уменьшить, которые display при наведении на верхний левый угол окна. Полноэкранная кнопка недоступна из-за ограничений безрамных окон, поскольку они взаимодействуют с масками окон MacOS от Apple. Эти кастомные кнопки предотвращают проблемы с методами мыши, случающиеся со стандартными кнопками панели инструментов. Эта опция применима только для окон без рамки.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ titleBarStyle: 'customButtonsOnHover', frame: false })
win.show()
```

## Прозрачное окно

Установите параметр `transparent` в значение `true`.  
Примечание: вы можете сделать это только для безрамного окна.  
Пример:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ transparent: true, frame: false })
win.show()
```

### Ограничения

* Вы не можете кликнуть по прозрачной области. Мы собираемся ввести API, чтобы установить форму окна для решения этой задачи, смотрите [нашу проблему](https://github.com/electron/electron/issues/1335).
* Прозрачные окна не изменяются. Установка `resizable` в `true` может сделать так, что прозрачное окно может перестать работать на некоторых платформах.
* Фильтр `blur` применяется только к веб-странице, поэтому невозможно применить эффект размытия к содержимому под окном (т.е. другие приложения открываются в системе пользователя).
* В операционных системах Windows прозрачные окна не будут работать, когда DWM отключена.
* On Linux, users have to put `--enable-transparent-visuals --disable-gpu` in the command line to disable GPU and allow ARGB to make transparent window, this is caused by an upstream bug that [alpha channel doesn't work on some NVidia drivers](https://code.google.com/p/chromium/issues/detail?id=369209) on Linux.
* On Mac, the native window shadow will not be shown on a transparent window.

## Невзаимодействующее окно

Чтобы создать невзаимодействующее окно, те. которое не будет реагировать на событии мыши, необходимо вызвать функцию API:[win.setIgnoreMouseEvents(ignore)](browser-window.md#winsetignoremouseeventsignore-options)  
Пример:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.setIgnoreMouseEvents(true)
```

### Пересылка

Ignoring mouse messages makes the web page oblivious to mouse movement, meaning that mouse movement events will not be emitted. On Windows operating systems an optional parameter can be used to forward mouse move messages to the web page, allowing events such as `mouseleave` to be emitted:

```javascript
let win = require('electron').remote.getCurrentWindow()
let el = document.getElementById('clickThroughElement')
el.addEventListener('mouseenter', () => {
  win.setIgnoreMouseEvents(true, { forward: true })
})
el.addEventListener('mouseleave', () => {
  win.setIgnoreMouseEvents(false)
})
```

This makes the web page click-through when over `el`, and returns to normal outside it.

## Регион переноса (drag-and-drop)

По-умолчанию, безрамное окно невозможно перетаскивать. В коде приложения необходимо указать в стилях CSS `-webkit-app-region: drag`, чтобы за выделенную область было возможно переносить окно (как за заголовок стандартного окна), также можно использовать `-webkit-app-region: no-drag` для исключения непереносимой области внутри переносимой. Обратите внимание, что в настоящий момент поддерживается прямоугольная форма области.

Note: `-webkit-app-region: drag` is known to have problems while the developer tools are open. See this [GitHub issue](https://github.com/electron/electron/issues/3647) for more information including a workaround.

To make the whole window draggable, you can add `-webkit-app-region: drag` as `body`'s style:

```html
<body style="-webkit-app-region: drag">
</body>
```

And note that if you have made the whole window draggable, you must also mark buttons as non-draggable, otherwise it would be impossible for users to click on them:

```css
button {
  -webkit-app-region: no-drag;
}
```

If you're only setting a custom titlebar as draggable, you also need to make all buttons in titlebar non-draggable.

## Выделение текста

In a frameless window the dragging behaviour may conflict with selecting text. For example, when you drag the titlebar you may accidentally select the text on the titlebar. To prevent this, you need to disable text selection within a draggable area like this:

```css
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
```

## Контекстное меню

On some platforms, the draggable area will be treated as a non-client frame, so when you right click on it a system menu will pop up. To make the context menu behave correctly on all platforms you should never use a custom context menu on draggable areas.