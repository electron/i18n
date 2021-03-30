---
title: Поиск
author:
  - echjordan
  - vanessayuenn
  - zeke
date: '2018-06-21'
---

На веб-сайте Electron появилась новая поисковая система, обеспечивающая мгновенные результаты для документации по API, учебников, связанных с Electron и многое другое.

<figure>
  <a href="https://electronjs.org/?query=resize" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/41683719-417ca80a-7490-11e8-9a52-fb145f4251ba.png" alt="Скриншот поиска Electron">
  </a>
</figure>

---

Изучение новой технологии или фреймворка, такого как Electron, может быть запущено. Once you get past the [quick-start][] phase, it can be difficult to learn best practices, find the right APIs, or discover the tools that will help you build the app of your dreams. Мы хотим, чтобы сайт Electron был лучшим инструментом для поиска ресурсов, необходимых для быстрого создания приложений, и легче.

Посетите любую страницу на [electronjs.org](https://electronjs.org) и вы найдете новый поисковый запрос в верхней части страницы.

## Поисковая система

Когда мы начинаем добавлять поисковый запрос на сайт, мы создали нашу собственную поисковую систему, используя GraphQL в качестве бэкэнда. GraphQL был веселым для работы с ним и производителем поисковой системы, но мы быстро поняли, что построение поисковой системы не является тривиальной задачей. Такие вещи, как поиск по нескольким словам и обнаружение опечаток требуют много работы для правильного определения. Rather than reinventing the wheel, we decided to use an existing search solution: [Algolia][].

Algolia является хостинговым сервисом поиска, который быстро стал поисковой системой для поиска среди популярных проектов с открытым исходным кодом, таких как React, Vue, Bootstrap, Yarn и [многие другие](https://community.algolia.com/docsearch/).

Вот некоторые из особенностей, которые сделали Algolia подходящим для проекта Electron:

- [InstantSearch.js](https://community.algolia.com/instantsearch.js) предоставляет результаты по мере ввода, обычно примерно 1 мс.
- [Typo tolerance](https://www.algolia.com/doc/guides/textual-relevance/typo-tolerance/) means you'll still get results even when you type [`widnow`][].
- [Расширенный синтаксис запроса](https://www.algolia.com/doc/api-reference/api-parameters/advancedSyntax/) позволяет `"точные кавычки соответствия"` и `-исключение`.
- [API клиенты](https://www.algolia.com/doc/api-client/javascript/getting-started/) имеют открытый исходный код и хорошо документированы.
- [Аналитика](https://www.algolia.com/doc/guides/analytics/analytics-overview/) рассказывает нам, какие люди ищут больше всего, а также то, что они ищут, но не ищут. Это даст нам ценное представление о том, как можно улучшить документацию Electron.
- Альголия [бесплатна для проектов с открытым исходным кодом](https://www.algolia.com/for-open-source).

## API Docs

Иногда ты знаешь, *чего* хочешь достичь, но не знаешь точно, *как* это сделать. Electron имеет более 750 API методов, событий и свойств. Ни один человек не может легко запомнить их все, но компьютеры хороши в этом деле. С помощью [JSON API документации Electron](https://electronjs.org/blog/api-docs-json-schema), мы проиндексировали все эти данные в Algolia, и теперь вы легко можете найти точный API, который вы ищете.

Пытаетесь изменить размер окна? Search for [`resize`][] and jump straight to the method you need.

## Инструкции

Electron имеет постоянно растущую коллекцию уроков для дополнения своей API документации. Теперь вы можете легко найти учебники по данной теме, прямо наряду с документацией по API.

Ищете лучшую практику в области безопасности? Search for [`security`][].

## пакеты npm

Теперь в npm реестре более 700 000 пакетов, и не всегда легко найти нужный. To make it easier to discover these modules, we've created [`electron-npm-packages`][], a collection of the 3400+ modules in the registry that are built specifically for use with Electron.

The folks at [Libraries.io][] have created [SourceRank][], a system for scoring software projects based on a combination of metrics like code, community, documentation, and usage. We created a [`sourceranks`][] module that includes the score of every module in the npm registry, and we use these scores to sort the package results.

Хотите использовать альтернативы встроенным модулям IPC? Search for [`is:package ipc`][].

## Приложения Electron

[легко проиндексировать данные с Algolia](https://github.com/electron/algolia-indices), поэтому мы добавили список существующих приложений из [электронных/приложений](https://github.com/electron/apps).

Try a search for [`music`][] or [`homebrew`][].

## Фильтрация результатов

Если вы использовали [поиск кода GitHub,](https://github.com/search) раньше, Вы, вероятно, знаете его разделенные двоеточиями фильтры ключевого значения, такие как `extension:js` или `user:defunkt`. Мы считаем, что техника фильтрации довольно мощная , поэтому мы добавили ключевое слово `:` в поиске Electron, который позволяет вам фильтровать результаты только для одного типа:

- [`is:api thumbnail`][]
- [`is:tutorial security`][]
- [`is:package ipc`][]
- [`is:app graphql`][]

## Навигация по клавиатуре

Люди любят сочетания клавиш! Новый поиск можно использовать без отвлечения пальцев от клавиатуры:

- <kbd>/</kbd> фокусирует поисковый запрос
- <kbd>esc</kbd> фокусируется на вводе поиска и очищает его
- <kbd>вниз</kbd> перемещается к следующему результату
- <kbd>вверх</kbd> перемещается к предыдущему результату, или вводу поиска
- <kbd>введите</kbd> открывает результат

Мы также открыли модуль [](https://github.com/electron/search-with-your-keyboard/) , который позволяет использовать клавиатуру. Он разработан для использования с Algolia InstantSearch, но обобщен, чтобы обеспечить совместимость с различными реализациями поиска.

## Мы хотим, чтобы ваш отзыв

Если вы столкнулись с проблемами с новым инструментом поиска, мы хотим услышать об этом!

Лучший способ отправить свой отзыв — это поместить вопрос на GitHub в соответствующий репозиторий:

- [Электрон/electronjs.org](https://github.com/electron/electronjs.org) это сайт Electron. Если вы не знаете, где сделать ошибку, это ваша лучшая ставка.
- [Электрон/algolia-индексы](https://github.com/electron/algolia-indices) - это место, где собраны все данные Electron.
- [electron/search-with-your-keyboard](https://github.com/electron/search-with-your-keyboard) делает интерфейс поиска навигационным по клавиатуре.
- [algolia/instantsearch.js](https://github.com/algolia/instantsearch.js) - это браузерный клиент, который позволяет искать по какому либо типу поиска.
- [algolia/algoliasearch-client-javascript](https://github.com/algolia/algoliasearch-client-javascript) является клиентом Node.js для загрузки данных на серверы Algolia.

## Спасибо

Special thanks to [Emily Jordan](https://github.com/echjordan) and [Vanessa Yuen](https://github.com/vanessayuenn) for building these new search capabilities, to [Libraries.io][] for providing [SourceRank][] scores, and to the team at Algolia for helping us get started. 🍹

[`electron-npm-packages`]: https://ghub.io/electron-npm-packages
[`homebrew`]: https://electronjs.org/?query=homebrew
[`is:api thumbnail`]: https://electronjs.org/?query=is%3Aapi%20thumbnail
[`is:app graphql`]: https://electronjs.org/?query=is%3Aapp%20graphql
[`is:package ipc`]: https://electronjs.org/?query=is%3Apackage%20ipc
[`is:tutorial security`]: https://electronjs.org/?query=is%3Atutorial%20security
[`music`]: https://electronjs.org/?query=music
[`resize`]: https://electronjs.org/?query=resize
[`security`]: https://electronjs.org/?query=security
[`sourceranks`]: https://github.com/nice-registry/sourceranks
[`widnow`]: https://electronjs.org/?query=widnow
[Algolia]: https://algolia.com
[Libraries.io]: https://libraries.io
[quick-start]: https://github.com/electron/electron-quick-start
[SourceRank]: https://docs.libraries.io/overview.html#sourcerank