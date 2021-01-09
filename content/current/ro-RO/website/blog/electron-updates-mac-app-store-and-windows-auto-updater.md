---
title: Mac App Store şi Windows Auto Updater pe Electron
author: Jlord
date: '2015-11-05'
---

Recent, Electron a adăugat două caracteristici captivante: o versiune compatibilă Mac App Store și o actualizare automată încorporată în Windows.

---

## Suport Mac App Store

<img src='https://cloud.githubusercontent.com/assets/1305617/10928574/a301640c-825e-11e5-918e-a06b7a55dcb4.png' width="300" />

Începând cu `v0.34.0` fiecare versiune Electron include o versiune compatibilă cu Magazinul de App Mac. Anterior, o aplicație construită pe Electron nu respecta cerințele Apple pentru Mac App Store. Majoritatea acestor cerințe sunt legate de utilizarea APIurilor private. Pentru a insera Electron în așa fel încât să respecte cerințele, două module trebuiau eliminate:

- `Raportor-crasher`
- `auto-actualizare`

În plus, unele comportamente s-au schimbat în ceea ce privește detectarea modificărilor DNS, captarea video și funcțiile de accesibilitate. Poți citi mai multe despre modificări și [trimite aplicația ta către magazinul de aplicații Mac](https://electronjs.org/docs/latest/tutorial/mac-app-store-submission-guide) în documentație. Distribuțiile pot fi găsite pe pagina [Versiuni Electron](https://github.com/electron/electron/releases), prefixată cu `mas-`.

Cereri de pull conexe: [electron/electron#3108](https://github.com/electron/electron/pull/3108), [electron/electron#2920](https://github.com/electron/electron/pull/2920)

## Actualizator automat de Windows

În Electron `v0.34.1` modulul `de auto-actualizare` a fost îmbunătățit pentru a funcționa cu [`Squirrel.Windows`](https://github.com/Squirrel/Squirrel.Windows). Asta înseamnă că Electron este disponibil pentru actualizarea automată a aplicației atât pe OS X, cât și pe Windows. Puteți citi mai multe despre [configurarea aplicației dvs. pentru actualizarea automată pe Windows](https://github.com/electron/electron/blob/master/docs/api/auto-updater.md#windows) în documentație.

Solicitare conexă: [electron/electron#1984](https://github.com/electron/electron/pull/1984)

