# Electron 에 대하여

[Electron](https://electronjs.org)은 HTML, CSS, 자바스크립트를 사용해 크로스 플랫폼 데스크탑 애플리케이션을 만들기 위해 GitHub에서 개발한 오픈 소스 라이브러리입니다. Electron은 크로스 플랫폼을 지원하기 위해 [Chromium](https://www.chromium.org/Home)과 [Node.js](https://nodejs.org)를 1개의 런타임으로 통합했고, Electron을 이용해 작성한 앱은 맥, Windows, 리눅스용으로 패키지할 수 있습니다.

2013년, GitHub에서는 커스터마이징 가능한 텍스트 편집기인 [Atom](https://atom.io)을 만들기 위해 Electron 프레임워크를 개발했습니다. Atom과 Electron은 2014년 봄에 오픈소스로 공개되었습니다.

이후 Electron은 오픈 소스 개발자, 스타트업, 기존 회사들이 사용하는 인기있는 도구가 되었습니다. [누가 Electron을 사용하고 있는지 확인해보세요](https://electronjs.org/apps).

Electron 프로젝트 공헌자, 출시(release) 정보 또는 Electron을 이용한 개발 시작하기에 관한 정보는 [빠른 시작 가이드](quick-start.md) 문서를 참고하시길 바랍니다.

## 코어 팀과 공헌자

Electron 프로젝트는 GitHub 팀과 커뮤니티에서 [열심히 활동하는 공헌자들](https://github.com/electron/electron/graphs/contributors)이 함께 관리하고 있습니다. 개인들이 공헌한 부분도 있고 Electron으로 개발을 하는 큰 회사들이 공헌한 작업도 있습니다. 프로젝트에 자주 공헌하는 분들에게는 프로젝트 관리자 역할을 부여해드립니다. 좀 더 자세한 정보는 [Electron에 기여하기](https://github.com/electron/electron/blob/master/CONTRIBUTING.md)를 참고하세요.

## 출시

[Electron](https://github.com/electron/electron/releases)은 자주 출시됩니다. 중요한 버그 수정, 신규 API 추가 또는 Chromium 및 Node.js 버전 업데이트 등이 발생할 때마다 새로운 Electron 버전을 출시합니다.

### 업데이트 의존성

일반적으로 새로운 Chromium 안정 버전이 출시된 후 1~2주 안에 Electron의 Chromium 버전을 업데이트하며, 업그레이드에 필요한 작업의 양에 따라 업데이트 시기는 달라집니다.

새로운 Node.js 버전이 릴리즈되면, Electron은 좀 더 안정된 Node.js 버전이 나올 때까지 한달정도 기다렸다가 업그레이드를 진행합니다.

Electron에서는 Node.js와 Chromium이 1 개의 V8 엔진 인스턴스를 공유하며 인스턴스의 버전은 보통 Chromium이 사용하고 있는 버전과 일치합니다. 대부분의 경우에는 *문제없이 동작하지만* Node.js 패치가 필요할 때도 있습니다.

### 버전 관리

Electron 2.0 버전부터 [`semver`](https://semver.org) 규칙에 따라 버전을 관리하고 있습니다. For most applications, and using any recent version of npm, running `$ npm install electron` will do the right thing.

The version update process is detailed explicitly in our [Versioning Doc](electron-versioning.md).

### LTS

현재 Electron 의 구버전에 대한 장기 지원은 없습니다. 만약 여러분의 현재 Electron 버전이 잘 동작한다면, 그것을 원하는만큼 유지하셔도 됩니다. 만약 새로운 기능들을 사용하여 만들고 싶으시다면 새로운 버전으로 업그레이드 해야합니다.

메이저 업데이트는 버전 `v1.0.0` 으로 찾아옵니다. 아직 이 버전을 사용중이지 않으시다면, `v1.0.0`의 [변경점](https://electronjs.org/blog/electron-1-0)에 대해 읽어보세요.

## 핵심 이념

Electron 을 작고 (파일 크기) 지속가능하게 (의존성 및 Api 의 확산) 할 목적으로 중심 프로젝트의 범위를 제한합니다.

예를 들어, Electron 은 Chromium 전체가 아닌 렌더링 라이브러리만 사용합니다. 이것은 Chromium 업그레이드를 쉽게 하지만 Google Chrome 에서 볼 수 있는 몇몇 브라우저 기능이 Electron 에서는 지원하지 않습니다.

Electron에 추가된 새로운 기능은 주로 네이티브 API입니다. 기능은 가능한한 Node. js 모듈로 해야합니다. See the [Electron tools built by the community](https://electronjs.org/community).

## 역사

다음은 Electron 역사의 요점입니다.

| 📆            | 🎉                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------- |
| **2013년 4월** | Atom Shell 탄생.                                                                              |
| **2014년 5월** | [Atom Shell is open sourced](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html). |
| **2015년 4월** | Electron 으로 개명.                                                                             |
| **2016년 5월** | [Electron releases `v1.0.0`](https://electronjs.org/blog/electron-1-0).                     |
| **2016년 5월** | [Electron apps compatible with Mac App Store](mac-app-store-submission-guide.md).           |
| **2016년 8월** | [Windows Store support for Electron apps](windows-store-guide.md).                          |