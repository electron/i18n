# المعجم

تعرف هذه الصفحة بعض المصطلحات التي يشيع استخدامها في تطوير الإلكترون.

### أرشيف تنسيق أتوم شيل

أسار تعني أرشيف تنسيق أتوم شيل. [إسار](https://github.com/electron/asar) هو أرشيف بسيط `تار`- مثل صيغة تار التي تدمج عدة ملفات في ملف واحد. الإلكترون يمكن قراءة ملفات تعسفية منه دون تفريغ الملف بأكمله.

أنشئ تنسيق ASAR في المقام الأول لتحسين الأداء على ويندوز

### CRT

مكتبة وقت التشغيل C (CRT) هو الجزء من "مكتبة c + + القياسية" التي تتضمن المكتبة القياسية إيزو C99. مكتبات Visual c + + التي تنفذ CRT ، وكل التعليمات البرمجية الأصلية والمداره مختلطة، والتعليمات البرمجية المدارة خالصة للتنمية.NET.

### DMG

أبل ديسك هو نضام تعبئة او تخزين يستخدم من قبل نضام ماكنتوش. ملفات DMG تستخدم عادة لتوزيع التطبيق "التركيب". [electron-builder](https://github.com/electron-userland/electron-builder) يدعم `dmg` كهدف بناء.

### IME

محرر الكتابة. برنامج يسمح للمستخدمين بإدخال الأحرف والرموز التي لم يتم العثور عليها في لوحة المفاتيح. على سبيل المثال، هذا يسمح لمستخدمي لوحات المفاتيح اللاتينية إدخال الأحرف الصينية واليابانية، والكورية والهندية.

### IDL

لغة وصف الواجهة. كتابة تعريف الـ function وأنواع بيانات بتنسيق يمكن استخدامه لإنشاء واجهات في Java و C ++ و JavaScript وغيرها.

### IPC

إيبك تعني الاتصالات بين العملية. يستخدم الإلكترون إيبك لإرسال رسائل جسون المسلسلة بين عمليات  الرئيسية </ 0> و  renderer</ 1>.</p> 

### libchromiumcontent

مكتبة مشتركة تشمل [وحدة "محتوى الكروم"](https://www.chromium.org/developers/content-module) وكافة التبعيات الخاصة به (مثلاً، الطرفة، [V8](#v8)، إلخ.). كما يشار إليها ب "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### العملية الرئيسية

العملية الرئيسية، عادة ملف اسمه `main.js`، هي نقطة الدخول لتطبيق كل إلكترون. أنها تسيطر على اللتطبيق، من فتح إغلاق. وتدير أيضا العناصر الأصلية مثل القائمة وشريط القوائم،إلخ. العملية الرئيسية هي المسؤولة عن خلق كل عملية عارض جديد في التطبيق. تم إنشاء واجهة برمجة تطبيقات بالكامل.

يتم تحديد ملف العملية الرئيسي لكل تطبيق في الخاصية ` الرئيسية </ 0> في
<code> package.json </ 0>. هذه هي طريقة <code> الإلكترون. </ 0> يعرف ما الملف لتنفيذ عند بدء التشغيل.</p>

<p>في كروميوم، يشار إلى هذه العملية باسم "عملية المتصفح". تم إعادة تسميته في إلكترون لتجنب الارتباك مع عمليات العارض.</p>

<p>راجع أيضا: <a href="#process"> عملية </ 0>، <a href="#renderer-process"> عملية العارض </ 1></p>

<h3>MAS</h3>

<p>اختصار لأبل ماك المتجر. للحصول على تفاصيل حول إرسال تطبيقك إلى
ماس، اطلع على <a href="tutorial/mac-app-store-submission-guide.md"> دليل إرسال ماك أب ستور </ 0>.</p>

<h3>Mojo</h3>

<p>نظام IPC للتواصل داخل أو أثناء العملية ، وهذا أمر مهم لأن Chrome حريص على قدرته على تقسيم عمله إلى عمليات منفصلة أو لا ، اعتمادًا على ضغوط الذاكرة وما إلى ذلك.</p>

<p>أنظر https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md</p>

<h3>native modules</h3>

<p>الوحدات المحلية (يطلق عليها أيضاً <a href="https://nodejs.org/api/addons.html">إضافات</a> في Node.js) هي وحدات مكتوبة بلغة C أو C++ والتي يمكن تحمليها في Node.js أو Electron بإستخدام الدالة require()، وتستخدم كأنها وحدة Node.js عادية. They are used primarily to provide an interface
between JavaScript running in Node.js and C/C++ libraries.</p>

<p>Native Node modules are supported by Electron, but since Electron is very
likely to use a different V8 version from the Node binary installed in your
system, you have to manually specify the location of Electron’s headers when
building native modules.</p>

<p>See also <a href="tutorial/using-native-node-modules.md">Using Native Node Modules</a>.</p>

<h3>NSIS</h3>

<p>Nullsoft Scriptable Install System is a script-driven Installer
authoring tool for Microsoft Windows. It is released under a combination of
free software licenses, and is a widely-used alternative to commercial
proprietary products like InstallShield. <a href="https://github.com/electron-userland/electron-builder">electron-builder</a> supports NSIS
as a build target.</p>

<h3>OSR</h3>

<p>OSR (Off-screen rendering) can be used for loading heavy page in
background and then displaying it after (it will be much faster).
It allows you to render page without showing it on screen.</p>

<h3>process</h3>

<p>A process is an instance of a computer program that is being executed. Electron
apps that make use of the <a href="#main-process">main</a> and one or many <a href="#renderer-process">renderer</a> process are
actually running several programs simultaneously.</p>

<p>In Node.js and Electron, each running process has a <code>process` object. This object is a global that provides information about, and control over, the current process. As a global, it is always available to applications without using require().

See also: [main process](#main-process), [renderer process](#renderer-process)

### renderer process

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

In normal browsers, web pages usually run in a sandboxed environment and are not allowed access to native resources. Electron users, however, have the power to use Node.js APIs in web pages allowing lower level operating system interactions.

See also: [process](#process), [main process](#main-process)

### Squirrel

Squirrel is an open-source framework that enables Electron apps to update automatically as new versions are released. See the [autoUpdater](api/auto-updater.md) API for info about getting started with Squirrel.

### userland

This term originated in the Unix community, where "userland" or "userspace" referred to programs that run outside of the operating system kernel. More recently, the term has been popularized in the Node and npm community to distinguish between the features available in "Node core" versus packages published to the npm registry by the much larger "user" community.

Like Node, Electron is focused on having a small set of APIs that provide all the necessary primitives for developing multi-platform desktop applications. This design philosophy allows Electron to remain a flexible tool without being overly prescriptive about how it should be used. Userland enables users to create and share tools that provide additional functionality on top of what is available in "core".

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electron builds V8 as part of Chromium and then points Node to that V8 when building it.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content.