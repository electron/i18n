# Mojave ダークモード

macOS 10.14 Mojave にて、Apple は新しい [システム全体のダークモード](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) を全ての macOS コンピュータに導入しました。 If your app does have a dark mode, you can make your Electron app follow the system-wide dark mode setting using [the nativeTheme api](../api/native-theme.md).

macOS 10.15 Catalina にて、Apple は新しい "自動" ダークモードオプションを全ての macOS コンピュータに導入しました。 In order for the `nativeTheme.shouldUseDarkColors` and `Tray` APIs to work correctly in this mode on Catalina you need to either have `NSRequiresAquaSystemAppearance` set to `false` in your `Info.plist` file or be on Electron `>=7.0.0`.

## ネイティブインターフェースを自動的に更新する

"ネイティブインターフェース" にはファイルピッカー、ウインドウの縁、ダイアログ、右クリックメニューなどの、あなたのアプリではない macOS 由来の基本的な UI が含まれます。 取り消したい場合は、`Info.plist` ファイルの `NSRequiresAquaSystemAppearance` キーを `true` にセットする必要があります。 一度 Electron が 10.14 SDK に対してビルドを開始すると、このテーマを取り消せなくなることに注意してください。

## 自作のインターフェースを自動的に更新する

アプリに独自のダークモードがある場合は、システムのダークモード設定と同期してオンとオフを切り替える必要があります。 You can do this by listening for the theme updated event on Electron's `nativeTheme` module. 以下は例です。

```js
const { nativeTheme } = require('electron')

nativeTheme.on('updated', function theThemeHasChanged () {
  updateMyAppTheme(nativeTheme.shouldUseDarkColors)
})
```