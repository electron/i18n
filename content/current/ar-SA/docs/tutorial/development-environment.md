# محيط البرمجة

البرمجة بواسطة "Electron" هي بالأساس البرمجة بإستعمال "Node.js". من أجل حعل نظام التشغيل الخاص بك قادرا على بناء تطبيقات سطح المكتب بواسطة "Electron"، يستوجب أن يكون إطار العمل "Node.js" متوفرا، إلى جانب "npm"، محرر أكواد من إختيارك، و يجدر الذكر أن الخبرة في التعامل مع الأوامر تعد نقطة إيجابية.

## اعداد نظام تشغيل الماك (macOS)

> "Electron" يدعم نظام التشغيل "Mac Os 10.10" المعروف بـ (Yosemite) و جميع الإصدارات اللاحقة. "Apple" لا تتيح إمكانية تشغيل نظامها كنظام إفتراضي ما لم يكن الجهاز المستضيف هو بالأساس أحد أجهزتها، لذا إن وجدت نفسك في حاجة لحاسوب من حواسيب "Apple"، عليك إستعمال خدمة "Cloud" التي تتيح لك الحصول على إذن التحكم لأجهزة "Mac Os".

أولا، عليك تثبيت إصدار حديث من "Node.js". ننصحك بأن تختار بين الخيارين التاليان، إما `LTS` و التي تعني أحدث إصدار ثابت أو `Current` و التي تعني الإصدار الأخير المتوفر حاليا.</0>. قم بزيارة [الموقع الرسمي لـ "Node.js"](https://nodejs.org/en/download/) و تحميل النسخة الخاصة بنظام الـ "Mac Os". بينما يكون "Homebrew" خيارا مطروحا للإستعمال، إلا أننا ننصحك بعدم إستعماله في هذه الحالة لسبب إمكانية كون العديد من الأدوات غير قادرة على العمل إلى جانبه.

بمجرد إنتهاء التحميل، قم بتثبيت البرنامج و ذلك بمساعدة التوجيهات.

عند الإنتهاء من التثبيت، قم بالتثبت أن كل شيء يعمل بشكل جيد. قم بإستعمال الـ "Terminal" من أجل التحقق من توفر node و npm من خلال الأوامر التالية. :

```sh
# هذا الأمر يجب أن يظهر لك إصدار الـnode المتوفر على جهازك
node -v

# هذا الأمر يجب أن يظهر لك إصدار الـnpm المتوفر على جهازك
npm -v
```

إن قامتا كلا الأمرين بطباعة أعداد، فهنيئا! قبل البداية، يفضل منك تنصيب محرر أكواد يدعم البرمجة بـJavaScript.

## اعداد نظام الويندوز (Windows)

> Electron supports Windows 7 and later versions – attempting to develop Electron applications on earlier versions of Windows will not work. Microsoft provides free [virtual machine images with Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) for developers.

أولا، عليك تثبيت إصدار حديث من "Node.js". ننصحك بأن تختار بين الخيارين التاليان، إما `LTS` و التي تعني أحدث إصدار ثابت أو `Current` و التي تعني الإصدار الأخير المتوفر حاليا.</0>. Visit [the Node.js download page](https://nodejs.org/en/download/) and select the `Windows Installer`. بمجرد إنتهاء التحميل، قم بتثبيت البرنامج و ذلك بمساعدة التوجيهات.

On the screen that allows you to configure the installation, make sure to select the `Node.js runtime`, `npm package manager`, and `Add to PATH` options.

عند الإنتهاء من التثبيت، قم بالتثبت أن كل شيء يعمل بشكل جيد. Find the Windows PowerShell by opening the Start Menu and typing `PowerShell`. Open up `PowerShell` or another command line client of your choice and confirm that both `node` and `npm` are available:

```powershell
# هذا الأمر يجب أن يظهر لك إصدار الـnode المتوفر على جهازك
node -v

# هذا الأمر يجب أن يظهر لك إصدار الـnpm المتوفر على جهازك
npm -v
```

إن قامتا كلا الأمرين بطباعة أعداد، فهنيئا! قبل البداية، يفضل منك تنصيب محرر أكواد يدعم البرمجة بـJavaScript.

## اعداد نظام لينكس (Linux)

> Generally speaking, Electron supports Ubuntu 12.04, Fedora 21, Debian 8 and later.

أولا، عليك تثبيت إصدار حديث من "Node.js". Depending on your Linux distribution, the installation steps might differ. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux](https://nodejs.org/en/download/package-manager/).

You're running Linux, so you likely already know how to operate a command line client. Open up your favorite client and confirm that both `node` and `npm` are available globally:

```sh
# هذا الأمر يجب أن يظهر لك إصدار الـnode المتوفر على جهازك
node -v

# هذا الأمر يجب أن يظهر لك إصدار الـnpm المتوفر على جهازك
npm -v
```

إن قامتا كلا الأمرين بطباعة أعداد، فهنيئا! قبل البداية، يفضل منك تنصيب محرر أكواد يدعم البرمجة بـJavaScript.

## A Good Editor

We might suggest two free popular editors built in Electron: GitHub's [Atom](https://atom.io/) and Microsoft's [Visual Studio Code](https://code.visualstudio.com/). Both of them have excellent JavaScript support.

If you are one of the many developers with a strong preference, know that virtually all code editors and IDEs these days support JavaScript.
