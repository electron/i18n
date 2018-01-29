# Oggetto CategoriaSaltaLista

* `tipo` Stringa (opzionale) - Uno dei seguenti: 
  * `compiti` - Gli oggetti di questa categoria saranno posti nella categoria `Compiti` stamdard. Può esserci solo una categoria, che sarà sempre mostrata sul fondo della Lista di Salto.
  * `frequente` - Mostra una lista di file aperti frequentemente dall'app, il nome della categoria ed i suoi elementi sono impostati da Windows.
  * `recenti` - Mostra una lista di file recentemente aperti dall'app, il nome della categoria ed i suoi elementi sono impostati da Windows. Gli elementi potrebbero essere indirettamente aggiunti a questa categoria usando `app.aggiungiDocumentiRecenti(percorso)`.
  * `custom` - Mostra compiti o link di file, il `nome` deve essere impostato dall'app.
* `nome` Stringa (opzionale) - Deve essere impostato se il `tipo` è `modificato`, altrimenti va omesso.
* `elementi` ElementoSaltaLista[] (opzionale) - Schieramento di oggetti [`ElementiSaltaLista`](jump-list-item.md) se il `tipo` è `compiti` o `modificato`, altrimenti va omesso.

**Note:** Se un oggetto `SalaCategoriaLista` non ha nè `tipo` nè `nome` impostati il suo tipo diviene `predefinito`. Se la proprietà `nome` é impostata ma la proprietà `tipo` é omessa, il `tipo` sarà considerato`modificato`.