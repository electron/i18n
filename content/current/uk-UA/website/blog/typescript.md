---
title: "Оголошення підтримки TypeScript в Electron"
author: zeke
date: '2017-06-01'
---

`електронний пакет` npm тепер включає файл визначення TypeScript, який надає детальні анотації всього API Electron. These annotations can improve your Electron development experience **even if you're writing vanilla JavaScript**. Просто `npm встановити електрон` , щоб отримати оновлені типи Electron у вашому проекті.

---

TypeScript - мова програмування з відкритим вихідним кодом, створена Microsoft. Це супернабір JavaScript, який розширює мову, додавши підтримку для статичних типів. Спільнота TypeScript швидко зросла в останні роки, і TypeScript були на рангу серед [найбільш близьких мов програмування](https://stackoverflow.com/insights/survey/2017#technology-most-loved-dreaded-and-wanted-languages) в недавньому опитуванні Stack Overflow в недавньому дослідженні Stack Overflow.  TypeScript описується як "JavaScript що масштабує", та команди на [GitHub](https://githubengineering.com/how-four-native-developers-wrote-an-electron-app/), [Slack](https://slack.engineering/typescript-at-slack-a81307fa288d), та [Microsoft](https://github.com/Microsoft/vscode) всі використовують його для запису масштабованих додатків Electron, які використовуються мільйонами людей.

TypeScript підтримує багато новіших функцій мови на JavaScript, наприклад класи, руйнування об'єктів, і async/awae, але його справжня диференціація функція **тип анотації**. Оголошення введених та вихідних даних згідно вашої програми може [зменшити помилки](https://slack.engineering/typescript-at-slack-a81307fa288d) на допомагаючи вам знайти помилки при компілюванні часу, та анотації також можуть служити в якості офіційної декларації [як працює ваша програма](https://staltz.com/all-js-libraries-should-be-authored-in-typescript.html).

Коли бібліотеки пишуться на оригінальній Javascript, типи часто розпливчасто визначаються як після написання документації. Функції часто можуть приймати більше типів, ніж в документації, або функція може мати невидимі обмеження, які не задокументовані, що може призвести до помилок під час виконання.

TypeScript вирішує цю проблему з **файлами визначень**. Файл визначення TypeScript описує всі функції бібліотеки і очікувалося введення і виведення типів. Коли автор бібліотеки встановлює TypeScript файл визначення з опублікованою бібліотекою, споживачі цієї бібліотеки можуть [вивчити свій API прямо всередині свого редактора](https://code.visualstudio.com/docs/editor/intellisense) і почати використовувати її прямо зараз, часто не потребуючи консультацій з бібліотекою документації.

Багато популярних проектів, таких як [Кутий](https://angularjs.org/), [Vue. s](http://vuejs.org/), [node-github](https://github.com/mikedeboer/node-github) (і тепер Electron! компілювати власний файл з визначенням та зв'язати його за допомогою опублікованого npm пакету. Для проектів, які не об'єднують свій файл власного визначення, тут [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped), стороння екосистема файлів визначень, розміщених для спільноти.

## Установки

Починаючи з версії 1.6.10, кожен реліз Electron включає в себе власний файл визначення TypeScript. Коли ви встановлюєте пакет `електрон` з npm, `electron.d.ts` файл автоматично працює з встановленим пакетом .

The [safest way](https://electronjs.org/docs/tutorial/electron-versioning/) to install Electron is using an exact version number:

```sh
npm встановлювати електрон - save-dev --save-exact
```

Або якщо ви використовуєте [yarn](https://yarnpkg.com/lang/en/docs/migrating-from-npm/#toc-cli-commands-comparison):

```sh
yarn add electron --dev --exact
```

Якщо ви вже використовуєте визначення третьої сторони, наприклад `@types/electron` і `@types/node`, ви повинні прибрати їх із вашого проекту Electron, щоб запобігти будь-яких зіткнень.

Файл визначення взятий з нашої [структурної API документації](https://electronjs.org/blog/2016/09/27/api-docs-json-schema), тому воно завжди буде відповідати API документації [Electron's](https://electronjs.org/docs/api/). Встановіть `електрон` і ви завжди отримаєте TypeScript визначення, які на оновлено до версії Electron, яку ви використовуєте.

## Використання

Для підсумку, як встановити і використовувати нові анотації TypeScript в Electron, дивіться цей короткий екранний екран: <iframe width="100%" height="420" src="https://www.youtube.com/embed/PJRag0rYQt8" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

Якщо ви користуєтеся [Visual Studio Code](https://code.visualstudio.com/), для вас вже створено підтримку TypeScript. Також існують громадські підтримувані плагіни [Atom](https://atom.io/packages/atom-typescript), [Sublime](https://github.com/Microsoft/TypeScript-Sublime-Plugin), [vim](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support#vim), та [інших редакторів](https://www.typescriptlang.org/index.html#download-links).

Як тільки ваш редактор налаштований для TypeScript, ви почнете бачити більше контекстної поведінки на зразок автозаповнення пропозицій, посилання на вбудований метод, перевірка аргументів та багато іншого.

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128017/f6318c20-3a3f-11e7-9c2c-401a32d1f9fb.png" alt="Автодоповнення методу">
  <figcaption>Автозавершення методу</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128018/f6352600-3a3f-11e7-8d92-f0fb88ecc53e.png" alt="Посилання на метод">
  <figcaption>Вбудований посилання на метод</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128021/f6b1ca0c-3a3f-11e7-8161-ce913268a9f0.png" alt="Аргументна перевірка">
  <figcaption>Перевірка аргументів</figcaption>
</figure>

## Початок роботи з TypeScript

Якщо ви новачок в TypeScript і хочете дізнатися більше, цей [вступне відео з Microsoft](http://video.ch9.ms/ch9/4ae3/062c336d-9cf0-498f-ae9a-582b87954ae3/B881_mid.mp4) надає детальний огляд створення мови, як це працює, як використовувати його, і куди він головний.

Також є [ручник](https://www.typescriptlang.org/docs/handbook/basic-types.html) та [ігровий майданчик](https://www.typescriptlang.org/play/index.html) на офіційному сайті TypeScript.

Оскільки TypeScript є надбанням JavaScript, ваш існуючий JavaScript код вже є припустимим TypeScript. Це означає, що ви можете поступово переходити на існуючий проект JavaScript в TypeScript, окропивши нові функції мови, якщо необхідно.

## Подяка

Цей проект не був би можливим без допомоги представників Electron спільноти супроводжуючих розробників з відкритим вихідним кодом. Завдяки [Семюел Аттард](https://github.com/MarshallOfSound), [Фелікс Різеберґ](https://github.com/felixrieseberg), [Birunthan Mohanathas](https://github.com/poiru), [Мілан Бурда](https://github.com/miniak) [Брендан Форстер](https://github.com/shiftkey), та багато інших для виправлення помилок, покращення документації та технічний посібник.

## Підтримка

Якщо ви стикаєтеся з будь-якими проблемами, використовуючи нові файли визначення TypeScript, , будь ласка, перепишіть проблему на [electron-typescript-definitions](https://github.com/electron/electron-typescript-definitions/issues) репозиторії.

Щасливий TypeScript!
