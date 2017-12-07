# Electron 에 대하여

[Electron](https://electronjs.org) is an open source library developed by GitHub for building cross-platform desktop applications with HTML, CSS, and JavaScript. Electron 은 Chromium 와 Node. js 를 단일 실행으로 합치고 앱을 Mac, Windows 와 Linux 용으로 패키지화 할 수 있게 함으로써 이것을 가능하게 합니다.

Electron 은 2013년에 Github 의 해킹 가능한 텍스트 편집기 Atom 의 프레임워크로 시작하였습니다. 이 둘은 2014년에 오픈소스화 됩니다.

It has since become a popular tool used by open source developers, startups, and established companies. [See who is building on Electron](https://electronjs.org/apps).

Electron 의 기여자와 릴리즈에 대한 자세한 내용이나 개발을 시작하려면 Quick Start Guide 를 읽어보세요.

## 코어 팀과 기여자 

Electron 은 Gihub 의 팀과 커뮤니티에서 활동중인 기여자 그룹에 의해 유지됩니다 일부 기여자는 개인이고, 일부는 Electron 으로 개발을 하는 큰 회사입니다. 프로젝트에 자주 공여하는 분은 기꺼이 메인테이너로 추가하겠습니다. Electron 에 기여하기를 참고하세요.

## 출시

[Electron](https://github.com/electron/electron/releases)은 빈번하게 출시됩니다. 저희는 중요한 버그 수정이나, 새 API 추가 또는 Chromium이나 Node.js 의 버전 업데이트 시에 출시합니다.

### 업데이트 의존성

Electron 의 Chromium 버전은 보통 새 버전 출시 이후 1~2 주 후에 업데이트 하는데, 이는 업그레이드에 필요한 작업의 양에 따라 달라집니다.

Node. js 의 새버전이 출시되면, Electron 은 더 안정된 버전을 가져오기 위해 약 한달정도 기다립니다.

Electron 에서, Node. js 와 Chromium 은 단일 V8 인스턴스를 공유합니다--보통 Chromium 이 사용하는 버전. 대부분은 동작하지만 가끔 Node. js 를 패치해야 합니다.

### 버전 관리

As of version 2.0 Electron [follows `semver`](http://semver.org). For most applications, and using any recent version of npm, running `$ npm install electron` will do the right thing.

The version update process is detailed explicitly in our [Versioning Doc](electron-versioning.md).

### LTS

Long term support of older versions of Electron does not currently exist. If your current version of Electron works for you, you can stay on it for as long as you'd like. If you want to make use of new features as they come in you should upgrade to a newer version.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electronjs.org/blog/electron-1-0).

## 핵심 이념

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses just the rendering library from Chromium rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electronjs.org/community).

## 역사

Below are milestones in Electron's history.

| 📆            | 🎉                                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------- |
| **2013년 4월** | Atom Shell 탄생.                                                                                                      |
| **2014년 5월** | Atom Shell 오픈소스화.                                                                                                   |
| **2015년 4월** | Electron 으로 개명.                                                                                                     |
| **2016년 5월** | [Electron releases `v1.0.0`](https://electronjs.org/blog/electron-1-0).                                             |
| **2016년 5월** | [Electron apps compatible with Mac App Store](https://electronjs.org/docs/tutorial/mac-app-store-submission-guide). |
| **2016년 8월** | [Windows Store support for Electron apps](https://electronjs.org/docs/tutorial/windows-store-guide).                |