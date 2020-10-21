# Supporting macOS Dark Mode

في macOS 10.14 Mojave، قدمت Apple وضع [مظلم جديد على نطاق المنظومة](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) لجميع حواسيب macOS.  If your Electron app has a dark mode, you can make it follow the system-wide dark mode setting using [the `nativeTheme` api](../api/native-theme.md).

في macOS 10.15 كاتالينا، قدمت Apple خيار "تلقائي" في الوضع المظلم لجميع حواسيب macOS. من أجل `الموضوع الأصلي. HoldUseDarkColors` و `Tray` APIs للعمل بشكل صحيح في هذا الوضع على كاتالينا، تحتاج إما أن يكون لديك `NSquiresAquaSystemAppeition` تعيين إلى `false` في `معلومات. قائمة` ملف، أو أن يكون على إلكترون `>=7.0.0`. كل من [حزمة إلكترون](https://github.com/electron/electron-packager) و [تصنيع إلكترون](https://www.electronforge.io/) لديه [`DarwinDarkModeSupport` خيار](https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport) أتمتة `معلومات. قائمة` التغييرات أثناء وقت إنشاء التطبيق.

## تحديث الواجهات الأصلية تلقائياً

"واجهات أصلية" تشمل منتقي الملفات، حدود النافذة، مربعات الحوار، قوائم السياق، وأكثر من ذلك؛ أساسا، أي شيء حيث يأتي واجهة المستخدم من macOS وليس التطبيق الخاص بك. ابتداء من إلكترون 7.0.0، السلوك الافتراضي هو اختيار هذا الموضوع التلقائي من نظام التشغيل. إذا كنت ترغب في الانسحاب وتستخدم إلكترون
&gt; 8.0. ، يجب عليك تعيين `مفتاح NSquiresAquaSystemAppe<unk>` في `Info.plist` الملف إلى `صحيح`. يرجى ملاحظة أن إلكترون 8.0.0 وما فوق لن تسمح لك بالتخلي عن هذا الموضوع، بسبب استخدام macOS 10.14 SDK.

## تحديث الواجهات الخاصة بك تلقائياً

إذا كان للتطبيق الخاص بك وضع داكن خاص به، فيجب عليك تبديله وإيقاف تشغيله بالتزامن مع إعداد الوضع المظلم للنظام. يمكنك القيام بذلك من خلال الاستماع إلى الحدث المحدَّث على قالب إلكروون `الأصلي` وحدة

وعلى سبيل المثال:

```javascript
const { nativeTheme } = مطلوب('electron')

nativeTheme.on('updated', function theThemeHasChanged () {
  updateMyAppTheme(nativeTheme.shouldUseDarkColors)
})
```
