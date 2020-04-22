# Widevine CDM のテスト

Electron では、Chrome ブラウザに同梱されている Widevine CDM ライブラリを使用できます。

Widevine Content Decryption Modules (CDMs) は、Flash や Silverlight のような NPAPI プラグインに頼ることなく、ストリーミングサービスが HTML 5 ビデオを使用して Web ブラウザにコンテンツを保護する方法です。 Widevine サポートは、DRM 保護されたビデオコンテンツの再生に現在 Silverlight を使用しているストリーミングサービスの代替ソリューションです。 Web サイトは NPAPI プラグインを使用せずに Firefox で DRM 保護されたビデオコンテンツを表示することができます。 Widevine CDM はオープンソースの CDM サンドボックスで実行され、NPAPI プラグインよりも優れたユーザーセキュリティを提供します。

#### VMP に関する注意

[`Electron v1.8.0 (Chrome v59)`](https://electronjs.org/releases#1.8.1) 以降では、以下のステップは Widevine を有効にするために必要なステップの一部に過ぎません。Widevine CDM を使用する予定の、そのバージョン以降のアプリは、[Widevine](https://www.widevine.com/) 自体から取得したライセンスを使用して署名する必要があります。

[Widevine](https://www.widevine.com/) あたり:

> Chrome 59 (以降) には、検証済みメディアパス (VMP) のサポートが含まれています。 VMP はデバイスプラットフォームの信頼性を検証する方法を提供します。 ブラウザ展開の場合、これはブラウザベースの実装が信頼性があり安全であるかどうかを判断するための追加のシグナルを提供します。
> 
> プロキシ統合ガイドが VMP およびライセンスの発行方法に関する情報で更新されました。
> 
> Widevine は、私たちのブラウザベースの統合 (ベンダおよびブラウザベースのアプリケーション) が VMP のサポートを追加することを推奨しています。

この新しい制限でビデオの再生を可能にするために、[castLabs](https://castlabs.com/open-source/downstream/) は、Widevine から必要なライセンスを取得した場合に、Widevine を Electron アプリケーションで再生できるようにするために必要な変更を実装した [fork](https://github.com/castlabs/electron-releases) を作成しました。

## ライブラリの取得

Chrome ブラウザで `chrome://components/` を開き、`Widevine Content Decryption Module` を見つけて最新のものであることを確認したら、アプリケーションディレクトリからライブラリファイルを見つけることができます。

### Windowsの場合

ライブラリファイル `widevinecdm.dll` は、`Program Files(x86)/Google/Chrome/Application/CHROME_VERSION/WidevineCdm/_platform_specific/win_(x86|x64)/` ディレクトリにあります。

### macOSの場合

ライブラリファイル `libwidevinecdm.dylib` は、`/Applications/Google Chrome.app/Contents/Versions/CHROME_VERSION/Google Chrome Framework.framework/Versions/A/Libraries/WidevineCdm/_platform_specific/mac_(x86|x64)/` ディレクトリにあります。

**注意:** Electron が使用する chrome バージョンが、Chrome の widevine cdm コンポーネントの `min_chrome_version` 値以上であることを確認してください。 値は、`WidevineCdm` ディレクトリの `manifest.json` にあります。

## ライブラリの使用

ライブラリファイルを取得したら、`--widevine-cdm-path` コマンドラインスイッチを使用してファイルへのパスを渡し、`--widevine-cdm-version` スイッチを使用してライブラリのバージョンを渡す必要があります。 `app` モジュールの `ready` イベントが発行される前に、コマンドラインスイッチを渡す必要があります。

コード例

```javascript
const { app, BrowserWindow } = require('electron')

// You have to pass the directory that contains widevine library here, it is
// * `libwidevinecdm.dylib` on macOS,
// * `widevinecdm.dll` on Windows.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevine_library')
// The version of plugin can be got from `chrome://plugins` page in Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.on('ready', () => {
  win = new BrowserWindow()
  win.show()
})
```

## Widevine CDM サポートの確認

widevine が機能するかどうかを確認するには、次の方法を使用できます。

* https://shaka-player-demo.appspot.com/ を開き、`Widevine` を使用するマニフェストを読み込みます。
* http://www.dash-player.com/demo/drm-test-area/ を開き、ページに `bitdash uses Widevine in your browser` と表示されているかどうかを確認してから、ビデオを再生します。
