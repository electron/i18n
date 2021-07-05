# Guia Oficial

Certifique-se de usar a documentação correspondente a versão do Electron que você esta usando. A versão faz parte da URL desta página. Se não, você provavelmente esta usando a documentação da branch de desenvolvimento qual pode conter mudanças da API que pode não ser compatível com a sua versão do Electron. Para ver a documentação de versões anteriores, você pode [procurar pelas tags](https://github.com/electron/electron/tree/v1.4.0) no GitHub, para isso, abra o menu "Switch branches/tags" e selecione a tag da versão que você gostaria de ver.

## Perguntas Frequentes

Há perguntas que são muitas vezes feitas. Dê uma olhada nisso antes de criar uma issue:

* [Perguntas Frequentes no Electron](faq.md)

## Guias e Tutoriais

### Introdução

* [Introdução](tutorial/introduction.md)
* [Início Rápido](tutorial/quick-start.md)
* [Modelos de Processo](tutorial/process-model.md)

### Aprendendo os conceitos básicos

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
  * [Modo escuro](tutorial/dark-mode.md)
  * [Incorporações da Web no Electron](tutorial/web-embeds.md)
* [Boilerplates e CLIs](tutorial/boilerplates-and-clis.md)
  * [Boilerplate vs CLI](tutorial/boilerplates-and-clis.md#boilerplate-vs-cli)
  * [electron-forge](tutorial/boilerplates-and-clis.md#electron-forge)
  * [electron-builder](tutorial/boilerplates-and-clis.md#electron-builder)
  * [electron-react-boilerplate](tutorial/boilerplates-and-clis.md#electron-react-boilerplate)
  * [Outras Ferramentas e Boilerplates](tutorial/boilerplates-and-clis.md#other-tools-and-boilerplates)

### Etapas avançadas

* Arquitetura do Aplicativo
  * [Usando Módulos Nativos do Node.js](tutorial/using-native-node-modules.md)
  * [Estratégias de Performance](tutorial/performance.md)
  * [Estratégias de segurança](tutorial/security.md)
  * [Process Sandboxing](tutorial/sandbox.md)
* [Acessibilidade](tutorial/accessibility.md)
  * [Habilitar manualmente Recursos de Acessibilidade](tutorial/accessibility.md#manually-enabling-accessibility-features)
* [Teste e Depuração](tutorial/application-debugging.md)
  * [O Processo Principal de Depuração](tutorial/debugging-main-process.md)
  * [Depuração com Visual Studio Code](tutorial/debugging-vscode.md)
  * [Usando Selenium e WebDriver](tutorial/using-selenium-and-webdriver.md)
  * [Testando em sistemas de CI (Travis, Jenkins)](tutorial/testing-on-headless-ci.md)
  * [Extensão de DevTools](tutorial/devtools-extension.md)
  * [Testando Automatizado com um Driver Personalizado](tutorial/automated-testing-with-a-custom-driver.md)
  * [REPL](tutorial/repl.md)
* [Distribuição](tutorial/application-distribution.md)
  * [Plataformas Suportadas](tutorial/support.md#supported-platforms)
  * [Assinando Código](tutorial/code-signing.md)
  * [Mac App Store](tutorial/mac-app-store-submission-guide.md)
  * [Windows Store](tutorial/windows-store-guide.md)
  * [Snapcraft](tutorial/snapcraft.md)
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
* [Testando Widevine CCDM](tutorial/testing-widevine-cdm.md)

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
* [MessageChannelMain](api/message-channel-main.md)
* [MessagePortMain](api/message-port-main.md)
* [net](api/net.md)
* [netLog](api/net-log.md)
* [nativoTheme](api/native-theme.md)
* [Notificação](api/notification.md)
* [powerMonitor](api/power-monitor.md)
* [powerSaveBlocker](api/power-save-blocker.md)
* [protocol](api/protocol.md)
* [screen](api/screen.md)
* [session](api/session.md)
* [ShareMenu](api/share-menu.md)
* [systemPreferences](api/system-preferences.md)
* [TouchBar](api/touch-bar.md)
* [Tray](api/tray.md)
* [webContents](api/web-contents.md)
* [webFrameMain](api/web-frame-main.md)

### Módulos para o Processo de Renderização (Página Web):

* [contextBridge](api/context-bridge.md)
* [ipcRenderer](api/ipc-renderer.md)
* [webFrame](api/web-frame.md)

### Módulos para Ambos os Processos:

* [clipboard](api/clipboard.md)
* [crashReporter](api/crash-reporter.md)
* [desktopCapturer](api/desktop-capturer.md)
* [nativeImage](api/native-image.md)
* [shell](api/shell.md)

## Desenvolvimento

Veja [development/README.md](development/README.md)
