# DevTools Extension

يدعم إلكترون [ملحق Chrome DevTools](https://developer.chrome.com/extensions/devtools)، الذي يمكن استخدامه لتوسيع قدرة الأدوات على تصحيح أخطاء أطر الويب الشعبية.

## كيفية تحميل ملحق DevTools

وتوجز هذه الوثيقة عملية تحميل التمديد يدوياً. يمكنك أيضًا تجربة [Electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer)، أداة طرف ثالث تقوم بتنزيل الإضافات مباشرة من متجر Chrome WebStore.

لتحميل ملحق في إلكترون، تحتاج إلى تنزيله في متصفح كروم، حدد موقع مسار نظام الملفات، ثم قم بتحميله عن طريق الاتصال بـ `متصفح Window. ddDevToolsExtension(extension)` API.

استخدام [أدوات مطور React](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) على سبيل المثال:

1. تثبيته في متصفح Chrome.
1. انتقل إلى `chrome://extensions`، وابحث عن معرف ملحقه، وهو عبارة عن سلسلة تجزئة مثل `fmkadmapgofadopljbjfkapdkoienihi`.
1. اعرف موقع نظام الملفات المستخدم من قبل Chrome لتخزين الملحقات:
   * على ويندوز هو `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Exextent`;
   * في Linux يمكن أن يكون:
     * `~/.config/google-chrome/Default/Extensions/`
     * `~/.config/google-chrome-beta/Default/Extensions/`
     * `~/.config/google-chrome-canary/Default/Extensions/`
     * `~/.config/chromium/Default/Extensions/`
   * على macOS هو `~/Library/Application Support/Google/Chrome/Default/Exextent`.
1. اجتياز موقع الملحق إلى `BrowserWindow.addDevToolsExexten` API، لأدوات React المطور، إنه شيء مثل:

   ```javascript
   المسار = المطلوب('path')
   const os = require('os')

   BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.3.0_0')

   ```

**ملاحظة:** `BrowserWindow.addDevToolsExexten` لا يمكن استدعاء API قبل أن ينبعث الحدث الجاهز من وحدة التطبيق.

سيتم تذكر الملحق حتى تحتاج فقط إلى استدعاء واجهة برمجة التطبيقات هذه مرة واحدة لكل ملحق إذا حاولت إضافة ملحق تم تحميله مسبقا، هذه الطريقة لن تعود وبدلا من ذلك قم بتسجيل تحذير إلى وحدة التحكم.

### كيفية إزالة ملحق DevTools

يمكنك تمرير اسم الملحق إلى `BrowserWindow.removeDevToolsExexten` API لإزالته. يتم إرجاع اسم الملحق من قبل `المتصفح ويندوز. ddDevToolsExexten` ويمكنك الحصول على أسماء جميع ملحقات DevTools المثبتة باستخدام `BrowserWindow.getDevToolsExexten` API.

## ملحقات الأدوات المدعومة

يدعم إلكترون فقط مجموعة محدودة من `كروم.*` API، لذلك بعض الملحقات باستخدام كروم `غير مدعوم.` قد لا تعمل واجهات برمجة التطبيقات لميزات تمديد الكروم. يتم اختبار ملحقات Devtools وضمان العمل في Electron:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [أدوات مطور React](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [تصحيح الأخطاء الخلفية](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [مصحح أخطاء jQuery](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [مصحح الدماغ](https://cerebraljs.com/docs/introduction/devtools.html)
* [تقليل ملحق الأدوات](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [أدوات مطور MobX](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### ماذا علي أن أفعل إذا كان ملحق أدوات DevTools لا يعمل؟

أولاً يرجى التأكد من استمرار الحفاظ على الإضافة، بعض الملحقات لا يمكن أن تعمل حتى للإصدارات الأخيرة من متصفح Chrome ، ونحن غير قادرين على القيام بأي شيء من أجلهم.

ثم قم بتسجيل خطأ في قائمة مشكلات Electron، ووصف أي جزء من الملحق لا يعمل كما هو متوقع.
