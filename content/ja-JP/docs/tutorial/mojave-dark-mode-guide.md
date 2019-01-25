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

[`electron-packager` >= 12.2.0](https://github.com/electron-userland/electron-packager) か [`electron-forge` >= 6](https://github.com/electron-userland/electron-forge) を使用している場合、[`darwinDarkModeSupport`](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#darwindarkmodesupport) オプションを設定してパッケージするときにセットされるようにできます。

[`electron-builder` >= 20.37.0](https://github.com/electron-userland/electron-builder) を使用している場合、[`darkModeSupport`](https://www.electron.build/configuration/mac.html) オプションを設定できます。

## 自作のインターフェースを自動的に更新する

アプリに独自のダークモードがある場合は、システムのダークモード設定と同期してオンとオフを切り替える必要があります。 これを行うには Electron の `systemPreferences` モジュールでテーマ変更イベントを監視します。 例

```js
const { systemPreferences } = require('electron')

systemPreferences.subscribeNotification(
  'AppleInterfaceThemeChangedNotification',
  function theThemeHasChanged () {
    updateMyAppTheme(systemPreferences.isDarkMode())
  }
)
```