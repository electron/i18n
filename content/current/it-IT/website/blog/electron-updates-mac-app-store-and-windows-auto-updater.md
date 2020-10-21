---
title: Mac App Store e Windows Auto Updater su Electron
author: jlord
date: '2015-11-05'
---

Recentemente Electron ha aggiunto due caratteristiche entusiasmanti: un Mac App Store compatibile build e un built-in aggiornamento automatico di Windows.

---

## Supporto Per Mac App Store

<img src='https://cloud.githubusercontent.com/assets/1305617/10928574/a301640c-825e-11e5-918e-a06b7a55dcb4.png' width="300" />

A partire da `v0.34.0` ogni rilascio di Electron include una build compatibile con Mac App Store. In precedenza un'applicazione costruita su Electron non sarebbe conforme ai requisiti di Apple per Mac App Store. La maggior parte di questi requisiti riguarda l'uso di API private. Al fine di sabbiare Electron in modo tale da soddisfare i requisiti necessari per la rimozione di due moduli:

- `crash-reporter`
- `aggiornamento automatico`

Inoltre, alcuni comportamenti sono cambiati per quanto riguarda il rilevamento di modifiche DNS, acquisizione video e funzionalità di accessibilità. Puoi leggere di più sulle modifiche e [inviare la tua app al Mac App Store](https://electronjs.org/docs/latest/tutorial/mac-app-store-submission-guide) nella documentazione. Le distribuzioni possono essere trovate nella pagina [delle versioni di Electron](https://github.com/electron/electron/releases), prefisso con `mas-`.

Richieste Pull correlate: [electron/electron#3108](https://github.com/electron/electron/pull/3108), [electron/electron#2920](https://github.com/electron/electron/pull/2920)

## Aggiornamento Automatico Di Windows

In Electron `v0.34.1` il modulo `auto-updater` è stato migliorato per lavorare con [`Squirrel.Windows`](https://github.com/Squirrel/Squirrel.Windows). Questo significa che Electron viene fornito con semplici modi per l'aggiornamento automatico della tua app sia su OS X che su Windows. Puoi leggere di più sulla [impostazione della tua app per l'aggiornamento automatico su Windows](https://github.com/electron/electron/blob/master/docs/api/auto-updater.md#windows) nella documentazione.

Richiesta Pull correlata: [electron/electron#1984](https://github.com/electron/electron/pull/1984)

