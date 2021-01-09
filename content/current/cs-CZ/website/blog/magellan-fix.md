---
title: Oprava zranitelnosti SQLite
author: ckerr
date: '2018-12-18'
---

Objevila se zranitelnost vykonávání vzdáleného kódu, "[Magellan](https://blade.tencent.com/magellan/index_en.html)," ovlivňující software založený na SQLite nebo Chromium, včetně všech verzí Electronu.

---

## Oblast působnosti

Aplikace Electron používající Web SQL jsou ovlivněny.


## Zmírnění

Ovlivněné aplikace by měly přestat používat Web SQL nebo aktualizovat na upravenou verzi Electronu.

Zveřejnili jsme nové verze Electronu, které obsahují opravy pro tuto zranitelnost:
  * [4.0.0-beta.11](https://github.com/electron/electron/releases/tag/v4.0.0-beta.11)
  * [3.1.0-beta.4](https://github.com/electron/electron/releases/tag/v3.1.0-beta.4)
  * [3.0.13](https://github.com/electron/electron/releases/tag/v3.0.13)
  * [2.0.16](https://github.com/electron/electron/releases/tag/v2.0.16)

Neexistují žádné zprávy o tom ve volné přírodě; dotčené aplikace jsou však vyzývány, aby je zmírnily.

## Další informace

Tato zranitelnost byla objevena týmem Tencent Blade, který zveřejnil [příspěvek blogu, který diskutuje o zranitelnosti](https://blade.tencent.com/magellan/index_en.html).

Chcete-li se dozvědět více o osvědčených postupech pro zabezpečení Vašich Electron aplikací, podívejte se na náš [bezpečnostní návod](https://electronjs.org/docs/tutorial/security).

Pokud chcete nahlásit zranitelnost v Electronu, napište email security@electronjs.org.
