# إشعارات (Windows, Linux, macOS)

جميع أنظمة التشغيل الثلاثة توفر وسائل للتطبيقات لإرسال الإشعارات للمستخدم. إلكترون يسمح للمطورين بإرسال إشعارات مع [HTML5 Notification API](https://notifications.spec.whatwg.org/)، باستخدام أجهزة برمجة التطبيقات المحلية لنظام التشغيل قيد التشغيل حاليا لعرضها.

**Note:** Since this is an HTML5 API it is only available in the renderer process. إذا كان تريد إظهار الإشعارات في العملية الرئيسية الرجاء التحقق من وحدة [الإشعارات](../api/notification.md).

```javascript
السماح لmyNotification = إشعار جديد ('Title', {
  body: 'Lorem Ipsum Dolor Sit Amet'
})

myNotification.onclick = () => {
  console.log('الإشعار بالنقر')
}
```

في حين أن البرمجة وتجربة المستخدم عبر أنظمة التشغيل متشابهة، هناك اختلافات دقيقة.

## Windows
* On Windows 10, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start Menu. هذا يمكن أن يكون قاتلاً أثناء التطوير، لذلك إضافة `node_modules\electron\dist\electron.exe` إلى قائمة البدء تقوم أيضًا بالخدعة. انتقل إلى الملف في المستكشف ، انقر بالزر الأيمن و 'ثبت لبدء القائمة'. ستحتاج بعد ذلك إلى إضافة السطر `app.setAppUserModelId(process.execPath)` إلى العملية الرئيسية الخاصة بك لمشاهدة الإشعارات.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start screen. لاحظ مع ذلك ، أنه ليس من الضروري تثبيته على شاشة البداية.
* على Windows 7، تعمل الإخطارات عبر تنفيذ مخصص يشبه بصرياً البرنامج الأصلي على الأنظمة الأحدث.

يحاول إلكترون أتمتة العمل حول معرف نموذج المستخدم التطبيق. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly][squirrel-events]. علاوة على ذلك، سيكتشف Electron أن Squirrel قد استخدم وسيتصل تلقائيا بـ `app.setAppUserModelId()` بالقيمة الصحيحة. During development, you may have to call [`app.setAppUserModelId()`][set-app-user-model-id] yourself.

علاوة على ذلك، في Windows 8، الحد الأقصى لطول هيئة الإخطار هو 250 حرفاً، مع فريق ويندوز يوصي بالاحتفاظ بالإشعارات إلى 200 حرف. مع ذلك، تم إزالة هذا الحد في Windows 10، مع فريق Windows يطلب من المطورين أن يكونوا معقولين. محاولة إرسال كميات ضخمة من النص إلى API (آلاف الأحرف) قد تؤدي إلى عدم الاستقرار.

### الإشعارات المتقدمة

تسمح الإصدارات اللاحقة من Windows بالإشعارات المتقدمة، مع قوالب مخصصة، صور، وعناصر مرنة أخرى. لإرسال هذه الإشعارات (إما من العملية الرئيسية أو من عملية العرض)، استخدم وحدة المستخدم [إلكترون - نوافذ الإخطارات](https://github.com/felixrieseberg/electron-windows-notifications)، الذي يستخدم إضافات العقدة الأصلية لإرسال `إشعار` و `إخطارات` الكائنات.

بينما الإشعارات بما في ذلك الأزرار تعمل مع `إلكترون - نوافذ الإخطارات`، معالجة الردود تتطلب استخدام [`الإشعارات الإلكترونية - النوافذ التفاعلية`](https://github.com/felixrieseberg/electron-windows-interactive-notifications)، الذي يساعد في تسجيل مكونات COM المطلوبة واتصال تطبيق Electron الخاص بك مع بيانات المستخدم المدخلة.

### ساعات هادئة/وضع العرض التقديمي

لكشف ما إذا كان مسموحا لك أو لا يسمح لك بإرسال إشعار، استخدم وحدة المستخدم [حالة الإخطارات الإلكترونية](https://github.com/felixrieseberg/electron-notification-state).

هذا يسمح لك بأن تحدد مسبقاً ما إذا كان ويندوز سيرمي الإشعار بعيداً عن الصمت أم لا.

## نظام macOS

الإشعارات مباشرة على macOS، ولكن يجب أن تكون على علم بـ [المبادئ التوجيهية للواجهة البشرية لـ Apple فيما يتعلق بالإخطارات](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

لاحظ أن الإشعارات تقتصر على 256 بايت في الحجم وسيتم اختزالها إذا تجاوزت هذا الحد.

### الإشعارات المتقدمة

تسمح الإصدارات اللاحقة من macOS بالإشعارات مع حقل الإدخال، مما يسمح للمستخدم بالرد بسرعة على الإشعار. من أجل إرسال إشعارات مع حقل الإدخال، استخدم وحدة المستخدم [مبلِّغ العقدة](https://github.com/CharlieHess/node-mac-notifier).

### عدم الإزعاج / حالة الجلسة

لكشف ما إذا كان مسموحا لك أو لا يسمح لك بإرسال إشعار، استخدم وحدة المستخدم [حالة الإخطارات الإلكترونية](https://github.com/felixrieseberg/electron-notification-state).

هذا سيتيح لك أن تكتشف مسبقاً ما إذا كان سيتم عرض الإشعار أم لا.

## Linux

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows [Desktop Notifications Specification][notification-spec], including Cinnamon, Enlightenment, Unity, GNOME, KDE.

[notification-spec]: https://developer.gnome.org/notification-spec/
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[set-app-user-model-id]: ../api/app.md#appsetappusermodelidid-windows
[squirrel-events]: https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events
