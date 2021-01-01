# Objeto ShortcutDetails

* `target` String - El objetivo a lanzar desde este acceso directo.
* `cwd` String (optional) - The working directory. Por defecto está vació.
* `args` String (optional) - The arguments to be applied to `target` when launching from this shortcut. Por defecto está vació.
* `description` String (optional) - The description of the shortcut. Default is empty.
* `icon` String (optional) - The path to the icon, can be a DLL or EXE. `icon` and `iconIndex` have to be set together. Default is empty, which uses the target's icon.
* `iconIndex` Number (optional) - The resource ID of icon when `icon` is a DLL or EXE. Default is 0.
* `appUserModelId` String (optional) - The Application User Model ID. Default is empty.
* `toastActivatorClsid` String (optional) - The Application Toast Activator CLSID. Needed for participating in Action Center.
