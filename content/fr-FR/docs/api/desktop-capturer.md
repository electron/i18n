# desktopCapturer

> Accédez aux informations sur les sources multimédias qui peuvent être utilisées pour capturer des vidéos audio et à partir du bureau à l’aide de l' [`navigator.mediaDevices.getUserMedia`][] 'API.

Processus : [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

L'exemple suivant montre comment faire pour capturer la vidéo à partir d'une fenêtre dont le titre est `Electron` :

```javascript
// Dans le processus renderer.
const { desktopCapturer } = require('electron')

desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
  for (const source of sources) {
    if (source.name === 'Electron') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: source.id,
              minWidth: 1280,
              maxWidth: 1280,
              minHeight: 720,
              maxHeight: 720
            }
          }
        })
        handleStream(stream)
      } catch (e) {
        handleError(e)
      }
      return
    }
  }
})

function handleStream (stream) {
  const video = document.querySelector('video')
  video.srcObject = stream
  video.onloadedmetadata = (e) => video.play()
}

function handleError (e) {
  console.log(e)
}
```

Pour capturer des vidéos à partir d’une source fournie par `desktopCapturer` les contraintes transmises à [`navigator.mediaDevices.getUserMedia`][] doivent inclure `chromeMediaSource: 'desktop'`, et `audio: false`.

Pour capturer à la fois audio et vidéo de l’ensemble du bureau les contraintes passées à [`navigator.mediaDevices.getUserMedia`][] doit inclure `chromeMediaSource: 'desktop'`, pour les `audio` et les `video`, mais ne doit pas inclure une contrainte `chromeMediaSourceId` .

```javascript
const constraints = {
  audio: {
    mandatory: {
      chromeMediaSource: 'desktop'
    }
  },
  video: {
    mandatory: {
      chromeMediaSource: 'desktop'
    }
  }
}
```

## Méthodes

Le module `desktopCapturer` dispose des méthodes suivantes :

### `desktopCapturer.getSources(options)`

* `options` objet
  * `types` String[] - un tableau de Chaîne de caractères qui répertorie les types de sources bureau à être capturé, les types disponibles sont `screen` et `window`.
  * `thumbnailSize` [Size](structures/size.md) (facultatif) - La taille de la miniature de la source de média doit être redimensionnée. La valeur par défaut est `150` x `150`. Définissez la largeur ou la hauteur à 0 lorsque vous n'avez pas besoin de les vignettes. Cela permettra de gagner le temps de traitement nécessaire pour capturer le contenu de chaque fenêtre et écran.
  * `fetchWindowIcons` Boolean (facultatif) - Définir à true pour activer la récupération des icônes de fenêtre. La valeur par défaut est faux. Lorsque false la propriété appIcon des sources retourne null. Même si une source a l'écran de type.

Retourne `Promise<DesktopCapturerSource[]>` - Résout avec un tableau de [`DesktopCapturerSource`](structures/desktop-capturer-source.md), chaque `DesktopCapturerSource` représente un écran ou une fenêtre individuelle qui peut être capturée.

**Note** Capture du contenu de l’écran nécessite le consentement de l’utilisateur sur macOS 10.15 Catalina ou plus, qui peut détecter par [`systemPreferences.getMediaAccessStatus`][].

## Avertissements

`navigator.mediaDevices. etUserMedia` ne fonctionne pas sur macOS pour la capture audio en raison d'une limitation fondamentale par laquelle les applications qui veulent accéder à l'audio du système nécessitent une [extension du noyau signée](https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/KernelExtensions/KernelExtensions.html). Chromium, et par extension Electron, ne le fournit pas.

Il est possible de contourner cette limitation en capturant le système audio avec une autre application macOS comme Soundflower et en le passant par un périphérique d'entrée audio virtuel. Ce périphérique virtuel peut ensuite être interrogé avec `navigator.mediaDevices.getUserMedia`.

[`navigator.mediaDevices.getUserMedia`]: https://developer.mozilla.org/en/docs/Web/API/MediaDevices/getUserMedia
[`systemPreferences.getMediaAccessStatus`]: system-preferences.md#systempreferencesgetmediaaccessstatusmediatype-windows-macos
