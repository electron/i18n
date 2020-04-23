# المعجم

تعرف هذه الصفحة بعض المصطلحات التي يشيع استخدامها في تطوير الإلكترون.

### أرشيف تنسيق أتوم شيل

أسار تعني أرشيف تنسيق أتوم شيل. [إسار](https://github.com/electron/asar) هو أرشيف بسيط `تار`- مثل صيغة تار التي تدمج عدة ملفات في ملف واحد. الإلكترون يمكن قراءة ملفات تعسفية منه دون تفريغ الملف بأكمله.

The ASAR format was created primarily to improve performance on Windows... TODO

### CRT

مكتبة وقت التشغيل C (CRT) هو الجزء من "مكتبة c + + القياسية" التي تتضمن المكتبة القياسية إيزو C99. مكتبات Visual c + + التي تنفذ CRT ، وكل التعليمات البرمجية الأصلية والمداره مختلطة، والتعليمات البرمجية المدارة خالصة للتنمية.NET.

### DMG

أبل ديسك هو نضام تعبئة او تخزين يستخدم من قبل نضام ماكنتوش. ملفات DMG تستخدم عادة لتوزيع التطبيق "التركيب". [electron-builder](https://github.com/electron-userland/electron-builder) يدعم `dmg` كهدف بناء.

### IME

محرر الكتابة. برنامج يسمح للمستخدمين بإدخال الأحرف والرموز التي لم يتم العثور عليها في لوحة المفاتيح. على سبيل المثال، هذا يسمح لمستخدمي لوحات المفاتيح اللاتينية إدخال الأحرف الصينية واليابانية، والكورية والهندية.

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC stands for Inter-Process Communication. Electron uses IPC to send serialized JSON messages between the [main](#main-process) and [renderer](#renderer-process) processes.

### libchromiumcontent

مكتبة مشتركة تشمل [وحدة "محتوى الكروم"](https://www.chromium.org/developers/content-module) وكافة التبعيات الخاصة به (مثلاً، الطرفة، [V8](#v8)، إلخ.). كما يشار إليها ب "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### العملية الرئيسية

العملية الرئيسية، عادة ملف اسمه `main.js`، هي نقطة الدخول لتطبيق كل إلكترون. أنها تسيطر على اللتطبيق، من فتح إغلاق. وتدير أيضا العناصر الأصلية مثل القائمة وشريط القوائم،إلخ. العملية الرئيسية هي المسؤولة عن خلق كل عملية عارض جديد في التطبيق. تم إنشاء واجهة برمجة تطبيقات بالكامل.

Every app's main process file is specified in the `main` property in `package.json`. This is how `electron .` knows what file to execute at startup.

In Chromium, this process is referred to as the "browser process". It is renamed in Electron to avoid confusion with renderer processes.

راجع أيضا:

 عملية </ 0>،  عملية العارض </ 1></p> 



### MAS

Acronym for Apple's Mac App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md).



### Mojo

نظام IPC للتواصل داخل أو أثناء العملية ، وهذا أمر مهم لأن Chrome حريص على قدرته على تقسيم عمله إلى عمليات منفصلة أو لا ، اعتمادًا على ضغوط الذاكرة وما إلى ذلك.

أنظر https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md



### native modules

الوحدات المحلية (يطلق عليها أيضاً [إضافات](https://nodejs.org/api/addons.html) في Node.js) هي وحدات مكتوبة بلغة C أو C++ والتي يمكن تحمليها في Node.js أو Electron بإستخدام الدالة require()، وتستخدم كأنها وحدة Node.js عادية. أنها تستخدم أساسا لتقديم واجهة بين جافا سكريبت يعمل في مكتبات Node.js و C/c + +.

Native Node modules are supported by Electron, but since Electron is very likely to use a different V8 version from the Node binary installed in your system, you have to manually specify the location of Electron’s headers when building native modules.

See also [Using Native Node Modules](tutorial/using-native-node-modules.md).



### NSIS

Nullsoft Scriptable Install System is a script-driven Installer authoring tool for Microsoft Windows. It is released under a combination of free software licenses, and is a widely-used alternative to commercial proprietary products like InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) supports NSIS as a build target.



### OSR

OSR (Off-screen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.



### عملية

A process is an instance of a computer program that is being executed. Electron apps that make use of the [main](#main-process) and one or many [renderer](#renderer-process) process are actually running several programs simultaneously.

In Node.js and Electron, each running process has a `process` object. This object is a global that provides information about, and control over, the current process. As a global, it is always available to applications without using require().

See also: [main process](#main-process), [renderer process](#renderer-process)



### renderer process

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

In normal browsers, web pages usually run in a sandboxed environment and are not allowed access to native resources. Electron users, however, have the power to use Node.js APIs in web pages allowing lower level operating system interactions.

See also: [process](#process), [main process](#main-process)



### سنجاب

السنجاب هو إطار مفتوح المصدر الذي يمكن تطبيقات إلكترون لتحديث تلقائيا كما يتم الافراج عن الإصدارات الجديدة. انظر [autoUpdater](api/auto-updater.md) API لمزيد من المعلومات حول الشروع في العمل مع السنجاب.



### userland

هذا المصطلح نشأ في مجتمع Unix، حيث "userland" أو "userspace" تشير إلى البرامج التي تعمل خارج نواة نظام التشغيل. في الآونة الأخيرة، تم تعميم هذا المصطلح في مجتمع Node. js npm ل التمييز بين الميزات المتوفرة في "node core" مقابل حزم نشرت إلى سجل npm من قبل مجتمع "أكبر بكثير".

مثل node، الالكترون تركز على وجود مجموعة صغيرة من واجهات برمجة التطبيقات التي توفر جميع الأوليات اللازمة تطوير تطبيقات سطح المكتب منصة متعددة. فلسفة التصميم هذه تسمح للإلكترون لتبقى أداة مرنة دون إفراط في وصف كيفية استخدامها. Userland تمكن المستخدمين من إنشاء وتبادل الأدوات التي توفر وظائف إضافية علاوة على ما هو متوفر في "core".



### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

بني الإلكترون V8 كجزء من كروميوم ثم يشير node إلى V8 عندما تم البناء.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)



### معرض الويب

يتم استخدام علامات عرض الويب `webview` لتضمين محتوى "ضيف" (مثل صفحات الويب الخارجية) في التطبيق الإلكترون الخاص بك. وهي مشابهة ل`iframe` s، ولكنها تختلف في كل منها يتم تشغيل عرض ويب في عملية منفصلة. أنها لا تملك نفس الأذونات كصفحة ويب الخاصة بك، وكل التفاعلات بين التطبيق والمحتوى المضمن الخاص بك سوف تكون غير متزامنة. وهذا يبقى التطبيق الخاص بك في مأمن من محتوى مضمن.
