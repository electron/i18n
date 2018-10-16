# Макеты и CLI

Разработка в Electron разнообразна - нет "одного истинного пути" для разработки, сборки, упаковки или выпуска приложения. Дополнительные особенности для Electron, как для сборки, так и для времени выполнения, обычно можно найти в [npm](https://www.npmjs.com/search?q=electron) в отдельных пакетах, что позволяет разработчикам как создать приложение, так и построить конвейер, в котором они нуждаются.

Этот уровень модульности и расширяемости гарантирует, что все разработчики, работающие с Electron, как большие, так и малые по размеру группы, никогда не ограничены тем, что они могут или не могут делать в любое время в течение своего жизненного цикла разработки. Тем не менее, для многих разработчиков один из управляемых сообществом шаблонов или инструментов командной строки может значительно упростить компиляцию, упаковку и выпуск приложения.

## Макеты против CLI

Шаблон является только отправной точкой - это, так сказать, холст, из которого вы создаете свое приложение. Они обычно приходят в виде репозитория, который вы можете клонировать и настраивать ваш контент.

С другой стороны, инструмент командной строки продолжает поддерживать вас на протяжении всей разработки и выпуска. Они более полезны и поддерживаемы, но обеспечивают соблюдение рекомендаций о том, как ваш код должен быть структурирован и построен. *Especially for beginners, using a command line tool is likely to be helpful*.

## electron-forge

A "complete tool for building modern Electron applications". Electron Forge unifies the existing (and well maintained) build tools for Electron development into a cohesive package so that anyone can jump right in to Electron development.

Forge comes with [ready-to-use templates](https://electronforge.io/templates) for popular frameworks like React, Vue, or Angular. It uses the same core modules used by the greater Electron community (like [`electron-packager`](https://github.com/electron-userland/electron-packager)) –  changes made by Electron maintainers (like Slack) benefit Forge's users, too.

You can find more information and documentation on [electronforge.io](https://electronforge.io/).

## electron-builder

A "complete solution to package and build a ready-for-distribution Electron app" that focuses on an integrated experience. [`electron-builder`](https://github.com/electron-userland/electron-builder) adds one single dependency focused on simplicity and manages all further requirements internally.

`electron-builder` replaces features and modules used by the Electron maintainers (such as the auto-updater) with custom ones. They are generally tighter integrated but will have less in common with popular Electron apps like Atom, Visual Studio Code, or Slack.

You can find more information and documentation in [the repository](https://github.com/electron-userland/electron-builder).

## electron-react-boilerplate

If you don't want any tools but only a solid boilerplate to build from, CT Lin's [`electron-react-boilerplate`](https://github.com/chentsulin/electron-react-boilerplate) might be worth a look. It's quite popular in the community and uses `electron-builder` internally.

## Другие инструменты и Макеты

The ["Awesome Electron" list](https://github.com/sindresorhus/awesome-electron#boilerplates) contains more tools and boilerplates to choose from. If you find the length of the list intimidating, don't forget that adding tools as you go along is a valid approach, too.