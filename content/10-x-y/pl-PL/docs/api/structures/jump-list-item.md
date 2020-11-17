# Obiekt JumpListItem

* `type` String (optional) - One of the following:
  * `task` - zadanie uruchomi aplikację z określonymi parametrami.
  * `separator` - może służyć do oddzielania elementów standardowych kategorii `Tasks`.
  * `file` - link do pliku otworzy plik za pomocą aplikacji, która utworzyła Listę szybkiego dostępu, aby to zadziałało, aplikacja musi zostać zarejestrowana jako program obsługi dla danego typu pliku (chociaż nie musi to być domyślna procedura obsługi).
* `path` String (opcjonalnie) - Ścieżka do pliku, który ma być otwarty, należy ustawić tylko dla przypadku, kiedy `type` jest ustawiony na `file`.
* `program` String (opcjonalnie) - Ścieżka do programu, który ma zostać uruchomiony, zazwyczaj powinieneś określić `process.execParth`, który otwiera bieżący program. Powinno być ustawiony tylko dla przypadku, kiedy `type` jest ustawiony na `task`.
* `args` String (optional) - The command line arguments when `program` is executed. Should only be set if `type` is `task`.
* `title` String (optional) - The text to be displayed for the item in the Jump List. Should only be set if `type` is `task`.
* `description` String (optional) - Description of the task (displayed in a tooltip). Should only be set if `type` is `task`.
* `iconPath` Striing (opcjonalnie) - bezwzględna ścieżka to ikony, która ma zostać wyświetlona w Jump List, który może być dowolnym zasobem, który zawiera ikony (`.ico`, `.exe`, `.dll`). Zazwyczaj można określić `process.execPath`, aby wyświetlić ikonę programu.
* `iconIndex` Number (opcjonalne) - indeks ikony w pliku zasobów. Jeśli plik zasobów zawiera wiele ikon ta wartość może służyć do określenia indeksu ikony, który ma być wyświetlany dla tego zadania. Jeśli plik zasobów zawiera tylko jedną ikone, ta właściwość powinna być równa zero.
* `workingDirectory` String (optional) - The working directory. Default is empty.
