# desktopCapturer

> Accède aux informations sur les sources de médias qui peut être utilisé pour capturer l'audio et la vidéo à partir du bureau en utilisant l'API [`navigator.mediaDevices.getUserMedia`].

Processus : [Renderer](../glossary.md#renderer-process)

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

Pour capturer la vidéo provenant d'une source fournis par `desktopCapturer`, les options passés à [`navigator.mediaDevices.getUserMedia`] doivent obligatoirement inclure `chromeMediaSource: 'desktop'` et `audio: false`.

Pour capturer l'audio et la vidéo depuis l'ensemble du bureau, les options passés à [`navigator.mediaDevices.getUserMedia`] doivent obligatoirement inclure `chromeMediaSource: 'desktop'` pour `audio` et `video`, mais ne doit pas inclure l'option `chromeMediaSourceId`.

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

* `options` Objet 
  * `types` String[] - un tableau de Chaîne de caractères qui répertorie les types de sources bureau à être capturé, les types disponibles sont `screen` et `window`.
  * `thumbnailSize` [Size](structures/size.md) (optional) - The size that the media source thumbnail should be scaled to. Default is `150` x `150`. Set width or height to 0 when you do not need the thumbnails. This will save the processing time required for capturing the content of each window and screen.
  * `fetchWindowIcons` Boolean (optional) - Set to true to enable fetching window icons. The default value is false. When false the appIcon property of the sources return null. Same if a source has the type screen.

Returns `Promise<DesktopCapturerSource[]>` - Resolves with an array of [`DesktopCapturerSource`](structures/desktop-capturer-source.md) objects, each `DesktopCapturerSource` represents a screen or an individual window that can be captured.

## Caveats

`navigator.mediaDevices.getUserMedia` does not work on macOS for audio capture due to a fundamental limitation whereby apps that want to access the system's audio require a [signed kernel extension](https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/KernelExtensions/KernelExtensions.html). Chromium, and by extension Electron, does not provide this.

It is possible to circumvent this limitation by capturing system audio with another macOS app like Soundflower and passing it through a virtual audio input device. This virtual device can then be queried with `navigator.mediaDevices.getUserMedia`.