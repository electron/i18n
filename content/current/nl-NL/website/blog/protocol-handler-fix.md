---
title: Protocol Handler Kwetsbaarheid Fix
author: zeke
date: '2018-01-22'
---

Er is een externe uitvoeringskwetsbaarheid ontdekt voor Electron apps die aangepaste protocolverwerkers gebruiken. Deze kwetsbaarheid is toegewezen aan CVE identifier [CVE-2018-1000006](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000006).

---

## Getroffen platformen

Electron apps ontworpen om uit te voeren op Windows die zichzelf registreren als de standaard handler voor een protocol, zoals `myapp://`, zijn kwetsbaar.

Zulke apps kunnen worden beïnvloed, ongeacht hoe het protocol is geregistreerd, b.v. door gebruik te maken van de native code, het Windows register of de [app.setAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) API.

macOS en Linux zijn **niet kwetsbaar** voor dit probleem.

## Mitigatie

We hebben nieuwe versies van Electron gepubliceerd, die oplossingen voor deze kwetsbaarheid bevatten: [`1.8.2-beta.`](https://github.com/electron/electron/releases/tag/v1.8.2-beta.5), [`1.7. 2`](https://github.com/electron/electron/releases/tag/v1.7.12), en [`1.6.17`](https://github.com/electron/electron/releases/tag/v2.6.17). We dringen er bij alle ontwikkelaars van Electron op aan om hun apps onmiddellijk te updaten naar de laatste stabiele versie.

Als u om een of andere reden uw Electron versie niet kunt upgraden, je kan `--` toevoegen als laatste argument bij het bellen naar [app. etAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows), waardoor Chromium geen verdere opties kan parsen. De dubbele streepje `--` betekent het einde van de opdracht opties, waarna alleen positionele parameters worden geaccepteerd.

```js
app.setAsDefaultProtocolClient(protocol, process.execPath, [
  '--your-switches-here',
  '--'
])
```

Zie de [app.setAstProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) API voor meer informatie.

Om meer te weten te komen over beste praktijken voor het beveiligen van je Electron apps, raadpleeg onze [beveiligingshandleiding](https://electronjs.org/docs/tutorial/security).

Als u een kwetsbaarheid in Electron wilt melden, e-mail dan security@electronjs.org.
