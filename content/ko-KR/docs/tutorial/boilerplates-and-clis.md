# 상용구 코드와 CLI

Electron 개발은 유연합니다 - Electron 응용 프로그램을 개발, 빌드, 패키지화 또는 릴리스 하는 유일한 방법을 고집하지 않습니다. 빌드 및 런타임 모두에 대한 Electron의 추가 기능은 일반적으로 개별 패키지의 [ npm ](https://www.npmjs.com/search?q=electron)에서 찾을 수 있고, 개발자가 앱을 빌드하고 필요한 파이프 라인을 빌드 할 수 있습니다.

이 확장성과 모듈화 수준은 Electron으로 작업하는 크고 작은 팀의 모든 개발자가 개발 라이프 사이클 중 언제든지 수행 할 수있는 것과 수행 할 수없는 것에 제한을받지 않음을 보장한다. 그러나 많은 개발자들에게 community-driven 한 상용구 또는 명령 줄 도구 중 하나를 사용하면 응용 프로그램을 컴파일, 패키지화 및 릴리스하는 것이 훨씬 쉬워 질 수 있습니다.

## 상용구 코드 vs CLI

상용구는 응용 프로그램을 만드는데 시작 지점입니다 - 말하자면 캔버스입니다. 그것은 일반적으로 당신의 생각하는 내용을 복제하고 커스터마이징 할 수있는 저장소 형태로 제공됩니다.

반면에 명령 줄 도구는 개발 및 릴리스 과정에서 계속 지원합니다. 그들은 더 많은 도움과 지지가되지만 코드를 구조화하고 빌드하는 방법에 대한 지침을 강요합니다. * 특히 초보자에게는 명령 줄 도구를 사용하는 것이 도움이 될 수 있습니다 *.

## electron-forge

"모던 Electron 응용 프로그램을 구축하기위한 완벽한 도구". Electron Forge는 Electron 개발을 위한 기존의 (잘 관리 된) 빌드 툴을 일관된 패키지로 통합하여 누구나 바로 Electron 개발에 뛰어들 수 있습니다.

Forge에는 React, Vue 또는 Angular와 같은 보편적 인 프레임 워크 용 [ready-to-use templates](https://electronforge.io/templates)이 있습니다. ([`electron-packager`](https://github.com/electron-userland/electron-packager)와 같은) 더 큰 Electron 커뮤니티에서 사용되는 것과 동일한 핵심 모듈을 사용합니다. - (Slack과 같은) Electron maintainers가 변경 한 사항은 Forge의 사용자에게도 도움이됩니다.

[Electronforge.io](https://electronforge.io/)에 더 많은 정보 및 문서를 찾을 수 있습니다.

## electron-builder

"일렉트론 배포 전자 제품 패키지 및 빌드를위한 완벽한 솔루션"은 통합 된 경험에 포커싱하고 있습니다. [`electron-builder`](https://github.com/electron-userland/electron-builder)는 단순성에 중점을 둔 하나의 의존성을 추가하고 내부적으로 모든 추가 요구 사항을 관리합니다.

`electron-builder`는 Electron maintainers에서 사용하는 기능 및 모듈 (자동 업데이트 프로그램같은) 을 맞춤 프로그램으로 대체합니다. They are generally tighter integrated but will have less in common with popular Electron apps like Atom, Visual Studio Code, or Slack.

You can find more information and documentation in [the repository](https://github.com/electron-userland/electron-builder).

## electron-react-boilerplate

If you don't want any tools but only a solid boilerplate to build from, CT Lin's [`electron-react-boilerplate`](https://github.com/chentsulin/electron-react-boilerplate) might be worth a look. It's quite popular in the community and uses `electron-builder` internally.

## 다른 도구와 상용구 코드

The ["Awesome Electron" list](https://github.com/sindresorhus/awesome-electron#boilerplates) contains more tools and boilerplates to choose from. If you find the length of the list intimidating, don't forget that adding tools as you go along is a valid approach, too.