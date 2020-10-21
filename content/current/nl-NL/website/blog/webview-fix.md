---
title: Webview kwetsbaarheid reparatie
author: ckerr
date: '2018-03-21'
---

Een kwetsbaarheid is ontdekt waarmee de Node.js integratie opnieuw kan worden ingeschakeld in sommige Electron applicaties die het uitschakelen. Deze kwetsbaarheid is toegewezen aan CVE identificatie [CVE-2018-1000136](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000136).

---

## Getroffen toepassingen

Een toepassing wordt beïnvloed als *alle* van het volgende waar zijn:

 1. Voert uit op Electron 1.7, 1.8, of een 2.0.0-beta
 2. Uitvoering van willekeurige code op afstand toestaan
 3. Schakelt Node.js integratie uit
 4. Geeft niet expliciet `webviewTag: false` in zijn webvoorkeuren
 5. Schakel de `nativeWindowOptie` optie niet in
 6. Onderschep niet `nieuw venster` evenementen en overschrijf handmatig `event.newGuest` zonder gebruik te maken van de meegeleverde opties tag

Hoewel dit een minderheid van Electron lijkt te zijn, moedigen we alle toepassingen aan om als voorzorgsmaatregel te worden opgewaardeerd.

## Mitigatie

Deze kwetsbaarheid is verholpen in [1.7.13](https://github.com/electron/electron/releases/tag/v1.7.13)van vandaag, [1.8.4](https://github.com/electron/electron/releases/tag/v1.8.4)en [2.0.0-beta.5](https://github.com/electron/electron/releases/tag/v2.0.0-beta.5) releases.

Ontwikkelaars die niet in staat zijn om de Electron versie van hun applicatie te upgraden kunnen de kwetsbaarheid verzachten met de volgende code:

```js
app.on('web-contents-created', (event, win) => {
  win. n('nieuw-venster', (event, nieuweURL, frameNme, dispositie,
                        opties additionele functies) => {
    als (! pties. ebPreferences) optis.webPreferences = {};
    options.webVoorkeuren. odeIntegration = false;
    options.webPreferences.nodeIntegrationInWorker = false;
    opties. ebPreferences.webviewTag = false;
    verwijder options.webVoorkeuren. reload;
  })
})

// en *IF* dat je helemaal geen WebViews gebruikt,
// je zou ook
app kunnen willen. n('web-contents-aangemaakt', (evenement, win) => {
  win. n('will-attach-webview', (event, webPreferences, params) => {
    event.preventDefault();
  })
})
```

## Verdere informatie

Deze kwetsbaarheid is gevonden en op verantwoorde wijze gerapporteerd aan het Electron project door Brendan Scarvell van [Trustwave SpiderLabs](https://www.trustwave.com/Company/SpiderLabs/).

Om meer te weten te komen over beste praktijken om je Electron apps veilig te houden, bekijk onze [beveiligingshandleiding](https://electronjs.org/docs/tutorial/security).

Om een kwetsbaarheid bij Electron te melden, stuur een e-mail naar security@electronjs.org.

Sluit u aan bij onze [e-maillijst](https://groups.google.com/forum/#!forum/electronjs) om updates te ontvangen over releases en beveiligingsupdates.

