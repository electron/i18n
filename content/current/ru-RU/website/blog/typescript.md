---
title: "Поддержка оповещения TypeScript в Electron"
author: zeke
date: '2017-06-01'
---

The `electron` npm package now includes a TypeScript definition file that provides detailed annotations of the entire Electron API. Эти аннотации могут улучшить разработку Electron **даже если вы пишете обычный JavaScript**. Просто `npm установить электрон` для получения актуальных типов Electron в вашем проекте.

---

TypeScript - это язык программирования с открытым исходным кодом, созданный Microsoft. Это суперсет JavaScript, который расширяет язык, добавив поддержку статических типов. Сообщество TypeScript быстро выросло в последние годы, и TypeScript был включен в число [наиболее любимых языков программирования](https://stackoverflow.com/insights/survey/2017#technology-most-loved-dreaded-and-wanted-languages) в опросе разработчиков Stack Overflow.  TypeScript описан как "JavaScript масштабов", и команды в [GitHub](https://githubengineering.com/how-four-native-developers-wrote-an-electron-app/), [Slack](https://slack.engineering/typescript-at-slack-a81307fa288d), и [Microsoft](https://github.com/Microsoft/vscode) использует его для написания масштабируемых приложений Electron, используемых миллионами людей.

TypeScript поддерживает многие из новых возможностей языка в JavaScript, такие как классы , уничтожение объектов, и async/await, но его реальная дифференцированная функция является **аннотации типа**. Declaring the input and output datatypes expected by your program can [reduce bugs](https://slack.engineering/typescript-at-slack-a81307fa288d) by helping you find errors at compile time, and the annotations can also serve as a formal declaration of [how your program works](https://staltz.com/all-js-libraries-should-be-authored-in-typescript.html).

Когда библиотеки написаны на ванильном Javascript, эти типы часто расплывчатываются в качестве последующего вывода при написании документации. Функции часто могут принимать больше типов, чем было задокументировано, или функция может иметь невидимые ограничения, которые не документированы, что может привести к ошибкам во время выполнения.

TypeScript решает эту проблему с файлами определения ****. Файл определения TypeScript описывает все функции библиотеки и ожидаемые входные и выходные типы. Когда авторы библиотеки объединяют файл определения TypeScript с их опубликованной библиотекой, потребители этой библиотеки могут [изучить свой API прямо в своем редакторе](https://code.visualstudio.com/docs/editor/intellisense) и начать использовать его сразу, часто без необходимости обращаться к документации библиотеки .

Многие популярные проекты, такие как [Angular](https://angularjs.org/), [Vue. s](http://vuejs.org/), [node-github](https://github.com/mikedeboer/node-github) (и теперь Electron! скомпилируйте свой файл определения и объедините его с опубликованным npm пакетом. Для проектов, которые не объединяют их собственный файл определения, существует [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped), экосистема стороннего сообщества поддерживаемых файлами определений.

## Установка

Начиная с версии 1.6.10, каждый релиз Electron включает в себя собственный файл TypeScript определения. При установке пакета `electron` из npm, файл `electron.d.ts` автоматически объединяется с установленным пакетом .

[безопасный способ](https://electronjs.org/docs/tutorial/electron-versioning/) установить Electron использует точный номер версии:

```sh
npm install electron --save-dev --save-exact
```

Или, если вы используете [yarn](https://yarnpkg.com/lang/en/docs/migrating-from-npm/#toc-cli-commands-comparison):

```sh
yarn добавить electron --dev --exact
```

Если вы уже использовали такие определения, как `@types/electron` и `@types/node`, вы должны удалить их из вашего проекта Electron, чтобы предотвратить столкновения.

Файл определения основан на нашей [структурированной документации API](https://electronjs.org/blog/2016/09/27/api-docs-json-schema), так что он всегда будет соответствовать документации [API Electron](https://electronjs.org/docs/api/). Просто установите `electron` и вы всегда получите последние определения с версией Electron, которую вы используете.

## Использование

Для краткого описания того, как установить и использовать новые аннотации Electron TypeScript, смотрите этот короткий демо экран экрана: <iframe width="100%" height="420" src="https://www.youtube.com/embed/PJRag0rYQt8" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

Если вы используете [Visual Studio Code](https://code.visualstudio.com/), то вы уже создали поддержку TypeScript. Также существуют поддерживаемые сообществом плагины для [Atom](https://atom.io/packages/atom-typescript), [Sublime](https://github.com/Microsoft/TypeScript-Sublime-Plugin), [vim](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support#vim), и [другие редакторы](https://www.typescriptlang.org/index.html#download-links).

Как только ваш редактор настроен на TypeScript, вы начнете видеть больше контекстного поведения, например autocomplete suggestions, inline method reference, checking, and more.

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128017/f6318c20-3a3f-11e7-9c2c-401a32d1f9fb.png" alt="Автозаполнение метода">
  <figcaption>Метод автозаполнения</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128018/f6352600-3a3f-11e7-8d92-f0fb88ecc53e.png" alt="Ссылка на метод">
  <figcaption>Встроенный код метода</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128021/f6b1ca0c-3a3f-11e7-8161-ce913268a9f0.png" alt="Проверка аргументов">
  <figcaption>Проверка аргументов</figcaption>
</figure>

## Начало работы с TypeScript

Если вы новичок в TypeScript и хотите узнать больше, это [вступительное видео от Microsoft](http://video.ch9.ms/ch9/4ae3/062c336d-9cf0-498f-ae9a-582b87954ae3/B881_mid.mp4) дает хороший обзор того, почему язык был создан, как это работает, как его использовать, и где он оглавляется.

Также на официальном сайте TypeScript есть [Руководство](https://www.typescriptlang.org/docs/handbook/basic-types.html) и [игровой площадка](https://www.typescriptlang.org/play/index.html) .

Из-за того, что TypeScript является superset of JavaScript, ваш существующий код JavaScript уже допустим TypeScript. Это означает, что вы можете постепенно переходить к существующему проекту JavaScript для TypeScript, просыпанию новых языковых функций по мере необходимости.

## Спасибо

Этот проект был бы невозможен без сообщества разработчиков Electron с открытым исходным кодом. Спасибо [Samuel Attard](https://github.com/MarshallOfSound), [Феликс Риесеберг](https://github.com/felixrieseberg), [Бирунтан Моханатас](https://github.com/poiru), [Милан Бурда](https://github.com/miniak), [Брендан Форстер](https://github.com/shiftkey), и многие другие для их исправления ошибок, улучшения документации, и техническое руководство.

## Поддержка

Если вы столкнулись с любыми проблемами с использованием новых файлов определения TypeScript Electron, пожалуйста сообщите об ошибке в репозитории [electron-typescript-definitions](https://github.com/electron/electron-typescript-definitions/issues).

Счастливого программирования!
