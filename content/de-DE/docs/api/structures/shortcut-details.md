# ShortcutDetails Object

* `target` String - Das Ziel, welches von dieser Verknüpfung gestartet werden soll.
* `cwd` String (optional) - Das Arbeitsverzeichnis. Standard ist leer.
* `args` String (optional)-die Argumente, die angewendet werden sollen `target` Wenn Starten von dieser Verknüpfung. Default ist leer.
* `description` String (optional)-die Beschreibung der Verknüpfung. Standard ist leer.
* `icon` String (optional)-der Pfad zum Icon, kann eine DLL oder exe sein. `icon` und ` iconIndex ` müssen zusammengesetzt werden. Default ist Empty und verwendet die Symbol des Ziels.
* `iconIndex` Number (optional)-die Ressourcen-ID des Symbols, wenn ` Icon ` ist ein DLL oder exe. Der Standardwert ist 0.
* ` appUserModelId ` String (optional)-die Anwendungs-Benutzermodell-ID. Standard ist leer.