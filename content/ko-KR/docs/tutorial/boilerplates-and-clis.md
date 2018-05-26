# 상용구 코드와 CLI

Electron 개발은 유연합니다 - Electron 응용 프로그램을 개발, 빌드, 패키지화 또는 릴리스 하는 유일한 방법을 고집하지 않습니다. 빌드 및 런타임 모두에 대한 Electron의 추가 기능은 일반적으로 개별 패키지의 [ npm ](https://www.npmjs.com/search?q=electron)에서 찾을 수 있고, 개발자가 앱을 빌드하고 필요한 파이프 라인을 빌드 할 수 있습니다.

이 확장성과 모듈화 수준은 Electron으로 작업하는 크고 작은 팀의 모든 개발자가 개발 라이프 사이클 중 언제든지 수행 할 수있는 것과 수행 할 수없는 것에 제한을받지 않음을 보장한다. 그러나 많은 개발자들에게 community-driven 한 상용구 또는 명령 줄 도구 중 하나를 사용하면 응용 프로그램을 컴파일, 패키지화 및 릴리스하는 것이 훨씬 쉬워 질 수 있습니다.

## 상용구 코드 vs CLI

상용구는 응용 프로그램을 만드는데 시작 지점입니다 - 말하자면 캔버스입니다. They usually come in the form of a repository you can clone and customize to your heart's content.

A command line tool on the other hand continues to support you throughout the development and release. They are more helpful and supportive but enforce guidelines on how your code should be structured and built. *Especially for beginners, using a command line tool is likely to be helpful*.

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

## 다른 도구와 상용구 코드

The ["Awesome Electron" list](https://github.com/sindresorhus/awesome-electron#boilerplates) contains more tools and boilerplates to choose from. If you find the length of the list intimidating, don't forget that adding tools as you go along is a valid approach, too.