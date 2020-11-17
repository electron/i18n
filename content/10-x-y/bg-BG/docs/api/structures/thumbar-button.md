# Обект ThumbarButton

* `icon` [NativeImage](../native-image.md) - Иконата, показваща се в миниатюрата на toolbar лентата.
* `click` Function - Функцията, която се изпълнява при натискане на бутона
* `tooltip` String (по избор) - Пояснителният текст на бутона.
* `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

`flags` e масив, който може да включва следните `String` стойности:

* `enabled` - Бутонът е активен и достъпни за потребителя.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - Когато бутонът е натиснат, миниатюрният прозорец се затваря веднага.
* `nobackground` - Границите на бутона не се изчертават, използва само изображение.
* `hidden` - Бутонът не се показва на потребителя.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.
