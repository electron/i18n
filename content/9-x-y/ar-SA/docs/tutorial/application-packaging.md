# تغليف التطبيق

للتخفيف من </a>المشكلات[ المتعلقة بأسماء المسارات الطويلة على نظام Windows، `ستحتاج` إلى دفعة صغيرة من السرعة حتى تتمكن من إخفاء شفرة المصدر من الفحص الخاطف، يمكنك أيضا اختيار حزم تطبيقك في أرشيف ](https://github.com/joyent/node/issues/6960)asar

 مع القليل من التغييرات على شفرة المصدر الخاصة بك.</p> 

معظم المستخدمين سيحصلون على هذه الميزة مجانا ، نظرا لأنها مدعومة من الصندوق بواسطة [`electron-packager`][electron-packager], [`electron-forge`][electron-forge], و[`electron-builder`][electron-builder]. أما إذا كنت لا تستخدم أيًا من هذه الأدوات ، فقط تابع القراءة.



## إنشاء `asar` أرشيف

An [asar][asar] archive is a simple tar-like format that concatenates files into a single file. في مقدور Electron قراءة الملفات التعسفية منه دون تفريغ الملف بأكمله.

خطوات لحزم التطبيق الخاص بك في أرشيف `asar`:



### 1. قم بتثبيت الأداة asar



```sh
$ npm install -g asar
```




### 2. حزمة مع `باقة عز`



```sh
$ asar pack your-app app.asar
```




## إستعمل ارشيفات `asar`

في Electron هناك مجموعتان من APIs: Node APIs مقدمة من Node.js و Web APIs مقدمة من Chromium. يدعم كل من APIs قراءة الملفات من أرشيف `asar`.



### Node واجهة التطبيق البرمجية (API)

مع بعض التصحيحات الخاصة في إلكترون، تطبيقات العقدة مثل `fs. ملف eadFile` و `مطلوب` يتعامل مع `asar` كأدلة افتراضية، والملفات الموجودة فيه كملفات عادية في نظام الملفات.

على سبيل المثال، افترض أن لدينا أرشيف `مثال.asar` تحت `/path/to`:



```sh
$ asar list /path/to/example.asar
/app.js
/file.txt
/dir/module.js
/static/index.html
/static/main.css
/static/jquery.min.js
```


قراءة الملف في أرشيف `asar`:



```javascript
const fs = require('fs')
fs.readFileSync('/path/to/example.asar/file.txt')
```


قائمة جميع الملفات تحت جذر الأرشيف:



```javascript
const fs = require('fs')
fs.readdirSync('/path/to/example.asar')
```


استخدام وحدة من الأرشيف:



```javascript
require('/path/to/example.asar/dir/module.js')
```


يمكنك أيضا عرض صفحة ويب في أرشيف `asar` مع `BrowserWindow`:



```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.loadURL('file:///path/to/example.asar/static/index.html')
```




### واجهة تطبيقات الرمجية للويب (API)

في صفحة ويب، يمكن طلب الملفات الموجودة في أرشيف مع ملف `:` بروتوكول. مثل API ، يتم التعامل مع أرشيف `asar` كدليل.

على سبيل المثال، للحصول على ملف مع `$.get`:



```html
<script>
let $ = require('./jquery.min.js')
$.get('file:///path/to/example.asar/file.txt', (data) => {
  console.log(data)
})
</script>
```




### التعامل مع `asar` الأرشيف كملف عادي

لبعض الحالات مثل التحقق من ملخص اختبار أرشيف `asar` ، نحن بحاجة إلى قراءة محتوى أرشيف `asar` كملف. لهذا الغرض، يمكنك استخدام الوحدة النمطية المدمجة `الأصلية fs` التي توفر `fs الأصلي` APIs بدون `asar` support:



```javascript
const originalFs = require('original-fs')
originalFs.readFileSync('/path/to/example.asar')
```


يمكنك أيضًا تعيين عملية `oAsar` إلى `true` لتعطيل الدعم لـ `asar` في وحدة `fs`:



```javascript
const fs = require('fs')
process.noAsar = true
fs.readFileSync('/path/to/example.asar')
```




## محدودية Node واجهة التطبيق البرمجية (API)

على الرغم من أننا حاولنا جاهدين أن نجعل أرشيف `asar` في API يعمل مثل الدلائل قدر الإمكان. لا تزال هناك قيود بسبب مستوى المستوى المنخفض لواجهة برمجة التطبيقات الخاصة بالعقدة.



### أرشيف للقراءة فقط

لا يمكن تعديل الأرشيف بحيث أن جميع تطبيقات العقدة التي يمكنها تعديل الملفات لن تعمل مع `asar` أرشيف.



### دليل العمل لا يمكن تعيينه إلى الدلائل في الأرشيف

على الرغم من أن أرشيف `asar` يعامل كدليل، لا يوجد أدلة فعلية في نظام الملفات، حتى لا يمكنك أبدا تعيين دليل العمل إلى أدلة في `asar` أرشيف. نقلهم كخيار `cwd` لبعض واجهات برمجة التطبيقات سيسبب أيضا أخطاء.



### فك التعبئة الإضافية على بعض واجهات التطبيقات

معظم `fs` APIs يمكن قراءة ملف أو الحصول على معلومات الملف من `أرشيف` أرشيف دون فك التغليف، ولكن لبعض واجهات برمجة التطبيقات التي تعتمد على تمرير مسار الملف الحقيقي إلى مكالمات النظام الأساسية، سيقوم إلكترون باستخراج الملف المطلوب في ملف مؤقت وتمرير مسار الملف المؤقت إلى واجهات برمجة التطبيقات لجعلها تعمل . هذا يضيف بعض المصروفات العامة لآلات API تلك.

APIs التي تتطلب فك التعبئة الإضافية هي:

* `child_process.execFile`
* `child_process.execFileSync`
* `fs.open`
* `fs.openSync`
* `process.dlopen` - مستخدم من قبل `يتطلب` على الوحدات الأصلية



### معلومات المحطة الوهمية من `fs.stat`

`إحصائيات` الكائن عاد بواسطة `fs. tat` وأصدقائه على الملفات في `asar` أرشيف يتم إنشاؤها عن طريق التخمين, لأن هذه الملفات غير موجودة على نظام الملفات . لذلك يجب ألا تثق في كائن `إحصائيات` باستثناء الحصول على حجم الملف والتحقق من نوع الملف.



### تنفيذ Binaries داخل `asar` الأرشيف

هناك برامج برمجة تطبيقات العقدة التي يمكنها تنفيذ ثنائيات مثل `child_process.exec`، `child_process.spawn` و `child_process. ملف xecFile`، ولكن `الملف المنفي` فقط هو مدعوم لتنفيذ ثنائيات داخل `asar` أرشيف.

هذا لأن `exec` و `spawn` قبل `الأمر` بدلا من `الملف` كمدخل، و `الأمر`s يتم تنفيذها تحت القذف. لا توجد طريقة موثوقة لتحديد ما إذا كان الأمر يستخدم ملف في أرشيف الأرشيف، وحتى إذا قمنا بذلك، لا يمكننا أن نكون متأكدين مما إذا كان بإمكاننا استبدال المسار في الأمر بدون تأثيرات جانبية.



## إضافة ملفات غير معبأة إلى `asar` أرشيف

كما ذكر أعلاه، فإن بعض واجهات برمجة تطبيقات العقدة ستقوم بفك حزمة الملف إلى نظام الملفات عند استدعاء وبصرف النظر عن مشاكل الأداء، فإن العديد من أجهزة المسح المضاد للفيروسات قد يتم تشغيلها بهذا السلوك.

كعمل حوله، يمكنك ترك ملفات مختلفة مفصولة باستخدام خيار `--إلغاء الحزمة`. في المثال التالي، المكتبات المشتركة من وحدات Node.js الأصلية لن تكون حزمة:



```sh
$ asar pack app app.asar --unpack *.node
```


بعد تشغيل الأمر، ستلاحظ أنه تم إنشاء مجلد يسمى `app.asar.unpack` مع ملف `app.asar`. It contains the unpacked files and should be shipped together with the `app.asar` archive.

[asar]: https://github.com/electron/asar
[electron-packager]: https://github.com/electron/electron-packager
[electron-forge]: https://github.com/electron-userland/electron-forge
[electron-builder]: https://github.com/electron-userland/electron-builder

