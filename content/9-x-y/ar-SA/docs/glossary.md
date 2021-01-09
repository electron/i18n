# المعجم

تعرف هذه الصفحة بعض المصطلحات التي يشيع استخدامها في تطوير الإلكترون.

### أرشيف تنسيق أتوم شيل

أسار تعني أرشيف تنسيق أتوم شيل. [إسار][asar] هو أرشيف بسيط `تار`- مثل صيغة تار التي تدمج عدة ملفات في ملف واحد. الإلكترون يمكن قراءة ملفات تعسفية منه دون تفريغ الملف بأكمله.

The ASAR format was created primarily to improve performance on Windows... TODO

### CRT

مكتبة وقت التشغيل C (CRT) هو الجزء من "مكتبة c + + القياسية" التي تتضمن المكتبة القياسية إيزو C99. مكتبات Visual c + + التي تنفذ CRT ، وكل التعليمات البرمجية الأصلية والمداره مختلطة، والتعليمات البرمجية المدارة خالصة للتنمية.NET.

### DMG

أبل ديسك هو نضام تعبئة او تخزين يستخدم من قبل نضام ماكنتوش. ملفات DMG تستخدم عادة لتوزيع التطبيق "التركيب". [electron-builder][] يدعم `dmg` كهدف بناء.

### IME

محرر الكتابة. برنامج يسمح للمستخدمين بإدخال الأحرف والرموز التي لم يتم العثور عليها في لوحة المفاتيح. على سبيل المثال، هذا يسمح لمستخدمي لوحات المفاتيح اللاتينية إدخال الأحرف الصينية واليابانية، والكورية والهندية.

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC stands for Inter-Process Communication. Electron uses IPC to send serialized JSON messages between the [main][] and [renderer][] processes.

### libchromiumcontent

مكتبة مشتركة تشمل [وحدة "محتوى الكروم"][] وكافة التبعيات الخاصة به (مثلاً، الطرفة، [V8][]، إلخ.). كما يشار إليها ب "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### العملية الرئيسية

The main process, commonly a file named `main.js`, is the entry point to every Electron app. It controls the life of the app, from open to close. وتدير أيضا العناصر الأصلية مثل القائمة وشريط القوائم،إلخ. The main process is responsible for creating each new renderer process in the app. The full Node API is built in.

كل ملف معالجة رئيسي في التطبيق محدد في الخاصية الرئيسية `` في `package.json`. This is how `electron .` knows what file to execute at startup.

في Chromium، يشار إلى هذه العملية باسم "عملية المتصفح". It is renamed in Electron to avoid confusion with renderer processes.

راجع أيضا:

 عملية </ 0>،  عملية العارض </ 1></p> 



### MAS

Acronym لمتجر تطبيقات Mac الخاص بآبل. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide][].



### Mojo

نظام IPC للتواصل داخل أو أثناء العملية ، وهذا أمر مهم لأن Chrome حريص على قدرته على تقسيم عمله إلى عمليات منفصلة أو لا ، اعتمادًا على ضغوط الذاكرة وما إلى ذلك.

أنظر https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md



### native modules

الوحدات المحلية (يطلق عليها أيضاً [إضافات][] في Node.js) هي وحدات مكتوبة بلغة C أو C++ والتي يمكن تحمليها في Node.js أو Electron بإستخدام الدالة require()، وتستخدم كأنها وحدة Node.js عادية. أنها تستخدم أساسا لتقديم واجهة بين جافا سكريبت يعمل في مكتبات Node.js و C/c + +.

Native Node modules are supported by Electron, but since Electron is very likely to use a different V8 version from the Node binary installed in your system, you have to manually specify the location of Electron’s headers when building native modules.

See also [Using Native Node Modules][].



### NSIS

Nullsoft Scriptable Install System is a script-driven Installer authoring tool for Microsoft Windows. It is released under a combination of free software licenses, and is a widely-used alternative to commercial proprietary products like InstallShield. [electron-builder][] supports NSIS as a build target.



### OSR

يمكن استخدام OSR (عرض الشاشة) لتحميل الصفحة الثقيلة في الخلفية ثم عرضها بعد ذلك (سيكون أسرع بكثير). يسمح لك بتقديم الصفحة دون عرضها على الشاشة.



### process

A process is an instance of a computer program that is being executed. Electron apps that make use of the [main][] and one or many [renderer][] process are actually running several programs simultaneously.

In Node.js and Electron, each running process has a `process` object. This object is a global that provides information about, and control over, the current process. As a global, it is always available to applications without using require().

See also: [main process](#main-process), [renderer process](#renderer-process)



### renderer process

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. كما يمكن إخفاؤها.

In normal browsers, web pages usually run in a sandboxed environment and are not allowed access to native resources. Electron users, however, have the power to use Node.js APIs in web pages allowing lower level operating system interactions.

See also: [process](#process), [main process](#main-process)



### سنجاب

السنجاب هو إطار مفتوح المصدر الذي يمكن تطبيقات إلكترون لتحديث تلقائيا كما يتم الافراج عن الإصدارات الجديدة. انظر [autoUpdater][] API لمزيد من المعلومات حول الشروع في العمل مع السنجاب.



### userland

هذا المصطلح نشأ في مجتمع Unix، حيث "userland" أو "userspace" تشير إلى البرامج التي تعمل خارج نواة نظام التشغيل. في الآونة الأخيرة، تم تعميم هذا المصطلح في مجتمع Node. js npm ل التمييز بين الميزات المتوفرة في "node core" مقابل حزم نشرت إلى سجل npm من قبل مجتمع "أكبر بكثير".

مثل node، الالكترون تركز على وجود مجموعة صغيرة من واجهات برمجة التطبيقات التي توفر جميع الأوليات اللازمة تطوير تطبيقات سطح المكتب منصة متعددة. فلسفة التصميم هذه تسمح للإلكترون لتبقى أداة مرنة دون إفراط في وصف كيفية استخدامها. Userland تمكن المستخدمين من إنشاء وتبادل الأدوات التي توفر وظائف إضافية علاوة على ما هو متوفر في "core".



### V8

V8 هو محرك جافا سكريبت مفتوح المصدر الخاص بجوجل. يكتب في C++ ويستخدم في Google Chrome. V8 يمكن تشغيل المحتويات بمفردها، أو يمكن إدماجها في أي تطبيق C+++.

بني الإلكترون V8 كجزء من كروميوم ثم يشير node إلى V8 عندما تم البناء.

أرقام الإصدار V8 تتوافق دائما مع أرقام Google Chrome. يحتوي Chrome 59 V8 5.9, Chrome 58 على V8 5.8, الخ.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)



### معرض الويب

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. أنها لا تملك نفس الأذونات كصفحة ويب الخاصة بك، وكل التفاعلات بين التطبيق والمحتوى المضمن الخاص بك سوف تكون غير متزامنة. وهذا يبقى التطبيق الخاص بك في مأمن من محتوى مضمن.

[إضافات]: https://nodejs.org/api/addons.html
[asar]: https://github.com/electron/asar
[autoUpdater]: api/auto-updater.md
[وحدة "محتوى الكروم"]: https://www.chromium.org/developers/content-module
[electron-builder]: https://github.com/electron-userland/electron-builder
[Mac App Store Submission Guide]: tutorial/mac-app-store-submission-guide.md
[main]: #main-process
[renderer]: #renderer-process
[Using Native Node Modules]: tutorial/using-native-node-modules.md
[V8]: #v8
