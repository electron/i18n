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

* [Backtrace](https://backtrace.io/electron/)
* [Sentry](https://docs.sentry.io/clients/electron)
* [BugSplat](https://www.bugsplat.com/docs/platforms/electron)

クラッシュレポートは、アプリケーション固有の一時ディレクトリフォルダーの中にローカルで保存されます。 `YourName` という `productName` の場合、クラッシュレポートは一時ディレクトリの中の `YourName Crashes` という名前のフォルダに保存されます。 クラッシュレポーターを開始する前に `app.setPath('temp', '/my/custom/temp')` APIを呼び出すことで、アプリのこの一時ディレクトリをカスタマイズすることができます。

## メソッド

`crashReporter` モジュールには以下のメソッドがあります。

### `crashReporter.start(options)`

* `options` Object
  * `companyName` String
  * `submitURL` String - POSTでクラッシュレポートが送信されるURL。
  * `productName` String (任意) - 省略値は、`app.name` です。
  * `uploadToServer` Boolean (任意) - クラッシュレポートをサーバーに送信するかどうか。 省略値は `true` です。
  * `ignoreSystemCrashHandler` Boolean (任意) - 省略値は、`false` です。
  * `extra` Record&lt;String, String&gt; (任意) - レポートと一緒に送信される、自由に定義できるオブジェクト。 文字列のプロパティだけしか正しく送信されません。 ネストしたオブジェクトはサポートしていません。 Windows を使用する場合、プロパティ名と値は 64 文字未満でなければなりません。
  * `crashesDirectory` String (任意) - クラッシュレポートを一時的に保存するディレクトリ (クラッシュレポーターが `process.crashReporter.start` 経由で起動されたときのみ使用されます)。

他の `crashReporter` APIを使用する前に、クラッシュレポートを収集したい各プロセス (メイン/レンダラー) で、このメソッドを呼び出す必要があります。 異なるプロセスから呼び出すときは、`crashReporter.start` に異なるオプションを渡すことができます。

**注:** `child_process` モジュール経由で作成された子プロセスは、Electronモジュールにアクセスすることはできません。 それ故、それらからクラッシュレポートを収集するため、代わりに `process.crashReporter.start` を使用してください。 クラッシュレポートを一時的に保存するディレクトリを指す `crashesDirectory` と呼ばれる追加のオプションと一緒に上記と同じオプションを渡してください。 子プロセスをクラッシュさせる `process.crash()` を呼び出すことで、これをテストすることができます。

**注:** 最初の `start` の呼び出しの後、追加・更新した `extra` パラメーターを送信する必要がある場合、macOS では、`addExtraParameter` を呼び出してください。Linux と Windows では、追加/更新した `extra` パラメーターとともに `start` を再度、呼び出してください。

**注:** macOS と Windows では、Electron はクラッシュの収集と報告に新しい `crashpad` クライアントを使用します。 クラッシュレポートを有効にしたい場合、どのプロセスからクラッシュを収集したいかに関わらず、メインプロセスから `crashReporter.start` を使用して `crashpad` を初期化する必要があります。 一度、この方法で初期化されると、crashpadのハンドラーはすべてのプロセスからクラッシュを収集します。 依然として、レンダラーや子プロセスから `crashReporter.start` を呼び出す必要があります。そうでない場合、それらからのクラッシュは、`companyName`、`productName` やすべての `extra` 情報なしでレポートされます。

### `crashReporter.getLastCrashReport()`

戻り値 [`CrashReport`](structures/crash-report.md):

ひとつ前のクラッシュレポートのIDとその日付を返します。 アップロードされたクラッシュレポートだけを返します。例え、クラッシュレポートがディスク上に存在したとしてもそれはアップロードされるまで返しません。 アップロードされたレポートがない場合これは、`null` を返します。

### `crashReporter.getUploadedReports()`

戻り値 [`CrashReport[]`](structures/crash-report.md):

アップロードされたすべてのクラッシュレポートを返します。 各レポートには、日付とアップロードされた ID が含まれています。

### `crashReporter.getUploadToServer()`

戻り値 `Boolean` - レポートがサーバに送信されるべきかどうか。 `start` メソッドまたは `setUploadToServer` を通して設定されます。

**注:** このAPIは、メインプロセスからしか呼び出すことができません。

### `crashReporter.setUploadToServer(uploadToServer)`

* `uploadToServer` Boolean _macOS_ - レポートがサーバに送信されるべきかどうか.

これは通常、ユーザーの設定によって制御されます。 `start` が呼ばれるまでは何もしません。

**注:** このAPIは、メインプロセスからしか呼び出すことができません。

### `crashReporter.addExtraParameter(key, value)` _macOS_ _Windows_

* `key` String - パラメータキー。長さは、64文字未満でなければなりません。
* `value` String - パラメータの値。長さは、64文字未満でなければなりません。

クラッシュレポートで送信される追加のパラメータを設定します。 ここで指定された値は、`start` が呼び出されたときに `extra` オプション経由で設定された値と一緒に送信されます。 この API は macOS と Windows でのみ利用可能です。Linux で最初の `start` の呼び出し後に追加/更新した追加のパラメーターを送信する必要がある場合、更新した `extra` オプションと一緒に、`start` を再度呼び出してください。

### `crashReporter.removeExtraParameter(key)` _macOS_ _Windows_

* `key` String - パラメータキー。長さは、64文字未満でなければなりません。

クラッシュレポートと一緒に送信されないように、現在のパラメータセットから追加したパラメータを削除します。

### `crashReporter.getParameters()`

クラッシュレポーターに渡されているすべての現在のパラメータを参照します。

### `crashReporter.getCrashesDirectory()`

戻り値 `String` - クラッシュディレクトリは、アップロードされる前に一時保存されます。

## クラッシュレポートの内容

クラッシュレポーターは、以下のデータを `submitURL` に `multipart/form-data` の `POST` で送信します。

* `ver` String - Electronのバージョン。
* `platform` String - 例えば、'win32'。
* `process_type` String - 例えば、'renderer'。
* `guid` String - 例えば、'5e1286fc-da97-479e-918b-6bfb0c3d1c72'。
* `_version` String - `package.json` のバージョン。
* `_productName` String - `crashReporter` の `options` のプロダクト名。
* `prod` String - 基底にあるプロダクトの名前。 この場合は Electron です。
* `_companyName` String - `crashReporter` の `options` の会社名。
* `upload_file_minidump` File - `minidump` 形式でのクラッシュレポート。
* `crashReporter` の `options` オブジェクトにある `extra` オブジェクトのすべてのレベル1プロパティ。
