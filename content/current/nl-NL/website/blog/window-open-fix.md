---
title: BrowserView window.open() Kulnerability Fix
author: ckerr
date: '2019-02-03'
---

Een code kwetsbaarheid is ontdekt waarmee Node opnieuw kan worden ingeschakeld in onderliggende vensters.

---

Openen van een BrowserView met `zandbox: true` or `nativeWindowOpen: true` and `nodeIntegration: false` resulteert in een webInhoud waar `venster wordt weergegeven. pen` kunnen worden aangeroepen en het nieuw geopende subvenster zal `nodeIntegration` ingeschakeld hebben. Deze kwetsbaarheid heeft invloed op alle ondersteunde versies van Electron.

## Mitigatie

We've published new versions of Electron which include fixes for  this vulnerability: [`2.0.17`](https://github.com/electron/electron/releases/tag/v2.0.17), [`3.0.15`](https://github.com/electron/electron/releases/tag/v3.0.15), [`3.1.3`](https://github.com/electron/electron/releases/tag/v3.1.3), [`4.0.4`](https://github.com/electron/electron/releases/tag/v4.0.4), and [`5.0.0-beta.2`](https://github.com/electron/electron/releases/tag/v5.0.0-beta.2). We moedigen alle Electron ontwikkelaars aan om hun apps onmiddellijk te updaten naar de laatste stabiele versie.

Als u om een of andere reden niet in staat bent om uw Electron versie te upgraden, kunt u dit probleem verzachten door alle onderliggende webinhoud uit te schakelen:

```javascript
view.webContents.on('-add-new-contents', e => e.preventDefault());
```

## Verdere informatie

Deze kwetsbaarheid is gevonden en op verantwoorde wijze gerapporteerd aan het Electron project door [PalmerAL](https://github.com/PalmerAL).

Om meer te weten te komen over beste praktijken om je Electron apps veilig te houden, bekijk onze [beveiligingshandleiding](https://electronjs.org/docs/tutorial/security).

Als u een kwetsbaarheid in Electron wilt melden, e-mail security@electronjs.org.
