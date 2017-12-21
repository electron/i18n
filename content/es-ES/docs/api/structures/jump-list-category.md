# Objeto JumpListCategory

* `tipo` Cadena (opcional) - Una de los siguientes: 
  * `tareas` - Los objetos en esta categoría se colocarán en la categoría estándar de `Tareas`. Puede haber sólo una categoría, y siempre será mostrada en la parte inferior de la Lista Jump.
  * `frecuente` - Muestra una lista de archivos abiertos frecuentemente por la aplicación, el nombre de la categoría y sus objetos son establecidos por Windows.
  * `reciente` - Muestra una lista de archivos abiertos recientemente por la aplicación, el nombre de la categoría y sus objetos son establecidos por Windows. Los objetos pueden añadidos a esta categoría indirectamente utilizando `app.addRecentDocument(path)`.
  * `personalizado` - Muestra tareas o enlaces de archivo, `nombre` debe ser establecido por la aplicación.
* `nombre` Cadena (opcional) - Debe establecerse si `tipo` es `personalizado`, de lo contrario debe omitirse.
* `items` JumpListItem[] (optional) - Array of [`JumpListItem`](jump-list-item.md) objects if `type` is `tasks` or `custom`, otherwise it should be omitted.

**Note:** If a `JumpListCategory` object has neither the `type` nor the `name` property set then its `type` is assumed to be `tasks`. If the `name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.