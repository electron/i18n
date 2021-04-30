# ビルド手順 (Windows)

カスタム Electron バイナリの作成にあたって Windows で **Electron そのもの** をビルドするには、以下のガイドラインに従ってください。 アプリのコードをビルド済み Electron バイナリにバンドルして頒布する場合は、[アプリケーション頒布][application-distribution] のガイドを参照してください。

## 必要な環境

* Windows 10 / Server 2012 R2 以上
* Visual Studio 2017 15.7.2 以上 - [VS 2019 Community Edition 無料ダウンロード](https://www.visualstudio.com/vs/)
  * 必要な Visual Studio コンポーネントの情報については、[Chromium ビルドドキュメント](https://chromium.googlesource.com/chromium/src/+/master/docs/windows_build_instructions.md#visual-studio) を参照してください。
  * Visual Studio がデフォルト以外のディレクトリにインストールされている場合は、いくつかの環境変数を設定してツールチェインがインストールパスを指すようにする必要があります。
    * `vs2019_install = DRIVE:\path\to\Microsoft Visual Studio\2019\Community`、このうち `2019` と `Community` をインストールしたバージョンのものに、`DRIVE:` をVisual Studio があるドライブに置き換えます。 大抵、このドライブは `C:` です。
    * `WINDOWSSDKDIR = DRIVE:\path\to\Windows Kits\10`、このうち `DRIVE:` を Windows Kits があるドライブに置き換えます。 大抵、このドライブは `C:` です。
  * [Python for Windows (pywin32) Extensions](https://pypi.org/project/pywin32/#files) もビルドプロセスを実行するために必要です。
* [Node.js](https://nodejs.org/download/)
* [Git](https://git-scm.com)
* 完全な頒布物を作成する予定があれば、Windows SDK 10.0.15063.468 の Windows 用デバッグツールで、`.pdb` ファイルからシンボルストアを作成するために `symstore.exe` を使用します。
  * 異なるバージョンのSDKを並行してインストールできます。 SDK をインストールするには、Visual Studio Installer を開いて `変更` → `個別のコンポーネント` を選択し、スクロールしてインストールする適切な Windows SDK を選択します。 他に、[Windows SDK とエミュレータのアーカイブ](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive) を見て、SDK のスタンドアロン版をそれぞれダウンロードすることでもできます。
  * SDK デバッグツールもインストールする必要があります。 Windows 10 SDK が Visual Studio インストーラーを介してインストールされた場合は、次のようにしてインストールできます。 `コントロールパネル` → `プログラム` → `プログラムと機能` → "Windows Software Development Kit" を選択 → `変更` → `変更` → "Debugging Tools For Windows" にチェック → `変更`。 または、スタンドアロンの SDK インストーラをダウンロードして、それを使ってデバッグツールをインストールすることができます。

現在 Windows インストールを持っていない場合、[dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) に Electron をビルドするために使用できる Windows のバージョンがあります。

Electron のビルドは完全にコマンドラインスクリプトで行われ、Visual Studio では実行できません。 任意のエディタで Electron を開発できますが、将来 Visual Studio を使用したビルドがサポートされます。

**注釈:** Visual Studio はビルドに使用されていませんが、それが提供するビルドツールチェーンが必要なため、まだ **必要** です。

## Windows Security からソースのツリーを除外する

Windows Security は Chromium ソースコード内のファイルを良く思わないようで (https://crbug.com/441184 を参照)、常にある特定のファイルを削除してしまい、`gclient sync` の問題を引き起こします。 [こちらの手順に従う](https://support.microsoft.com/en-us/windows/add-an-exclusion-to-windows-security-811816c0-4dfd-af4a-47e4-c301afe13b26) ことで、ソースのツリーを Windows Security の監視から除外できます。

## ビルド

[ビルド指示: GN](build-instructions-gn.md)を参照してください。

## 32ビットビルド

32ビットターゲット用にビルドするには、引数として`target_cpu = "x86"` をGNに渡す必要があります。 32ビットターゲットと共に64ビットターゲットをビルドできます。それには別の引数を使って、`out/Release-x86`のような別のディレクトリに出力させられます。

```powershell
$ gn gen out/Release-x86 --args="import(\"//electron/build/args/release.gn\") target_cpu=\"x86\""
```

他のビルド手順は全く同じです。

## Visual Studio プロジェクト

Visual Studio プロジェクトを生成するには、`--ide=vs2017` 引数を`gn gen`に渡します。

```powershell
$ gn gen out/Testing --ide=vs2017
```

## トラブルシューティング

### Command xxxx not found

`Command xxxx not found` のようなエラーに遭遇した場合、`開発者コマンド プロンプト for VS2015` コンソールを使用してビルドスクリプトを実行してみましょう。

### Fatal internal compiler error: C1001

最新の Visual Studio アップデートがインストールされていることを確認してください。

### LNK1181: cannot open input file 'kernel32.lib'

32ビット Node.js を再インストールしてください。

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

以下のようにディレクトリを作成すると [問題](https://stackoverflow.com/a/25095327/102704) は解決するはずです。

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp is not recognized as an internal or external command

ビルドに Git Bash を使用している場合は、代わりに PowerShell または 開発者コマンド プロンプト for VS2015 を使用する必要があります。

### cannot create directory at '...': Filename too long

node.jsに[長すぎるパス名](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish)があるようです。標準では、Windows版のgitは、長いファイル名をきちんと処理できません。 この問題を解決するには以下のようにします：

```sh
$ git config --system core.longpaths true
```

### error: use of undeclared identifier 'DefaultDelegateCheckMode'

これは、Windows 用のデバッグツールが Windows Driver Kit とともにインストールされている場合においてビルド中に発生する可能性があります。 Windows Driver Kit をアンインストールし、上記の手順で Debugging Tools をインストールします。

### ImportError: No module named win32file

`pywin32`がインストールされているか確認してください。これは次のコマンドでインストールします。:`pip install pywin32`.

### ビルドスクリプトがキーを押さないと止まる

このバグは Windows コマンドプロンプトの「機能」によるものです。 `簡易編集モード` を有効にしたプロンプトウィンドウ内をクリックすると発生し、出力テキストを簡単に選択してコピーできるようにすることを目的としています。 誤ってクリックするたびにビルドプロセスが一時停止するため、この機能はコマンドプロンプトのプロパティで無効にできます。

[application-distribution]: ../tutorial/application-distribution.md
