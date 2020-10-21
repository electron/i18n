---
title: Що нового в Electron 0.37
author: zeke
date: '2016-03-25'
---

Електрон `0. Нещодавно 7` було [випущено](https://github.com/electron/electron/releases) та включало велике оновлення з Chrome 47 по 49 та також декілька нових основних API. Ця остання версія викликає у всіх нових функцій, які відправляються в [Chrome 48](http://blog.chromium.org/2015/12/chrome-48-beta-present-to-cast-devices_91.html) та [Chrome 49](http://blog.chromium.org/2016/02/chrome-49-beta-css-custom-properties.html). This includes CSS custom properties, increased [ES6](http://www.ecma-international.org/ecma-262/6.0/) support, `KeyboardEvent` improvements, `Promise` improvements, and many other new features now available in your Electron app.

---

## Що нового

### CSS Custom Properties

Якщо ви використовували попередньо оброблені мови, такі як Sass і Less, ви, швидше за все, знайомі з *змінними*який дозволяє визначати повторно використовувані значення для речей на кшталт схем кольорів і макетів. Змінні допомагають зберегти ваші таблиці стилів і більш підтримувати.

Користувацькі властивості CSS схожі на попередньо оброблені змінні в тому, що вони повторно використовуються, але у них є унікальна якість, яка робить їх ще більш потужними та гнучкими: **їх можна маніпулювати з JavaScript**. Ця тонка, але потужна функція дозволяє динамічним змінам до візуальних інтерфейсів при все ще користуванні [апаратне прискорення CSS](https://developer.mozilla.org/en-US/Apps/Fundamentals/Performance/Performance_fundamentals#Use_CSS_animations_and_transitions)і зменшений символ коду між вашими основними кодами і таблицями стилів.

Для отримання додаткової інформації про власні властивості CSS дивіться [статтю MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) та [демонстрацію Google Chrome](https://googlechrome.github.io/samples/css-custom-properties/).

#### Змінні CSS в дії

Пройдемо через простий приклад змінної, який можна налаштувати в вашому додатку.

```css
:root {
  --awesome-color: #A5ECFA;
}

body {
  background-color: var(--awesome-color);
}
```

Значення змінної може бути отримане і змінено безпосередньо в JavaScript:

```js
// Отримайте значення змінної ' #A5ECFA'
let color = window.getComputedStyle(document.body).getPropertyValue('--awesome-color')

// Встановлює значення змінної на 'помаранчевий'
document.body.style.setProperty('--awesome-color', 'помаранчеe')
```

Значення змінної можуть бути також відредаговані з **Стилів** розділу інструментів розробки для швидкого зворотнього зв'язку та налаштувань:

![Властивості CSS у вкладці Стилів](https://cloud.githubusercontent.com/assets/671378/13991612/1d10eb9c-f0d6-11e5-877b-c4dbc59f1209.gif){: .screenshot }

### `KeyboardEvent.code` Property

Chrome 48 додав новий `код` , доступний на `Keyboard` події, які будуть фізичним ключем незалежних від розкладки клавіатури операційної системи.

Це повинно зробити реалізацію користувацьких комбінацій клавіш у вашому додатку Electron більш точні та послідовні для машин та конфігурацій.

```js
window.addEventListener('keydown', function(event) {
  console.log(`${event.code} було натиснуто.`)
})
```

Перевірте [цей приклад](https://googlechrome.github.io/samples/keyboardevent-code-attribute/) , щоб побачити його в дії.

### Події відмови Promise

Chrome 49 added two new `window` events that allow you to be notified when an rejected [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) goes unhandled.

```js
window.addEventListener('unhandledrejection', функція (event) {
  console.log('A відхилення обіцянку не було оброблено', event.promise, event.reason)
})

вікно. ddEventListener('rejectionhandhand', function (event) {
  console.log('A rejected promise було оброблено', event.promise, event.reason)
})
```

Перевірте [цей приклад](https://googlechrome.github.io/samples/promise-rejection-events/index.html) , щоб побачити його в дії.

### Оновлення ES2015 у V8

Версія V8 зараз у Electron включає [91% ES2015](https://kangax.github.io/compat-table/es6/#chrome49). Ось декілька цікавих додатків, які ви можете використовувати з коробки — без прапорів чи зкомпіляторів:

#### Параметри за замовчуванням

```js
функція multiply(x, y = 1) {
  return x * y
}

multiply(5) // 5
```

#### Призначення деструктуризації

Chrome 49 додали [знищення значення](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) для створення змінних та параметрів функцій набагато простіше.

Це робить Electron чистим та більш компактним для призначити зараз:

##### Потрібен процес браузера

```js
const {app, BrowserWindow, Menu} = require('electron')
```

##### Необхідний процес рендерингу

```js
const {dialog, Tray} = require('electron').remote
```

##### Інші приклади

```js
// Деструктуризація масиву і пропуск другого елемента
const [first, last] = findAll()

// Блокує параметри функції
функція whois({displayname: displayName, fullname: {firstName: name}}){
  консоль. og(`${displayName} - ${name}`)



, дайте користувачу = {
  displayName: "jdoe",
  повність: {
      перший: "Джон",
      останній: "Doe"
  }
}
цілих (користувач) // "jdoe є Джон"

// Деструктуризація об'єкта
let {name, avatar} = getUser()
```

## Новий API Electron

Декілька нових API Electron нижче, ви можете побачити кожен новий API в нотах релізу для [релізів Electron](https://github.com/electron/electron/releases).

#### `Показати` та `приховати` події в `BrowserWindow`

Ці події випромінюються, коли вікно або відображається або приховується.

```js
const {BrowserWindow} = require('electron')

Нехай вікно = нове BrowserWindow({width: 500, height: 500})
вікно. n('show', function () () { console.log('Window was shown') })
window.on('hide', function () { console.log('Window було приховано') })
```

#### `платформа-тема змінена` на `додатку` для `OS X`

Ця подія викликається коли ввімкнена система [Темний режим](https://discussions.apple.com/thread/6661740) тема </a>.

```js
const {app} = require('electron')

app.on('platform-theme-changed', функція () {
  console.log(`змінено тему платформи. У темному режимі? ${app.isDarkMode()}`)
})
```

#### `app.isDarkMode()` для `OS X`

Цей метод повертає `true` , якщо система знаходиться в темному режимі, та `false` в іншому випадку.

#### `scroll-touch-start` і `scroll-touch-end` події у веб-вікні для `ОС X`

Ці події випромінюються, коли починається або закінчується фаза заходу прокручування.

```js
const {BrowserWindow} = require('electron')

Нехай вікно = new BrowserWindow({width: 500, height: 500})
window.on('scroll-touch-begin', функція () { консоль. og('touch started') })
window.on('scroll-touch-end', функція () { console.log('Scroll touch end') })
```

