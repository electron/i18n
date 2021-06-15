# Guías oficiales

Por favor, asegúrese de utilizar los documentos que correspondan con la versión de Electron que esta buscando. El número de versión debe estar incluido en la URL de la página. De no ser así, probablemente está utilizando la documentación de una rama de desarrollo, la cual puede contener cambios en la API que no sean compatibles con su versión de Electron. Para ver la documentación de las versiones pasadas desde GitHub usted puede [navegar usando las etiquetas](https://github.com/electron/electron/tree/v1.4.0) al abrir el cuadro de selección "Switch branches/tags" y seleccionar la versión que coincida con la suya.

## Preguntas más frecuentes

Hay preguntas que se hacen bastante a menudo. Comprueba esto antes de crear un tema:

* [Preguntas Frecuentes sobre Electron](faq.md)

## Guías y tutoriales

### Empezar

* [Introducción](tutorial/introduction.md)
* [Inicio Rápido](tutorial/quick-start.md)
* [Modelo de proceso](tutorial/process-model.md)

### Aprender lo básico

* Agregar características a su aplicación
  * [Notificaciones](tutorial/notifications.md)
  * [Documentos recientes](tutorial/recent-documents.md)
  * [Progreso de la aplicación](tutorial/progress-bar.md)
  * [Menú Dock personalizado](tutorial/macos-dock.md)
  * [Barra de tareas de Windows personalizado](tutorial/windows-taskbar.md)
  * [Acciones de escritorio Linux personalizado](tutorial/linux-desktop-actions.md)
  * [Atajos de teclado](tutorial/keyboard-shortcuts.md)
  * [Detección Offline y Online](tutorial/online-offline-events.md)
  * [Archivo representado por macOS BrowserWindows](tutorial/represented-file.md)
  * [Función nativa arrastrar & soltar archivo](tutorial/native-file-drag-drop.md)
  * [Renderización fuera de pantalla](tutorial/offscreen-rendering.md)
  * [Modo oscuro](tutorial/dark-mode.md)
  * [Página web embebida en Electron](tutorial/web-embeds.md)
* [Plantillas y CLIs](tutorial/boilerplates-and-clis.md)
  * [Plantillas vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Otras Herramientas y Boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)

### Pasos avanzados

* Arquitectura de la aplicación
  * [Uso de Módulos Nativos de Node.js](tutorial/using-native-node-modules.md)
  * [Estrategias de rendimiento](tutorial/performance.md)
  * [Estrategias de seguridad](tutorial/security.md)
  * [Process Sandboxing](tutorial/sandbox.md)
* [Accesibilidad](tutorial/accessibility.md)
  * [Habilitando manualmente Características de Accesibilidad](tutorial/accessibility.md#manually-enabling-accessibility-features)
* [Pruebas y depuración](tutorial/application-debugging.md)
  * [Depuración del proceso principal](tutorial/debugging-main-process.md)
  * [Depurando con Visual Studio Code](tutorial/debugging-vscode.md)
  * [Uso de Selenium y WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Pruebas de sistemas de CI sin cabeceras (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Extensión de Chrome DevTools](tutorial/devtools-extension.md)
  * [Prueba Automática con un controlador personalizado](tutorial/automated-testing-with-a-custom-driver.md)
  * [REPL](tutorial/repl.md)
* [Distribución](tutorial/application-distribution.md)
  * [Plataformas soportadas](tutorial/support.md#supported-platforms)
  * [Firma de código](tutorial/code-signing.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Actualizaciones](tutorial/updates.md)
  * [Implementar un servidor de actualización](tutorial/updates.md#deploying-an-update-server)
  * [Implementación de actualizaciones en su aplicación](tutorial/updates.md#implementing-updates-in-your-app)
  * [Aplicar actualizaciones](tutorial/updates.md#applying-updates)
* [Obteniendo soporte](tutorial/support.md)

## Tutoriales detallados

Estos tutoriales individuales amplían los temas tratados en la guía anterior.

* [Instalando Electron](tutorial/installation.md)
  * [Proxies](tutorial/installation.md#proxies)
  * [Espejos y cachés personalizados](tutorial/installation.md#custom-mirrors-and-caches)
  * [Problemas](tutorial/installation.md#troubleshooting)
* Versiones Electron & Comentarios de desarrollador
  * [Política de versiones](tutorial/electron-versioning.md)
  * [Tiempos de Lanzamientos](tutorial/electron-timelines.md)
* [Probando Widevine CDM](tutorial/testing-widevine-cdm.md)

---

* [Glosario de términos](glossary.md)

## Referencia de la API

* [Sinopsis](api/synopsis.md)
* [Objeto de proceso](api/process.md)
* [Cambios de línea de comandos soportados](api/command-line-switches.md)
* [Variables de entorno](api/environment-variables.md)
* [Soporte de extensiones de Chrome](api/extensions.md)
* [Rupturas de cambios de la API](breaking-changes.md)

### Elementos de DOM personalizados:

* [`File` Object](api/file-object.md)
* [Etiqueta `<webview>`](api/webview-tag.md)
* [Función `window.open`](api/window-open.md)
* [`BrowserWindowProxy` Objeto](api/browser-window-proxy.md)

### Módulos para el proceso principal:

* [app](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [BrowserView](api/browser-view.md)
* [BrowserWindow](api/browser-window.md)
* [class="VfPpkd-ksKsZd-XxIAqe">](api/content-tracing.md)
* [dialog](api/dialog.md)
* [globalShortcut](api/global-shortcut.md)
* [Compras integradas](api/in-app-purchase.md)
* [ipcMain](api/ipc-main.md)
* [Menu](api/menu.md)
* [MenuItem](api/menu-item.md)
* [MessageChannelMain](api/message-channel-main.md)
* [Título 1 Xpath:/h 1](api/message-port-main.md)
* [red](api/net.md)
* [netLog](api/net-log.md)
* [nativeTheme](api/native-theme.md)
* [Notification](api/notification.md)
* [Monitor de energía](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [Protocolo](api/protocol.md)
* [screen](api/screen.md)
* [session](api/session.md)
* [ShareMenu](api/share-menu.md)
* [systemPreferences](api/system-preferences.md)
* [Barra táctil](api/touch-bar.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)
* [webFrameMain](api/web-frame-main.md)

### Módulos para el proceso de renderizado (Página Web):

* [contextBridge](api/context-bridge.md)
* [ipcRenderer](api/ipc-renderer.md)
* [webFrame](api/web-frame.md)

### Módulos para ambos procesos:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [desktopCapturer](api/desktop-capturer.md)
* [NativeImage](api/native-image.md)
* [shell](api/shell.md)

## Desarrollo

Ver [development/README.md](development/README.md)
