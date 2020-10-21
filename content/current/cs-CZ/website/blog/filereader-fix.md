---
title: Oprava zranitelnosti souboru Chroma
author: marshallofal
date: '2019-03-07'
---

V prohlížeči Chrome byla objevena zranitelnost s vysokou závažností, která ovlivňuje veškerý software založený na Chromiu, včetně Electronu.

Tato zranitelnost byla přiřazena `CVE-2019-5786`.  Více o tom si můžete přečíst v [Chrome Blog Post](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

Vezměte prosím na vědomí, že Chrome má hlášení o této zranitelnosti ve volné přírodě, takže je důrazně doporučeno povýšit Electron ASAP.

---

## Oblast působnosti

Toto ovlivní jakoukoliv aplikaci Electron, která může spustit JavaScript.

## Zmírnění

Ovlivněné aplikace by měly aktualizovat na upravenou verzi Electronu.

Zveřejnili jsme nové verze Electronu, které obsahují opravy pro tuto zranitelnost:
  * [4.0.8](https://github.com/electron/electron/releases/tag/v4.0.8)
  * [3.1.6](https://github.com/electron/electron/releases/tag/v3.1.6)
  * [3.0.16](https://github.com/electron/electron/releases/tag/v3.0.16)
  * [2.0.18](https://github.com/electron/electron/releases/tag/v2.0.18)

Poslední beta Electron 5 sledovala Chromium 73, a proto je již upravena:
  * [5.0.0-beta.5](https://github.com/electron/electron/releases/tag/v5.0.0-beta.5)

## Další informace

Tuto zranitelnost objevil Clement Lecigne ze skupiny Google Threat Analysis Group a nahlásil týmu Chrome.  Blog Chrome je k dispozici [zde](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

Chcete-li se dozvědět více o osvědčených postupech pro zabezpečení Vašich Electron aplikací, podívejte se na náš [bezpečnostní návod](https://electronjs.org/docs/tutorial/security).

Pokud chcete nahlásit zranitelnost v Electronu, napište email security@electronjs.org.
