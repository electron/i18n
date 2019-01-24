# 環境変数

> コードを変更することなくアプリケーションの設定と動作を制御します。

いくつかのElectronの動作は、コマンドラインのフラグやアプリのコードよりも早く初期化されるため、環境変数によって制御されます。

POSIXシェルの例:

```sh
$ export ELECTRON_ENABLE_LOGGING=true
$ electron
```

Windowsコンソールの例:

```powershell
> set ELECTRON_ENABLE_LOGGING=true
> electron
```

## 製品用の変数

以下の環境変数は、主にパッケージ化されたElectronアプリケーションで実行時に使用するためのものです。

### `NODE_OPTIONS`

Electron は Node の [`NODE_OPTIONS`](https://nodejs.org/api/cli.html#cli_node_options_options) の一部をサポートに含んでいます。 Chromium の BoringSSL の使用と衝突するものを除き、大多数はサポートされています。

サンプル:

```sh
export NODE_OPTIONS="--no-warnings --max-old-space-size=2048"
```

以下はサポートされていないオプションです。

```sh
--use-bundled-ca
--force-fips
--enable-fips
--openssl-config
--use-openssl-ca
```

`NODE_OPTIONS` はパッケージされたアプリ内では明示的に許可されません。

### `GOOGLE_API_KEY`

Electronには、GoogleのジオコーディングWebサービスへのリクエストを行うためのハードコードされたAPIキーが含まれています。 このAPIキーはすべてのバージョンのElectronに含まれているため、利用制限を超えることがよくあります。 この問題を回避するには、環境に独自のGoogle APIキーを指定することができます。 ジオコーディングリクエストを行うブラウザーウインドウを開く前に、メインプロセスファイルに以下のコードを記述します。

```javascript
process.env.GOOGLE_API_KEY = 'YOUR_KEY_HERE'
```

Google APIキーを取得する方法については、[このページ](https://www.chromium.org/developers/how-tos/api-keys)を参照して下さい。

既定では、新たに生成されたGoogle APIキーでは、ジオコーディングリクエストを行うことができないことがあります。 ジオコーディングリクエストを有効にするには、[このページ](https://console.developers.google.com/apis/api/geolocation/overview)を参照して下さい。

### `ELECTRON_NO_ASAR`

ASARサポートを無効にします。 この変数は、`ELECTRON_RUN_AS_NODE` を設定したフォークされた子プロセスと生成された子プロセスでのみサポートされます。

### `ELECTRON_RUN_AS_NODE`

通常のNode.jsプロセスとしてプロセスを開始します。

### `ELECTRON_NO_ATTACH_CONSOLE` *Windows*

現在のコンソールセッションにアタッチしません。

### `ELECTRON_FORCE_WINDOW_MENU_BAR` *Linux*

Linuxのグローバルメニューバーを使用しません。

### `ELECTRON_TRASH` *Linux*

Linux 上での trash 実装を設定します。デフォルトは `gio` です。

Options:

* `gvfs-trash`
* `trash-cli`
* `kioclient5`
* `kioclient`

## 開発用の変数

以下の環境変数は、主に開発とデバッグを目的としています。

### `ELECTRON_ENABLE_LOGGING`

コンソールにChromeの内部ログを出力します。

### `ELECTRON_LOG_ASAR_READS`

ElectronがASARファイルから読み取るとき、読み取りオフセットとファイルパスをシステムの `tmpdir` に記録します。出力されたファイルは、ASARモジュールのファイル順序を最適化するために使用できます。

### `ELECTRON_ENABLE_STACK_DUMPING`

Electronがクラッシュすると、コンソールにスタックトレースを出力します。

`crashReporter` が開始されている場合、この環境変数は機能しません。

### `ELECTRON_DEFAULT_ERROR_MODE` *Windows*

Electronがクラッシュすると、Windowsのクラッシュダイアログを表示します。

`crashReporter` が開始されている場合、この環境変数は機能しません。

### `ELECTRON_OVERRIDE_DIST_PATH`

`electron` パッケージを実行しているとき、この変数は `npm install` によってダウンロードされた代わりの Electron の指定ビルドを使用するための `electron` コマンドを知らせます。 使い方:

```sh
export ELECTRON_OVERRIDE_DIST_PATH=/Users/username/projects/electron/out/Debug
```