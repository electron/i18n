# ThumbarButton Object

* `أيقونة`[الصورة الأصلية](../native-image.md) - الأيقونة تظهر في الصورة المصغرة لشريط الأدوات.
* `أنقر` Function
* `أداة` String (اختياري) - نص أداة الزر.
* `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

`الأعلام` هم مصفوفة يمكن أن تتضمن ما يلي `سلاسل نصية`:

* `مكّن` - الزر نشط ومتاح للمستخدم.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `رفض عند النقر` - عند النقر فوق الزر ، يتم إغلاق نافذة الصور المصغرة فورا.
* `لا توجد خلفية ` - لا ترسم حدود الزر ، استخدم الصورة فقط.
* `مخفي` - لا يظهر الزر للمستخدم.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.
