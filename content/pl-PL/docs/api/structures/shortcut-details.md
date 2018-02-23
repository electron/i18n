# Obiekt ShortcutDetails

* `target` String - cel, który ma zostać uruchomiony poprzez ten skrót.
* `cwd` String (opcjonalne) - katalog roboczy. Wartość domyślna jest pusty.
* `args` String (opcjonalnie) - argumenty, które mają być stosowane do `target` podczas uruchamiania tego skrótu. Wartość domyślna to pusty.
* `description` String (opcjonalnie) - opis skrótu. Wartość domyślna to pusty.
* `icon` String (opcjonalnie) - ścieżka do ikony, może być DLL lub EXE. `icon` i `iconIndex` muszą być ustawione razem. Domyślnie jest pusty, która używa ikonę celu.
* `iconIndex` Number (opcjonalne) - identyfikator zasobu ikony, gdy `icon` jest DLL lub EXE. Wartość domyślna to 0.
* `appUserModelId` String (opcjonalnie) - identyfikator aplikacji użytkownika modelu. Wartość domyślna to pusty.