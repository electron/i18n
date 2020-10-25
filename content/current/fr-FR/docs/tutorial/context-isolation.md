# Isolation du contexte

## Qu'est-ce que c'est?

L'isolement du contexte est une fonctionnalité qui garantit que vos scripts `précharger` et la logique interne d'Electron s'exécutent dans un contexte séparé du site Web que vous chargez dans un [`webContents`](../api/web-contents.md).  Ceci est important pour des raisons de sécurité car il aide à empêcher le site Web d'accéder aux internes d'Electron ou aux API puissantes auxquelles votre script de préchargement a accès.

Cela signifie que l'objet `window` auquel votre script de préchargement a accès est un objet différent de celui auquel que le site Web a accès.  Par exemple, si vous définissez `window.hello = 'wave'` dans votre script de préchargement avec l'isolation de contexte activée, `window.hello` retournera undefined si le site tente d'y accéder.

Chaque application devrait avoir l'isolement du contexte activée et à partir d'Electron 12, elle sera activée par défaut.

## Comment puis-je l'activer ?

Depuis Electron 12, elle sera activée par défaut. Pour les versions antérieures il s'agit d'une option de l'option `webPreferences` d'instanciation d'une nouvelle `BrowserWindow`.

```javascript
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true
  }
})
```

## Migration

> J'avais l'habitude de fournir des API depuis mon script de préchargement en utilisant `window</0>.Que dois faire désormais?</p>
</blockquote>

<p spaces-before="0">Exposer au site web des API depuis votre script de préchargement est un cas d'utilisation courant et il existe un un module dédié dans Electron pour vous y aider à le faire sans peine.</p>

<p spaces-before="0"><strong x-id="1">Avant: avec l'isolation de contexte désactivée</strong></p>

<pre><code class="javascript">window.myAPI = {
  doAThing: () => {}
}
`</pre> 
> 
> **Après: Avec l'isolation du contexte activée**
> 
> ```javascript
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {}
})
```

Le module [`contextBridge`](../api/context-bridge.md) peut être utilisé pour **exposer en toute sécurité** les APIs depuis le contexte isolé dans lequel votre script de préchargement s'exécute vers le contexte dans lequel le site est exécuté. L'API sera également accessible depuis le site web sur `window.myAPI` comme avant.

Vous devriez lire la documentation de `contextBridge` pour bien comprendre ses limitations.  Par exemple, vous ne pouvez pas envoyer des prototypes ou de symbols personnalisés sur le contextbridge.

## Considérations à propos de la sécurité

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

