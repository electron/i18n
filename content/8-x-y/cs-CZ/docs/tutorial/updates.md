# Aktualizace aplikací

Existuje několik způsobů, jak aktualizovat Electron aplikaci. The easiest and officially supported one is taking advantage of the built-in [Squirrel](https://github.com/Squirrel) framework and Electron's [autoUpdater](../api/auto-updater.md) module.

## Používá se `update.electronjs.org`

GitHub's Electron team maintains [update.electronjs.org][], a free and open-source webservice that Electron apps can use to self-update. Služba je určena pro elektronové aplikace, které splňují tato kritéria:

- Aplikace běží na macOS nebo Windows
- Aplikace má veřejný GitHub repositář
- Builds are published to GitHub Releases
- Buildy jsou podepsány kódem

The easiest way to use this service is by installing [update-electron-app][], a Node.js module preconfigured for use with update.electronjs.org.

Instalovat modul:

```sh
npm nainstalovat update-electron-app
```

Vypněte aktualizátor z hlavního souboru vašeho procesu:

```js
vyžadováno ('update-electron-app')()
```

Ve výchozím nastavení bude tento modul kontrolovat aktualizace při spuštění aplikace a poté každých deset minut. Po nalezení aktualizace bude automaticky stažena na pozadí. Po dokončení stahování se zobrazí dialogové okno, které umožní uživateli restartovat aplikaci.

If you need to customize your configuration, you can [pass options to `update-electron-app`][update-electron-app] or [use the update service directly][update.electronjs.org].

## Using `electron-builder`

If your app is packaged with [`electron-builder`][electron-builder-lib] you can use the [electron-updater][] module, which does not require a server and allows for updates from S3, GitHub or any other static file host. This sidesteps Electron's built-in update mechanism, meaning that the rest of this documentation will not apply to `electron-builder`'s updater.

## Publikování aktualizačního serveru

Pokud vytváříte soukromou Electron aplikaci, nebo pokud nepublikujete vydání GitHub Releases, může být nutné spustit vlastní aktualizační server.

V závislosti na vašich potřebách si můžete vybrat:

- [Hazel][hazel] – Update server for private or open-source apps which can be deployed for free on [Now][now]. It pulls from [GitHub Releases][gh-releases] and leverages the power of GitHub's CDN.
- [Nuts][nuts] – Also uses [GitHub Releases][gh-releases], but caches app updates on disk and supports private repositories.
- [electron-release-server][electron-release-server] – Provides a dashboard for handling releases and does not require releases to originate on GitHub.
- [Nucleus][nucleus] – A complete update server for Electron apps maintained by Atlassian. Podporuje více aplikací a kanálů; používá statické úložiště souborů k vytěžování nákladů na server.

## Provádění aktualizací ve vaší aplikaci

Jakmile vložíte aktualizační server, pokračujte v importu požadovaných modulů do vašeho kódu. Následující kód se může u různých serverů lišit, ale funguje jako při použití [Hazel](https://github.com/zeit/hazel).

**Důležité:** Ujistěte se, že níže uvedený kód bude spuštěn pouze v vaší zabalené aplikaci, a nikoli ve vývoji. Můžete použít [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) ke kontrole životního prostředí.

```javascript
const { app, autoUpdater, dialog } = vyžadováno ('electron')
```

Dále vytvořte URL aktualizačního serveru a řekněte [autoUpdater](../api/auto-updater.md) o tom:

```javascript
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

Jako poslední krok se podívejte na aktualizace. Níže uvedený příklad zkontroluje každou minutu:

```javascript
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

Jakmile je vaše aplikace [zabalena](../tutorial/application-distribution.md), obdrží aktualizaci každé nové [vydání GitHub](https://help.github.com/articles/creating-releases/) , které jste publikovali.

## Aplikování aktualizací

Nyní jste nakonfigurovali základní aktualizační mechanismus pro vaši aplikaci, je třeba zajistit, aby byl uživatel upozorněn, až bude aktualizován. Tohoto lze dosáhnout pomocí autoUpdater API [událostí](../api/auto-updater.md#events):

```javascript
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'Byla stažena nová verze. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts, (response) => {
    if (response === 0) autoUpdater.quitAndInstall()
  })
})
```

Také se ujistěte, že chyby jsou zpracovávány [](../api/auto-updater.md#event-error). Zde je příklad pro logování do `bodu`:

```javascript
autoUpdater.on('error', message => {
  console.error('Při aktualizaci aplikace došlo k chybě')
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
