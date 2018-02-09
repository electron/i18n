# Обект JumpListCategory

* `тип` String (по избор) - Едно от следните: 
  * `tasks` - Елементите в тази категория ще бъдат стандартни `Tasks` категории. Може да има само една такава категория, и тя винаги ще се бъде показана в долната част на списъка за прескачане (Jump List).
  * `frequent` - Показва списък на файловете, често отваряни от приложението, името на категорията и неговите елементи са определени от Windows.
  * `recent` - Показва списък от файлове, наскоро отвори от приложението, името на категорията и неговите елементи са определени от Windows. Елементи могат да бъдат добавени към тази категория индиректно използвайки `app.addRecentDocument(path)`.
  * `custom` - Показва задачите или връзките с файлове, `name` трябва да се определи от приложението.
* `name` String (по избор) - Трябва да се определи, ако `type` е `custom`, в противен случай трябва да се пропусне.
* `items` JumpListItem[] (optional) - Array of [`JumpListItem`](jump-list-item.md) objects if `type` is `tasks` or `custom`, otherwise it should be omitted.

**Note:** If a `JumpListCategory` object has neither the `type` nor the `name` property set then its `type` is assumed to be `tasks`. If the `name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.