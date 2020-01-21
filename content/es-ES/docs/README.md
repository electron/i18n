# Guías oficiales

Por favor, asegúrese de utilizar los documentos que correspondan con la versión de Electron que esta buscando. El número de versión debe estar incluido en la URL de la página. De no ser así, probablemente está utilizando la documentación de una rama de desarrollo, la cual puede contener cambios en la API que no sean compatibles con su versión de Electron. Para ver la documentación de las versiones pasadas desde GitHub usted puede [navegar usando las etiquetas](https://github.com/electron/electron/tree/v1.4.0) al abrir el cuadro de selección "Switch branches/tags" y seleccionar la versión que coincida con la suya.

## Preguntas más frecuentes

Hay preguntas que se hacen de manera frecuente. Revise esto antes de crear una consulta:

* [Preguntas Frecuentes sobre Electron](faq.md)

## Guías y tutoriales

* [Sobre Electron](tutorial/about.md)
* [Configurar el entorno de desarrollo](tutorial/development-environment.md) 
  * [Configurando macOS](tutorial/development-environment.md#setting-up-macos)
  * [Configurar Windows](tutorial/development-environment.md#setting-up-windows)
  * [Configurar Linux](tutorial/development-environment.md#setting-up-linux)
  * [Elegir un editor](tutorial/development-environment.md#a-good-editor)
* [Crear su primera aplicación](tutorial/first-app.md) 
  * [Instalando Electron](tutorial/first-app.md#installing-electron)
  * [Desarrollo con Electron de un vistazo](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [Ejecuta tu aplicación](tutorial/first-app.md#running-your-app)
* [Plantillas y CLIs](tutorial/boilerplates-and-clis.md) 
  * [Plantilla vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [Electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Otras Herramientas y Boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Arquitectura de la aplicación](tutorial/application-architecture.md) 
  * [Proceso Principal y Proceso Visualizador](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Uso de APIs de Electron](tutorial/application-architecture.md#using-electron-apis)
  * [Uso de APIs de Node.js](tutorial/application-architecture.md#using-nodejs-apis)
  * [Uso de Módulos Nativos de Node.js](tutorial/using-native-node-modules.md)
  * [Estrategias de rendimiento](tutorial/performance.md)
* Agregar características a su aplicación 
  * [Notificaciones](tutorial/notifications.md)
  * [Documentos recientes](tutorial/recent-documents.md)
  * [Progreso de la aplicación](tutorial/progress-bar.md)
  * [Menú Dock personalizado](tutorial/macos-dock.md)
  * [Barra de tareas de Windows personalizado](tutorial/windows-taskbar.md)
  * [Acciones de escritorio Linux personalizado](tutorial/linux-desktop-actions.md)
  * [Atajos del teclado](tutorial/keyboard-shortcuts.md)
  * [Detección Offline y Online](tutorial/online-offline-events.md)
  * [Archivo representado por macOS BrowserWindows](tutorial/represented-file.md)
  * [Función nativa de arrastrar & soltar de archivos](tutorial/native-file-drag-drop.md)
  * [Representación fuera de la pantalla](tutorial/offscreen-rendering.md)
  * [Soporte para Modo Oscuro macOS](tutorial/mojave-dark-mode-guide.md)
  * [Página web embebida en Electron](tutorial/web-embeds.md)
* [Accesibilidad](tutorial/accessibility.md) 
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Habilitar la accesibilidad](tutorial/accessibility.md#enabling-accessibility)
* [Pruebas y depuración](tutorial/application-debugging.md) 
  * [Depuración del proceso principal](tutorial/debugging-main-process.md)
  * [Depuración del proceso principal con el Visual Studio Code](tutorial/debugging-main-process-vscode.md)
  * [Uso de Selenium y WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Pruebas de sistemas de CI sin cabeceras (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Extensión de herramientas de desarrollo](tutorial/devtools-extension.md)
  * [Automatizado con un controlador personalizado de prueba](tutorial/automated-testing-with-a-custom-driver.md)
* [Distribución](tutorial/application-distribution.md) 
  * [Plataformas soportadas](tutorial/support.md#supported-platforms)
  * [Firma de código](tutorial/code-signing.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Seguridad](tutorial/security.md) 
  * [Reportando problemas de seguridad](tutorial/security.md#reporting-security-issues)
  * [Actualizaciones y problemas de seguridad Chromium](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Advertencias de seguridad de Electron](tutorial/security.md#electron-security-warnings)
  * [Lista de verificación de seguridad](tutorial/security.md#checklist-security-recommendations)
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
  * [Programa de retroalimentación](tutorial/app-feedback-program.md)
* [Empaquetando el código fuente con asar](tutorial/application-packaging.md) 
  * [Generando archivos asar](tutorial/application-packaging.md#generating-asar-archives)
  * [Usando archivos asar](tutorial/application-packaging.md#using-asar-archives)
  * [Limitaciones](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Añadiendo archivos desempaquetados a ficheros asar](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Probando Widevine CDM](tutorial/testing-widevine-cdm.md)
* [Uso del Plugin de Pepper Flash](tutorial/using-pepper-flash-plugin.md)

* * *

* [Glosario de términos](glossary.md)

## Referencia de la API

* [Sinopsis](api/synopsis.md)
* [Objeto de proceso](api/process.md)
* [Cambios de línea de comandos soportados](api/command-line-switches.md)
* [Variables de entorno](api/environment-variables.md)
* [Rupturas de cambios de la API](api/breaking-changes.md)

### Elementos de DOM personalizados:

* [`Archivo` Objeto](api/file-object.md)
* [`<webview>` Etiqueta](api/webview-tag.md)
* [`window.open` Función](api/window-open.md)
* [`BrowserWindowProxy` Objeto](api/browser-window-proxy.md)

### Módulos para el proceso principal:

* [app](api/app.md)
* [autoUpdater](api/auto-updater.md)
* [BrowserView](api/browser-view.md)
* [BrowserWindow](api/browser-window.md)
* [contentTracing](api/content-tracing.md)
* [dialog](api/dialog.md)
* [globalShortcut](api/global-shortcut.md)
* [Compras integradas](api/in-app-purchase.md)
* [ipcMain](api/ipc-main.md)
* [Menu](api/menu.md)
* [MenuItem](api/menu-item.md)
* [net](api/net.md)
* [netLog](api/net-log.md)
* [Notification](api/notification.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [screen](api/screen.md)
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [Barra táctil](api/touch-bar.md)
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
* [shell](api/shell.md)

## Desarrollo

Ver <development/README.md>