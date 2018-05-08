# Про Electron

[Electron](https://electronjs.org) це бібліотека з відкритим вихідним кодом для побудови крос-платформних настільних додатків з HTML, CSS та JavaScript. Розроблена компанією GitHub. Електрон вирішує цю задачу об'єднуючи [Chromium](https://www.chromium.org/Home) та [Node.js](https://nodejs.org) в одне середовище виконання та застосунки, що можуть бути упаковані для Mac, Windows і Linux.

Electron засновано в 2013 році як фреймворк на якому згодом буде створено [Atom](https://atom.io) - хакерський текстовий редактор від GitHub. Весною 2014 року вони стали open-source.

It has since become a popular tool used by open source developers, startups, and established companies. [See who is building on Electron](https://electronjs.org/apps).

Read on to learn more about the contributors and releases of Electron or get started building with Electron in the [Quick Start Guide](quick-start.md).

## Core Team and Contributors

Electron is maintained by a team at GitHub as well as a group of [active contributors](https://github.com/electron/electron/graphs/contributors) from the community. Some of the contributors are individuals and some work at larger companies who are developing on Electron. We're happy to add frequent contributors to the project as maintainers. Read more about [contributing to Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Релізи

[Electron releases](https://github.com/electron/electron/releases) frequently. We release when there are significant bug fixes, new APIs or are updating versions of Chromium or Node.js.

### Оновлення Залежностей

Electron's version of Chromium is usually updated within one or two weeks after a new stable Chromium version is released, depending on the effort involved in the upgrade.

When a new version of Node.js is released, Electron usually waits about a month before upgrading in order to bring in a more stable version.

In Electron, Node.js and Chromium share a single V8 instance—usually the version that Chromium is using. Most of the time this *just works* but sometimes it means patching Node.js.

### Версії

As of version 2.0 Electron [follows `semver`](https://semver.org). For most applications, and using any recent version of npm, running `$ npm install electron` will do the right thing.

The version update process is detailed explicitly in our [Versioning Doc](electron-versioning.md).

### LTS

Long term support of older versions of Electron does not currently exist. If your current version of Electron works for you, you can stay on it for as long as you'd like. If you want to make use of new features as they come in you should upgrade to a newer version.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electronjs.org/blog/electron-1-0).

## Core Philosophy

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses Chromium's rendering library rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electronjs.org/community).

## Історія

Нижче наведені віхи історії Electron.

| :calendar:       | :tada:                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| **Квітень 2013** | [Стартував Atom Shell](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45). |
| **Травень 2014** | [Відкрився доступ до коду Atom Shell](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html).          |
| **Квітень 2015** | [Atom Shell перейменований в Electron](https://github.com/electron/electron/pull/1389).                       |
| **Травень 2016** | [Випуск Electron `v1.0.0`](https://electronjs.org/blog/electron-1-0).                                         |
| **Травень 2016** | [Застосунки Electron стали сумісні з Mac App Store](mac-app-store-submission-guide.md).                       |
| **Серпень 2016** | [Windows Store підтримує застосунки Electron](windows-store-guide.md).                                        |