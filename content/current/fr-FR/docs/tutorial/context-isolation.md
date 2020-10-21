# Isolation du contexte

## Qu'est-ce que c'est?

L'isolement du contexte est une fonctionnalité qui garantit que vos scripts `précharger` et la logique interne d'Electron s'exécutent dans un contexte séparé du site Web que vous chargez dans un [`webContents`](../api/web-contents.md).  Ceci est important pour des raisons de sécurité car il aide à empêcher le site Web d'accéder aux internes d'Electron ou aux API puissantes auxquelles votre script de préchargement a accès.

This means that the `window` object that your preload script has access to is actually a **different** object than the website would have access to.  Par exemple, si vous définissez `window.hello = 'wave'` dans votre script de préchargement et l'isolation de contexte est activée `fenêtre. ello` ne sera pas défini si le site tente d'y accéder.

Chaque application doit avoir activé l'isolement du contexte et à partir d'Electron 12, elle sera activée par défaut.

## Comment puis-je l'activer ?

Depuis Electron 12, il sera activé par défaut. Pour les versions inférieures, c'est une option dans l'option `webPreferences` lors de la construction de `nouveau BrowserWindow`'s.

```javascript
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true
  }
})
```

## Migration

> J'avais l'habitude de fournir des API depuis mon script de préchargement en utilisant la fenêtre `.X = apiObject` maintenant quoi ?

Exposer des API depuis votre script de préchargement vers le site web chargé est une usecase commune et il y a un module dédié dans Electron pour vous aider à le faire sans douleur.

**Avant: avec l'isolement du contexte désactivé**

```javascript
window.myAPI = {
  doAThing: () => {}
}
```

**Après: Avec l'isolement du contexte activé**

```javascript
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {}
})
```

Le module [`contextBridge`](../api/context-bridge.md) peut être utilisé pour **exposer en toute sécurité** les APIs depuis le contexte isolé dans lequel votre script de préchargement s'exécute dans le contexte dans lequel le site est exécuté. L'API sera également accessible depuis le site web sur `window.myAPI` comme avant.

Vous devriez lire la documentation de `contextBridge` ci-dessus pour bien comprendre ses limitations.  Par exemple, vous ne pouvez pas envoyer de prototypes ou de symboles personnalisés sur le pont de connexion.

## Considérations de sécurité

L'activation de `contextIsolation` et l'utilisation de `contextBridge` ne signifie pas automatiquement que tout ce que vous faites est sûr.  Par exemple, ce code est **dangereux**.

```javascript
// ❌ Mauvais code
contextBridge.exposeInMainWorld('myAPI', {
  send: ipcRenderer.send
})
```

Il expose directement une API puissante sans filtrer les arguments. Cela permettrait à n'importe quel site Web d'envoyer des messages IPC arbitraires que vous ne voulez pas être possible. La manière correcte d'exposer les API basées sur IPC serait plutôt de fournir une méthode par message IPC.

```javascript
// ✅ Bon code
contextBridge.exposeInMainWorld('myAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```

