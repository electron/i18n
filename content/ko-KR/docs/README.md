자신의 Electron 버전과 일치하는 문서를 사용했는지 확인하세요. 버전 번호는 페이지
URL 의 일부여야 합니다. 그렇지 않은 경우, Electron 버전과 호환되지 않는 API 변경
사항이 포함될 수 있는 개발 브랜치의 문서를 사용하고 있을 수 있습니다. 문서의
이전 버전을 보려면, GitHub 에서 "Switch branches/tags" 드롭다운을 열고 버전과
일치하는 태그를 선책하여
[태그로 찾아](https://github.com/electron/electron/tree/v1.4.0) 볼 수 있습니다.

## 자주 묻는 질문

꽤 자주 묻는 질문이 있습니다. 이슈를 생성하기 전에 다음을 확인하세요:

* [Electron 자주 묻는 질문](faq.md)

## 안내

* [용어 사전](glossary.md)
* [Supported Platforms](tutorial/supported-platforms.md)
* [Security](tutorial/security.md)
* [Electron Versioning](tutorial/electron-versioning.md)
* [Application Distribution](tutorial/application-distribution.md)
* [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md)
* [Windows Store Guide](tutorial/windows-store-guide.md)
* [Application Packaging](tutorial/application-packaging.md)
* [Using Native Node Modules](tutorial/using-native-node-modules.md)
* [Debugging Main Process](tutorial/debugging-main-process.md)
* [Using Selenium and WebDriver](tutorial/using-selenium-and-webdriver.md)
* [DevTools Extension](tutorial/devtools-extension.md)
* [Using Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)
* [Using Widevine CDM Plugin](tutorial/using-widevine-cdm-plugin.md)
* [Testing on Headless CI Systems (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
* [Offscreen Rendering](tutorial/offscreen-rendering.md)
* [Keyboard Shortcuts](tutorial/keyboard-shortcuts.md)

## 사용 지침

* [Quick Start](tutorial/quick-start.md)
* [Desktop Environment Integration](tutorial/desktop-environment-integration.md)
* [Online/Offline Event Detection](tutorial/online-offline-events.md)
* [REPL](tutorial/repl.md)
* [Native Notifications](tutorial/notifications.md)

## API 참고

* [Synopsis](api/synopsis.md)
* [Process Object](api/process.md)
* [Supported Chrome Command Line Switches](api/chrome-command-line-switches.md)
* [Environment Variables](api/environment-variables.md)

### 사용자 정의 DOM 요소:

* [`File` 객체](api/file-object.md)
* [`<webview>` 태그](api/webview-tag.md)
* [`window.open` 함수](api/window-open.md)

### 주 프로세스를 위한 모듈:

* [app](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [BrowserWindow](api/browser-window.md)
* [contentTracing](api/content-tracing.md)
* [dialog](api/dialog.md)
* [globalShortcut](api/global-shortcut.md)
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

### 렌더러 프로세스(웹 페이지)를 위한 모듈:

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### Modules for Both Processes:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [screen](api/screen.md)
* [shell](api/shell.md)

## 개발

* [Coding Style](development/coding-style.md)
* [Using clang-format on C++ Code](development/clang-format.md)
* [Source Code Directory Structure](development/source-code-directory-structure.md)
* [Technical Differences to NW.js (formerly node-webkit)](development/atom-shell-vs-node-webkit.md)
* [Build System Overview](development/build-system-overview.md)
* [Build Instructions (macOS)](development/build-instructions-osx.md)
* [Build Instructions (Windows)](development/build-instructions-windows.md)
* [Build Instructions (Linux)](development/build-instructions-linux.md)
* [Debug Instructions (macOS)](development/debugging-instructions-macos.md)
* [Debug Instructions (Windows)](development/debug-instructions-windows.md)
* [Setting Up Symbol Server in debugger](development/setting-up-symbol-server.md)
* [Documentation Styleguide](styleguide.md)
* [Upgrading Chrome](development/upgrading-chrome.md)
* [Chromium Development](development/chromium-development.md)
* [V8 Development](development/v8-development.md)
