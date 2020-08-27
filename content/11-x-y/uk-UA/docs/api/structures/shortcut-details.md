# Об'єкт ShortcutDetails

* `target` String - Ціль запуску з цього ярлика.
* `cwd` String (необов'язково) - Робоча директорія. За замовчуванням, порожня.
* `args` String (optional) - The arguments to be applied to `target` when launching from this shortcut. За замовчуванням, порожня.
* `description` String (опціонально) - Опис ярлика. За замовчуванням, порожній.
* `icon` String (optional) - The path to the icon, can be a DLL or EXE. `icon` and `iconIndex` have to be set together. Default is empty, which uses the target's icon.
* `iconIndex` Number (optional) - The resource ID of icon when `icon` is a DLL or EXE. За замовчуванням, значення 0.
* `appUserModelId` String (optional) - The Application User Model ID. За замовчуванням, порожня.
