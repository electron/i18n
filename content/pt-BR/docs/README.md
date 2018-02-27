Certifique-se de usar a documentação correspondente a versão do Electron que você esta usando. A versão faz parte da URL desta página. Se não, você provavelmente esta usando a documentação da branch de desenvolvimento qual pode conter mudanças da API que pode não ser compatível com a sua versão do Electron. Para ver a documentação de versões anteriores, você pode [procurar pelas tags](https://github.com/electron/electron/tree/v1.4.0) no GitHub, para isso, abra o menu "Switch branches/tags" e selecione a tag da versão que você gostaria de ver.

## Perguntas Frequentes

Há varias perguntas já feitas, Confira isto antes de criar uma nova pergunta:

* [Electron FAQ](faq.md)

## Guias e Tutoriais

* [Configurar Ambiente de Desenvolvimento](tutorial/development-environment.md) 
  * [Configurando o macOS](tutorial/development-environment.md#setting-up-macos)
  * [Configurando o Windows](tutorial/development-environment.md#setting-up-windows)
  * [Configurando o Linux](tutorial/development-environment.md#setting-up-linux)
  * [Escolhendo um Editor](tutorial/development-environment.md#a-good-editor)
* [Criando seu Primeiro Aplicativo](tutorial/first-app.md) 
  * [Instalando o Electron](tutorial/first-app.md#installing-electron)
  * [Desenvolvimento Electron em um Nutshell](tutorial/first-app.md#electron-development-in-a-nutshell)
  * [Executando Seu Aplicativo](tutorial/first-app.md#running-your-app)
* [Boilerplates e CLIs](tutorial/boilerplates-and-clis.md) 
  * [Boilerplate vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Outras Ferramentas e Boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)
* [Arquitetura do Aplicativo](tutorial/application-architecture.md) 
  * [Main and Renderer Processes](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Usando Electro APIs](tutorial/application-architecture.md#using-electron-apis)
  * [Usando Node.js APIs](tutorial/application-architecture.md#using-node.js-apis)
  * [Usando Módulos Nativos do Node.js](tutorial/using-native-node-modules.md)
  * [Inter-Process Communication](tutorial/application-architecture.md#)
* Adicionando Recursos para Seu Aplicativo 
  * [Notificações](tutorial/notifications.md)
  * [Documentos Recentes](tutorial/desktop-environment-integration.md#recent-documents-windows-mac-os)
  * [Progresso do Aplicativo](tutorial/progress-bar.md)
  * [Menu Dock Personalizado](tutorial/desktop-environment-integration.md#custom-dock-menu-mac-os)
  * [Barra de Tarefas do Windows Personalizado](tutorial/windows-taskbar.md)
  * [Ações Desktop Linux Personalizado](tutorial/linux-desktop-actions.md)
  * [Atalhos do Teclado](tutorial/keyboard-shortcuts.md)
  * [Detecção de Offline/Online](tutorial/online-offline-events.md)
  * [Represented File for macOS BrowserWindows](tutorial/represented-file.md)
  * [Nativo Arquivo Drag & Drop](tutorial/native-file-drag-drop.md)
* [Acessibilidade do Aplicativo](tutorial/accessibility.md) 
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Permitindo Acessibilidade](tutorial/accessibility.md#enabling-accessibility)
* [Testando e Depurando o Aplicativo](tutorial/application-debugging.md) 
  * [O Processo Principal de Depuração](tutorial/debugging-main-process.md)
  * [Usando Selenium e WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Testando em sistemas de CI (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Extensão de DevTools](tutorial/devtools-extension.md)
* [Distribuição de Aplicativos](tutorial/application-distribution.md) 
  * [Plataformas Suportadas](tutorial/supported-platforms.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Segurança do Aplicativo](tutorial/security.md) 
  * [Reportando problemas de Segurança](tutorial/security.md#reporting-security-issues)
  * [Chromium Security Issues and Upgrades](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Electron Security Warnings](tutorial/security.md#electron-security-warnings)
  * [Security Checklist](tutorial/security.md#checklist-security-recommendations)
* [Application Updates](tutorial/updates.md) 
  * [Deploying an Update Server](tutorial/updates.md#deploying-an-update-server)
  * [Implementing Updates in Your App](tutorial/updates.md#implementing-updates-in-your-app)
  * [Applying Updates](tutorial/updates.md#applying-updates)

## Detailed Tutorials

These individual tutorials expand on topics discussed in the guide above.

* [In Detail: Installing Electron](tutorial/installation.md) 
  * [Global versus Local Installation](tutorial/installation.md#global-versus-local-installation)
  * [Proxies](tutorial/installation.md#proxies)
  * [Custom Mirrors and Caches](tutorial/installation.md#custom-mirrors-and-caches)
  * [Solução de Problemas](tutorial/installation.md#troubleshooting)
* [In Detail: Electron's Versioning Scheme](tutorial/electron-versioning.md) 
  * [semver](tutorial/electron-versioning.md#semver)
  * [Stabilization Branches](tutorial/electron-versioning.md#stabilization-branches)
  * [Beta Releases and Bug Fixes](tutorial/electron-versioning.md#beta-releases-and-bug-fixes)
* [In Detail: Packaging App Source Code with asar](tutorial/application-packaging.md) 
  * [Generating asar Archives](tutorial/application-packaging.md#generating-asar-archives)
  * [Using asar Archives](tutorial/application-packaging.md#using-asar-archives)
  * [Limitações](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Adding Unpacked Files to asar Archives](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [In Detail: Using Pepper Flash Plugin](tutorial/using-pepper-flash-plugin.md)
* [In Detail: Using Widevine CDM Plugin](tutorial/using-widevine-cdm-plugin.md)
* [Renderização fora da tela](tutorial/offscreen-rendering.md)

* * *

* [Glossário de Termos](glossary.md)

## Referências da API

* [Sinopse](api/synopsis.md)
* [Processamento de Objeto](api/process.md)
* [Suporte ao Terminal de Comando do Chrome](api/chrome-command-line-switches.md)
* [Variáveis de Ambiente](api/environment-variables.md)

### Elementos de DOM Personalizado:

* [`File` Object](api/file-object.md)
* [`<webview>` Tag](api/webview-tag.md)
* [`window.open` Função](api/window-open.md)

### Módulos para o Processo Principal:

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

### Módulos para o Processo de Renderização (Página Web):

* [desktopCapturer](api/desktop-capturer.md)
* [ipcRenderer](api/ipc-renderer.md)
* [remote](api/remote.md)
* [webFrame](api/web-frame.md)

### Módulos para Ambos os Processos:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [nativeImage](api/native-image.md)
* [screen](api/screen.md)
* [shell](api/shell.md)

## Desenvolvimento

* [Estilo de Codificação](development/coding-style.md)
* [Usando clang-format em Código C++](development/clang-format.md)
* [Testando](development/testing.md)
* [Estrutura de Diretório do Código Fonte](development/source-code-directory-structure.md)
* [Diferentes Técnicas para o NW.js (formalmente node-webkit)](development/atom-shell-vs-node-webkit.md)
* [Construir Resumo do Sistema](development/build-system-overview.md)
* [Instruções de Compilação (macOS)](development/build-instructions-osx.md)
* [Instruções para Configuração (Windows)](development/build-instructions-windows.md)
* [Instruções para Configurar (Linux)](development/build-instructions-linux.md)
* [Introdução de Depuração (macOS)](development/debugging-instructions-macos.md)
* [Introdução de Depuração (Windows)](development/debug-instructions-windows.md)
* [Configuração para servidor de símbolos no depurador](development/setting-up-symbol-server.md)
* [Estilo da Documentação](styleguide.md)
* [Contribuindo para o Electron](../CONTRIBUTING.md)
* [Problemas](development/issues.md)
* [Pull Requests](development/pull-requests.md)
* [Atualizando o Chromium](development/upgrading-chromium.md)
* [Desenvolvimento do Chromium](development/chromium-development.md)
* [V8 Desenvolvimento](development/v8-development.md)