Por favor, asegúrese de utilizar los documentos que correspondan con la versión de Electron que esta buscando. El número de versión debe estar incluido en la URL de la página. De no ser así, probablemente está utilizando la documentación de una rama de desarrollo, la cual puede contener cambios en la API que no sean compatibles con su versión de Electron. Para ver las antiguas versiones de la documentación, puede [navegar por las etiquetas](https://github.com/electron/electron/tree/v1.4.0) en GitHub abriendo el menú desplegable de "Switch branches/tags" y seleccionado la etiqueta que coincida con su versión.

## Preguntas más frecuentes

Hay preguntas que se hacen de manera frecuente. Revise esto antes de crear una consulta:

* [Preguntas Frecuentes sobre Electron](faq.md)

## Guías

* [Glosario de términos](glossary.md)
* [Plataformas soportadas](tutorial/supported-platforms.md)
* [Seguridad](tutorial/security.md)
* [Versiones](tutorial/electron-versioning.md)
* [Distribución de aplicaciones](tutorial/application-distribution.md)
* [Guía de publicación en la Mac App Store](tutorial/mac-app-store-submission-guide.md)
* [Guía de Windows Store](tutorial/windows-store-guide.md)
* [Snapcraft Guide](tutorial/snapcraft-guide.md)
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
* [Actualización de aplicaciones](tutorial/updates.md)

## Tutoriales

* [Inicio Rápido](tutorial/quick-start.md)
* [Integración del entorno de escritorio](tutorial/desktop-environment-integration.md)
* [Detección de eventos online y Offline](tutorial/online-offline-events.md)
* [REPL](tutorial/repl.md)
* [Notificaciones nativas](tutorial/notifications.md)

## Referencia de la API

* [Sinopsis](api/synopsis.md)
* [Objeto de proceso](api/process.md)
* [Opciones de linea de commandos de Chrome soportadas](api/chrome-command-line-switches.md)
* [Variables de entorno](api/environment-variables.md)

### Elementos de DOM personalizados:

* [`File` Object](api/file-object.md)
* [`<webview>` Etiqueta](api/webview-tag.md)
* [Función `window.open`](api/window-open.md)

### Módulos para el proceso principal:

* [aplicación](api/app.md)
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

### Módulos para el proceso de renderizado (Página Web):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### Módulos para ambos procesos:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [screen](api/screen.md)
* [shell](api/shell.md)

## Desarrollo

* [Estilo de código](development/coding-style.md)
* [Clang-formato en código C++](development/clang-format.md)
* [Pruebas](development/testing.md)
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
* [Actualizando Chomium](development/upgrading-chromium.md)
* [Desarrollo de Chromium](development/chromium-development.md)
* [Desarrollo de V8](development/v8-development.md)