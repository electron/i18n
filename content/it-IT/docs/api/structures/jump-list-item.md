# Oggetto CategoriaSaltaLista

* `tipo` Stringa (opzionale) - Uno dei seguenti: 
  * `tasm` - Una task lancerà una app con argomenti specifici.
  * `separatore` - Può essere usato per separare elementi nella categoria standard `Tasks`.
  * `file` - Un collegamento file aprirà un file usando l'app che ha creato la Lista di Salto, per questo per lavorare la app deve essere registrata come gestore per il tipo di file (anche se non deve essere l'app gestionale predefinita).
* `percorso` Stringa (opzionale) - Percorso del file da aprire, può essere impostato solo se il `tipo` è `file`.
* `programma` Stringa (opzionale) - Percorso del programma da eseguire, spesso dovresti specificare il `processi.eseguiPercorso` che apre il programma corrente. Dovrebbe essere impostato solo se il `tipo` è `task`.
* `arg` Stringa (opzionale) - La linea di comando argomenta quando il `programma` è eseguito. Potrebbe essere impostato solo se il `tipo` è `task`.
* `titolo` Stringa (opzionale) - Il testo da mostrate per l'elemento nella Lista di Salto. Potrebbe essere impostato solo se il `tipo` è `task`.
* `descrizione` Stringa (opzionale) - Descrizione della task (mostrata in un suggerimento). Potrebbe essere impostata solo se il `tipo` fosse `task`.
* `Percorsoicona` Stringa (opzionale) - il percorso assoluto all'icona da mostrare in una Lista di Salto, che può essere un file di risorsa arbitrario che contiene un icona (e.g. `.ico`, `.exe`, `.dll`). Di solito puoi specificare il `processo.eseguiPercorso` per mostrare l'icona del programma.
* `Indiceicona` Numero (opzionale) - L'indice dell'icona nel file di risorsa. Se un file di risorsa contiene icone multiple questo valore può essere usato per specificare l'indice basato sullo zero dell'icona che potrebbe essere mostrata per questa task. Se un file di risorsa contiene solo un'icona, questa proprietà potrebbe essere impostata a zero.