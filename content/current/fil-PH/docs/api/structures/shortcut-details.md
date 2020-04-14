# Mga bagay sa ShortcutDetails

* `target` String - Ang target na ilunsad mula sa shortcut na ito.
* `cwd` String (opsyonal) - ang direktoryo ng ginagawa. Ang Default ay walang laman.
* `args` String (opsyonal) - ang argumento na inilagay sa `target` nang inilulunsad mula sa shortcut na ito. Ang default ay walang laman.
* `description` String (opsyonal) - Ang paglalarawan ng shortcut. Ang default ay walang laman.
* `icon` String (opsyonal) - Ang daan patungo sa icon, maaaring maging isang DLL o EXE. `icon` at `iconIndex` ay maaaring itakda ng magkasama. Ang default ay walang laman, kung saan ay ginagamit ang icon ng target.
* `iconIndex` Number (opsyonal) - Ang pinagmulang ID ng icon kapag `icon`ay isang DLL o EXE. Ang default ay 0.
* `appUserModelId` String (opsyonal) - Ang Application User Model ID. Ang default ay walang laman.