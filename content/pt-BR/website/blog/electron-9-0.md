---
title: Electron 9.0.0
author:
  - sofiangria
  - VerteDinde
date: '2020-05-19'
---

Electron 9.0.0 foi lançado! Isso inclui atualizações para o Chromium `83`, V8 `8.3`e Node.js `12.14`. Adicionamos várias novas integrações de API para o nosso recurso spellchecker, visualizador de PDF habilitado e muito mais!

---

A equipe do Electron está animada para anunciar a versão do Electron 9.0.0! Você pode instalá-lo com o npm via `npm install electron@latest` ou baixá-lo em nosso [releases website](https://electronjs.org/releases/stable). A versão está cheia de atualizações, correções e novas funcionalidades. Mal podemos esperar para ver o que vocês construem com eles! Continue lendo para mais detalhes sobre esta versão, por favor compartilhe qualquer comentário que você tem!

## Mudanças notáveis

### Alterações de Pilha

* Chromium `3.0.4103.64`
    * [Novo no Chrome 81](https://developers.google.com/web/updates/2020/04/nic81)
    * [O Chrome 82 foi ignorado](https://chromereleases.googleblog.com/2020/03/chrome-and-chrome-os-release-updates.html)
    * [Novo no Chrome 83](https://developers.google.com/web/updates/2020/05/nic83)
* Node.js `12.14.1`
    * [Post de blog Node 12.14.1](https://nodejs.org/en/blog/release/v12.14.1/)
* V8 `8.3`
    * [Postagem no blog V8 8.1](https://v8.dev/blog/v8-release-81)
    * [Postagem no blog V8 8.3](https://v8.dev/blog/v8-release-83)

### Destacar recursos

* Múltiplas melhorias no recurso de corretor ortográfico. Veja mais detalhes em [#22128](https://github.com/electron/electron/pull/22128) e [#22368](https://github.com/electron/electron/pull/22368).
* Melhorada a eficiência do manipulador de eventos de janela no Linux. [#23260](https://github.com/electron/electron/pull/23260).
* Habilitar visualizador de PDF. [#22131](https://github.com/electron/electron/pull/22131).

Veja as [notas de lançamento 9.0.0](https://github.com/electron/electron/releases/tag/v9.0.0) para uma lista completa de novos recursos e alterações.

## Breaking Changes

* Aviso de depreciação quando estiver usando `remoto` sem `ativarRemoteModule: true`. [#21546](https://github.com/electron/electron/pull/21546)
    * Esta é a primeira etapa de nossos planos para depreciar o módulo `remoto` e movê-lo para o userland. Você pode ler e acompanhar [esta issue](https://github.com/electron/electron/issues/21408) que detalha nossos motivos para isso e inclui uma linha temporal proposta para depreciação.
* Defina `app.enableRendererProcessReuse` como verdadeiro por padrão. [#22336](https://github.com/electron/electron/pull/22336)
    * Este é o trabalho continuado para futuros requisitos de que módulos nativos de nó carregados no processo de renderização sejam [N-API](https://nodejs.org/api/n-api.html) ou [Contexto Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Informações completas e linha do tempo proposta é detalhado em [esse problema](https://github.com/electron/electron/issues/18397).
* Enviar objetos não-JavaScript sobre o IPC agora lança uma exceção. [#21560](https://github.com/electron/electron/pull/21560)
    * Este comportamento foi depreciado no Electron 8.0. No Electron 9.0, o antigo algoritmo de serialização foi removido, e enviar esses objetos não serializáveis agora lançará um erro de "objeto não pôde ser clonado".

More information about these and future changes can be found on the [Planned Breaking Changes](https://github.com/electron/electron/blob/master/docs/breaking-changes.md) page.

## Alterações de API

* `shell` Alterações na API:
   * A API `shell.openItem` foi substituída por uma API assíncrona `shell.openPath`. [proposta](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md)
* `sessão`Alterações API:
   * Adicionado `session.listWordsFromSpellCheckerDictionary` API para listar palavras personalizadas no dicionário. [#22128](https://github.com/electron/electron/pull/22128)
   * Adicionado `session.removeWordFromSpellCheckerDictionary` API para remover palavras personalizadas no dicionário. [#22368](https://github.com/electron/electron/pull/22368)
   * Adicionado `session.serviceWorkerContext` API para acessar informações básicas de colaboradores do serviço e receber logs de consoles dos funcionários. [#22313](https://github.com/electron/electron/pull/22313)
* `aplicação` Alterações na API:
   * Adicionado um novo parâmetro força para `app.focus()` no macOS para permitir que os aplicativos fiquem com força. [#23447](https://github.com/electron/electron/pull/23447)
* `BrowserWindow` Alterações na API:
   * Adicionado suporte para acesso de propriedade a alguns pares getter/setter em `BrowserWindow`. [#23208](https://github.com/electron/electron/pull/23208)

### APIs Descontinuadas

As seguintes APIs agora estão obsoletas ou removidas:

* `shell.openItem` API agora está depreciada, e é substituído por uma API assíncrona `shell.openPath`.
* `<webview>.getWebContents`, que foi descontinuado no Electron 8.0, agora foi removido.
* `WebFrame.setLayoutZoomLevelLimits`, que foi descontinuado no Electron 8.0, agora foi removido.

## Fim do suporte para a 6.x.y

Electron 6.x.y atingiu end-of-support de acordo com a [política de suporte do projeto](https://electronjs.org/docs/tutorial/support#supported-versions). Desenvolvedores e aplicativos são encorajados a atualizar para uma versão mais recente do Electron.

## Próximos passos

No curto prazo você pode esperar que a equipe continue focando em acompanhar o desenvolvimento dos principais componentes que compõem o Electron, incluindo Chromium, Node e V8. Embora tenhamos o cuidado de não fazer promessas sobre datas de lançamento, nosso plano é lançar novas versões principais do Electron com novas versões desses componentes aproximadamente trimestralmente. O [agendamento tentativo 10.0.0](https://electronjs.org/docs/tutorial/electron-timelines) mapeia as datas chave no ciclo de vida do Electron 10.0. Além disso, [veja o nosso documento de versão](https://electronjs.org/docs/tutorial/electron-versioning) para informações mais detalhadas sobre versão no Electron.

Para informações sobre mudanças planejadas em futuras versões do Electron, [veja nosso Documento de Interrupção Planejada (Alterações de Abertura)](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Altere o padrão de `contextIsolamento` de `falso` para `true` (Começando no Electron 10)

Sem o contextIsolamento, qualquer código executado em um processo de renderização pode facilmente acessar os internos do Electron ou o script de pré-carregamento de um aplicativo. Esse código pode então executar ações privilegiadas que o Electron quer manter restrito.

Mudar este padrão melhora a segurança padrão dos apps do Electron, assim os aplicativos precisarão deliberadamente optar pelo comportamento inseguro. Electron irá depreciar o padrão atual de `contextIsolamento` no Electron 10. , e mude para o novo padrão (`true`) no Electron 12.0.

Para mais informações sobre o contextIsolamento de ``, Como permiti-lo facilmente e seus benefícios de segurança, por favor veja o nosso [Documento de Contexto de Isolação](https://github.com/electron/electron/blob/master/docs/tutorial/context-isolation.md) dedicado.
