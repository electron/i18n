# macOS のダークモードのサポート

macOS 10.14 Mojave にて、Apple は新しい [システム全体のダークモード](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) を全ての macOS コンピュータに導入しました。  Electron アプリがダークモードに対応している場合、[`nativeTheme`api](../api/native-theme.md) を使用してシステム全体のダークモード設定に追従できます。

macOS 10.15 Catalina にて、Apple は新しい "自動" ダークモードオプションを全ての macOS コンピュータに導入しました。 Catalina 上のこのモードで `nativeTheme.shouldUseDarkColors` 及び `Tray` API が正しく機能するには、`Info.plist` ファイルで `NSRequiresAquaSystemAppearance` を `false` に設定するか、Electron `>=7.0.0` である必要があります。 [Electron Packager][electron-packager] と[Electron Forge][electron-forge]は両方、[`darwinDarkModeSupport` オプション][packager-darwindarkmode-api]があり、アプリのビルドの間に `Info.plist` を自動的に変更します。

## ネイティブインターフェースを自動的に更新する

「Native Interface」には、ファイルピッカー、ウィンドウ境界、ダイアログ、コンテキストメニューなどが含まれます。 基本的に、 UIがmacOSから来ていて、アプリではないものは何でも。 Electron 7.0.0以降では、デフォルトの動作 はOSからこの自動テーマを選択することです。 If you wish to opt-out and are using Electron
&gt; 8.0.0, you must set the `NSRequiresAquaSystemAppearance` key in the `Info.plist` file to `true`. Electron 8.0.0 以降では、macOS 10.14 SDK の を使用しているため、このテーマをオプトアウトすることはできませんのでご注意ください。

## 自作のインターフェースを自動的に更新する

アプリに独自のダークモードがある場合は、システムのダークモード設定と同期してオンとオフを切り替える必要があります。 これをするには Electron の `nativeTheme` モジュールでテーマ変更イベントを監視します。

例:

```javascript
const { nativeTheme } = require('electron')

nativeTheme.on('updated', function theThemeHasChanged () {
  updateMyAppTheme(nativeTheme.shouldUseDarkColors)
})
```

[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[packager-darwindarkmode-api]: https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport
