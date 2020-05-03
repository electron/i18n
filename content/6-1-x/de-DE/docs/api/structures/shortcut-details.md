# ShortcutDetails Object

* `target` String - Das Ziel, welches von dieser Verknüpfung gestartet werden soll.
* `cwd` String (optional) - Das Arbeitsverzeichnis. Standardmäßig leer.
* `args` String (optional) - Die Argumente, die auf `target` angewendet werden sollen, wenn diese Verknüpfung gestartet wird. Standardmäßig leer.
* `description` String (optional) - Die Beschreibung der Verknüpfung. Standardmäßig leer.
* `icon` String (optional) - Der Pfad des Icons, kann entweder eine DLL oder EXE sein. `icon` und `iconIndex` müssen zusammen verwendet werden. Standarmäßig leer, nutzt das Icon des Ziels.
* `iconIndex` Number (optional) - Die Ressourcen-ID des Icons, wenn `icon` eine DLL oder EXE ist. Der Standardwert ist 0.
* ` appUserModelId ` String (optional) - Die Application User Model ID. Standardmäßig leer.
