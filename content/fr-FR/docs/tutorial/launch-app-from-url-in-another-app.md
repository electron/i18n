---
title: Lancement de votre application Electron depuis une URL dans une autre application
description: This guide will take you through the process of setting your electron app as the default handler for a specific protocol.
slug: launch-app-from-url-in-another-app
hide_title: true
---

# Lancement de votre application Electron depuis une URL dans une autre application

## Vue d'ensemble

<!-- ✍ Update this section if you want to provide more details -->

Ce guide vous guidera à travers le processus de configuration de votre application Electron comme gestionnaire par défaut pour un [protocol spécifique](https://www.electronjs.org/docs/api/protocol).

À la fin de ce tutoriel, nous aurons configuré notre application pour intercepter et gérer toutes les URL qui commençant par un protocole spécifique. Dans ce guide, le protocole utilisé sera "`electron-fiddle://`".

## Exemples

### Processus principal (main.js)

Importons tout d'abord les modules requis depuis `electron`. Ces modules aident à gérer le cycle de notre application et à créer une fenêtre de navigateur native.

```javascript
const { app, BrowserWindow, shell } = require('electron')
const path = require('path')
```

Ensuite, déclarons application comme gestionnaire des protocoles "`electron-fiddle://`".

```javascript
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('electron-fiddle', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('electron-fiddle')
}
```

Nous allons maintenant définir la fonction chargée de la création de notre fenêtre de navigateur et charger le fichier `index.html` de notre application.

```javascript
const createWindow = () => {
  // Créer la fenêtre du navigateur.
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

Ce code sera différent selon le système d'exploitation : WindowsOS, MacOS ou Linux. Cela est dû au fait que Windows a besoin de code supplémentaire pour ouvrir le contenu du lien de protocole dans la même instance Electron. Pour en savoir plus à ce sujet [ici](https://www.electronjs.org/docs/api/app#apprequestsingleinstancelock).

#### Code pour Windows:

```javascript
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

// gestion du protocole. In this case, we choose to show an Error Box.
  app.on('open-url', (event, url) => {
    dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
  })
}
```

#### Code pour MacOS ou Linux :

```javascript
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

Enfin, nous ajouterons du code supplémentaire pour gérer la fermeture de notre application par l'utilisateur.

```javascript
// Quit when all windows are closed, except on macOS. Là, il est courant
/ pour les applications et leur barre de menus de rester actives jusqu’à ce que l’utilisateur quitte
/ explicitement avec Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
```

## Notes importantes

### Livraison

Sous macOS et Linux, cette fonctionnalité ne fonctionnera que si votre application est empaquetée. Cela ne fonctionne pas lorsque vous le lancez en développement à partir de la ligne de commande. Lorsque vous empaquetez votre application, vous devrez vous assurer que les fichiers `Info.plist` sur macOS et le Linux `.desktop` sur Linux sont mis à jour pour inclure le nouveau gestionnaire de protocole. Certains des outils d'Electron pour regrouper et distribuer des applications gèrent cela pour vous.

#### [Electron Forge](https://electronforge.io)

If you're using Electron Forge, adjust `packagerConfig` for macOS support, and the configuration for the appropriate Linux makers for Linux support, in your [Forge configuration](https://www.electronforge.io/configuration) _(please note the following example only shows the bare minimum needed to add the configuration changes)_:

```json
{
  "config": {
    "forge": {
      "packagerConfig": {
        "protocols": [
          {
            "name": "Electron Fiddle",
            "schemes": ["electron-fiddle"]
          }
        ]
      },
      "makers": [
        {
          "name": "@electron-forge/maker-deb",
          "config": {
            "mimeType": ["x-scheme-handler/electron-fiddle"]
          }
        }
      ]
    }
  }
}
```

#### [Electron Packager](https://github.com/electron/electron-packager)

For macOS support:

If you're using Electron Packager's API, adding support for protocol handlers is similar to how Electron Forge is handled, except `protocols` is part of the Packager options passed to the `packager` function.

```javascript
const packager = require('electron-packager')

packager({
  // ...other options...
  protocols: [
    {
      name: 'Electron Fiddle',
      schemes: ['electron-fiddle']
    }
  ]

}).then(paths => console.log(`SUCCESS: Created ${paths.join(', ')}`))
  .catch(err => console.error(`ERROR: ${err.message}`))
```

If you're using Electron Packager's CLI, use the `--protocol` and `--protocol-name` flags. Par exemple :

```shell
npx electron-packager . --protocol=electron-fiddle --protocol-name="Electron Fiddle"
```

## Conclusion

After you start your Electron app, you can enter in a URL in your browser that contains the custom protocol, for example `"electron-fiddle://open"` and observe that the application will respond and show an error dialog box.

<!--
    Because Electron examples usually require multiple files (HTML, CSS, JS
    for the main and renderer process, etc.), we use this custom code block
    for Fiddle (https://www.electronjs.org/fiddle).
    Please modify any of the files in the referenced folder to fit your
    example.
    The content in this codeblock will not be rendered in the website so you
    can leave it empty.
-->

```fiddle docs/fiddles/system/protocol-handler/launch-app-from-URL-in-another-app

```

<!-- ✍ Explanation of the code below -->
