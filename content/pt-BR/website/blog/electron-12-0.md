---
title: Elétron 12.0.0
author:
  - VerteDinde
  - mlaurencina
  - sofiangria
date: '2021-03-02'
---

O elétron 12.0.0 foi liberado! Inclui upgrades para chromium `89`, V8 `8.9` e Node.js `14.16`. Adicionamos alterações ao módulo remoto, novos padrões para o contextoIsolação, uma nova API webFrameMain e melhorias gerais. Leia abaixo para mais detalhes!

---

A equipe electron está animada para anunciar o lançamento de Electron 12.0.0! Você pode instalá-lo com o npm via `npm install electron@latest` ou baixá-lo em nosso [releases website](https://electronjs.org/releases/stable). Continue lendo para mais detalhes sobre esta versão, por favor compartilhe qualquer comentário que você tem!

## Mudanças notáveis

### Alterações de Pilha

* `89`de cromo
    * [Novidade no Chrome 88](https://developer.chrome.com/blog/new-in-chrome-88/)
    * [Novidade no Chrome 89](https://developer.chrome.com/blog/new-in-chrome-89/)
* Nó.js `14.16`
    * [Node 14.16.0 post no blog](https://nodejs.org/en/blog/release/v14.16.0/)
    * [Node 14.0.0 post no blog](https://nodejs.org/en/blog/release/v14.0.0/)
* V8 `8.9`
    * [V8 8.8 post no blog](https://v8.dev/blog/v8-release-88)
    * [V8 8.9 post no blog](https://v8.dev/blog/v8-release-89)

### Destacar recursos

* O método ContextBridge `exposeInMainWorld` agora pode expor APIs não-objeto. [#26834](https://github.com/electron/electron/pull/26834)
* Atualizado de Node 12 para Node 14. [#23249](https://github.com/electron/electron/pull/25249)
* Adicionou uma nova API `webFrameMain` para acessar subquadrados de uma instância `WebContents` do processo principal. [#25464](https://github.com/electron/electron/pull/25464)
* Os valores padrão de `contextIsolation` e `worldSafeExecuteJavaScript` estão agora `true`. [#27949](https://github.com/electron/electron/pull/27949) [#27502](https://github.com/electron/electron/pull/27502)

Veja as notas de versão [12.0.0](https://github.com/electron/electron/releases/tag/v12.0.0) para uma lista completa de novos recursos e alterações.

## Quebrando mudanças

* Preteriu o módulo `remote` . É substituído por [`@electron/remote`](https://github.com/electron/remote). [#25293](https://github.com/electron/electron/pull/25293)
    * Se você está usando o módulo `remote` , escrevemos [um guia para migrar para `@electron/remote` aqui.](https://github.com/electron/remote#migrating-from-remote)
* Alterou o valor padrão do `contextIsolation` para `true`. [#27949](https://github.com/electron/electron/pull/27949)
* Alterou o valor padrão do `worldSafeExecuteJavaScript` para `true`. [#27502](https://github.com/electron/electron/pull/27502)
* Alterou a inadimplência do `crashReporter.start({ compress })` de `false` para `true`. [#25288](https://github.com/electron/electron/pull/25288)
* Suporte ao Flash removido: O Cromo removeu o suporte ao Flash, que também foi removido no Elétron 12. Consulte [Flash Roadmap do Chromium](https://www.chromium.org/flash-roadmap) para obter mais detalhes.
* SSE3 obrigatório para Chrome no x86: O Chromium removeu o suporte para [cpUs x86 mais antigas que não atendem a um mínimo de suporte SSE3 (Streaming SIMD Extensions 3)](https://docs.google.com/document/d/1QUzL4MGNqX4wiLvukUwBf6FdCL35kCDoEJTm2wMkahw/edit#heading=h.7nki9mck5t64). Este suporte também foi removido no Elétron 12.

Mais informações sobre essas e futuras alterações podem ser encontradas na página [Desmembramento planejado](https://github.com/electron/electron/blob/master/docs/breaking-changes.md) .

## Alterações de API

* Adicionado `webFrameMain` API: O módulo `webFrameMain` pode ser usado para procurar quadros em todas as instâncias [`WebContents`](/docs/api/web-contents.md) existentes. Este é o principal processo equivalente à API webFrame existente. Mais informações sobre esta nova API podem ser encontradas [aqui](https://github.com/electron/electron/pull/25464), e em nossa documentação [](https://www.electronjs.org/docs/api/web-frame-main).
* `aplicação` Alterações na API:
    * Adicionado `serviceName` não localizados ao `'child-process-gone'` / `app.getAppMetrics()`. [#25975](https://github.com/electron/electron/pull/25975)
    * Adicionado novo `app.runningUnderRosettaTranslation` propriedade para detectar ao executar sob rosetta em silício Apple. [#26444](https://github.com/electron/electron/pull/26444)
    * Adicionado `exitCode` aos detalhes `render-process-gone` (app & webContents). [#27677](https://github.com/electron/electron/pull/27677)
* `BrowserWindow` Alterações na API:
    * Adicionado `BrowserWindow.isTabletMode()` API. [#25209](https://github.com/electron/electron/pull/25209)
    * Adicionado `resized` (Windows/macOS) e `moved` (Windows) eventos para `BrowserWindow`. [#26216](https://github.com/electron/electron/pull/26216)
    * Adicionado novo `system-context-menu` evento para permitir a prevenção e sobrepor o menu de contexto do sistema. [#25795](https://github.com/electron/electron/pull/25795)
    * Adicionado `win.setTopBrowserView()` para que `BrowserView`s possa ser levantado. [#27713](https://github.com/electron/electron/pull/27713)
    * Adicionado `webPreferences.preferredSizeMode` para permitir visualizações de dimensionamento de acordo com o tamanho mínimo de seu documento. [#25874](https://github.com/electron/electron/pull/25874)
* `contextBridge` alterações da API:
    * Permitiu que o ContextBridge `exposeInMainWorld` método para expor APIs não-objetos. [#26834](https://github.com/electron/electron/pull/26834)
* `display` alterações da API:
    * Adicionado `displayFrequency` propriedade ao objeto `Display` para permitir obter informações sobre a taxa de atualização no Windows. [#26472](https://github.com/electron/electron/pull/26472)
* `extensions` alterações da API:
    * Adicionou suporte a algumas APIs `chrome.management` . [#25098](https://github.com/electron/electron/pull/25098)
* `MenuItem` alterações da API:
    * Suporte adicional para mostrar menu de compartilhamento do macOS. [#25629](https://github.com/electron/electron/pull/25629)
* `net` alterações da API:
    * Adicionou uma nova opção de `credentials` para `net.request()`. [#25284](https://github.com/electron/electron/pull/25284)
    * Adicionado `net.online` para detectar se existe conexão com a internet atualmente. [#21004](https://github.com/electron/electron/pull/21004)
* `powerMonitor` alterações da API:
    * Adicionado `powerMonitor.onBatteryPower`. [#26494](https://github.com/electron/electron/pull/26494)
    * Adicionado evento de comutação rápida do usuário para powerMonitor no macOS. [#25321](https://github.com/electron/electron/pull/25321)
* `sessão` Alterações API:
    * Adicionada `allowFileAccess` opção para `ses.loadExtension()` API. [#27702](https://github.com/electron/electron/pull/27702)
    * Adicionada `display-capture` API para `session.setPermissionRequestHandler`. [#27696](https://github.com/electron/electron/pull/27696)
    * Adicionado uma opção `disabledCipherSuites` para `session.setSSLConfig`. [#25818](https://github.com/electron/electron/pull/25818)
    * Adicionado `extension-loaded`, `extension-unloaded`, e `extension-ready` eventos para `session`. [#25385](https://github.com/electron/electron/pull/25385)
    * Adicionado `session.setSSLConfig()` para permitir a configuração de SSL. [#25461](https://github.com/electron/electron/pull/25461)
    * Suporte adicionado para especificar explicitamente `direct`, modos `auto_detect` ou `system` em `session.setProxy()`. [#24937](https://github.com/electron/electron/pull/24937)
    * Adicionado [suporte](https://web.dev/serial/) de API serial. [#25237](https://github.com/electron/electron/pull/25237)
    * ApIs adicionadas para ativar/desativar o verificador ortografal. [#26276](https://github.com/electron/electron/pull/26276)
* `shell` Alterações na API:
    * Adicionou uma nova API assíncroniva `shell.trashItem()` , substituindo a `shell.moveItemToTrash()`síncronia . [#25114](https://github.com/electron/electron/pull/25114)
* `Conteúdo web` Alterações de API:
    * Adicionou uma pequena dica de console para console para ajudar a depurar falhas do renderizador. [#25317](https://github.com/electron/electron/pull/25317)
    * Adicionadas `frame` e propriedades `webContents` aos objetos de detalhes nos manipuladores webRequest. [#27334](https://github.com/electron/electron/pull/27334)
    * Adicionado `webContents.forcefullyCrashRenderer()` para encerrar com força um processo de renderização para ajudar na recuperação de um renderizador pendurado. [#25580](https://github.com/electron/electron/pull/25580)
    * Added `setWindowOpenHandler` API for renderer-created child windows, and deprecate `new-window` event. [#24517](https://github.com/electron/electron/pull/24517)
* `webFrame` API changes:
    * Added spellcheck API to renderer. [#25060](https://github.com/electron/electron/pull/25060)

### Removed/Deprecated Changes

The following APIs have been removed or are now deprecated:

* Preteriu o módulo `remote` . É substituído por [`@electron/remote`](https://github.com/electron/remote). [#25293](https://github.com/electron/electron/pull/25293)
* Removed deprecated `crashReporter` APIs. [#26709](https://github.com/electron/electron/pull/26709)
* Removed links to the Electron website from the default 'Help' menu in packaged apps. [#25831](https://github.com/electron/electron/pull/25831)

## End of Support for 9.x.y

Electron 9.x.y has reached end-of-support as per the project's [support policy](https://electronjs.org/docs/tutorial/support#supported-versions). Desenvolvedores e aplicativos são encorajados a atualizar para uma versão mais recente do Electron.

## Próximos passos

No curto prazo você pode esperar que a equipe continue focando em acompanhar o desenvolvimento dos principais componentes que compõem o Electron, incluindo Chromium, Node e V8. Embora tenhamos o cuidado de não fazer promessas sobre datas de lançamento, nosso plano é lançar novas versões principais do Electron com novas versões desses componentes aproximadamente trimestralmente. The [tentative 13.0.0 schedule](https://electronjs.org/docs/tutorial/electron-timelines) maps out key dates in the Electron 13.0 development life cycle. Além disso, [veja o nosso documento de versão](https://electronjs.org/docs/tutorial/electron-versioning) para informações mais detalhadas sobre versão no Electron.

Para informações sobre mudanças planejadas em futuras versões do Electron, [veja nosso Documento de Interrupção Planejada (Alterações de Abertura)](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).
