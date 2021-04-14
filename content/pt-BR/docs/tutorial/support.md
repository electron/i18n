# Suporte ao Electron

## Suporte para Busca

Se você tiver um problema de segurança, consulte o [documento de segurança](https://github.com/electron/electron/tree/master/SECURITY.md).

Se estiver procurando a ajuda da programação, para respostas a perguntas, ou para participar de discussões com outros desenvolvedores que usam o Electron, você pode interagir com a comunidade nesses locais:

* [`Electron's Discord`](https://discord.com/invite/electron) tem canais para:
  * Obtendo ajuda
  * Aplicativos ecossistêmicos como [Electron Forge](https://github.com/electron-userland/electron-forge) e [Electron Fiddle](https://github.com/electron/fiddle)
  * Compartilhando ideias com outros desenvolvedores de aplicativos Electron
  * E mais!
* [`electron`](https://discuss.atom.io/c/electron) categoria nos fóruns do Átomo
* `Canal #atom-shell` no Freenode
* `canal #electron` no [Slack do Atom's](https://discuss.atom.io/t/join-us-on-slack/16638?source_topic_id=25406)
* [`electron-ru`](https://telegram.me/electron_ru) *(russo)*
* [`electron-br`](https://electron-br.slack.com) *(Português brasileiro)*
* [`electron-kr`](https://electron-kr.github.io/electron-kr) *(coreano)*
* [`electron-jp`](https://electron-jp.slack.com) *(japonês)*
* [`electron-tr`](https://electron-tr.herokuapp.com) *(turco)*
* [`electron-id`](https://electron-id.slack.com) *(Indonésia)*
* [`electron-pl`](https://electronpl.github.io) *(Polônia)*

Se você gostaria de contribuir com o Electron, veja o [documento contribuinte](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

Se você encontrou um bug em uma [versão suportada](#supported-versions) do Electron, por favor reporte-o com o [rastreador de problemas](../development/issues.md).

[incrível-elétrons](https://github.com/sindresorhus/awesome-electron) é uma lista mantida pela comunidade de aplicativos de exemplo ferramentas e recursos.

## Versões suportadas

As três últimas *estáveis* versões principais são suportadas pela equipe do Electron. Por exemplo, se a última versão for 6.1.x, então também as 5.0.x como as séries 4.2.x são suportadas.  Suportamos apenas a última versão para cada série de versões estáveis.  Isto significa que, no caso de uma correção de segurança 6.1. receberá a correção, mas não lançaremos uma nova versão de 6.0.x.

A última versão estável recebe unilateralmente todas as correções do `master`, e a versão anterior a isso recebem a grande maioria dessas correções como garantia de tempo e largura de banda. A linha de lançamento mais antiga suportada receberá apenas correções de segurança diretamente.

Todas as linhas de lançamento suportadas aceitarão pull requests externos para backport correções previamente mescladas a `master`, , embora isto possa estar numa base caso-a-caso para algumas linhas mais antigas suportadas. Todas as decisões contestadas em torno do lançamento backports de linha serão resolvidas pelo [Releases do Grupo de Trabalho](https://github.com/electron/governance/tree/master/wg-releases) como um item da agenda em sua reunião semanal na semana em que o PR backport é gerado.

Quando uma API é alterada ou removida de uma forma que quebra a funcionalidade atual, a funcionalidade anterior será suportada por um mínimo de duas versões principais quando possível antes de ser removida. Por exemplo, se uma função recebe três argumentos, e esse número é reduzido para dois na versão maior 10, a versão de três argumentos iria continuar a trabalhar até que o mínimo fosse a versão 12. Passado o limite mínimo de duas versões , tentaremos oferecer suporte a compatibilidade com versões anteriores além de duas versões até que os mantenedores sintam que o fardo da manutenção é muito alto para continuar fazendo isso.

### Versões atualmente suportadas

* 12.x.y
* 11.x.y
* 10.x.y

### Fim da vida

Quando um branch de lançamento atinge o final do seu ciclo de suporte, a série será descontinuada no NPM e uma versão final de fim de suporte será feita. Esta versão adicionará um aviso para informar que uma versão de Electron não suportada está em uso.

Estas etapas são para ajudar os desenvolvedores de apps a aprenderem quando um branch que estão usando não se torna suportado, mas sem ser excessivamente intrusivo para os usuários finais.

Se um aplicativo tiver circunstâncias excepcionais e precisar permanecer em uma série sem suporte de Electron, os desenvolvedores podem silenciar o aviso de fim de suporte , omitindo a versão final do `package.json` `devDependencies`do aplicativo . Por exemplo, desde que a série 1-6-x terminou com um fim de suporte 1.6. 8 lançamentos, desenvolvedores poderiam escolher para ficar nas séries 1-6-x sem avisos com `devDependência` de `"electron": 1. .0 - 1.6.17`.

## Plataformas Suportadas

Seguintes plataformas são suportadas pelo Electron:

### macOS

Only 64bit binaries are provided for macOS, and the minimum macOS version supported is macOS 10.11 (El Capitan).

O suporte nativo para dispositivos Apple Silicon (`arm64`) foi adicionado no Electron 11.0.0.

### Windows

Windows 7 e versões posteriores têm suporte, sistemas operacionais mais antigos não são suportados (e não funcionam).

Ambos os binários `ia32` (`x86`) e `x64` (`amd64`) são fornecidos para o Windows. [suporte nativo para dispositivos Windows on Arm (`arm64`) foi adicionado no Electron 6.0.8.](windows-arm.md). Em execução de apps empacotados com versões anteriores é possível usando o executável do ia32.

### Linux

Os binários p reconstruídos de Electron são construídos no Ubuntu 18.04.

Se o binário prebuilt pode funcionar em uma distribuição depende se a distribuição inclui as bibliotecas às qual a Electron está vinculada na plataforma de construção , de modo que apenas o Ubuntu 18.04 é garantido para funcionar, mas seguindo plataformas também são verificados para poder executar os binários p reconstruídos da Electron:

* Ubuntu 14.04 e mais novo
* Fedora 24 e mais novo
* Debian 8 e mais novo
