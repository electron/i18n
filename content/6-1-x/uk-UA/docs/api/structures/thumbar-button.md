# Об'єкт ThumbarButton

* `icon` [NativeImage](../native-image.md) - Піктограма для показу на палені мініатюр.
* `click` Function
* `tooltip` String (опціонально) - Текст для підказки кнопки.
* `flags` String[] (optional) - Control specific states and behaviors of the button. За замовчуванням, це `['enabled']`.

`flags` це масив, що може містити наступні `String`:

* `enabled` - Кнопка активна та доступна юзеру.
* `disabled` - Кнопка вимкнена. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - Коли на кнопку натискають, панель мініатюр негайно закривається.
* `nobackground` - Не малювати границі кнопки, використовувати тільки зображення.
* `hidden` - Кнопка не відображається користувачу.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.
