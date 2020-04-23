---
title: 오픈소스 앱의 더 간편한 AutoUpdating
author: zeke
date: '2018-05-01'
---

오늘 저희는 오픈 소스 Electron 앱의 간편한 자동 업데이트를 위해 무료이자 오픈 소스인 [업데이트 웹서비스](https://github.com/electron/update.electronjs.org)와 [npm 패키지](https://github.com/electron/update-electron-app)를 공개합니다. 이는 개발자가 배포에 들이는 시간을 줄이고, 앱 품질 향상을 위해 개발하는 시간을 더해드리기 위한 결정입니다.

---

<figure>
  <a href="https://github.com/electron/update-electron-app" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/39480716-e9990910-4d1d-11e8-8901-9549c6ff6050.png" alt="업데이터 스크린샷">
    <figcaption>새로운 updater 모듈의 모습</figcaption>
  </a>
</figure>

## 간편하게 살자

Electron에는 원격 endpoint에서 메타데이터를 가져와 업데이트를 확인하거나 백그라운드에서 다운로드하고, 자동으로 설치할 수 있도록 해주는 [autoUpdater](https://electronjs.org/docs/tutorial/updates) API 가 있습니다.

이를 사용하려면 웹 서버가 필요한데, 단지 앱 버전 메타데이터를 제공하기 위해 따로 웹 서버를 배포하고 유지 보수하는 일은 상당히 성가십니다. 이 때문에 여러 Electron 앱 개발자들에게 있어 자동 업데이트는 선뜻 구현하기 어려운 일이었습니다.

이를 해결하기 위해 자동 앱 업데이트를 위한 맞춤형 해결책을 공개합니다. 만약 Electron 앱이 공개 GitHub 리포지터리에 있고 GitHub Release 기능을 통해 빌드를 제공하고 계시다면 이 서비스를 활용하여 사용자에게 지속적인 앱 업데이트를 제공할 수 있습니다.

## 새 모듈 사용하기

여러분이 하실 구성을 최소화하기 위해 저희가 [update.electronjs.org](https://github.com/electron/update.electronjs.org) 웹 서비스와 통합되는 [update-electron-app](https://github.com/electron/update-electron-app)라는 npm 모듈을 만들었습니다.

모듈 설치:

```sh
npm install update-electron-app
```

앱의 [main process](https://electronjs.org/docs/glossary#main-process) 중 아무 곳에서 다음 모듈을 호출하세요.

```js
require('update-electron-app')()
```

간단하죠? 이 모듈은 앱 시작시와 그 후 10분마다 업데이트를 확인합니다. 업데이트를 발견하면 백그라운드에서 업데이트를 자동으로 다운로드하고, 준비가 끝나면 대화 상자를 표시합니다.

## 기존 앱 이전하기

기존에 Electron의 autoUpdater API를 사용하는 앱도 이 서비스를 사용할 수 있습니다. 사용하려면 [`update-electron-app` 모듈을 수정](https://github.com/electron/update-electron-app)하거나 [update.electronjs.org에 직접 연동](https://github.com/electron/update.electronjs.org)해서 사용할 수 있습니다.

## 대안

[electron-builder](https://github.com/electron-userland/electron-builder)를 사용하여 앱의 패키징을 하고 있다면 electron-builder의 내장 업데이터를 사용할 수 있습니다. 자세한 내용은 [electron.build/auto-update](https://www.electron.build/auto-update)를 참조하세요.

앱이 비공개라면 직접 업데이트 서버를 운영해야 합니다. 이를 위해 Zeit의 [Hazel](https://github.com/zeit/hazel)과 Atlassian의 [Nucleus](https://github.com/atlassian/nucleus) 같은 다양한 오픈 소스 도구들이 있습니다. 자세한 사항은 [서버에 업데이트 배포](https://electronjs.org/docs/tutorial/updates#deploying-an-update-server) 문서를 참조하세요.

## 마치며

이렇게 간단하고 확장 가능한 웹 서비스의 디자인과 설계를 해주신 [Julian Gruber](http://juliangruber.com/) 님에게 감사드립니다. 디자인 영감을 주신 오픈 소스 [Hazel](https://github.com/zeit/hazel) 프로젝트의 구성원인 [Zeit](https://zeit.co) 팀에게도 감사드립니다. 코드 리뷰를 도와주신 [Samuel Attard](https://www.samuelattard.com/) 님에게도 감사드립니다. 이 서비스의 테스트를 도와주신 Electron 커뮤니티에게도 감사 인사드립니다.

🌲 푸른 Electron 앱의 미래를 위해 노력하고 계신 여러분에게도 감사 인사를 전합니다!