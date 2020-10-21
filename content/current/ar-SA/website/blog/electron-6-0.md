---
title: Electron 6.0.0
author:
  - الألم
  - ckerr
  - codebytere
date: '2019-07-30'
---

فريق إلكترون متحمس للإعلان عن إصدار إلكترون 6.0.0! يمكنك تثبيته باستخدام npm عن طريق `npm تثبيت electron@latest` أو تنزيله من [إصدارات موقعنا](https://electronjs.org/releases/stable). يتم تعبئة الإصدار مع الترقيات والإصلاحات والميزات الجديدة. لا يمكننا الانتظار لرؤية ما تبنيه معهم! واصل القراءة للحصول على تفاصيل حول هذا الإصدار، يرجى مشاركة أي ملاحظات لديك!

---

## ما الجديد

اليوم هو أول مرة لمشروع إلكترون: هذه هي المرة الأولى التي نقوم فيها بإصدار إلكترون مستقر **في نفس اليوم** كالإصدار [المستقر المقابل لكروم](https://www.chromestatus.com/features/schedule)! 🎉

وتوفر المكونات الأساسية لـ Chromium، و Node.js، و V8 جزءا كبيرا من وظيفة Electron. إلكترون يحافظ على تحديث هذه المشاريع لتزويد مستخدمينا بميزات جافا سكريبت الجديدة، وتحسين الأداء، والإصلاحات الأمنية. كل من هذه الحزم يحتوي على نسخة رئيسية في إلكترون 6:

- Chromium `76.0.3809.88`
  - [جديد في 74](https://developers.google.com/web/updates/2019/04/nic74)
  - [جديد في 75](https://developers.google.com/web/updates/2019/06/nic75)
  - [جديد في 76](https://developers.google.com/web/updates/2019/07/nic76)
- Node.js `12.4.0`
  - [مشاركة مدونة العقدة 12.4.0](https://nodejs.org/en/blog/release/v12.4.0/)
- V8 `7.6.303.22`
    - [مشاركة المدونة V8 7-6](https://v8.dev/blog/v8-release-76)

ويتضمن هذا الإصدار أيضا تحسينات في معامل API لشركة Electrons. [ملاحظات الإصدار](https://github.com/electron/electron/releases/tag/v6.0.0) لديها قائمة اكتمال، ولكن هنا النقاط البارزة:

### Promisification

إلكترون 6.0 يواصل مبادرة التحديث [](https://github.com/electron/electron/blob/master/docs/api/modernization/promisification.md) التي بدأت في 5.0 لتحسين [دعم الوعد](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).

وتعيد هذه الوظائف الآن الوعود ولا تزال تدعم الاستشهاد القديم القائم على رد المكالمات:
 * `contentTracing.getCategories()` [#16583](https://github.com/electron/electron/pull/16583)
 * `contentTracing.getCategories()` [#16583](https://github.com/electron/electron/pull/16583)
 * `contentTracing.getTraceBufferUsage()` [#16600](https://github.com/electron/electron/pull/16600)
 * `contents.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
 * `cookies.flushStore()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.get()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.remove()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.set()` [#16464](https://github.com/electron/electron/pull/16464)
 * `dialog.showCertificateTrustDialog()` [#17181](https://github.com/electron/electron/pull/17181)
 * `inAppPurchase.getProducts()` [#17355](https://github.com/electron/electron/pull/17355)
 * `inAppPurchase.procurement eProduct()`[#17355](https://github.com/electron/electron/pull/17355)
 * `netLog.stopLogging()` [#16862](https://github.com/electron/electron/pull/16862)
 * `session.clearAuthCache()` [#17259](https://github.com/electron/electron/pull/17259)
 * `session.clearCache()`  [#17185](https://github.com/electron/electron/pull/17185)
 * `session.clearHostResolverCache()` [#17229](https://github.com/electron/electron/pull/17229)
 * `session.clearStorageData()` [#17249](https://github.com/electron/electron/pull/17249)
 * `session.getBlobData()` [#17303](https://github.com/electron/electron/pull/17303)
 * `session.getCacheSize()`  [#17185](https://github.com/electron/electron/pull/17185)
 * `session.resolveProxy()` [#17222](https://github.com/electron/electron/pull/17222)
 * `session.setProxy()`  [#17222](https://github.com/electron/electron/pull/17222)
 * `webContents.hasServiceWorker()` [#16535](https://github.com/electron/electron/pull/16535)
 * `webContents.printToPDF()` [#16795](https://github.com/electron/electron/pull/16795)
 * `webContents.savePage()` [#16742](https://github.com/electron/electron/pull/16742)
 * `webFrame.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
 * `webFrame.executeJavaScriptInIsolatedWorld()` [#17312](https://github.com/electron/electron/pull/17312)
 * `webviewTag.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)

وهذه الوظائف لها الآن شكلان متزامنان ومستندان إلى الوعد:
 * `dialog.showMessageBox()`/`dialog.showMessageBoxSync()` [#17298](https://github.com/electron/electron/pull/17298)
 * `dialog.showOpenDialog()`/`dialog.showOpenDialogSync()` [#16973](https://github.com/electron/electron/pull/16973)
 * `dialog.showSaveDialog()`/`dialog.showSaveDialogSync()` [#17054](https://github.com/electron/electron/pull/17054)

وهذه الوظائف الآن ترجع الوعود:
 * `app.dock.show()` [#16904](https://github.com/electron/electron/pull/16904)

### `مساعد إلكترون (Renderer).app`، `مساعد إلكترون (GPU).app` و `مساعد إلكترون (plugin).app`

من أجل تمكين [وقت التشغيل المتصلب](https://developer.apple.com/documentation/security/hardened_runtime_entitlements?language=objc)، الذي يقيد أشياء مثل الذاكرة القابلة للتنفيذ و رمز التحميل الموقّع من قبل معرف فريق مختلف ، ويحتاج الأمر إلى منح المعاون استحقاقات توقيع رمز خاص.

وللحفاظ على نطاق هذه الاستحقاقات يشمل أنواع العمليات التي تتطلبها؛ أضاف Chromium [](https://chromium-review.googlesource.com/c/chromium/src/+/1627456) ثلاثة متغيرات جديدة لتطبيق المساعد: واحد لمقدمي الخدمات (`مساعد إلكترون (Renderer). pp`)، واحد لعملية الوحدة البريدية العالمية`مساعد إلكترون. pp`) وواحد للملحقات (`إلكترون المساعد (الإضافة).app`).

يجب أن لا يكون على الأشخاص الذين يستخدمون `توقيع إلكترون` للقيام بتصميم مشترك لتطبيق إلكترون إجراء أي تغييرات على منطق البناء الخاص بهم. إذا كنت تقوم بتصميم تطبيقك مع البرامج النصية المخصصة، فيجب عليك التأكد من أن ثلاثة تطبيقات جديدة للمساعدة مصممة بشكل صحيح.

من أجل حزمة تطبيقك بشكل صحيح مع هؤلاء المساعدين الجدد، تحتاج إلى استخدام `electron-packager@14.0.4` أو أعلى.  إذا كنت تستخدم `وحدة الإنشاء الإلكتروني` يجب عليك متابعة [هذه المشكلة](https://github.com/electron-userland/electron-builder/issues/4104) لتتبع الدعم لهؤلاء المساعدين الجدد.

## كسر تغييرات API

 * يبدأ هذا الإصدار في وضع الأساس لمطلب مستقبلي بأن تكون وحدات العقدة الأصلية المحملة في عملية العارض إما [N-API](https://nodejs.org/api/n-api.html) أو [على علم بالسياق](https://nodejs.org/api/addons.html#addons_context_aware_addons). وأسباب هذا التغيير هي الأداء الأسرع، والأمن الأقوى، والحد من عبء أعمال الصيانة. اقرأ التفاصيل الكاملة بما في ذلك الجدول الزمني المقترح في [هذه المشكلة](https://github.com/electron/electron/issues/18397). ومن المتوقع أن يكتمل هذا التغيير في إلكترون v11.

 * `net.IncomingMessage` تم [تغيير بعض الشيء](https://github.com/electron/electron/pull/17517#issue-263752903) لمطابقة [العقدة. s سلوك](https://nodejs.org/api/http.html#http_message_headers)، خاصة مع قيمة `ملف تعريف الارتباط` وكيف يتم التعامل مع رؤوس مكررة. [#17517](https://github.com/electron/electron/pull/17517).

 * `shell.showItemInFolder()` يرجع الآن إلى فراغ وهو مكالمة غير متزامنة. [#17121](https://github.com/electron/electron/pull/17121)

 * يجب على التطبيقات الآن تعيين مسار تسجيل بشكل صريح عن طريق الاتصال بالدالة الجديدة `app.setAppLogPath()` قبل استخدام `app.getPath('log')`. [#17841](https://github.com/electron/electron/pull/17841)

## نهاية الدعم ل 3.x.y

في سياسة الدعم [لدينا](https://electronjs.org/docs/tutorial/support#supported-versions)، 3.x.y وصلت إلى نهاية الحياة. يتم تشجيع المطورين والتطبيقات على الترقية إلى إصدار أحدث من إلكترون.

## برنامج ملاحظات بيتا

نحن نواصل استخدام [برنامج ملاحظات التطبيق](https://electronjs.org/blog/app-feedback-program) للاختبار. المشاريع التي تشارك في هذا البرنامج اختبار إلكترون بيتا في تطبيقاتها؛ وفي المقابل، يتم إعطاء الأولوية للأخطاء الجديدة التي يجدونها للإفراج المستقر. إذا كنت ترغب في المشاركة أو معرفة المزيد، [تحقق من مشاركة مدونتنا حول البرنامج](https://electronjs.org/blog/app-feedback-program).

## ما التالي

وفي الأجل القصير، يمكنك أن تتوقع من الفريق أن يستمر في التركيز على مواكبة تطوير المكونات الرئيسية التي تتكون منها الإلكترون، بما في ذلك Chromium، وNode، وV8. وعلى الرغم من أننا حريصون على عدم تقديم وعود بشأن تواريخ الإصدار، خطتنا هي إصدار إصدارات رئيسية جديدة من إلكترون مع إصدارات جديدة من تلك المكونات كل ثلاثة أشهر تقريبا. [جدول 7.0.0 المؤقت](https://electronjs.org/docs/tutorial/electron-timelines) يحدد التواريخ الرئيسية في دورة تطوير إلكترون 7. أيضًا، [راجع مستند الإصدار](https://electronjs.org/docs/tutorial/electron-versioning) للحصول على معلومات أكثر تفصيلاً حول الإصدار في إلكترون.

للحصول على معلومات عن التغييرات المخططة في التكسير في الإصدارات القادمة من إلكترون، [راجع التغييرات المخطط لها الخاصة بنا](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
