# Mga bagay sa ShortcutDetails

* `target` String - Ang target na ilunsad mula sa shortcut na ito.
* `cwd` String (opsyonal) - ang direktoryo ng ginagawa. Ang Default ay walang laman.
* `args` String (opsyonal) - ang argumento na inilagay sa `target` nang inilulunsad mula sa shortcut na ito. Ang default ay walang laman.
* `description` String (opsyonal) - Ang paglalarawan ng shortcut. Ang default ay walang laman.
* `icon` String (optional) - The path to the icon, can be a DLL or EXE. `icon` and `iconIndex` have to be set together. Default is empty, which uses the target's icon.
* `iconIndex` Number (optional) - The resource ID of icon when `icon` is a DLL or EXE. Default is 0.
* `appUserModelId` String (optional) - The Application User Model ID. Default is empty.