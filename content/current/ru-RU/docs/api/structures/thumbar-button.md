# Объект ThumbarButton

* `icon` [NativeImage](../native-image.md) - иконка, отображаемая в миниатюре на панели инструментов.
* `click` Function
* `tooltip` String (опционально) - текст всплывающей подсказки на кнопке.
* `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

`flags` — это массив, который может включать следующие `строки`:

* `enabled` - кнопка активна и доступна пользователю.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - когда кнопка нажата, окно миниатюры закрывается немедленно.
* `nobackground` - не рисует границы кнопок, использует только изображение.
* `hidden` - кнопка не отображается пользователю.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.
