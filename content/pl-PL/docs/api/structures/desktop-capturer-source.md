# Obiekt DesktopCapturerSource

* `id` String - identyfikator okna lub ekranu, który może być używany jako ograniczenie `chromeMediaSourceId` podczas wywoływania [`navigator.webkitGetUserMedia`]. Formatem identyfikatora będzie `window:XX` lub `window:XX`, gdzie `XX` jest losowo wygenerowanym numerem.
* `name` String - Gdy źródłem jest ekran, będzie się nazywać `Entire Screen` lub `Screen <index>`, podczas gdy nazwa źródła-okna będzie równa tytułowi okna.
* `thumbnail` [NativeImage](../native-image.md) - obraz miniatury. **Uwaga:** Nie ma żadnej gwarancji, że rozmiar miniatury będzi taki sam jak wartość` thumbnailSize` określone w `options` przekazane do `desktopCapturer.getSources`. Rzeczywisty rozmiar zależy od skali ekranu lub okna.