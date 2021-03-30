---
title: Electron 7.0.0
author:
  - sofiangria
  - ckerr
date: '2019-10-22'
---

Electron 7.0.0 foi lançado! Isso inclui atualizações para o Chromium 78, V8 7.8 e Node.js 12.8.1. Adicionamos uma janela no Arm 64, métodos IPC mais rápidos, um novo `nativeTheme` API, e muito mais!

---

A equipe do Electron está animada para anunciar a versão do Electron 7.0.0! Você pode instalá-lo com o npm via `npm install electron@latest` ou baixá-lo em nosso [releases website](https://electronjs.org/releases/stable). A versão está cheia de atualizações, correções e novas funcionalidades. Mal podemos esperar para ver o que vocês construem com eles! Continue lendo para mais detalhes sobre esta versão, por favor compartilhe qualquer comentário que você tem!

## Mudanças notáveis
 * Stack Upgrades:

   | Pilha   | Versão do Electron 6 | Versão no Electron 7 | Novidades                                                                                                                                                                                                                                                                 |
   |:------- |:-------------------- |:-------------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Crômio  | 76.0.3809.146        | **78.0.3905.1**      | [77](https://developers.google.com/web/updates/2019/09/nic77), [78](https://developers.google.com/web/updates/2019/10/nic78)                                                                                                                                              |
   | V8      | 7.6                  | **7.8**              | [7.7](https://v8.dev/blog/v8-release-77), [7.8](https://v8.dev/blog/v8-release-78)                                                                                                                                                                                        |
   | Node.js | 12.4.0               | **12.8.1**           | [12.5](https://nodejs.org/en/blog/release/v12.5.0/), [12.6](https://nodejs.org/en/blog/release/v12.6.0/), [12.7](https://nodejs.org/en/blog/release/v12.7.0/), [12.8](https://nodejs.org/en/blog/release/v12.8.0/), [12.8.1](https://nodejs.org/en/blog/release/v12.8.1/) |
 * Adicionado o lançamento do Windows em Arm (64 bits). [#18591](https://github.com/electron/electron/pull/18591), [#20112](https://github.com/electron/electron/pull/20112)
 * Adicionado `ipcRenderer.invoke()` e `ipcMain.handle()` para IP assíncrono de request/resposta estilo IPC. Estes são fortemente recomendados no módulo `remoto`. Veja este "[o módulo 'remoto' do Electron considerado nocivo](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31)para mais informações. [#18449](https://github.com/electron/electron/pull/18449)
 * Adicionado `nativeTheme` API para ler e responder a alterações no tema e no esquema de cores do SO. [#19758](https://github.com/electron/electron/pull/19758), [#20486](https://github.com/electron/electron/pull/20486)
 * Alternado para um novo gerador [de definições do TypeScript](https://github.com/electron/docs-parser). As definições resultantes são mais precisas; então se o build do TypeScript falhar, essa é a causa provável. [#18103](https://github.com/electron/electron/pull/18103)

Veja as [notas de lançamento 7.0.0](https://github.com/electron/electron/releases/tag/v7.0.0) para obter uma lista mais longa de alterações.

## Breaking Changes

More information about these and future changes can be found on the [Planned Breaking Changes](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md) page.

 * APIs obsoletas removidas:
     * Versões baseadas em chamadas de funções que agora usam Promises. [#17907](https://github.com/electron/electron/pull/17907)
     * `Tray.setHighlightMode()` (macOS). [#18981](https://github.com/electron/electron/pull/18981)
     * `app.enableMixedSandbox()` [#17894](https://github.com/electron/electron/pull/17894)
     * `app.getApplicationMenu()`, ,
     * `app.setApplicationMenu()`, ,
     * `powerMonitor.querySystemIdleState()`, ,
     * `powerMonitor.querySystemIdleTime()`, ,
     * `webFrame.setIsolatedWorldContentSecurityPolicy()`, </code>,
     * `webFrame.setIsolatedWorldHumanReadableName()`,
     * `webFrame.setIsolatedWorldSecurityOrigin()` [#18159](https://github.com/electron/electron/pull/18159)
 * `Session.clearAuthCache()` não permite mais filtrar as entradas de cache limpadas. [#17970](https://github.com/electron/electron/pull/17970)
 * Interfaces nativas no macOS (menus, diálogos, etc.) agora correspondem automaticamente à configuração do modo escuro na máquina do usuário. [#19226](https://github.com/electron/electron/pull/19226)
 * Atualizado o módulo `electron` para usar `@electron/get`.  A versão mínima do nó suportada agora é o Node 8. [#18413](https://github.com/electron/electron/pull/18413)
 * O arquivo `electron.asar` não existe mais. Quaisquer scripts de embalagem que dependam de sua existência devem ser atualizados. [#18577](https://github.com/electron/electron/pull/18577)

## Fim do suporte para 4.x.y

Electron 4.x.y atingiu end-of-support de acordo com a [política de suporte do projeto](https://electronjs.org/docs/tutorial/support#supported-versions). Desenvolvedores e aplicativos são encorajados a atualizar para uma versão mais recente do Electron.

## Programa de Feedback de Aplicativos

Continuamos a usar nosso [Programa de Feedback de Aplicativos](https://electronjs.org/blog/app-feedback-program) para testes. Projetos que participam deste programa testam as apostas do Electron em seus aplicativos; e em troca, os novos bugs encontrados são priorizados para a versão estável. Se você gostaria de participar ou aprender mais, [confira nossa postagem no blog sobre o programa](https://electronjs.org/blog/app-feedback-program).

## Próximos passos

No curto prazo você pode esperar que a equipe continue focando em acompanhar o desenvolvimento dos principais componentes que compõem o Electron, incluindo Chromium, Node e V8. Embora tenhamos o cuidado de não fazer promessas sobre datas de lançamento, nosso plano é lançar novas versões principais do Electron com novas versões desses componentes aproximadamente trimestralmente. O cronograma [tentativo 8.0.0](https://electronjs.org/docs/tutorial/electron-timelines) mapeia as principais datas do ciclo de vida do Electron 8. Além disso, [veja o nosso documento de versão](https://electronjs.org/docs/tutorial/electron-versioning) para informações mais detalhadas sobre versão no Electron.

Para informações sobre mudanças planejadas em futuras versões do Electron, [veja nosso Documento de Interrupção Planejada (Alterações de Abertura)](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
