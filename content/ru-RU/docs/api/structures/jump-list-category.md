# JumpListCategory Объект

* `type` String (опиционально) - Одно из следующего: 
  * `tasks` - Элементы этой категории будут помещены в стандартную категорию `Tasks`. Там может быть только одна такая категория, и она всегда будет отображается в нижней части списка переходов.
  * `frequent` - Отображать список файлов, недавно открытых приложением, имя категории и этого элемента устанавливаются в Windows.
  * `recent` - Отображать список файлов, недавно открытых приложением, имя категории и этого элемента устанавливаются в Windows. Элементы могут быть добавлены в эту категорию косвенно, используя `app.addRecentDocument(path)`.
  * `custom` - Отображать ссылки на задачи или файлы, `name` должно быть установлено приложением.
* `name` String (optional) - Must be set if `type` is `custom`, otherwise it should be omitted.
* `items` JumpListItem[] (optional) - Array of [`JumpListItem`](jump-list-item.md) objects if `type` is `tasks` or `custom`, otherwise it should be omitted.

**Примечание:** Если `JumpListCategory` не имеет `типа` или `имени` , то он будет приведен к `типу` `tasks`. If the `name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.