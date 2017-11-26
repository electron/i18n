Por favor, asegúrese de que utilizar los documentos que coinciden con su versión de Electron. El número de versión debe estar incluido en la URL de la página. De no ser así, probablemente está utilizando la documentación de una rama de desarrollo, la cual puede contener cambios en la API que no sean compatibles con su versión de Electron. Para ver la documentación de las versiones pasadas desde GitHub usted puede [navegar usando las etiquetas](https://github.com/electron/electron/tree/v1.4.0) al abrir el cuadro de selección "Switch branches/tags" y seleccionar la versión que coincida con la suya.

## Preguntas más frecuentes

Hay preguntas que se hacen a frecuentemente. Revise la siguiente liga antes de realizar una nueva consulta:

* [Preguntas más frecuentes de Electron](faq.md)

## Guías

* [Glosario de términos](glossary.md)
* [Plataformas soportadas](tutorial/supported-platforms.md)
* [Seguridad](tutorial/security.md)
* [Versionamiento de Electron](tutorial/electron-versioning.md)
* [Distribución de la aplicación](tutorial/application-distribution.md)
* [Guía de publicación en la Mac App Store](tutorial/mac-app-store-submission-guide.md)
* [Guía de Windows Store](tutorial/windows-store-guide.md)
* [Empaquetado de la aplicación](tutorial/application-packaging.md)
* [Uso de módulos nativos de Node](tutorial/using-native-node-modules.md)
* [Depuración del proceso principal](tutorial/debugging-main-process.md)
* [Uso de selenio y WebDriver](tutorial/using-selenium-and-webdriver.md)
* [Extensión de herramientas de desarrollo](tutorial/devtools-extension.md)
* [Uso del Plugin de Pepper Flash](tutorial/using-pepper-flash-plugin.md)
* [Uso del plugin MDL Widevine](tutorial/using-widevine-cdm-plugin.md)
* [Pruebas de sistemas de CI sin cabeceras (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
* [Representación fuera de la pantalla](tutorial/offscreen-rendering.md)
* [Atajos del teclado](tutorial/keyboard-shortcuts.md)

## Tutoriales

* [Inicio Rápido](tutorial/quick-start.md)
* [Integración del entorno de escritorio](tutorial/desktop-environment-integration.md)
* [Detección de eventos online y Offline](tutorial/online-offline-events.md)
* [REPL](tutorial/repl.md)
* [Notificaciones nativas](tutorial/notifications.md)

## Referencia de la API

* [Sinopsis](api/synopsis.md)
* [Objeto de proceso](api/process.md)
* [Supported Chrome Command Line Switches](api/chrome-command-line-switches.md)
* [Variables de entorno](api/environment-variables.md)

### Elementos de DOM personalizados:

* [`Archivo` Objeto](api/file-object.md)
* [`<webview>` Etiqueta](api/webview-tag.md)
* [`window.open` Función](api/window-open.md)

### Módulos para el proceso principal:

* [app](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [BrowserView](api/browser-view.md)
* [BrowserWindow](api/browser-window.md)
* [contentTracing](api/content-tracing.md)
* [diálogo](api/dialog.md)
* [Atajos Globales](api/global-shortcut.md)
* [ipcMain](api/ipc-main.md)
* [Menú](api/menu.md)
* [MenuItem](api/menu-item.md)
* [red](api/net.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocolo](api/protocol.md)
* [período de sesiones](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [Bandeja](api/tray.md)
* [webContents](api/web-contents.md)

### Módulos para el proceso de renderizado (Página Web):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remoto](api/remote.md)
* [webFrame](api/web-frame.md)

### Módulos para ambos procesos:

* [portapapeles](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [screen](api/screen.md)
* [shell](api/shell.md)

## Development

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