# Actualizarea aplicațiilor

Există mai multe moduri de a actualiza o aplicație Electron. The easiest and officially supported one is taking advantage of the built-in [Squirrel](https://github.com/Squirrel) framework and Electron's [autoUpdater](../api/auto-updater.md) module.

## Folosind `update.electronjs.org`

Echipa Electron menține [update.electronjs.org][], un webservice gratuit și open-source pe care aplicațiile Electron le pot folosi pentru a se actualiza. Serviciul este proiectat pentru aplicații Electron care îndeplinesc următoarele criterii:

- Aplicația rulează pe macOS sau Windows
- Aplicația are un depozit public GitHub
- Versiuni sunt publicate pe GitHub lansări
- Clădirile sunt marcate cu cod

Cel mai simplu mod de a utiliza acest serviciu este prin instalarea [update-electron-app][], un modul Node.js preconfigurat pentru a fi folosit cu update.electronjs.org.

Instaleaza modulul:

```sh
npm instalați update-electron-app
```

Invocă actualizarea din fișierul de proces principal al aplicației tale:

```js
require('update-electron-app')()
```

În mod implicit, acest modul va verifica actualizările la pornirea aplicației, apoi la fiecare zece minute. Când este găsită o actualizare, aceasta va fi descărcată automat în fundal. Când descărcarea se termină, un dialog este afișat care permite utilizatorului să repornească aplicația.

Dacă trebuie să vă personalizați configurația, poți [trece de opțiuni la `update-electron-app`][update-electron-app] sau [folosind serviciul de actualizare direct][update.electronjs.org].

## Implementarea unui server de actualizare

Dacă dezvoltați o aplicație Electron privată, sau dacă nu publicați versiuni pe GitHub, poate fi necesar să rulezi propriul tău server de actualizare .

În funcție de nevoile tale, poți alege din unul dintre acestea:

- [Hazel][hazel] – Actualizare server pentru aplicații private sau open-source care pot fi implementate gratuit pe [Acum][now]. Acesta trage din [GitHub lansări][gh-releases] și mobilizează puterea CDN-ului GitHub.
- [Nuts][nuts] – folosește și [GitHub Releases][gh-releases], dar cacheează aplicația actualizări pe disc și suportă depozite private.
- [Eliberare de electronon][electron-release-server] – Furnizează un tablou de bord pentru versiuni de manipulare și nu necesită lansări pentru a porni pe GitHub.
- [Nucleus][nucleus] - un server complet de actualizare pentru aplicațiile Electron întreținut de Atlassian. Suportă mai multe aplicații și canale; folosește un magazin static de fișiere pentru a micșora costul serverului.

## Implementarea actualizărilor în aplicația ta

Odată ce ai instalat serverul de actualizare, continuă să importe modulele necesare din codul tău. Următorul cod poate varia pentru alt server software, dar funcţionează ca cel descris atunci când se utilizează [Hazel](https://github.com/zeit/hazel).

**Important:** Asigurați-vă că codul de mai jos va fi executat doar în aplicația dvs. pachetată, și nu în dezvoltare. Puteţi utiliza [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) pentru a verifica mediul.

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

Apoi, construiește URL-ul serverului de actualizare și spune [autoUpdater](../api/auto-updater.md) despre acesta:

```javascript
const server = 'https://your-deployment-url.com'
const url = '${server}/update/${process.platform}/${app.getVersion()}'

autoUpdater.setFeedURL({ url })
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

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
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

## Actualizări manuale

Deoarece solicitările făcute de Auto Update nu sunt sub controlul dvs. direct, puteți găsi situații care sunt dificil de gestionat (cum ar fi dacă serverul de actualizare se află în spatele autentificării). Câmpul `url` suportă fișiere, ceea ce înseamnă că, cu un oarecare efort, poți ignora aspectul de comunicare a server-ului. [Iată un exemplu despre cum ar putea funcționa acest lucru](https://github.com/electron/electron/issues/5020#issuecomment-477636990).

[now]: https://zeit.co/now
[hazel]: https://github.com/zeit/hazel
[nuts]: https://github.com/GitbookIO/nuts
[gh-releases]: https://help.github.com/articles/creating-releases/
[gh-releases]: https://help.github.com/articles/creating-releases/
[electron-release-server]: https://github.com/ArekSredzki/electron-release-server
[nucleus]: https://github.com/atlassian/nucleus
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update-electron-app]: https://github.com/electron/update-electron-app
[update-electron-app]: https://github.com/electron/update-electron-app
