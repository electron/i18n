# О Electron

[Electron](https://electron.atom.io) - это библиотека с открытым исходным кодом, разработанная GitHub, для создания кросс-платформенных приложений с помощью HTML, CSS и JavaScript. Electron выполняет это путем объединения [Chromium](https://www.chromium.org/Home) и [Node.js](https://nodejs.org) в единую среду выполнения, а приложения могут быть упакованы для Mac, Windows и Linux.

Electron began in 2013 as the framework on which [Atom](https://atom.io), GitHub's hackable text editor, would be built. The two were open sourced in the Spring of 2014.

It has since become a popular tool used by open source developers, startups, and established companies. [See who is building on Electron](https://electron.atom.io/apps/).

Read on to learn more about the contributors and releases of Electron or get started building with Electron in the [Quick Start Guide](quick-start.md).

## Основная команда и участники

Electron поддерживается командой в GitHub, а также группой [активных участников](https://github.com/electron/electron/graphs/contributors) от сообщества. Некоторые из авторов самозанятые люди, а некоторые работают в крупных компаниях, которые развиваются на Electron. Мы рады добавить в проект постоянных участников проекта в качестве сопровождающих. Подробнее о [развитии Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Релизы

[Electron релизы](https://github.com/electron/electron/releases) частые. Мы их выпускаем, когда есть значительные исправления ошибок, новое API или обновляется версия Chromium или Node.js.

### Обновление зависимостей

Electron версия обычно обновляется в течение одной или двух недель после выхода новой стабильной версии Chromium, в зависимости от усилий, связанных с обновлением.

При новой версии релиза Node.js, Electron обычно выжидает около месяца, перед обновлением, чтобы перевести в более стабильную версию.

В Electron Node.js и Chromium используют один экземпляр V8 - обычно версия, которую использует Chromium. В большинстве случаев это *просто работает*, но иногда это означает исправление Node.js.

### Версионность

Из-за жесткой зависимости от Node.js и Chromium, Electron находится в затруднительном положении версионности и [не соответствует`semver`](http://semver.org). Поэтому вы всегда должны ссылаться на конкретную версию Electron. [Подробнее о версионности Electron](https://electron.atom.io/docs/tutorial/electron-versioning/) или смотрите [текущая используемая версия](https://electron.atom.io/#electron-versions).

### LTS

Долгосрочная поддержка более старых версий Electron в настоящее время не существует. Если ваша текущая версия Electron работает для вас, вы можете оставаться на ней столько, сколько захотите. Если вы хотите использовать новые функции по мере их поступления, вы должны перейти на более новую версию.

Основные обновления появились с версией `v1.0.0`. Если вы еще не используете эту версию, вы должны  узнать больше об изменениях ` v1.0.0 ` </ 0>.</p> 

## Основная философия

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses just the rendering library from Chromium rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electron.atom.io/community).

## History

Below are milestones in Electron's history.

| :calendar:      | :tada:                                                                                                                |
| --------------- | --------------------------------------------------------------------------------------------------------------------- |
| **April 2013**  | [Atom Shell is started](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45).        |
| **May 2014**    | [Atom Shell is open sourced](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                            |
| **April 2015**  | [Atom Shell is re-named Electron](https://github.com/electron/electron/pull/1389).                                    |
| **May 2016**    | [Electron releases `v1.0.0`](https://electron.atom.io/blog/2016/05/11/electron-1-0).                                  |
| **May 2016**    | [Electron apps compatible with Mac App Store](https://electron.atom.io/docs/tutorial/mac-app-store-submission-guide). |
| **August 2016** | [Windows Store support for Electron apps](https://electron.atom.io/docs/tutorial/windows-store-guide).                |