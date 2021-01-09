---
title: Correzione Vulnerabilità Del Lettore Di File Cromo
author: marshallofsound
date: '2019-03-07'
---

Una vulnerabilità ad alta gravità è stato scoperto in Chrome che colpisce tutto il software basato su Chromium, tra cui Electron.

Questa vulnerabilità è stata assegnata `CVE-2019-5786`.  Puoi leggere di più su di esso nel [Chrome Blog Post](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

Si prega di notare che Chrome ha rapporti di questa vulnerabilità in uso in natura quindi è fortemente raccomandato di aggiornare Electron ASAP.

---

## Ambito

Questo influisce su qualsiasi applicazione Electron che può eseguire JavaScript non attendibile o di terze parti.

## Mitigazione

Le app interessate dovrebbero passare a una versione patched di Electron.

Abbiamo pubblicato nuove versioni di Electron che includono correzioni per questa vulnerabilità:
  * [4.0.8](https://github.com/electron/electron/releases/tag/v4.0.8)
  * [3.1.6](https://github.com/electron/electron/releases/tag/v3.1.6)
  * [3.0.16](https://github.com/electron/electron/releases/tag/v3.0.16)
  * [2.0.18](https://github.com/electron/electron/releases/tag/v2.0.18)

L'ultima beta di Electron 5 stava tracciando il cromo 73 e quindi è già patched:
  * [5,0,0-beta.5](https://github.com/electron/electron/releases/tag/v5.0.0-beta.5)

## Ulteriori Informazioni

Questa vulnerabilità è stata scoperta da Clement Lecigne di Google Threat Analysis Group e segnalato al team Chrome.  Il blog Chrome post può essere trovato [qui](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

Per saperne di più sulle migliori pratiche per mantenere al sicuro le tue app Electron, consulta il nostro [tutorial per la sicurezza](https://electronjs.org/docs/tutorial/security).

Se si desidera segnalare una vulnerabilità in Electron, e-mail security@electronjs.org.
