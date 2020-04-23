# Об'єкт JumpListCategory

* `type` String (optional) - One of the following:
  * `tasks` - Елементи в цій категорії будуть розміщенні в стандартну категорію `Tasks`. Може бути тільки одна така категорія, вона завжди буде показана внизу списку переходів.
  * `frequent` - Відображає список файлів, що часто відкривалися додатком, назву та елементи встановлює Windows.
  * `recent` - Відображає список файлів, що нещодавно відкривалися додатком, назву та елементи встановлює Windows. Елементи иожуть бути додані в цю категорію через використання `app.addRecentDocument(path)`.
  * `custom` - Відображає задачі чи посилання на файли, `name` має бути визначене додатком.
* `name` String (опціонально) - Має бути визнечений, якщо `type` `custom`, в іншому випадку його слід пропускати.
* `items` JumpListItem[] (опціонально) - Масив [`JumpListItem`](jump-list-item.md) об'єктиів, якщо `type` `tasks` чи `custom`, в іншому випадку його слід пропускати.

**Note:** If a `JumpListCategory` object has neither the `type` nor the `name` property set then its `type` is assumed to be `tasks`. Якщо встановлена властивість `name` але властивість `type` пропущено, то `type` вважається `custom`.
