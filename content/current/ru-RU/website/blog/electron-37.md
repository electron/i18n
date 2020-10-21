---
title: Что нового в Electron 0.37
author: zeke
date: '2016-03-25'
---

Electron `0. 7` был недавно [выпущен.](https://github.com/electron/electron/releases) и включил крупное обновление с Chrome 47 до Chrome 49 и несколько новых базовых API. В этом последнем релизе представлены все новые функции, поставляемые в [Chrome 48](http://blog.chromium.org/2015/12/chrome-48-beta-present-to-cast-devices_91.html) и [Chrome 49](http://blog.chromium.org/2016/02/chrome-49-beta-css-custom-properties.html). Сюда входят пользовательские свойства CSS, увеличена поддержка [ES6](http://www.ecma-international.org/ecma-262/6.0/) , улучшена `KeyboardEvent` , `Обещайте` улучшений и многие другие новые функции теперь доступны в вашем приложении Electron.

---

## Что нового

### CSS Custom Properties

Если вы использовали такие языки, как Sass and Less, то вы, вероятно, знакомы с *переменными*, , которая позволяет вам определить повторно используемые значения для вещей, таких как цветовые схемы и макеты. Переменные помогают сохранить ваши стили сухим и более поддерживаемым.

Пользовательские свойства CSS схожи с предварительно обработанными переменными, так как они повторно используются, но они также имеют уникальное качество, которое делает их еще более мощными и гибкими: **они могут быть манипулированы JavaScript**. Эта тонкая, но мощная функция позволяет динамически изменять визуальные интерфейсы, в то же время пользуясь [аппаратным ускорением CSS](https://developer.mozilla.org/en-US/Apps/Fundamentals/Performance/Performance_fundamentals#Use_CSS_animations_and_transitions), и уменьшения дублирования кода между вашим интерфейсом и стилевыми таблицами.

Для получения дополнительной информации о пользовательских свойствах CSS смотрите [статью MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) и [Google Chrome демо](https://googlechrome.github.io/samples/css-custom-properties/).

#### Переменные CSS в действии

Давайте рассмотрим простой пример переменных, который можно настроить в реальном времени в вашем приложении.

```css
:root {
  --awesome-color: #A5ECFA;
}

body {
  background-color: var(--awesome-color);
}
```

Значение переменной может быть восстановлено и изменено непосредственно в JavaScript:

```js
// Получение значения переменной ' #A5ECFA'
let color = window.getComputedStyle(document.body).getPropertyValue('--awesome-color')

// Установить значение переменной в 'orange'
document.body.style.setProperty('--awesome-color', 'orange')
```

Значения переменных также могут быть отредактированы в разделе **Стилей** инструментов разработки для быстрой обратной связи и твиков:

![Свойства CSS во вкладке Стили](https://cloud.githubusercontent.com/assets/671378/13991612/1d10eb9c-f0d6-11e5-877b-c4dbc59f1209.gif){: .screenshot }

### `Keyboard.code` Свойство

Chrome 48 добавил новое свойство `кода` , доступное на `KeyboardEvent` , которое будет нажатой клавишей независимо от раскладки клавиатуры операционной системы.

Это должно сделать пользовательские сочетания клавиш в приложении Electron более точными и совместимыми между компьютерами и конфигурациями.

```js
window.addEventListener('keydown', function(event) {
  console.log(`${event.code} был pressed.`)
})
```

Проверьте [этот пример](https://googlechrome.github.io/samples/keyboardevent-code-attribute/) чтобы увидеть его в действии.

### События отклонения Обещания

Chrome 49 added two new `window` events that allow you to be notified when an rejected [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) goes unhandled.

```js
window.addEventListener('unhandledrejection', function (event) {
  console.log('A rejected promise was unhandled', event.promise, event.reason)
})

window. ddEventListener('rejectionhandled', function (event) {
  console.log('A rejected promise was handled', event.promise, event.reason)
})
```

Проверьте [этот пример](https://googlechrome.github.io/samples/promise-rejection-events/index.html) чтобы увидеть его в действии.

### Обновления ES2015 в V8

Версия V8 в Electron теперь включает [91% от ES2015](https://kangax.github.io/compat-table/es6/#chrome49). Вот несколько интересных дополнений, которые можно использовать из коробки – без флагов или предварительных компиляторов:

#### Параметры по умолчанию

```js
function multiply(x, y = 1) {
  return x * y
}

multiply(5) // 5
```

#### Деструктирующее присваивание

Chrome 49 добавил [к уничтожению задания](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) , чтобы значительно упростить присвоение переменных и параметров функций.

Это делает Electron требует более чистой и компактной, чтобы назначить сейчас:

##### Требуется процесс браузера

```js
const {app, BrowserWindow, Menu} = require('electron')
```

##### Требуется процесс визуализации

```js
const {dialog, Tray} = require('electron').remote
```

##### Другие примеры

```js
// Разрушение массива и пропуск второго элемента
const [первый, , last] = findAll()

// Разрушение параметров функции
function whois({displayName: displayName, fullName: {firstName: name}}){
  консоль. og(`${displayName} ${name}`)
}

позволить пользователю = {
  displayName: "jdoe",
  fullName: {
      имя: "Джон",
      lastName: "Doe"
  }
}
whois(user) // "jdoe is John"

// Разрушение объекта
let {name, avatar} = getUser()
```

## Новые Electron API

Некоторые из новых API Electron находятся ниже, вы можете увидеть каждый новый API в примечаниях к выпуску [релизов Electron](https://github.com/electron/electron/releases).

#### `показать` и `скрыть` события в `браузере`

Эти события отображаются при отображении или скрытии окна.

```js
const {BrowserWindow} = require('electron')

let window = new BrowserWindow({width: 500, height: 500})
window. n('show', function () { console.log('Window was shown') })
window.on('hide', function () { console.log('Window was hidden') })
```

#### `Платформа-тема изменена` на приложении `` для `OS X`

Это событие происходит при переключении темы [Темный режим](https://discussions.apple.com/thread/6661740).

```js
const {app} = require('electron')

app.on('platform-theme-changed', function () {
  console.log(`Platform theme changed. В темном режиме? ${app.isDarkMode()}`)
})
```

#### `app.isDarkMode()` для `OS X`

Этот метод возвращает `true` , если система находится в Темном режиме, и `false` в противном случае.

#### `прокрутка через` и `прокрутка сенсорных` событий в BrowserWindow для `OS X`

Эти события отображаются после начала или окончания фазы события колеса прокрутки.

```js
const {BrowserWindow} = require('electron')

let window = new BrowserWindow({width: 500, height: 500})
window.on('scroll-touch-begin', function () { console. og('Scroll touch запущен') })
window.on('scroll-touch-end', function () { console.log('Scroll touch ended') })
```

