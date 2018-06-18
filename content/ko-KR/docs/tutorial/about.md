# Electron 에 대하여

[Electron](https://electronjs.org)은 HTML, CSS, 자바스크립트를 사용해 크로스 플랫폼 데스크탑 애플리케이션을 만들기 위해 GitHub에서 개발한 오픈 소스 라이브러리입니다. Electron은 크로스 플랫폼을 지원하기 위해 [Chromium](https://www.chromium.org/Home)과 [Node.js](https://nodejs.org)를 1개의 런타임으로 통합했고, Electron을 이용해 작성한 앱은 Mac, Windows, 리눅스용으로 패키지할 수 있습니다.

2013년, GitHub에서는 커스터마이징 가능한 텍스트 편집기인 [Atom](https://atom.io)을 만들기 위해 Electron 프레임워크를 개발했습니다. Atom과 Electron은 2014년 봄에 오픈소스로 공개되었습니다.

이후 Electron은 오픈 소스 개발자, 스타트업, 기존 회사들이 사용하는 인기있는 도구가 되었습니다. [누가 Electron을 사용하고 있는지 확인해보세요](https://electronjs.org/apps).

Electron 프로젝트 공헌자, 출시(release) 정보 또는 Electron을 이용한 개발 시작하기에 관한 정보는 [빠르게 시작하기](quick-start.md) 문서를 참고하시길 바랍니다.

## 코어 팀과 공헌자

Electron 프로젝트는 GitHub 팀과 커뮤니티에서 [열심히 활동하는 공헌자들](https://github.com/electron/electron/graphs/contributors)이 함께 관리하고 있습니다. 개인들이 공헌한 부분도 있고 Electron으로 개발을 하는 큰 회사들이 공헌한 작업도 있습니다. 프로젝트에 자주 공헌하는 분들에게는 프로젝트 관리자 역할을 부여해드립니다. 좀 더 자세한 정보는 [Electron에 기여하기](https://github.com/electron/electron/blob/master/CONTRIBUTING.md)를 참고하세요.

## 출시

[Electron](https://github.com/electron/electron/releases)은 자주 출시됩니다. 중요한 버그 수정, 신규 API 추가 또는 Chromium 및 Node.js 버전 업데이트 등이 발생할 때마다 새로운 Electron 버전을 출시합니다.

### 업데이트 의존성

일반적으로 새로운 Chromium 안정 버전이 출시된 후 1~2주 안에 Electron의 Chromium 버전을 업데이트하며, 업그레이드에 필요한 작업의 양에 따라 업데이트 시기는 달라집니다.

새로운 버전의 Node.js이 출시되면, Electron은 좀 더 안정된 Node.js 버전이 나올 때까지 한 달 정도 기다렸다가 업그레이드를 진행합니다.

Electron에서는 Node.js와 Chromium이 1 개의 V8 엔진 인스턴스를 공유하며 인스턴스의 버전은 보통 Chromium이 사용하고 있는 버전과 일치합니다. 대부분의 경우에는 *문제없이 동작하지만* Node.js 패치가 필요할 때도 있습니다.

### 버전 관리

Electron 2.0 버전부터 [`semver`](https://semver.org) 규칙에 따라 버전을 관리하고 있습니다. 최신 버전의 npm을 사용해 `$ npm install electron` 명령을 실행하기만 하면 Electron 버전은 쉽게 관리할 수 있을 것입니다.

자세한 버전 업데이트 과정은 [버전 관리 문서](electron-versioning.md)에서 확인할 수 있습니다.

### LTS

오래된 Electron 버전에 대한 장기간 지원(long term support)은 현재 시행하고 있지 않습니다. 현재 사용 중인 Electron 버전이 잘 동작한다면, 원하는 만큼 해당 버전을 사용하셔도 됩니다. 새로운 Electron 버전에 포함된 신규 기능들을 사용하고 싶다면 새로운 버전으로 업그레이드 해야 합니다.

주요 업데이트는 버전 `v1.0.0`에 반영되어 있습니다. 아직 이 버전을 사용하고 있지 않다면, `v1.0.0`[ 변경 사항을 읽어보시길 권장합니다](https://electronjs.org/blog/electron-1-0).

## 핵심 철학

Electron을 작고(파일 크기) 지속 가능한 상태로(의존성 및 API의 확장) 유지하기 위해 Electron 프로젝트는 핵심 프로젝트의 범위를 제한합니다.

예를 들어, Electron 은 Chromium 전체가 아닌 렌더링 라이브러리만 사용합니다. 이런 특성 때문에 Chromium을 쉽게 업그레이드할 수 있습니다. 단, Electron에는 구글 크롬에서 볼 수 있는 브라우저와 관련된 몇몇 기능들이 존재하지 않습니다.

Electron에 추가되는 새로운 기능은 기본적으로 네이티브 API여야 합니다. 새로운 기능이 자체적으로 Node.js 모듈이 될 수 있으면, 네이티브 API가 될 수 있습니다. [커뮤니티에서 만든 Electron 도구를 ](https://electronjs.org/community)확인해보세요.

## 역사

Electron 역사에서 중요한 사건들(milestones)은 다음과 같습니다.

| 📆            | 🎉                                                                                       |
| ------------ | --------------------------------------------------------------------------------------- |
| **2013년 4월** | Atom Shell 탄생.                                                                          |
| **2014년 5월** | [Atom Shell을 오픈 소스로 공개함](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html). |
| **2015년 4월** | [Atom Shell은 Electron으로 이름이 변경됨](https://github.com/electron/electron/pull/1389).       |
| **2016년 5월** | [Electron `v1.0.0` 출시](https://electronjs.org/blog/electron-1-0).                       |
| **2016년 5월** | [Mac App Store에서 Electron 앱 호환됨](mac-app-store-submission-guide.md).                    |
| **2016년 8월** | [Windows Store에서 Electron 앱 지원 시작](windows-store-guide.md).                             |