# منصة macOS

## النظرة عامة

إلكترون لديه واجهة برمجة التطبيقات لتهيئة أيقونة التطبيق في ماكوس. ماكوس-فقط API موجود لإنشاء قائمة الإرساء المخصصة، لكن إلكترون يستخدم أيضًا رصيف التطبيق كنقطة دخول لميزات عبر المنصة مثل [المستندات الأخيرة](./recent-documents.md) و [تقدم التطبيق](./progress-bar.md).

يتم استخدام قاعدة الإرساء المخصصة عادة لإضافة الاختصارات إلى المهام التي لن يتمكن المستخدم من فتح نافذة التطبيق بأكملها.

__قائمة الإرساء من Terminal.app:__

![قائمة الإرساء](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

لتعيين قائمة الإرساء المخصصة الخاصة بك، تحتاج إلى استخدام [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) API المتاح فقط على macOS.

## مثال

بدءاً بتطبيق عمل من [دليل البداية السريعة](quick-start.md)، قم بتحديث ملف `main.js` مع الأسطر التالية:

```javascript fiddle='docs/fiddles/features/macos-dock-menu'
متجر { app, Menu } = مطلوبة ('electron')

dockMenu = القائمة. uildFromTemplate([
  {
    التسمية: 'Window',
    انقر فوق () { console. og('New Window') }
  }, {
    namel: 'New Window with Settings',
    القائمة الفرعية: [
      { label: 'Basic' }،
      { label: 'Pro' }
    ]
  }،
  { label: 'New Command...' }
])

تطبيق. henReady().then(() => {
  app.dock.setMenu(dockMenu)
})
```

بعد بدء تطبيق إلكترون، انقر بزر الماوس الأيمن على رمز التطبيق. يجب أن ترى القائمة المخصصة التي عرفتها للتو:

![قائمة الإرساء لـ macOS](../images/macos-dock-menu.png)
