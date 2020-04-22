# О Electron

[Electron](https://electronjs.org) - это библиотека с открытым исходным кодом, разработанная GitHub, для создания кросс-платформенных приложений с помощью HTML, CSS и JavaScript. Electron достигает этого путем объединения [Chromium](https://www.chromium.org/Home) и [Node.js](https://nodejs.org) в единую среду выполнения, а приложения могут быть собраны для выполнения под Mac, Windows и Linux.

Electron began in 2013 as the framework on which [Atom](https://atom.io), GitHub's hackable text editor, would be built. The two were open sourced in the Spring of 2014.

It has since become a popular tool used by open source developers, startups, and established companies. [See who is building on Electron](https://electronjs.org/apps).

Читайте дальше, чтобы узнать больше об авторах и релизах Electron или начать работу с Electron в [Кратком начальном руководстве](quick-start.md).

## Основная команда и авторы

Electron поддерживается командой GitHub, а также группой [активных участников](https://github.com/electron/electron/graphs/contributors) сообщества. Некоторые авторы работают на себя, другие работают в крупных компаниях, развивающихся вместе с Electron. Мы рады добавить постоянных участников проекта в качестве сопровождающих. Подробнее о [развитии Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Релизы

[Electron releases](https://github.com/electron/electron/releases) frequently. We release when there are significant bug fixes, new APIs or are updating versions of Chromium or Node.js.

### Обновление зависимостей

Версия Chromium в Electron обычно обновляется в течение одной или двух недель после выхода новой стабильной версии Chromium, в зависимости от объема работ, связанных с обновлением.

При выходе новой версии Node.js, Electron обычно выпускает обновление примерно через месяц, чтобы убедиться в стабильности версии.

In Electron, Node.js and Chromium share a single V8 instance—usually the version that Chromium is using. Most of the time this _just works_ but sometimes it means patching Node.js.


### Управление версиями

Electron начиная с версии 2.0 [использует `семантическое управление версиями`](https://semver.org). Для большинства приложений и при использовании последних версий npm, запуск команды `$ npm install electron` сделает свое дело.

Процесс обновления детально описан в нашей статье [Управление версиями Electron](electron-versioning.md).

### LTS

Долгосрочная поддержка более старых версий Electron в настоящее время не существует. Если ваша текущая версия Electron работает у вас, вы можете оставаться на ней столько, сколько захотите. Если вы хотите использовать новые функции по мере их поступления, вы должны перейти на более новую версию.

Основные обновления появились с версией `v1.0.0`. Если вы еще не используете эту версию, вы должны

 узнать больше об изменениях ` v1.0.0 ` </ 0>.</p> 



## Основная философия

Для того, чтобы сохранить Electron маленьким (размер файла) и устойчивым (распространение зависимостей и API) проект ограничивает рамки основного проекта.

Например, Electron использует только библиотеку рендеринга от Chromium, а не весь Chromium целиком. Это упрощает обновление Chromium, но также означает, что некоторые функции браузера, которые есть в Google Chrome, отсутствуют в Electron.

Новые функции, добавленные в Electron, должны в первую очередь быть нативными к API. Если функция может быть собственным модулем Node.js, то она, вероятнее всего, должна присутствовать. Смотрите [Electron инструменты, созданные сообществом](https://electronjs.org/community).



## История

Ниже приведены вехи в истории Electron.

| :calendar:      | :tada:                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------- |
| **Апрель 2013** | [Atom Shell стартовал](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45). |
| **Май 2014**    | [Atom Shell открыты исходники](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                 |
| **Апрель 2015** | [Atom Shell переименован в Electron](https://github.com/electron/electron/pull/1389).                         |
| **Май 2016**    | [Electron релиз `v1.0.0`](https://electronjs.org/blog/electron-1-0).                                          |
| **Май 2016**    | [Electron приложения совместимы с Mac App Store](mac-app-store-submission-guide.md).                          |
| **Август 2016** | [Windows Store поддерживает приложения Electron](windows-store-guide.md).                                     |
