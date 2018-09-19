# Obiekt JumpListCategory

* `typ` String (opcjonalny) - Jedno z poniższych: 
  * `tasks` - Przedmioty w tej kategorii zostaną umieszczone w standardowej kategorii `tasks`. Może istnieć tylko jedna z tych kategorii, i zawsze pojawi się u dołu listy szybkiego dostępu.
  * `frequent` - Wyświetla listę plików często otwieranych przez aplikacje, nazwa kategorii i jego elementy są ustawione przez system Windows.
  * `recent` - Wyświetla listę plików niedawno otwarty przez aplikację, nazwa kategorii i jego elementy są ustawione przez system Windows. Pozycje mogą być dodawane do tej kategorii pośrednio za pomocą `app.addRecentDocument(path)`.
  * `custom` - Wyświetla zadania lub odwołania do plików, `name` musi być ustawiona przez aplikacje.
* `name` String (opcjonalne) - Musi być ustawiona jeśli `typ` jest ustawiony na `custom`, w przeciwnym razie powinno być pominięte.
* `items` JumpListItem[] (opcjonalne) - Lista obiektów [`JumpListItem`](jump-list-item.md) jeśli `typ` jest `taska` lub `custom`, przeciwnym razie powinno być pominięte.

**Uwaga:** Jeśli obiekt `JumpListCategory` nie posiada ani zestawu właściwości `type`, ani `name`, wtedy zakłada się że jego `type` jest równy `tasks`. Jeśli właściwość `name` jest ustawiona, ale pominięto `type` to zakłada się że `type` jest ustawiony na `custom`.