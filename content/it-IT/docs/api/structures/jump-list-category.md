# Oggetto CategoriaSaltaLista

* `tipo` Stringa (opzionale) - Uno dei seguenti: 
  * `compiti` - Gli oggetti di questa categoria saranno posti nella categoria `Compiti` stamdard. Può esserci solo una categoria, che sarà sempre mostrata sul fondo della Lista di Salto.
  * `frequente` - Mostra una lista di file aperti frequentemente dall'app, il nome della categoria ed i suoi elementi sono impostati da Windows.
  * `recenti` - Mostra una lista di file recentemente aperti dall'app, il nome della categoria ed i suoi elementi sono impostati da Windows. Gli elementi potrebbero essere indirettamente aggiunti a questa categoria usando `app.aggiungiDocumentiRecenti(percorso)`.
  * `custom` - Mostra compiti o link di file, il `nome` deve essere impostato dall'app.
* `name` String (optional) - Must be set if `type` is `custom`, otherwise it should be omitted.
* `items` JumpListItem[] (optional) - Array of [`JumpListItem`](jump-list-item.md) objects if `type` is `tasks` or `custom`, otherwise it should be omitted.

**Note:** If a `JumpListCategory` object has neither the `type` nor the `name` property set then its `type` is assumed to be `tasks`. If the `name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.