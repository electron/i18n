# ビルド手順 (Windows)

Windows 版 Electron のビルドについては、以下のガイドラインに従ってください。

## 必要な環境

* Windows 10 / Server 2012 R2 以上
* Visual Studio 2017 15.7.2 以上 - [VS 2019 Community Edition 無料ダウンロード](https://www.visualstudio.com/vs/)
  * 必要な Visual Studio コンポーネントの情報については、[Chromium ビルドドキュメント](https://chromium.googlesource.com/chromium/src/+/master/docs/windows_build_instructions.md#visual-studio) を参照してください。
  * Visual Studio がデフォルト以外のディレクトリにインストールされている場合は、いくつかの環境変数を設定してツールチェインがインストールパスを指すようにする必要があります。
    * `vs2019_install = DRIVE:\path\to\Microsoft Visual Studio\2019\Community`、このうち `2019` と `Community` をインストールしたバージョンのものに、`DRIVE:` をVisual Studio があるドライブに置き換えます。 大抵、このドライブは `C:` です。
    * `WINDOWSSDKDIR = DRIVE:\path\to\Windows Kits\10`, replacing `DRIVE:` with the drive that Windows Kits is on. 大抵、このドライブは `C:` です。
* [Python 2.7.10 以上](http://www.python.org/download/releases/2.7/)
  * 以下にリンクされている `depot_tools` の設定手順とは異なり、ローカルにインストールされた Python を少なくとも 2.7.10 (TLS 1.2 サポート) で使用する必要があります。 これをするには、**PATH** 内で、ローカルにインストールされた Python が `depot_tools`のフォルダより前に来るように指定してください。 現在、`depot_tools` にはまだ Python 2.7.6 が付属しているため、`gclient` コマンドが失敗します (https://crbug.com/868864 を参照)。
  * [Python for Windows (pywin32) Extensions](https://pypi.org/project/pywin32/#files) もビルドプロセスを実行するために必要です。
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* Debugging Tools for Windows of Windows SDK 10.0.15063.468 if you plan on creating a full distribution since `symstore.exe` is used for creating a symbol store from `.pdb` files.
  * 異なるバージョンのSDKを並行してインストールできます。 SDK をインストールするには、Visual Studio Installer を開いて `変更` → `個別のコンポーネント` を選択し、スクロールしてインストールする適切な Windows SDK を選択します。 他に、[Windows SDK とエミュレータのアーカイブ](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive) を見て、SDK のスタンドアロン版をそれぞれダウンロードすることでもできます。
  * SDK デバッグツールもインストールする必要があります。 Windows 10 SDK が Visual Studio インストーラーを介してインストールされた場合は、次のようにしてインストールできます。 `コントロールパネル` → `プログラム` → `プログラムと機能` → "Windows Software Development Kit" を選択 → `変更` → `変更` → "Debugging Tools For Windows" にチェック → `変更`。 または、スタンドアロンの SDK インストーラをダウンロードして、それを使ってデバッグツールをインストールすることができます。

現在 Windows インストールを持っていない場合、[dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) に Electron をビルドするために使用できる Windows のバージョンがあります。

Electron のビルドは完全にコマンドラインスクリプトで行われ、Visual Studio では実行できません。 任意のエディタで Electron を開発できますが、将来 Visual Studio を使用したビルドがサポートされます。

**Note:** Even though Visual Studio is not used for building, it's still **required** because we need the build toolchains it provides.

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

This can happen during build, when Debugging Tools for Windows has been installed with Windows Driver Kit. Uninstall Windows Driver Kit and install Debugging Tools with steps described above.

### ImportError: No module named win32file

`pywin32`がインストールされているか確認してください。これは次のコマンドでインストールします。:`pip install pywin32`.

### ビルドスクリプトがキーを押さないと止まる

このバグは Windows コマンドプロンプトの「機能」によるものです。 `簡易編集モード` を有効にしたプロンプトウィンドウ内をクリックすると発生し、出力テキストを簡単に選択してコピーできるようにすることを目的としています。 誤ってクリックするたびにビルドプロセスが一時停止するため、この機能はコマンドプロンプトのプロパティで無効にできます。
