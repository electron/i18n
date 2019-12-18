# Mojave ダークモード

macOS 10.14 Mojave にて、Apple は新しい [システム全体のダークモード](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) を全ての macOS コンピュータに導入しました。 アプリにダークモードが設定されている場合は、Electron アプリにシステム側のダークモード設定を適用させることができます。

macOS 10.15 Catalina にて、Apple は新しい "自動" ダークモードオプションを全ての macOS コンピュータに導入しました。 Catalina 上のこのモードで `isDarkMode` および `Tray` API を正しく機能させるには、`Info.plist` ファイルで `NSRequiresAquaSystemAppearance` を `false` に設定するか、Electron を `>=7.0.0` にする必要があります。

## ネイティブインターフェースを自動的に更新する

"ネイティブインターフェース" にはファイルピッカー、ウインドウの縁、ダイアログ、右クリックメニューなどの、あなたのアプリではない macOS 由来の基本的な UI が含まれます。 取り消したい場合は、`Info.plist` ファイルの `NSRequiresAquaSystemAppearance` キーを `true` にセットする必要があります。 一度 Electron が 10.14 SDK に対してビルドを開始すると、このテーマを取り消せなくなることに注意してください。

## 自作のインターフェースを自動的に更新する

アプリに独自のダークモードがある場合は、システムのダークモード設定と同期してオンとオフを切り替える必要があります。 これを行うには Electron の `systemPreferences` モジュールでテーマ変更イベントを監視します。 以下は例です。

```js
const { nativeTheme } = require('electron')

systemPreferences.subscribeNotification(
  'AppleInterfaceThemeChangedNotification',
  function theThemeHasChanged () {
    updateMyAppTheme(nativeTheme.shouldUseDarkColors)
  }
)
```