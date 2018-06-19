# 공식 가이드

자신의 Electron 버전과 일치하는 문서를 사용했는지 확인하세요. 버전 번호는 페이지 URL 의 일부여야 합니다. 그렇지 않은 경우, Electron 버전과 호환되지 않는 API 변경 사항이 포함될 수 있는 개발 브랜치의 문서를 사용하고 있을 수 있습니다. 문서의 이전 버전을 보려면, GitHub 에서 "Switch branches/tags" 드롭다운을 열고 버전과 일치하는 태그를 선택하여 [태그로 찾아](https://github.com/electron/electron/tree/v1.4.0) 볼 수 있습니다.

## 자주 묻는 질문

꽤 자주 묻는 질문이 있습니다. 이슈를 생성하기 전에 다음을 확인하세요:

* [Electron 자주 묻는 질문](faq.md)

## 가이드와 튜토리얼

* [개발 환경 설정하기](tutorial/development-environment.md) 
  * [macOS 설정](tutorial/development-environment.md#setting-up-macos)
  * [Windows 설정](tutorial/development-environment.md#setting-up-windows)
  * [Linux 설정](tutorial/development-environment.md#setting-up-linux)
  * [편집기 선정하기](tutorial/development-environment.md#a-good-editor)
* [첫 번째 앱 만들기](tutorial/first-app.md) 
  * [Electron 설치하기](tutorial/first-app.md#installing-electron)
  * [간단히 설명한 Electron 개발](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [앱 실행하기](tutorial/first-app.md#running-your-app)
* [상용구 코드와 CLI](tutorial/boilerplates-and-clis.md) 
  * [상용구 코드 vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [다른 도구와 상용구 코드](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [애플리케이션 구조](tutorial/application-architecture.md) 
  * [메인 프로세스와 렌더러 프로세스](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Electron API 사용하기](tutorial/application-architecture.md#using-electron-apis)
  * [Node.js API 사용하기](tutorial/application-architecture.md#using-nodejs-apis)
  * [기본 Node.js 모듈 사용하기](tutorial/using-native-node-modules.md)
* 여러분의 앱에 기능 추가하기 
  * [알림(Notifications)](tutorial/notifications.md)
  * [최근 문서들(Recent Documents)](tutorial/desktop-environment-integration.md#recent-documents)
  * [애플리케이션 진행 상황](tutorial/progress-bar.md)
  * [커스텀 Dock 메뉴](tutorial/macos-dock.md)
  * [커스텀 Windows 작업 표시줄](tutorial/windows-taskbar.md)
  * [커스텀 Linux 데스크톱 동작](tutorial/linux-desktop-actions.md)
  * [키보드 단축기](tutorial/keyboard-shortcuts.md)
  * [오프라인/온라인 감지](tutorial/online-offline-events.md)
  * [macOS BrowserWindows에 대한 파일 표현](tutorial/represented-file.md)
  * [기본 파일 드래그 & 드랍](tutorial/native-file-drag-drop.md)
* [접근성](tutorial/accessibility.md) 
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [접근성 활성화](tutorial/accessibility.md#enabling-accessibility)
* [Testing and Debugging](tutorial/application-debugging.md) 
  * [메인 프로세스 디버깅하기](tutorial/debugging-main-process.md)
  * [Selenium 과 WebDriver 사용하기](tutorial/using-selenium-and-webdriver.md)
  * [헤드리스 CI 시스템 (트래비스, 젠킨스) 테스트](tutorial/testing-on-headless-ci.md)
  * [DevTools 확장](tutorial/devtools-extension.md)
  * [Automated Testing with a Custom Driver](tutorial/automated-testing-with-a-custom-driver.md)
* Packaging 
  * [Code Signing](tutorial/code-signing.md)
* [Distribution](tutorial/application-distribution.md) 
  * [Support](tutorial/support.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows 스토어](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [보안](tutorial/security.md) 
  * [보안 문제 제보](tutorial/security.md#reporting-security-issues)
  * [Chromium 보안 문제와 업그레이드](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Electron 보안 경고](tutorial/security.md#electron-security-warnings)
  * [보안 점검표](tutorial/security.md#checklist-security-recommendations)
* [Updates](tutorial/updates.md) 
  * [서버에 업데이트 배포](tutorial/updates.md#deploying-an-update-server)
  * [앱에 업데이트 구현하기](tutorial/updates.md#implementing-updates-in-your-app)
  * [업데이트 적용](tutorial/updates.md#applying-updates)

## 자세한 튜토리얼

이 가이드는 위에서 설명된 주제의 확장입니다.

* [자세히 설명된 Electron 설치](tutorial/installation.md) 
  * [프록시](tutorial/installation.md#proxies)
  * [커스텀 미러와 캐시](tutorial/installation.md#custom-mirrors-and-caches)
  * [문제 해결](tutorial/installation.md#troubleshooting)
* [자세히 설명된 Electron의 버전 매김 스키마](tutorial/electron-versioning.md) 
  * [semver](tutorial/electron-versioning.md#semver)
  * [안정화 브랜치](tutorial/electron-versioning.md#stabilization-branches)
  * [베타 출시와 버그 수정](tutorial/electron-versioning.md#beta-releases-and-bug-fixes)
* [자세히 설명된 asar로 앱 소스 코드 패키징](tutorial/application-packaging.md) 
  * [asar 아카이브 생성](tutorial/application-packaging.md#generating-asar-archives)
  * [asar 아카이브 사용하기](tutorial/application-packaging.md#using-asar-archives)
  * [제한 사항](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [asar 아카이브에 압축 해제된 파일 추가하기](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [자세히 설명된 Pepper Flash 플러그인 사용하기](tutorial/using-pepper-flash-plugin.md)
* [자세히 설명된 Widevine CDM 플러그인 사용하기](tutorial/using-widevine-cdm-plugin.md)
* [오프 스크린 렌더링](tutorial/offscreen-rendering.md)

* * *

* [용어집](glossary.md)

## API 참조 문서

* [개요](api/synopsis.md)
* [프로세스 개체](api/process.md)
* [크롬 명령 줄 스위치 지원](api/chrome-command-line-switches.md)
* [환경 변수](api/environment-variables.md)
* [Breaking API Changes](api/breaking-changes.md)

### 사용자 지정 DOM 요소:

* [`File` 객체](api/file-object.md)
* [`<webview>` 태그](api/webview-tag.md)
* [`window.open` 함수](api/window-open.md)

### 주요 프로세스 모듈:

* [app](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [BrowserView](api/browser-view.md)
* [BrowserWindow](api/browser-window.md)
* [contentTracing](api/content-tracing.md)
* [dialog](api/dialog.md)
* [globalShortcut](api/global-shortcut.md)
* [inAppPurchase](api/in-app-purchase.md)
* [ipcMain](api/ipc-main.md)
* [Menu](api/menu.md)
* [MenuItem](api/menu-item.md)
* [net](api/net.md)
* [netLog](api/netLog.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)

### 렌더러 프로세스 (웹 페이지) 에 대한 모듈:

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### 두 프로세스에 대한 모듈:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [screen](api/screen.md)
* [shell](api/shell.md)

## 개발

[Electron 개발하기](development/README.md) 문서를 확인하세요.