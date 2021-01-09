# Oggetto DettagliShortcut

* `target` Stringa - Il target da lanciare da questo shortcut.
* `cwd` Stringa (opzionale) - La directory funzionante. Predefinito è vuoto.
* `args` Stringa (opzionale) - Gli argomenti da applicare al `target` quando viene lanciato da questa scorciatoia. Predefinito è vuoto.
* `description` Stringa (opzionale) - La descrizione della scorciatoia. Predefinito è vuoto.
* `icon` Stringa (opzionale) - Il percorso all'icona, può essere DLL o EXE. `icon` e `iconIndex` devono essere impostati insieme. Predefinito è vuoto, che usa l'icona del target.
* `iconIndex` Number (optional) - L'ID della risorsa dell'icona quando l'`icona` è un DLL o EXE. Predefinito è 0.
* `appUserModelId` Stringa (opzionale). L'IDE del Modello Utente dell'Applicazione. Predefinito è vuoto.
