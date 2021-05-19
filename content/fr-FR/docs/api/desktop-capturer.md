# desktopCapturer

> Access information about media sources that can be used to capture audio and video from the desktop using the [`navigator.mediaDevices.getUserMedia`][] API.

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

To capture video from a source provided by `desktopCapturer` the constraints passed to [`navigator.mediaDevices.getUserMedia`][] must include `chromeMediaSource: 'desktop'`, and `audio: false`.

To capture both audio and video from the entire desktop the constraints passed to [`navigator.mediaDevices.getUserMedia`][] must include `chromeMediaSource: 'desktop'`, for both `audio` and `video`, but should not include a `chromeMediaSourceId` constraint.

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

* Objet `options`
  * `types` String[] - un tableau de Chaîne de caractères qui répertorie les types de sources bureau à être capturé, les types disponibles sont `screen` et `window`.
  * `thumbnailSize` [Size](structures/size.md) (facultatif) - La taille de la miniature de la source de média doit être redimensionnée. La valeur par défaut est `150` x `150`. Définissez la largeur ou la hauteur à 0 lorsque vous n'avez pas besoin de les vignettes. Cela permettra de gagner le temps de traitement nécessaire pour capturer le contenu de chaque fenêtre et écran.
  * `fetchWindowIcons` Boolean (facultatif) - Définir à true pour activer la récupération des icônes de fenêtre. La valeur par défaut est faux. Lorsque false la propriété appIcon des sources retourne null. Même si une source a l'écran de type.

Retourne `Promise<DesktopCapturerSource[]>` - Résout avec un tableau de [`DesktopCapturerSource`](structures/desktop-capturer-source.md), chaque `DesktopCapturerSource` représente un écran ou une fenêtre individuelle qui peut être capturée.

**Note** Capturing the screen contents requires user consent on macOS 10.15 Catalina or higher, which can detected by [`systemPreferences.getMediaAccessStatus`][].

## Avertissements

`navigator.mediaDevices. etUserMedia` ne fonctionne pas sur macOS pour la capture audio en raison d'une limitation fondamentale par laquelle les applications qui veulent accéder à l'audio du système nécessitent une [extension du noyau signée](https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/KernelExtensions/KernelExtensions.html). Chromium, et par extension Electron, ne le fournit pas.

Il est possible de contourner cette limitation en capturant le système audio avec une autre application macOS comme Soundflower et en le passant par un périphérique d'entrée audio virtuel. Ce périphérique virtuel peut ensuite être interrogé avec `navigator.mediaDevices.getUserMedia`.

[`navigator.mediaDevices.getUserMedia`]: https://developer.mozilla.org/en/docs/Web/API/MediaDevices/getUserMedia
[`systemPreferences.getMediaAccessStatus`]: system-preferences.md#systempreferencesgetmediaaccessstatusmediatype-windows-macos
