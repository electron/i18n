---
title: Einfacheres AutoUpdate für Open-Source-Apps
author: zeke
date: '2018-05-01'
---

Heute veröffentlichen wir ein kostenloses Open-Source, [aktualisiert Webservice](https://github.com/electron/update.electronjs.org) und Begleiter [npm Paket](https://github.com/electron/update-electron-app) um einfache automatische Updates für Open-Source Electron Apps zu ermöglichen. Dies ist ein Schritt in Richtung der Ermächtigung von App-Entwicklern, weniger über zu denken, und mehr über die Entwicklung hochwertiger Erfahrungen für ihre Nutzer.

---

<figure>
  <a href="https://github.com/electron/update-electron-app" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/39480716-e9990910-4d1d-11e8-8901-9549c6ff6050.png" alt="Updater Screenshot">
    <figcaption>Das neue Updater-Modul in Aktion</figcaption>
  </a>
</figure>

## Das Leben einfacher machen

Electron has an [autoUpdater](https://electronjs.org/docs/tutorial/updates) API that gives apps the ability to consume metadata from a remote endpoint to check for updates, download them in the background, and install them automatically.

Enabling these updates has been a cumbersome step in the deployment process for many Electron app developers because it requires a web server to be deployed and maintained just to serve app version history metadata.

Heute kündigen wir eine neue Drop-In Lösung für automatische App-Updates an. Wenn sich Ihre Electron-App in einem öffentlichen GitHub Repository befindet und Sie GitHub Releases verwenden, um Builds zu veröffentlichen, Sie können diesen Dienst nutzen, um kontinuierliche App-Updates für Ihre Benutzer bereitzustellen.

## Benutze das neue Modul

Um die Konfiguration Ihrerseits zu minimieren, haben wir [update-electron-app](https://github.com/electron/update-electron-app), ein npm Modul erstellt, das mit dem neuen [update.electronjs.org](https://github.com/electron/update.electronjs.org) webservice integriert ist.

Installiere das Modul:

```sh
npm install update-electron-app
```

Call it from anywhere in your app's [main process](https://electronjs.org/docs/glossary#main-process):

```js
require('update-electron-app')()
```

Das war's! Das Modul prüft beim Start der App nach Aktualisierungen, dann alle zehn Minuten. Wenn ein Update gefunden wird, wird es automatisch im Hintergrund heruntergeladen, und ein Dialog wird angezeigt, sobald das Update fertig ist.

## Migration bestehender Apps

Anwendungen, die bereits die autoUpdater API von Electrone verwenden, können diesen Dienst auch nutzen. Dazu können Sie [die `update-electron-app anpassen`](https://github.com/electron/update-electron-app) Modul oder [direkt mit update.electronjs.org](https://github.com/electron/update.electronjs.org) integrieren.

## Alternativen

Wenn Sie [Electron-Builder](https://github.com/electron-userland/electron-builder) verwenden, um Ihre App zu paketieren, können Sie die eingebaute Aktualisierung verwenden. Details hierzu finden Sie unter [electron.build/auto-update](https://www.electron.build/auto-update).

Wenn Ihre App privat ist, müssen Sie möglicherweise Ihren eigenen Update-Server ausführen. Es gibt eine Reihe von Open-Source-Tools, darunter Zeit's [Hazel](https://github.com/zeit/hazel) und Atlassian's [Nucleus](https://github.com/atlassian/nucleus). Siehe [Verteilen eines Update-Servers](https://electronjs.org/docs/tutorial/updates#deploying-an-update-server) Tutorials für weitere Infos.

## Danke

[Julian Gruber](http://juliangruber.com/) hat geholfen, diesen einfachen und skalierbaren Webservice zu entwerfen und zu bauen. Vielen Dank an die Leute bei [Zeit](https://zeit.co) für ihren Open-Source- [Hazel](https://github.com/zeit/hazel) Service, von dem wir Design Inspiration. Vielen Dank an [Samuel Attard](https://www.samuelattard.com/) für die Code-Bewertungen. Vielen Dank an die Electron-Community, die beim Testen dieses Service geholfen hat.

🌲 Hier ist eine immergrüne Zukunft für Electron Apps!