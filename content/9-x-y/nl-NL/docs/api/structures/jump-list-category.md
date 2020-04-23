# JumpListcategory Object

* `type` String (optional) - One of the following:
  * `tasks` - Items in deze categorie zullen worden geplaatst in de standaard `Tasks` categorie. Er kan slechts één zo'n categorie zijn, en deze zal altijd worden weergegeven onderaan de Jump List.
  * `frequent` - Toont een lijst met bestanden die vaak geopend worden door de app, de naam van de categorie en de items ervan zijn ingesteld door Windows.
  * `recent` - Toont een lijst met bestanden die recent geopend worden door de app, de naam van de categorie en de items ervan zijn ingesteld door Windows. Items kunnen indirect worden toegevoegd aan deze categorie met behulp van `app.addRecentDocument(path)`.
  * `custom` - Toon taken of bestandslinks, `naam` moet worden ingesteld door de app.
* `name` String (optioneel) - Moet worden ingesteld als `type` is `custom`, anders moet het worden weggelaten.
* `items` JumpListItem[] (optioneel) - Array van [`JumpListItem`](jump-list-item.md) objecten als `type` is `tasks` of `custom`, anders moet het worden weggelaten.

**Opmerking:** Als een `JumpListCategorie` object noch het `type` noch de `name` eigenschap heeft ingesteld, dan wordt het `type` verondersteld `tasks` te zijn. Als de `name` eigenschap is ingesteld, maar de `type` eigenschap is weggelaten, dan wordt het `type` verondersteld `custom` te zijn.
