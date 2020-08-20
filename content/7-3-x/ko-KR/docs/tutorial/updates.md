# 애플리케이션 업데이트

Electron 애플리케이션을 업데이트 하는 방법은 여러 가지가 있습니다. 가장 쉽고 공식적인 방법은 [Squirrel](https://github.com/Squirrel) 프레임워크와 Electron의 [autoUpdater](../api/auto-updater.md) 모듈을 사용하는 것입니다.

## `update.electronjs.org` 사용

GitHub의 Electron 팀은 Electron apps가 자체 업데이트에 사용할 수있는 무료 오픈 소스 웹 서비스 인 [update.electronjs.org][]를 관리합니다. 이 서비스는 다음 기준을 충족하는 Electron 앱을 위해 설계되었습니다:

- MacOS 또는 Windows에서 실행되는 앱
- App 이 public GitHub 저장소를 가지고 있음
- 빌드가 GitHub  릴리즈에 게시됨.
- 빌드는 코드사인 되어 있음.

이 서비스를 사용하는 가장 쉬운 방법은 update.electronjs.org와 함께 사용하도록 사전 구성된 Node.js 모듈 인 [update-electron-app][]을 설치하는 것입니다.

모듈 설치:

```sh
npm install update-electron-app
```

앱의 메인 프로세스 파일에서 업데이트 프로그램을 호출하십시오:

```js
require('update-electron-app')()
```

기본적으로 이 모듈은 앱 시작시 그리고 10분마다 업데이트를 확인합니다. 업데이트가 발견되면 자동으로 백그라운드에서 다운로드됩니다. 다운로드가 완료되면 앱 재시작 허용을 물어보는 다이어로그를 사용자에게 표시합니다.

구성을 사용자 정의해야 하는 경우 [옵션을 `update-electron-app`][update-electron-app]으로 전달하거나 [업데이트 서비스를 직접 사용][update.electronjs.org]할 수 있습니다.

## `electron-builder` 사용

앱이 [`electron-builder`][electron-builder-lib] 와 함께 패키지되어있는 경우, 서버가 필요없고, S3, GitHub 또는 기타 정적 파일 호스트로 업데이트 할 수있는 [electron-updater][] 모듈을 사용할 수 있습니다  이것은 일렉트론의 빌트인 업데이트 메커니즘을 피해 동작하며, 이 문서의 나머지 부분은 `electron-builder`의 업데이터에는 적용되지 않는다.

## 서버에 업데이트 배포

비공개 Electron 응용 프로그램을 개발 중이거나 GitHub 릴리스에 릴리스를 게시하지 않는 경우 자체 업데이트 서버를 실행해야 할 수도 있습니다.

필요에 따라 다음 중 하나를 선택할 수 있습니다:

- [Hazel][hazel] - [지금 ][now] 무료로 배포 할 수있는 비공개 또는 오픈 소스 앱을 위한 서버를 업데이트하십시오. 그것은 [GitHub Releases][gh-releases]에서 가져오고 GitHub의 CDN 의 힘을 이용합니다.
- [Nuts][nuts] - [ GitHub Releases][gh-releases]를 사용하지만 디스크에 앱 업데이트를 캐시하고 개인 저장소를 지원합니다.
- [electron-release-server][electron-release-server] - 릴리스 처리를 위한 대시 보드를 제공하며 GitHub에 릴리스가 필요하지 않습니다.
- [Nucleus][nucleus] - Atlassian에서 관리하는 Electron 응용 프로그램을 위한 완벽한 업데이트 서버입니다. 여러 응용 프로그램 및 채널을 지원합니다. 정적 파일 저장소를 사용하여 서버 비용을 줄입니다.

## 앱에 업데이트 구현하기

업데이트 서버를 배포했으면 코드에 필요한 모듈을 가져옵니다. 다음 코드는 서버 소프트웨어마다 다를 수 있지만 [Hazel](https://github.com/zeit/hazel)을 사용할 때처럼 작동합니다.

**중요 : ** 아래 코드는 패키지 된 앱에서만 실행해야합니다. (개발중이 아니라) [electron-is-dev](https://github.com/sindresorhus/electron-is-dev)를 사용하여 환경을 확인할 수 있습니다.

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

다음으로 업데이트 서버의 URL을 구성하고 [autoUpdater](../api/auto-updater.md)에 알려주십시오.

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

응용 프로그램이 [패키지 되면](../tutorial/application-distribution.md) 게시하는 새로운 [GitHub Release](https://help.github.com/articles/creating-releases/) 마다 업데이트를 받게됩니다.

## 업데이트 적용

이제 응용 프로그램의 기본 업데이트 메커니즘을 구성 했으므로 업데이트가있을 때 사용자에게 알림이 전송되도록해야합니다. autoUpdater API [이벤트](../api/auto-updater.md#events)를 사용하여 이룰수 있습니다.

```javascript
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: '새로운 버전이 다운로드 되었습니다. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts, (response) => {
    if (response === 0) autoUpdater.quitAndInstall()
  })
})
```

Also make sure that errors are [being handled](../api/auto-updater.md#event-error). Here's an example for logging them to `stderr`:

```javascript
autoUpdater.on('error', message => {
  console.error('애플리케이션을 업데이트하는 도중 오류가 발생하였습니다.')
  console.error(message)
})
```

[electron-builder-lib]: https://github.com/electron-userland/electron-builder
[electron-updater]: https://www.electron.build/auto-update
[now]: https://zeit.co/now
[hazel]: https://github.com/zeit/hazel
[nuts]: https://github.com/GitbookIO/nuts
[gh-releases]: https://help.github.com/articles/creating-releases/
[gh-releases]: https://help.github.com/articles/creating-releases/
[electron-release-server]: https://github.com/ArekSredzki/electron-release-server
[nucleus]: https://github.com/atlassian/nucleus
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update-electron-app]: https://github.com/electron/update-electron-app
[update-electron-app]: https://github.com/electron/update-electron-app
