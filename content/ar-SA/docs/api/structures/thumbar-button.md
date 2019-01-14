# ThumbarButton Object

* `أيقونة`[الصورة الأصلية](../native-image.md) - الأيقونة تظهر في الصورة المصغرة لشريط الأدوات.
* `أنقر` Function
* `أداة` String (اختياري) - نص أداة الزر.
* `أعلام` String[] (اختياري) ء السيطرة على حالات وسلوكيات محددة للزر. افتراضيا ، هو `['enabled']`.

The `flags` is an array that can include following `String`s:

* `enabled` - The button is active and available to the user.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - When the button is clicked, the thumbnail window closes immediately.
* `nobackground` - Do not draw a button border, use only the image.
* `hidden` - The button is not shown to the user.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.