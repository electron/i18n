# JumpListCategory Объект

* `type` String (опиционально) - Одно из следующего: 
  * `tasks` - Элементы этой категории будут помещены в стандартную категорию `Tasks`. Там может быть только одна такая категория, и она всегда будет отображается в нижней части списка переходов.
  * `frequent` - Displays a list of files frequently opened by the app, the name of the category and its items are set by Windows.
  * `recent` - Displays a list of files recently opened by the app, the name of the category and its items are set by Windows. Items may be added to this category indirectly using `app.addRecentDocument(path)`.
  * `custom` - Displays tasks or file links, `name` must be set by the app.
* `name` String (optional) - Must be set if `type` is `custom`, otherwise it should be omitted.
* `items` JumpListItem[] (optional) - Array of [`JumpListItem`](jump-list-item.md) objects if `type` is `tasks` or `custom`, otherwise it should be omitted.

**Примечание:** Если `JumpListCategory` не имеет `типа` или `имени` , то он будет приведен к `типу` `tasks`. If the `name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.