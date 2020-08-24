# Boilerplates와 CLI

Electron 개발은 유연합니다 - Electron 응용 프로그램을 개발, 빌드, 패키징 또는 배포하는 "유일한 방법"이 존재하지 않습니다. 빌드 및 런타임 모두에 대한 Electron의 추가 기능은 일반적으로 개별 패키지의 [ npm ](https://www.npmjs.com/search?q=electron)에서 찾을 수 있고, 개발자가 앱을 빌드하고 필요한 파이프 라인을 빌드 할 수 있습니다.

이런 확장성과 모듈화 수준은 Electron으로 작업 하는 모든 개발자들이, 속한 팀이 크든 작든, 개발 라이프 사이클 중 언제든지 수행 할 수 있는 것과 수행 할 수 없는 것에 제한을 받지 않게 합니다. 그러나 대부분의 개발자들은 community-driven 한 상용구 또는 명령 줄 도구 중 하나를 사용함으로써 응용 프로그램을 컴파일, 패키지화 및 릴리스하는 일을 쉽게 할 수 있습니다.

## Boilerplate vs CLI

상용구는 응용 프로그램을 만드는데 시작 지점입니다 - 말하자면 캔버스입니다. 상용구는 당신이 복제한 다음 마음대로 수정할 수 있는 저장소의 형태로 제공되는 것이 일반적입니다.

반면에 명령 줄 도구를 사용하면 개발 및 릴리스 과정에서 계속해서 도움을 받을 수 있습니다. 커맨드 라인 도구는 많은 도움을 주지만 코드를 구조화하고 빌드하는 특정한 방식을 강제합니다. * 특히 초보자에게는 명령 줄 도구를 사용하는 것이 도움이 될 수 있습니다 *.

## electron-forge

"모던 Electron 응용 프로그램을 구축하기위한 완벽한 도구". Electron Forge는 Electron 개발을 위한 기존의 (잘 관리 된) 빌드 툴을 일관된 패키지로 통합하여 누구나 바로 Electron 개발에 뛰어들 수 있습니다.

Forge는 Webpack을 번들러로 사용하는 [즉시 사용 가능한 템플릿](https://electronforge.io/templates)과 함께 제공됩니다. Typescript 설정 예가 포함되어 있는데 사용자가 변경하기 쉽게 2개의 설정 파일을 제공합니다. It includes an example typescript configuration and provides two configuration files to enable easy customization. ([`electron-packager`](https://github.com/electron/electron-packager)와 같은) 더 큰 Electron 커뮤니티에서 사용되는 것과 동일한 핵심 모듈을 사용합니다. - (Slack과 같은) Electron maintainers가 변경 한 사항은 Forge의 사용자에게도 도움이됩니다.

[Electronforge.io](https://electronforge.io/)에 더 많은 정보 및 문서를 찾을 수 있습니다.

## electron-builder

"일렉트론 패키지와 빌드를 위한 배포-준비-완료 솔루션"은 통합 개발 경험에 집중합니다. [`electron-builder`](https://github.com/electron-userland/electron-builder)는 단순성에 중점을 둔 하나의 의존성을 추가하고 내부적으로 모든 추가 요구 사항을 관리합니다.

`electron-builder`는 Electron maintainers에서 사용하는 기능 및 모듈 (자동 업데이트 프로그램같은) 을 맞춤 프로그램으로 대체합니다. 빌더 내의 모듈은 보통 더 밀접하게 통합되어 있지만 Atom, Visual Studio Code 또는 Slack과 같은 인기있는 Electron 응용 프로그램과 공통점이 적습니다.

[the repository](https://github.com/electron-userland/electron-builder)에서 더 많은 정보 및 문서를 찾을 수 있습니다.

## electron-react-boilerplate

도구는 필요 없지만 견고한 보일러플레이트만을 원한다면, CT Lin의 [`electron-react-boilerplate`](https://github.com/chentsulin/electron-react-boilerplate)를 살펴보시면 됩니다. 커뮤니티에서 꽤 인기가 있고 내부적으로 `electron-builder`를 사용합니다.

## 기타 도구와 Boilerplates

["Awesome Electron" 목록](https://github.com/sindresorhus/awesome-electron#boilerplates)에서 더 많은 도구와 boilerplates를 확인할 수 있습니다. 어려움이 많아지면 도구를 추가하는 것도 유효한 접근 방법이라는 것을 잊지 마십시오.
