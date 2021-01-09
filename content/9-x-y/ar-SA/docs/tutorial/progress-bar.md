# شريط التقدم في شريط المهام (Windows, macOS, Unity)

على Windows يمكن استخدام زر شريط المهام لعرض شريط التقدم. هذا يمكّن نافذة لتوفير معلومات التقدم للمستخدم دون أن يضطر المستخدم إلى التبديل إلى النافذة نفسها.

على macOS سيتم عرض شريط التقدم كجزء من أيقونة الإرساء.

وحدة DE لديها أيضا ميزة مماثلة تسمح لك بتحديد شريط التقدم في المشغل.

__شريط التقدم في زر شريط المهام:__

![شريط تقدم شريط المهام][1]

جميع الحالات الثلاث مشمولة بنفس API - طريقة `setProgressBar()` المتاحة على مثيلات `متصفح ويندوز`. اتصل به برقم بين `0` و `1` للإشارة إلى تقدمك. إذا كان لديك مهمة طويلة الأمد حاليا عند 63% نحو الاكتمال، فستتصل بها مع `setProgressBar(0.63)`.

بوجه عام، سيؤدي تعيين المعلمة إلى قيمة أقل من الصفر (مثل `-1` إلى إزالة شريط التقدم أثناء إعداده إلى قيمة أعلى من واحد (مثل `2`) إلى تبديل شريط التقدم إلى الوضع المتوسط.

See the [API documentation for more options and modes][setprogressbar].

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```

[1]: https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress
