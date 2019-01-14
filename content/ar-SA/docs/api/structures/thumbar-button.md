# ThumbarButton Object

* `أيقونة`[الصورة الأصلية](../native-image.md) - الأيقونة تظهر في الصورة المصغرة لشريط الأدوات.
* `أنقر` Function
* `أداة` String (اختياري) - نص أداة الزر.
* `أعلام` String[] (اختياري) ء السيطرة على حالات وسلوكيات محددة للزر. افتراضيا ، هو `['enabled']`.

`الأعلام` هم مصفوفة يمكن أن تتضمن ما يلي `سلاسل نصية`:

* `مكّن` - الزر نشط ومتاح للمستخدم.
* `معطل` - الزر معطل. هو موجود ، ولكن لديه حالة تصويرية تشير إلى أنه لن يستجيب لإجراءات المستخدم.
* `رفض عند النقر` - عند النقر فوق الزر ، يتم إغلاق نافذة الصور المصغرة فورا.
* `nobackground` - Do not draw a button border, use only the image.
* `hidden` - The button is not shown to the user.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.