# Application Distribution

لتوزيع تطبيقك مع إلكترون، تحتاج إلى حزمة وإعادة العلامة التجارية. وأسهل طريقة للقيام بذلك هي استخدام إحدى أدوات التغليف الخاصة بالأطراف الثالثة التالية:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

هذه الأدوات ستعالج جميع الخطوات التي تحتاج إلى اتخاذها في نهاية المطاف مع تطبيقات إلكترون قابلة للتوزيع ، مثل تغليف التطبيق الخاص بك، وإعادة تسمية الجهاز التنفيذي، وتعيين الأيقونات الصحيحة وإنشاء مثبتات اختيارية.

## التوزيعة اليدوية
يمكنك أيضًا اختيار الحصول يدويًا على تطبيقك جاهز للتوزيع. ويرد أدناه بيان بالخطوات اللازمة للقيام بذلك.

لتوزيع تطبيقك مع إلكترون، تحتاج إلى تحميل إلكترون [الذي تم بناؤه مسبقاً Binaries](https://github.com/electron/electron/releases). بعد ذلك، يجب أن يكون المجلد الذي يحتوي على التطبيق الخاص بك مسمى `التطبيق` وأن يتم وضعه في دليل موارد Electron's كما هو مبين في الأمثلة التالية. لاحظ أن موقع Electron's Binaries التي تم بناؤها مسبقاً هو مشار إليه مع `electron/` في الأمثلة أدناه.

في macOS:

```plaintext
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

في Windows و Linux:

```plaintext
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Then execute `Electron.app` (or `electron` on Linux, `electron.exe` on Windows), and Electron will start as your app. The `electron` directory will then be your distribution to deliver to final users.

## جعل تطبيقك في ملف على شكل حزم

بالإضافة إلى شحن التطبيق الخاص بك عن طريق نسخ جميع ملفاته المصدرية، يمكنك أيضًا حزم تطبيقك في أرشيف [asar](https://github.com/electron/asar) لتجنب عرض التعليمات البرمجية المصدرية للتطبيق الخاص بك للمستخدمين.

لاستخدام أرشيف `asar` لاستبدال مجلد `التطبيق` ، تحتاج إلى إعادة تسمية أرشيف إلى `تطبيق. sar`، ووضعه تحت دليل موارد Electron's مثل أدناه، وسيحاول إلكترون بعد ذلك قراءة الأرشيف والبدء منه.

في macOS:

```plaintext
https://crowdin.com/translate/electron/all/en-ar#
```

في Windows و Linux:

```plaintext
electron/resources/
└── app.asar
```

يمكن العثور على المزيد من التفاصيل في [تغليف التطبيقات](application-packaging.md).

## إعادة التوسيم مع ثنائيات المحملة

بعد تجميع التطبيق الخاص بك في إلكترون، سوف ترغب في إعادة تصنيف إلكترون قبل توزيعه على المستخدمين.

### Windows

You can rename `electron.exe` to any name you like, and edit its icon and other information with tools like [rcedit](https://github.com/atom/rcedit).

### نظام macOS

يمكنك إعادة تسمية `إلكترون. pp` لأي اسم تريد ، ويجب عليك أيضًا إعادة تسمية ب `CFBundleDisplayName`، `FBundleIDfier` و `CFBundleName` الحقول في الملفات التالية:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

يمكنك أيضا إعادة تسمية تطبيق المساعد لتجنب عرض `إلكترون المساعد` في مرصد النشاط، ولكن تأكد من إعادة تسمية اسم ملف التطبيق المساعد

هيكل التطبيق المعاد تسميته سيكون مثلاً:

```plaintext
MyApp.app/Contents
├── Info.plist
├── MacOS/
│   └── MyApp
└── Frameworks/
    └── MyApp Helper.app
        ├── Info.plist
        └── MacOS/
         └── MyApp Helper
```

### Linux

يمكنك إعادة تسمية `إلكترون` قابلة للتنفيذ لأي اسم تحب.

## إعادة التصنيف عن طريق إعادة بناء إلكترون من المصدر

من الممكن أيضًا إعادة تصنيف إلكترون بتغيير اسم المنتج و بنائه من المصدر. للقيام بذلك تحتاج إلى تعيين حجة بناء المقابلة لاسم المنتج (`electron_product_name = "YourProductName"`) في `args. (ن)` ملف وإعادة البناء.

### إنشاء قالب إلكترون مخصص

إنشاء شوكي مخصص من إلكترون هو بالتأكيد ليس شيئا ستحتاج إلى فعله من أجل بناء التطبيق الخاص بك، حتى لتطبيقات "مستوى الإنتاج". باستخدام أداة مثل `كهربائي - باقة` أو `إلكترون - فورج` سيسمح لك بـ "ريبراند" إلكترون دون الحاجة إلى القيام بهذه الخطوات.

عليك أن تشوه إلكترون عندما يكون لديك رمز C++ المخصص الذي قمت بتصحيحه مباشرة إلى إلكترون، إما أنه لا يمكن الترويج، أو تم رفضه من الإصدار الرسمي. بصفتنا مشرفين على إلكترون، نود كثيرا أن تجعل السيناريو الخاص بك يعمل، لذا يرجى المحاولة بأكبر قدر ممكن للحصول على التغييرات الخاصة بك في النسخة الرسمية من إلكترون، سيكون الأمر أسهل بكثير، و نحن نقدر مساعدتكم.

#### إنشاء إصدار مخصص مع بنائه

1. تثبيت [Surf](https://github.com/surf-build/surf)، عبر npm: `npm تثبيت -g surf-build@latest`

2. إنشاء دلو S3 جديد وإنشاء هيكل الدليل الفارغ التالي:

    ```sh
    -electron/
      - الرموز/
      - المسافة/
    ```

3. تعيين المتغيرات البيئية التالية:

  * `ELECTRON_GITHUB_TOKEN` - رمز يمكن أن ينشئ إصدارات على GitHub
  * `ELECTRON_S3_ACCESS_KEY`، `ELECTRON_S3_BUCKET`، `ELECTRON_S3_SECRET_KEY` - المكان الذي ستقوم بتحميل ترويسات Node.js وكذلك الرموز
  * `ELECTRON_RELEASE` - تعيين إلى `true` وسيتم تشغيل جزء التحميل، اترك بدون تعيين و `بناء` سيقوم بفحص من نوع CI، مناسب للتشغيل لكل طلب سحب.
  * `CI` - تعيين إلى `true` أو أنها ستفشل
  * `GITHUB_TOKEN` - إضبطه على نفس`ELECTRON_GITHUB_TOKEN`
  * `SURF_TEMP` - تعيين إلى `C:\T` على ويندوز لمنع مشكلات طويلة جداً
  * `TARGET_ARCH` - تعيين إلى `ia32` أو `x64`

4. In `script/upload.py`, you _must_ set `ELECTRON_REPO` to your fork (`MYORG/electron`), especially if you are a contributor to Electron proper.

5. `surf-build-r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`

6. انتظر وقتاً طويلاً جداً جداً لإكمال البناء.
