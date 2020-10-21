# Programma's bijwerken

Er zijn verschillende manieren om een Electron applicatie bij te werken. Het gemakkelijkste en officieel ondersteunde framework maakt gebruik van de ingebouwde [Squirrel](https://github.com/Squirrel) framework en Elektron's [autoUpdater](../api/auto-updater.md) module.

## Gebruikt `update.electronjs.org`

GitHub's Electron team maintains [update.electronjs.org][], a free and open-source webservice that Electron apps can use to self-update. De service is ontworpen voor Electron apps die aan de volgende criteria voldoen:

- App wordt uitgevoerd op macOS of Windows
- App heeft een openbare GitHub repository
- Builds zijn gepubliceerd naar GitHub Releases
- Builds zijn code-signed

The easiest way to use this service is by installing [update-electron-app][], a Node.js module preconfigured for use with update.electronjs.org.

Installeer de module:

```sh
npm installatie update-electron-app
```

Indruk de updater uit het hoofdverwerkingsbestand van uw app:

```js
require('update-electron-app')()
```

Standaard zal deze module controleren op updates bij het opstarten van de app, en dan elke tien minuten. Wanneer een update wordt gevonden, zal het automatisch worden gedownload op de achtergrond. Wanneer de download voltooid is, wordt een dialoogvenster weergegeven waardoor de gebruiker de app kan herstarten.

If you need to customize your configuration, you can [pass options to `update-electron-app`][update-electron-app] or [use the update service directly][update.electronjs.org].

## Using `electron-builder`

If your app is packaged with [`electron-builder`][electron-builder-lib] you can use the [electron-updater][] module, which does not require a server and allows for updates from S3, GitHub or any other static file host. This sidesteps Electron's built-in update mechanism, meaning that the rest of this documentation will not apply to `electron-builder`'s updater.

## Een Update Server implementeren

Als je een persoonlijke Electron applicatie ontwikkelt, of als je niet releases publiceert naar GitHub Releases, het kan nodig zijn om je eigen updateserver te beheren.

Afhankelijk van uw behoeften kunt u kiezen uit een van deze:

- [Hazel][hazel] – Update server for private or open-source apps which can be deployed for free on [Now][now]. It pulls from [GitHub Releases][gh-releases] and leverages the power of GitHub's CDN.
- [Nuts][nuts] – Also uses [GitHub Releases][gh-releases], but caches app updates on disk and supports private repositories.
- [electron-release-server][electron-release-server] – Provides a dashboard for handling releases and does not require releases to originate on GitHub.
- [Nucleus][nucleus] – A complete update server for Electron apps maintained by Atlassian. Ondersteunt meerdere applicaties en kanalen; gebruikt een statische bestandsopslag om de serverkosten te minimaliseren.

## Updates implementeren in uw App

Zodra je je updateserver hebt gebruikt, ga je verder met het importeren van de benodigde modules in je code. De volgende code kan variëren voor verschillende server software, maar het werkt zoals beschreven bij het gebruik van [Hazel](https://github.com/zeit/hazel).

**Belangrijk:** Zorg ervoor dat de onderstaande code alleen wordt uitgevoerd in uw verpakte app, en niet in ontwikkeling. Je kunt [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) gebruiken om te controleren op de omgeving.

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

Bouw vervolgens de URL van de updateserver en vertel [autoUpdater](../api/auto-updater.md) erover:

```javascript
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
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
    detail: 'Een nieuwe versie is gedownload. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
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

[electron-builder-lib]: https://github.com/electron-userland/electron-builder
[electron-updater]: https://www.electron.build/auto-update
[now]: https://zeit.co/now
[hazel]: https://github.com/zeit/hazel
[nuts]: https://github.com/GitbookIO/nuts
[gh-releases]: https://help.github.com/articles/creating-releases/
[electron-release-server]: https://github.com/ArekSredzki/electron-release-server
[nucleus]: https://github.com/atlassian/nucleus
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update-electron-app]: https://github.com/electron/update-electron-app
[update-electron-app]: https://github.com/electron/update-electron-app
