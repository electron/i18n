---
title: Electron 6.0.0
author:
  - sofiangria
  - ckerr
  - codebytere
date: '2019-07-30'
---

A equipe do Electron está animada para anunciar a versão do Electron 6.0.0! Você pode instalá-lo com o npm via `npm install electron@latest` ou baixá-lo em nosso [releases website](https://electronjs.org/releases/stable). A versão está cheia de atualizações, correções e novas funcionalidades. Mal podemos esperar para ver o que vocês construem com eles! Continue lendo para mais detalhes sobre esta versão, por favor compartilhe qualquer comentário que você tem!

---

## Novidades

Hoje marca o primeiro para o projeto Electron: é a primeira vez que fazemos uma versão estável do Electron **no mesmo dia** como a correspondente versão do [Chrome estável](https://www.chromestatus.com/features/schedule)! 🎉

Grande parte da funcionalidade do Electron é fornecida pelos componentes principais do Chromium, Node.js e V8. O Electron continua atualizado com esses projetos para fornecer novos recursos de JavaScript, melhorias de performance e correções de segurança. Cada um desses pacotes tem um inchaço de versão principal no Electron 6:

- Chromium `76.0.3809.88`
  - [Novo em 74](https://developers.google.com/web/updates/2019/04/nic74)
  - [Novo em 75](https://developers.google.com/web/updates/2019/06/nic75)
  - [Novidades em 76](https://developers.google.com/web/updates/2019/07/nic76)
- Node.js `12.4.0`
  - [Node 12.4.0 post de blog](https://nodejs.org/en/blog/release/v12.4.0/)
- V8 `7.6.303.22`
    - [V8 7.6 post no blog](https://v8.dev/blog/v8-release-76)

Esta versão também inclui melhorias nas APIs do Electron. [As notas de lançamento](https://github.com/electron/electron/releases/tag/v6.0.0) têm uma lista mais completa, mas aqui estão os destaques:

### Promisification

Electron 6.0 continua a iniciativa de [modernização](https://github.com/electron/electron/blob/master/docs/api/modernization/promisification.md) iniciada em 5.0 para melhorar o suporte de [Promessa](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).

Essas funções agora retornam Promises e ainda suportam chamada de callback mais antiga:
 * `contentTracing.getCategories()` [#16583](https://github.com/electron/electron/pull/16583)
 * `contentTracing.getCategories()` [#16583](https://github.com/electron/electron/pull/16583)
 * `contentTracing.getTraceBufferUsage()` [#16600](https://github.com/electron/electron/pull/16600)
 * `contents.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
 * `cookies.flushStore()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.get()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.remove()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.set()` [#16464](https://github.com/electron/electron/pull/16464)
 * `dialog.showCertificateTrustDialog()` [#17181](https://github.com/electron/electron/pull/17181)
 * `inAppPurchase.getProducts()` [#17355](https://github.com/electron/electron/pull/17355)
 * `inAppPurchase.purchaseProduct()`[#17355](https://github.com/electron/electron/pull/17355)
 * `netLog.stopLogging()` [#16862](https://github.com/electron/electron/pull/16862)
 * `session.clearAuthCache()` [#17259](https://github.com/electron/electron/pull/17259)
 * `session.clearCache()`  [#17185](https://github.com/electron/electron/pull/17185)
 * `session.clearHostResolverCache()` [#17229](https://github.com/electron/electron/pull/17229)
 * `session.clearStorageData()` [#17249](https://github.com/electron/electron/pull/17249)
 * `session.getBlobData()` [#17303](https://github.com/electron/electron/pull/17303)
 * `session.getCacheSize()`  [#17185](https://github.com/electron/electron/pull/17185)
 * `session.resolveProxy()` [#17222](https://github.com/electron/electron/pull/17222)
 * `session.setProxy()`  [#17222](https://github.com/electron/electron/pull/17222)
 * `webContents.hasServiceWorker()` [#16535](https://github.com/electron/electron/pull/16535)
 * `webContents.printToPDF()` [#16795](https://github.com/electron/electron/pull/16795)
 * `webContents.savePage()` [#16742](https://github.com/electron/electron/pull/16742)
 * `webFrame.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
 * `webFrame.executeJavaScriptInIsolatedWorld()` [#17312](https://github.com/electron/electron/pull/17312)
 * `webviewTag.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)

Essas funções agora têm duas formas, sincronizadas e baseadas em Promiss:
 * `dialog.showMessageBox()`/`dialog.showMessageBoxSync()` [#17298](https://github.com/electron/electron/pull/17298)
 * `dialog.showOpenDialog()`/`dialog.showOpenDialogSync()` [#16973](https://github.com/electron/electron/pull/16973)
 * `dialog.showSaveDialog()`/`dialog.showSaveDialogSync()` [#17054](https://github.com/electron/electron/pull/17054)

Essas funções agora retornam Promessas:
 * `app.dock.show()` [#16904](https://github.com/electron/electron/pull/16904)

### `Electron Helper (Renderer).app`, `Electron Helper (GPU).app` e `Electron Helper (Plugin).app`

Para habilitar o [endurecido tempo de execução](https://developer.apple.com/documentation/security/hardened_runtime_entitlements?language=objc), o que restringe coisas como gravável executável memória e carregamento de código assinado por um ID de equipe diferente, a assinatura de código especial teve de ser concedida ao Helper.

Para manter esses direitos escopos para os tipos de processo que os exigem, Chromium [adicionado](https://chromium-review.googlesource.com/c/chromium/src/+/1627456) três novas variantes do aplicativo de ajuda: uma para renderizadores (`Helper Electron (Renderer). pp`), um para o processo da GPU (`Electron Helper (GPU). pp`) e um para plugins (`Electron Helper (Plugin).app`).

Pessoas que usam `electron-osx-sign` para co-projetar seus aplicativos Electron não devem ter que fazer nenhuma alteração na lógica de compilação. Se você estiver codificando seu aplicativo com scripts personalizados, você deve garantir que as três novas aplicações de ajuda sejam projetadas corretamente.

Para empacotar sua aplicação corretamente com esses novos auxiliares, você precisa usar o `electron-packager@14.0.4` ou superior.  Se você estiver usando o `electron-builder` você deve seguir [esta questão](https://github.com/electron-userland/electron-builder/issues/4104) para rastrear o suporte para estes novos ajudantes.

## Breaking Changes

 * Esta versão começa a lançar as bases para uma futura exigência de que módulos nativos do Node carregados no processo de renderização sejam [N-API](https://nodejs.org/api/n-api.html) ou [Contexto Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). As razões para esta mudança são um desempenho mais rápido, maior segurança e redução da carga de manutenção. Leia todos os detalhes, incluindo a linha do tempo proposta [nesse problema](https://github.com/electron/electron/issues/18397). Esta alteração deverá ser concluída no Electron v11.

 * `Os cabeçalhos` net.IncomingMessage [mudaram levemente](https://github.com/electron/electron/pull/17517#issue-263752903) para corresponder mais estreitamente ao [Node. Comportamento s](https://nodejs.org/api/http.html#http_message_headers), particularmente com o valor de `set-cookie` e como os cabeçalhos duplicados são tratados. [#17517](https://github.com/electron/electron/pull/17517).

 * `shell.showItemInFolder()` agora retorna void e é uma chamada assíncrona. [#17121](https://github.com/electron/electron/pull/17121)

 * Agora os aplicativos devem definir explicitamente um caminho de log ao chamar a nova função `app.setAppLogPath()` antes de usar `app.getPath('log')`. [#17841](https://github.com/electron/electron/pull/17841)

## Fim do suporte para a 3.x.y

Por nossa [política de suporte](https://electronjs.org/docs/tutorial/support#supported-versions), 3.x.y chegou ao fim de vida. Desenvolvedores e aplicativos são encorajados a atualizar para uma versão mais recente do Electron.

## Programa de Feedback de Aplicativos

Continuamos usando nosso [Programa de Feedback de Aplicativos](https://electronjs.org/blog/app-feedback-program) para testes. Projetos que participam deste programa testam as apostas do Electron em seus aplicativos; e, em troca, os novos bugs que eles encontram são priorizados para a versão estável. Se você gostaria de participar ou aprender mais, [confira nossa postagem no blog sobre o programa](https://electronjs.org/blog/app-feedback-program).

## Próximos passos

No curto prazo você pode esperar que a equipe continue focando em acompanhar o desenvolvimento dos principais componentes que compõem o Electron, incluindo Chromium, Node e V8. Embora tenhamos o cuidado de não fazer promessas sobre datas de lançamento, nosso plano é lançar novas versões principais do Electron com novas versões desses componentes aproximadamente trimestralmente. O [agendamento tentativo de 7.0.0](https://electronjs.org/docs/tutorial/electron-timelines) mapeia as datas chave no ciclo de vida de desenvolvimento do Electron 7. Além disso, [veja o nosso documento de versão](https://electronjs.org/docs/tutorial/electron-versioning) para informações mais detalhadas sobre versão no Electron.

Para informações sobre mudanças planejadas em futuras versões do Electron, [veja nosso Documento de Interrupção Planejada (Alterações de Abertura)](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
