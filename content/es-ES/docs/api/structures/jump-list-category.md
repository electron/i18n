# Objeto JumpListCategory

* `tipo` Cadena (opcional) - Una de los siguientes: 
  * `tareas` - Los objetos en esta categoría se colocarán en la categoría estándar de `Tareas`. Puede haber sólo una categoría, y siempre será mostrada en la parte inferior de la Lista Jump.
  * `frecuente` - Muestra una lista de archivos abiertos frecuentemente por la aplicación, el nombre de la categoría y sus objetos son establecidos por Windows.
  * `reciente` - Muestra una lista de archivos abiertos recientemente por la aplicación, el nombre de la categoría y sus objetos son establecidos por Windows. Los objetos pueden añadidos a esta categoría indirectamente utilizando `app.addRecentDocument(path)`.
  * `personalizado` - Muestra tareas o enlaces de archivo, `nombre` debe ser establecido por la aplicación.
* `nombre` Cadena (opcional) - Debe establecerse si `tipo` es `personalizado`, de lo contrario debe omitirse.
* `objetos` JumpListItem [] (opcional) - Array de objetos [`JumpListItem`](jump-list-item.md) si `tipo` es `tareas` o `personalizado`, de lo contrario debe omitirse.

**Nota:** Si un objeto de `JumpListCategory` no tiene ni el `tipo` ni el `nombre` de su conjunto de propiedad, se asume que su `tipo` es `tareas`. Si la propiedad `nombre` está establecida pero la propiedad `tipo` se omite entonces el `tipo` se asume que el tipo es `personalizado`.