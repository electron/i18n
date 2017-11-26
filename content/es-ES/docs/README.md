Por favor, asegúrese de que utilizar los documentos que coinciden con su versión de Electron. El número de versión debe estar incluido en la URL de la página. De no ser así, probablemente está utilizando la documentación de una rama de desarrollo, la cual puede contener cambios en la API que no sean compatibles con su versión de Electron. Para ver las antiguas versiones de la documentación, puedes [navegar por las etiquetas](https://github.com/electron/electron/tree/v1.4.0) en GitHub abriendo el menú desplegable de "Switch branches/tags" y seleccionado la etiqueta que coincida con tu versión.

## Preguntas frecuentes

Hay preguntas que se hacen a frecuentemente. Revisa esto antes de crear una consulta:

* [Preguntas frecuentes sobre Electron](faq.md)

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
* [Uso de Selenium y WebDriver](tutorial/using-selenium-and-webdriver.md)
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
* [Soporte para los interruptores de la linea de comando de Chrome](api/chrome-command-line-switches.md)
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
* [dialog](api/dialog.md)
* [Atajos Globales](api/global-shortcut.md)
* [ipcMain](api/ipc-main.md)
* [Menu](api/menu.md)
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

## Desarrollo

* [Estilo de codigo](development/coding-style.md)
* [Using clang-format on C++ Code](development/clang-format.md)
* [Estructura del directorio de código fuente](development/source-code-directory-structure.md)
* [Diferencias técnicas con NW.js (antes node-webkit)](development/atom-shell-vs-node-webkit.md)
* [Resumen de compilación de sistemas](development/build-system-overview.md)
* [Instrucciones de compilación (macOS)](development/build-instructions-osx.md)
* [Instrucciones de compilación (Windows)](development/build-instructions-windows.md)
* [Instrucciones de compilación (Linux)](development/build-instructions-linux.md)
* [Instrucciones de depuración (macOS)](development/debugging-instructions-macos.md)
* [Instrucciones de depuración (Windows)](development/debug-instructions-windows.md)
* [Configurando el Symbol Server en el depurador](development/setting-up-symbol-server.md)
* [Documentación guía de estilos](styleguide.md)
* [Actualizando Chrome](development/upgrading-chrome.md)
* [Desarrollo de Chromium](development/chromium-development.md)
* [Desarrollo de V8](development/v8-development.md)