---
title: Використовувати функції V8 та Chromium з Electron
author: молодший
date: '2016-01-07'
---

Створення програми Electron означає, що вам потрібно лише створити одну базу коду та дизайн для одного браузера, що є досить зручним. Але, оскільки Electron залишається в актуальному стані з [Node. s](http://nodejs.org) та [Chromium](https://www.chromium.org) під час випуску програм, ви також можете користуватись чудовими функціями, якими вони постачаються. В деяких випадках це усуває залежності, які могли б бути включені у веб-додаток.

---

Багато функцій і ми розглянемо тут як приклади, але якщо ви зацікавлені у вивченні всіх функцій, ви можете слідкувати за [блогом Google Chromium](http://blog.chromium.org) і [Без нічого. s changelogs](https://nodejs.org/en/download/releases). Ви можете побачити які версії Node.js, Chromium і V8 Electron використовують за допомогою [electronjs.org/#electron-versions](https://electronjs.org/#electron-versions).

## Підтримка ES6 через V8

Електрон поєднує в собі бібліотеку візуалізації Chromium з Node.js. Два мають один JavaScript двигун, [V8](https://developers.google.com/v8). Багато функцій ECMAScript 2015 (ES6) вже вбудовані в V8, що означає, що ви можете використовувати їх у вашому застосунку Electron без будь-яких компіляторів.

Нижче наведено кілька прикладів, але ви можете отримати класи (у жорсткому режимі), блокувати масштабування, обіцянки, типізовані масиви та інше. Перевірте [цей список](https://nodejs.org/en/docs/es6/) для отримання додаткової інформації про функції ES6 у V8.

**Функції стрілки**

```js
findTime () => {
  console.log(new Date())
}
```
**Інтерполяція рядка**

```js
var octocat = "Мона Ліза";
console.log(`Ім'я окита ${octocat}`);
```

**New Target**

```js
Octocat() => {
  якщо (!new.target) кидає "Не новий";
  консолі. og("New Octocat");
}

// Throws
Octocat();
// Журнал
new Octocat();
```

**Масив включено**

```js
 // Повертає true
[1, 2].includes(2);
```

**Параметри тресту**

```js
// Представляти невизначену кількість аргументів як масив
(o, c, ...args) =>
  console.log(args.length)

```

## Хром функції

Завдяки складній роботі Google та учасників, що надходять в Chromium, коли ви створюєте застосунки Electron, ви також можете використовувати класні речі, як (але не обмежуючись цим):

- [MouseEvent.getModifierState()](https://googlechrome.github.io/samples/mouseevent-get-modifier-state/index.html)
- [CSS.escape()](https://googlechrome.github.io/samples/css-escape/index.html)
- [Отримання API потоку](https://googlechrome.github.io/samples/fetch-api/fetch-response-stream.html)

Follow along with the [Google Chromium blog](http://blog.chromium.org) to learn about features as new versions ship and again, you can check the version of Chromium that Electron uses [here](https://electronjs.org/#electron-versions).

## Що ти в захваті?

Твітніть нам [@ElectronJS](https://twitter.com/electronjs) зі своїми улюбленими функціями, вбудованими в V8 або Chromium.

