# Oggetto DettagliShortcut

* `target` Stringa - Il target da lanciare da questo shortcut.
* `cwd` Stringa (opzionale) - La working directory. Di default è vuota.
* `arg` Stringa (opzionale) - Gli argomenti da applicare al `target` quando viene lanciato da questo shortcut. Di default sono vuoti.
* `description` Stringa (opzionale) - La descrizione dello shortcut. Di default è vuota.
* `icon` Stringa (opzionale) - Il percorso per l'icona, può essere DLL o EXE. `icon` e `iconIndex` vanno impostati insieme. Di default è vuota ed usa l'icona del target.
* `iconIndex` Numero (opzionale) - Il resource ID dell'icona quando l'`icon` è una DLL o un EXE. Di default è 0.
* `appUserModelId` Stringa (opzionale) - L'Application User Model ID. Di default è vuoto.