---
title: Correção de vulnerabilidade SQLite
author: ckerr
date: '2018-12-18'
---

Uma vulnerabilidade de execução de código remota, "[Magellan](https://blade.tencent.com/magellan/index_en.html)" foi descoberto com base em SQLite ou Chromium, incluindo todas as versões da Electron.

---

## Escopo

Aplicativos Electron usando Web SQL são impactados.


## Mitigação

Os aplicativos afetados devem parar de usar Web SQL ou atualizar para uma versão corrigida do Electron.

Nós publicamos novas versões do Electron que incluem correções para esta vulnerabilidade:
  * [4.0.0-beta.11](https://github.com/electron/electron/releases/tag/v4.0.0-beta.11)
  * [3.1.0-beta.4](https://github.com/electron/electron/releases/tag/v3.1.0-beta.4)
  * [3.0.13](https://github.com/electron/electron/releases/tag/v3.0.13)
  * [2.0.16](https://github.com/electron/electron/releases/tag/v2.0.16)

Não existem relatórios deste tipo na natureza, mas os pedidos afectados são instados a mitigar.

## Informações Adicionais

Essa vulnerabilidade foi descoberta pela equipe Tencent Blade, que publicou [um post de blog que discute a vulnerabilidade](https://blade.tencent.com/magellan/index_en.html).

Para saber mais sobre as melhores práticas para manter seus aplicativos Electron seguros, consulte nosso tutorial de segurança [][].

Se você deseja relatar uma vulnerabilidade no Electron, envie e-mail security@electronjs.org.

[1]: https://electronjs.org/docs/tutorial/security

[2]: https://electronjs.org/docs/tutorial/security
