# Obiekt ShortcutDetails

* `target` String - cel, który ma zostać uruchomiony poprzez ten skrót.
* `cwd` String (opcjonalne) - katalog roboczy. Wartość domyślna jest pusty.
* `args` String (opcjonalnie) - argumenty, które mają być stosowane do `target` podczas uruchamiania tego skrótu. Wartość domyślna to pusty.
* `description` String (optional) - The description of the shortcut. Default is empty.
* `icon` String (optional) - The path to the icon, can be a DLL or EXE. `icon` and `iconIndex` have to be set together. Default is empty, which uses the target's icon.
* `iconIndex` Number (optional) - The resource ID of icon when `icon` is a DLL or EXE. Default is 0.
* `appUserModelId` String (optional) - The Application User Model ID. Default is empty.