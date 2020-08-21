# Obiekt DesktopCapturerSource

* `id` String - identyfikator okna lub ekranu, który może być używany jako ograniczenie `chromeMediaSourceId` podczas wywoływania [`navigator.webkitGetUserMedia`]. Formatem identyfikatora będzie `window:XX` lub `window:XX`, gdzie `XX` jest losowo wygenerowanym numerem.
* `name` String - Gdy źródłem jest ekran, będzie się nazywać `Entire Screen` lub `Screen <index>`, podczas gdy nazwa źródła-okna będzie równa tytułowi okna.
* `thumbnail` [NativeImage](../native-image.md) - obraz miniatury. **Note:** There is no guarantee that the size of the thumbnail is the same as the `thumbnailSize` specified in the `options` passed to `desktopCapturer.getSources`. Rzeczywisty rozmiar zależy od skali ekranu lub okna.
* `display_id` String - Unikalny identyfikator, który będzie odpowiadał `id` pasującego obiektu [Display](display.md) zwróconego przez [Screen API](../screen.md). Na niektórych platformach jest to równoważne części `XX` z pola `id` powyżej, a na innych będzie się różnić. Będzie to pusty string, jeśli nie jest dostępny.
* `appIcon` [NativeImage](../native-image.md) - Obraz ikony aplikacji, która jest właścicielem okna lub null jeśli źródło ma typ screen. Rozmiar ikony nie jest znany z góry i zależy od tego, co zapewni aplikacja.
