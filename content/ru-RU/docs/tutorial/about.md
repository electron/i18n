# О Electron

[Electron](https://electronjs.org) is an open source library developed by GitHub for building cross-platform desktop applications with HTML, CSS, and JavaScript. Electron выполняет это путем объединения [Chromium](https://www.chromium.org/Home) и [Node.js](https://nodejs.org) в единую среду выполнения, а приложения могут быть упакованы для Mac, Windows и Linux.

Electron был создан в 2013 году в качестве фреймворка как платформа для [Atom](https://atom.io), GitHub's хакнул текстовый редактор будущего. Оба были открыты весной 2014 года.

It has since become a popular tool used by open source developers, startups, and established companies. [See who is building on Electron](https://electronjs.org/apps).

Читайте дальше, чтобы узнать больше о вкладчиках и выпусках Electron или начать работу с Electron в [Кратком начальном руководстве](quick-start.md).

## Основная команда и участники

Electron поддерживается командой в GitHub, а также группой [активных участников](https://github.com/electron/electron/graphs/contributors) от сообщества. Некоторые из авторов самозанятые люди, а некоторые работают в крупных компаниях, которые развиваются на Electron. Мы рады добавить в проект постоянных участников проекта в качестве сопровождающих. Подробнее о [развитии Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Релизы

[Electron релизы](https://github.com/electron/electron/releases) частые. Мы их выпускаем, когда есть значительные исправления ошибок, новое API или обновлённая версия Chromium или Node.js.

### Обновление зависимостей

Electron версия обычно обновляется в течение одной или двух недель после выхода новой стабильной версии Chromium, в зависимости от усилий, связанных с обновлением.

При новой версии релиза Node.js, Electron обычно выжидает около месяца, перед обновлением, чтобы перевести в более стабильную версию.

В Electron Node.js и Chromium используют один экземпляр V8 - обычно версия, которую использует Chromium. В большинстве случаев это *просто работает*, но иногда это означает исправление Node.js.

### Версионность

As of version 2.0 Electron [follows `semver`](http://semver.org). For most applications, and using any recent version of npm, running `$ npm install electron` will do the right thing.

The version update process is detailed explicitly in our [Versioning Doc](electron-versioning.md).

### LTS

Long term support of older versions of Electron does not currently exist. If your current version of Electron works for you, you can stay on it for as long as you'd like. If you want to make use of new features as they come in you should upgrade to a newer version.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electronjs.org/blog/electron-1-0).

## Основная философия

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses just the rendering library from Chromium rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electronjs.org/community).

## История

Below are milestones in Electron's history.

| :calendar:      | :tada:                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Апрель 2013** | [Atom Shell стартовал](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45).       |
| **Май 2014**    | [Atom Shell открыты исходники](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                        |
| **Апрель 2015** | [Atom Shell переименован в Electron](https://github.com/electron/electron/pull/1389).                               |
| **Май 2016**    | [Electron releases `v1.0.0`](https://electronjs.org/blog/electron-1-0).                                             |
| **Май 2016**    | [Electron apps compatible with Mac App Store](https://electronjs.org/docs/tutorial/mac-app-store-submission-guide). |
| **Август 2016** | [Windows Store support for Electron apps](https://electronjs.org/docs/tutorial/windows-store-guide).                |