# Application Distribution

## النظرة عامة

لتوزيع تطبيقك مع إلكترون، تحتاج إلى حزمة وإعادة العلامة التجارية. To do this, you can either use specialized tooling or manual approaches.

## With tooling

You can use the following tools to distribute your application:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

These tools will take care of all the steps you need to take to end up with a distributable Electron application, such as bundling your application, rebranding the executable, and setting the right icons.

You can check the example of how to package your app with `electron-forge` in our [Quick Start Guide](quick-start.md#package-and-distribute-the-application).

## التوزيعة اليدوية

### With prebuilt binaries

To distribute your app manually, you need to download Electron's [prebuilt binaries](https://github.com/electron/electron/releases). بعد ذلك، يجب أن يكون المجلد الذي يحتوي على التطبيق الخاص بك مسمى `التطبيق` وأن يتم وضعه في دليل موارد Electron's كما هو مبين في الأمثلة التالية.

> *NOTE:* the location of Electron's prebuilt binaries is indicated with `electron/` in the examples below.

*في macOS:*

```plaintext
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

*في Windows و Linux:*

```plaintext
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Then execute `Electron.app` on macOS, `electron` on Linux, or `electron.exe` on Windows, and Electron will start as your app. The `electron` directory will then be your distribution to deliver to users.

### With an app source code archive

Instead of from shipping your app by copying all of its source files, you can package your app into an [asar](https://github.com/electron/asar) archive to improve the performance of reading files on platforms like Windows, if you are not already using a bundler such as Parcel or Webpack.

لاستخدام أرشيف `asar` لاستبدال مجلد `التطبيق` ، تحتاج إلى إعادة تسمية أرشيف إلى `تطبيق. sar`، ووضعه تحت دليل موارد Electron's مثل أدناه، وسيحاول إلكترون بعد ذلك قراءة الأرشيف والبدء منه.

*في macOS:*

```plaintext
https://crowdin.com/translate/electron/all/en-ar#
```

*في Windows و Linux:*

```plaintext
electron/resources/
└── app.asar
```

You can find more details on how to use `asar` in the [`electron/asar` repository](https://github.com/electron/asar).

### Rebranding with downloaded binaries

بعد تجميع التطبيق الخاص بك في إلكترون، سوف ترغب في إعادة تصنيف إلكترون قبل توزيعه على المستخدمين.

#### نظام macOS

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

#### Windows

يمكنك إعادة تسمية `إلكترون. xe` إلى أي اسم تحبه، وقم بتعديل أيقونة و معلومات أخرى باستخدام أدوات مثل [Rcedit](https://github.com/electron/rcedit).

#### Linux

يمكنك إعادة تسمية `إلكترون` قابلة للتنفيذ لأي اسم تحب.

### Rebranding by rebuilding Electron from source

من الممكن أيضًا إعادة تصنيف إلكترون بتغيير اسم المنتج و بنائه من المصدر. للقيام بذلك تحتاج إلى تعيين حجة بناء المقابلة لاسم المنتج (`electron_product_name = "YourProductName"`) في `args. (ن)` ملف وإعادة البناء.
