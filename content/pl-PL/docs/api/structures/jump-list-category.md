# Obiekt JumpListCategory

* `typ` String (opcjonalny) - Jedno z poniższych: 
  * `tasks` - Przedmioty w tej kategorii zostaną umieszczone w standardowej kategorii `tasks`. Może istnieć tylko jedna z tych kategorii, i zawsze pojawi się u dołu listy szybkiego dostępu.
  * `frequent` - Wyświetla listę plików często otwieranych przez aplikacje, nazwa kategorii i jego elementy są ustawione przez system Window.
  * `recent` - Wyświetla listę plików niedawno otwarty przez aplikację, nazwa kategorii i jego elementy są ustawione przez system Windows. Pozycje mogą być dodawane do tej kategorii pośrednio za pomocą `app.addRecentDocument(path)`.
  * `custom` - Wyświetla zadania lub odwołania do plików, `name` musi być ustawiona przez aplikacje.
* `name` String (optional) - Musi być ustawiona jeśli `typ` jest ustawiony na `custom`, w przeciwnym razie powinno być pominięte.
* `items` JumpListItem[] (optional) - Array of [`JumpListItem`](jump-list-item.md) objects if `type` is `tasks` or `custom`, otherwise it should be omitted.

**Note:** If a `JumpListCategory` object has neither the `type` nor the `name` property set then its `type` is assumed to be `tasks`. If the `name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.