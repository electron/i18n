# Краткий обзор

> Как использовать Node.js и Electron API.

Все [встроенные модули Node.js](https://nodejs.org/api/) доступны в Electron и сторонних модулях (включая [нативные модули](../tutorial/using-native-node-modules.md)).

Кроме того, Electron предоставляет дополнительные встроенные модули для разработки нативных дестопных приложений. Некоторые модули доступны только в главном процессе, некоторые доступны только в процессе отрисовки (веб-страницы), а некоторые могут быть использованы в обоих процессах.

Основное правило: если модуль связан с [GUI][gui] или системой низкого уровня, то должно быть доступно только в основном процессе. Вам нужно быть знакомым с концепцией скриптов [главного процесса и процесса отрисовки](../tutorial/quick-start.md#main-and-renderer-processes), чтобы иметь возможность использовать эти модули.

Скрипт основного процесса похож на обычный скрипт Node.js:

```javascript
const { app, BrowserWindow } - требуют ('электрон')
пусть выигрывают - null

app.whenReady ()...,> -
  win - новый BrowserWindow ({ width: 800, height: 600 })
  win.loadURL ('https://github.com')
))
```

Процесс отрисовки ничем не отличается от обычной веб-страницы, за исключением дополнительной возможности использования модулей node, если параметр `nodeIntegration` имеет значение "Включён":

```html
<! DOCTYPE HTML>
<html>
<body>
<script>
  const fs и требуют ('fs')
  консоли.log (fs.readFileSync (__filename, 'utf8'))
</script>
</body>
</html>
```

Чтобы запустить приложение, прочитайте [Запуск приложения](../tutorial/quick-start.md#run-your-application).

## Деструктирующее присваивание

Начиная с версии 0.37 можно использовать [деструктирующее присваивание][destructuring-assignment], для того чтобы упростить использование встроенных модулей.

```javascript
const { app, BrowserWindow } - требуют ('электрон')

пусть выигрывают

app.whenReady ()...,> -
  выиграть - новый BrowserWindow ()
  win.loadURL ('https://github.com')
))
```

Если вам нужен весь `electron` , вы можете потребовать его, а затем деструктурирования для доступа к отдельным модулям из `electron`.

```javascript
const electron - require ('electron')
const { app, BrowserWindow } - electron

let win

app.whenReady ().
.com
  
  > ..
```

Это эквивалентно следующему коду:

```javascript
const electron - требуют ('электрон')
приложение const - electron.app
const BrowserWindow - электрон. BrowserWindow
позволить выиграть

app.whenReady ().., то (()) -> -
  выиграть новый BrowserWindow ()
  win.loadURL ('https://github.com')
)
```

[gui]: https://en.wikipedia.org/wiki/Graphical_user_interface
[destructuring-assignment]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
