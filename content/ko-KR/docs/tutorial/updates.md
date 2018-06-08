# 애플리케이션 업데이트

Electron 애플리케이션을 업데이트 하는 방법은 여러 가지가 있습니다. 가장 쉽고 공식적인 방법은 [Squirrel](https://github.com/Squirrel) 프레임워크와 Electron의 [autoUpdater](../api/auto-updater.md) 모듈을 사용하는 것입니다.

## Using `update.electronjs.org`

GitHub의 Electron 팀은 Electron apps가 자체 업데이트에 사용할 수있는 무료 오픈 소스 웹 서비스 인 [update.electronjs.org](https://github.com/electron/update.electronjs.org)를 관리합니다. 이 서비스는 다음 기준을 충족하는 Electron App 용으로 설계되었습니다.

- MacOS 또는 Windows에서 실행되는 앱
- App 이 public GitHub 저장소를 가지고 있음
- 빌드가 GitHub 릴리즈에 게시됨.
- 빌드는 코드사인 되어 있음.

이 서비스를 사용하는 가장 쉬운 방법은 update.electronjs.org와 함께 사용하도록 사전 구성된 Node.js 모듈 인 [update-electron-app](https://github.com/electron/update-electron-app)을 설치하는 것입니다.

모듈 설치:

```sh
npm install update-electron-app
```

앱의 메인 프로세스 파일에서 업데이트 프로그램을 호출하십시오:

```js
require('update-electron-app')()
```

기본적으로이 모듈은 앱 시작시와 10분마다 업데이트를 확인합니다. 업데이트가 발견되면 자동으로 백그라운드에서 다운로드됩니다. 다운로드가 완료되면 대화 상자가 표시되어 사용자가 앱을 다시 시작할 수 있습니다.

커스트마이징이 필요한 경우[`update-electron-app`에 옵션을 전달](https://github.com/electron/update-electron-app)하거나 [업데이트 서비스를 직접 사용 ](https://github.com/electron/update.electronjs.org) 할 수 있습니다.

## Using `electron-builder`

앱이 [`electron-builder`](https://github.com/electron-userland/electron-builder) 와 함께 패키지되어있는 경우, 서버가 필요없고, S3, GitHub 또는 기타 정적 파일 호스트로 업데이트 할 수있는 [electron-updater](https://www.electron.build/auto-update) 모듈을 사용할 수 있습니다 이것은 일렉트론의 빌트인 업데이트 메커니즘을 피해 동작하며, 이 문서의 나머지 부분은 `electron-builder`의 업데이터에는 적용되지 않는다.

## 서버에 업데이트 배포

비공개 Electron 어플리케이션을 개발 중이거나 GitHub 릴리즈에 릴리즈를 게시하지 않는 경우 자체 업데이트 서버를 운영하는것이 필요합니다.

필요에 따라 다음 중 하나를 선택할 수 있습니다:

- [Hazel](https://github.com/zeit/hazel) - [지금 ](https://zeit.co/now) 무료로 배포 할 수있는 비공개 또는 오픈 소스 앱을 위한 서버를 업데이트하십시오. 그것은 [GitHub Releases](https://help.github.com/articles/creating-releases/)에서 가져오고 GitHub의 CDN 의 힘을 이용합니다.
- [Nuts](https://github.com/GitbookIO/nuts) – Also uses [GitHub Releases](https://help.github.com/articles/creating-releases/), but caches app updates on disk and supports private repositories.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – Provides a dashboard for handling releases and does not require releases to originate on GitHub.
- [Nucleus](https://github.com/atlassian/nucleus) – A complete update server for Electron apps maintained by Atlassian. Supports multiple applications and channels; uses a static file store to minify server cost.

## 앱에 업데이트 구현하기

Once you've deployed your update server, continue with importing the required modules in your code. The following code might vary for different server software, but it works like described when using [Hazel](https://github.com/zeit/hazel).

**Important:** Please ensure that the code below will only be executed in your packaged app, and not in development. You can use [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) to check for the environment.

```javascript
onst { app, autoUpdater, dialog } = require('electron')
```

Next, construct the URL of the update server and tell [autoUpdater](../api/auto-updater.md) about it:

```javascript
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

As the final step, check for updates. The example below will check every minute:

```javascript
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

Once your application is [packaged](../tutorial/application-distribution.md), it will receive an update for each new [GitHub Release](https://help.github.com/articles/creating-releases/) that you publish.

## 업데이트 적용

Now that you've configured the basic update mechanism for your application, you need to ensure that the user will get notified when there's an update. autoUpdater API [이벤트](../api/auto-updater.md#events)를 사용하여 이룰수 있습니다.

```javascript
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: '새로운 버전이 다운로드 되었습니다. 애플리케이션을 재시작하여 업데이트를 적용해 주세요.'
  }

  dialog.showMessageBox(dialogOpts, (response) => {
    if (response === 0) autoUpdater.quitAndInstall()
  })
})
```

에러도 [처리가 되어야](../api/auto-updater.md#event-error) 합니다. 다음은 `stderr` 로깅을 하는 예제입니다.

```javascript
autoUpdater.on('error', message => {
  console.error('애플리케이션을 업데이트하는 도중 오류가 발생하였습니다.')
  console.error(message)
})
```