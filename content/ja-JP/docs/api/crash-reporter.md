# crashReporter

> クラッシュレポートをリモートサーバーに送信します

プロセス: [メイン](../glossary.md#main-process), [レンダラー](../glossary.md#renderer-process)

以下は、自動的に外部サーバーにクラッシュレポートを送信する例です。

```javascript
const {crashReporter} = require('electron')

crashReporter.start({
  productName: 'YourName',
  companyName: 'YourCompany',
  submitURL: 'https://your-domain.com/url-to-submit',
  uploadToServer: true
})
```

クラッシュレポートを受信/処理するサーバーを立てるのに、以下のプロジェクトを使用できます。

* [socorro](https://github.com/mozilla/socorro)
* [mini-breakpad-server](https://github.com/electron/mini-breakpad-server)

クラッシュレポートは、アプリケーション固有のローカルの一時フォルダーに保存されます。 `productName`が`YourName`のとき、クラッシュレポートは`YourName Crashes`という名前の一時フォルダ内に格納されます。 クラッシュレポータを起動させる前に`app.setPath('temp', '/あなたの/好きな/一時フォルダ')`を呼ぶことで、この一時フォルダの場所をカスタマイズできます。

## メソッド

`crashReporter` オブジェクトには以下のメソッドがあります

### `crashReporter.start(options)`

* `options` Object 
  * `companyName` String (任意)
  * `submitURL` String - POSTとしてクラッシュレポートが送られるURL。
  * `productName` String (任意) - 省略値は`app.getName()`。
  * `uploadToServer` Boolean (任意) - クラッシュレポートをサーバに送るかどうか。省略値は`true`。
  * `ignoreSystemCrashHandler` Boolean (任意) - 省略値は`false`。
  * `extra` Object (任意) - レポートと共に送信されるように定義できるオブジェクト。 文字列のプロパティだけは正常に送られる。 ネストされたオブジェクト、または名前と値が64文字以上のプロパティはサポートされていない。
  * `crashesDirectory` String (任意) - クラッシュレポートを格納する一時ディレクトリ (`process.crashReporter.start`を介してクラッシュレポータを起動させるときにのみ使用される)

クラッシュレポートの収集元となる他の`crashReporter`API、各プロセス(メイン/レンダラー)を使用する前にこのメソッドを呼び出す必要があります。 異なるプロセスから呼び出すときは、`crashReporter.start`に異なるオプションを渡すことができます。

**注釈** `child_process`モジュールを介して作成した子プロセスはこのモジュールにアクセスする必要はないでしょう。 その代わりに、それらからクラッシュレポートを収集するために、`process.crashReporter.start`を使用します。 上記のオプションに`crashesDirectory`を加えて渡し、クラッシュレポートを格納する一時ディレクトリを指定して下さい。 子プロセスをクラッシュさせる`process.crash()`を呼ぶことでこれをテストできます。

**注釈:** Windowsで子プロセスからクラッシュレポートを集めるには、 このコードを同じように加える必要があります。 これでクラッシュレポートを監視/送信するプロセスが起動します。 `submitURL`、`productName`、`crashesDirectory`を適切な値に置き換えて下さい。

**注釈:** もし最初に`start`を呼んだ後に追加/更新した`extra`を送る必要があれば、macOSでは`setExtraParameter`を、LinuxとWindowsでは`start`を新しい`extra`と共に呼び直すことでできます。

```js
 const args = [
   `--reporter-url=${submitURL}`,
   `--application-name=${productName}`,
   `--crashes-directory=${crashesDirectory}`
 ]
 const env = {
   ELECTRON_INTERNAL_CRASH_SERVICE: 1
 }
 spawn(process.execPath, args, {
   env: env,
   detached: true
 })
```

**Note:** On macOS, Electron uses a new `crashpad` client for crash collection and reporting. If you want to enable crash reporting, initializing `crashpad` from the main process using `crashReporter.start` is required regardless of which process you want to collect crashes from. Once initialized this way, the crashpad handler collects crashes from all processes. You still have to call `crashReporter.start` from the renderer or child process, otherwise crashes from them will get reported without `companyName`, `productName` or any of the `extra` information.

### `crashReporter.getLastCrashReport()`

Returns [`CrashReport`](structures/crash-report.md):

Returns the date and ID of the last crash report. If no crash reports have been sent or the crash reporter has not been started, `null` is returned.

### `crashReporter.getUploadedReports()`

Returns [`CrashReport[]`](structures/crash-report.md):

Returns all uploaded crash reports. Each report contains the date and uploaded ID.

### `crashReporter.getUploadToServer()` *Linux* *macOS*

Returns `Boolean` - Whether reports should be submitted to the server. Set through the `start` method or `setUploadToServer`.

**Note:** This API can only be called from the main process.

### `crashReporter.setUploadToServer(uploadToServer)` *Linux* *macOS*

* `uploadToServer` Boolean *macOS* - Whether reports should be submitted to the server

This would normally be controlled by user preferences. This has no effect if called before `start` is called.

**Note:** This API can only be called from the main process.

### `crashReporter.addExtraParameter(key, value)` *macOS*

* `key` String - Parameter key, must be less than 64 characters long.
* `value` String - Parameter value, must be less than 64 characters long.

Set an extra parameter to be sent with the crash report. The values specified here will be sent in addition to any values set via the `extra` option when `start` was called. This API is only available on macOS, if you need to add/update extra parameters on Linux and Windows after your first call to `start` you can call `start` again with the updated `extra` options.

### `crashReporter.removeExtraParameter(key)` *macOS*

* `key` String - Parameter key, must be less than 64 characters long.

Remove a extra parameter from the current set of parameters so that it will not be sent with the crash report.

### `crashReporter.getParameters()`

See all of the current parameters being passed to the crash reporter.

## Crash Report Payload

The crash reporter will send the following data to the `submitURL` as a `multipart/form-data` `POST`:

* `ver` String - The version of Electron.
* `platform` String - e.g. 'win32'.
* `process_type` String - e.g. 'renderer'.
* `guid` String - e.g. '5e1286fc-da97-479e-918b-6bfb0c3d1c72'
* `_version` String - The version in `package.json`.
* `_productName` String - The product name in the `crashReporter` `options` object.
* `prod` String - Name of the underlying product. In this case Electron.
* `_companyName` String - The company name in the `crashReporter` `options` object.
* `upload_file_minidump` File - The crash report in the format of `minidump`.
* All level one properties of the `extra` object in the `crashReporter` `options` object.