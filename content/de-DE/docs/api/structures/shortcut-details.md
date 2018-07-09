# ShortcutDetails Object

* `target` String - Das Ziel, welches von dieser Verknüpfung gestartet werden soll.
* `cwd` String (optional) - Das Arbeitsverzeichnis. Standard ist leer.
* `args` String (optional) - Die Argumente, die angewendet auf `target` angewendet werden sollen, wenn das Ziel durch diese Verknüpfung gestartet wird. Standard ist leer.
* `description` String (optional) - Die Beschreibung der Verknüpfung. Standard ist leer.
* `icon` String (optional) - Der Pfad zum Icon, kann eine DLL oder EXE sein. `icon` und `iconIndex` müssen zusammen gesetzt werden. Standard ist leer und verwendet die Symbole des Ziels.
* `iconIndex` Number (optional) - Die Ressourcen-ID des Symbols, wenn `icon` eine DLL oder EXE ist. Standard ist 0.
* ` appUserModelId ` String (optional) - Die Application User Model ID. Standard ist leer.