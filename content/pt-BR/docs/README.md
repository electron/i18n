Certifique-se de usar a documentação correspondente a versão do Electron que você esta usando. A versão faz parte da URL desta página. Se não, você provavelmente esta usando a documentação da branch de desenvolvimento qual pode conter mudanças da API que pode não ser compatível com a sua versão do Electron. Para ver a documentação de versões anteriores, você pode [procurar pelas tags](https://github.com/electron/electron/tree/v1.4.0) no GitHub, para isso, abra o menu "Switch branches/tags" e selecione a tag da versão que você gostaria de ver.

## Perguntas Frequentes

Há varias perguntas já feitas, Confira isto antes de criar uma nova pergunta:

* [Electron FAQ](faq.md)

## Guias

* [Glossário de Termos](glossary.md)
* [Plataformas Suportadas](tutorial/supported-platforms.md)
* [Segurança](tutorial/security.md)
* [Controle de Versão](tutorial/electron-versioning.md)
* [Distribuição de Aplicativos](tutorial/application-distribution.md)
* [Guia para Mac App Store](tutorial/mac-app-store-submission-guide.md)
* [Guia para o Windows Store](tutorial/windows-store-guide.md)
* [Brasil](tutorial/snapcraft-guide.md)
* [Empacotamento de Aplicativos](tutorial/application-packaging.md)
* [Usando Módulos Nativos do Node](tutorial/using-native-node-modules.md)
* [Processo Principal de Depuração](tutorial/debugging-main-process.md)
* [Usando Selenium e WebDriver](tutorial/using-selenium-and-webdriver.md)
* [Extensão de DevTools](tutorial/devtools-extension.md)
* [Usando o Plugin Pepper Flash](tutorial/using-pepper-flash-plugin.md)
* [Usando o Plugin Widevine CDM](tutorial/using-widevine-cdm-plugin.md)
* [Testando em sistemas de CI (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
* [Renderização fora da tela](tutorial/offscreen-rendering.md)
* [Atalhos do Teclado](tutorial/keyboard-shortcuts.md)
* [Atualizando Aplicativos](tutorial/updates.md)

## Tutoriais

* [Início Rápido](tutorial/quick-start.md)
* [Integração com Ambiente de Trabalho](tutorial/desktop-environment-integration.md)
* [Detecção de Evento Online/Offline](tutorial/online-offline-events.md)
* [REPL](tutorial/repl.md)
* [Notificações Nativas](tutorial/notifications.md)

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
* [Usando clang-format em código C++](development/clang-format.md)
* [Testando](development/testing.md)
* [Estrutura de Diretório do Código Fonte](development/source-code-directory-structure.md)
* [Diferentes Técnicas para o NW.js (formalmente node-webkit)](development/atom-shell-vs-node-webkit.md)
* [Construir Resumo do Sistema](development/build-system-overview.md)
* [Instruções para Compilação (macOS)](development/build-instructions-osx.md)
* [Instruções para Compilação (Windows)](development/build-instructions-windows.md)
* [Instruções para Compilação (Linux)](development/build-instructions-linux.md)
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