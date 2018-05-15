# Guías oficiales

Por favor, asegúrese de utilizar los documentos que correspondan con la versión de Electron que esta buscando. El número de versión debe estar incluido en la URL de la página. De no ser así, probablemente está utilizando la documentación de una rama de desarrollo, la cual puede contener cambios en la API que no sean compatibles con su versión de Electron. Para ver las antiguas versiones de la documentación, puede [navegar por las etiquetas](https://github.com/electron/electron/tree/v1.4.0) en GitHub abriendo el menú desplegable de "Switch branches/tags" y seleccionado la etiqueta que coincida con su versión.

## Preguntas más frecuentes

Hay preguntas que se hacen de manera frecuente. Revise esto antes de crear una consulta:

* [Preguntas Frecuentes sobre Electron](faq.md)

## Guías y tutoriales

* [Configurar el entorno de desarrollo](tutorial/development-environment.md) 
  * [Configurar macOS](tutorial/development-environment.md#setting-up-macos)
  * [Configurar Windows](tutorial/development-environment.md#setting-up-windows)
  * [Configurar Linux](tutorial/development-environment.md#setting-up-linux)
  * [Elegir un editor](tutorial/development-environment.md#a-good-editor)
* [Crear su primera aplicación](tutorial/first-app.md) 
  * [Instalar Electron](tutorial/first-app.md#installing-electron)
  * [Electron Development in a Nutshell](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [Ejecutar su aplicación](tutorial/first-app.md#running-your-app)
* [Boilerplates and CLIs](tutorial/boilerplates-and-clis.md) 
  * [Boilerplate vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [Electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Otras Herramientas y Boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Arquitectura de la aplicación](tutorial/application-architecture.md) 
  * [Proceso Principal y Proceso Visualizador](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Using Electron's APIs](tutorial/application-architecture.md#using-electron-apis)
  * [Using Node.js APIs](tutorial/application-architecture.md#using-node.js-apis)
  * [Using Native Node.js Modules](tutorial/using-native-node-modules.md)
  * [Inter-Process Communication](tutorial/application-architecture.md#)
* Adding Features to Your App 
  * [Notificaciones](tutorial/notifications.md)
  * [Documentos recientes](tutorial/desktop-environment-integration.md#recent-documents-windows-mac-os)
  * [Application Progress](tutorial/progress-bar.md)
  * [Custom Dock Menu](tutorial/desktop-environment-integration.md#custom-dock-menu-mac-os)
  * [Custom Windows Taskbar](tutorial/windows-taskbar.md)
  * [Custom Linux Desktop Actions](tutorial/linux-desktop-actions.md)
  * [Atajos del teclado](tutorial/keyboard-shortcuts.md)
  * [Offline/Online Detection](tutorial/online-offline-events.md)
  * [Archivo representado por macOS BrowserWindows](tutorial/represented-file.md)
  * [Native File Drag & Drop](tutorial/native-file-drag-drop.md)
* [Accesibilidad](tutorial/accessibility.md) 
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Habilitar la accesibilidad](tutorial/accessibility.md#enabling-accessibility)
* [Testing and Debugging](tutorial/application-debugging.md) 
  * [Depuración del proceso principal](tutorial/debugging-main-process.md)
  * [Uso de Selenium y WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Pruebas de sistemas de CI sin cabeceras (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Extensión de herramientas de desarrollo](tutorial/devtools-extension.md)
  * [Automated Testing with a Custom Driver](tutorial/automated-testing-with-a-custom-driver.md)
* Packaging 
  * [Code Signing](tutorial/code-signing.md)
* [Distribution](tutorial/application-distribution.md) 
  * [Support](tutorial/support.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Seguridad](tutorial/security.md) 
  * [Reportando problemas de seguridad](tutorial/security.md#reporting-security-issues)
  * [Actualizaciones y problemas de seguridad Chromium](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Electron Security Warnings](tutorial/security.md#electron-security-warnings)
  * [Security Checklist](tutorial/security.md#checklist-security-recommendations)
* [Updates](tutorial/updates.md) 
  * [Deploying an Update Server](tutorial/updates.md#deploying-an-update-server)
  * [Implementing Updates in Your App](tutorial/updates.md#implementing-updates-in-your-app)
  * [Applying Updates](tutorial/updates.md#applying-updates)

## Detailed Tutorials

These individual tutorials expand on topics discussed in the guide above.

* [In Detail: Installing Electron](tutorial/installation.md) 
  * [Global versus Local Installation](tutorial/installation.md#global-versus-local-installation)
  * [Proxies](tutorial/installation.md#proxies)
  * [Espejos y cachés personalizados](tutorial/installation.md#custom-mirrors-and-caches)
  * [Problemas](tutorial/installation.md#troubleshooting)
* [In Detail: Electron's Versioning Scheme](tutorial/electron-versioning.md) 
  * [semver](tutorial/electron-versioning.md#semver)
  * [Ramas estabilizadoras](tutorial/electron-versioning.md#stabilization-branches)
  * [Publicaciones beta y arreglo de problemas](tutorial/electron-versioning.md#beta-releases-and-bug-fixes)
* [In Detail: Packaging App Source Code with asar](tutorial/application-packaging.md) 
  * [Generating asar Archives](tutorial/application-packaging.md#generating-asar-archives)
  * [Usando archivos asar](tutorial/application-packaging.md#using-asar-archives)
  * [Limitaciones](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Añadiendo archivos desempaquetados a ficheros asar](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [In Detail: Using Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)
* [In Detail: Using Widevine CDM Plugin](tutorial/using-widevine-cdm-plugin.md)
* [Representación fuera de la pantalla](tutorial/offscreen-rendering.md)

* * *

* [Glosario de términos](glossary.md)

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

See <development/README.md>