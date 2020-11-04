---
title: Electron 8.0.0
author:
  - jkleinsc
  - sofiangria
date: '2020-02-04'
---

Electron 8.0.0 foi lançado! Isso inclui atualizações para o Chromium `80`, V8 `8.0`e Node.js `12.13.0`. Adicionamos o verificador ortográfico integrado do Chrome, e muito mais!

---

A equipe do Electron está animada para anunciar a versão do Electron 8.0.0! Você pode instalá-lo com o npm via `npm install electron@latest` ou baixá-lo em nosso [releases website](https://electronjs.org/releases/stable). A versão está cheia de atualizações, correções e novas funcionalidades. Mal podemos esperar para ver o que vocês construem com eles! Continue lendo para mais detalhes sobre esta versão, por favor compartilhe qualquer comentário que você tem!

## Mudanças notáveis

### Alterações de Pilha
* Chromium `0.0.3987.86`
    * [Novo no Chrome 79](https://developers.google.com/web/updates/2019/12/nic79)
    * [Novo no Chrome 80](https://chromereleases.googleblog.com/2020/02/stable-channel-update-for-desktop.html)
* Node.js `12.13.0`
    * [Node 12.13.0 post de blog](https://nodejs.org/en/blog/release/v12.13.0/)
* V8 `8.0`
    * [V8 7.9 post no blog](https://v8.dev/blog/v8-release-79)
    * [Postagem no blog V8 8.0](https://v8.dev/blog/v8-release-80)

### Destacar recursos
* Uso implementado do recurso de corretor ortográfico integrado do Chrome. Veja mais detalhes em [#20692](https://github.com/electron/electron/pull/20692) e [#21266](https://github.com/electron/electron/pull/21266).
* A comunicação IPC agora usa o Algoritmo de Clone Estruturado da v8. Isto é mais rápido, mais característico e menos surpreendente do que a lógica atual, e traz um aumento de desempenho de 2x para grandes buffers e objetos complexos. A latência de mensagens pequenas não é significativamente afetada. Veja mais detalhes em [#20214](https://github.com/electron/electron/pull/20214).

Veja as [notas de lançamento 8.0.0](https://github.com/electron/electron/releases/tag/v8.0.0) para uma lista completa de novos recursos e alterações.

## Breaking Changes

* Mostrar nome do módulo no aviso de depreciação para módulos de contexto. [#21952](https://github.com/electron/electron/pull/21952)
    * Este é o trabalho continuado para futuros requisitos de que módulos nativos de nó carregados no processo de renderização sejam [N-API](https://nodejs.org/api/n-api.html) ou [Contexto Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Informações completas e linha do tempo proposta é detalhado em [esse problema](https://github.com/electron/electron/issues/18397).
* Os valores enviados sobre o IPC agora são serializados com o Algoritmo de Clone estruturado.  [#20214](https://github.com/electron/electron/pull/20214)
* A renderização fora da tela está desabilitada devido à falta de um mantenedor para trabalhar neste recurso.  Irrompeu durante a actualização do Chromium e foi desativada posteriormente. [#20772](https://github.com/electron/electron/issues/20772)

More information about these and future changes can be found on the [Planned Breaking Changes](https://github.com/electron/electron/blob/master/docs/breaking-changes.md) page.

## Alterações de API
* `aplicação` Alterações na API:
    * Adicionado `app.getApplicationNameForProtocol(url)`. [#20399](https://github.com/electron/electron/pull/20399)
    * Adicionado o suporte `app.showAboutPanel()` e `app.setAboutPanelOptions(opcions)` no Windows. [#19420](https://github.com/electron/electron/pull/19420)
* `BrowserWindow` Alterações na API:
    * Documentação atualizada para notar que as opções `hasShadow` estão disponíveis em todas as plataformas [#20038](https://github.com/electron/electron/pull/20038)
    * Adicionada opção `trafficLightPosition` nas opções de BrowserWindow para permitir posicionamento personalizado dos botões de semáforo. [#21781](https://github.com/electron/electron/pull/21781)
    * Adicionado opção `accessibleTitle` para definir o título da janela de navegação acessível [#19698](https://github.com/electron/electron/pull/19698)
    * `BrowserWindow.fromWebContents()` agora pode retornar nulo [#19983](https://github.com/electron/electron/pull/19983)
    * Adicionado `BrowserWindow.getMediaSourceId()` e `BrowserWindow.moveAbove(mediaSourceId)`. [#18926](https://github.com/electron/electron/pull/18926)
    * Adicionado suporte para o evento `will-move` no macOS. [#19641](https://github.com/electron/electron/pull/19641)
* Documentado previamente não documentado `crashReporter.getCrashesDirectory()`. . [#20417](https://github.com/electron/electron/pull/20417)
* `dialog` Alterações na API:
    * Adicionado a propriedade `dontAddToRecentes` para diálogo `dialog.showOpenDialog` e `diálogo. howOpenDialogSync` para evitar que documentos sejam adicionados a documentos recentes no Windows em diálogos abertos. [#19669](https://github.com/electron/electron/pull/19669)
    * Personalização de propriedade adicionada para `dialog.showSaveDialog` e `dialog.showSaveDialogSync`. [#19672](https://github.com/electron/electron/pull/19672)
* `Notificação` Alterações na API:
    * Adicionada a opção `timeoutType` para permitir que usuários de Linux/Windows definam o tipo de tempo limite de notificação. [#20153](https://github.com/electron/electron/pull/20153)
    * Adicionada a opção `urgência`  para definir urgência nas notificações do Linux. [#20152](https://github.com/electron/electron/pull/20152)
* `sessão` Alterações API:
    * Documentação atualizada em `session.setProxy(config)` e `session.setCertificateVerifyProc(proc)` para notar opções opcionais. [#19604](https://github.com/electron/electron/pull/19604)
    * Adicionado `session.downloadURL(url)` para permitir acionar downloads sem um BrowserWindow. [#19889](https://github.com/electron/electron/pull/19889)
    * Suporte adicionado para pré-conectar dicas de recursos HTTP através de `session.preconnect(options)` e do evento `pré-conectar`. [#18671](http://github.com/electron/electron/pull/18671)
    * Adicionado `session.addWordToSpellCheckerDictionary` para permitir palavras personalizadas no dicionário [#21297](http://github.com/electron/electron/pull/21297)
* Adicionada opção para `shell.moveItemToTrash(fullPath[, deleteOnFail])` no macOS para especificar o que acontece quando moveItemToTrash falha. [#19700](https://github.com/electron/electron/pull/19700)
* `systemPreferences` Alterações na API:
    * Documentação</code> atualizada de `systemPreferences.getColor(color) para macOS. <a href="https://github.com/electron/electron/pull/20611">#20611</a></li>
<li>Added <code>screen` media type to `systemPreferences.getMediaAccessStatus()`. [#20764](https://github.com/electron/electron/pull/20764)
* Adicionado `nativeTheme.themeSource` para permitir que aplicativos substituam o Chromium e a escolha do tema do SO. [#19960](https://github.com/electron/electron/pull/19960)
* Mudanças na API do Touchbar:
    * Added `accessibilityLabel` property to `TouchBarButton` and `TouchBarLabel` to improve TouchBarButton/TouchBarLabel accessibility. [#20454](https://github.com/electron/electron/pull/20454)
    * Documentação relacionada ao TouchBar atualizada [#19444](https://github.com/electron/electron/pull/19444)
* `bandeja` Alterações na API:
    * Adicionadas novas opções para `tray.displayBalloon()`: `iconType`, `largeIcon`, `noSound` e `respeitoTime`. [#19544](https://github.com/electron/electron/pull/19544)
    * Adicionado bandeja.removeBalão(), que remove uma notificação de balão já exibida. [#19547](https://github.com/electron/electron/pull/19547)
    * Adicionado tray.focus(), que retorna foco para a área de notificação da barra de tarefas. feat: adicione tray.focus() [#19548](https://github.com/electron/electron/pull/19548)
* `Conteúdo web` Alterações de API:
    * Adicionado `contents.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])` para expor executeJavaScriptInsolatedWorld na webContents API. [#21190](https://github.com/electron/electron/pull/21190)
    * Métodos adicionados para capturar um webContents oculto. [#21679](https://github.com/electron/electron/pull/21679)
    * Opções adicionadas para `webContents.print([options], [callback])` para habilitar a personalização de cabeçalhos e rodapés de página de impressão. [#19688](https://github.com/electron/electron/pull/19688)
    * Adicionada a capacidade de inspecionar trabalhadores compartilhados específicos via `webContents.getAllSharedWorkers()` e `webContents.inspectSharedWorkerById(workerId)`. [#20389](https://github.com/electron/electron/pull/20389)
    * Adicionado suporte a `fitToPageEnabled` e opções `scaleFactor` em WebContents.printToPDF(). [#20436](https://github.com/electron/electron/pull/20436)
* Documentação de `webview.printToPDF` atualizada para indicar o tipo de retorno agora é Uint8Array. [#20505](https://github.com/electron/electron/pull/20505)

### APIs Descontinuadas
As seguintes APIs estão obsoletas:
* Obsoleto a opção não funcional `visibleOnFullScreen` dentro da opção `BrowserWindow.setVisibleOnAllWorkspaces` antes da sua remoção na próxima versão principal do lançamento. [#21732](https://github.com/electron/electron/pull/21732)
* Obsoleto `alternate-selected-control-text` em `systemPreferences.getColor(color)` para macOS. [#20611](https://github.com/electron/electron/pull/20611)
* Obsoleto `setLayoutZoomLevelLimits` em `webContents`, `webFrame`, e `<webview> Tag` porque Chromium removeu este recurso. [#21296](https://github.com/electron/electron/pull/21296)
* O valor padrão de `false` para `app.allowRendererProcessReuse` está obsoleto. [#21287](https://github.com/electron/electron/pull/21287)
* Descontinuado `<webview>.getWebContents()` como depende do módulo remoto. [#20726](https://github.com/electron/electron/pull/20726)

## Fim do suporte para 5.x.y

Electron 5.x.y atingiu end-of-support de acordo com a [política de suporte do projeto](https://electronjs.org/docs/tutorial/support#supported-versions). Desenvolvedores e aplicativos são encorajados a atualizar para uma versão mais recente do Electron.

## Programa de Feedback de Aplicativos

Continuamos usando nosso [Programa de Feedback de Aplicativos](https://electronjs.org/blog/app-feedback-program) para testes. Projetos que participam deste programa testam as apostas do Electron em seus aplicativos; e, em troca, os novos bugs que eles encontram são priorizados para a versão estável. Se você gostaria de participar ou aprender mais, [confira nossa postagem no blog sobre o programa](https://electronjs.org/blog/app-feedback-program).

## Próximos passos

No curto prazo você pode esperar que a equipe continue focando em acompanhar o desenvolvimento dos principais componentes que compõem o Electron, incluindo Chromium, Node e V8. Embora tenhamos o cuidado de não fazer promessas sobre datas de lançamento, nosso plano é lançar novas versões principais do Electron com novas versões desses componentes aproximadamente trimestralmente. The [tentative 9.0.0 schedule](https://electronjs.org/docs/tutorial/electron-timelines) maps out key dates in the Electron 9 development life cycle. Além disso, [veja o nosso documento de versão](https://electronjs.org/docs/tutorial/electron-versioning) para informações mais detalhadas sobre versão no Electron.

Para informações sobre mudanças planejadas em futuras versões do Electron, [veja nosso Documento de Interrupção Planejada (Alterações de Abertura)](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Deprecation of `remote` Module (Starting in Electron 9)
Devido a sérios passivos de segurança, estamos iniciando planos para depreciar o módulo [`remoto`](https://www.electronjs.org/docs/api/remote) que começa com Electron 9. Você pode ler e acompanhar [esta issue](https://github.com/electron/electron/issues/21408) que detalha nossos motivos para isso e inclui uma linha temporal proposta para depreciação.
