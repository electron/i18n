# توقيع الكود

توقيع الكود هو تقنية أمان تستعملها للتحقق من أن التطبيق تم إنشاؤه من قبلك.

في نظام macOS يمكن أن يكتشف النظام أي تغيير في التطبيق، سواء كان التغيير مقدماً عن طريق الخطأ أو بواسطة الكود الخبيث.

On Windows the system assigns a trust level to your code signing certificate which if you don't have, or if your trust level is low will cause security dialogs to appear when users start using your application.  مستوى الثقة يبني مع مرور الوقت لذا من الأفضل بدء توقيع التعليمات البرمجية في أقرب وقت ممكن.

وفي حين أنه من الممكن توزيع التطبيقات غير الموقعة، فإنه لا يوصى بها. كل من Windows و macOS سيمنعان، بشكل افتراضي، إما تحميل أو تنفيذ التطبيقات غير الموقعة. يبدأ بـ macOS Catalina (الإصدار 10.15)، يجب على المستخدمين الذهاب عبر خطوات يدوية متعددة لفتح التطبيقات غير الموقعة.

![تحذير كاتالينا كاتالينا: لا يمكن فتح التطبيق لأنه لا يمكن التحقق من المطور](../images/gatekeeper.png)

كما ترى، يحصل المستخدمين على خيارين: نقل التطبيق مباشرة إلى سلة المهملات أو إلغاء تشغيله. لا تريد مستخدميك رؤية علبة الحوار هذه.

إذا كنت تقوم ببناء تطبيق إلكترون الذي تنوي حزمه وتوزيعه، يجب أن يتم التوقيع على الرموز. مخزن تطبيقات Mac و Windows لا يسمح بالتطبيقات غير الموقعة.

# توقيع إصدارات macOS

قبل توقيع بنايات macOS، يجب عليك القيام بما يلي:

1. Enroll in the [Apple Developer Program][] (requires an annual fee)
2. Download and install [Xcode][]
3. Generate, download, and install [signing certificates][]

يوجد رقم للأداة لأجل توقيع حزمة تطبيقك:

- [`electron-osx-sign`][] is a standalone tool for signing macOS packages.
- [`electron-packager`][] bundles `electron-osx-sign`. إذا كنت تستخدم `electron-packager`، اجتاز `--osx-sign=true` لتوقيع بناءك.
  - [`electron-forge`][] uses `electron-packager` internally, you can set the `osxSign` option in your forge config.
- [`electron-builder`][] has built-in code-signing capabilities. شاهد [electron.build/code-signat](https://www.electron.build/code-signing)

## التوثيق

ابتداءً من كاتالينا macOS، تحتاج Apple إلى توثيق للتطبيقات. "Notarization" as defined by Apple means that you upload your previously signed application to Apple for additional verification _before_ distributing the app to your users.

To automate this process, you can use the [`electron-notarize`][] module. أنت لست بحاجة بالضرورة إلى إكمال هذه الخطوة لكل بناء تقوم به - فقط البناء الذي تنوي شحنه للمستخدمين.

## Mac App ore

انظر الى [ دليل متجر التطبيقات Mac][].

# توقيع إنشاء Windows

قبل التوقيع بناءات Windows، يجب عليك القيام بما يلي:

1. احصل على شهادة توقيع رمز مصادقة Windows (يتطلب رسم سنوي)
2. تثبيت Visual Studio 2015/2017 (للحصول على أداة التوقيع)

يمكنك أخذ كود مصادقة موقعة من الكثير من الموزعين. الأسعار متفاوتة، لذا ربما يستحق لتأخذ وقتك لتجوال في التسوق. تحتوي على البائعين الشائعين:

* [رقمي](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* من بين الآخرين، يرجى التسوق للعثور على واحد يناسب احتياجاتك، جوجل هو صديقك :)

يوجد رقم للأداة لأجل توقيع حزمة تطبيقك:

- [`electron-winstaller`][] will generate an installer for windows and sign it for you
- [`electron-forge`][] can sign installers it generates through the Squirrel.Windows or MSI targets.
- [`electron-builder`][] can sign some of its windows targets

## متجر تطبيقات Windows

انظر الى[دليل متجر Windows][].

[Apple Developer Program]: https://developer.apple.com/programs/
[`electron-builder`]: https://github.com/electron-userland/electron-builder
[`electron-forge`]: https://github.com/electron-userland/electron-forge
[`electron-osx-sign`]: https://github.com/electron-userland/electron-osx-sign
[`electron-packager`]: https://github.com/electron/electron-packager
[`electron-notarize`]: https://github.com/electron/electron-notarize
[`electron-winstaller`]: https://github.com/electron/windows-installer
[Xcode]: https://developer.apple.com/xcode
[signing certificates]: https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates
[ دليل متجر التطبيقات Mac]: mac-app-store-submission-guide.md
[دليل متجر Windows]: windows-store-guide.md
