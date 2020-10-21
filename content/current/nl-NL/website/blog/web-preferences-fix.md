---
title: WebPreferences Kwetsbaarheid Fix
author: ckerr
date: '2018-08-22'
---

Er is een kwetsbaarheid voor uitvoering op afstand ontdekt voor apps met de mogelijkheid om geneste subvensters te openen op Electron versies (3. .0-beta.6, 2.0.7, 1.8.7 en 1.7.15). Deze kwetsbaarheid is toegewezen aan CVE identificatie [CVE-2018-15685](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-15685).

---

## Getroffen platformen

Je wordt beïnvloed als:

1. Je hebt _elke_ externe gebruikersinhoud ingevoegd, zelfs in een sandbox
2. U accepteert gebruikersinvoer met alle XSS kwetsbaarheden

_Beschrijving_

Je wordt beïnvloed als een gebruikerscode binnen een `iframe` / een `iframe` kan maken. Gezien de mogelijkheid van een kwetsbaarheid van XSS kunnen we ervan uitgaan dat de meeste apps kwetsbaar zijn voor deze zaak.

Het werkt ook als u een van uw ramen opent met de `nativeWindowOpen: true` or `sandbox: true` optie.  Hoewel deze kwetsbaarheid ook een XSS kwetsbaarheid in je app vereist, als je een van deze opties gebruikt, moet je nog steeds een van de onderstaande mitigaties toepassen.

## Mitigatie

We've published new versions of Electron which include fixes for  this vulnerability: [`3.0.0-beta.7`](https://github.com/electron/electron/releases/tag/v3.0.0-beta.7), [`2.0.8`](https://github.com/electron/electron/releases/tag/v2.0.8), [`1.8.8`](https://github.com/electron/electron/releases/tag/v1.8.8), and [`1.7.16`](https://github.com/electron/electron/releases/tag/v1.7.16). We dringen er bij alle ontwikkelaars van Electron op aan hun apps onmiddellijk te updaten naar de laatste stabiele versie.

Als u om een of andere reden uw Electron versie niet kunt upgraden, kunt u uw app beschermen door een deken-call `event. herventDefault()` op het `nieuw-venster` evenement voor alle  `webcontent`'. Als u `window.open` of subvensters helemaal niet gebruikt, dan is dit ook een geldige mitigatie voor uw app.

```javascript
mainWindow.webContents.on('nieuw-venster', e => e.preventDefault())
```

Als u erop vertrouwt dat uw kinderraamen kleinkindramen kunnen maken, dan is een derde mitigatiestrategie om de volgende code in je topvenster te gebruiken:

```javascript
const enforceInheritance = (topWebContents) => {
  const handle = (webContents) => {
    webContents. n('nieuw-venster', (event, url, frameName, dispositie, opties) => {
      if (!options ebPreferences) {
        opties. ebPreferences = {}
      }
      Object. ssign(options.webPreferences, topWebContents.getLastWebPreferences())
      if (options.webContents) {
        handle(opties. ebContents)
      }
    })
  }
  handle(topWebContents)
}

enforceInheritance(mainWindow. ebContent
```

Deze code zorgt ervoor dat het hoogste niveau scherm `webPreferences` handmatig wordt toegepast op alle onderliggende vensters oneindig diep.

## Verdere informatie

Deze kwetsbaarheid is gevonden en op verantwoorde wijze gerapporteerd aan het Electron project door [Matt Austin](https://twitter.com/mattaustin) of [Contrast Security](https://www.contrastsecurity.com/security-influencers/cve-2018-15685).

Om meer te weten te komen over beste praktijken om je Electron apps veilig te houden, bekijk onze [beveiligingshandleiding](https://electronjs.org/docs/tutorial/security).

Als u een kwetsbaarheid in Electron wilt melden, e-mail security@electronjs.org.
