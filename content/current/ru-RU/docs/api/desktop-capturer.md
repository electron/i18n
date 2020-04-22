# desktopCapturer

> Получает информацию о медиа ресурсах, которые могут быть использованы для записи аудио и видео с рабочего стола, при использовании API [`navigator.mediaDevices.getUserMedia`].

Процесс: [Графический](../glossary.md#renderer-process)

Следующий пример демонстрирует захват видео с окна рабочего стола с названием `Electron`:

```javascript
// В графическом процессе.
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

Для захвата видео из источника, предоставленного `desktopCapturer` ограничения, передаваемые [`navigator.mediaDevices.getUserMedia`] должны включать `chromeMediaSource: 'desktop'`, и `audio: false`.

Для захвата аудио и видео со всего рабочего стола ограничения, принятые в [`navigator.mediaDevices. etUserMedia`] должны включать `chromeMediaSource: 'Desktop'`, для `аудио` и `видео`, но не должны включать ограничение `chromeMediaSourceId`.

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

## Методы

`desktopCapturer` имеет следующие методы:

### `desktopCapturer.getSources(options)`

* `options` Object
  * `types` String[] - массив строк, который отображает типы источников рабочего стола для захвата, доступные типы `screen` и `window`.
  * `thumbnailSize` [Size](structures/size.md) (опционально) - Размер, до которого должен быть масштабирован эскиз источника мультимедиа. По умолчанию это `150` x `150`. Установите ширину или высоту в 0, если вам не нужны эскизы. Это сэкономит время на обработку содержимого каждого окна и экрана.
  * `fetchWindowIcons` Boolean (опционально) - установите значение true, чтобы включить загрузку значков окна. Значение по умолчанию false. Если false, то свойство appIcon из источников возвращает null. То же самое, если источник имеет тип экрана.

Возвращает `Promise<DesktopCapturerSource[]>` - разрешается с массивом объектов [`DesktopCapturerSource`](structures/desktop-capturer-source.md), каждый `DesktopCapturerSource ` представляет экран или отдельное окно, которое может быть захвачено.

**Note** Capturing the screen contents requires user consent on macOS 10.15 Catalina or higher, which can detected by [`systemPreferences.getMediaAccessStatus`].

## Предупреждения

`navigator.mediaDevices. etUserMedia` не работает в macOS из-за фундаментального ограничения, из-за которого приложениям, желающим получить доступ к звуку системы, требуется [подписанное расширение ядра](https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/KernelExtensions/KernelExtensions.html). Chromium, и расширение Electron, не предоставляет этого.

Это ограничение можно обойти путем захвата системного звука с помощью другого приложения macOS вроде Soundflower и передачи его через виртуальное устройство ввода. Это виртуальное устройство может быть запрошено с помощью `navigator.mediaDevices.getUserMedia`.
