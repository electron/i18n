---
title: Einfacheres AutoUpdate für Open-Source-Apps
author: zeke
date: '2018-05-01'
---

Today we're releasing a free, open-source, hosted [updates webservice][update.electronjs.org] and companion [npm package][update-electron-app] to enable easy automatic updates for open-source Electron apps. Dies ist ein Schritt in Richtung der Ermächtigung von App-Entwicklern, weniger über zu denken, und mehr über die Entwicklung hochwertiger Erfahrungen für ihre Nutzer.

---

<figure>
  <a href="https://github.com/electron/update-electron-app" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/39480716-e9990910-4d1d-11e8-8901-9549c6ff6050.png" alt="Updater Screenshot">
    <figcaption>Das neue Updater-Modul in Aktion</figcaption>
  </a>
</figure>

## Das Leben einfacher machen

Electron has an [autoUpdater][] API that gives apps the ability to consume metadata from a remote endpoint to check for updates, download them in the background, and install them automatically.

Enabling these updates has been a cumbersome step in the deployment process for many Electron app developers because it requires a web server to be deployed and maintained just to serve app version history metadata.

Heute kündigen wir eine neue Drop-In Lösung für automatische App-Updates an. Wenn sich Ihre Electron-App in einem öffentlichen GitHub Repository befindet und Sie GitHub Releases verwenden, um Builds zu veröffentlichen, Sie können diesen Dienst nutzen, um kontinuierliche App-Updates für Ihre Benutzer bereitzustellen.

## Benutze das neue Modul

To minimize configuration on your part, we've created [update-electron-app][], an npm module which integrates with the new [update.electronjs.org][] webservice.

Installiere das Modul:

```sh
npm install update-electron-app
```

Call it from anywhere in your app's [main process][]:

```js
require('update-electron-app')()
```

Das war's! Das Modul prüft beim Start der App nach Aktualisierungen, dann alle zehn Minuten. Wenn ein Update gefunden wird, wird es automatisch im Hintergrund heruntergeladen, und ein Dialog wird angezeigt, sobald das Update fertig ist.

## Migration bestehender Apps

Anwendungen, die bereits die autoUpdater API von Electrone verwenden, können diesen Dienst auch nutzen. To do so, you can [customize the `update-electron-app`][update-electron-app] module or [integrate directly with update.electronjs.org][update.electronjs.org].

## Alternativen

If you're using [electron-builder][] to package your app, you can use its built-in updater. Details hierzu finden Sie unter [electron.build/auto-update](https://www.electron.build/auto-update).

Wenn Ihre App privat ist, müssen Sie möglicherweise Ihren eigenen Update-Server ausführen. There are a number of open-source tools for this, including Zeit's [Hazel][] and Atlassian's [Nucleus][]. See the [Deploying an Update Server][] tutorial for more info.

## Danke

Thanks to [Julian Gruber][] for helping design and build this simple and scalable web service. Thanks to the folks at [Zeit][] for their open-source [Hazel][] service, from which we drew design inspiration. Thanks to [Samuel Attard][] for the code reviews. Vielen Dank an die Electron-Community, die beim Testen dieses Service geholfen hat.

🌲 Hier ist eine immergrüne Zukunft für Electron Apps!

[autoUpdater]: https://electronjs.org/docs/tutorial/updates
[electron-builder]: https://github.com/electron-userland/electron-builder
[Hazel]: https://github.com/zeit/hazel
[Julian Gruber]: http://juliangruber.com/
[main process]: https://electronjs.org/docs/glossary#main-process
[Deploying an Update Server]: https://electronjs.org/docs/tutorial/updates#deploying-an-update-server
[Nucleus]: https://github.com/atlassian/nucleus
[Samuel Attard]: https://www.samuelattard.com/
[update-electron-app]: https://github.com/electron/update-electron-app
[update-electron-app]: https://github.com/electron/update-electron-app
[update-electron-app]: https://github.com/electron/update-electron-app
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[Zeit]: https://zeit.co