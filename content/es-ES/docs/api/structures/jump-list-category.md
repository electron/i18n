# Objeto JumpListCategory

* `tipo` Cadena (opcional) - Una de los siguientes: 
  * `tareas` - Los objetos en esta categoría se colocarán en la categoría estándar de `Tareas`. Puede haber sólo una categoría, y siempre será mostrada en la parte inferior de la Lista Jump.
  * `frecuente` - Muestra una lista de archivos abiertos frecuentemente por la aplicación, el nombre de la categoría y sus artículos son establecidos por Windows.
  * `recent` - Displays a list of files recently opened by the app, the name of the category and its items are set by Windows. Items may be added to this category indirectly using `app.addRecentDocument(path)`.
  * `custom` - Displays tasks or file links, `name` must be set by the app.
* `name` String (optional) - Must be set if `type` is `custom`, otherwise it should be omitted.
* `items` JumpListItem[] (optional) - Array of [`JumpListItem`](jump-list-item.md) objects if `type` is `tasks` or `custom`, otherwise it should be omitted.

**Note:** If a `JumpListCategory` object has neither the `type` nor the `name` property set then its `type` is assumed to be `tasks`. If the `name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.