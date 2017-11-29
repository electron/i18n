# Об'єкт JumpListCategory

* `type` String (опціонально) - Один з наступних: 
  * `tasks` - Елементи в цій категорії будуть розміщенні в стандартну категорію `Tasks`. Може бути тільки одна така категорія, вона завжди буде показана внизу списку переходів.
  * `frequent` - Відображає список файлів, що часто відкривалися додатком, назву та елементи встановлює Windows.
  * `recent` - Відображає список файлів, що нещодавно відкривалися додатком, назву та елементи встановлює Windows. Items may be added to this category indirectly using `app.addRecentDocument(path)`.
  * `custom` - Displays tasks or file links, `name` must be set by the app.
* `name` String (optional) - Must be set if `type` is `custom`, otherwise it should be omitted.
* `items` JumpListItem[] (optional) - Array of [`JumpListItem`](jump-list-item.md) objects if `type` is `tasks` or `custom`, otherwise it should be omitted.

**Note:** If a `JumpListCategory` object has neither the `type` nor the `name` property set then its `type` is assumed to be `tasks`. If the `name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.