---
title: "Новий Інтернаціоналізований сайт Electron"
author: zeke
date: '2017-11-13'
---

Electron має новий сайт на [electronjs.org](https://electronjs.org)! Ми замінили сайт нашого статичного Джекиля на Node. на веб-сервері, де є гнучкість інтернаціоналізувати сайт і прокласти шлях для нових захоплюючих функцій.

---

## 🌍 Перекази

Ми розпочали процес інтернаціоналізації сайту за допомогою мети зробити розробку Electron доступним для глобальної аудиторії розробників. Ми використовуємо локалізаційну платформу [Crowdin](https://crowdin.com/project/electron) , яка інтегрується в з GitHub, відкриття та оновлення pull requests автоматично, так як вміст перекладається на різні мови.

<figure>
  <a href="https://electronjs.org/languages">
    <img src="https://user-images.githubusercontent.com/2289/32803530-a35ff774-c938-11e7-9b98-5c0cfb679d84.png" alt="Electron Nav в спрощеній китайській мові">
    <figcaption>Рев Electron Nav в Спрощеній китайській</figcaption>
  </a>
</figure>

Хоча ми поки що спокійно працюємо над цими зусиллями, понад 75 членів спільноти Electron вже виявили проект органічно і приєдналися до зусиль для інтернаціоналізації сайту і перекладу документації Electron на 20 мов. Ми бачимо [щоденні внески](https://github.com/electron/electron-i18n/pulls?utf8=%E2%9C%93&q=is%3Apr%20author%3Aglotbot%20) від людей по всьому світу. з перекладами для мов, таких як французький, в'єтнамська, індонезійська та китайська, лідирують на шляху.

Щоб вибрати мову і переглянути прогрес перекладу, відвідайте [electronjs.org/languages](https://electronjs.org/languages)

<figure>
  <a href="https://electronjs.org/languages">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32754734-e8e43c04-c886-11e7-9f34-f2da2bb4357b.png" alt="Поточні цільові мови на Crowdin">
    <figcaption>Виконуються переклади на Crowdin</figcaption>
  </a>
</figure>

Якщо ви багатомовність і зацікавлені допомогти перекласти документи Electron та веб-сайти , відвідайте [електроні/electron-i18n](https://github.com/electron/electron-i18n#readme) репозиторій, або стрибніть прямо в переклад на [Crowdin](https://crowdin.com/project/electron), де ви можете ввійти, використовуючи свій обліковий запис GitHub.

Для проекту Electron на Crowdin ввімкнено 21 мову. Додавання підтримки нових мов легко, тому якщо вам цікаво допомогти з перекладом, але ви не бачите свою мову, [повідомте нам](https://github.com/electron/electronjs.org/issues/new) і ми увімкнемо його.

## Документація RAW

Якщо ви надаєте перевагу читати документацію з необроблених файлів markdown, ви можете зробити це мовою наступного:

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## Сторінки програми

З сьогоднішнього дня, будь-який Electron застосунок може легко мати свою власну сторінку на сайті Electron . Для кількох прикладів дивіться [Етчер](https://electronjs.org/apps/etcher), [1Clipboard](https://electronjs.org/apps/1clipboard), або [GraphQL Playground](https://electronjs.org/apps/graphql-playground), зображений тут на японській версії сайту:

<figure>
  <a href="https://electronjs.org/apps/graphql-playground">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871096-f5043292-ca33-11e7-8d03-a6a157aa183d.png" alt="GraphQL Playground">
  </a>
</figure>

Там є деякі неймовірні застосунки Electron, але вони не завжди просто знайти, і не кожен розробник має час або ресурси для створення належного веб-сайту на ринок і не розповсюджує свій додаток.

Використовуйте тільки [PNG файл іконок і невелику кількість метаданих додатка](https://github.com/electron/electron-apps/blob/master/contributing.md) Ми можемо зібрати багато інформації про даний додаток. Використовуючи дані, зібрані з GitHub, сторінки додатків можуть відображати знімки екрану, посилання для скачування, версії, зауваження і READMEs для кожного додатку має публічний репозиторій. Використання кольорової палітри для видобутку з піктограми кожної програми, ми можемо відтворити [жирних і доступних кольорів](https://github.com/zeke/pick-a-good-color) для кожної програми деякі візуальні відмінності.

[сторінка програми](https://electronjs.org/apps) тепер також має категорії і ключовий фільтр для пошуку цікавих додатків, таких як [GraphQL GUis](https://electronjs.org/apps?q=graphql) і [p2p tools](https://electronjs.org/apps?q=graphql).

Якщо у вас є застосунок Electron, який вам подобається на сайті, відкрийте запит на злиття на [електроні/electron-apps](https://github.com/electron/electron-apps) репозиторій.

## Однорядне встановлення за допомогою Homebrew

The [Homebrew](https://brew.sh) Менеджер пакетів для macOS має підкоманду [cask](https://caskroom.github.io) , що спрощує встановлення настільних програм за допомогою однієї команди в терміналі наприклад, `brew cask install atom`.

Ми почали збирати імена запитів Homebrew для популярних додатків Electron і тепер показують команду установки (для macOS відвідувачів) на кожній сторінці додатку , в якій є регістр:

<figure>
  <a href="https://electronjs.org/apps/dat">
   <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871246-c5ef6f2a-ca34-11e7-8eb4-3a5b93b91007.png">
   <figcaption>Параметри встановлення адаптовані для платформи: macOS, Windows, Linux</figcaption>
  </a>
</figure>

To view all the apps that have homebrew cask names, visit [electronjs.org/apps?q=homebrew](https://electronjs.org/apps?q=homebrew). Якщо знаєте інші програми з цифрами, які ми ще не індексували, [, будь ласка, додайте їх!](https://github.com/electron/electron-apps/blob/master/contributing.md)

## 🌐 Новий домен

Ми перемістили сайт з electron.atom.io на новий домен: [electronjs.org](https://electronjs.org).

Проект Electron народився всередині [Atom](https://atom.io), редактор тексту з відкритим вихідним кодом , побудований на веб-технологіях. Початково Electron було названо `атом-оболонка`. Atom став першим додатком, який використовував його, але людям було недовго усвідомлювати, що цей магічний Chromium + час виконання Node може бути використаний для всіх видів різних додатків. Коли такі компанії, як Microsoft і Slack почали використовувати `атом-оболонку`, проекту стало зрозуміло, що потрібно нове ім'я.

Тому так народилася "Electron". На початку 2016 року GitHub зібрав нову команду, щоб зосередитись спеціально на розробці Electron та обслуговуванні, крім Atom. В час з тих пір, Electron було прийнято тисячами розробників програм, і тепер залежить від багатьох великих компаній, багато з яких мають власні Electron команди Electron.

Підтримка проектів GitHub, таких як Atom і [GitHub Робочий стіл](https://desktop.github.com) все ще має пріоритет для нашої команди, але, переходячи до нового домену, ми сподіваємося допомогти зрозуміло технічних відмінностей між Atom та Electron.

## 🐢🚀 Node.js всюди

Попередній веб-сайт Electron був побудований за допомогою [Jekyll](https://jekyllrb.com), популярного генератора статичних сайтів на базі Ruby . Джекілл є чудовим інструментом для будівництва статичних веб-сайтів, але веб-сайт почав перерощувати його. Нам потрібні більш динамічні можливості, такі як правильні редиректи та візуалізація динамічного вмісту, тож [Node.js](https://nodejs.org) сервер був очевидним вибором.

Єдина екосистема Electron включає проекти з компонентами, написаними багатьма різними мовами програмування від Python до C++ до Bash. Але для Electron використовується стільки ж мов JavaScript у нашій спільноті.

При зміні сайту з Ruby в Node.js, ми прагнемо знизити бар'єр до бажання людей внести свій внесок на сайт.

## ⚡ Легша участь з відкритим кодом

Якщо ви маєте [Node. s](https://nodejs.org) (8 або вище) і [git](https://git-scm.org) встановлений у вашій системі, ви можете легко отримати працюють на сайті локально:

```sh
git clone https://github.com/electron/electronjs.org
cd electronjs.org
npm install
npm run dev
```

Новий сайт розміщено на Heroku. Ми використовуємо конвеєри розгортання і [Review Apps](https://devcenter.heroku.com/articles/github-integration-review-apps) що автоматично створює запущену копію програми для кожного запиту на злиття . Рецензенти дають можливість Вам максимально легким переглядом справжніх ефектів тягнути запит на живу копію сайту.

## 🙏 Дякуємо учасникам

Ми б хотіли надавати особливу подяку усім людям по всьому світу, хто зробив внесок у свій час та енергію, щоб допомогти поліпшити Electron. Пристрасть спільноти з відкритим вихідним кодом допомогла незмірно зробити Electron успішним. Дякую!

<figure>
  <img src="https://user-images.githubusercontent.com/2289/32871386-92eaa4ea-ca35-11e7-9511-a746c7fbf2c4.png">
</figure>