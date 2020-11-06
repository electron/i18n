# التثبيت

لتثبيت ثنائيات إلكترون التي بنيت مسبقاً، استخدم [`npm`](https://docs.npmjs.com). الطريقة المفضلة هي تثبيت إلكترون كاعتماد على التطوير في تطبيق الخاص بك:

```sh
npm تثبيت إلكترون --وفر - ديف
```

راجع [الإصدار الإلكتروني doc](./electron-versioning.md) للحصول على معلومات حول كيفية إدارة الإصدارات الإلكترونية في تطبيقاتك.

## تخصيصات عامة

يمكنك أيضًا تثبيت الأمر `electron` على الصعيد العالمي في `$PATH`:

```sh
npm install electron -g
```

## التخصيص

إذا كنت ترغب في تغيير العمارة التي يتم تنزيلها (على سبيل المثال). `ia32` على `x64` آلة)، يمكنك استخدام `--ارش` مع تثبيت npm أو تعيين `npm_config_arch` متغير البيئة:

```shell
npm install --arch=ia32 electron
```

بالإضافة إلى تغيير المعمارية، يمكنك أيضا تحديد المنصة (على سبيل المثال. `win32`, `Linux`, الخ) باستخدام `--منصة` علم :

```shell
npm تثبيت --platform=win32 electron
```

## بروكسيات

إذا كنت بحاجة إلى استخدام وكيل HTTP، تحتاج إلى تعيين متغير `ELECTRON_GET_USE_PROXY` لأي قيمة ، بالإضافة إلى المتغيرات البيئية الإضافية اعتماداً على إصدار عقدة النظام المضيف الخاص بك:

* [العقدة 10 وما فوق](https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables)
* [قبل العقدة 10](https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config)

## الكاش ومصادر أخرى

أثناء التثبيت، ستتصل وحدة `electron` إلى [`@electron/get`](https://github.com/electron/get) لتحميل ثنائيات تم بناؤها مسبقاً من إلكترون للمنصة الخاصة بك. سوف تفعل ذلك من خلال الاتصال بصفحة تنزيل GitHub الخاص بـ (`https://github. om/electron/electron/releases/tag/v$VERSION`، حيث `$VERSION` هو النسخة الدقيقة من Electron).

إذا كنت غير قادر على الوصول إلى GitHub أو تحتاج إلى توفير نسخة مخصصة، يمكنك القيام بذلك من خلال توفير مرآة أو دليل ذاكرة التخزين المؤقت الموجود.

#### مصدر اخر

يمكنك استخدام متغيرات البيئة لتجاوز عنوان URL الأساسي، والمسار الذي يمكن من خلاله البحث عن ثنائيات إلكترون، واسم الملف الثنائي. عنوان URL المستخدم من قبل `@electron/get` مكون على النحو التالي:

```javascript
الرابط = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

وعلى سبيل المثال، لاستخدام مرآة CDN الصينية:

```shell
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
```

بشكل افتراضي، تم تعيين `ELECTRON_CUSTOM_DIR` إلى `v$VERSION`. لتغيير التنسيق، استخدم العنصر النائب `{{ version }}`. على سبيل المثال، `الإصدار -{{ version }}` يحل في `الإصدار-5.0.`، `{{ version }}` يقرر `5.0.`و `v{{ version }}` يعادل الافتراضي. كمثال أكثر تحديدا، لاستخدام مرآة الصين غير CDN:

```shell
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
ELECTRON_CUSTOM_DIR="{{ version }}"
```

سيتم تحميل التكوين أعلاه من عناوين URL مثل `https://npm.taobao.org/mirrors/electron/8.0.0/electron-v8.0.0-linux-x64.zip`.

#### الكاش

بدلاً من ذلك، يمكنك تجاوز ذاكرة التخزين المؤقت المحلية. ستخبأ `@electron/get` ثنائيات التي تم تنزيلها في مجلدنا لكي لا تضغط على شبكتك. يمكنك استخدام مجلد ذاكرة التخزين المؤقت لتوفير إصدارات مخصصة من إلكترون أو لتجنب الاتصال مع الشبكة على الإطلاق.

* لينوكس: `$XDG_CACHE_HOME` أو `~/.cache/electron/`
* ماكوس: `~/Library/Caches/electron/`
* ويندوز: `$LOCALAPPDATA/electron/Cache` أو `~/AppData/Local/electron/Cache/`

في البيئات التي تستخدم إصدارات إلكترون القديمة، قد تجد مخبأ أيضًا في `~/.electron`.

يمكنك تجاهل موقع ذاكرة تخزين المحلية بتوفير `electron_config_cache` متغير البيئة.

يحتوي ذاكرة التخزين المؤقت على الملف البريدي الرسمي للإصدار بالإضافة إلى ملخص الاختبار، مخزنة كملف نصي . مخبئ نموذجي قد يبدو هكذا:

```sh
├── httpsgithub.comelectronelectronreleasesdownloadv1.7.9electron-v1.7.9-darwin-x64.zip
│   └── electron-v1.7.9-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.7.9SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.1electron-v1.8.1-darwin-x64.zip
│   └── electron-v1.8.1-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.1SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.1electron-v1.8.2-beta.1-darwin-x64.zip
│   └── electron-v1.8.2-beta.1-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.1SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.2electron-v1.8.2-beta.2-darwin-x64.zip
│   └── electron-v1.8.2-beta.2-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.2SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.3electron-v1.8.2-beta.3-darwin-x64.zip
│   └── electron-v1.8.2-beta.3-darwin-x64.zip
└── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.3SHASUMS256.txt
    └── SHASUMS256.txt
```

## تخطي التحميل الثنائي

عند تثبيت حزمة `إلكترون` NPM ، يقوم تلقائياً بتنزيل إلكترون الثنائي.

وقد لا يكون ذلك ضرورياً في بعض الأحيان، مثلاً في بيئة المعلومات المركزية، عند اختبار مكون آخر.

لمنع تحميل الثنائية عند تثبيت جميع الإعتمادات npm يمكنك تعيين متغير البيئة `ELECTRON_SKIP_BINARY_DOWNLOAD`. مثال:

```sh
تثبيت ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm
```

## اكتشاف الأخطاء وإصلاحها

Wywołując polecenie `npm install electron`, niektórzy użytkownicy napotykają okazjonalne błędy instalacji.

في جميع الحالات تقريبا، هذه الأخطاء هي نتيجة لمشاكل الشبكة وليس القضايا الفعلية مع حزمة `npm الإلكترون.` أخطاء مثل `ELIFECYCLE`، `EAI_AGAIN`، `ECONNRESET`، `وETIMEDOUT` كلها مؤشرات على مثل هذه مشاكل الشبكة. أفضل دقة هي محاولة تبديل الشبكات، أو الانتظار قليلا وحاول تثبيت مرة أخرى.

يمكنك أيضا محاولة لتحميل الإلكترون مباشرة من [الإلكترون / الإلكترون / الإصدارات](https://github.com/electron/electron/releases) إذا كان التثبيت عبر `npm` يفشل.

إذا فشل التثبيت مع `EACCESS` خطأ قد تحتاج إلى [إصلاح أذونات npm](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

إذا استمر الخطأ المشار إليه أعلاه، قد يحتاج علم [غير آمن](https://docs.npmjs.com/misc/config#unsafe-perm) إلى تعيين إلى صحيح:

```sh
sudo npm تثبيت إلكترون --unsafe-perm=true
```

على الشبكات البطيئة، قد يكون من المستصوب استخدام علم `--فاتور` من أجل إظهار تقدم التحميل:

```sh
npm install --verbose electron
```

إذا كنت بحاجة إلى إعادة تحميل الأصل وملف SHASUM تعيين متغير البيئة `force_no_cache` إلى `true`.
