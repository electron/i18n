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

Electron での地理位置情報サポートには、Google Cloud Platform の地理位置情報ウェブサービスの利用が必要です。 この機能を有効にするには、[Google API キー](https://developers.google.com/maps/documentation/geolocation/get-api-key) を取得し、ジオロケーション要求を行うブラウザウィンドウを開く前に、以下のコードをメインプロセスファイルに配置してください。

```javascript
process.env.GOOGLE_API_KEY = 'YOUR_KEY_HERE'
```

デフォルトでは、新しく生成された Google API キーではジオロケーションリクエストを行えない場合があります。 プロジェクトで地理位置情報ウェブサービスを有効にするには、[API ライブラリ](https://console.cloud.google.com/apis/library) から有効にしてください。

注: 地理位置情報ウェブサービスが動作するには、API キーに関連付けられたプロジェクトに [請求先アカウント](https://cloud.google.com/billing/docs/how-to/payment-methods#add_a_payment_method) を追加する必要があります。

### `ELECTRON_NO_ASAR`

ASAR サポートを無効にします。 この変数は、`ELECTRON_RUN_AS_NODE` を設定したフォークされた子プロセスと生成された子プロセスでのみサポートされます。

### `ELECTRON_RUN_AS_NODE`

通常のNode.jsプロセスとしてプロセスを開始します。

このモードでは、以下のフラグを除いて、通常の Node.js 実行ファイルを実行しているときと同じように [CLI 引数](https://nodejs.org/api/cli.html) を Node.js に渡せます。

* "--openssl-config"
* "--use-bundled-ca"
* "--use-openssl-ca",
* "--force-fips"
* "--enable-fips"

これらのフラグは、Electron が Node.js の `crypto` モジュール構築に OpenSSL ではなく BoringSSL を使用しているため、設計通りに動作せず無効になっています。

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

### `ELECTRON_DEBUG_DRAG_REGIONS`

macOS での [`BrowserView`](./browser-view.md) のドラッグ可能な領域に色を付けます。ドラッグ可能な領域は緑、ドラッグ不可能な領域は赤で表示され、デバッグを支援します。

### `ELECTRON_DEBUG_NOTIFICATIONS`

macOS での [`Notification`](./notification.md) ライフサイクルにさらなるログを追加し、デバッグを支援します。 新しい通知の作成や有効化のタイミングで、そのさらなるログが表示されます。 これは、通知が表示されたり、解除されたり、そのボタンがクリックされたり、返信されたりといった一般的なアクションが実行されたときにも表示されます。

以下は出力例です。

```sh
Notification created (com.github.Electron:notification:EAF7B87C-A113-43D7-8E76-F88EC9D73D44)
Notification displayed (com.github.Electron:notification:EAF7B87C-A113-43D7-8E76-F88EC9D73D44)
Notification activated (com.github.Electron:notification:EAF7B87C-A113-43D7-8E76-F88EC9D73D44)
Notification replied to (com.github.Electron:notification:EAF7B87C-A113-43D7-8E76-F88EC9D73D44)
```

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
export ELECTRON_OVERRIDE_DIST_PATH=/Users/username/projects/electron/out/Testing
```

## Electron による設定

Electron は実行時に環境変数をいくつか設定します。

### `ORIGINAL_XDG_CURRENT_DESKTOP`

この変数には、アプリケーション が起動した `XDG_CURRENT_DESKTOP` の値が設定されます。  Electron は `XDG_CURRENT_DESKTOP` の値を変更して Chromium 内の他のロジックに影響を与えることがあるので、_元々_ の値にアクセスしたい場合は、代わりにこの環境変数を見る必要があります。
