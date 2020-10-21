---
title: Electron 8.0.0
author:
  - jkleinsc
  - الألم
date: '2020-02-04'
---

تم تحرير إلكترون 8.0.0 ! يتضمن ترقيات إلى Chromium `80`، V8 `8.0`، و Node.js `12.13.0`. لقد أضفنا Chrome المدقق الإملائي المدمج، وأكثر من ذلك بكثير!

---

فريق إلكترون متحمس للإعلان عن إصدار إلكترون 8.0.0! يمكنك تثبيته باستخدام npm عن طريق `npm تثبيت electron@latest` أو تنزيله من [إصدارات موقعنا](https://electronjs.org/releases/stable). يتم تعبئة الإصدار مع الترقيات والإصلاحات والميزات الجديدة. لا يمكننا الانتظار لرؤية ما تبنيه معهم! واصل القراءة للحصول على تفاصيل حول هذا الإصدار، يرجى مشاركة أي ملاحظات لديك!

## تغييرات ملحوظة

### تكديس التغييرات
* Chromium `80.3987.86`
    * [جديد في كروم 79](https://developers.google.com/web/updates/2019/12/nic79)
    * [جديد في Chrome 80](https://chromereleases.googleblog.com/2020/02/stable-channel-update-for-desktop.html)
* Node.js `12.13.0`
    * [العقدة 12.13.0 مشاركة المدونة](https://nodejs.org/en/blog/release/v12.13.0/)
* V8 `8.0`
    * [مشاركة المدونة V8 7-9](https://v8.dev/blog/v8-release-79)
    * [مشاركة مدونة V8 8.0](https://v8.dev/blog/v8-release-80)

### إبراز الميزات
* الاستخدام المطبق لميزة المدقق الإملائي المدمجة في كروم. راجع المزيد من التفاصيل في [#20692](https://github.com/electron/electron/pull/20692) و [#21266](https://github.com/electron/electron/pull/21266).
* يستخدم اتصال IPC الآن خوارزمية استنساخ مبنية لـ v8. هذا أسرع وأكثر بروزا، وأقل إثارة للدهشة من المنطق القائم، ويحقق زيادة في الأداء بمقدار 2 × لحاجزات كبيرة وعناصر معقدة. ولا تتأثر الرسائل الصغيرة تأثرا كبيرا. راجع المزيد من التفاصيل في [#20214](https://github.com/electron/electron/pull/20214).

راجع [ملاحظات الإصدار 8.0.0](https://github.com/electron/electron/releases/tag/v8.0.0) للحصول على قائمة كاملة من الميزات والتغييرات الجديدة.

## كسر تغييرات API

* إظهار اسم الوحدة في تحذير الإهمال للوحدات-إدراك السياق. [#21952](https://github.com/electron/electron/pull/21952)
    * هذا هو العمل المستمر من أجل متطلبات مستقبلية أن تكون وحدات العقدة الأصلية المحملة في عملية العارض إما [N-API](https://nodejs.org/api/n-api.html) أو [علم السياق](https://nodejs.org/api/addons.html#addons_context_aware_addons). المعلومات الكاملة والخط الزمني المقترح مفصلان في [هذه المشكلة](https://github.com/electron/electron/issues/18397).
* يتم الآن تسلسل القيم المرسلة عبر IPC مع خوارزمية النسخ الهيكلية.  [#20214](https://github.com/electron/electron/pull/20214)
* العرض خارج الشاشة معطل حاليا بسبب عدم وجود مشرف للعمل على هذه الميزة.  وقد انهار أثناء ترقية الكروميوم ثم أصيب بعجز. [#20772](https://github.com/electron/electron/issues/20772)

More information about these and future changes can be found on the [Planned Breaking Changes](https://github.com/electron/electron/blob/master/docs/breaking-changes.md) page.

## تغييرات API
* `تطبيق` تغير API :
    * تم إضافة `app.getApplicationNameForprotocol(url)`. [#20399](https://github.com/electron/electron/pull/20399)
    * إضافة دعم `app.showAboutPanel()` و `app.setAboutPanelOptions(خيارات)` على Windows. [#19420](https://github.com/electron/electron/pull/19420)
* `نافذة المتصفح` تغير API:
    * تم تحديث المستندات لملاحظة أن خيارات نافذة المتصفح `hasShadow` متوفرة على جميع المنصات [#20038](https://github.com/electron/electron/pull/20038)
    * أضف `خيار الإضاءة لحركة المرور` إلى خيارات نافذة المتصفح للسماح بوضع مخصص لأزرار إضاءة المرور. [#21781](https://github.com/electron/electron/pull/21781)
    * تم إضافة `عنوان الوصول` إلى نافذة المتصفح لتعيين عنوان النافذة الذي يمكن الوصول إليه [#19698](https://github.com/electron/electron/pull/19698)
    * `BrowserWindow.fromWebContents()` يمكن الآن أن يعود فارغًا [#19983](https://github.com/electron/electron/pull/19983)
    * تمت إضافة `BrowserWindow.getMediaSourceId()` و `BrowserWindow.moveAbove(mediaSourceId)`. [#18926](https://github.com/electron/electron/pull/18926)
    * تم إضافة دعم للحدث `سينقل` على macOS. [#19641](https://github.com/electron/electron/pull/19641)
* موثق من قبل بدون وثائق `crashReporter.getCrashesDirectory()`. [#20417](https://github.com/electron/electron/pull/20417)
* `حوار` تغير API :
    * إضافة خاصية `dontAddToRecent` إلى `dialog.showOpenDialog` و `حوار . HowOpenDialogSync` لمنع إضافة المستندات إلى الوثائق الحديثة على Windows في حوار مفتوح. [#19669](https://github.com/electron/electron/pull/19669)
    * إضافة خاصية تخصيص إلى `dialog.showSaveDialog` و `dialog.showSaveDialogSync`. [#19672](https://github.com/electron/electron/pull/19672)
* `إشعار` تغير API :
    * إضافة خيار `timeoutType` للسماح لمستخدمي Linux/Windows بتعيين نوع مهلة الإشعار. [#20153](https://github.com/electron/electron/pull/20153)
    * أضاف خيار `الاستعجال`  لتعيين الحاجة الملحة على إشعارات لينوكس. [#20152](https://github.com/electron/electron/pull/20152)
* `الجلسة` تغير API:
    * تم تحديث الوثائق حول `session.setProxy(config)` و `session.setCertificateVerifyProc(proc)` لملاحظة الخيارات الاختيارية. [#19604](https://github.com/electron/electron/pull/19604)
    * تمت إضافة `session.downloadURL(url)` للسماح بتشغيل التنزيلات بدون متصفح ويندوز. [#19889](https://github.com/electron/electron/pull/19889)
    * تم إضافة دعم إلى تلميحات مورد الاتصال المسبق لـ HTTP عبر `session.preconnect(خيارات)` و `الاتصال المسبق`. [#18671](http://github.com/electron/electron/pull/18671)
    * تم إضافة `session.add.ToSpellCheckerDictionary` للسماح بكلمات مخصصة في القاموس [#21297](http://github.com/electron/electron/pull/21297)
* إضافة خيار إلى `shell.moveItemToTrash(fullPath[, deleteOnFail])` على macOS لتحديد ما يحدث عندما تفشل حركة ItemToTrash. [#19700](https://github.com/electron/electron/pull/19700)
* `تفضيلات النظام` تغير API :
    * تم تحديث `نظام الأفضليات.getColor(color)` مستندات macOS. [#20611](https://github.com/electron/electron/pull/20611)
    * تم إضافة `شاشة` نوع الوسائط إلى `نظام الأفضليات .getMediaAccessStatus()`. [#20764](https://github.com/electron/electron/pull/20764)
* أضيفت `nativeTheme.themeSource` للسماح للتطبيقات بتجاوز Chromium واختيار موضوع OS. [#19960](https://github.com/electron/electron/pull/19960)
* تغييرات API شريط التاتس:
    * إضافة خاصية `إمكانية الوصول` إلى `زر TouchBarBuon` و `TouchBarLabel` لتحسين الوصول إلى TouchBarButton/TouchBarLabel . [#20454](https://github.com/electron/electron/pull/20454)
    * تحديث المستندات ذات الصلة بـ TouchBar [#19444](https://github.com/electron/electron/pull/19444)
* `علامة` تغير API :
    * تم إضافة خيارات جديدة إلى `tray.displayBalloon()`: `iconType`، `زيادة الرمز`، `NoSound` و `respectQuietTime`. [#19544](https://github.com/electron/electron/pull/19544)
    * أضيفت tray.removeBalloon(), والذي يزيل إشعار بالون المعروض مسبقاً. [#19547](https://github.com/electron/electron/pull/19547)
    * تمت إضافة tray.focus(), التي ترجع التركيز إلى منطقة إشعار شريط المهام. ميزة: إضافة tray.focus() [#19548](https://github.com/electron/electron/pull/19548)
* `محتويات الويب` تغير API:
    * أضاف `contents.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])` لفضح executeJavaScriptInIsolatedWorld على واجهة برمجة التطبيقات API. [#21190](https://github.com/electron/electron/pull/21190)
    * تم إضافة طرق لالتقاط محتويات الويب المخفية. [#21679](https://github.com/electron/electron/pull/21679)
    * تم إضافة خيارات إلى `webContents.print([options]، [callback])` لتمكين تخصيص عناوين صفحات الطباعة وتذييلات الصفحات. [#19688](https://github.com/electron/electron/pull/19688)
    * تمت إضافة القدرة على تفتيش عمال مشتركين محددين عبر `webContents.getAllSharedWorkers()` و `webContents.inspectSharedWorkerById(workerId)`. [#20389](https://github.com/electron/electron/pull/20389)
    * تمت إضافة دعم `fitToPageEnable` و `scaleFactor` في خيارات WebContents.printToPDF. [#20436](https://github.com/electron/electron/pull/20436)
* تم تحديث مستندات `webview.printToPDF` للإشارة إلى نوع الإرجاع هو الآن Uint8Array. [#20505](https://github.com/electron/electron/pull/20505)

### APIs مهمل
واجهات برمجة التطبيقات التالية مهملة الآن:
* أهمل خيار `visibleOnFullScreen` في `BrowserWindow.setVisibleOnAllWorkspaces` قبل إزالته في الإصدار الرئيسي التالي. [#21732](https://github.com/electron/electron/pull/21732)
* مهمل `البديل المحدد - control-text` على `systemPreferences.getColor(color)` لـ macOS. [#20611](https://github.com/electron/electron/pull/20611)
* Deprecated `setLayoutZoomLevelLimits` on `webContents`, `webFrame`, and `<webview> Tag` because Chromium removed this capability. [#21296](https://github.com/electron/electron/pull/21296)
* القيمة الافتراضية لـ `خطأ` لـ `app.allowRendererProcessreuse` أصبحت الآن مهملة. [#21287](https://github.com/electron/electron/pull/21287)
* مهمل `<webview>.getWebContents()` لأنه يعتمد على الوحدة النمطية البعيدة. [#20726](https://github.com/electron/electron/pull/20726)

## نهاية الدعم لـ 5.x.y

إلكترون 5.x.y وصلت إلى نهاية الدعم وفقاً لسياسة الدعم للمشروع [](https://electronjs.org/docs/tutorial/support#supported-versions). يتم تشجيع المطورين والتطبيقات على الترقية إلى إصدار أحدث من إلكترون.

## برنامج ملاحظات بيتا

نحن نواصل استخدام [برنامج ملاحظات التطبيق](https://electronjs.org/blog/app-feedback-program) للاختبار. المشاريع التي تشارك في هذا البرنامج اختبار إلكترون بيتا في تطبيقاتها؛ وفي المقابل، يتم إعطاء الأولوية للأخطاء الجديدة التي يجدونها للإفراج المستقر. إذا كنت ترغب في المشاركة أو معرفة المزيد، [تحقق من مشاركة مدونتنا حول البرنامج](https://electronjs.org/blog/app-feedback-program).

## ما التالي

وفي الأجل القصير، يمكنك أن تتوقع من الفريق أن يستمر في التركيز على مواكبة تطوير المكونات الرئيسية التي تتكون منها الإلكترون، بما في ذلك Chromium، وNode، وV8. وعلى الرغم من أننا حريصون على عدم تقديم وعود بشأن تواريخ الإصدار، خطتنا هي إصدار إصدارات رئيسية جديدة من إلكترون مع إصدارات جديدة من تلك المكونات كل ثلاثة أشهر تقريبا. [جدول 9.0.0 مؤقت](https://electronjs.org/docs/tutorial/electron-timelines) يحدد التواريخ الرئيسية في دورة تطوير إلكترون 9. أيضًا، [راجع مستند الإصدار](https://electronjs.org/docs/tutorial/electron-versioning) للحصول على معلومات أكثر تفصيلاً حول الإصدار في إلكترون.

للحصول على معلومات عن التغييرات المخططة في التكسير في الإصدارات القادمة من إلكترون، [راجع التغييرات المخطط لها الخاصة بنا](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### إهمال `وحدة` عن بعد (ابدأ في إلكترون 9)
بسبب الالتزامات الأمنية الجادة، نحن نبدأ خطط لإلغاء وحدة [`البعيد`](https://www.electronjs.org/docs/api/remote) بدءاً من إلكترون 9. يمكنك قراءة ومتابعة [هذه المشكلة](https://github.com/electron/electron/issues/21408) التي تفصل أسبابنا لهذا وتتضمن الجدول الزمني المقترح للإهمال.
