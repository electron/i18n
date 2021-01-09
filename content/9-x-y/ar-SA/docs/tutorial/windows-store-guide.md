# Windows Store Guide

With Windows 10, the good old win32 executable got a new sibling: The Universal Windows Platform. الجديد `. ppx` تنسيق لا يقوم فقط بتمكين عدد من جديد من واجهات برمجة التطبيقات القوية مثل كورتانا أو إشعارات الدفع، ولكن من خلال Windows Store, أيضا يبسط التثبيت والتحديث.

Microsoft [developed a tool that compiles Electron apps as `.appx` packages][electron-windows-store], enabling developers to use some of the goodies found in the new application model. يشرح هذا الدليل كيفية استخدامه - وما هي القدرات و القيود لحزمة إلكترون AppX.

## ألف - الخلفية والاحتياجات

Windows 10 "تحديث الذكرى السنوية" قادر على تشغيل win32 `.exe` ثنائيات عن طريق تشغيلها مع نظام الملفات الافتراضي والتسجيل. وكلاهما تم إنشاؤه أثناء عملية التجميع عن طريق تشغيل التطبيق والتثبيت داخل حاوية ويندوز ، السماح لنظام التشغيل Windows بالتعرف بدقة على التعديلات المدخلة على أثناء التثبيت. إن الاقتران بين الجهاز التنفيذي مع نظام الملفات الافتراضي والسجل الافتراضي يسمح لنظام Windows بتفعيل التثبيت بنقرة واحدة وإلغاء التثبيت.

وبالإضافة إلى ذلك، يتم تشغيل exe داخل نموذج التطبيق - بمعنى أنه يمكن استخدام العديد من واجهات برمجة التطبيقات المتاحة لمنصة ويندوز العالمية. للحصول على المزيد من قدرات, يمكن أن يقترن تطبيق إلكترون مع مهمة خلفية UWP غير مرئية التي تم تشغيلها مع `exe` - نوع من التشغيل الجانبي لتشغيل المهام في الخلفية، تلقي إشعارات دفع أو للتواصل مع تطبيقات UWP أخرى.

لتجميع أي تطبيق إلكترون موجود، تأكد من أن لديك متطلبات التالية:

* Windows 10 مع تحديث الذكرى السنوية (صدر في 2 أغسطس 2016)
* The Windows 10 SDK, [downloadable here][windows-sdk]
* عقدة 4 على الأقل (للتحقق، قم بتشغيل `عقدة-v`)

ثم انتقل إلى متجر `Electron-windows-store` CLI:

```sh
npm تثبيت -g إلكترون-نوافذ المتجر
```

## الخطوة 1: حزمة تطبيق إلكترون

Package the application using [electron-packager][electron-packager] (or a similar tool). تأكد من إزالة `node_modules` التي لا تحتاج إليها في التطبيق النهائي الخاص بك، بما أن أي وحدة لا تحتاج إليها في الواقع ستزيد من حجم تطبيقك.

يجب أن يبدو المخرجات مثل هذا:

```plaintext
├── Ghost.exe
├── LICENSE
├── content_resources_200_percent.pak
├── content_shell.pak
├── d3dcompiler_47.dll
├── ffmpeg.dll
├── icudtl.dat
├── libEGL.dll
├── libGLESv2.dll
├── locales
│   ├── am.pak
│   ├── ar.pak
│   ├── [...]
├── node.dll
├── resources
│   ├── app
│   └── atom.asar
├── v8_context_snapshot.bin
├── squirrel.exe
└── ui_resources_200_percent.pak
```

## الخطوة 2: تشغيل متجر إلكترون-نوافذ

من PowerShell مرتفع (قم بتشغيله "كمدير")، قم بتشغيل `متجر إلكترون-نوافذ` مع المعلمات المطلوبة، تمرير كلاً من دليل الإدخال ودليل الإخراج، اسم التطبيق وإصداره، وتأكيد أنه يجب دمغ `node_modules`.

```powershell
electron-windows-store `
    --input-directory C:\myelectronapp `
    --output-directory C:\output\myelectronapp `
    --package-version 1.0.0 `
    --package-name myelectronapp
```

بمجرد تنفيذها، ستعمل الأداة: إنها تقبل تطبيق إلكترون الخاص بك كمدخل، ربط `node_modules`. ثم يحفظ تطبيقك كـ `app.zip`. باستخدام مثبت وحاوية ويندوز، تقوم الأداة بإنشاء حزمة "موسعة" من AppX - بما في ذلك بيان تطبيق ويندوز (`AppXManifest. ml`) ك وكذلك نظام الملفات الافتراضي والسجل الافتراضي داخل مجلد الإخراج .

بمجرد إنشاء ملفات AppX الموسعة، تستخدم الأداة حزمة تطبيقات ويندوز (`MakeAppx. xe`) لإنشاء حزمة AppX أحادية الملف من تلك الملفات على القرص. وأخيرا، يمكن استخدام الأداة لإنشاء شهادة موثوق بها على جهاز الكمبيوتر الخاص بك لتوقيع حزمة AppX الجديدة. مع حزمة AppX الموقعة، يمكن لـ CLI أيضًا تثبيت الحزمة تلقائيًا على جهازك.

## الخطوة 3: استخدام حزمة AppX

In order to run your package, your users will need Windows 10 with the so-called "Anniversary Update" - details on how to update Windows can be found [here][how-to-update].

In opposition to traditional UWP apps, packaged apps currently need to undergo a manual verification process, for which you can apply [here][centennial-campaigns]. في غضون ذلك، سيتمكن جميع المستخدمين من تثبيت الحزمة الخاصة بك عن طريق النقر المزدوج عليها، لذلك قد لا يكون تقديم إلى المتجر ضرورياً إذا كنت تبحث عن طريقة تثبيت أسهل. In managed environments (usually enterprises), the `Add-AppxPackage` [PowerShell Cmdlet can be used to install it in an automated fashion][add-appxpackage].

قيد مهم آخر هو أن حزمة AppX المجمعة لا تزال تحتوي على فائز 32 قابل للتنفيذ - وبالتالي لن تعمل على Xbox، هولولينز، أو الهواتف.

## اختياري: إضافة ميزات UWP باستخدام مهمة خلفية
يمكنك الجمع بين تطبيق إلكترون الخاص بك من خلال مهمة خلفية UWP غير مرئية للحصول على استخدام كامل لميزات Windows 10 - مثل دفع الإشعارات، تكامل كورتانا، أو البلاطات الحية.

To check out how an Electron app that uses a background task to send toast notifications and live tiles, [check out the Microsoft-provided sample][background-task].

## اختياري: التحويل باستخدام الافتراضي للحاوية

لإنشاء حزمة AppX، يستخدم متجر `electron-windows-store` CLI قالب الذي ينبغي أن يعمل لمعظم تطبيقات إلكترون. ومع ذلك، إذا كنت تستخدم مثبتًا مخصصًا، أو يجب أن تواجه أي مشكلة مع الحزمة التي تم إنشاؤها، يمكنك محاولة إنشاء حزمة باستخدام تجميع مع حاوية ويندوز - في تلك الحالة، سيقوم CLI بتثبيت وتشغيل التطبيق الخاص بك في حاوية ويندوز فارغة لتحديد التعديلات التي يقوم بها تطبيقك بالضبط على نظام التشغيل .

Before running the CLI for the first time, you will have to setup the "Windows Desktop App Converter". سوف يستغرق هذا بضع دقائق، ولكن لا تقلق - يجب عليك فقط فعل هذه المرة الواحدة. Download and Desktop App Converter from [here][app-converter]. سوف تتلقى ملفين: `DesktopAppConverter.zip` و `BaseImage-14316.wim`.

1. فك ضغط `DesktopAppConverter.zip`. من PowerShell مرتفع (تم فتحه مع "تشغيل كمدير"، تأكد من أن سياسة تنفيذ الأنظمة الخاصة بك تسمح لنا بتشغيل كل ما نعتزم تشغيله عن طريق الاتصال بـ `تجاوز سياسة الإعدادات`.
2. ثم قم بتشغيل تثبيت محول التطبيقات على سطح المكتب، مرورا في موقع صورة قاعدة Windows (التي تم تحميلها ك `BaseImage-14316. im`)، بواسطة الاتصال `.\DesktopAppConverter.ps1 -Setup -BaseImage .\BaseImage-14316.wim`.
3. إذا كان تشغيل الأمر أعلاه يدعوك إلى إعادة التشغيل، يرجى إعادة تشغيل جهاز الخاص بك وتشغيل الأمر أعلاه مرة أخرى بعد إعادة تشغيل ناجحة.

بمجرد نجاح التثبيت، يمكنك الانتقال إلى تجميع تطبيق إلكترون الخاص بك.

[windows-sdk]: https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk
[app-converter]: https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-run-desktop-app-converter
[add-appxpackage]: https://technet.microsoft.com/en-us/library/hh856048.aspx
[electron-packager]: https://github.com/electron/electron-packager
[electron-windows-store]: https://github.com/catalystcode/electron-windows-store
[background-task]: https://github.com/felixrieseberg/electron-uwp-background
[centennial-campaigns]: https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge
[how-to-update]: https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update
