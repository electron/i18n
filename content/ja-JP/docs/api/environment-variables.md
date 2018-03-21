# 環境変数

> コードを変更することなくアプリケーションの設定と動作を制御します。

いくつかのElectronの動作は、コマンドラインのフラグやアプリのコードよりも早く初期化されるため、環境変数によって制御されます。

POSIXシェルの例:

```bash
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

### `GOOGLE_API_KEY`

Electron には、Google のジオコーディングウェブサービスへのリクエストを行うためのハードコードされた API キーが含まれています。 この API キーはすべてのバージョンの Electron に含まれているため、容量の制限を超えることがよくあります。 この問題を回避するには、環境内に独自の Google API キーを指定します。 ジオコーディングリクエストをするブラウザウィンドウを開く前に、メインプロセスファイルに以下のコードを挿入します。

```javascript
process.env.GOOGLE_API_KEY = 'キー_を_ここに'
```

Google API キーを取得する方法については、[このページ](https://www.chromium.org/developers/how-tos/api-keys) を参照して下さい。

デフォルトでは、新しく生成された Google API キーではジオコーディングリクエストを作成できない場合があります。 ジオコーディングリクエストを有効にするには、[このページ](https://console.developers.google.com/apis/api/geolocation/overview) を参照して下さい。

### `ELECTRON_NO_ASAR`

ASAR サポートを無効にします。 この変数は、`ELECTRON_RUN_AS_NODE` を設定する、フォークされた子プロセスと生成された子プロセスでのみサポートされます。

### `ELECTRON_RUN_AS_NODE`

通常の Node.js プロセスとしてプロセスを開始します。

### `ELECTRON_NO_ATTACH_CONSOLE` *Windows*

現在のコンソールセッションを適用しません。

### `ELECTRON_FORCE_WINDOW_MENU_BAR` *Linux*

Linux のグローバルメニューバーを使用しません。

## 開発用の変数

以下の環境変数は、主に開発とデバッグを目的としています。

### `ELECTRON_ENABLE_LOGGING`

コンソールへ Chrome の内部ログを出力します。

### `ELECTRON_LOG_ASAR_READS`

When Electron reads from an ASAR file, log the read offset and file path to the system `tmpdir`. The resulting file can be provided to the ASAR module to optimize file ordering.

### `ELECTRON_ENABLE_STACK_DUMPING`

Prints the stack trace to the console when Electron crashes.

This environment variable will not work if the `crashReporter` is started.

### `ELECTRON_DEFAULT_ERROR_MODE` *Windows*

Shows the Windows's crash dialog when Electron crashes.

This environment variable will not work if the `crashReporter` is started.