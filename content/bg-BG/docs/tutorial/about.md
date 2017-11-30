# About Electron

Проекта [Electron](https://electron.atom.io) е софтуерна библиотека с отворен код, разработена от GitHub с цел създаване на многоплатформени настолни приложения, с помощта на HTML, CSS и JavaScript. Проекта се осъществява с помощта на платформите [Chromium](https://www.chromium.org/Home) и [Node.js](https://nodejs.org). Разработените приложения могат да бъдат активирани и ползвани върху операционните системи Mac, Windows и Linux.

Разработката на продукта започва през 2013 година като работна рамка върху която е базиран друг проект на GitHub известен като [Atom](https://atom.io). Кода и на двата проекта е отворен през 2014 година.

От тогава на сетне инструмента се превръща в популярно решение, за създаване на приложения, ползвано от разработчици на продукти с отворен код, добре извести софтуерни компании и стартиращи такива. [Вижте списък на разработчиците ползващи Electron](https://electron.atom.io/apps/).

Read on to learn more about the contributors and releases of Electron or get started building with Electron in the [Quick Start Guide](quick-start.md).

## Core Team and Contributors

Проекта се разработва и поддържа от екип в GitHub, с помощта на [активни сътрудници](https://github.com/electron/electron/graphs/contributors) част от мрежата на потребителите на продукта. Some of the contributors are individuals and some work at larger companies who are developing on Electron. We're happy to add frequent contributors to the project as maintainers. Read more about [contributing to Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Releases

[Electron releases](https://github.com/electron/electron/releases) frequently. We release when there are significant bug fixes, new APIs or are updating versions of Chromium or Node.js.

### Updating Dependencies

Electron's version of Chromium is usually updated within one or two weeks after a new stable Chromium version is released, depending on the effort involved in the upgrade.

When a new version of Node.js is released, Electron usually waits about a month before upgrading in order to bring in a more stable version.

In Electron, Node.js and Chromium share a single V8 instance—usually the version that Chromium is using. Most of the time this *just works* but sometimes it means patching Node.js.

### Versioning

Due to the hard dependency on Node.js and Chromium, Electron is in a tricky versioning position and [does not follow `semver`](http://semver.org). You should therefore always reference a specific version of Electron. [Read more about Electron's versioning](https://electron.atom.io/docs/tutorial/electron-versioning/) or see the [versions currently in use](https://electron.atom.io/#electron-versions).

### LTS

Long term support of older versions of Electron does not currently exist. If your current version of Electron works for you, you can stay on it for as long as you'd like. If you want to make use of new features as they come in you should upgrade to a newer version.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electron.atom.io/blog/2016/05/11/electron-1-0).

## Core Philosophy

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