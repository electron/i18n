# Objeto JumpListCategory

* `type` String (optional) - One of the following:
  * `tasks` - Los objetos en esta categoría se colocarán en la categoría estándar de `Tasks`. Puede haber sólo una categoría, y siempre será mostrada en la parte inferior de la Lista Jump.
  * `frequent` - Muestra una lista de archivos abiertos frecuentemente por la aplicación, el nombre de la categoría y sus objetos son establecidos por Windows.
  * `recent` - Muestra una lista de archivos abiertos recientemente por la aplicación, el nombre de la categoría y sus objetos son establecidos por Windows. Los objetos pueden ser añadidos indirectamente a esta categoría usando `app.addRecentDocument(path)`.
  * `custom` - Muestra las tareas o los enlaces a archivo, `name` debe ser establecido por la aplicación.
* `name` String (opcional) - Debe establecerse si `type` es `custom`, de lo contrario debe omitirse.
* `items` JumpListItem [] (opcional) - Array de objetos [`JumpListItem`](jump-list-item.md) si `type` es `tasks` o `custom`, de lo contrario debe omitirse.

**Nota:** Si un objeto `JumpListCategory` no tiene ni la propiedad `type` o `name`, asume que el `type` es `tasks`. Si la propiedad `name` está establecida pero la propiedad `type` esta omitida entonces se asume que el `type` es `custom`.

**Note:** The maximum length of a Jump List item's `description` property is 260 characters. Beyond this limit, the item will not be added to the Jump List, nor will it be displayed.
