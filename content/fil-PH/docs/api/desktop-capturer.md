# desktopCapturer

> Ang "access" ay impormasyon tungkol sa mga pinagmulan ng "media" na maaaring magamit upang makunan ng "audio" at "video" galing sa "desktop" gamit ang [`navigator.mediaDevices.getUserMedia`]API.

Proseso:[Tagabigay](../glossary.md#renderer-process)

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

To capture video from a source provided by `desktopCapturer` the constraints passed to [`navigator.mediaDevices.getUserMedia`] must include `chromeMediaSource: 'desktop'`, and `audio: false`.

To capture both audio and video from the entire desktop the constraints passed to [`navigator.mediaDevices.getUserMedia`] must include `chromeMediaSource: 'desktop'`, for both `audio` and `video`, but should not include a `chromeMediaSourceId` constraint.

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

## Pamamaraan

The `desktopCapturer` module has the following methods:

### `desktopCapturer.getSources(options, callback)`

* `mga opsyon` Bagay 
  * `types` String[] - An array of Strings that lists the types of desktop sources to be captured, available types are `screen` and `window`.
  * `thumbnailSize` [Ang laki](structures/size.md) (opsyonal) - ang laki ng media sourceay thumbnail dapat sukatan. Default ay `150` x `150`.
* `tumawag muli` Punsyon 
  * `error` Error
  * `sources` [DesktopCapturerSource[]](structures/desktop-capturer-source.md)

Simulan pangalap ng impormasyon tungkol sa lahat ng magagamit na desktop media sources, at tawag `callback(error, sources)` kapag tapos na.

`sources` is an array of [`DesktopCapturerSource`](structures/desktop-capturer-source.md) objects, each `DesktopCapturerSource` represents a screen or an individual window that can be captured.