---
title: Electron 2.0.0
author: ckerr
date: '2018-05-02'
---

بعد أكثر من أربعة أشهر من التطوير، ثمانية إصدارات بيتا، و في جميع أنحاء العالم اختبار من تمريرات العديد من التطبيقات، إصدار إلكترون 2. .0 الآن متاح من [electronjs.org](https://electronjs.org/).

---

## عملية الإصدار

بدءاً بـ 2.0.0، ستتبع إصدارات Electron's [الإصدار الدلالي](https://electronjs.org/blog/electron-2-semantic-boogaloo). وهذا يعني أن النسخة الرئيسية ستنخفض بشكل أكثر تواتراً وستكون عادة تحديثاً رئيسياً لكروميوم. يجب أن تكون إصدارات التصحيح أكثر استقراراً لأنها سوف تحتوي فقط على إصلاحات الشوائب ذات الأولوية العالية.

ويمثل إلكترون 2.0.0 أيضا تحسينا لكيفية استقرار إلكترون قبل إطلاقه الرئيسي. اشتملت العديد من تطبيقات إلكترون الواسعة النطاق على 2.0.0 بيتا في الدفعات المرحلية، مما يوفر أفضل حلقة ردود الفعل التي حصلت عليها على الإطلاق لسلسلة بيتا.

## التغييرات / الميزات الجديدة

 * نوافذ رئيسية لعدة أجزاء هامة من سلسلة أدوات إلكترن، بما في ذلك Chrome 61, Node 8.9.3, V8 6.1.534.41, GTK+ 3 على لينوكس، المدقق الإملائي المحدث، والسنجريل.
 * [المشتريات في التطبيق](https://electronjs.org/blog/in-app-purchases) مدعومة الآن على ماكوس. [#11292](https://github.com/electron/electron/pull/11292)
 * API جديد لتحميل الملفات. [#11565](https://github.com/electron/electron/pull/11565)
 * API جديد لتمكين/تعطيل النافذة. [#11832](https://github.com/electron/electron/pull/11832)
 * New API app.setLocale(). [#11469](https://github.com/electron/electron/pull/11469)
 * دعم جديد لتسجيل رسائل IPC. [#11880](https://github.com/electron/electron/pull/11880)
 * أحداث القائمة الجديدة. [#11754](https://github.com/electron/electron/pull/11754)
 * إضافة حدث `إيقاف تشغيل` إلى PowMonitor. [#11417](https://github.com/electron/electron/pull/11417)
 * إضافة خيار `صلة القرابة` لجمع العديد من متصفح ويندوز في عملية واحدة. [#11501](https://github.com/electron/electron/pull/11501)
 * إضافة القدرة على حفظ الحوار لقائمة الملحقات المتاحة. [#11873](https://github.com/electron/electron/pull/11873)
 * دعم إجراءات الإخطار الإضافية [#11647](https://github.com/electron/electron/pull/11647)
 * القدرة على تعيين عنوان زر إغلاق إشعار macOS. [#11654](https://github.com/electron/electron/pull/11654)
 * إضافة مشروط للقائمة.popup(النافذة، المكالمة)
 * تحسينات الذاكرة في عناصر شريط اللمس. [#12527](https://github.com/electron/electron/pull/12527)
 * قائمة محسنة للتوصيات الأمنية.
 * إضافة علامات مرجعية ذات نطاق نطاق تطبيق الأمان. [#11711](https://github.com/electron/electron/pull/11711)
 * إضافة القدرة على تعيين حجج تعسفية في عملية العرض. [#11850](https://github.com/electron/electron/pull/11850)
 * إضافة عرض ملحق لمنتقي التنسيق. [#11873](https://github.com/electron/electron/pull/11873)
 * تم تثبيت تفويض حالة السباق بالشبكة. [#12053](https://github.com/electron/electron/pull/12053)
 * إسقاط الدعم لـ `mips64el` القوس على لينوكس. يتطلب إلكترون سلسلة أدوات C++14، التي كانت غير متوفرة لذلك القوس وقت الإصدار. ونأمل أن نعيد إضافة الدعم في المستقبل.

## كسر تغييرات API

 * تمت إزالة [APIs المهملة](https://github.com/electron/electron/blob/v2.0.0-beta.8/docs/tutorial/planned-breaking-changes.md)، بما في ذلك:
   * غيّر توقيع `menu.popup`. [#11968](https://github.com/electron/electron/pull/11968)
   * تمت إزالة `crashReporter.setExtraParameter <code> المهملة` [#11972](https://github.com/electron/electron/pull/11972)
   * إزالة `webContents.setZoomLevelLimits` و `webFrame.setZoomLevelLimits`. [#11974](https://github.com/electron/electron/pull/11974)
   * إزالة طرق `الحافظة` المهملة. [#11973](https://github.com/electron/electron/pull/11973)
   * تمت إزالة الدعم للمعلمات المنطقية ل `tray.setHighlightMode`. [#11981](https://github.com/electron/electron/pull/11981)

## إصلاح الأخطاء

 * تم التغيير للتأكد من أن `webContents.isOffscreen()` متاح دائما. [#12531](https://github.com/electron/electron/pull/12531)
 * أصلحت `BrowserWindow.getFocusedWindow()` عندما يتم إلغاء DevTools وتركيزها. [#12554](https://github.com/electron/electron/pull/12554)
 * التحميل المسبق الثابت لم يتم تحميله في عرض مربع إذا كان مسار التحميل المسبق يحتوي على أحرف خاصة. [#12643](https://github.com/electron/electron/pull/12643)
 * قم بتصحيح الافتراضي لـ allowRunningInsecure ureContent كما في المستندات. [#12629](https://github.com/electron/electron/pull/12629)
 * تم تثبيت الشفافية على الصورة الأصلية. [#12683](https://github.com/electron/electron/pull/12683)
 * إصلاح المشكلة مع `Menu.buildFromtemplplate`. [#12703](https://github.com/electron/electron/pull/12703)
 * خيارات menu.popup المؤكدة هي عناصر. [#12330](https://github.com/electron/electron/pull/12330)
 * إزالة حالة عرقية بين إنشاء عملية جديدة وإطلاق السياق. [#12361](https://github.com/electron/electron/pull/12361)
 * تحديث المناطق القابلة للسحب عند تغيير عرض المتصفح. [#12370](https://github.com/electron/electron/pull/12370)
 * تثبيت تبديل مفتاح تبديل القائمة عند التركيز. [#12235](https://github.com/electron/electron/pull/12235)
 * تم إصلاح التحذيرات غير الصحيحة في عرض الويب. [#12236](https://github.com/electron/electron/pull/12236)
 * إرث ثابت لخيار 'عرض' من النوافذ الأصلية. [#122444](https://github.com/electron/electron/pull/122444)
 * تأكد من أن `getLastCrashReport()` هو في الواقع آخر تقرير تحطم. [#12255](https://github.com/electron/electron/pull/12255)
 * يتطلب إصلاح على مسار مشاركة الشبكة. [#12287](https://github.com/electron/electron/pull/12287)
 * قائمة إصلاح السياق انقر فوق رد المكالمة. [#12170](https://github.com/electron/electron/pull/12170)
 * تم إصلاح موضع القائمة المنبثقة. [#12181](https://github.com/electron/electron/pull/12181)
 * تحسين تنظيف حلقة libuv [#11465](https://github.com/electron/electron/pull/11465)
 * أصلح `HexColorDWORDToRGBA` لألوان شفافة. [#11557](https://github.com/electron/electron/pull/11557)
 * ثبت مرجع مؤشر فارغ مع getWebPreferences api. [#12245](https://github.com/electron/electron/pull/12245)
 * تم تثبيت مرجع دوري في مندوب القائمة. [#11967](https://github.com/electron/electron/pull/11967)
 * تصفية بروتوكول ثابت لـ net.reques. [#11657](https://github.com/electron/electron/pull/11657)
 * ويضع WebFrame.setVisualZoomlevelLimits الآن قيود مقياس وكيل المستخدم [#12510](https://github.com/electron/electron/pull/12510)
 * تعيين الإعدادات الافتراضية المناسبة لخيارات عرض الويب. [#12292](https://github.com/electron/electron/pull/12292)
 * دعم نابض بالحياة. [#12157](https://github.com/electron/electron/pull/12157) [#12171](https://github.com/electron/electron/pull/12171) [#11886](https://github.com/electron/electron/pull/11886)
 * مشكلة توقيت ثابتة في تثبيت singleton.
 * إصلاح ذاكرة التخزين المؤقت للإنتاج المكسورة في NotifierSupportsActions()
 * صنع أدوار عنصر القائمة متوافقة مع قلعة الجمال. [#11532](https://github.com/electron/electron/pull/11532)
 * تحسين تحديثات شريط اللمس. [#11812](https://github.com/electron/electron/pull/11812)، [#11761](https://github.com/electron/electron/pull/11761).
 * إزالة فاصلة القائمة الإضافية. [#11827](https://github.com/electron/electron/pull/11827)
 * إصلاح مشكلة اختيار البلوتوث. يغلق [#11399](https://github.com/electron/electron/pull/11399).
 * تم إصلاح تسمية عنصر Macos بكامل شاشة التبديل للقائمة. [#11633](https://github.com/electron/electron/pull/11633)
 * إخفاء تلميح الأدوات المحسن عند تعطيل النافذة. [#11644](https://github.com/electron/electron/pull/11644)
 * طريقة عرض الويب المهملة. [#11798](https://github.com/electron/electron/pull/11798)
 * إصلاح إغلاق نافذة مفتوحة من عرض المتصفح. [#11799](https://github.com/electron/electron/pull/11799)
 * إصلاح مشكلة اختيار البلوتوث. [#11492](https://github.com/electron/electron/pull/11492)
 * تم التحديث لاستخدام جدولة المهام لتطبيق API app.getFileIcon. [#11595](https://github.com/electron/electron/pull/11595)
 * تم تغييرها إلى حدث `وحدة التحكم` حتى عند تقديم عرض خارج الشاشة. [#11921](https://github.com/electron/electron/pull/11921)
 * تثبيت التحميل من البروتوكولات المخصصة باستخدام `WebContents.downloadURL`. [#11804](https://github.com/electron/electron/pull/11804)
 * إصلاح النوافذ الشفافة التي تفقد الشفافية عندما تفصل أدوات ديف. [#11956](https://github.com/electron/electron/pull/11956)
 * تثبيت تطبيقات إلكترون لإلغاء إعادة التشغيل أو إيقاف التشغيل. [#11625](https://github.com/electron/electron/pull/11625)

### نظام macOS
 * تثبيت تسرب الحدث عند إعادة استخدام عنصر شريط اللمس. [#12624](https://github.com/electron/electron/pull/12624)
 * اصلاحيه شريط في الظلام. [#12398](https://github.com/electron/electron/pull/12398)
 * اصلحت العملية الرئيسية للحظر على مربع حوار async [#12407](https://github.com/electron/electron/pull/12407)
 * اصلح `اعداد العنوان` انهيار. [#12356](https://github.com/electron/electron/pull/12356)
 * إصلاح التعطل عند إعداد قائمة الإرشادات. [#12087](https://github.com/electron/electron/pull/12087)

### Linux
 * إشعارات سطح المكتب لـ Linux أفضل. [#12229](https://github.com/electron/electron/pull/12229) [#12216](https://github.com/electron/electron/pull/12216) [#11965](https://github.com/electron/electron/pull/11965) [#11980](https://github.com/electron/electron/pull/11980)
 * دعم موضوع GTK+ الأفضل للقوائم. [#12331](https://github.com/electron/electron/pull/12331)
 * الخروج بكرم على لينوكس. [#12139](https://github.com/electron/electron/pull/12139)
 * استخدم اسم التطبيق كتلميح افتراضي لأيقونة الصورة. [#12393](https://github.com/electron/electron/pull/12393)

### Windows
 * إضافة دعم Visual Studio 2017. [#11656](https://github.com/electron/electron/pull/11656)
 * تثبيت انتقال الاستثناء إلى معالج تحطم النظام. [#12259](https://github.com/electron/electron/pull/12259)
 * تلميح إخفاء الأدوات من النافذة المصغرة. [#11644](https://github.com/electron/electron/pull/11644)
 * أصلحت `جهاز كمبيوتر كابتر` لالتقاط الشاشة الصحيحة. [#11664](https://github.com/electron/electron/pull/11664)
 * أصلح `تعطيل تسريع المستودع` مع الشفافية. [#11704](https://github.com/electron/electron/pull/11704)

# ما التالي

فريق إلكترون يعمل بجد لدعم إصدارات أحدث من Chromium وNode، وv8. توقع 3.0.0-بيتا.1 قريباً!
