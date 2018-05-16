# crashReporter

> クラッシュレポートをリモートサーバーに送信します。

プロセス: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

以下は、リモートサーバーにクラッシュレポートを自動的に送信する例です。

```javascript
const {crashReporter} = require('electron')

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

クラッシュレポートは、アプリケーション固有の一時ディレクトリフォルダーの中にローカルで保存されます。 `YourName` という `productName` の場合、クラッシュレポートは一時ディレクトリの中の `YourName Crashes` という名前のフォルダに保存されます。 クラッシュレポーターを開始する前に `app.setPath('temp', '/my/custom/temp')` APIを呼び出すことで、アプリのこの一時ディレクトリをカスタマイズすることができます。

## メソッド

`crashReporter` モジュールには以下のメソッドがあります。

### `crashReporter.start(options)`

* `options` Object 
  * `companyName` String (任意)
  * `submitURL` String - POSTでクラッシュレポートが送信されるURL。
  * `productName` String (任意) - 省略値は、`app.getName()` です。
  * `uploadToServer` Boolean (任意) - クラッシュレポートをサーバーに送信するかどうか。省略値は、`true` です。
  * `ignoreSystemCrashHandler` Boolean (任意) - 省略値は、`false` です。
  * `extra` Object (任意) - レポートと一緒に送信される定義可能なオブジェクト。 文字列のプロパティだけしか正しく送信されません。 ネストしたオブジェクトはサポートされておらず、プロパティの名前と値の長さは、64文字未満にするようにしてください。
  * `crashesDirectory` String (任意) - クラッシュレポートを一時的に保存するディレクトリ (クラッシュレポーターが `process.crashReporter.start` 経由で起動されたときのみ使用されます).

他の `crashReporter` APIを使用する前に、クラッシュレポートを収集したい各プロセス (メイン/レンダラー) で、このメソッドを呼び出す必要があります。 異なるプロセスから呼び出すときは、`crashReporter.start` に異なるオプションを渡すことができます。

**注:** `child_process` モジュール経由で作成された子プロセスは、Electronモジュールにアクセスすることはできません。 それ故、それらからクラッシュレポートを収集するため、代わりに `process.crashReporter.start` を使用してください。 クラッシュレポートを一時的に保存するディレクトリを指す `crashesDirectory` と呼ばれる追加のオプションと一緒に上記と同じオプションを渡してください。 子プロセスをクラッシュさせる `process.crash()` を呼び出すことで、これをテストすることができます。

**注:** Windowsで子プロセスからクラッシュレポートを収集するためには、同様にこの追加のコードを付け加える必要があります。 これで監視してクラッシュレポートを送信するプロセスが開始されます。 `submitURL`、`productName`、`crashesDirectory`を適切な値に置換してください。

**注釈:** 最初の `start` の呼び出しの後、追加/更新した `extra` パラメーターを送信する必要がある場合、macOS では、`addExtraParameter` を呼び出してください。Linux と Windows では、追加/更新した `extra` パラメーターとともに `start` を再度、呼び出してください。

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

**注:** macOSでは、Electronはクラッシュの収集とレポートに新しい `crashpad` クライアントを使用します。 クラッシュレポートを有効にしたい場合、どのプロセスからクラッシュを収集したいかに関わらず、メインプロセスから `crashReporter.start` を使用して `crashpad` を初期化する必要があります。 一度、この方法で初期化されると、crashpadのハンドラーはすべてのプロセスからクラッシュを収集します。 依然として、レンダラーや子プロセスから `crashReporter.start` を呼び出す必要があります。そうでない場合、それらからのクラッシュは、`companyName`、`productName` やすべての `extra` 情報なしでレポートされます。

### `crashReporter.getLastCrashReport()`

戻り値 [`CrashReport`](structures/crash-report.md):

最後のクラッシュレポートの日付とIDを返します。クラッシュレポートが送信されていないか、クラッシュレポートが開始されていない場合、`null` が返されます。

### `crashReporter.getUploadedReports()`

戻り値 [`CrashReport[]`](structures/crash-report.md):

すべてのアップロードされたクラッシュレポートを返します。各レポートには日付とアップロードされたIDを含まれます。

### `crashReporter.getUploadToServer()` *Linux* *macOS*

戻り値 `Boolean` - レポートがサーバーに送信されるかどうか。`start` メソッドまたは `setUploadToServer` を通じて設定してください。

**注:** このAPIは、メインプロセスからしか呼び出すことができません。

### `crashReporter.setUploadToServer(uploadToServer)` *Linux* *macOS*

* `uploadToServer` Boolean *macOS* - レポートがサーバーに送信されるかどうか.

通常、ユーザプリファレンスによって制御されます。`start` が呼び出される前に呼び出しても無効です。

**注:** このAPIは、メインプロセスからしか呼び出すことができません。

### `crashReporter.addExtraParameter(key, value)` *macOS*

* `key` String - パラメータキー。長さは、64文字未満でなければなりません。
* `value` String - パラメータの値。長さは、64文字未満でなければなりません。

クラッシュレポートで送信される追加のパラメータを設定します。 ここで指定された値は、`start` が呼び出されたときに `extra` オプション経由で設定された値と一緒に送信されます。 このAPIはmacOSでのみ利用可能です。LinuxとWindowsで最初の `start` の呼び出しの後、追加/更新した追加のパラメーターを送信する必要がある場合、更新した `extra` オプションと一緒に `start` を再度、呼び出してください。

### `crashReporter.removeExtraParameter(key)` *macOS*

* `key` String - パラメータキー。長さは、64文字未満でなければなりません。

クラッシュレポートと一緒に送信されないように、現在のパラメータセットから追加したパラメータを削除します。

### `crashReporter.getParameters()`

クラッシュレポーターに渡されているすべての現在のパラメータを参照します。

## クラッシュレポートの内容

クラッシュレポーターは、以下のデータを `submitURL` に `multipart/form-data` の `POST` で送信します。

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