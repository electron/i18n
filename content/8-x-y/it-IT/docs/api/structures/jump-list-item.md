# Oggetto JumpListItem

* `tipo` Stringa (opzionale) - Una delle seguenti:
  * `task` - Una task lancerà una app con argomenti specifici.
  * `separator` - Può essere usato per separare elementi nella categoria standard `Tasks`.
  * `file` - Un collegamento file aprirà un file usando l'app che ha creato la Jump List, per questo compito l'app deve essere registrata come gestore per il tipo di file (anche se non deve essere l'app gestionale predefinita).
* `path` Stringa (opzionale) - Percorso del file da aprire, può essere impostato solo se il `type` è `file`.
* `program` Stringa (opzionale) - Percorso del programma da eseguire, spesso dovresti specificare il `process.execPath` che apre il programma corrente. Dovrebbe essere impostato solo se il `type` è `task`.
* `args` Stringa (opzionale) - Gli argomenti della riga di comando quando il `programma` viene seguito. Dovrebbe essere impostato se il `tipo` è `attività`.
* `titolo` Stringa (opzionale) - Il testo da mostrare per l'elemento nell'Elenco di Salto. Dovrebbe essere impostato solo se `tipo` è `attività`.
* `descrizione` Stringa (opzionale) - Descrizione dell'attività (mostrata in un suggerimento). Dovrebbe essere impostato solo se il `tipo` è `attività`.
* `iconPath` Stringa (opzionale) - il percorso assoluto all'icona da mostrare in una Jump List, che può essere un file di risorsa arbitrario che contiene un icona (es. `.ico`, `.exe`, `.dll`). Puoi specificare il `process.execPath` per mostrare l'icona del programma.
* `iconIndex` Numero (opzionale) - L'indice dell'icona nel file di risorsa. Se un file di risorsa contiene icone multiple questo valore può essere usato per specificare l'indice basato sullo zero dell'icona che potrebbe essere mostrata per questa task. Se un file di risorsa contiene solo un'icona, questa proprietà dovrebbe essere impostata a zero.
* `workingDirectory` Stringa (opzionale) - La directory funzionante. Il predefinito è vuoto.
