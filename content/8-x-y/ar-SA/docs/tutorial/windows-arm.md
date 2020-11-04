# تطبيق ويندوز 10

If your app runs with Electron 6.0.8 or later, you can now build it for Windows 10 on Arm. This considerably improves performance, but requires recompilation of any native modules used in your app. It may also require small fixups to your build and packaging scripts.

## تشغيل تطبيق أساسي
إذا لم يستخدم تطبيقك أي وحدات أصلية، فسيكون من السهل حقاً إنشاء نسخة تسليح من التطبيق الخاص بك.

1. تأكد من أن دليل تطبيقك `node_modules` فارغ.
2. باستخدام _طلب الأمر_، قم بتشغيل `تعيين npm_config_arch=arm64` قبل تشغيل `npm تثبيت`/`yarn تثبيت` كالمعتاد.
3. [إذا كان لديك إلكترون مثبت كاعتماد على التطوير](first-app.md)، سيقوم npm بتنزيل وفك حزمة إصدار arm64. يمكنك بعد ذلك حزم التطبيق الخاص بك وتوزيعه كأمر طبيعي.

## ألف- اعتبارات عامة

### رمز معماري خاص

Lots of Windows-specific code contains if... else logic that selects between either the x64 or x86 architectures.

```js
إذا (process.arch === 'x64') {
  // Do 64-bit شيء...
} أخرى {
  // Do 32 bit...
}
```

إذا كنت ترغب في استهداف arm64، منطق مثل هذا سيحدد المعمارية الخاطئة، قم بالتحقق بعناية من تطبيقك وبناء البرامج النصية للحصول على شروط كهذه. في البرامج النصية المخصصة للبناء والتغليف، يجب أن تتحقق دائما من قيمة `npm_config_arch` في البيئة، بدلاً من الاعتماد على ركن العملية الحالي.

### الوحدات الأصلية
إذا كنت تستخدم وحدات أصلية، فيجب عليك التأكد من أنها تجمع ضد v142 من مجمع MSVC (مقدم في Visual Studio 2017). يجب عليك أيضا التحقق من أنه تم بناء أي `.dll` أو `. '4'` الملفات المقدمة أو التي تمت الإشارة إليها من قبل الوحدة الأصلية متاحة لنظام التشغيل Windows على التسلح.

### اختبار التطبيق الخاص بك
لاختبار التطبيق الخاص بك، استخدم Windows على جهاز الذخيرة الذي يعمل بنظام Windows 10 (الإصدار 1903 أو لاحقا). تأكد من أنك قمت بنسخ التطبيق الخاص بك إلى الجهاز المستهدف- صندوق الرمل الخاص بـ Chromium لن يعمل بشكل صحيح عند تحميل أصول التطبيق الخاص بك من موقع الشبكة.

## المتطلبات الأساسية للتنمية
### Node.js/node-gyp

[Node.js v12.9.0 أو أحدث ينصح به.](https://nodejs.org/en/) إذا كان التحديث إلى إصدار جديد من العقدة غير مرغوب فيه، يمكنك بدلاً من ذلك [تحديث نسخة npm من العقدة يدويًا](https://github.com/nodejs/node-gyp/wiki/Updating-npm's-bundled-node-gyp) إلى الإصدار 5. (2) أو بعده، وهو يتضمن التغييرات المطلوبة لتجميع الوحدات المحلية للتسليح.

### ستوديو مرئي 2017
الاستوديو المرئي 2017 (أي طبعة) مطلوب لتجميع الوحدات الأصلية المتقاطعة. يمكنك تنزيل برنامج Visual Studio Community 2017 عن طريق برنامج Microsoft [Visual Studio Dev Essentials](https://visualstudio.microsoft.com/dev-essentials/). بعد التثبيت، يمكنك إضافة المكونات الخاصة بالأسلحة عن طريق تشغيل ما يلي من _طلب الأوامر_:

```powershell
vs_installer.exe ^
--إضافة Microsoft.VisualStudio.Workload.NativeDesktop ^
--إضافة Microsoft.VisualStudio.Component.VC.ATLMFC ^
--إضافة Microsoft.VisualStudio.Component.VC.Tools.ARM64 ^
--إضافة Microsoft.VisualStudio.Component.VC.MC.ARM64 ^
- بما في ذلك التوصية
```

#### إنشاء موجه أمر التجميع
إعداد `npm_config_arch=arm64` في البيئة يخلق الذراع 64 `الصحيح. bj` ملفات، ولكن موجه أمر المطور القياسي _لـ VS 2017_ سوف يستخدم رابط x64. لإصلاح هذا:

1. تكرار إختصار _x64_x86 Tools Tools Prompt لـ VS 2017_ (على سبيل المثال. عن طريق وضعها في قائمة البدء، انقر بزر الماوس الأيمن، حدد _فتح موقع الملف_، نسخ ولصق ) إلى مكان مناسب في مكان ما.
2. انقر بزر الماوس الأيمن على الاختصار الجديد واختر _خصائص_.
3. تغيير الحقل _الهدف_ إلى قراءة `vcvarsamd64_arm64.bat` في النهاية بدلاً من `vcvarsamd64_x86.bat`.

إذا تم ذلك بنجاح، يجب على توجيه الأمر طباعة شيء مماثل لهذا عند بدء التشغيل:

```bat
**********************************************************************
** Visual Studio 2017 Developer Command Prompt v15.9.15
** Copyright (c) 2017 Microsoft Corporation
**********************************************************************
[vcvarsall.bat] Environment initialized for: 'x64_arm64'
```

إذا كنت ترغب في تطوير التطبيق الخاص بك مباشرة على ويندوز على جهاز الذراع، بديل `vcvarsx86_arm64. في` في _الهدف_ بحيث يمكن أن يحدث التجميع الشامل مع محاكاة x86 للجهاز.

### ربط ضد `node.lib الصحيح`

By default, `node-gyp` unpacks Electron's node headers and downloads the x86 and x64 versions of `node.lib` into `%APPDATA%\..\Local\node-gyp\Cache`, but it does not download the arm64 version ([a fix for this is in development](https://github.com/nodejs/node-gyp/pull/1875).) لإصلاح هذا:

1. Download the arm64 `node.lib` from https://atom.io/download/v6.0.9/win-arm64/node.lib
2. نقله إلى `%APPDATA%\..\المحلية\node-gyp\Cache\6.0.9\arm64\node.lib`

استبدال `6.0.9` للنسخة التي تستخدمها.


## الوحدات الأصلية التجميعية المتداخلة
بعد إكمال كل ما سبق، افتح موجه أمر التجميع الشامل الخاص بك وقم بتشغيل `تعيين npm_config_arch=arm64`. ثم استخدم `npm تثبيت` لبناء مشروعك كطبيعي. كما هو الحال بالنسبة لتجميع وحدات x86، قد تحتاج إلى إزالة `node_modules` لفرض إعادة تجميع الوحدات الأصلية إذا كانت قد تم تجميعها مسبقاً لهندسة معمارية أخرى.

## تصحيح الأخطاء الوحدات الأصلية

يمكن تصحيح الأخطاء في الوحدات الأصلية بواسطة Visual Studio 2017 (قيد التشغيل على جهاز التطوير الخاص بك) وما يقابله [Visual Studio Debute Debugger](https://docs.microsoft.com/en-us/visualstudio/debugger/remote-debugging-cpp?view=vs-2019) قيد التشغيل على الجهاز المستهدف. لتصحيح الأخطاء:

1. ربط التطبيق الخاص بك `. xe` على الجهاز المستهدف عن طريق _طلب الأوامر_ (اجتياز `--افحص علامة تجارية` لإيقافها مؤقتاً قبل تحميل أي وحدات أصلية).
2. تشغيل Visual Studio 2017 على آلة التطوير الخاصة بك.
3. الاتصال بالجهاز المستهدف عن طريق تحديد _تصحيح > إرفاق إلى العملية..._ أدخل عنوان IP الخاص بالجهاز ورقم المنفذ المعروض بواسطة أداة التصحيح البصري عن بعد (Visual Studio).
4. انقر فوق _تحديث_ وحدد [عملية إلكترون المناسبة لإرفاق](../development/debug-instructions-windows.md).
5. قد تحتاج إلى التأكد من أن أي رموز للوحدات الأصلية في التطبيق الخاص بك يتم تحميلها بشكل صحيح. لتكوين هذا، انتقل إلى _تصحيح > الخيارات..._ في Visual Studio 2017، وإضافة المجلدات التي تحتوي على `الخاص بك. db` رموز تحت _تصحيح > رموز_.
5. بمجرد إرفاقه، قم بتعيين أي نقاط توقف مناسبة واستئناف تنفيذ JavaScript باستخدام أدوات Chrome [البعيدة ل Node](debugging-main-process.md).

## الحصول على مساعدة إضافية
إذا واجهت مشكلة في هذا المستند، أو إذا كان تطبيقك يعمل عند تجميعه لـ x86 ولكن ليس للarm64، الرجاء [تقديم مشكلة](../development/issues.md) مع "ويندوز على السلاح" في العنوان.
