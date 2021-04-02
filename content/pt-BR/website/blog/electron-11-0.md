---
title: Elétron 11.0.0
author:
  - VerteDinde
date: '2020-11-17'
---

O elétron 11.0.0 foi liberado! Inclui upgrades para chromium `87`, V8 `8.7`e Node.js `12.18.3`. Adicionamos suporte ao silício da Apple e melhorias gerais. Leia abaixo para mais detalhes!

---

A equipe electron está animada para anunciar o lançamento do Electron 11.0.0! Você pode instalá-lo com o npm via `npm install electron@latest` ou baixá-lo em nosso [releases website](https://electronjs.org/releases/stable). O lançamento está repleto de atualizações, correções e novo suporte para o hardware M1 da Apple.

Mal podemos esperar para ver o que vocês construem com eles! Continue lendo para mais detalhes sobre esta versão, por favor compartilhe qualquer comentário que você tem!

## Mudanças notáveis

### Alterações de Pilha

* `87.0.4280.47`de cromo
    * [Novidade no Chrome 86](https://developers.google.com/web/updates/2020/10/nic86)
    * [Novidade no Chrome 87](https://developers.google.com/web/updates/2020/11/nic87)
* Nó.js `12.18.3`
    * [Node 12.18.3 post no blog](https://nodejs.org/en/blog/release/v12.18.3/)
    * [Node 12.7.0 post no blog](https://nodejs.org/en/blog/release/v12.17.0/)
* V8 `8.7`
    * [V8 8.6 post no blog](https://v8.dev/blog/v8-release-86)
    * [V8 8.7 post no blog](https://v8.dev/blog/v8-release-87)

### Destacar recursos

* Suporte para Apple M1: Em 10 de novembro, a Apple anunciou sua [novos chips M1, que serão incluídos em seus próximos](https://www.apple.com/newsroom/2020/11/apple-unleashes-m1/)de hardware . A partir do Electron 11, a Electron enviará versões separadas de Electron para Macs Intel (x64) e o próximo hardware M1 da Apple (arm64). Você pode aprender mais sobre como obter o seu aplicativo Electron [sendo executado no hardware M1 da Apple aqui.](https://www.electronjs.org/blog/apple-silicon) [#24545](https://github.com/electron/electron/pull/24545)
* Adicionadas informações de falha v8 e localização aos parâmetros do crashReport. [#24771](https://github.com/electron/electron/pull/24771)
* Melhorou o desempenho do envio de objetos largos sobre a ponte de contexto. [#24671](https://github.com/electron/electron/pull/24671)

Veja as notas de versão [11.0.0](https://github.com/electron/electron/releases/tag/v11.0.0) para uma lista completa de novos recursos e alterações.

## Quebrando mudanças

* Apis experimentais removidas: `BrowserView.{fromId, fromWebContents, getAllViews}` e a propriedade `id` de `BrowserView`. [#23578](https://github.com/electron/electron/pull/23578)

Mais informações sobre essas e futuras alterações podem ser encontradas na página [Desmembramento planejado](https://github.com/electron/electron/blob/master/docs/breaking-changes.md) .

## Alterações de API

* Adicionado `app.getApplicationInfoForProtocol()` API que retorna informações detalhadas sobre o aplicativo que lida com um determinado protocolo. [#24112](https://github.com/electron/electron/pull/24112)
* Adicionado `app.createThumbnailFromPath()` API que retorna uma imagem de visualização de um arquivo dado seu caminho de arquivo e um tamanho máximo de miniatura. [#24802](https://github.com/electron/electron/pull/24802)
* Adicionado `webContents.forcefullyCrashRenderer()` para encerrar com força um processo de renderização para ajudar na recuperação de um renderizador pendurado. [#25756](https://github.com/electron/electron/pull/25756)

## Fim do suporte para 8.x.y

O Electron 8.x.y chegou ao fim do suporte de acordo com a política de suporte [do projeto](https://electronjs.org/docs/tutorial/support#supported-versions). Desenvolvedores e aplicativos são encorajados a atualizar para uma versão mais recente do Electron.

## Próximos passos

No curto prazo você pode esperar que a equipe continue focando em acompanhar o desenvolvimento dos principais componentes que compõem o Electron, incluindo Chromium, Node e V8. Embora tenhamos o cuidado de não fazer promessas sobre datas de lançamento, nosso plano é lançar novas versões principais da Electron com novas versões desses componentes aproximadamente trimestralmente. O cronograma [provisório 12.0.0](https://electronjs.org/docs/tutorial/electron-timelines) mapeia datas-chave no ciclo de vida de desenvolvimento do Electron 12.0. Além disso, [veja o nosso documento de versão](https://electronjs.org/docs/tutorial/electron-versioning) para informações mais detalhadas sobre versão no Electron.

Para informações sobre mudanças planejadas em futuras versões do Electron, [veja nosso Documento de Interrupção Planejada (Alterações de Abertura)](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Trabalho contínuo para depreciação do módulo `remote`
Começamos a trabalhar para remover o módulo `remote` em [](https://www.electronjs.org/blog/electron-9-0)Electron 9 . Planejamos remover o módulo `remote` em si no Elétron 14.

Leia e siga [esta edição](https://github.com/electron/electron/issues/21408) para planos completos e detalhes para depreciação.

### Passo final para exigir que módulos de nó nativo sejam context aware ou N-API (em Elétron 12)
A partir do Electron 6 em diante, estamos lançando as bases para exigir [módulos de nó nativos](https://nodejs.org/api/addons.html) carregados no processo renderizador sejam [](https://nodejs.org/api/n-api.html) N-API ou [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). A aplicação dessa mudança permite uma segurança mais forte, um desempenho mais rápido e uma carga de trabalho de manutenção reduzida. A etapa final deste plano é remover a capacidade de desativar a reutilização do processo renderizado no Elétron 12.

Leia e siga [esta edição](https://github.com/electron/electron/issues/18397) para detalhes completos, incluindo o cronograma proposto.
