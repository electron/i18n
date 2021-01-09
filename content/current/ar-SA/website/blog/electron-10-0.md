---
title: Electron 10.0.0
author:
  - VerteDinde
  - الألم
date: '2020-08-25'
---

تم تحرير إلكترون 10.0.0 ! يتضمن ترقيات إلى Chromium `85`، V8 `8.5`، و Node.js `12.16`. لقد أضفنا العديد من تكاملات واجهة برمجة التطبيقات الجديدة والتحسينات. اقرأ أدناه لمزيد من التفاصيل!

---

فريق إلكترون متحمس للإعلان عن إصدار إلكترون 10.0.0! يمكنك تثبيته باستخدام npm عن طريق `npm تثبيت electron@latest` أو تنزيله من [إصدارات موقعنا](https://electronjs.org/releases/stable). يتم تعبئة الإصدار مع الترقيات والإصلاحات والميزات الجديدة.

في إصدار إلكترون 10، قمنا أيضا بتغيير ملاحظات الإصدار الخاصة بنا. لجعل من الأسهل معرفة ما هو الجديد في إلكترون 10 وما الذي قد يكون تغير بين إلكترون 10 والإصدارات السابقة، ونحن الآن ندرج أيضا التغييرات التي أدخلت على إلكترون 10، ولكنها مدعومة بإصدارات سابقة. نأمل أن يجعل هذا من الأسهل على التطبيقات العثور على ميزات جديدة وإصلاح الأخطاء عند ترقية إلكترون.

لا يمكننا الانتظار لرؤية ما تبنيه معهم! واصل القراءة للحصول على تفاصيل حول هذا الإصدار، يرجى مشاركة أي ملاحظات لديك!

## تغييرات ملحوظة

### تكديس التغييرات

* كروميوم `85.0.4183.84`
    * [جديد في كروم 84](https://developers.google.com/web/updates/2020/07/nic84)
    * [جديد في Chrome 85](https://chromereleases.googleblog.com/2020/08/stable-channel-update-for-desktop_25.html)
* Node.js `12.16.3`
    * [العقدة 12.16-3 مشاركة المدونة](https://nodejs.org/en/blog/release/v12.16.3/)
* V8 `8.5`
    * [مشاركة المدونة V8 8.4](https://v8.dev/blog/v8-release-84)
    * [مشاركة المدونة V8 8.5](https://v8.dev/blog/v8-release-85)

### إبراز الميزات

* تم إضافة `contents.getBackgroundThrottling() طريقة` و `contents.backgroundThrottling` خواص. [#21036]
* عرض وحدة `سطح المكتب` في العملية الرئيسية. [#23548](https://github.com/electron/electron/pull/23548)
* يمكن الآن التحقق مما إذا كانت جلسة `معينة` مستمرة عن طريق الاتصال بـ `ses.isPersistent()` API. [#22622](https://github.com/electron/electron/pull/22622)
* حل مشاكل الشبكة التي منعت مكالمات RTC من الاتصال بسبب تغييرات عنوان IP الشبكة و ICE. (العدد 1113227 من الكروميوم). [#24998](https://github.com/electron/electron/pull/24998)

راجع [10.0.0 ملاحظات الإصدار](https://github.com/electron/electron/releases/tag/v10.0.0) للحصول على قائمة كاملة من الميزات والتغييرات الجديدة.

## كسر تغييرات API

* غيّر القيمة الافتراضية لـ `enableRemoteModule` إلى `خاطئ`. [#22091](https://github.com/electron/electron/pull/22091)
    * هذا جزء من خططنا لإلغاء وحدة `عن بعد` ونقلها إلى أرض المستخدم. يمكنك قراءة ومتابعة [هذه المشكلة](https://github.com/electron/electron/issues/21408) التي تفصل أسبابنا لهذا وتتضمن الجدول الزمني المقترح للإهمال.
* غيّر القيمة الافتراضية لـ `app.allowRendererProcessreuse` إلى `true`. [#22336](https://github.com/electron/electron/pull/22336) (أيضا في [إلكترون 9](https://github.com/electron/electron/pull/22401))
   * وهذا سيحول دون تحميل وحدات محلية غير واعية بالسياق في عمليات العرض.
   * يمكنك قراءة ومتابعة [هذه المشكلة](https://github.com/electron/electron/issues/18397) التي تفصل أسبابنا لهذا وتتضمن الجدول الزمني المقترح للإهمال.
* أصلحت موضع أزرار النافذة على macOS عندما يتم تعيين لغة OS (مثل العربية أو العبرية). قد تضطر تطبيقات النافذة عديمة الإطار إلى حساب هذا التغيير أثناء تصميم نوافذها. [#22016](https://github.com/electron/electron/pull/22016)

More information about these and future changes can be found on the [Planned Breaking Changes](https://github.com/electron/electron/blob/master/docs/breaking-changes.md) page.

## تغييرات API

* جلسة: يمكن الآن التحقق مما إذا كانت جلسة `معينة` مستمرة من خلال الاتصال بـ `ses.isPersistent()` API. [#22622](https://github.com/electron/electron/pull/22622)
* المحتويات: تم إضافة `المحتويات.getBackgroundThrottling()` و `المحتويات.backgroundThrottling` الخاصية. [#21036](https://github.com/electron/electron/pull/21036)

### APIs مهمل

واجهة برمجة التطبيقات التالية تم إهمالها أو إزالتها الآن:

* إزالة خاصية `مهملة` لـ `تسجيل الدخول الى`. بالإضافة إلى ذلك، `netLog.stopLogging` لم يعد يعيد المسار إلى السجل المسجل. [#22732](https://github.com/electron/electron/pull/22732)
* تحميل الأعطال الغير مضغوط في `مراسل الأعطال`. [#23598](https://github.com/electron/electron/pull/23598)

## نهاية الدعم لـ 7.x.y

إلكترون 7.x.y وصلت إلى نهاية الدعم وفقاً لسياسة دعم المشروع [](https://electronjs.org/docs/tutorial/support#supported-versions). يتم تشجيع المطورين والتطبيقات على الترقية إلى إصدار أحدث من إلكترون.

## ما التالي

وفي الأجل القصير، يمكنك أن تتوقع من الفريق أن يستمر في التركيز على مواكبة تطوير المكونات الرئيسية التي تتكون منها الإلكترون، بما في ذلك Chromium، وNode، وV8. وعلى الرغم من أننا حريصون على عدم تقديم وعود بشأن تواريخ الإصدار، خطتنا هي إصدار إصدارات رئيسية جديدة من إلكترون مع إصدارات جديدة من تلك المكونات كل ثلاثة أشهر تقريبا. [الجدول المؤقت 11.0.0](https://electronjs.org/docs/tutorial/electron-timelines) يحدد التواريخ الرئيسية في دورة تطوير إلكترون 11.0. أيضًا، [راجع مستند الإصدار](https://electronjs.org/docs/tutorial/electron-versioning) للحصول على معلومات أكثر تفصيلاً حول الإصدار في إلكترون.

للحصول على معلومات عن التغييرات المخططة في التكسير في الإصدارات القادمة من إلكترون، [راجع التغييرات المخطط لها الخاصة بنا](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### مواصلة العمل لإلغاء `الوحدة النمطية عن بعد` (في إلكترون 11)
بدأنا العمل لإزالة الوحدة النمطية البعيدة في [إلكترون 9](https://www.electronjs.org/blog/electron-9-0) ونواصل التخطيط لإزالة `الوحدة النمطية البعيدة`. في إلكترون 11، نخطط لمواصلة العمل من أجل تنفيذ [WeakRef](https://v8.dev/features/weak-references) كما فعلنا في إلكترون 10. الرجاء قراءة ومتابعة [هذه المشكلة](https://github.com/electron/electron/issues/21408) للخطط الكاملة والتفاصيل للإهمال.

### Final Step for Requiring Native Node Modules to be Context Aware or N-API (in Electron 12)
_Edit: Originally, this blog post stated that we would disable renderer process reuse in Electron 11. Disabling renderer process reuse has now been pushed to Electron 12._

From Electron 6 onwards, we've been laying the groundwork to require [native Node modules](https://nodejs.org/api/addons.html) loaded in the renderer process to be either [N-API](https://nodejs.org/api/n-api.html) or [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Enforcing this change allows for stronger security, faster performance, and reduced maintenance workload. The final step of this plan is to remove the ability to disable render process reuse in Electron 12. Read [this issue](https://github.com/electron/electron/issues/18397) for full details including the proposed timeline.
