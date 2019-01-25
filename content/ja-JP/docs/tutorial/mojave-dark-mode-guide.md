# Mojave Dark Mode

macOS 10.14 Mojave にて、Apple は新しい [システム全体のダークモード](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) を全ての macOS コンピュータに導入しました。 デフォルトの Electron アプリケーションは、それが有効になっているときでも UI とネイティブインターフェイスを自動的にダークモード設定に調整しません。 これは主に、あなた自身のアプリがダークモードをサポートしていない場合には、ダークモードネイティブインターフェースを使用**すべきではない**という Apple 自身のガイドラインによるものです。

アプリにダークモードが設定されている場合は、Electron アプリにシステム全体のダークモード設定を適用させることができます。

## ネイティブインターフェースを自動的に更新する

"ネイティブインターフェース" にはファイルピッカー、ウインドウの縁、ダイアログ、右クリックメニュー、などの、あなたのアプリではない macOS 由来の基本的な UI が含まれます。 これらのインターフェースを自動的にダークモードに更新するには、アプリの `Info.plist` ファイルの `NSRequiresAquaSystemAppearance` キーを `false` に設定する必要があります。 例

```xml
<plist>
<dict>
  ...
  <key>NSRequiresAquaSystemAppearance</key>
  <false />
  ...
</dict>
</plist>
```

If you are using [`electron-packager` >= 12.2.0](https://github.com/electron-userland/electron-packager) or [`electron-forge` >= 6](https://github.com/electron-userland/electron-forge) you can set the [`darwinDarkModeSupport`](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#darwindarkmodesupport) option when packaging and this key will be set for you.

If you are using [`electron-builder` >= 20.37.0](https://github.com/electron-userland/electron-builder) you can set the [`darkModeSupport`](https://www.electron.build/configuration/mac.html) option.

## Automatically updating your own interfaces

If your app has its own dark mode you should toggle it on and off in sync with the system's dark mode setting. You can do this by listening for the theme changed event on Electron's `systemPreferences` module. 例

```js
const { systemPreferences } = require('electron')

systemPreferences.subscribeNotification(
  'AppleInterfaceThemeChangedNotification',
  function theThemeHasChanged () {
    updateMyAppTheme(systemPreferences.isDarkMode())
  }
)
```