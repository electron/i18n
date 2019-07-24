# Mojave Dark Mode

macOS 10.14 Mojave にて、Apple は新しい [システム全体のダークモード](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) を全ての macOS コンピュータに導入しました。 アプリにダークモードが設定されている場合は、Electron アプリにシステム側のダークモード設定を適用させることができます。

macOS 10.15 Catalina にて、Apple は新しい "自動" ダークモードオプションを全ての macOS コンピュータに導入しました。 In order for the `isDarkMode` and `Tray` APIs to work correctly in this mode on Catalina you need to either have `NSRequiresAquaSystemAppearance` set to `false` in your `Info.plist` file or be on Electron `>=7.0.0`.

## ネイティブインターフェースを自動的に更新する

"ネイティブインターフェース" にはファイルピッカー、ウインドウの縁、ダイアログ、右クリックメニューなどの、あなたのアプリではない macOS 由来の基本的な UI が含まれます。 If you wish to opt out you must set the `NSRequiresAquaSystemAppearance` key in the `Info.plist` file to `true`. 一度 Electron が 10.14 SDK に対してビルドを開始すると、このテーマを取り消せなくなることに注意してください。

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