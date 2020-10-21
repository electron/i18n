# Actualizarea aplicațiilor

Există mai multe moduri de a actualiza o aplicație Electron. The easiest and officially supported one is taking advantage of the built-in [Squirrel](https://github.com/Squirrel) framework and Electron's [autoUpdater](../api/auto-updater.md) module.

## Folosind `update.electronjs.org`

GitHub's Electron team maintains [update.electronjs.org][], a free and open-source webservice that Electron apps can use to self-update. Serviciul este proiectat pentru aplicații Electron care îndeplinesc următoarele criterii:

- Aplicația rulează pe macOS sau Windows
- Aplicația are un depozit public GitHub
- Versiuni sunt publicate pe GitHub lansări
- Clădirile sunt marcate cu cod

The easiest way to use this service is by installing [update-electron-app][], a Node.js module preconfigured for use with update.electronjs.org.

Instaleaza modulul:

```sh
npm instalați update-electron-app
```

Invocă actualizarea din fișierul de proces principal al aplicației tale:

```js
require('update-electron-app')()
```

În mod implicit, acest modul va verifica actualizările la pornirea aplicației, apoi la fiecare zece minute. Când este găsită o actualizare, aceasta va fi descărcată automat în fundal. Când descărcarea se termină, un dialog este afișat care permite utilizatorului să repornească aplicația.

If you need to customize your configuration, you can [pass options to `update-electron-app`][update-electron-app] or [use the update service directly][update.electronjs.org].

## Using `electron-builder`

If your app is packaged with [`electron-builder`][electron-builder-lib] you can use the [electron-updater][] module, which does not require a server and allows for updates from S3, GitHub or any other static file host. This sidesteps Electron's built-in update mechanism, meaning that the rest of this documentation will not apply to `electron-builder`'s updater.

## Implementarea unui server de actualizare

Dacă dezvoltați o aplicație Electron privată, sau dacă nu publicați versiuni pe GitHub, poate fi necesar să rulezi propriul tău server de actualizare .

În funcție de nevoile tale, poți alege din unul dintre acestea:

- [Hazel][hazel] – Update server for private or open-source apps which can be deployed for free on [Now][now]. It pulls from [GitHub Releases][gh-releases] and leverages the power of GitHub's CDN.
- [Nuts][nuts] – Also uses [GitHub Releases][gh-releases], but caches app updates on disk and supports private repositories.
- [electron-release-server][electron-release-server] – Provides a dashboard for handling releases and does not require releases to originate on GitHub.
- [Nucleus][nucleus] – A complete update server for Electron apps maintained by Atlassian. Suportă mai multe aplicații și canale; folosește un magazin static de fișiere pentru a micșora costul serverului.

## Implementarea actualizărilor în aplicația ta

Odată ce ai instalat serverul de actualizare, continuă să importe modulele necesare din codul tău. Următorul cod poate varia pentru alt server software, dar funcţionează ca cel descris atunci când se utilizează [Hazel](https://github.com/zeit/hazel).

**Important:** Asigurați-vă că codul de mai jos va fi executat doar în aplicația dvs. pachetată, și nu în dezvoltare. Puteţi utiliza [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) pentru a verifica mediul.

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

Apoi, construiește URL-ul serverului de actualizare și spune [autoUpdater](../api/auto-updater.md) despre acesta:

```javascript
const server = 'https://your-deployment-url.com'
const feed = '${server}/update/${process.platform}/${app.getVersion()}'

autoUpdater.setFeedURL(feed)
```

Ca ultim pas, verifică actualizările. Exemplul de mai jos va verifica în fiecare minut:

```javascript
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

Odată ce aplicația dvs. este [împachetată](../tutorial/application-distribution.md), va primi o actualizare pentru fiecare nou[Versiunea GitHub](https://help.github.com/articles/creating-releases/) pe care o publicați.

## Aplicarea actualizărilor

Now that you've configured the basic update mechanism for your application, you need to ensure that the user will get notified when there's an update. Acest poate fi realizat folosind evenimentele API autoUpdater [](../api/auto-updater.md#events):

```javascript
autoactualizare. n('update-Downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    butoane: ['Restart', 'Mai târziu'],
    titlu: 'Actualizare aplicație',
    : proces. latform === 'win32' ? Noutăți: lansareName,
    detaliu: 'A new version has been downloaded. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts, (response) => {
    if (response === 0) autoUpdater.quitAndInstall()
  })
})
```

De asemenea, asigură-te că erorile sunt [tratate](../api/auto-updater.md#event-error). Iată un exemplu pentru a le conecta la `stderr`:

```javascript
autoUpdater.on('error', message => {
  console.error('A apărut o problemă la actualizarea aplicației')
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
