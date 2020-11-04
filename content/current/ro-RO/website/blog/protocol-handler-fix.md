---
title: Reparații pentru vulnerabilitate ale protocolului
author: zeke
date: '2018-01-22'
---

A fost descoperită o vulnerabilitate la execuție a codului la distanță, afectând Aplicații Electron care folosesc manipulatori de protocol personalizați. Această vulnerabilitate a fost atribuită identificatorului CVE [CVE-2018-1000006](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000006).

---

## Platforme afectate

Aplicațiile Electron proiectate pentru a rula pe Windows care se înregistrează ca handler implicit pentru un protocol, cum ar fi `myapp://`, sunt vulnerabile.

Astfel de aplicații pot fi afectate indiferent de modul în care protocolul este înregistrat, de ex. folosind codul nativ, registrul Windows, sau API-ul Electron [app.setAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows).

macOS și Linux **nu sunt vulnerabile** la această problemă.

## Atenuare

Am publicat noi versiuni de Electron care includ reparații pentru această vulnerabilitate: [`1.8.2-beta.`](https://github.com/electron/electron/releases/tag/v1.8.2-beta.5), [`1,7. 2`](https://github.com/electron/electron/releases/tag/v1.7.12), și [`1.6.17`](https://github.com/electron/electron/releases/tag/v2.6.17). Solicităm tuturor dezvoltatorilor Electron să își actualizeze aplicațiile la ultima versiune stabilă imediat.

Dacă dintr-un anumit motiv nu puteți să vă actualizați versiunea Electron, poți adăuga `--` ca și ultim argument atunci când apelezi [aplicație. etAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows), care împiedică Chromium să analizeze alte opțiuni. Dublul dash `--` semnifică sfârşitul opţiunilor de comandă, după care sunt acceptaţi doar parametrii poziţionali.

```js
app.setAsDefaultProtocolClient(protocol, process.execPath, [
  '--switches-aici',
  '--'
])
```

Vezi API-ul [app.setAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) pentru mai multe detalii.

Pentru a afla mai multe despre cele mai bune practici pentru a vă păstra aplicațiile Electron în siguranță, consultați [tutorialul nostru de securitate](https://electronjs.org/docs/tutorial/security).

Dacă doriți să raportați o vulnerabilitate în Electron, trimiteți un e-mail la security@electronjs.org.
