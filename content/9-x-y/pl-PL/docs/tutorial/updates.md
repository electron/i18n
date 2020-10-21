# Aktualizowanie aplikacji

Istnieje kilka sposobów, aby zaktualizować aplikację Electron. Ten najprostszy i oficjalnie wspierany jest korzystając z wbudowanej struktury [Squirrel](https://github.com/Squirrel) oraz modułu [autoUpdater](../api/auto-updater.md) Electron'a.

## Używanie `update.electronjs.org`

GitHub's Electron team maintains [update.electronjs.org][], a free and open-source webservice that Electron apps can use to self-update. Usługa jest zaprojektowana dla aplikacji Electrona, które spełniają następujące kryteria:

- Aplikacja działa na macOS lub Windows
- Aplikacja ma publiczne repozytorium GitHub
- Kompilacje są publikowane w wersjach GitHub
- Kompilacje są podpisane kodem

The easiest way to use this service is by installing [update-electron-app][], a Node.js module preconfigured for use with update.electronjs.org.

Zainstaluj moduł:

```sh
npm install update-electron-app
```

Wywołaj aktualizatora z głównego pliku procesowego aplikacji:

```js
require('update-electron-app')()
```

Domyślnie ten moduł będzie sprawdzał dostępność aktualizacji przy starcie aplikacji, a następnie co dziesięć minut. Gdy zostanie znaleziona aktualizacja, zostanie automatycznie pobrana w tle. Po zakończeniu pobierania, wyświetlane jest okno dialogowe pozwalające użytkownikowi na ponowne uruchomienie aplikacji.

If you need to customize your configuration, you can [pass options to `update-electron-app`][update-electron-app] or [use the update service directly][update.electronjs.org].

## Using `electron-builder`

If your app is packaged with [`electron-builder`][electron-builder-lib] you can use the [electron-updater][] module, which does not require a server and allows for updates from S3, GitHub or any other static file host. This sidesteps Electron's built-in update mechanism, meaning that the rest of this documentation will not apply to `electron-builder`'s updater.

## Wdrażanie aktualizacji serwera

Jeśli tworzysz prywatną aplikację Electrona lub jeśli nie publikujesz wydań do GitHub Releases, może być konieczne uruchomienie własnego serwera aktualizacji.

W zależności od potrzeb można wybrać z jednego z tych:

- [Hazel][hazel] – Update server for private or open-source apps which can be deployed for free on [Now][now]. It pulls from [GitHub Releases][gh-releases] and leverages the power of GitHub's CDN.
- [Nuts][nuts] – Also uses [GitHub Releases][gh-releases], but caches app updates on disk and supports private repositories.
- [electron-release-server][electron-release-server] – Provides a dashboard for handling releases and does not require releases to originate on GitHub.
- [Nucleus][nucleus] – A complete update server for Electron apps maintained by Atlassian. Obsługuje wiele aplikacji i kanałów; używa statycznego sklepu plików , aby zminimalizować koszty serwera.

## Wdrażanie aktualizacji do twojej aplikacji

Po wdrożeniu swojego serwera aktualizacji, kontynuuj importowanie wymaganych modułów w kodzie. Poniższy kod może się różnić dla różnych serwerów oprogramowania, ale działa tak jak opisano podczas używania [Hazel](https://github.com/zeit/hazel).

**Ważne:** Upewnij się, że poniższy kod zostanie wykonany tylko w spakowanej aplikacji, a nie w fazie rozwoju. Możesz użyć [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) aby sprawdzić środowisko.

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

Następnie skonstruuj adres URL serwera aktualizacji i powiedz [autoUpdater](../api/auto-updater.md) o nim:

```javascript
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

Jako ostatni krok, sprawdź aktualizacje. Poniższy przykład będzie sprawdzać co minutę:

```javascript
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

Gdy Twoja aplikacja jest [zapakowana](../tutorial/application-distribution.md), otrzyma aktualizację dla każdej nowej [wersji GitHub](https://help.github.com/articles/creating-releases/) , którą opublikowałeś .

## Stosowanie aktualizacji

Teraz, gdy skonfigurowałeś podstawowy mechanizm aktualizacji dla swojej aplikacji, musisz upewnić się, że użytkownik otrzyma powiadomienie, gdy pojawi się aktualizacja. Ten można osiągnąć za pomocą API autoUpdatera [zdarzeń](../api/auto-updater.md#events):

```javascript
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'Nowa wersja została pobrana. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})
```

Upewnij się, że błędy są [obsługiwane](../api/auto-updater.md#event-error). Oto przykład logowania do `stderr`:

```javascript
autoUpdater.on('error', message => {
  console.error('Wystąpił problem podczas aktualizowania aplikacji')
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
