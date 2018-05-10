# Oggetto Task

* `program` Stringa - Percorso del programma da eseguire, spesso dovresti specificare il `process.execPath` che apre il programma corrente.
* `arguments` Stringa - Gli argomenti a riga di comando quando `program` è eseguito.
* `title` Stringa - La stringa da mostrare nella JumpList.
* `description` Stringa - Descrizione di questo task.
* `iconPath` Stringa - il percorso assoluto all'icona da mostrare in una JumpList, che può essere un file di risorsa arbitrario che contiene un icona. Solitamente si può specificare il `process.execPath` per mostrare l'icona del programma.
* `iconIndex` Numero - L'indice icona nel file dell'icona. Se un file icona consiste di due o più icone, imposta il valore per identificare l'icona. Se un file icona contiene una sola icona, questo valore sarà 0.