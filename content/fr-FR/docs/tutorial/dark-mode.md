# Mode foncé

## Vue d'ensemble

### Mettre à jour automatiquement les interfaces natives

Les « interfaces natives » incluent le ramasseur de fichiers, la bordure de fenêtre, les dialogues, les menus context, et plus encore - tout ce qui provient de votre système d’exploitation et de votre et non de votre application. Le comportement par défaut est d’opter pour ce automatique de l’OS.

### Mettez automatiquement à jour vos propres interfaces

Si votre application a son propre mode sombre, vous devez le basculer sur et en dehors en synchronisation avec le paramètre de mode sombre du système. Vous pouvez le faire en utilisant le [de préfère-couleur-schéma][] requête multimédia CSS.

### Mettez à jour manuellement vos propres interfaces

Si vous souhaitez passer manuellement d’un mode lumière/mode sombre à un mode sombre, vous pouvez le faire en en paramètreant le mode désiré dans le thème [Source](../api/native-theme.md#nativethemethemesource) propriété du module `nativeTheme` . La valeur de cette propriété sera propagée à votre processus Renderer. Toutes les règles du CSS liées `prefers-color-scheme` seront mises à jour en conséquence.

## paramètres macOS

Dans macOS 10.14 Mojave, Apple a introduit une nouvelle [mode sombre à l’échelle du système][system-wide-dark-mode] pour tous les ordinateurs macOS. Si votre application Electron a un mode sombre, vous pouvez le faire suivre le réglage du mode sombre à l’échelle du système en utilisant [l' `nativeTheme` api](../api/native-theme.md).

Dans macOS 10.15 Catalina, Apple a introduit une nouvelle option de mode sombre « automatique » pour tous les ordinateurs macOS. Pour que les API `nativeTheme.shouldUseDarkColors` et `Tray` fonctionnent correctement dans ce mode sur Catalina, vous devez utiliser Electron `>=7.0.0`, ou définir des `NSRequiresAquaSystemAppearance` à `false` dans votre fichier `Info.plist` pour les anciennes versions. Les [Electron Packager][electron-packager] et [Electron Forge][electron-forge] ont une option [`darwinDarkModeSupport` pour][packager-darwindarkmode-api] automatiser les modifications `Info.plist` pendant le temps de construction de l’application.

Si vous souhaitez vous désinscrir lors de l’utilisation d’Electron &gt; 8.0.0, vous devez définir la clé `NSRequiresAquaSystemAppearance` dans le fichier `Info.plist` à `true`. Veuillez noter qu’Electron 8.0.0 et au-dessus ne vous laissera pas vous désinscrire de ce sujet, en raison de l’utilisation du macOS 10.14 SDK.

## Exemple

Nous allons commencer par une application de travail à partir du guide [démarrage rapide et](quick-start.md) ajouter des fonctionnalités progressivement.

Tout d’abord, nous allons modifier notre interface afin que les utilisateurs puissent basculer entre la lumière et l’obscurité modes.  Cette interface utilisateur de base contient des boutons pour modifier `nativeTheme.themeSource` paramètre et un élément de texte indiquant `themeSource` valeur est sélectionnée. Par défaut, Electron suit la préférence du mode sombre du système, donc nous hardcode la source de thème comme « Système ».

Ajoutez les lignes suivantes au fichier `index.html` '

```html
<! DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
    <link rel="stylesheet" type="text/css" href="./styles.css">
</head>
<body>
    <h1>Hello World!</h1>
    <p>source thématique actuelle : <strong id="theme-source">système</strong></p>

    <button id="toggle-dark-mode">toggle dark mode</button>
    <button id="reset-to-system">réinitialiser le thème du système</button>

    <script src="renderer.js"></script>
  </body>
</body>
</html>
```

Ensuite, ajoutez à [auditeurs de l'](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) qui écoutent `click` événements sur les boutons de basculement. Étant donné que le module `nativeTheme` n’est exposé que dans le processus principal, vous devez configurer le rappel de chaque auditeur pour utiliser IPC pour envoyer des messages et gérer les réponses du processus de principal :

* lorsque le bouton « Toggle Dark Mode » est cliqué, nous envoyons le message `dark-mode:toggle` (événement) pour dire au processus principal de déclencher un changement de de thème, et mettre à jour l’étiquette « Source de thème courant » dans l’interface utilisateur basée sur la réponse du processus principal.
* lorsque le bouton « Réinitialiser le thème du système » est cliqué, nous envoyons le message `dark-mode:system` (événement) pour dire au processus principal d’utiliser le système de couleur , et mettre à jour l’étiquette « Source thématique actuelle » à `System`.

Pour ajouter des auditeurs et des gestionnaires, ajoutez les lignes suivantes au fichier `renderer.js` '

```javascript
const { ipcRenderer } = require ('electron')

document.getElementById ('toggle-dark-mode').addEventListener ('click', async () => {
  const isDarkMode = await ipcRenderer.invoke ('dark-mode:toggle')
  document.getElementById ('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById ('reset-to-system').addEventListener('click', async () => {
  await ipcRenderer.invoke ('dark-mode:system')
  document.getElementById ('theme-source'). innerHTML = 'System'
})
```

Si vous exécutez votre code à ce stade, vous verrez que vos boutons ne font rien pour le moment, et votre processus principal va donner une erreur comme celle-ci lorsque vous cliquez sur vos boutons: `Error occurred in handler for 'dark-mode:toggle': No handler registered for 'dark-mode:toggle'` Cela est prévu - nous n’avons pas encore touché de code `nativeTheme` .

Maintenant que nous avons terminé le câblage de l’IPC du côté du Renderer, l’étape suivante est de mettre à jour le fichier `main.js` pour gérer les événements du processus Renderer.

En fonction de l’événement reçu, nous mettons à jour la propriété [`nativeTheme.themeSource`](../api/native-theme.md#nativethemethemesource) pour appliquer le thème désiré sur les éléments d’interface utilisateur natifs du système (par exemple les menus contextaux) et propager le schéma de couleurs préféré au processus de Renderer :

* Lors de la `dark-mode:toggle`, nous vérifions si le thème sombre est actuellement actif en utilisant la propriété `nativeTheme.shouldUseDarkColors` , et définir la `themeSource` au thème opposé.
* Lors de la `dark-mode:system`, nous réinitialisons le `themeSource` à `system`.

```javascript
const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate' , () => {
  si (BrowserWindow.getAllWindows().longueur === 0) {
    createWindow()
  }
})
```

La dernière étape est d’ajouter un peu de style pour activer le mode sombre pour les parties web de l’interface utilisateur en tirant parti de l’attribut [`prefers-color-scheme`][prefer-color-scheme] CSS . La valeur de `prefers-color-scheme` suivra votre `nativeTheme.themeSource` naturel.

Créez un fichier `styles.css` et ajoutez les lignes suivantes :

```css fiddle='docs/fiddles/features/macos-dark-mode'
@media (prefers-color-scheme: dark) {
  corps { fond: #333; couleur: blanc; }
}

@media (prefers-color-scheme: light) {
  corps { fond: #ddd; couleur: noir; }
}
```

Après le lancement de l’application Electron, vous pouvez modifier les modes ou réinitialiser le thème le thème du système par défaut en cliquant sur les boutons correspondants :

![Mode foncé](../images/dark_mode.gif)

[system-wide-dark-mode]: https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/
[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[packager-darwindarkmode-api]: https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport
[de préfère-couleur-schéma]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
[prefer-color-scheme]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
