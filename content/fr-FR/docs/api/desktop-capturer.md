# desktopCapturer

> Accède aux informations sur les sources de médias qui peut être utilisé pour capturer l'audio et la vidéo à partir du bureau en utilisant l'API [`navigator.mediaDevices.getUserMedia`].

Processus : [Renderer](../glossary.md#renderer-process)

L'exemple suivant montre comment faire pour capturer la vidéo à partir d'une fenêtre dont le titre est `Electron` :

```javascript
// Dans le processus renderer.
const {desktopCapturer} = require('electron')

desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
  if (error) throw error
  for (let i = 0; i < sources.length; ++i) {
    if (sources[i].name === 'Electron') {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sources[i].id,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720
          }
        }
      }, handleStream, handleError)
      return
    }
  }
})

function handleStream (stream) {
  document.querySelector('video').src = URL.createObjectURL(stream)
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

### `desktopCapturer.getSources(options, callback)`

* `options` Objet 
  * `types` String[] - un tableau de Chaîne de caractères qui répertorie les types de sources bureau à être capturé, les types disponibles sont `screen` et `window`.
  * `thumbnailSize` [Size](structures/size.md) (facultatif) - La taille que la miniature de la source média doit être ajustée. La taille par défaut est de `150` x `150`.
* `callback` Function 
  * `error` Error
  * `sources` [DesktopCapturerSource[]](structures/desktop-capturer-source.md)

Commence à recueillir des informations sur toutes les sources de médias bureau disponibles et appelle le `callback(error, sources)` lorsque qu'il a terminé.

`sources` est un tableau d’objets [`DesktopCapturerSource`](structures/desktop-capturer-source.md), chaque `DesktopCapturerSource` représente un écran ou une fenêtre individuelle qui peut être capturée.