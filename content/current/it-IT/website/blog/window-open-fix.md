---
title: BrowserView window.open() Vulnerability Fix
author: ckerr
date: '2019-02-03'
---

È stata scoperta una vulnerabilità del codice che permette il Nodo di essere riattivato nelle finestre figlie.

---

Aprire una BrowserView con `sandbox: true` or `nativeWindowOpen: true` and `nodeIntegration: false` results in a webContents where `window. pen` può essere chiamata e la finestra figlia appena aperta avrà `nodoIntegrazione` abilitata. Questa vulnerabilità colpisce tutte le versioni supportate di Electron.

## Mitigazione

Abbiamo pubblicato nuove versioni di Electron che includono correzioni per questa vulnerabilità: [`. .17`](https://github.com/electron/electron/releases/tag/v2.0.17), [`3.0. 5`](https://github.com/electron/electron/releases/tag/v3.0.15), [`3.1.3`](https://github.com/electron/electron/releases/tag/v3.1.3), [`4. .4`](https://github.com/electron/electron/releases/tag/v4.0.4)e [` 5.0.0-beta.2`](https://github.com/electron/electron/releases/tag/v5.0.0-beta.2). Incoraggiamo tutti gli sviluppatori di Electron ad aggiornare immediatamente le loro app all'ultima versione stabile.

Se per qualche motivo non sei in grado di aggiornare la tua versione di Electron, puoi mitigare questo problema disabilitando tutti i contenuti web dei bambini:

```javascript
view.webContents.on('-add-new-contents', e => e.preventDefault());
```

## Ulteriori Informazioni

Questa vulnerabilità è stata trovata e segnalata responsabilmente al progetto Electron da [PalmerAL](https://github.com/PalmerAL).

Per saperne di più sulle migliori pratiche per mantenere al sicuro le tue app Electron, consulta il nostro [tutorial per la sicurezza](https://electronjs.org/docs/tutorial/security).

Se si desidera segnalare una vulnerabilità in Electron, e-mail security@electronjs.org.
