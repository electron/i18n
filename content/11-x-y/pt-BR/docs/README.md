# Guia Oficial

Certifique-se de usar a documentação correspondente a versão do Electron que você esta usando. A versão faz parte da URL desta página. Se não, você provavelmente esta usando a documentação da branch de desenvolvimento qual pode conter mudanças da API que pode não ser compatível com a sua versão do Electron. Para ver a documentação de versões anteriores, você pode [procurar pelas tags](https://github.com/electron/electron/tree/v1.4.0) no GitHub, para isso, abra o menu "Switch branches/tags" e selecione a tag da versão que você gostaria de ver.

## Perguntas Frequentes

Há perguntas que são muitas vezes feitas. Dê uma olhada nisso antes de criar uma issue:

* [Perguntas Frequentes no Electron](faq.md)

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
  * [Processos Principal e de Renderização](tutorial/application-architecture.md#main-and-renderer-processes)
  * [Usando Electro APIs](tutorial/application-architecture.md#using-electron-apis)
  * [Usando Node.js APIs](tutorial/application-architecture.md#using-nodejs-apis)
  * [Usando Módulos Nativos do Node.js](tutorial/using-native-node-modules.md)
  * [Estratégias de Performance](tutorial/performance.md)
* Adicionando Recursos para Seu Aplicativo
  * [Notificações](tutorial/notifications.md)
  * [Documentos Recentes](tutorial/recent-documents.md)
  * [Progresso do Aplicativo](tutorial/progress-bar.md)
  * [Menu Dock Personalizado](tutorial/macos-dock.md)
  * [Barra de Tarefas do Windows Personalizado](tutorial/windows-taskbar.md)
  * [Ações Desktop Linux Personalizado](tutorial/linux-desktop-actions.md)
  * [Atalhos do Teclado](tutorial/keyboard-shortcuts.md)
  * [Detecção de Offline/Online](tutorial/online-offline-events.md)
  * [Representação de Arquivo para o macOS BrowserWindows](tutorial/represented-file.md)
  * [Drag & Drop de Arquivos Nativo (Arrastar e Soltar)](tutorial/native-file-drag-drop.md)
  * [Renderização fora da tela](tutorial/offscreen-rendering.md)
  * [Supporting macOS Dark Mode](tutorial/mojave-dark-mode-guide.md)
  * [Incluir conteúdos Web no Electron](tutorial/web-embeds.md)
* [Acessibilidade](tutorial/accessibility.md)
  * [Spectron](tutorial/accessibility.md#spectron)
  * [Devtron](tutorial/accessibility.md#devtron)
  * [Permitindo Acessibilidade](tutorial/accessibility.md#enabling-accessibility)
* [Teste e Depuração](tutorial/application-debugging.md)
  * [O Processo Principal de Depuração](tutorial/debugging-main-process.md)
  * [Debugging the Main Process with Visual Studio Code](tutorial/debugging-main-process-vscode.md)
  * [Usando Selenium e WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Testando em sistemas de CI (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Extensão de DevTools](tutorial/devtools-extension.md)
  * [Testando Automatizado com um Driver Personalizado](tutorial/automated-testing-with-a-custom-driver.md)
* [Distribuição](tutorial/application-distribution.md)
  * [Plataformas Suportadas](tutorial/support.md#supported-platforms)
  * [Assinando Código](tutorial/code-signing.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
* [Segurança](tutorial/security.md)
  * [Reportando problemas de Segurança](tutorial/security.md#reporting-security-issues)
  * [Upgrades e Problemas de Segurança do Chromium](tutorial/security.md#chromium-security-issues-and-upgrades)
  * [Aviso de Segurança do Electron](tutorial/security.md#electron-security-warnings)
  * [Checklist de Segurança](tutorial/security.md#checklist-security-recommendations)
* [Atualizações](tutorial/updates.md)
  * [Implementando um Servidor de Atualizações](tutorial/updates.md#deploying-an-update-server)
  * [Implementando Atualizações em Seu App](tutorial/updates.md#implementing-updates-in-your-app)
  * [Aplicando Atualizações](tutorial/updates.md#applying-updates)
* [Recebendo suporte](tutorial/support.md)

## Tutoriais Detalhados

Esses tutoriais individuais explicam os tópicos discutidos no guia acima.

* [Instalando o Electron](tutorial/installation.md)
  * [Proxies](tutorial/installation.md#proxies)
  * [Mirrors e Caches Customizados](tutorial/installation.md#custom-mirrors-and-caches)
  * [Solução de Problemas](tutorial/installation.md#troubleshooting)
* Electron Releases & Developer Feedback
  * [Politica de versão](tutorial/electron-versioning.md)
  * [Linha do Tempo de Lançamentos](tutorial/electron-timelines.md)
* [Packaging App Source Code with asar](tutorial/application-packaging.md)
  * [Gerando Arquivos asar](tutorial/application-packaging.md#generating-asar-archives)
  * [Usando Arquivos asar](tutorial/application-packaging.md#using-asar-archives)
  * [Limitações](tutorial/application-packaging.md#limitations-of-the-node-api)
  * [Adicionando Arquivos Descompactados para os Arquivos asar](tutorial/application-packaging.md#adding-unpacked-files-to-asar-archives)
* [Testando Widevine CCDM](tutorial/testing-widevine-cdm.md)
* [Usando o Plugin Pepper Flash](tutorial/using-pepper-flash-plugin.md)

---

* [Glossário de Termos](glossary.md)

## Referências da API

* [Sinopse](api/synopsis.md)
* [Processamento de Objeto](api/process.md)
* [Switches de Linha de Comando Suportadas](api/command-line-switches.md)
* [Variáveis de Ambiente](api/environment-variables.md)
* [Suporte para extensões do Chrome](api/extensions.md)
* [Grandes Alterações na API](breaking-changes.md)

### Elementos de DOM Personalizado:

* [Objeto `File`](api/file-object.md)
* [`<webview>` Tag](api/webview-tag.md)
* [Função `window.open`](api/window-open.md)
* [`BrowserWindowProxy` Object](api/browser-window-proxy.md)

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
* [netLog](api/net-log.md)
* [Notificação](api/notification.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [screen](api/screen.md)
* [session](api/session.md)
* [systemPreferences](api/system-preferences.md)
* [TouchBar](api/touch-bar.md)
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
* [shell](api/shell.md)

## Desenvolvimento

Veja [development/README.md](development/README.md)
