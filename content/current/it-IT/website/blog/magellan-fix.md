---
title: Correzione Di Vulnerabilità Sqlite
author: ckerr
date: '2018-12-18'
---

Una vulnerabilità di esecuzione di codice remoto, "[Magellan](https://blade.tencent.com/magellan/index_en.html)", è stato scoperto che colpisce software basato su SQLite o Chromium, comprese tutte le versioni di Electron.

---

## Ambito

Le applicazioni Electron che utilizzano Web SQL sono impattate.


## Mitigazione

Le applicazioni interessate dovrebbero smettere di utilizzare Web SQL o aggiornare a una versione patched di Electron.

Abbiamo pubblicato nuove versioni di Electron che includono correzioni per questa vulnerabilità:
  * [4,0,0-beta.11](https://github.com/electron/electron/releases/tag/v4.0.0-beta.11)
  * [3.1.0-beta.4](https://github.com/electron/electron/releases/tag/v3.1.0-beta.4)
  * [3.0.13](https://github.com/electron/electron/releases/tag/v3.0.13)
  * [2.0.16](https://github.com/electron/electron/releases/tag/v2.0.16)

Non ci sono notizie di questo in selvaggio; tuttavia, le applicazioni interessate sono esortate a mitigare.

## Ulteriori Informazioni

Questa vulnerabilità è stata scoperta dal team di Tencent Blade, che hanno pubblicato [un post sul blog che discute la vulnerabilità](https://blade.tencent.com/magellan/index_en.html).

Per saperne di più sulle migliori pratiche per mantenere al sicuro le tue app Electron, consulta il nostro [tutorial per la sicurezza](https://electronjs.org/docs/tutorial/security).

Se si desidera segnalare una vulnerabilità in Electron, e-mail security@electronjs.org.
