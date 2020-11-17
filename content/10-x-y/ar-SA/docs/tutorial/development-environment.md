# بيئة المطور

البرمجة بواسطة "Electron" هي بالأساس البرمجة بإستعمال "Node.js". من أجل حعل نظام التشغيل الخاص بك قادرا على بناء تطبيقات سطح المكتب بواسطة "Electron"، يستوجب أن يكون إطار العمل "Node.js" متوفرا، إلى جانب "npm"، محرر أكواد من إختيارك، و يجدر الذكر أن الخبرة في التعامل مع الأوامر تعد نقطة إيجابية.

## اعداد نظام تشغيل الماك (macOS)

> "Electron" يدعم نظام التشغيل "Mac Os 10.10" المعروف بـ (Yosemite) و جميع الإصدارات اللاحقة. Apple does not allow running macOS in virtual machines unless the host computer is already an Apple computer, so if you find yourself in need of a Mac, consider using a cloud service that rents access to Macs (like [MacInCloud][macincloud] or [xcloud](https://xcloud.me)).

أولا، عليك تثبيت إصدار حديث من "Node.js". ننصحك بأن تختار بين الخيارين التاليان، إما `LTS` و التي تعني أحدث إصدار ثابت أو `Current` و التي تعني الإصدار الأخير المتوفر حاليا.</0>. قم بزيارة [الموقع الرسمي لـ "Node.js"][node-download] و تحميل النسخة الخاصة بنظام الـ "Mac Os". بينما يكون "Homebrew" خيارا مطروحا للإستعمال، إلا أننا ننصحك بعدم إستعماله في هذه الحالة لسبب إمكانية كون العديد من الأدوات غير قادرة على العمل إلى جانبه.

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

> يدعم إلكترون Windows 7 والإصدارات اللاحقة - محاولة تطوير تطبيقات إلكترون على الإصدارات السابقة من ويندوز لن تعمل. Microsoft provides free [virtual machine images with Windows 10][windows-vm] for developers.

أولا، عليك تثبيت إصدار حديث من "Node.js". ننصحك بأن تختار بين الخيارين التاليان، إما `LTS` و التي تعني أحدث إصدار ثابت أو `Current` و التي تعني الإصدار الأخير المتوفر حاليا.</0>. Visit [the Node.js download page][node-download] and select the `Windows Installer`. بمجرد إنتهاء التحميل، قم بتثبيت البرنامج و ذلك بمساعدة التوجيهات.

على الشاشة التي تسمح لك بتكوين التثبيت، تأكد من تحديد عقدة `s يتم تشغيل`، `npm مدير الحزمة`، و `إضافة إلى PATH` خيارات.

عند الإنتهاء من التثبيت، قم بالتثبت أن كل شيء يعمل بشكل جيد. العثور على Windows PowerShell عن طريق فتح قائمة البدء وكتابة `PowerShell`. افتح لأعلى `PowerShell` أو أي عميل من إختيارك لتأكيد أن كل من `عقدة` و `npm` متاحة:

```powershell
# هذا الأمر يجب أن يظهر لك إصدار الـnode المتوفر على جهازك
node -v

# هذا الأمر يجب أن يظهر لك إصدار الـnpm المتوفر على جهازك
npm -v
```

إن قامتا كلا الأمرين بطباعة أعداد، فهنيئا! قبل البداية، يفضل منك تنصيب محرر أكواد يدعم البرمجة بـJavaScript.

## اعداد نظام لينكس (Linux)

> بشكل عام، يدعم إلكترون Ubuntu 12.04, Fedora 21, Debian 8 وما بعدها.

أولا، عليك تثبيت إصدار حديث من "Node.js". اعتمادا على توزيع لينكس الخاص بك، قد تختلف خطوات التثبيت. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux][node-package].

أنت تقوم بتشغيل لينوكس، لذلك من المحتمل أن تعرف بالفعل كيفية تشغيل عميل سطر الأوامر قم بفتح العميل المفضل لديك وتأكيد أن كلا من `العقدة` و `npm` متاحان عالمياً:

```sh
# هذا الأمر يجب أن يظهر لك إصدار الـnode المتوفر على جهازك
node -v

# هذا الأمر يجب أن يظهر لك إصدار الـnpm المتوفر على جهازك
npm -v
```

إن قامتا كلا الأمرين بطباعة أعداد، فهنيئا! قبل البداية، يفضل منك تنصيب محرر أكواد يدعم البرمجة بـJavaScript.

## محرر جيد

We might suggest two free popular editors built in Electron: GitHub's [Atom][atom] and Microsoft's [Visual Studio Code][code]. كلا لديهم دعم ممتاز من جافا سكريبت.

إذا كنت أحد المطورين العديدين مع تفضيلات قوية، معرفة أن تقريبا جميع محرري التعليمات البرمجية و IDEs هذه الأيام تدعم جافا سكريبت.

[macincloud]: https://www.macincloud.com/
[node-download]: https://nodejs.org/en/download/
[node-download]: https://nodejs.org/en/download/
[node-package]: https://nodejs.org/en/download/package-manager/
[atom]: https://atom.io/
[code]: https://code.visualstudio.com/
[windows-vm]: https://developer.microsoft.com/en-us/windows/downloads/virtual-machines
