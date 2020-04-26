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

`NODE_OPTIONS` は、以下のようにしない限りパッケージされたアプリ内では明示的に許可されません。

```sh
--max-http-header-size
--http-parser
```

### `GOOGLE_API_KEY`

Google の Geocoding ウェブサービスにリクエストを送信するための API キーを指定できます。 これを行うには、ジオコードリクエストを行うブラウザウィンドウを開く前に、メインプロセスファイルに次のコードを配置します。

```javascript
process.env.GOOGLE_API_KEY = 'YOUR_KEY_HERE'
```

例えば、Google APIキーを取得する方法については、[このページ](https://developers.google.com/maps/documentation/javascript/get-api-key)を参照して下さい。 既定では、新たに生成されたGoogle APIキーでは、ジオコーディングリクエストを行うことができないことがあります。 ジオコーディングリクエストを有効にするには、[このページ](https://developers.google.com/maps/documentation/geocoding/get-api-key)を参照して下さい。

### `ELECTRON_NO_ASAR`

ASAR サポートを無効にします。 この変数は、`ELECTRON_RUN_AS_NODE` を設定したフォークされた子プロセスと生成された子プロセスでのみサポートされます。

### `ELECTRON_RUN_AS_NODE`

通常のNode.jsプロセスとしてプロセスを開始します。

### `ELECTRON_NO_ATTACH_CONSOLE` _Windows_

現在のコンソールセッションにアタッチしません。

### `ELECTRON_FORCE_WINDOW_MENU_BAR` _Linux_

Linuxのグローバルメニューバーを使用しません。

### `ELECTRON_TRASH` _Linux_

Linux でゴミの実装を設定します。 既定値は `gio` です。

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

Electron が ASAR ファイルから読み込むときに、読み取りオフセットとファイルパスをシステムの `tmpdir` へログとして出力します。 ファイルの順番を最適化するために、結果のファイルを ASAR モジュールへ与えられます。

### `ELECTRON_ENABLE_STACK_DUMPING`

Electronがクラッシュすると、コンソールにスタックトレースを出力します。

`crashReporter` が開始されている場合、この環境変数は機能しません。

### `ELECTRON_DEFAULT_ERROR_MODE` _Windows_

Electronがクラッシュすると、Windowsのクラッシュダイアログを表示します。

`crashReporter` が開始されている場合、この環境変数は機能しません。

### `ELECTRON_OVERRIDE_DIST_PATH`

`electron` パッケージを実行しているとき、この変数は `npm install` によってダウンロードされた代わりの Electron の指定ビルドを使用するための `electron` コマンドを知らせます。 使い方:

```sh
export ELECTRON_OVERRIDE_DIST_PATH=/Users/username/projects/electron/out/Debug
```
