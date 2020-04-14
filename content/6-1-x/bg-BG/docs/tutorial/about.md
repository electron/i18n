# 5256783105227699

Проекта [Electron](https://electronjs.org) е софтуерна библиотека с отворен код, разработена от GitHub с цел създаване на многоплатформени настолни приложения, с помощта на HTML, CSS и JavaScript. Проекта се осъществява с помощта на платформите [Chromium](https://www.chromium.org/Home) и [Node.js](https://nodejs.org). Разработените приложения могат да бъдат активирани и ползвани върху операционните системи Mac, Windows и Linux.

Electron began in 2013 as the framework on which [Atom](https://atom.io), GitHub's hackable text editor, would be built. The two were open sourced in the Spring of 2014.

It has since become a popular tool used by open source developers, startups, and established companies. [See who is building on Electron](https://electronjs.org/apps).

Научете кой, допринася за съществуването на Electron или започнете разработка чрез [ Ръководството за бърз старт ](quick-start.md).

## Основен екип и допринасящи разработчици

Проекта се разработва и поддържа от екип в GitHub, с помощта на [активни сътрудници](https://github.com/electron/electron/graphs/contributors) част от мрежата на потребителите на продукта. Some of the contributors are individuals and some work at larger companies who are developing on Electron. We're happy to add frequent contributors to the project as maintainers. Read more about [contributing to Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Издания

[Electron releases](https://github.com/electron/electron/releases) frequently. We release when there are significant bug fixes, new APIs or are updating versions of Chromium or Node.js.

### Updating Dependencies

Версията на хромиум в Електрон обикновенно има ъпдейт през една или две седмици, когато излезе нова стабилна версия на хромиум, в зависимост от усилията нужни за ъпгрейда.

Когато излезе нова версия на Node.js, Electron обикновенно изчаква месец, преди да ъпгрейдне към нея, за да бъде максимално стабилна версията.

In Electron, Node.js and Chromium share a single V8 instance—usually the version that Chromium is using. Most of the time this _just works_ but sometimes it means patching Node.js.


### Версии

Като версията 2.0 на Electron [ следва ` semver`](https://semver.org). За повечето приложения, ползващи всяка скорошна версия на npm, използвайки `$ npm install electron` ще свърши работата.

Този актуализиращ процес е детайлно обосновен в нашата [Версова Документация](electron-versioning.md).

### ДНС

За момента не съществува поддръжка на по-стари версии на Electron. Ако сегашната версия на Electron работи перфектно за вас, то вие може да я използвате колкото пожелаете. Ако искате да използвате други нови опции, то вие трябва да актуализирате до най-новата версия.

Най-голямата актуализация беше във версия `v1.0.0`. Ако все още не я ползвате, [ трябва да прочетете `v1.0.0` промените](https://electronjs.org/blog/electron-1-0).

## Core Philosophy

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses Chromium's rendering library rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electronjs.org/community).

## History

Below are milestones in Electron's history.

| :calendar:      | :tada:                                                                                                         |
| --------------- | -------------------------------------------------------------------------------------------------------------- |
| **April 2013**  | [Atom Shell is started](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45). |
| **May 2014**    | [Atom Shell is open sourced](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                    |
| **April 2015**  | [Atom Shell is re-named Electron](https://github.com/electron/electron/pull/1389).                             |
| **May 2016**    | [Electron releases `v1.0.0`](https://electronjs.org/blog/electron-1-0).                                        |
| **May 2016**    | [Electron apps compatible with Mac App Store](mac-app-store-submission-guide.md).                              |
| **August 2016** | [Windows Store support for Electron apps](windows-store-guide.md).                                             |
