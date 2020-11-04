---
title: Electron 9.0.0
author:
  - الألم
  - VerteDinde
date: '2020-05-19'
---

تم تحرير إلكترون 9.0.0 ! يتضمن ترقيات إلى Chromium `83`و V8 `8.3`و Node.js `12.14`. لقد أضفنا العديد من تكاملات API الجديدة لميزة المدقق الإملائي لدينا، ومكّن عارض PDF وأكثر من ذلك بكثير!

---

فريق إلكترون متحمس للإعلان عن إصدار إلكترون 9.0.0! يمكنك تثبيته باستخدام npm عن طريق `npm تثبيت electron@latest` أو تنزيله من [إصدارات موقعنا](https://electronjs.org/releases/stable). يتم تعبئة الإصدار مع الترقيات والإصلاحات والميزات الجديدة. لا يمكننا الانتظار لرؤية ما تبنيه معهم! واصل القراءة للحصول على تفاصيل حول هذا الإصدار، يرجى مشاركة أي ملاحظات لديك!

## تغييرات ملحوظة

### تكديس التغييرات

* Chromium `83.0.4103.64`
    * [جديد في Chrome 81](https://developers.google.com/web/updates/2020/04/nic81)
    * [تم تخطي Chrome 82](https://chromereleases.googleblog.com/2020/03/chrome-and-chrome-os-release-updates.html)
    * [جديد في كروم 83](https://developers.google.com/web/updates/2020/05/nic83)
* Node.js `12.14.1`
    * [العقدة 12.14-مشاركة المدونة](https://nodejs.org/en/blog/release/v12.14.1/)
* V8 `8.3`
    * [مشاركة المدونة V8 8.1](https://v8.dev/blog/v8-release-81)
    * [مشاركة المدونة V8 8.3](https://v8.dev/blog/v8-release-83)

### إبراز الميزات

* تحسينات متعددة لميزة المدقق الإملائي. راجع المزيد من التفاصيل في [#22128](https://github.com/electron/electron/pull/22128) و [#22368](https://github.com/electron/electron/pull/22368).
* تحسين كفاءة معالجة أحداث النافذة على لينوكس. [#23260](https://github.com/electron/electron/pull/23260).
* تمكين عارض PDF [#22131](https://github.com/electron/electron/pull/22131).

راجع [9.0.0 ملاحظات الإصدار](https://github.com/electron/electron/releases/tag/v9.0.0) للحصول على قائمة كاملة من الميزات والتغييرات الجديدة.

## كسر تغييرات API

* تحذير الإهمال عند استخدام `عن بعد` دون `تمكين وحدة التحكم البعيد: صحيح`. [#21546](https://github.com/electron/electron/pull/21546)
    * هذه هي الخطوة الأولى في خططنا لإلغاء وحدة `عن بعد` ونقلها إلى المستخدم. يمكنك قراءة ومتابعة [هذه المشكلة](https://github.com/electron/electron/issues/21408) التي تفصل أسبابنا لهذا وتتضمن الجدول الزمني المقترح للإهمال.
* تعيين `app.enableRendererProcessReuse` إلى true بشكل افتراضي. [#22336](https://github.com/electron/electron/pull/22336)
    * هذا هو العمل المستمر من أجل متطلبات مستقبلية أن تكون وحدات العقدة الأصلية المحملة في عملية العارض إما [N-API](https://nodejs.org/api/n-api.html) أو [علم السياق](https://nodejs.org/api/addons.html#addons_context_aware_addons). المعلومات الكاملة والخط الزمني المقترح مفصلان في [هذه المشكلة](https://github.com/electron/electron/issues/18397).
* إرسال كائنات غير جافا سكريبت فوق IPC يطرح الآن استثناء. [#21560](https://github.com/electron/electron/pull/21560)
    * تم استهلاك هذا السلوك في إلكترون 8.0. في إلكترون 9.0، تمت إزالة خوارزمية التسلسل القديمة، وإرسال مثل هذه الكائنات غير المتسلسلة سوف يرمي الآن خطأ "الكائن لا يمكن استنساخه".

More information about these and future changes can be found on the [Planned Breaking Changes](https://github.com/electron/electron/blob/master/docs/breaking-changes.md) page.

## تغييرات API

* `قذيفة` تغير API:
   * تم استبدال عنصر `shell.openItem` API بـ `shell.openPath API`. [اقتراح](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md)
* `الجلسة`تغير API:
   * أضاف `session.listWordsFromSpellCheckerDictionary` API إلى قائمة الكلمات المخصصة في القاموس. [#22128](https://github.com/electron/electron/pull/22128)
   * أضاف `session.removeWordFromSpellCheckerDictionary` API لإزالة الكلمات المخصصة في القاموس. [#22368](https://github.com/electron/electron/pull/22368)
   * إضافة `session.serviceWorkerContext` API للوصول إلى معلومات عامل الخدمة الأساسية والحصول على سجلات وحدة التحكم من عمال الخدمات. [#22313](https://github.com/electron/electron/pull/22313)
* `تطبيق` تغير API :
   * تمت إضافة معلمة قوة جديدة إلى `app.focus()` على macOS للسماح للتطبيقات بتركيز قسري. [#23447](https://github.com/electron/electron/pull/23447)
* `نافذة المتصفح` تغير API:
   * تم إضافة دعم للوصول إلى الخاصية إلى بعض أزواج الترميز على `نافذة المتصفح`. [#23208](https://github.com/electron/electron/pull/23208)

### APIs مهمل

واجهة برمجة التطبيقات التالية تم إهمالها أو إزالتها الآن:

* `shell.openItem` تم استهلاك API واستبداله بـ `shell.openPath API`.
* `<webview>.getWebContents`، الذي تم إهماله في Electron 8.0، تتم إزالته الآن.
* `webFrame.setLayoutZoomlevelLimits`، التي تم إهمالها في Electron 8.0، تتم إزالتها الآن.

## نهاية الدعم لـ 6.x.y

إلكترون 6.x.y وصلت إلى نهاية الدعم وفقاً لسياسة الدعم للمشروع [](https://electronjs.org/docs/tutorial/support#supported-versions). يتم تشجيع المطورين والتطبيقات على الترقية إلى إصدار أحدث من إلكترون.

## ما التالي

وفي الأجل القصير، يمكنك أن تتوقع من الفريق أن يستمر في التركيز على مواكبة تطوير المكونات الرئيسية التي تتكون منها الإلكترون، بما في ذلك Chromium، وNode، وV8. وعلى الرغم من أننا حريصون على عدم تقديم وعود بشأن تواريخ الإصدار، خطتنا هي إصدار إصدارات رئيسية جديدة من إلكترون مع إصدارات جديدة من تلك المكونات كل ثلاثة أشهر تقريبا. [الجدول الزمني المؤقت 10.0.0](https://electronjs.org/docs/tutorial/electron-timelines) يحدد التواريخ الرئيسية في دورة تطوير إلكترون 10.0 أيضًا، [راجع مستند الإصدار](https://electronjs.org/docs/tutorial/electron-versioning) للحصول على معلومات أكثر تفصيلاً حول الإصدار في إلكترون.

للحصول على معلومات عن التغييرات المخططة في التكسير في الإصدارات القادمة من إلكترون، [راجع التغييرات المخطط لها الخاصة بنا](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### تغيير الافتراضي لـ `سياق العزل` من `خاطئ` إلى `صحيح` (البدء في إلكترون 10)

بدون التجاوز السياقي، يمكن لأي شفرة تعمل في عملية العارض أن تصل بسهولة إلى إلكترون الداخلية أو إلى النص المسبق للتطبيق. يمكن أن تنفذ تلك التعليمات البرمجية بعد ذلك إجراءات مميزة تريد إلكترون الاحتفاظ بها مقيدة.

تغيير هذا الافتراضي يحسن الأمان الافتراضي لتطبيقات إلكترون، بحيث تحتاج التطبيقات إلى الاختيار المتعمد للسلوك غير الآمن. سيؤدي إلكترون إلى خفض القيمة الافتراضية الحالية لـ `سياق العزل` في إلكترون 10. ، والتغيير إلى الافتراضي الجديد (`true`) في إلكترون 12.0.

للحصول على مزيد من المعلومات حول `سياق العزلة`، كيفية تمكينها بسهولة و هي منافع أمنية يرجى الاطلاع على [وثيقة العزل السياقية الخاصة بنا](https://github.com/electron/electron/blob/master/docs/tutorial/context-isolation.md).
