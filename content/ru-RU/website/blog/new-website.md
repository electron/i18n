---
title: "Новый интернационализированный сайт Electron"
author: zeke
date: '2017-11-13'
---

У Electron новый сайт на [electronjs.org](https://electronjs.org)! Мы заменили наш статический сайт Jekyll узлом. s webserver, давая нам гибкость интернационализации сайта и открывая путь для более захватывающих новых функций.

---

## 🌍 Переводы

Мы начали процесс интернационализации веб-сайта с целью сделать развитие Electron приложения доступным для глобальной аудитории разработчиков. Мы используем локализационную платформу под названием [Crowdin](https://crowdin.com/project/electron) , которая интегрирует в GitHub, открытие и обновление Pull Request'ов автоматически по мере перевода контента на другие языки.

<figure>
  <a href="https://electronjs.org/languages">
    <img src="https://user-images.githubusercontent.com/2289/32803530-a35ff774-c938-11e7-9b98-5c0cfb679d84.png" alt="Electron Nav в упрощенном китайском">
    <figcaption>Nav Electron в упрощенном китайском</figcaption>
  </a>
</figure>

Хотя мы до сих пор работали спокойно над этими усилиями. более 75 членов сообщества Electron уже открыли проект органично и присоединились к усилиям по интернационализации веб-сайта и переводу документации Electron на более чем 20 языков. Мы видим [ежедневных пожертвований](https://github.com/electron/electron-i18n/pulls?utf8=%E2%9C%93&q=is%3Apr%20author%3Aglotbot%20) от людей по всему миру, с переводами на французский, вьетнамский, индонезийский и китайский языки.

Чтобы выбрать свой язык и просмотреть прогресс перевода, посетите [electronjs.org/languages](https://electronjs.org/languages)

<figure>
  <a href="https://electronjs.org/languages">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32754734-e8e43c04-c886-11e7-9f34-f2da2bb4357b.png" alt="Текущие целевые языки на Crowdin">
    <figcaption>Переводы в процессе работы на Crowdin</figcaption>
  </a>
</figure>

Если вы многоязычный и заинтересованы в помощи в переводе документов Electron и веб-сайта, посетите [электронные/электронные/электронные i18n](https://github.com/electron/electron-i18n#readme) репо, или прыгните прямо на перевод на [Crowdin](https://crowdin.com/project/electron), где вы можете войти с помощью учетной записи GitHub.

В настоящее время для проекта Electron доступно 21 язык. Добавление поддержки для большего количества языков просто, так что если вы заинтересованы в помощи в переводе, но вы не видите ваш список языков, [Дайте нам знать](https://github.com/electron/electronjs.org/issues/new) и мы включим его.

## Сырой перевод

Если вы предпочитаете читать документацию в raw markdown файлах, вы теперь можете сделать это на любом языке:

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## Страницы приложений

На сегодняшний день любое приложение Electron может легко иметь свою собственную страницу на сайте . Для нескольких примеров, проверить [Etcher](https://electronjs.org/apps/etcher), [1Clipboard](https://electronjs.org/apps/1clipboard), или [Graph'L площадка](https://electronjs.org/apps/graphql-playground), на фото здесь, на японской версии сайта:

<figure>
  <a href="https://electronjs.org/apps/graphql-playground">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871096-f5043292-ca33-11e7-8d03-a6a157aa183d.png" alt="GraphQL Playground">
  </a>
</figure>

Есть невероятные приложения Electron, но они не всегда легко найти, и не каждый разработчик имеет время или ресурсы для создания соответствующего веб-сайта на рынке и распространения своего приложения.

Используя только [файл значка PNG и небольшое количество метаданных приложения](https://github.com/electron/electron-apps/blob/master/contributing.md), мы можем собрать много информации о данном приложении. Используя данные, собранные с GitHub, страницы приложений теперь могут отображать скриншоты, ссылки для скачивания, версии, примечания к выпуску и README для каждого приложения имеет публичный репозиторий. Используя цветовую палитру из значка каждого приложения, мы можем создать [жирные и доступные цвета](https://github.com/zeke/pick-a-good-color) для каждой страницы приложения некоторые отличия.

Индексная страница [приложений](https://electronjs.org/apps) теперь также имеет категории и фильтр ключевых слов, чтобы найти такие интересные приложения, как [GraphQL GUIs](https://electronjs.org/apps?q=graphql) и [p2p инструменты](https://electronjs.org/apps?q=graphql).

Если у вас есть приложение Electron, которое вы хотели бы разместить на сайте, откройте запрос на слияние в репозитории [электронных/электронных приложений](https://github.com/electron/electron-apps).

## Установка в одну строку с Homebrew

[Homebrew](https://brew.sh) пакетного менеджера для macOS имеет субкоманду под названием [cask](https://caskroom.github.io) , которая позволяет легко установить настольные приложения с помощью одной команды в вашем терминале, как `brew cask install atom`.

Мы начали собирать названия Homebrew cask для популярных приложений Electron и теперь показывают команду установки (для посетителей macOS) на каждой странице приложения с казино:

<figure>
  <a href="https://electronjs.org/apps/dat">
   <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871246-c5ef6f2a-ca34-11e7-8eb4-3a5b93b91007.png">
   <figcaption>Параметры установки, адаптированные для вашей платформы: macOS, Windows, Linux</figcaption>
  </a>
</figure>

Чтобы просмотреть все приложения с именами homebrew посетите [electronjs.org/apps?q=homebrew](https://electronjs.org/apps?q=homebrew). Если вы знаете о других приложениях, которые мы еще не индексировали, [пожалуйста, добавьте их!](https://github.com/electron/electron-apps/blob/master/contributing.md)

## 🌐 Новый домен

Мы переместили сайт с electron.atom.io в новый домен: [electronjs.org](https://electronjs.org).

Проект Electron родился внутри [Atom](https://atom.io), текстовый редактор GitHub построенный на веб-технологиях. Electron изначально назывался `атомарным оболочкой`. Atom был первым приложением для его использования, но людям не понадобилось много времени, чтобы понять, что этот волшебный Chromium + Node runtime может быть использован для различных приложений. Когда такие компании, как Microsoft и Slack начали использовать `атомарную оболочку`, стало ясно, что проект требует нового имени.

И так родился "Electron". В начале 2016 года GitHub собрал новую команду, которая сосредоточила специально на разработке и обслуживании Electron, кроме Атома. Через раз, когда Electron был принят тысячами разработчиков приложений, и в настоящее время зависит от многих крупных компаний, многие из которых имеют команды Electron самостоятельно.

Поддержка проектов Electron GitHub, таких как Atom и [GitHub Desktop](https://desktop.github.com) , все еще является приоритетом для нашей команды, но перейдя на новый домен, мы надеемся, что мы поможем уточнить техническое различие между Atom и Electron.

## 🐢🚀 Node.js везде

Предыдущий сайт Electron был построен с [Jekyll](https://jekyllrb.com), популярным статическим генератором сайта Ruby. Jekyll - отличный инструмент для создания статических сайтов, но сайт начал превзойти его. We wanted more dynamic capabilities like proper redirects and dynamic content rendering, so a [Node.js](https://nodejs.org) server was the obvious choice.

экосистема Electron включает проекты с компонентами, написанными на многих различных языках программирования, от Python до C++ до Bash. Но JavaScript является основой для Electron, и это язык, который больше всего используется в нашем сообществе.

Переходя на сайт из Ruby в Node.js, мы стремимся уменьшить барьер для людей, желающих внести свой вклад в работу сайта.

## ⚡ более легкое участие с открытым исходным кодом

Если у вас есть [узел. s](https://nodejs.org) (8 или выше) и [git](https://git-scm.org) установлен в вашей системе, вы можете легко запустить сайт локально:

```sh
git clone https://github.com/electron/electronjs.org
cd electronjs.org
npm install
npm run dev
```

Новый сайт размещен на Heroku. Мы используем трубопроводы развертывания и функцию [обзора приложений](https://devcenter.heroku.com/articles/github-integration-review-apps) , которая автоматически создает запущенную копию приложения для каждого запроса запроса. Это облегчает просмотр рецензентами реальных эффектов запроса на слияние на живой копии сайта.

## 🙏 Спасибо авторам

Мы хотели бы выразить особую благодарность всем людям, которые поделились своим временем и энергией, чтобы помочь улучшить Electron. Страсть сообщества с открытым исходным кодом помогла добиться успеха Electron. Спасибо!

<figure>
  <img src="https://user-images.githubusercontent.com/2289/32871386-92eaa4ea-ca35-11e7-9511-a746c7fbf2c4.png">
</figure>