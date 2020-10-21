---
title: Пошук
author:
  - echjordan
  - vanessayuenn
  - zeke
date: '2018-06-21'
---

Веб-сайт Electron має нову пошукову систему, яка надає миттєві результати для API docs, підручників, пов'язаних з Electron-npm пакетів та інших.

<figure>
  <a href="https://electronjs.org/?query=resize" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/41683719-417ca80a-7490-11e8-9a52-fb145f4251ba.png" alt="Пошук екрану Electron">
  </a>
</figure>

---

Вивчення нових технологій чи фреймворків, таких як Electron може залякати. Як тільки ви зрозумієте [швидкісний старт](https://github.com/electron/electron-quick-start) етап, його може бути важко вивчити найкращі практики, знайти правильного API або відкрити для себе інструменти , які допоможуть вам побудувати додаток ваших мрій. Ми хочемо, щоб сайт Electron став кращим інструментом для пошуку ресурсів, необхідні для швидшої та легкості.

Відвідайте будь-яку сторінку на [electronjs.org](https://electronjs.org) , і ви знайдете нове пошукове введення на верхній частині сторінки.

## Рушій пошуку

Коли ми вперше встановили налаштування щодо додавання пошуку на сайт, ми прокотилися нашою власною пошуковою системою з використанням GraphQL як у фоновому режимі. GraphQL був веселим для роботи з сервісом пошуковою системою була виконана, але ми швидко зрозуміли, що створення пошукової системи не є тривіальним завданням. Такі речі, як пошук на декілька слів і детектор топок вимагають великої кількості роботи, щоб отримати правильність. Замість того, щоб знову винаходити колесо ми вирішили використати існуюче рішення для пошуку: [Алголія](https://algolia.com).

Algolia є розміщеною службою пошуку, яка швидко стала пошуковою системою з вибору серед популярних відкритих проектів, таких як React, Vue, Bootstrap, Yarn і [інші](https://community.algolia.com/docsearch/).

Ось деякі особливості, які зробили Algolia хорошим відповідним для проекту Electron:

- [InstantSearch.js](https://community.algolia.com/instantsearch.js) надає результати, як ви вводите, зазвичай близько 1 мс.
- [Типохибка](https://www.algolia.com/doc/guides/textual-relevance/typo-tolerance/) означає, що ви все одно отримаєте результати, навіть якщо наберете [`ширина`].
- [Розширений синтаксис запитів](https://www.algolia.com/doc/api-reference/api-parameters/advancedSyntax/) дозволяє `"точні відповідати в цитуваннях"` та `-exclusion`.
- [API клієнти](https://www.algolia.com/doc/api-client/javascript/getting-started/) є відкритим кодом і мають добре документ.
- [Аналітика](https://www.algolia.com/doc/guides/analytics/analytics-overview/) повідомляє нам про те, що люди шукають найбільше, так само, як і те, що вони шукають, але не знаходять. Це дасть нам цінне розуміння того, як можна покращити документацію Electron.
- Algolia [безкоштовно для проектів з відкритим кодом](https://www.algolia.com/for-open-source).

## API Docs

Sometimes you know *what* you want to accomplish, but you don't know exactly *how* to do it. Electron має більше 750 методів API, подій та властивостей. Жодна людина не може легко пам'ятати їх усіх, але комп'ютери - це все добре. Використовуючи [документи JSON API](https://electronjs.org/blog/api-docs-json-schema), ми індексували всі ці дані в Алголії, і тепер ви можете легко знайти точний API, який ви шукаєте.

Спроба змінити розмір вікна? Пошук [`зміна розміру`] і стрибати прямо до необхідного методу.

## Уроки

Electron має постійно зростаючу колекцію підручників для доповнення свого API документації. Тепер ви можете легко знайти підручники на вказаній темі прямо разом з документацією API.

Шукаєте кращі практики в безпеці? Пошук [`безпеки`].

## Пакети npm

Наразі в npm реєстрі вже більше 700,000 пакетів, тож його не завжди просто знайти. Щоб полегшити пошук цих модулів, ми створили [`electron-npm-packages`], колекція 3400+ модулів у реєстр, який побудований спеціально для використання з Electron.

Люди з [бібліотеки. o](https://libraries.io) створив [ресурсний ранг](https://docs.libraries.io/overview.html#sourcerank), система пильного перегляду проектів програмного забезпечення на основі комбінації таких показників, як коду, спільноти, документації та використання. Ми створили модуль [`sourceranks` , який включає в себе оцінку кожного модуля в реєстрі npm, і ми використовуємо ці оцінки для сортування результатів.

Хочете альтернативи вбудованим модулями IPC? Пошук [`is:package ipc`].

## Застосунки Electron

дані [легко індексувати з Algolia](https://github.com/electron/algolia-indices), і тому ми додали наявний список застосунків з [electron/apps](https://github.com/electron/apps).

Спробуйте пошук [`музики`] або [`homebrew`].

## Результати фільтрації

If you've used GitHub's [code search](https://github.com/search) before, you're probably aware of its colon-separated key-value filters like `extension:js` or `user:defunkt`. We think this filtering technique is pretty powerful, so we've added an `is:` keyword to Electron's search that lets you filter results to only show a single type:

- [`is:api thumbnail`]
- [`is:tutorial security`]
- [`is:package ipc`]
- [`is:app graphql`]

## Навігація клавіатури

Люди люблять клавіатурні клавіші! Новий пошук можна використовувати без зняття пальців з клавіатури:

- <kbd>/</kbd> фокусується на введенні дані пошуку
- <kbd>еск</kbd> фокусується на вхідних параметрах пошуку та очищує його
- <kbd>вниз</kbd> перемістити до наступного результату
- <kbd>вгору</kbd> перемістити до попереднього результату або введення пошуку
- <kbd>введіть</kbd> відкриває результат

Також ми відкрили модуль [](https://github.com/electron/search-with-your-keyboard/) , який дозволяє взаємодіяти з клавіатурою. Його розроблено для використання за допомогою Algolia InstantSearch, , але його узагальнено для забезпечення сумісності з різними реалізаціями пошуку.

## Ми хочемо, щоб ваш відгук

Якщо ви стикаєтеся з будь-якими проблемами з новим інструментом пошуку, ми хочемо почути про це!

Найкращий спосіб відправлення вашого відгуку це відправивши на GitHub проблему у відповідний репозиторій :

- [electron/electronjs.org](https://github.com/electron/electronjs.org) це веб-сайт Electron. Якщо ви не знаєте, куди подавати проблему, це ваша найкраща ставка.
- [електроні/альгольiа-індекси](https://github.com/electron/algolia-indices) це місце, де всі дані пошукового Electron компіляються.
- [електронна / пошук без вашої клавіатури](https://github.com/electron/search-with-your-keyboard) робить інтерфейс пошуку навігацією в клавіатурі.
- [algolia/instantsearch.js](https://github.com/algolia/instantsearch.js) — це браузерний клієнт, який дозволяє пошук типу find-as-you-type.
- [algolia/algoliasearch-client-javascript](https://github.com/algolia/algoliasearch-client-javascript) — це клієнт Node.js для завантаження даних на сервери Algolia.

## Подяка

Особлива подяка [Емілі Джордан](https://github.com/echjordan) і [Ваннессі юен](https://github.com/vanessayuenn) за будівництво цих нових можливостей пошуку, [бібліотеки. o](https://libraries.io) для надання [Джерело Rank](https://docs.libraries.io/overview.html#sourcerank) балів та команди в Algolia щоб допомогти нам розпочати роботу. 🍹