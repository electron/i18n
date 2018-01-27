# Oggetto CategoriaSaltaLista

* `tipo` Stringa (opzionale) - Uno dei seguenti: 
  * `tasm` - Una task lancerà una app con argomenti specifici.
  * `separatore` - Può essere usato per separare elementi nella categoria standard `Tasks`.
  * `file` - Un collegamento file aprirà un file usando l'app che ha creato la Lista di Salto, per questo per lavorare la app deve essere registrata come gestore per il tipo di file (anche se non deve essere l'app gestionale predefinita).
* `percorso` Stringa (opzionale) - Percorso del file da aprire, può essere impostato solo se il `tipo` è `file`.
* `programma` Stringa (opzionale) - Percorso del programma da eseguire, spesso dovresti specificare il `processi.eseguiPercorso` che apre il programma corrente. Should only be set if `type` is `task`.
* `args` String (optional) - The command line arguments when `program` is executed. Should only be set if `type` is `task`.
* `title` String (optional) - The text to be displayed for the item in the Jump List. Should only be set if `type` is `task`.
* `description` String (optional) - Description of the task (displayed in a tooltip). Should only be set if `type` is `task`.
* `iconPath` String (optional) - The absolute path to an icon to be displayed in a Jump List, which can be an arbitrary resource file that contains an icon (e.g. `.ico`, `.exe`, `.dll`). You can usually specify `process.execPath` to show the program icon.
* `iconIndex` Number (optional) - The index of the icon in the resource file. If a resource file contains multiple icons this value can be used to specify the zero-based index of the icon that should be displayed for this task. If a resource file contains only one icon, this property should be set to zero.