# Oggetto JumpListItem

* `type` Stringa (opzionale) - Uno dei seguenti: 
  * `task` - Una task lancerà una app con argomenti specifici.
  * `separator` - Può essere usato per separare elementi nella categoria standard `Tasks`.
  * `file` - Un collegamento file aprirà un file usando l'app che ha creato la Jump List, per questo compito l'app deve essere registrata come gestore per il tipo di file (anche se non deve essere l'app gestionale predefinita).
* `path` Stringa (opzionale) - Percorso del file da aprire, può essere impostato solo se il `type` è `file`.
* `program` Stringa (opzionale) - Percorso del programma da eseguire, spesso dovresti specificare il `process.execPath` che apre il programma corrente. Dovrebbe essere impostato solo se il `type` è `task`.
* `args` Stringa (opzionale) - I command line arguments quando `program` è eseguito. Dovrebbero essere impostati solo se il `type` è `task`.
* `title` Stringa (opzionale) - Il testo da mostrate per l'elemento nella Jump List. Dovrebbe essere impostato solo se il `type` è `task`.
* `description` Stringa (opzionale) - Descrizione del task (mostrata in un tooltip). Dovrebbe essere impostata solo se il `type` è `task`.
* `iconPath` Stringa (opzionale) - il percorso assoluto all'icona da mostrare in una Jump List, che può essere un file di risorsa arbitrario che contiene un icona (es. `.ico`, `.exe`, `.dll`). Puoi specificare il `process.execPath` per mostrare l'icona del programma.
* `iconIndex` Numero (opzionale) - L'indice dell'icona nel file di risorsa. Se un file di risorsa contiene icone multiple questo valore può essere usato per specificare l'indice basato sullo zero dell'icona che potrebbe essere mostrata per questa task. Se un file di risorsa contiene solo un'icona, questa proprietà dovrebbe essere impostata a zero.