# اختبار Widevine CDM

في إلكترون يمكنك استخدام مكتبة Widevine CDM المشحونة مع متصفح Chrome .

وحدات فك تشفير المحتوى على نطاق واسع (CDMs) هي كيف تحمي خدمات البث محتوى باستخدام فيديو HTML5 لمتصفحات الويب دون الاعتماد على البرنامج المساعد NPAPI مثل فلاش أو Silverlight. الدعم الواسع النطاق هو حل بديل لـ خدمات البث التي تعتمد حاليا على Silverlight لتشغيل محتوى الفيديو المحمي DRM. سيسمح للمواقع بعرض محتوى الفيديو المحمي DRM في Firefox دون استخدام إضافات NPAPI. تعمل آلية التنمية النظيفة على نطاق واسع في صندوق رملي مفتوح المصدر لآلية التنمية النظيفة يوفر أمان أفضل للمستخدمين من الإضافات NPAPI.

#### ملاحظة على VMP

اعتبارا من [`إلكترون v1.8. (Chrome v59)`](https://electronjs.org/releases#1.8.1)، الخطوات التالية قد تكون بعض الخطوات الضرورية لتمكين Widevine؛ قد يحتاج أي تطبيق عند أو بعد ذلك الإصدار الذي يعتزم استخدام آلية التنمية النظيفة إلى أن يوقع باستخدام ترخيص تم الحصول عليه من [Widevine](https://www.widevine.com/) نفسه.

لكل [وايفين](https://www.widevine.com/):

> يتضمن Chrome 59 (وما بعد) الدعم لمسار الوسائط المتحقق منه. يوفر VMP طريقة للتحقق من صحة منصة الجهاز. من أجل عمليات النشر في المتصفح، سيوفر هذا إشارة إضافية لتحديد ما إذا كان التنفيذ القائم على المتصفح موثوقا ومأمنا.
> 
> تم تحديث دليل التكامل الوكيل مع معلومات حول VMP و كيفية إصدار التراخيص.
> 
> ويوصي Widevine بتكاملتنا القائمة على المتصفح (البائعون و تطبيقات القائمة على المتصفح) إضافة دعم لـ VMP.

لتمكين تشغيل الفيديو مع هذا التقييد الجديد، [castLabs](https://castlabs.com/open-source/downstream/) أنشأ [fork](https://github.com/castlabs/electron-releases) الذي نفذ التغييرات الضرورية لتمكين Widevine من أن يتم تشغيله في تطبيق إلكترون إذا كان قد حصل على التراخيص اللازمة من على نطاق واسع.

## الحصول على المكتبة

افتح `chrome://components/` في متصفح كروم، ابحث عن `وحدة فك تشفير المحتوى على نطاق واسع` وتأكد من تحديثها، ثم يمكنك العثور على ملفات المكتبة من دليل التطبيق.

### على Windows

ملف المكتبة `wivinecdm.dll` سيكون تحت `ملفات البرنامج (x86)/Google/Chrome/Application/CHROME_VERSION/WidevineCdm/_platform_specific/win_(x86<unk> x64)/`

### On MacOS

ملف المكتبة `libwidevinecdm.dylib` سيكون تحت `/Applications/Google Chrome.app/Contents/Versions/CHROME_VERSION/Google Chrome Framework.framework/Versions/A/Libraries/WidevineCdm/_platform_specific/mac_(x86<unk> x64)/`

**ملاحظة:** تأكد من أن إصدار الكروم المستخدم من قبل Electron أكبر من أو يساوي `min_chrome_version` من قيمة مكون cdm واسع النطاق لـ Chrome. يمكن العثور على القيمة في `manifest.json` تحت `دليل WidevineCdm`.

## استخدام المكتبة

بعد الحصول على ملفات المكتبة ، يجب عليك تمرير المسار إلى الملف مع `--broad vine-cdm-path` مفتاح سطر الأوامر، و نسخة المكتبة مع مفتاح `--broad vine-cdm-version` يجب أن يتم تمرير مفاتيح تبديل سطر الأوامر قبل أن يتم انبعاث الوحدة النمطية `` الحدث الجاهز من `التطبيق`.

رمز مثال:

```javascript
خلال { app, BrowserWindow } = مطلوبة ('electron')

// يجب عليك اجتياز الدليل الذي يحتوي على مكتبة واسعة النطاق هنا، هو
/ * `libwivinecdm. ylib` على macOS،
/* `broad vinecdm.dll` على Windows.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevine_library')
// يمكن الحصول على نسخة الإضافات من صفحة `chrome://components' في Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.on('ready', () => {
  win = new BrowserWindow()
  win.show()
})
```

## التحقق من دعم آلية التنمية النظيفة

للتحقق مما إذا كان يعمل على نطاق واسع، يمكنك استخدام الطرق التالية:

* افتح https://shaka-player-demo.appspot.com/ وتحميل بيان يستخدم `Widevine`.
* افتح http://www.dash-player.com/demo/drm-test-area/، تحقق مما إذا كانت الصفحة تقول `bitdash تستخدم Widevine في متصفحك`، ثم قم بتشغيل الفيديو.
