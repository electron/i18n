---
title: Electron 4.0.0
author: BinaryMuse
date: '2018-12-20'
---

فريق إلكترون متحمس لإعلان أن الإصدار المستقر من إلكترون 4 متاح الآن! يمكنك تثبيته من [electronjs.org](https://electronjs.org/) أو من npm عبر `npm تثبيت electron@latest`. الإصدار معبأ بالترقيات والإصلاحات والميزات الجديدة، ولا يمكننا الانتظار لرؤية ما تبنيه معهم. اقرأ المزيد للحصول على تفاصيل حول هذا الإصدار، يرجى مشاركة أي تعليقات لديك أثناء استكشافها!

---

## ما الجديد؟

ويقوم بتوفير جزء كبير من وظيفة شركة Electron's Chromium، وNode.js، وV8، وهي المكونات الأساسية التي تتكون منها شركة Electron. وعليه، فإن أحد الأهداف الرئيسية لفريق إلكترون هو مواكبة التغييرات التي تطرأ على هذه المشاريع قدر الإمكان. توفير المطورين الذين يقومون ببناء تطبيقات إلكترون الوصول إلى ميزات الويب الجديدة وجافا سكريبت. ولهذا الغرض، يميز إلكترون 4 نسخ رئيسية لكلٍ من هذه المكونات؛ يحتوي إلكترون v4.0.0 على Chromium `69. 3497.106`العقد `10.11.0`و V8 `6-9.427.24`

وبالإضافة إلى ذلك، يتضمن إلكترون 4 تغييرات في API الخاصة بإلكترون. يمكنك العثور على ملخص للتغييرات الرئيسية في إلكترون 4 أدناه؛ للحصول على القائمة الكاملة للتغييرات، تحقق من [إلكترون v4. .0 ملاحظات الإصدار](https://github.com/electron/electron/releases/tag/v4.0.0).

### تعطيل وحدة `البعيد`

لديك الآن القدرة على تعطيل وحدة `عن بعد` لأسباب أمنية. يمكن تعطيل الوحدة النمطية لـ `نافذة المتصفح`s و `عرض الويب` علامات:

```javascript
//BrowserWindow
متصفح جديد ({
  تفضيلات الويب: {
    enableRemoteModule: false
  }
})

// webview العلامة
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

راجع [نافذة المتصفح](https://electronjs.org/docs/api/browser-window) و [`<webview>` علامة](https://electronjs.org/docs/api/webview-tag) للحصول على مزيد من المعلومات.

### تصفية `remote.require()` / `remote.getGlobal()` طلبات

هذه الميزة مفيدة إذا كنت لا تريد تعطيل الوحدة النمطية `البعيدة` بالكامل في عملية العارض أو `عرض الويب` ولكن تريد التحكم الإضافي في أي وحدات يمكن أن تكون مطلوبة عن طريق `البعيد. تعادل`.

عندما تكون الوحدة مطلوبة عن طريق `البعيد. يساوي` في عملية العرض، حدث `يتطلب من بعد` تم إثارته على [تطبيق`` وحدة](https://electronjs.org/docs/api/app). يمكنك استدعاء `event.preventDefault()` في الحدث (أول حجة ) لمنع تحميل الوحدة. [`WebContents` مثيل](https://electronjs.org/docs/api/web-contents) حيث يتم تمرير الطلب كحجة ثانية، ويتم تمرير اسم الوحدة كالحجة الثالثة. نفس الحدث ينبعث أيضا في `محتويات الويب` مثال, ولكن في هذه الحالة فإن الحجج الوحيدة هي اسم الحدث واسم الوحدة. في كلتا الحالتين، يمكنك إرجاع قيمة مخصصة عن طريق تعيين قيمة `event.returValue`.

```javascript
// تحكم 'remote.require' من جميع محتويات الويب:
app.on('Remote-require', function (case, webcontents, requestedModuleName) {
  // ...
})

// تحكم `remote.require' من مثيل محدد للمحتويات:
browserWin.webContents.on('remote-require', function (case, requestedModuleName) {
  / ...
})
```

وبطريقة مماثلة، عندما يُدعى `remote.getGlobal(name)` ، يُثار حدث `بعيد -get-global`. يعمل هذا بنفس الطريقة التي يعمل بها الحدث `عن بعد` : استدعاء `preventDefault()` لمنع العودة إلى العالم، وتعيين `الحدث. قيمة eturnValue` لإرجاع قيمة مخصصة.

```javascript
// تحكم 'remote.getGlobal' من جميع المحتويات:
app.on('remote-get-global', function (الحدث, webcontents, requrestedGlobalName) {
  // ...
})

// تحكم `remote.getGlobal` من مثال محدد على محتويات WebContents:
browserWin.webContents.on('remote-get-global', function (event, requestedGlobalName) {
  // ...
})
```

وللحصول على مزيد من المعلومات، انظر الوثائق التالية:

* [`المتطلب البعيد`](https://electronjs.org/docs/api/remote#remoterequiremodule)
* [`remote.getGlobal`](https://electronjs.org/docs/api/remote#remotegetglobalname)
* [`التطبيقات`](https://electronjs.org/docs/api/app)
* [`محتويات`](https://electronjs.org/docs/api/web-contents)

### وصول جافا سكريبت إلى لوحة المعلومات

على macOS، يمكنك الآن الاتصال بـ `تطبيق. HowAboutPanel()` لعرض لوحة المعلومات برمجيا، تماما مثل النقر فوق عنصر القائمة الذي تم إنشاؤه عبر `{role: 'about'}`. اطلع على [`مستندات عرض AboutPanel`](https://electronjs.org/docs/api/app?query=show#appshowaboutpanel-macos) للحصول على مزيد من المعلومات

### التحكم في `محتويات الويب` اختراق الخلفية

`محتويات WebContents` مثيلات لديها الآن طريقة `setBackgroundThrottling(مسموح)` لتمكين أو تعطيل اختراق المؤقت والرسوم المتحركة عندما تكون الصفحة خلفية للموقع.

```javascript
السماح للفوز = متصفح جديد (...)
win.webContents.setBackgroundThrottling(enableBackgroundThrottling)
```

راجع [ `مستندات setBackgroundThrottling`](https://electronjs.org/docs/api/web-contents#contentssetbackgroundthrottlingallowed) لمزيد من المعلومات.

## كسر تغييرات API

### لا مزيد من الدعم macOS 10.9

لم يعد Chromium يدعم macOS 10.9 (OS X Mavericks)، ونتيجة لذلك [إلكترون 4.0 وما بعده لا يدعمه أيًا من](https://github.com/electron/electron/pull/15357).

### قفل مثيل واحد

سابقاً، لجعل التطبيق الخاص بك تطبيقاً وحيداً (يضمن أن حالة واحدة فقط من التطبيق الخاص بك تعمل في أي وقت معين)، يمكنك استخدام تطبيق `. طريقة akeSingleInstance()`. بدءاً من إلكترون 4.0، يجب عليك استخدام `app.requestSingleInstanceLock()` بدلاً من ذلك. قيمة الإرجاع لهذه الطريقة تشير إلى ما إذا كان هذا المثيل من طلبك قد حصل على القفل بنجاح. إذا فشل في الحصول على القفل، فبإمكانك أن تفترض أن مثالاً آخر لطلبك يعمل بالفعل مع القفل ويخرج فوراً.

للحصول على مثال لاستخدام `requestSingleInstanceLock()` ومعلومات عن السلوك المتباين على مختلف المنصات، [انظر الوثائق الخاصة بـ `تطبيق. equestSingleInstanceLock()` والأساليب ذات الصلة](https://electronjs.org/docs/api/app#apprequestsingleinstancelock) و [حدث `ثانية`](https://electronjs.org/docs/api/app#event-second-instance).

### `win_delay_load_hook`

عند بناء الوحدات الأصلية للنوافذ، يجب أن يكون متغير `win_delay_load_hook` في الوحدة `binding.gyp` صحيحا (وهو الافتراضي). إذا كان هذا الرابط غير موجود، فستفشل الوحدة الأصلية في التحميل على Windows، مع رسالة خطأ مثل `لا يمكن العثور على الوحدة`. [راجع دليل الوحدة الأصلية](https://electronjs.org/docs/tutorial/using-native-node-modules#a-note-about-win_delay_load_hook) لمزيد من المعلومات.

## الإهانات

ومن المقرر إدخال التغييرات التالية على إلكترون 5.0، ومن ثم يتم إهمالها في إلكترون 4.0.

### تم تعطيل تكامل Node.js ل `الأصلية WindowOpen`-ed Windows

بدءاً من إلكترون 5.0، فتحت نوافذ الأطفال مع خيار `NativeWindowOpen` سيكون دائماً معطل تكامل Node.js.

### `تفضيلات الويب` القيم الافتراضية

عند إنشاء `نافذة متصفح جديدة` مع `إعدادات الويب` المحددة، `تفضيلات الويب` الافتراضية التالية تم إهمالها لصالح الإعدادات الافتراضية الجديدة المدرجة أدناه:

<div class="table table-ruled table-full-width">

<unk> الممتلكات <unk> الافتراضية المهملة<unk> جديدة افتراضية <unk>
<unk> -----------------------------------------<unk>
<unk> 'سياقة` <unk> 'خطأ` <unk> 'true' <unk>
<unk> 'nodeIntegration' <unk> 'true' <unk> 'true' <unk> 'false' <unk>
<unk> 'webviewTag' <unk> قيمة 'nodeIntegration' إذا تم تعيينها، خلاف ذلك 'true' <unk> 'false' <unk>

</div>

يرجى ملاحظة: يوجد حاليا [خطأ معروف (#9736)](https://github.com/electron/electron/issues/9736) يمنع `عرض الويب` علامة من العمل إذا كان `منعزلة سياقية` قيد التشغيل. حافظ على عين مشكلة GitHub للحصول على معلومات محدثة!

تعرف على المزيد حول سياق العزلة، ودمج العقد، و `عرض الويب` في [مستند الأمان الإلكتروني](https://electronjs.org/docs/tutorial/security).

إلكترون 4.0 سيظل يستخدم الإعدادات الافتراضية الحالية، ولكن إذا لم تجر قيمة صريحة لهم، سترى تحذيرا بالإهمال. لإعداد التطبيق الخاص بك لـ Electron 5.0، استخدم القيم الصريحة لهذه الخيارات. [راجع `مستندات نافذة المتصفح`](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions) للحصول على تفاصيل عن كل خيار من هذه الخيارات.

### `webContents.findInPage(text[, Options])`

تم تجاهل خيارات `medialCapitalAsWordStart` و `wordStart` حيث تم إزالتهما في الجزء العلوي.

## برنامج ملاحظات بيتا

[برنامج ملاحظات التطبيق](https://electronjs.org/blog/app-feedback-program) الذي أنشأناه أثناء تطوير إلكترون 3. كان ناجحاً، لذا فقد واصلنا ذلك أثناء تطوير 4.0 أيضاً. نود أن نقدم شكراً جزيلاً لك إلى أتلسياان، ديسكورد، فريق MS، OpenFin، Slack، السيمفوني، واتسباب، وأعضاء البرنامج الآخرين لمشاركتهم خلال الدورة الأربعة. دورة تجريبية. لمعرفة المزيد عن برنامج ملاحظات التطبيق والمشاركة في بيتا المستقبل، [تحقق من مشاركة مدونتنا حول البرنامج](https://electronjs.org/blog/app-feedback-program).

## ما التالي

وفي الأجل القصير، يمكنك أن تتوقع من الفريق أن يستمر في التركيز على مواكبة تطوير المكونات الرئيسية التي تتكون منها الإلكترون، بما في ذلك Chromium، وNode، وV8. وعلى الرغم من أننا حريصون على عدم تقديم وعود بشأن تواريخ الإصدار، خطتنا هي إصدار إصدارات رئيسية جديدة من إلكترون مع إصدارات جديدة من تلك المكونات كل ثلاثة أشهر تقريبا. [راجع مستند الإصدار](https://electronjs.org/docs/tutorial/electron-versioning) للحصول على معلومات أكثر تفصيلاً حول الإصدار في إلكترون.

للحصول على معلومات عن التغييرات المخططة في التكسير في الإصدارات القادمة من إلكترون، [راجع التغييرات المخطط لها الخاصة بنا](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
