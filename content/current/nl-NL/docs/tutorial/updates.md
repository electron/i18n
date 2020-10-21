# Programma's bijwerken

Er zijn verschillende manieren om een Electron applicatie bij te werken. Het gemakkelijkste en officieel ondersteunde framework maakt gebruik van de ingebouwde [Squirrel](https://github.com/Squirrel) framework en Elektron's [autoUpdater](../api/auto-updater.md) module.

## Gebruikt `update.electronjs.org`

Het Electron team onderhoudt [update.electronjs.org](https://github.com/electron/update.electronjs.org), een gratis en open-source webservice die Electron apps kunnen gebruiken om zichzelf bij te werken. De service is ontworpen voor Electron apps die aan de volgende criteria voldoen:

- App wordt uitgevoerd op macOS of Windows
- App heeft een openbare GitHub repository
- Builds zijn gepubliceerd naar GitHub Releases
- Builds zijn code-signed

De eenvoudigste manier om deze service te gebruiken is door [de update-electron-app](https://github.com/electron/update-electron-app)te installeren, een Node.js module vooraf geconfigureerd voor gebruik met update.electronjs.org.

Installeer de module:

```sh
npm installatie update-electron-app
```

Indruk de updater uit het hoofdverwerkingsbestand van uw app:

```js
require('update-electron-app')()
```

Standaard zal deze module controleren op updates bij het opstarten van de app, en dan elke tien minuten. Wanneer een update wordt gevonden, zal het automatisch worden gedownload op de achtergrond. Wanneer de download voltooid is, wordt een dialoogvenster weergegeven waardoor de gebruiker de app kan herstarten.

Als u uw configuratie wilt aanpassen, u kunt [opties doorgeven voor `het bijwerken van de app`](https://github.com/electron/update-electron-app) of [de update service direct](https://github.com/electron/update.electronjs.org).

## Een Update Server implementeren

Als je een persoonlijke Electron applicatie ontwikkelt, of als je niet releases publiceert naar GitHub Releases, het kan nodig zijn om je eigen updateserver te beheren.

Afhankelijk van uw behoeften kunt u kiezen uit een van deze:

- [Hazel](https://github.com/zeit/hazel) – Update server voor privé of open-source apps die gratis kunnen worden ingezet op [Now](https://zeit.co/now). Het haalt van [GitHub Releases](https://help.github.com/articles/creating-releases/) en gebruikt de kracht van GitHub's CDN.
- [Nuts](https://github.com/GitbookIO/nuts) - ook gebruik [GitHub Releases](https://help.github.com/articles/creating-releases/), maar caches app update op schijf en ondersteunt privé repositories.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) - biedt een dashboard voor releases en hoeft geen releases te gebruiken om op GitHub te komen.
- [Nucleus](https://github.com/atlassian/nucleus) – Een complete updateserver voor Electron apps onderhouden door Atlassian. Ondersteunt meerdere applicaties en kanalen; gebruikt een statische bestandsopslag om de serverkosten te minimaliseren.

## Updates implementeren in uw App

Zodra je je updateserver hebt gebruikt, ga je verder met het importeren van de benodigde modules in je code. De volgende code kan variëren voor verschillende server software, maar het werkt zoals beschreven bij het gebruik van [Hazel](https://github.com/zeit/hazel).

**Belangrijk:** Zorg ervoor dat de onderstaande code alleen wordt uitgevoerd in uw verpakte app, en niet in ontwikkeling. Je kunt [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) gebruiken om te controleren op de omgeving.

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

Bouw vervolgens de URL van de updateserver en vertel [autoUpdater](../api/auto-updater.md) erover:

```javascript
const server = 'https://your-deployment-url.com'
const url = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL({ url })
```

Als laatste stap controleren op updates. Het voorbeeld hieronder controleert elke minuut:

```javascript
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

Zodra uw aanvraag [verpakt is](../tutorial/application-distribution.md), het zal voor elk nieuw [GitHub Release](https://help.github.com/articles/creating-releases/) die je publiceert een update ontvangen.

## Updates toepassen

Nu je het basisupdatesysteem voor je sollicitatie hebt geconfigureerd, u moet ervoor zorgen dat de gebruiker een melding krijgt wanneer er een update is. Dit kan worden bereikt met de autoUpdater API [events](../api/auto-updater.md#events):

```javascript
Automatische updater. n('update gedownload', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    knoppen: ['Herstarten', 'Later'],
    titel: 'Toepassing bijwerken',
    bericht: proces. latform === 'win32' ? releaseNotes : releaseName,
    detail: 'Een nieuwe versie is gedownload. Herstart de applicatie om de updates toe te passen.
  }

  dialoogvensterMessageBox(dialogOpts).then((retour nValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})
```

Zorg er ook voor dat fouten [worden afgehandeld](../api/auto-updater.md#event-error). Hier is een voorbeeld voor het loggen van ze naar `stderr`:

```javascript
autoUpdater.on('error', bericht => {
  console.error('Er was een probleem bij het bijwerken van de applicatie')
  console.error(message)
})
```

## Handmatig bijwerken verwerken

Omdat de verzoeken van Auto Update niet onder uw directe controle vallen u vindt mogelijk situaties die moeilijk te verwerken zijn (bijvoorbeeld als de updateserver achter de authenticatie zitten). Het `url` veld ondersteunt bestanden, wat betekent dat je met enige inspanning het server-communicatieaspect van het proces kunt omzeilen. [Dit is een voorbeeld van hoe dit zou kunnen werken](https://github.com/electron/electron/issues/5020#issuecomment-477636990).
