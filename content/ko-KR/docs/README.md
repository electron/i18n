자신의 Electron 버전과 일치하는 문서를 사용했는지 확인하세요. 버전 번호는 페이지 URL 의 일부여야 합니다. 그렇지 않은 경우, Electron 버전과 호환되지 않는 API 변경 사항이 포함될 수 있는 개발 브랜치의 문서를 사용하고 있을 수 있습니다. 문서의 이전 버전을 보려면, GitHub 에서 "Switch branches/tags" 드롭다운을 열고 버전과 일치하는 태그를 선택하여 [태그로 찾아](https://github.com/electron/electron/tree/v1.4.0) 볼 수 있습니다.

## 자주 묻는 질문

꽤 자주 묻는 질문이 있습니다. 이슈를 생성하기 전에 다음을 확인하세요:

* [Electron 자주 묻는 질문](faq.md)

## 안내서

* [용어집](glossary.md)
* [지원되는 플랫폼](tutorial/supported-platforms.md)
* [보안](tutorial/security.md)
* [버전 관리](tutorial/electron-versioning.md)
* [애플리케이션 배포](tutorial/application-distribution.md)
* [맥 앱스토어 제출 안내서](tutorial/mac-app-store-submission-guide.md)
* [윈도우 스토어 안내서](tutorial/windows-store-guide.md)
* [Snapcraft Guide](tutorial/snapcraft-guide.md)
* [응용 프로그램 패키징](tutorial/application-packaging.md)
* [기본 노드 모듈을 사용하기](tutorial/using-native-node-modules.md)
* [주요 프로세스 디버깅](tutorial/debugging-main-process.md)
* [Selenium 과 WebDriver 사용하기](tutorial/using-selenium-and-webdriver.md)
* [DevTools 확장](tutorial/devtools-extension.md)
* [Pepper Flash 플러그인 사용하기](tutorial/using-pepper-flash-plugin.md)
* [Widevine CDM 플러그인 사용하기](tutorial/using-widevine-cdm-plugin.md)
* [헤드리스 CI 시스템 (트래비스, 젠킨스) 테스트](tutorial/testing-on-headless-ci.md)
* [오프 스크린 렌더링](tutorial/offscreen-rendering.md)
* [키보드 단축기](tutorial/keyboard-shortcuts.md)
* [애플리케이션 업데이트](tutorial/updates.md)

## 따라하기

* [시작하기](tutorial/quick-start.md)
* [데스크톱 환경 통합](tutorial/desktop-environment-integration.md)
* [온라인/오프라인 이벤트 감지](tutorial/online-offline-events.md)
* [REPL](tutorial/repl.md)
* [기본 알림](tutorial/notifications.md)

## API 참조 문서

* [개요](api/synopsis.md)
* [프로세스 개체](api/process.md)
* [크롬 명령 줄 스위치 지원](api/chrome-command-line-switches.md)
* [환경 변수](api/environment-variables.md)

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

* [코딩 스타일](development/coding-style.md)
* [C++ 코드에서 clang-format 사용하기](development/clang-format.md)
* [Testing](development/testing.md)
* [소스 코드 디렉토리 구조](development/source-code-directory-structure.md)
* [NW.js (node-webkit 이었던) 와 기술 차이](development/atom-shell-vs-node-webkit.md)
* [빌드 시스템 개요](development/build-system-overview.md)
* [빌드 명령 (macOS)](development/build-instructions-osx.md)
* [빌드 명령 (윈도)](development/build-instructions-windows.md)
* [빌드 명령 (Linux)](development/build-instructions-linux.md)
* [디버그 명령 (macOS)](development/debugging-instructions-macos.md)
* [디버그 명령 (Windows)](development/debug-instructions-windows.md)
* [디버거에서 기호 서버 설정 하기](development/setting-up-symbol-server.md)
* [문서 스타일 안내](styleguide.md)
* [Contributing to Electron](../CONTRIBUTING.md)
* [Issues](development/issues.md)
* [Pull Requests](development/pull-requests.md)
* [Upgrading Chromium](development/upgrading-chromium.md)
* [크롬 개발](development/chromium-development.md)
* [V8 개발](development/v8-development.md)