# Obiekt DesktopCapturerSource

* `id` String - identyfikator okna lub ekranu, który może być używany jako ograniczenie `chromeMediaSourceId` podczas wywoływania [`navigator.webkitGetUserMedia`]. Format identyfikatora będzie `window:XX` lub `window:XX`, gdzie `XX` jest to losowo wygenerowany numer.
* `name` String - A screen source will be named either `Entire Screen` or `Screen <index>`, while the name of a window source will match the window title.
* `thumbnail` [NativeImage](../native-image.md) - obraz miniatury. **Uwaga:** Nie ma żadnej gwarancji, że rozmiar miniatury będzi taki sam jak wartość` thumbnailSize` określone w `options` przekazane do `desktopCapturer.getSources`. Rzeczywisty rozmiar zależy od skali ekranu lub okna.