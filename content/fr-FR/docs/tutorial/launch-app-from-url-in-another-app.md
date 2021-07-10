---
title: launch-app-from-URL-in-another-app
description: This guide will take you through the process of setting your electron app as the default handler for a specific protocol.
slug: launch-app-from-url-in-another-app
hide_title: true
---

# Lancement de votre application Electron depuis une URL dans une autre application

## Vue d'ensemble

<!-- ✍ Update this section if you want to provide more details -->

Ce guide vous guidera tout au long du processus de définition de votre application electron en tant que gestionnaire par défaut pour un du genre [protocole spécifique](https://www.electronjs.org/docs/api/protocol).

À la fin de ce tutoriel, nous aurons configuré notre application pour intercepter et gérer toutes les URL qui commençant par un protocole spécifique. Dans ce guide, le protocole utilisé sera "`electron-fiddle://`".

## Exemples

### Processus principal (main.js)

Importons tout d'abord les modules requis depuis `electron`. Ces modules aident à gérer le cycle de notre application et à créer une fenêtre de navigateur native.

```js
const { app, BrowserWindow, shell } = require('electron')
const path = require('path')
```

Ensuite, déclarons application comme gestionnaire des protocoles "`electron-fiddle://`".

```js
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('electron-fiddle', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('electron-fiddle')
}
```

Nous allons maintenant définir la fonction chargée de la création de notre fenêtre de navigateur et charger le fichier `index.html` de notre application.

```js
function createWindow () {
  // Création de la fenêtre de navigateur.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')
}
```

Dans l'étape suivante , nous allons créer notre  `BrowserWindow` et dire à notre application comment gérer un événement venant d'un lien vers un protocole externe.

Ce code sera différent selon le système d'exploitation : WindowsOS, MacOS ou Linux. Cela est dû au fait que Windows a besoin de code supplémentaire pour ouvrir le contenu du lien dans la même instance d'électron. Pour en savoir plus à ce sujet [ici](https://www.electronjs.org/docs/api/app#apprequestsingleinstancelock).

### Code pour Windows:

```js
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })

  // Create mainWindow, load the rest of the app, etc...
  app.whenReady().then(() => {
    createWindow()
  })

  // handling the protocol. In this case, we choose to show an Error Box.
  app.on('open-url', (event, url) => {
    dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
  })
}
```

### Code pour MacOS ou Linux :

```js
// Cette méthode sera appelée quant Electron aura fini
// de s'initialiser et sera prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quant cet événement est émit.
app.whenReady().then(() => {
  createWindow()
})

// gestion du protocole. In this case, we choose to show an Error Box.
app.on('open-url', (event, url) => {
  dialog.showErrorBox('Content de vous revoir ', `Vous venez de: ${url}`)
})
```

Enfin, nous ajouterons du code supplémentaire pour gérer la fermeture de notre application par l'utilisateur

```js
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
```

## Important Note:

### Livraison

Cette fonctionnalité ne fonctionnera sur macOS que si votre application est empaquetée. Cela ne fonctionnera pas lorsque vous le lancez en développement à partir de la ligne de commande. Lorsque vous empaquetez votre application, vous devez vous assurer que le `plist` de macOS pour l'application est mis à jour pour inclure le nouveau gestionnaire de protocole. Si vous utilisez [`electron-packager`](https://github.com/electron/electron-packager) alors vous pouvez ajouter le drapeau `--extend-info` avec un chemin vers le `plist` que vous avez créé. Tel que ci-dessous: pour cette application:

### Plist

```XML
  <p>
  <h5>macOS plist</h5>
  <pre><code>
    <?xml version="1.0" encoding="UTF-8"?>
        <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
            <plist version="1.0">
                <dict>
                    <key>CFBundleURLTypes</key>
                    <array>
                        <dict>
                            <key>CFBundleURLSchemes</key>
                            <array>
                                <string>electron-api-demos</string>
                            </array>
                            <key>CFBundleURLName</key>
                            <string>Electron API Demos Protocol</string>
                        </dict>
                    </array>
                    <key>ElectronTeamID</key>
                    <string>VEKTX9H2N7</string>
                </dict>
            </plist>
        </code>
    </pre>
  <p>
```

## Conclusion

Après avoir démarré votre application electron, vous pouvez maintenant saisir une URL dans votre navigateur qui contient le protocole personnalisé, par exemple `"electron-fiddle://open"` et constater que l'application répondra et affichera une boîte de dialogue d'erreur.

<!--
    Because Electron examples usually require multiple files (HTML, CSS, JS
    for the main and renderer process, etc.), we use this custom code block
    for Fiddle (https://www.electronjs.org/fiddle).
    Please modify any of the files in the referenced folder to fit your
    example.
    The content in this codeblock will not be rendered in the website so you
    can leave it empty.
-->

```fiddle docs/fiddles/system/protocol-handler/launch-app-from-url-in-another-app

```

<!-- ✍ Explanation of the code below -->
