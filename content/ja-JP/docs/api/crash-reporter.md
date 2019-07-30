# crashReporter

> クラッシュレポートをリモートサーバーに送信します。

プロセス: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

以下は、リモートサーバーにクラッシュレポートを自動的に送信する例です。

```javascript
const { crashReporter } = require('electron')

crashReporter.start({
  productName: 'YourName',
  companyName: 'YourCompany',
  submitURL: 'https://your-domain.com/url-to-submit',
  uploadToServer: true
})
```

クラッシュレポートを受信して処理するサーバーをセットアップするには、以下のプロジェクトを使用することができます。

* [socorro](https://github.com/mozilla/socorro)
* [mini-breakpad-server](https://github.com/electron/mini-breakpad-server)

また、サードパーティによる解決方法も使用できます。

* [Backtrace I/O](https://backtrace.io/electron/)
* [Sentry](https://docs.sentry.io/clients/electron)

クラッシュレポートは、アプリケーション固有の一時ディレクトリフォルダーの中にローカルで保存されます。 `YourName` という `productName` の場合、クラッシュレポートは一時ディレクトリの中の `YourName Crashes` という名前のフォルダに保存されます。 クラッシュレポーターを開始する前に `app.setPath('temp', '/my/custom/temp')` APIを呼び出すことで、アプリのこの一時ディレクトリをカスタマイズすることができます。

## メソッド

`crashReporter` モジュールには以下のメソッドがあります。

### `crashReporter.start(options)`

* `options` Object 
  * `companyName` String
  * `submitURL` String - POSTでクラッシュレポートが送信されるURL。
  * `productName` String (任意) - 省略値は、`app.getName()` です。
  * `uploadToServer` Boolean (任意) - クラッシュレポートをサーバーに送信するかどうか。省略値は、`true` です。
  * `ignoreSystemCrashHandler` Boolean (任意) - 省略値は、`false` です。
  * `extra` Object (任意) - レポートと一緒に送信される定義可能なオブジェクト。 文字列のプロパティだけしか正しく送信されません。 ネストしたオブジェクトはサポートされておらず、プロパティの名前と値の長さは、64文字未満にするようにしてください。
  * `crashesDirectory` String (任意) - クラッシュレポートを一時的に保存するディレクトリ (クラッシュレポーターが `process.crashReporter.start` 経由で起動されたときのみ使用されます).

他の `crashReporter` APIを使用する前に、クラッシュレポートを収集したい各プロセス (メイン/レンダラー) で、このメソッドを呼び出す必要があります。 異なるプロセスから呼び出すときは、`crashReporter.start` に異なるオプションを渡すことができます。

**注:** `child_process` モジュール経由で作成された子プロセスは、Electronモジュールにアクセスすることはできません。 それ故、それらからクラッシュレポートを収集するため、代わりに `process.crashReporter.start` を使用してください。 クラッシュレポートを一時的に保存するディレクトリを指す `crashesDirectory` と呼ばれる追加のオプションと一緒に上記と同じオプションを渡してください。 子プロセスをクラッシュさせる `process.crash()` を呼び出すことで、これをテストすることができます。

**Note:** If you need send additional/updated `extra` parameters after your first call `start` you can call `addExtraParameter` on macOS or call `start` again with the new/updated `extra` parameters on Linux and Windows.

**Note:** On macOS and windows, Electron uses a new `crashpad` client for crash collection and reporting. If you want to enable crash reporting, initializing `crashpad` from the main process using `crashReporter.start` is required regardless of which process you want to collect crashes from. Once initialized this way, the crashpad handler collects crashes from all processes. You still have to call `crashReporter.start` from the renderer or child process, otherwise crashes from them will get reported without `companyName`, `productName` or any of the `extra` information.

### `crashReporter.getLastCrashReport()`

Returns [`CrashReport`](structures/crash-report.md):

Returns the date and ID of the last crash report. Only crash reports that have been uploaded will be returned; even if a crash report is present on disk it will not be returned until it is uploaded. In the case that there are no uploaded reports, `null` is returned.

### `crashReporter.getUploadedReports()`

Returns [`CrashReport[]`](structures/crash-report.md):

Returns all uploaded crash reports. Each report contains the date and uploaded ID.

### `crashReporter.getUploadToServer()`

Returns `Boolean` - Whether reports should be submitted to the server. Set through the `start` method or `setUploadToServer`.

**Note:** This API can only be called from the main process.

### `crashReporter.setUploadToServer(uploadToServer)`

* `uploadToServer` Boolean *macOS* - レポートがサーバーに送信されるかどうか.

This would normally be controlled by user preferences. This has no effect if called before `start` is called.

**Note:** This API can only be called from the main process.

### `crashReporter.addExtraParameter(key, value)` *macOS* *Windows*

* `key` String - パラメータキー。長さは、64文字未満でなければなりません。
* `value` String - パラメータの値。長さは、64文字未満でなければなりません。

Set an extra parameter to be sent with the crash report. The values specified here will be sent in addition to any values set via the `extra` option when `start` was called. This API is only available on macOS and windows, if you need to add/update extra parameters on Linux after your first call to `start` you can call `start` again with the updated `extra` options.

### `crashReporter.removeExtraParameter(key)` *macOS* *Windows*

* `key` String - パラメータキー。長さは、64文字未満でなければなりません。

Remove a extra parameter from the current set of parameters so that it will not be sent with the crash report.

### `crashReporter.getParameters()`

See all of the current parameters being passed to the crash reporter.

## クラッシュレポートの内容

The crash reporter will send the following data to the `submitURL` as a `multipart/form-data` `POST`:

* `ver` String - Electronのバージョン。
* `platform` String - 例えば、'win32'。
* `process_type` String - 例えば、'renderer'。
* `guid` String - 例えば、'5e1286fc-da97-479e-918b-6bfb0c3d1c72'。
* `_version` String - `package.json` のバージョン。
* `_productName` String - `crashReporter` の `options` のプロダクト名。
* `prod` String - 基底にあるプロダクトの名前。この場合は、Electronです。
* `_companyName` String - `crashReporter` の `options` の会社名。
* `upload_file_minidump` File - `minidump` 形式でのクラッシュレポート。
* `crashReporter` の `options` オブジェクトにある `extra` オブジェクトのすべてのレベル1プロパティ。