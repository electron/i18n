---
title: Electron 7.0.0
author:
  - الألم
  - ckerr
date: '2019-10-22'
---

تم تحرير إلكترون 7.0.0 ! وهي تشمل رفع المستوى إلى Chromium 78, V8 7.8, and Node.js 12.8.1. لقد أضفنا نافذة على إصدار الذاكرة 64 ، و طرق أسرع IPC ، و `قالب أصلي جديد` API ، وأكثر من ذلك بكثير!

---

فريق إلكترون متحمس للإعلان عن إصدار إلكترون 7.0.0! يمكنك تثبيته باستخدام npm عن طريق `npm تثبيت electron@latest` أو تنزيله من [إصدارات موقعنا](https://electronjs.org/releases/stable). يتم تعبئة الإصدار مع الترقيات والإصلاحات والميزات الجديدة. لا يمكننا الانتظار لرؤية ما تبنيه معهم! واصل القراءة للحصول على تفاصيل حول هذا الإصدار، يرجى مشاركة أي ملاحظات لديك!

## تغييرات ملحوظة
 * تكديس الترقية:

   | تكدس    | الإصدار في إلكترون 6 | الإصدار في إلكترون 7 | ما الجديد                                                                                                                                                                                                                                                                 |
   |:------- |:-------------------- |:-------------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | الكروم  | 76.0.3809.146        | **78.0.3905.1**      | [77](https://developers.google.com/web/updates/2019/09/nic77), [78](https://developers.google.com/web/updates/2019/10/nic78)                                                                                                                                              |
   | V8      | 7.6                  | **7.8**              | [7.7](https://v8.dev/blog/v8-release-77)، [7.8](https://v8.dev/blog/v8-release-78)                                                                                                                                                                                        |
   | Node.js | 12.4.0               | **12.8.1**           | [12.5](https://nodejs.org/en/blog/release/v12.5.0/), [12.6](https://nodejs.org/en/blog/release/v12.6.0/), [12.7](https://nodejs.org/en/blog/release/v12.7.0/), [12.8](https://nodejs.org/en/blog/release/v12.8.0/), [12.8.1](https://nodejs.org/en/blog/release/v12.8.1/) |
 * إضافة ويندوز على إصدار الذخيرة (64 بت). [#18591](https://github.com/electron/electron/pull/18591), [#20112](https://github.com/electron/electron/pull/20112)
 * أضيفت `ipcRenderer.invoke()` و `ipcMain.handle()` ل asynchronous request/response-style IPC. هذه ينصح بها بقوة على وحدة `البعيدة`. راجع هذه"[مشاركة المدونة "البعيد" التي تعتبر ضارة](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31)للحصول على مزيد من المعلومات. [#18449](https://github.com/electron/electron/pull/18449)
 * تم إضافة `قالب أصلي` API لقراءة التغييرات في تصميم OS ومخطط الألوان والاستجابة لها. [#19758](https://github.com/electron/electron/pull/19758), [#20486](https://github.com/electron/electron/pull/20486)
 * تم التبديل إلى مولد TypeScript جديد [](https://github.com/electron/docs-parser). التعاريف الناتجة عن ذلك أكثر دقة؛ لذلك إذا فشل بناء TypeScript الخاص بك، هذا هو السبب المحتمل. [#18103](https://github.com/electron/electron/pull/18103)

راجع [7.0.0 ملاحظات الإصدار](https://github.com/electron/electron/releases/tag/v7.0.0) للحصول على قائمة أطول من التغييرات.

## كسر تغييرات API

More information about these and future changes can be found on the [Planned Breaking Changes](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md) page.

 * إزالة التطبيقات المهملة:
     * الإصدارات القائمة على رد المكالمات من الوظائف التي تستخدم الوعود الآن. [#17907](https://github.com/electron/electron/pull/17907)
     * `Tray.setHighlightMode()` (macOS). [#18981](https://github.com/electron/electron/pull/18981)
     * `app.enableMixedSandbox()` [#17894](https://github.com/electron/electron/pull/17894)
     * `app.getApplicationMenu() ،`،
     * `app.setApplicationMenu() ،`،
     * `powerMonitor.querySystemIdleState()`،
     * `powerMonitor.querySystemIdleTime()`،
     * `webFrame.setIsolatedWorldContentSecurityPolicy()`،
     * `webFrame.setIsolatedWorldHumanReadableName()`,
     * `webFrame.setIsolatedWorldSecurityOrigin` [#18159](https://github.com/electron/electron/pull/18159)
 * `Session.clearAuthCache()` لم يعد يسمح بتصفية إدخالات ذاكرة التخزين المؤقت التي تم تنظيفها. [#17970](https://github.com/electron/electron/pull/17970)
 * الوجوه الأصلية على macOS (القوائم، مربعات الحوار، إلخ.) تطابق الآن تلقائيًا إعداد الوضع المظلم على جهاز المستخدم. [#19226](https://github.com/electron/electron/pull/19226)
 * تم تحديث وحدة `electron` لاستخدام `@electron/get`.  الحد الأدنى لإصدار العقدة المدعومة هو الآن العقدة 8. [#18413](https://github.com/electron/electron/pull/18413)
 * الملف `electron.asar` لم يعد موجودا. وينبغي تحديث أي نصوص تغليف تعتمد على وجودها. [#18577](https://github.com/electron/electron/pull/18577)

## نهاية الدعم لـ 4.x.y

إلكترون 4.x.y وصلت إلى نهاية الدعم وفقاً لسياسة الدعم للمشروع [](https://electronjs.org/docs/tutorial/support#supported-versions). يتم تشجيع المطورين والتطبيقات على الترقية إلى إصدار أحدث من إلكترون.

## برنامج ملاحظات بيتا

نحن نواصل استخدام [برنامج ملاحظات التطبيق](https://electronjs.org/blog/app-feedback-program) للاختبار. المشاريع التي تشارك في هذا البرنامج اختبار إلكترون بيتاس على تطبيقاتها؛ وفي المقابل، يتم إعطاء الأولوية للأخطاء الجديدة التي يجدونها لـ الإصدار المستقر. إذا كنت ترغب في المشاركة أو معرفة المزيد، [تحقق من مشاركة مدونتنا حول البرنامج](https://electronjs.org/blog/app-feedback-program).

## ما التالي

وفي الأجل القصير، يمكنك أن تتوقع من الفريق أن يستمر في التركيز على مواكبة تطوير المكونات الرئيسية التي تتكون منها الإلكترون، بما في ذلك Chromium، وNode، وV8. وعلى الرغم من أننا حريصون على عدم تقديم وعود بشأن تواريخ الإصدار، خطتنا هي إصدار إصدارات رئيسية جديدة من إلكترون مع إصدارات جديدة من تلك المكونات كل ثلاثة أشهر تقريبا. [الجدول الزمني المؤقت 8.0.0](https://electronjs.org/docs/tutorial/electron-timelines) يحدد التواريخ الرئيسية في دورة التطوير الالكترونية 8. أيضًا، [راجع مستند الإصدار](https://electronjs.org/docs/tutorial/electron-versioning) للحصول على معلومات أكثر تفصيلاً حول الإصدار في إلكترون.

للحصول على معلومات عن التغييرات المخططة في التكسير في الإصدارات القادمة من إلكترون، [راجع التغييرات المخطط لها الخاصة بنا](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
