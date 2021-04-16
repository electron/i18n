---
title: Electron 5.0.0
author:
  - BinaryMuse
  - ckerr
  - jkleinsc
date: '2019-04-23'
---

A equipe do Electron está animada para anunciar a versão do Electron 5.0.0! Você pode instalá-lo com o npm via `npm install electron@latest` ou baixar as tarballs [da nossa página de lançamentos](https://github.com/electron/electron/releases/tag/v5.0.0). A versão está cheia de atualizações, correções e novas funcionalidades. Mal podemos esperar para ver o que vocês construem com eles! Continue lendo para mais detalhes sobre esta versão, por favor compartilhe qualquer comentário que você tem!

---

## Quais as novidades?

Grande parte da funcionalidade do Electron é fornecida pelos componentes principais do Chromium, Node.js e V8. O Electron continua atualizado com esses projetos para fornecer novos recursos de JavaScript, melhorias de performance e correções de segurança. Cada um desses pacotes tem um inchaço de versão principal no Electron 5:

- Chromium `73.0.3683.119`
  - [Novidades em 70](https://developers.google.com/web/updates/2018/10/nic70)
  - [Novo em 71](https://developers.google.com/web/updates/2018/12/nic71)
  - [Novidades em 72](https://developers.google.com/web/updates/2019/01/nic72)
  - [Novo em 73](https://developers.google.com/web/updates/2019/03/nic73)
- Node.js `12.0.0`
  - [Post de blog do nó 12](https://nodejs.org/en/blog/release/v12.0.0/)
- V8 `7.3.492.27`.
  - [Novos Recursos JS](https://twitter.com/mathias/status/1120700101637353473)

Electron 5 também inclui melhorias de APIs específicas da Electron. Um resumo das principais mudanças é abaixo; para a lista completa de mudanças, confira as [notas de versão do Electron v5.0.0](https://github.com/electron/electron/releases/tag/v5.0.0).

### Promisification

Electron 5 continua [iniciativa Promisification](https://github.com/electron/electron/blob/5-0-x/docs/api/promisification.md) para converter API baseada em callback do Electron para usar Promisification Promises. Estas APIs foram convertidas para Electron 5:
* `app.getFileIcon`
* `contentTracing.getCategories`
* `contentRastreamento.startRecording`
* `contenttracing.stopRecording`
* `debugger.sendCommand`
* API de cookies
* `shell.openExterno`
* `webContents.loadFile`
* `webContents.loadURL`
* `webContents.zoomLevel`
* `webContents.zoomFactor`
* `Página_ganhoCaptura`

### Acesso às cores do sistema para macOS

Essas funções foram alteradas ou adicionadas ao `systemPreferences` para acessar as cores dos sistemas macOS:
* `systemPreferences.getAccentColor`
* `systemPreferences.getColor`
* `.getSystemColor`

### Processar informações de memória

A função `process.getProcessMemoryInfo` foi adicionada para obter as estatísticas de uso de memória sobre o processo atual.

### Filtragem adicional para APIs remotas

Para melhorar a segurança na API</code> remoto `, novos eventos remotos foram adicionados para que <code>o controle remoto. etemine`, `remoto. etCurrentWindow`, `remote.getCurrentWebContents` e `<webview>.getWebContents` pode ser [filtrado](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#13-disable-or-limit-creation-of-new-windows).

### Múltiplos BrowserViews na Janela do Navegador

Agora é possível gerenciar vários BrowserViews dentro do mesmo BrowserWindow.

## Breaking Changes

### Padrão para aplicativos empacotados

Os apps empacotados agora se comportam do mesmo modo que o aplicativo padrão: um menu de aplicativos padrão será criado a não ser que o aplicativo tenha um e o evento `de abertura de janelas` será automaticamente manipulado a menos que o aplicativo manipule os eventos.

### Misto de areia

O modo de sandbox misturado agora está ativado por padrão. Renderizadores iniciados com `sandbox: verdadeiro` agora será realmente sandboxed, onde anteriormente só seriam sandboxed se o modo mixed-sandbox também fosse ativado.

### Melhorias de segurança
Os valores padrão de `nodeIntegration` e `webviewTag` agora são `falsos` para melhorar a segurança.

### Corretor ortográfico agora assíncrono

A API SpellCheck foi alterada para fornecer [resultados assíncronos](https://github.com/electron/electron/blob/5-0-x/docs/api/web-frame.md#webframesetspellcheckproviderlanguage-provider).

## Depreciações

As seguintes APIs estão recém descontinuadas no Electron 5.0.0 e estão planejadas para remoção na 6.0.0:

### Mkshot binários instantâneos para braço e arm64
binários nativos do mksnapshot para braço e arm64 estão obsoletos e serão removidos em 6. .0. Os snapshots podem ser criados para braço e arm64 usando os binários x64.

### APIs do ServiceWorker em WebContents
APIs de Worker obsoletas sobre WebContents em preparação para sua remoção.
* `webContents.hasServiceWorker`
* `webContents.unregisterServiceWorker`

### Módulos automáticos com conteúdo web sandboxed
A fim de melhorar a segurança, os seguintes módulos estão sendo descontinuados para uso diretamente via `exigem` e, em vez disso, precisarão ser incluídos através do controle remoto `. equilibre` em um conteúdo web sandbox:
* `tela.eletrônica`
* `child_process`
* `fs`
* `os`
* `path`

## webFrame Isolated World APIs
`webFrame.setIsolatedWorldContentSecurityPolicy`,`webFrame.setIsolatedWorldHumanReadableName`, `webFrame.setIsolatedWorldSecurityOrigin` foram descontinuadas em favor de `webFrame.setIsolatedWorldInfo`.

### Misto de areia
`enableMixedSandbox` e o switch de linha de comando `--enable-mixed-sandbox` ainda existem para compatibilidade, mas são descontinuados e não têm efeito.

## Fim de suporte para 2.0.x

Por nossa [política de versões suportadas](https://electronjs.org/docs/tutorial/support#supported-versions), a 2.0.x chegou ao fim da vida.

## Programa de Feedback de Aplicativos

Continuamos usando nosso [Programa de Feedback de Aplicativos](https://electronjs.org/blog/app-feedback-program) para testes. Projetos que participam deste programa testam as apostas do Electron em seus aplicativos; e, em troca, os novos bugs que eles encontram são priorizados para a versão estável. Se você gostaria de participar ou aprender mais, [confira nossa postagem no blog sobre o programa](https://electronjs.org/blog/app-feedback-program).

## Próximos passos

No curto prazo você pode esperar que a equipe continue focando em acompanhar o desenvolvimento dos principais componentes que compõem o Electron, incluindo Chromium, Node e V8. Embora tenhamos o cuidado de não fazer promessas sobre datas de lançamento, nosso plano é lançar novas versões principais do Electron com novas versões desses componentes aproximadamente trimestralmente. O [cronograma tentativo 6.0.0](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule) mapeia as principais datas do ciclo de vida do Electron 6. Além disso, [veja o nosso documento de versão](https://electronjs.org/docs/tutorial/electron-versioning) para informações mais detalhadas sobre versão no Electron.

Para informações sobre mudanças planejadas em futuras versões do Electron, [veja nosso Documento de Interrupção Planejada (Alterações de Abertura)](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
