---
title: Electron 10.0.0
author:
  - VerteDinde
  - sofiangria
date: '2020-08-25'
---

Electron 10.0.0 foi lançado! Isso inclui atualizações para o Chromium `85`, V8 `8.5`e Node.js `12.16`. Adicionamos várias novas integrações e melhorias de API. Leia abaixo para mais detalhes!

---

A equipe do Electron está animada para anunciar a versão do Electron 10.0.0! Você pode instalá-lo com o npm via `npm install electron@latest` ou baixá-lo em nosso [releases website](https://electronjs.org/releases/stable). A versão está cheia de atualizações, correções e novas funcionalidades.

Na versão 10 do Electron, também fizemos uma alteração nas nossas notas de lançamento. Para tornar mais fácil dizer o que há de novo no Electron 10 e o que pode ter mudado entre Electron 10 e versões passadas, agora também incluímos alterações que foram introduzidas no Electron 10, mas enviadas para versões anteriores. Esperamos que isso torne mais fácil para aplicativos encontrar novos recursos e correções de bugs ao atualizar o Electron.

Mal podemos esperar para ver o que vocês construem com eles! Continue lendo para mais detalhes sobre esta versão, por favor compartilhe qualquer comentário que você tem!

## Mudanças notáveis

### Alterações de Pilha

* Chromium `85,0.4183.84`
    * [Novo no Chrome 84](https://developers.google.com/web/updates/2020/07/nic84)
    * [Novo no Chrome 85](https://chromereleases.googleblog.com/2020/08/stable-channel-update-for-desktop_25.html)
* Node.js `12.16.3`
    * [Post de blog Node 12.16.3](https://nodejs.org/en/blog/release/v12.16.3/)
* V8 `8.5`
    * [Postagem no blog V8 8.4](https://v8.dev/blog/v8-release-84)
    * [Postagem no blog V8 8.5](https://v8.dev/blog/v8-release-85)

### Destacar recursos

* Adicionado o método `contents.getBackgroundThrottling()` e a propriedade `contents.backgroundThrottling`. [#21036]
* Exposta o módulo `desktopCapturer` no processo principal. [#23548](https://github.com/electron/electron/pull/23548)
* Agora pode verificar se uma determinada `sessão` é persistente chamando a API `ses.isPersistent()`. [#22622](https://github.com/electron/electron/pull/22622)
* Resolver problemas de rede que impediram que chamadas RTC fossem conectadas devido a alterações de endereço IP na rede e ICE. (Problema Chromium 1113227). [#24998](https://github.com/electron/electron/pull/24998)

Veja as [notas de lançamento 10.0.0](https://github.com/electron/electron/releases/tag/v10.0.0) para ver uma lista completa de novos recursos e alterações.

## Breaking Changes

* Alterado o valor padrão de `enableRemoteModule` para `false`. [#22091](https://github.com/electron/electron/pull/22091)
    * Esta é parte de nossos planos para depreciar o módulo `remoto` e movê-lo para o userland. Você pode ler e acompanhar [esta issue](https://github.com/electron/electron/issues/21408) que detalha nossos motivos para isso e inclui uma linha temporal proposta para depreciação.
* Alterado o valor padrão de `app.allowRendererProcessReuse` para `verdadeiro`. [#22336](https://github.com/electron/electron/pull/22336) (Também no [Electron 9](https://github.com/electron/electron/pull/22401))
   * Isso evitará o carregamento de módulos nativos não-informados pelo contexto em processos de renderização.
   * Você pode ler e acompanhar [esta issue](https://github.com/electron/electron/issues/18397) que detalha nossos motivos para isso e inclui uma linha temporal proposta para depreciação.
* Corrigido o posicionamento dos botões de janela no macOS quando a localidade do SO era definida para um idioma RTL (como Árabe ou Hebraico). Os aplicativos sem usar janelas podem ter que ter em conta essa alteração ao estilizar suas janelas. [#22016](https://github.com/electron/electron/pull/22016)

More information about these and future changes can be found on the [Planned Breaking Changes](https://github.com/electron/electron/blob/master/docs/breaking-changes.md) page.

## Alterações de API

* Sessão: Agora é possível verificar se uma determinada `sessão` é persistente chamando a API `ses.isPersistent()`. [#22622](https://github.com/electron/electron/pull/22622)
* Conteúdo: Adicionado `contents.getBackgroundThrottling()` e propriedade `contents.backgroundThrottling`. [#21036](https://github.com/electron/electron/pull/21036)

### APIs Descontinuadas

As seguintes APIs agora estão obsoletas ou removidas:

* Removido a propriedade descontinuada `AtuentlyLoggingPath` de `netLog`. Além disso, `netLog.stopLogging` não retorna mais o caminho para o registro registrado. [#22732](https://github.com/electron/electron/pull/22732)
* Carregamentos de erro descompactados descompactados no `crashReporter`. [#23598](https://github.com/electron/electron/pull/23598)

## Fim do suporte para 7.x.y

Electron 7.x.y atingiu end-of-support de acordo com a [política de suporte do projeto](https://electronjs.org/docs/tutorial/support#supported-versions). Desenvolvedores e aplicativos são encorajados a atualizar para uma versão mais recente do Electron.

## Próximos passos

No curto prazo você pode esperar que a equipe continue focando em acompanhar o desenvolvimento dos principais componentes que compõem o Electron, incluindo Chromium, Node e V8. Embora tenhamos o cuidado de não fazer promessas sobre datas de lançamento, nosso plano é lançar novas versões principais do Electron com novas versões desses componentes aproximadamente trimestralmente. O [agendamento tentativo 11.0.0](https://electronjs.org/docs/tutorial/electron-timelines) mapeia as datas de chave no ciclo de vida de desenvolvimento do Electron 11.0. Além disso, [veja o nosso documento de versão](https://electronjs.org/docs/tutorial/electron-versioning) para informações mais detalhadas sobre versão no Electron.

Para informações sobre mudanças planejadas em futuras versões do Electron, [veja nosso Documento de Interrupção Planejada (Alterações de Abertura)](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Trabalho continuado para Depreciação do módulo</code> remoto `(em Electron 11)</h3>

<p spaces-before="0">We started work to remove the remote module in <a href="https://www.electronjs.org/blog/electron-9-0">Electron 9</a> and we're continuing plans to remove the <code>remote` module. No Electron 11, planejamos continuar trabalhando para implementar o [WeakRef](https://v8.dev/features/weak-references) como fizemos no Electron 10. Por favor leia e siga [esse problema](https://github.com/electron/electron/issues/21408) para planos e detalhes completos para descontinuação.</p>

### Etapa final para exigir módulos de nó nativos para serem de Contexto Aware ou N-API (em Electron 11)
A partir do Electron 6, Estamos colocando as bases para exigir que [módulos nativos do nó](https://nodejs.org/api/addons.html) carregados no processo de renderização seja [N-API](https://nodejs.org/api/n-api.html) ou [Aware de contexto](https://nodejs.org/api/addons.html#addons_context_aware_addons). Impor esta alteração permite maior segurança, desempenho mais rápido e redução da carga de manutenção. A etapa final deste plano é remover a capacidade de desabilitar a reutilização de processamento no Electron 11. Leia [esse problema](https://github.com/electron/electron/issues/18397) para obter detalhes completos, incluindo a linha de tempo proposta.
