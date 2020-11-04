---
title: 'Electron 2.0 e Beyond - Versionamento semantico'
author: acque sotterranee
date: '2017-12-06'
---

Una nuova versione principale di Electron è nei lavori, e con esso alcuni cambiamenti alla nostra strategia di versione. A partire dalla versione 2.0.0, Electron aderirà rigorosamente alla versione semantica.

---

Questo cambiamento significa che vedrai la versione principale urto più spesso, e di solito sarà un importante aggiornamento per Chromium. Le versioni delle patch saranno anche più stabili, poiché ora conterranno solo correzioni di bug senza nuove funzionalità.

**Incrementi Della Versione Maggiore**

* Aggiornamenti versione cromo
* Aggiornamenti della versione principale di Node.js
* Modifiche API di interruzione di Electron

**Incrementi Minori Versione**

* Aggiornamenti della versione minore di Node.js
* Modifiche API senza interruzione di Electron

**Incrementi Versione Patch**

* Aggiornamenti della versione della patch di Node.js
* cerotti di cromo fissi,
* Correzioni di bug di Electron

Poiché gli intervalli semver di Elettronica saranno ora più significativi, si consiglia di installare Electron utilizzando il flag predefinito `--save-dev` di npm, che prefisserà la tua versione con `^`, mantenendoti al sicuro aggiornato con aggiornamenti minori e patch :

```sh
npm install --save-dev electron
```

Per gli sviluppatori interessati solo alle correzioni di bug, è necessario utilizzare il prefisso tilde semver ad esempio `~2. .0`, che non introdurrà mai nuove funzionalità, corregge solo per migliorare la stabilità.

Per maggiori dettagli, vedi [electronjs.org/docs/tutorial/electron-versioning](https://electronjs.org/docs/tutorial/electron-versioning).
