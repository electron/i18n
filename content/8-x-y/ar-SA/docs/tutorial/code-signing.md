# توقيع الكود

توقيع الكود هو تقنية أمان تستعملها للتحقق من أن التطبيق تم إنشاؤه من قبلك.

On macOS the system can detect any change to the  app, whether the change is introduced accidentally or by malicious code.

On Windows the system assigns a trust level to your code signing certificate which if you don't have, or if your trust level is low will cause security dialogs to appear when users start using your application.  مستوى الثقة يبني مع مرور الوقت لذا من الأفضل بدء توقيع التعليمات البرمجية في أقرب وقت ممكن.

وفي حين أنه من الممكن توزيع التطبيقات غير الموقعة، فإنه لا يوصى بها. For example, here's what macOS users see when attempting to start an unsigned app:

![unsigned app warning on macOS](https://user-images.githubusercontent.com/2289/39488937-bdc854ba-4d38-11e8-88f8-7b3c125baefc.png)

> App can't be opened because it is from an unidentified developer

If you are building an Electron app that you intend to package and distribute, it should be code signed. مخزن تطبيقات Mac و Windows لا يسمح بالتطبيقات غير الموقعة.

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

For more info, see the [Mac App Store Submission Guide][].

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
[`electron-winstaller`]: https://github.com/electron/windows-installer
[Xcode]: https://developer.apple.com/xcode
[signing certificates]: https://github.com/electron-userland/electron-osx-sign/wiki/1.-Getting-Started#certificates
[Mac App Store Submission Guide]: mac-app-store-submission-guide.md
[دليل متجر Windows]: windows-store-guide.md
