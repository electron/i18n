# macOS のダークモードのサポート

macOS 10.14 Mojave にて、Apple は新しい [システム全体のダークモード](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) を全ての macOS コンピュータに導入しました。  Electron アプリがダークモードに対応している場合、[`nativeTheme`api](../api/native-theme.md) を使用してシステム全体のダークモード設定に追従できます。

macOS 10.15 Catalina にて、Apple は新しい "自動" ダークモードオプションを全ての macOS コンピュータに導入しました。 Catalina 上のこのモードで `nativeTheme.shouldUseDarkColors` 及び `Tray` API が正しく機能するには、`Info.plist` ファイルで `NSRequiresAquaSystemAppearance` を `false` に設定するか、Electron `>=7.0.0` である必要があります。 [Electron Packager][electron-packager] と[Electron Forge][electron-forge]は両方、[`darwinDarkModeSupport` オプション][packager-darwindarkmode-api]があり、アプリのビルドの間に `Info.plist` を自動的に変更します。

## ネイティブインターフェースを自動的に更新する

"ネイティブインターフェース" にはファイルピッカー、ウインドウの縁、ダイアログ、右クリックメニューなどの、あなたのアプリではない macOS 由来の基本的な UI が含まれます。 7.0.0以降の Electron のデフォルトの動作は、OSからこの自動テーマを選択することです。 Electron &gt; 8.0.0 を使用しており、テーマに合わせたい場合、`Info.plist` ファイルの `NSRequiresAquaSystemAppearance` キーを `true` にする必要があります。 Electron 8.0.0 以降では macOS 10.14 SDK を使用しているため、このテーマ設定をする必要があることに注意してください。

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
