---
title: Electron 5.0.0
author:
  - BinaryMuse
  - ckerr
  - jkleinsc
date: '2019-04-23'
---

فريق إلكترون متحمس للإعلان عن إصدار إلكترون 5.0.0! يمكنك تثبيته باستخدام npm عن طريق `npm تثبيت electron@latest` أو تحميل القطارات من [صفحة الإصدارات الخاصة بنا](https://github.com/electron/electron/releases/tag/v5.0.0). يتم تعبئة الإصدار مع الترقيات والإصلاحات والميزات الجديدة. لا يمكننا الانتظار لرؤية ما تبنيه معهم! واصل القراءة للحصول على تفاصيل حول هذا الإصدار، يرجى مشاركة أي ملاحظات لديك!

---

## ما الجديد؟

وتوفر المكونات الأساسية لـ Chromium، و Node.js، و V8 جزءا كبيرا من وظيفة Electron. إلكترون يحافظ على تحديث هذه المشاريع لتزويد مستخدمينا بميزات جافا سكريبت الجديدة، وتحسين الأداء، والإصلاحات الأمنية. كل من هذه الحزم يحتوي على نسخة رئيسية في إلكترون 5:

- Chromium `73.0.3683.119`
  - [جديد في 70](https://developers.google.com/web/updates/2018/10/nic70)
  - [جديد في 71](https://developers.google.com/web/updates/2018/12/nic71)
  - [جديد في 72](https://developers.google.com/web/updates/2019/01/nic72)
  - [جديد في 73](https://developers.google.com/web/updates/2019/03/nic73)
- Node.js `12.0.0`
  - [عقدة 12 مشاركة المدونة](https://nodejs.org/en/blog/release/v12.0.0/)
- V8 `7.3.492.27`.
  - [ميزات JS جديدة](https://twitter.com/mathias/status/1120700101637353473)

ويشمل إلكترون 5 أيضاً تحسينات على API الخاصة بإلكترون. يوجد أدناه ملخص للتغييرات الرئيسية؛ للحصول على القائمة الكاملة للتغييرات، تحقق من [إلكترون v5.0.0 ملاحظات الإصدار](https://github.com/electron/electron/releases/tag/v5.0.0).

### Promisification

إستمرار مبادرة إلكترون 5 [مبادرة التبشير](https://github.com/electron/electron/blob/5-0-x/docs/api/promisification.md) لتحويل واجهة برمجة تطبيقات إلكترون القائمة على رد المكالمات إلى استخدام الوعود. تم تحويل واجهات برمجة التطبيقات هذه إلى إلكترون 5:
* `app.getFileIcon`
* `تتبع المحتوى.getcategorories`
* `contentTracing.startregisording`
* `محتوىTracing.stopRecording`
* `debugger.sendCommand`
* ملفات تعريف الارتباط API
* `shell.openExternal`
* `webContents.loadFile`
* `webContents.loadURL`
* `webContents.zoomLevel`
* `webContents.zoomFactor`
* `win.capturePpage`

### الوصول إلى ألوان النظام لـ macOS

تم تغيير أو إضافة هذه الوظائف إلى `نظام تفضيلات` للوصول إلى ألوان أنظمة ماكوس:
* `نظام الأفضليات.getAccentColor`
* `نظام الأفضليات.getColor`
* `نظام الأفضليات.getSystemColor`

### معالجة معلومات الذاكرة

تمت إضافة الدالة `process.getProcessMemoryInfo` للحصول على إحصائيات استخدام الذاكرة حول العملية الحالية.

### عامل تصفية إضافي لAPIs البعيد

To improve security in the `remote` API, new remote events have been added so that `remote.getBuiltin`, `remote.getCurrentWindow`, `remote.getCurrentWebContents` and `<webview>.getWebContents` can be [filtered](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#13-disable-or-limit-creation-of-new-windows).

### مشاهدة متصفح متعددة على نافذة المتصفح

يدعم نافذة المتصفح الآن إدارة العديد من وجهات نظر المتصفح داخل نفس نافذة المتصفح.

## كسر تغييرات API

### الافتراضي لتطبيقات الحزم

سوف تتصرف التطبيقات المحزمة الآن بنفس الطريقة التي يعمل بها التطبيق الافتراضي: سيتم إنشاء قائمة التطبيق الافتراضية ما لم يكن للتطبيق واحد وسيتم التعامل مع الحدث `النافذة كلها` تلقائياً ما لم يتعامل التطبيق مع الحدث.

### صندوق رمل مختلط

تم الآن تمكين وضع صندوق الرمل المختلط بشكل افتراضي. المعرضون الذين تم تشغيلهم مع `صندوق الرمل: صحيح` سيتم الآن في الواقع في صندوق الرمال، حيث كان سيتم ربطهم في السابق فقط إذا تم تمكين وضع صندوق الرمل المختلط.

### التحسينات الأمنية
القيم الافتراضية لـ `عقد التكامل` و `webviewtag` هي الآن `خاطئة` لتحسين الأمان.

### المدقق الإملائي الآن غير متزامن

تم تغيير API للفحص الإملائي لتوفير [نتائج غير متزامنة](https://github.com/electron/electron/blob/5-0-x/docs/api/web-frame.md#webframesetspellcheckproviderlanguage-provider).

## الإهانات

واجهات برمجة التطبيقات التالية مهملة حديثاً في إلكترون 5.0.0 ومن المقرر إزالتها في 6.0.0:

### لقطة ثنائية للذراع و الذراع 64
أما ثنائيات اللقطات المحلية للذراع والأسلحة 64 فهي مهملة وسيتم إزالتها في 6 أعوام. .0. يمكن إنشاء لقطات الذراع و الذراع 64 باستخدام ثنائيات x64.

### واجهة برمجة تطبيقات عمال الخدمة على محتويات الويب
واجهة برمجة تطبيقات عمال الخدمة المهملين على محتويات الويب استعدادا لإزالتهم.
* `webContents.hasServiceWorker`
* `webContents.unregisterServiceWorker`

### وحدات تلقائية مع محتويات ويب مربوطة
من أجل تحسين الأمن، الوحدات التالية يتم إهمالها لاستخدامها مباشرة عبر `تتطلب` وسوف تحتاج بدلاً من ذلك إلى إدراجها عبر `جهاز التحكم البعيد. مساواة` في محتويات ويب مربعة:
* `إلكتروني.شاشةformat@@0`
* `عملية الطفل_`
* `fs`
* `الحواشي`
* `المسار`

## webFrame Isolated World APIs
`webFrame.setIsolatedWorldContentSecurityPolicy`،`webFrame.setIsolatedWorldHumanReadableName`، `webFrame.setolatedWorldSecurityOrigin` تم تجاهلها لصالح `webFrame.setIsolatedWorldInfo`.

### صندوق رمل مختلط
`enableMixedSandbox` و `--enable-sandbox` مفتاح سطر الأوامر لا يزال موجودا لتحقيق التوافق، ولكنه مهمل وليس له أي تأثير.

## نهاية الدعم لـ 2.0.x

في سياسة الإصدارات المدعومة [](https://electronjs.org/docs/tutorial/support#supported-versions)، وصلت 2.0.x إلى نهاية الحياة.

## برنامج ملاحظات بيتا

نحن نواصل استخدام [برنامج ملاحظات التطبيق](https://electronjs.org/blog/app-feedback-program) للاختبار. المشاريع التي تشارك في هذا البرنامج اختبار إلكترون بيتا في تطبيقاتها؛ وفي المقابل، يتم إعطاء الأولوية للأخطاء الجديدة التي يجدونها للإفراج المستقر. إذا كنت ترغب في المشاركة أو معرفة المزيد، [تحقق من مشاركة مدونتنا حول البرنامج](https://electronjs.org/blog/app-feedback-program).

## ما التالي

وفي الأجل القصير، يمكنك أن تتوقع من الفريق أن يستمر في التركيز على مواكبة تطوير المكونات الرئيسية التي تتكون منها الإلكترون، بما في ذلك Chromium، وNode، وV8. وعلى الرغم من أننا حريصون على عدم تقديم وعود بشأن تواريخ الإصدار، خطتنا هي إصدار إصدارات رئيسية جديدة من إلكترون مع إصدارات جديدة من تلك المكونات كل ثلاثة أشهر تقريبا. [جدول 6.0.0 المؤقت](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule) يحدد التواريخ الرئيسية في دورة تطوير إلكترون 6. أيضًا، [راجع مستند الإصدار](https://electronjs.org/docs/tutorial/electron-versioning) للحصول على معلومات أكثر تفصيلاً حول الإصدار في إلكترون.

للحصول على معلومات عن التغييرات المخططة في التكسير في الإصدارات القادمة من إلكترون، [راجع التغييرات المخطط لها الخاصة بنا](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
