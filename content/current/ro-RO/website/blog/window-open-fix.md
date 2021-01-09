---
title: BrowserView window.open() Vulnerabilitate Fix
author: ckerr
date: '2019-02-03'
---

A fost descoperită o vulnerabilitate de cod care permite modulului să fie reactivat în ferestrele pentru copii.

---

Deschiderea unui BrowserView cu `sandbox: true` or `nativeWindowOpen: true` and `nodeIntegration: fals` duce la un webContent unde `fereastră. Stiloul` poate fi apelat şi fereastra pentru copil nou deschisă va avea `nodeIntegration` activată. Această vulnerabilitate afectează toate versiunile suportate de Electron.

## Atenuare

Am publicat noi versiuni de Electron care includ remedii pentru această vulnerabilitate: [`. .17`](https://github.com/electron/electron/releases/tag/v2.0.17), [`3.0. 5`](https://github.com/electron/electron/releases/tag/v3.0.15), [`3.1.3`](https://github.com/electron/electron/releases/tag/v3.1.3), [`4. .4`](https://github.com/electron/electron/releases/tag/v4.0.4), şi [` 5.0.0-beta.2`](https://github.com/electron/electron/releases/tag/v5.0.0-beta.2). Încurajăm toți dezvoltatorii Electron să își actualizeze aplicațiile la ultima versiune stabilă imediat.

Dacă dintr-un anumit motiv nu puteți să vă actualizați versiunea Electron, puteți atenua această problemă prin dezactivarea conținutului web pentru copii:

```javascript
view.webContents.on('-add-new-contents', e => e.preventDefault());
```

## Informații suplimentare

Această vulnerabilitate a fost găsită și raportată în mod responsabil la proiectul Electron de către [PalmerAL](https://github.com/PalmerAL).

Pentru a afla mai multe despre cele mai bune practici pentru a vă păstra aplicațiile Electron în siguranță, consultați tutorialul nostru de securitate [](https://electronjs.org/docs/tutorial/security).

Dacă doriți să raportați o vulnerabilitate în Electron, trimiteți un e-mail security@electronjs.org.
