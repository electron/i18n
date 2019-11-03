# Arm 版 Windows 10

アプリを Electron 6.0.8 以降で実行している場合、Arm 版 Windows 10 向けにビルドできます。 これによりパフォーマンスが大幅に向上しますが、アプリで使用されているネイティブモジュールを再コンパイルする必要があります。 また、ビルドおよびパッケージ化スクリプトの小さな修正が必要になる場合があります。

## Running a basic app
アプリがネイティブモジュールを使用していない場合は、アプリの Arm 版は簡単に作成できます。

1. アプリの `node_modules` ディレクトリが空であることを確認してください。
2. _コマンドプロンプト_ を使用して、`set npm_config_arch = arm64` を実行してから、同じように `npm install` / `yarn install` を実行します。
3. [Electron を開発用依存関係としてインストールしている場合](first-app.md)、npm は arm64 版をダウンロードして解凍します。 その後、通常どおりアプリをパッケージ化して配布できます。

## 一般的な考慮事項

### アーキテクチャ固有のコード

Windows 固有のコードの多くには、if... else ロジックが含まれています。これは、x64 アーキテクチャと x86 アーキテクチャのどちらかを選択するものです。

```js
if (process.arch === 'x64') {
  // 64 ビット固有の処理をする...
} else {
  // 32 ビット固有の処理をする...
}
```

arm64 をターゲットにしたい場合、このようなロジックは通常間違ったアーキテクチャを選択するため、アプリケーションを慎重に確認したうえで、このような条件のスクリプトを作成してください。 カスタムビルドおよびパッケージスクリプトでは、現在の process.arch に依存するのではなく、環境内の `npm_config_arch` の値を常に確認する必要があります。

### ネイティブモジュール
ネイティブモジュールを使用する場合は、MSVC コンパイラの v142 (Visual Studio 2017 で提供) に対してコンパイルしていることを確認する必要があります。 また、ネイティブモジュールによって提供または参照されているビルド済みの `.dll` または `.lib` ファイルが Arm 版 Windows で使用できることも確認する必要があります。

### アプリをテストする
アプリをテストするには、Windows 10 (バージョン 1903 以降) を実行している Arm 版 Windows デバイスを使用します。 必ずターゲットデバイスにアプリケーションをコピーしてください。Chromium のサンドボックスは、ネットワーク位置上からアプリケーションアセットを読み込むと正しく機能しません。

## 開発要件
### Node.js/node-gyp

[Node.js v12.9.0 以降を推奨します。](https://nodejs.org/en/) 新しいバージョンの Node へのアップデートが望ましくない場合は、代わりに [npm の node-gyp のコピーを手動でバージョン 5.0.2 以降に更新](https://github.com/nodejs/node-gyp/wiki/Updating-npm's-bundled-node-gyp) できます。これには、Arm 向けのネイティブモジュールをコンパイルするために必要な変更が含まれています。

### Visual Studio 2017
ネイティブモジュールのクロスコンパイルには、Visual Studio 2017 (いずれかのエディション) が必要です。 Visual Studio Community 2017 は、Microsoft の [Visual Studio Dev Essentials プログラム](https://visualstudio.microsoft.com/dev-essentials/) からダウンロードできます。 インストール後、_コマンドプロンプト_ から次のコマンドを実行して、Arm 固有のコンポーネントを追加できます。

```powershell
vs_installer.exe ^
--add Microsoft.VisualStudio.Workload.NativeDesktop ^
--add Microsoft.VisualStudio.Component.VC.ATLMFC ^
--add Microsoft.VisualStudio.Component.VC.Tools.ARM64 ^
--add Microsoft.VisualStudio.Component.VC.MFC.ARM64 ^
--includeRecommended
```

#### クロスコンパイルするコマンドプロンプトの作成
環境で `npm_config_arch = arm64` を設定すると、正しい arm64 の `.obj` ファイルが作成されますが、VS 2017 標準の _開発者向けコマンドプロンプト for VS 2017_ は x64 リンカーを使用します 。 これを修正するには以下のようにします。

1. _x64_x86 Cross Tools Command Prompt for VS 2017_ ショートカットを複製します (たとえば、スタートメニューで見つけて、右クリックし、_ファイルの場所を開く_ を選択して、コピーアンドペーストします)。
2. 新しいショートカットで右クリックして、_プロパティ_ を選びます。
3. _Target_ フィールドを、`vcvarsamd64_x86.bat` ではなく、最後の`vcvarsamd64_arm64.bat` を読み取るように変更します。

正常に完了すると、そのコマンドプロンプトは起動時に以下のようなものを出力するはずです。

```bat
**********************************************************************
** Visual Studio 2017 Developer Command Prompt v15.9.15
** Copyright (c) 2017 Microsoft Corporation
**********************************************************************
[vcvarsall.bat] Environment initialized for: 'x64_arm64'
```

Arm 版 Windows デバイスでアプリケーションを直接開発したい場合は、デバイスの x86 エミュレーションでクロスコンパイルが発生するように、_Target_ を `vcvarsx86_arm64.bat` に置き換えます。

### 正しい `node.lib` に対してリンクする

デフォルトでは、`node-gyp` は Electron の node ヘッダーをアンパックし、`node.lib` の x86 および x64 バージョンを `%APPDATA%\..\Local\node-gyp\Cache` にダウンロードします。ただし、arm64 バージョンはダウンロードされません ([この修正は開発中です](https://github.com/nodejs/node-gyp/pull/1875))。これを修正するには以下のようにします。

1. https://atom.io/download/v6.0.9/win-arm64/node.lib から arm64 の `node.lib` をダウンロードします
2. それを `%APPDATA%\..\Local\node-gyp\Cache\6.0.9\arm64\node.lib` に移動します

`6.0.9` は使用しているバージョンに置き換えてください。


## ネイティブモジュールのクロスコンパイル
上記のすべてを完了した後、クロスコンパイルコマンドプロンプトを開き、`set npm_config_arch = arm64` を実行します。 そして `npm install` を使用して、通常どおりプロジェクトをビルドします。 x86 モジュールのクロスコンパイルと同様に、事前に別のアーキテクチャ用にコンパイルされたネイティブモジュールを強制的に再コンパイルするには、`node_modules` を削除する必要があります。

## ネイティブモジュールのデバッグ

ネイティブモジュールのデバッグは、Visual Studio 2017 (開発マシン上で実行) および対応する [Visual Studio Remote Debugger](https://docs.microsoft.com/en-us/visualstudio/debugger/remote-debugging-cpp?view=vs-2019) をターゲットのデバイス上で実行することで実行できます。 デバッグするには以下のようにします。

1. Lanch your app `.exe` on the target device via the _Command Prompt_ (passing `--inspect-brk` to pause it before any native modules are loaded).
2. Launch Visual Studio 2017 on your development machine.
3. Connect to the target device by selecting _Debug > Attach to Process..._ and enter the device's IP address and the port number displayed by the Visual Studio Remote Debugger tool.
4. Click _Refresh_ and select the [appropriate Electron process to attach](../development/debug-instructions-windows.md).
5. You may need to make sure that any symbols for native modules in your app are loaded correctly. To configure this, head to _Debug > Options..._ in Visual Studio 2017, and add the folders containing your `.pdb` symbols under _Debugging > Symbols_.
5. Once attached, set any appropriate breakpoints and resume JavaScript execution using Chrome's [remote tools for Node](debugging-main-process.md).

## Getting additional help
If you encounter a problem with this documentation, or if your app works when compiled for x86 but not for arm64, please [file an issue](../development/issues.md) with "Windows on Arm" in the title.
