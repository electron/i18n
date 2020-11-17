# Supporting macOS Dark Mode

في macOS 10.14 Mojave، قدمت Apple وضع [مظلم جديد على نطاق المنظومة](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) لجميع حواسيب macOS.  If your Electron app has a dark mode, you can make it follow the system-wide dark mode setting using [the `nativeTheme` api](../api/native-theme.md).

في macOS 10.15 كاتالينا، قدمت Apple خيار "تلقائي" في الوضع المظلم لجميع حواسيب macOS. من أجل `الموضوع الأصلي. HoldUseDarkColors` و `Tray` APIs للعمل بشكل صحيح في هذا الوضع على كاتالينا، تحتاج إما أن يكون لديك `NSquiresAquaSystemAppeition` تعيين إلى `false` في `معلومات. قائمة` ملف، أو أن يكون على إلكترون `>=7.0.0`. Both [Electron Packager][electron-packager] and [Electron Forge][electron-forge] have a [`darwinDarkModeSupport` option][packager-darwindarkmode-api] to automate the `Info.plist` changes during app build time.

## تحديث الواجهات الأصلية تلقائياً

"Native Interfaces" include the file picker, window border, dialogs, context menus and more; basically, anything where the UI comes from macOS and not your app. As of Electron 7.0.0, the default behavior is to opt in to this automatic theming from the OS. إذا كنت ترغب في الانسحاب وتستخدم إلكترون
&gt; 8.0. ، يجب عليك تعيين `مفتاح NSquiresAquaSystemAppe<unk>` في `Info.plist` الملف إلى `صحيح`. يرجى ملاحظة أن إلكترون 8.0. وما فوق لن يسمح لك بالخروج من هذا الموضوع، بسبب استخدام MacOS 10.14 SDK.

## تحديث الواجهات الخاصة بك تلقائياً

إذا كان للتطبيق الخاص بك وضع داكن خاص به، فيجب عليك تبديله وإيقاف تشغيله بالتزامن مع إعداد الوضع المظلم للنظام. يمكنك القيام بذلك من خلال الاستماع إلى الحدث المحدَّث على قالب إلكروون `الأصلي` وحدة

وعلى سبيل المثال:

```javascript
const { nativeTheme } = مطلوب('electron')

nativeTheme.on('updated', function theThemeHasChanged () {
  updateMyAppTheme(nativeTheme.shouldUseDarkColors)
})
```

[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[packager-darwindarkmode-api]: https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport
