# pagkakahuli sa tuktok ng desk

> Ang "access" ay impormasyon tungkol sa mga pinagmulan ng "media" na maaaring magamit upang makunan ng "audio" at "video" galing sa "desktop" gamit ang [`navigator.mediaDevices.getUserMedia`]API.

Mga proseso: [Renderer](../glossary.md#renderer-process)

Ang sumunod na halimbawa ay nagpapakita kung paano kumuha sa bidyo galing sa "desktop window" na ang pamagat ay `Electron`:

```javascript
// sa pagpoproseso ng "render".
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

Upang makakuha ng bidyo galing sa na ibinigay ng `desktopCapturer`na pumipigil sa pagdaan sa [`navigator.mediaDevices.getUserMedia`] na dapat kasama sa `chromeMediaSource: 'desktop'`, at `audio: false`.

Para makuha ang parehong "audio" at bidyo galing sa kabuuang "desktop" na pumipigil dumaan sa [`navigator.mediaDevices.getUserMedia`] dapat kasama sa `chromeMediaSource: 'desktop'`, para sa parehong `audio` at `video`, ngunit hindi dapat kasama ang pagpigil sa `chromeMediaSourceId`.

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

## Mga Paraan

Ang modyul sa `desktopCapturer` ay mayroong mga sumusunod na paraan:

### `desktopCapturer.getSources(options, callback)`

* `pagpipilian` Bagay 
  * `types` String[] - Ang array ng "Strings" na naglilista ng iba't-ibang uri ng mga "source" ng "desktop" na kukunin, ang mga maaaring gamitin na uri ay `screen` at `window`.
  * `thumbnailSize` [Ang laki](structures/size.md) (opsyonal) - ang laki ng media sourceay thumbnail dapat sukatan. Default ay `150` x `150`.
* `callback` Function 
  * `error` Error
  * `sources` [DesktopCapturerSource[]](structures/desktop-capturer-source.md)

Simulan pangalap ng impormasyon tungkol sa lahat ng magagamit na desktop media sources, at tawag `callback(error, sources)` kapag tapos na.

Ang `sources` ay isang "array" ng [`DesktopCapturerSource`](structures/desktop-capturer-source.md) "object", ang bawat `DesktopCapturerSource` ay kumakatawan sa "screen" o sa indibidwal na "window" na maaaring makuha.