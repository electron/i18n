---
title: Electron 3.0.0
author: codebytere
date: '2018-09-18'
---

فريق إلكترون متحمس لإعلان أن أول إصدار مستقر من إلكترون 3 هو الآن متاح من [إلكترونيات. rg](https://electronjs.org/) وعبر `npm تثبيت electron@latest`! إنها محشوة بالترقية والإصلاحات والميزات الجديدة، ولا يمكننا الانتظار لرؤية ما تبنيه معهم. فيما يلي تفاصيل حول هذا الإصدار، ونحن نرحب بملاحظاتك أثناء استكشافك.

---

## عملية الإصدار

كما قمنا بتطوير `v3.0.`لقد سعينا إلى تحديد معايير أكثر تجريبية لإصدار مستقر عن طريق إضفاء الطابع الرسمي على التقدم المحرز في التغذية المرتدة من أجل الإصدارات التدريجية بيتا. `v3.0.` ما كان ليتسنى لولا [شركائنا في برنامج تعليقات التطبيق](https://github.com/electron/electron/blob/3-0-x/docs/tutorial/app-feedback-program.md) قام بالاختبار المبكر والتغذية المرتدة خلال دورة بيتا. شكرا لأفرقة Atlassian، الذرة، Microsoft Oculus، OpenFin، Slack، Symphony، شفرة VS وغيرها من أعضاء البرنامج على عملهم. إذا كنت ترغب في المشاركة في بيتا المستقبل، يرجى مراسلتنا على [info@electronjs.org](mailto:info@electronjs.org).

## التغييرات / الميزات الجديدة

نتوءات رئيسية لعدة أجزاء مهمة من سلسلة أدوات إلكترون بما في ذلك Chrome `v66.0.3359.181`و Node `v10.2.0`و V8 `v6.6.346.23`

* [[#12656](https://github.com/electron/electron/pull/12656)] الميزة: `app.isPackaged`
* [[#12652](https://github.com/electron/electron/pull/12652)] الميزة: `app.whenReady()`
* [[#13183](https://github.com/electron/electron/pull/13183)] الميزة: `process.getHeapStatistics()`
* ميزة [[#12485](https://github.com/electron/electron/pull/12485)] : `win.moveTop()` لنقل ترتيب النافذة z-إلى الأعلى
* [[#13110](https://github.com/electron/electron/pull/13110)] الميزة: Textfield والزر APIs
* ميزة [[#13068](https://github.com/electron/electron/pull/13068)] : واجهة برمجة التطبيقات للتسجيل الديناميكي للتحكم في التسجيل
* ميزة [[#13539](https://github.com/electron/electron/pull/13539)] : تمكين `عرض الويب` في صندوق الرمل
* [[#14118](https://github.com/electron/electron/pull/14118)] الميزة: `fs.readSync` يعمل الآن مع ملفات ضخمة
* ميزة[#14031](https://github.com/electron/electron/pull/14031)] : عقدة `fs` غلاف لجعل `fs.realpathSync.native` و `fs.realpath.native` متاحة

## كسر تغييرات API

* [[#12362](https://github.com/electron/electron/pull/12362)] ميزة: تحديثات قائمة التحكم في طلب عنصر العنصر
* [[#13050](https://github.com/electron/electron/pull/13050)] إعادة مصنع : إزالة واجهة برمجة التطبيقات الموثقة المهملة.
  * راجع [مستندات](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#breaking-api-changes-30) لمزيد من التفاصيل
* [[#12477](https://github.com/electron/electron/pull/12477)] إعادة المصنع: تم إزالة `Dd-get-response-detail` و `edd-get-redirect-reques` الأحداث
* ميزة [[#12655](https://github.com/electron/electron/pull/12655)] : الافتراضي لتعطيل التنقل عند السحب / الإسقاط
* [[#12993](https://github.com/electron/electron/pull/12993)] الميزة: العقدة `v4.x` أو أكثر مطلوب استخدام وحدة `إلكترون` npm
* [[#12008](https://github.com/electron/electron/pull/12008) [#12140](https://github.com/electron/electron/pull/12140) [#12503](https://github.com/electron/electron/pull/12503) [#12514](https://github.com/electron/electron/pull/12514) [#12584](https://github.com/electron/electron/pull/12584) [#12596](https://github.com/electron/electron/pull/12596) [#12637](https://github.com/electron/electron/pull/12637) [#12660](https://github.com/electron/electron/pull/12660) [#12696](https://github.com/electron/electron/pull/12696) [#12716](https://github.com/electron/electron/pull/12716) [#12750](https://github.com/electron/electron/pull/12750) [#12787](https://github.com/electron/electron/pull/12787) [#12858](https://github.com/electron/electron/pull/12858)] refactor: `NativeWindow`
* [[#11968](https://github.com/electron/electron/pull/11968)] إعادة المصنع: `menu.popup()`
* ميزة [[#8953](https://github.com/electron/electron/pull/8953)] : لم يعد يستخدم JSON لإرسال نتيجة `ipcRenderer.sendSync`
* ميزة [[#13039](https://github.com/electron/electron/pull/13039)] : الافتراضي لتجاهل حجج سطر الأوامر بعد عنوان URL
* [[#12004](https://github.com/electron/electron/pull/12004)] إعادة المفاصل: إعادة تسمية `api:Window` إلى `api::BrowserWindow`
* ميزة [[#12679](https://github.com/electron/electron/pull/12679)] : التكبير البصري الآن مغلق بشكل افتراضي
* [[#12408](https://github.com/electron/electron/pull/12408)] إعادة المفاصل: إعادة تسمية التطبيق - الأمر `media-play_stopus` إلى `media-play-stopus`

### نظام macOS

* ميزة [[#12093](https://github.com/electron/electron/pull/12093)] : دعم إشعارات مساحة العمل
* [[#12496](https://github.com/electron/electron/pull/12496)] الميزة: `tray.setIgnoreDoubleClickEvents(تجاهل)` لتجاهل أحداث الضغط المزدوج فوق الصور.
* [[#12281](https://github.com/electron/electron/pull/12281)] الميزة: وظيفة الماوس للأمام على macOS
* ميزة [[#12714](https://github.com/electron/electron/pull/12714)] : قفل الشاشة / فتح الأحداث

### Windows

* [[#12879](https://github.com/electron/electron/pull/12879)] الميزة: إضافة DIP إلى/من تحويلات إحداثيات الشاشة

**Nota Bene:** التبديل إلى الإصدار القديم من إلكترون بعد تشغيل هذا الإصدار سيتطلب منك مسح دليل بيانات المستخدم الخاص بك لتجنب تعطل الإصدارات القديمة. يمكنك الحصول على دليل بيانات المستخدم عن طريق تشغيل `console.log(app.getPath("userData"))` أو انظر [docs](https://electronjs.org/docs/api/app#appgetpathname) لمزيد من التفاصيل.

## إصلاح الأخطاء

* [[#13397](https://github.com/electron/electron/pull/13397)] إصلاح: مشكلة مع `fs.statSyncNoException` رمي الاستثناءات
* [[#13476](https://github.com/electron/electron/pull/13476)، [#13452](https://github.com/electron/electron/pull/13452)] إصلاح : تحطم الموقع عند التحميل باستخدام Jquery
* [[#14092](https://github.com/electron/electron/pull/14092)] إصلاح: تحطم في `صافي::ClientSocketHandle` مدمر
* [[#14453](https://github.com/electron/electron/pull/14453)] إصلاح : تنبيه تغيير التركيز بعيدا بدلا من أن لا يتم على علامة تالية

### MacOS

* [[#13220](https://github.com/electron/electron/pull/13220)] إصلاح : مشكلة تسمح بتحديد الحزم في `<input file="type">` فتح مربع حوار الملفات
* [[#12404](https://github.com/electron/electron/pull/12404)] إصلاح: مشكلة في منع العملية الرئيسية عند استخدام مربع حوار async
* [[#12043](https://github.com/electron/electron/pull/12043)] إصلاح: قائمة السياق انقر فوق رد المكالمة
* [[#12527](https://github.com/electron/electron/pull/12527)] إصلاح: تسرب الحدث عند إعادة استخدام عنصر شريط اللمس
* [[#12352](https://github.com/electron/electron/pull/12352)] إصلاح : تحطم عنوان العلامة
* [[#12327](https://github.com/electron/electron/pull/12327)] إصلاح: المناطق غير القابلة للسحب
* [[#12809](https://github.com/electron/electron/pull/12809)] إصلاح : لمنع تحديث القائمة أثناء فتحها
* [[#13162](https://github.com/electron/electron/pull/13162)] إصلاح : حدود الأيقونة العلوية لا تسمح بالقيم السالبة
* [[#13085](https://github.com/electron/electron/pull/13085)] إصلاح : العنوان غير معكوس عند إبرازه
* [[#12196](https://github.com/electron/electron/pull/12196)] إصلاح : بناء ماك عندما `enable_run_as_node==false`
* [[#12157](https://github.com/electron/electron/pull/12157)] إصلاح: مشاكل إضافية على النوافذ التي لا إطار لها مع حيوية
* [[#13326](https://github.com/electron/electron/pull/13326)] إصلاح : لتعيين بروتوكول الماك إلى لا شيء بعد استدعاء `app.removeAsDefaultprotocolClient`
* [[#13530](https://github.com/electron/electron/pull/13530)] إصلاح: الاستخدام غير الصحيح لواجهة برمجة التطبيقات الخاصة في بناء MAS
* [[#13517](https://github.com/electron/electron/pull/13517)] إصلاح `tray.setContextMenu` تحطم
* [[#14205](https://github.com/electron/electron/pull/14205)] إصلاح: الضغط على الهروب على مربع الحوار الآن يغلق حتى لو تم تعيين `معرف افتراضي`

### Linux

* [[#12507](https://github.com/electron/electron/pull/12507)] إصلاح: `BrowserWindow.focus()` للنوافذ خارج الشاشة

## ملاحظات أخرى

* عارض PDF لا يعمل حاليا ولكن يجري العمل عليه وسوف يعمل مرة أخرى قريبا
* `Textfield` و `زر` APIs تجريبي وبالتالي فهي متوقفة بشكل افتراضي
  * يمكن تمكينها مع علم البناء `enable_view_api`

# ما التالي

ويواصل فريق إلكترون العمل على تحديد عملياتنا من أجل رفع مستواها بشكل أسرع وسلس بينما نسعى في نهاية المطاف إلى الحفاظ على التكافؤ مع موازين التنمية في كروموم. العقدة و V8.
