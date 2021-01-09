---
title: Использовать V8 и Chromium в Electron
author: джлорд
date: '2016-01-07'
---

Создание приложения Electron означает, что вам нужно только создать один кодовый дизайн и код для одного браузера, что очень удобно. Но поскольку Electron остается в курсе с узлом [. s](http://nodejs.org) и [Chromium](https://www.chromium.org) в качестве выпуска, вы также можете воспользоваться замечательными функциями, с которыми они поставляют. В некоторых случаях это устраняет зависимости, которые вы ранее должны были включить в веб-приложение.

---

Есть много функций, и мы рассмотрим некоторые здесь в качестве примеров, но если вы заинтересованы в изучении всех возможностей, вы можете следить за [блогом Google Chromium](http://blog.chromium.org) и [узлом. s changelogs](https://nodejs.org/en/download/releases). Вы можете увидеть, какие версии Node.js, Chromium и V8 Electron используют на [electronjs.org/#electron-версиях](https://electronjs.org/#electron-versions).

## Поддержка ES6 через V8

Electron сочетает в себе библиотеку визуализации Chrome с Node.js. Две компании имеют один и тот же JavaScript-движок, [V8](https://developers.google.com/v8). Многие функции ECMAScript 2015 (ES6) уже встроены в V8, что означает, что их можно использовать в приложении Electron без компиляторов.

Ниже приведены несколько примеров, но вы можете также получить классы (в строгом режиме), рамки блоков, обещания, наборы массивов и многое другое. Посмотрите [этот список](https://nodejs.org/en/docs/es6/) для получения дополнительной информации о функциях ES6 в V8.

**Функции стрелок**

```js
findTime () => {
  console.log(new Date())
}
```
**Интерполяция строк**

```js
var octocat = "Мона Лисса";
console.log(`The octocat's name is ${octocat}`);
```

**New Target**

```js
Octocat() => {
  if (!new.target) throw "Not new";
  консоль. og("Новый Octocat");
}

// Бросание
Octocat();
// Логи
new Octocat();
```

**Массив включает**

```js
 // Возвращает истину
[1, 2].includes(2);
```

**Параметры отдыха**

```js
// Представляем неопределенное количество аргументов как массив
(o, c, ...args) => {
  console.log(args.length)
}
```

## Особенности Chromium

Спасибо за всю напряженную работу Google и вкладчиков положить в Chromium, когда вы создаете приложения Electron, вы также можете использовать такие классные вещи, как (но не ограничиваясь этим):

- [MouseEvent.getModifierState()](https://googlechrome.github.io/samples/mouseevent-get-modifier-state/index.html)
- [CSS.escape()](https://googlechrome.github.io/samples/css-escape/index.html)
- [Получение потокового API](https://googlechrome.github.io/samples/fetch-api/fetch-response-stream.html)

Следуйте вместе с блогом [Google Chromium](http://blog.chromium.org) , чтобы узнать о новых функциях как корабль новых версий и снова, вы можете проверить версию Chromium, что Electron использует [здесь](https://electronjs.org/#electron-versions).

## О чем вы волнуетесь?

Напишите нам [@ElectronJS](https://twitter.com/electronjs) с вашими любимыми функциями, встроенными в V8 или Chromium.

