# توقيع الكود

توقيع الكود هو تقنية أمان تستعملها للتحقق من أن التطبيق تم إنشاؤه من قبلك.

في نظام macOS يمكن أن يكتشف النظام أي تغيير في التطبيق، سواء كان التغيير مقدماً عن طريق الخطأ أو بواسطة الكود الخبيث.

على Windows، يقوم النظام بتعيين مستوى ثقة إلى شهادة توقيع الكود الخاص بك إذا لم يكن لديك، أو إذا كان مستوى ثقتك منخفضاً، سوف يتسبب في ظهور مربعات الحوار عند بدء المستخدمين في استخدام التطبيق.  مستوى الثقة يبني مع مرور الوقت حتى يكون من الأفضل بدء توقيع التعليمات البرمجية في أقرب وقت ممكن.

وفي حين أنه من الممكن توزيع التطبيقات غير الموقعة، فإنه لا يوصى بها. كل من Windows و macOS سيمنعان، بشكل افتراضي، إما تحميل أو تنفيذ التطبيقات غير الموقعة. بدءاً بـ macOS Catalina (الإصدار 10.15)، يجب على المستخدمين الذهاب عبر خطوات يدوية متعددة لفتح التطبيقات غير الموقعة.

![تحذير كاتالينا كاتالينا: لا يمكن فتح التطبيق لأنه لا يمكن التحقق من المطور
](../images/gatekeeper.png)

كما ترى، يحصل المستخدمين على خيارين: نقل التطبيق مباشرة إلى سلة المهملات أو إلغاء تشغيله. لا تريد مستخدميك رؤية علبة الحوار هذه.

إذا كنت تقوم ببناء تطبيق إلكترون الذي تنوي حزمه وتوزيعه، يجب أن يتم التوقيع على الرموز.

# تسجيل & توثيق إصدارات macOS

يتطلب الإعداد الصحيح لتطبيقات macOS للإصدار خطوتين: أولاً، يحتاج التطبيق إلى توقيع الرموز. ثم يحتاج التطبيق إلى رفعه إلى Apple من أجل عملية تسمى "التوثيق"، حيث ستتحقق الأنظمة الآلية كذلك من أن تطبيقك لا يفعل أي شيء لتعريض مستخدميه للخطر.

لبدء العملية، تأكد من استيفاء متطلبات التسجيل و توثيق التطبيق الخاص بك:

1. التسجيل في [برنامج مطور التفاح](https://developer.apple.com/programs/) (يتطلب رسم سنوي)
2. تحميل وتثبيت [Xcode](https://developer.apple.com/xcode) - هذا يتطلب جهاز كمبيوتر يعمل بنظام macOS
3. إنشاء وتنزيل وتثبيت [توقيع الشهادات](https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates)

النظام الإيكولوجي لشركة Electron's يفضل التكوين والحرية، لذلك هناك طرق متعددة للحصول على توقيع وتوثيق تطبيقك.

## `electron-forge`

إذا كنت تستخدم أداة البناء المفضلة لـ Electron، فإن الحصول على توقيع التطبيق والتوثيق يتطلب بعض الإضافات إلى الإعدادات الخاصة بك. [Forge](https://electronforge.io) هي مجموعة أدوات إلكترون الرسمية، باستخدام [`e-packager`]، [`علامة إلكترون-osx-sign`]، و [``موثق إلكترونياً] تحت السماعة.

دعونا نلقي نظرة على الإعدادات مع جميع الحقول المطلوبة. ليس كل منهم مطلوب: الأدوات ستكون ذكية بما فيه الكفاية للعثور تلقائياً على `هوية مناسبة`، على سبيل المثال، لكننا نوصي بأن تكون صريحا.

```json
{
  "الاسم": "my-app",
  "الاصدار": "0.0. ",
  "config": {
    "نسي: {
      "packagerConfig": {
        "osxSign": {
          "الهوية": "تطبيق معرف المطور: فيليكس ريزيبيرغ (LT94ZKYDCJ)",
          "وقت التشغيل الصلب": صحيح,
          "الاستحقاقات": "الاستحقاقات. قائمة"،
          "الاستحقاقات - الميراث": "الاستحقاقات. قائمة"،
          "أعلام التوقيع": "المكتبة"
        }،
        "osxNotarize": {
          "appleId": "felix@felix. un",
          "appleIdPassword": "my-apple-id-passd",
        }

    }
  }
}
```

الملف `plist` المشار إليه هنا يحتاج إلى الاستحقاقات التالية لـ macOS- لضمان آليات أمان Apple أن التطبيق الخاص بك يقوم بهذه الأشياء دون أن يعني أي ضرر:

```xml
<?xml version="1.0" ترميز UTF-8"?>
<!DOCTYPE plist PUBLIC "-/Apple//DTD PLIST 1.0//EN" "http://www. pple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs. متدنى</key>
    <true/>
    <key>com.apple.security.cs. الذاكرة القابلة للتنفيذ البطيء التوقيع</key>
    <true/>
    <key>com. pple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

لمشاهدة كل هذا في العمل، راجع رمز مصدر إلكترون ، [وخاصة `إلكترون - فورج` تكوين ملف](https://github.com/electron/fiddle/blob/master/forge.config.js).

If you plan to access the microphone or camera within your app using Electron's APIs, you'll also need to add the following entitlements:

```xml
<key>com.apple.security.device.audio-input</key>
<true/>
<key>com.apple.security.device.camera</key>
<true/>
```

إذا كانت هذه غير موجودة في مستحقات التطبيق الخاص بك عند الاستدعاء، على سبيل المثال:

```js
const { systemPreferences } = مطلوبة ('electron')

ميكروفون = systemPreferences.askForMediaAccess('microphone')
```

قد يتعطل تطبيقك. راجع قسم الوصول إلى الموارد في [وقت التشغيل الصلب](https://developer.apple.com/documentation/security/hardened_runtime) لمزيد من المعلومات والاستحقاقات التي قد تحتاج إليها.

## `electron-builder`

مصنع إلكترون يأتي مع حل مخصص للتوقيع على تطبيقك. يمكنك العثور على [وثائقها هنا](https://www.electron.build/code-signing).

## `electron-packager`

إذا كنت لا تستخدم خط أنابيب بناء متكامل مثل Forge أو Builder، فأنت على الأرجح تستخدم [`electron-packager`]، والذي يتضمن [`التوقيع الإلكتروني - osx-sign`] و [`التوثيق الإلكتروني`].

إذا كنت تستخدم واجهة برمجة تطبيقات الحزمة، يمكنك تمرير [في التكوين الذي يوقع ويوثِّق تطبيقك ](https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html).

```js
حزمة التعبئة = مطلوبة ('electron-packager')

حزمة ({
  dir: '/path/to/my/app',
  osxSign: {
    هوية: 'تطبيق معرف المطور: Felix Rieseberg (LT94ZKYDCJ)',
    'فترة التشغيل الصعبة': حقيقة،
    استحقاقات: 'استحقاقات. قائمة',
    'الاستحقاقات' 'الإرث': 'الاستحقاقات'. قائمة',
    'signature-flags': 'المكتبة'
  },
  osxNotarize: {
    appleId: 'felix@felix. un',
    appleIdPassword: 'my-apple-id-passd'
  }
})
```

الملف `plist` المشار إليه هنا يحتاج إلى الاستحقاقات التالية لـ macOS- لضمان آليات أمان Apple أن التطبيق الخاص بك يقوم بهذه الأشياء دون أن يعني أي ضرر:

```xml
<?xml version="1.0" ترميز UTF-8"?>
<!DOCTYPE plist PUBLIC "-/Apple//DTD PLIST 1.0//EN" "http://www. pple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs. متدنى</key>
    <true/>
    <key>com.apple.security.cs. الذاكرة القابلة للتنفيذ البطيء التوقيع</key>
    <true/>
    <key>com. pple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

## Mac App ore

انظر الى [ دليل متجر التطبيقات Mac](mac-app-store-submission-guide.md).

# توقيع إنشاء Windows

قبل التوقيع بناءات Windows، يجب عليك القيام بما يلي:

1. احصل على شهادة توقيع رمز مصادقة Windows (يتطلب رسم سنوي)
2. قم بتثبيت Visual Studio للحصول على أداة التوقيع (الطبعة المجانية [للمجتمع ](https://visualstudio.microsoft.com/vs/community/) تكفي)

يمكنك أخذ كود مصادقة موقعة من الكثير من الموزعين. تختلف الأسعار، لذا قد يكون من المفيد أن تتسوق حولك. تحتوي على البائعين الشائعين:

* [رقمي](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Sectigo](https://sectigo.com/ssl-certificates-tls/code-signing)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* من بين الآخرين، يرجى التسوق للعثور على واحد يناسب احتياجاتك، جوجل هو صديقك 😄

يوجد رقم للأداة لأجل توقيع حزمة تطبيقك:

* [`electron-winstaller`] سيقوم بإنشاء مثبت للنوافذ وقم بالتوقيع عليه لـ أنت
* [`Electron-forge`] يمكن توقيع مثبتات يولدها من خلال Squirrel.Windows أو MSI.
* [`وحدة الإنشاء الإلكتروني`] يمكن توقيع بعض أهداف النوافذ

## متجر تطبيقات Windows

انظر الى[دليل متجر Windows](windows-store-guide.md).
