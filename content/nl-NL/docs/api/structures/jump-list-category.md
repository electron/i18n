# JumpListcategory Object

* `type` String (optioneel) - Een van de volgende: 
  * `tasks` - Items in deze categorie zullen worden geplaatst in de standaard `Tasks` categorie. Er kan slechts één zo'n categorie zijn, en deze zal altijd worden weergegeven onderaan de Jump List.
  * `frequent` - Toont een lijst met bestanden die vaak geopend worden door de app, de naam van de categorie en de items ervan zijn ingesteld door Windows.
  * `recent` - Displays a list of files recently opened by the app, the name of the category and its items are set by Windows. Items may be added to this category indirectly using `app.addRecentDocument(path)`.
  * `custom` - Displays tasks or file links, `name` must be set by the app.
* `name` String (optional) - Must be set if `type` is `custom`, otherwise it should be omitted.
* `items` JumpListItem[] (optional) - Array of [`JumpListItem`](jump-list-item.md) objects if `type` is `tasks` or `custom`, otherwise it should be omitted.

**Note:** If a `JumpListCategory` object has neither the `type` nor the `name` property set then its `type` is assumed to be `tasks`. If the `name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.