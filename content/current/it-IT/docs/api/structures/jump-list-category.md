# Oggetto JumpListCategory

* `type` Stringa (opzionale) - Uno dei seguenti: 
  * `tasks` - Gli oggetti di questa categoria saranno posti nella categoria `Tasks` standard. Può esserci solo una categoria, che sarà sempre mostrata sul fondo della Jump List.
  * `frequent` - Mostra una lista di file aperti frequentemente dall'app, il nome della categoria ed i suoi elementi sono impostati da Windows.
  * `recent` - Mostra una lista di file recentemente aperti dall'app, il nome della categoria ed i suoi elementi sono impostati da Windows. Gli elementi possono essere aggiunti indirettamente a questa categoria usando `app.addRecentDocument(path)`.
  * `custom` - Mostra tasks o link di file, il `name` deve essere impostato dall'app.
* `name` Stringa (opzionale) - Deve essere impostato se il `type` è `custom`, altrimenti va omesso.
* `items` JumpListItem[] (opzionale) - Array di [`JumpListItem`](jump-list-item.md) se il `type` è `tasks` o `custom`, altrimenti va omesso.

**Note:** Se un oggetto `JumpListCategory` non ha nè `type` nè `name` impostati, il suo `type` diventa `tasks`. Se la proprietà `name` è impostata ma la proprietà `type` é omessa, il `type` sarà considerato `custom`.