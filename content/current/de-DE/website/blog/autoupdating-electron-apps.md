---
title: Easier AutoUpdating for Open-Source Apps
author: zeke
date: '2018-05-01'
---

Today we're releasing a free, open-source, hosted [updates webservice](https://github.com/electron/update.electronjs.org) and companion [npm package](https://github.com/electron/update-electron-app) to enable easy automatic updates for open-source Electron apps. This is a step toward empowering app developers to think less about deployment and more about developing high-quality experiences for their users.

---

<figure>
  <a href="https://github.com/electron/update-electron-app" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/39480716-e9990910-4d1d-11e8-8901-9549c6ff6050.png" alt="Updater Screenshot">
    <figcaption>The new updater module in action</figcaption>
  </a>
</figure>

## Making life easier

Electron has an [autoUpdater](https://electronjs.org/docs/tutorial/updates) API that gives apps the ability to consume metadata from a remote endpoint to check for updates, download them in the background, and install them automatically.

Enabling these updates has been a cumbersome step in the deployment process for many Electron app developers because it requires a web server to be deployed and maintained just to serve app version history metadata.

Today we are announcing a new drop-in solution for automatic app updates. If your Electron app is in a public GitHub repository and you're using GitHub Releases to publish builds, you can use this service to deliver continuous app updates to your users.

## Using the new module

To minimize configuration on your part, we've created [update-electron-app](https://github.com/electron/update-electron-app), an npm module which integrates with the new [update.electronjs.org](https://github.com/electron/update.electronjs.org) webservice.

Installiere das Modul:

```sh
npm install update-electron-app
```

Call it from anywhere in your app's [main process](https://electronjs.org/docs/glossary#main-process):

```js
require('update-electron-app')()
```

That's it! The module will check for updates at app startup, then every ten minutes. When an update is found it will download automically in the background, and a dialog will be displayed when the update is ready.

## Migrating existing apps

Apps already using Electron's autoUpdater API can use this service too. To do so, you can [customize the `update-electron-app`](https://github.com/electron/update-electron-app) module or [integrate directly with update.electronjs.org](https://github.com/electron/update.electronjs.org).

## Alternatives

If you're using [electron-builder](https://github.com/electron-userland/electron-builder) to package your app, you can use its built-in updater. For details, see [electron.build/auto-update](https://www.electron.build/auto-update).

If your app is private, you may need to run your own update server. There are a number of open-source tools for this, including Zeit's [Hazel](https://github.com/zeit/hazel) and Atlassian's [Nucleus](https://github.com/atlassian/nucleus). See the [Deploying an Update Server](https://electronjs.org/docs/tutorial/updates#deploying-an-update-server) tutorial for more info.

## Thanks

Thanks to [Julian Gruber](http://juliangruber.com/) for helping design and build this simple and scalable web service. Thanks to the folks at [Zeit](https://zeit.co) for their open-source [Hazel](https://github.com/zeit/hazel) service, from which we drew design inspiration. Thanks to [Samuel Attard](https://www.samuelattard.com/) for the code reviews. Thanks to the Electron community for helping test this service.

🌲 Here's to an evergreen future for Electron apps!