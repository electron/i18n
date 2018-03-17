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
  * `crashesDirectory` String (任意) - クラッシュレポートを一時的に保存するディレクトリ (クラッシュレポーターが `process.crashReporter.start` 経由で起動されたときのみ使用されます)

他の `crashReporter` APIを使用する前に、クラッシュレポートを収集したい各プロセス (メイン/レンダラー) で、このメソッドを呼び出す必要があります。 異なるプロセスから呼び出すときは、`crashReporter.start` に異なるオプションを渡すことができます。

**注** `child_process` モジュール経由で作成された子プロセスは、Electronモジュールにアクセスすることはできません。 その代わりに、それらからクラッシュレポートを収集するために、`process.crashReporter.start`を使用します。 上記のオプションに`crashesDirectory`を加えて渡し、クラッシュレポートを格納する一時ディレクトリを指定して下さい。 子プロセスをクラッシュさせる`process.crash()`を呼ぶことでこれをテストできます。

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

**注釈:** macOSでは、クラッシュレポートの収集と送信に`crashpad`という新しいクライアントが使われます。 もしこのクラッシュレポータを有効にしたい場合は、クラッシュレポートを収集したいかに関係なく、メインプロセスから`crashReporter.start`を用いて`crashpad`を初期化する必要があります。 一度この方法で初期化すると、crashpadは全てのプロセスからクラッシュレポートを収集します。 `companyName`、`productName`、または`extra`以外がレポートされるクラッシュの情報を取得するには、レンダラーや子プロセスからも`crashReporter.start`を呼ぶ必要があります。

### `crashReporter.getLastCrashReport()`

戻り値 [`CrashReport`](structures/crash-report.md):

日付とIDが最後のクラッシュレポートを返します。もしクラッシュレポートが送信されていないかクラッシュレポータが起動していない場合、`null`が返されます。

### `crashReporter.getUploadedReports()`

戻り値 [`CrashReport[]`](structures/crash-report.md):

すべてのアップロードされたクラッシュレポートを返します。各レポートは日付とアップロードIDを含みます。

### `crashReporter.getUploadToServer()` *Linux* *macOS*

戻り値 `Boolean` - クラッシュレポートがサーバにアップロードされるかどうか。 `start`メソッドか`setUploadToServer`からセットする。

**注釈:** このAPIはメインプロセスからのみ呼び出すことができます。

### `crashReporter.setUploadToServer(uploadToServer)` *Linux* *macOS*

* `uploadToServer` Boolean *macOS* - サーバにクラッシュレポートを提出するかどうか。

これは通常ユーザー設定によって制御されるでしょう。`start`が呼ばれる前に呼んでも効果はありません。

**注釈:** このAPIはメインプロセスからのみ呼び出すことができます。

### `crashReporter.addExtraParameter(key, value)` *macOS*

* `key` String - パラメータのキー、64文字未満でなければならない。
* `value` String - パラメータの値、64文字未満でなければならない。

クラッシュレポートで送信されるextraパラメーターをセットします。 `start`を呼ぶときに`extra`オプションを通してセットする、追加で送信される値を指定します。 このAPIはmacOSでのみ使用可能で、もしLinuxとWindowsで最初に`start`を呼んだあとにextraパラメータを追加/更新する必要があれば、`start`を新しい`extra`と共に呼び直すことでできます。

### `crashReporter.removeExtraParameter(key)` *macOS*

* `key` String - パラメータのキー、64文字未満でなければならない。

現在のパラメータ群からextraパラメータを削除します。なので、それはクラッシュレポートと共に送信されなくなります。

### `crashReporter.getParameters()`

クラッシュレポータに渡した現在のパラメータ全てを閲覧します。

## クラッシュレポートの内容

クラッシュレポータは`submitURL`に`multipart/form-data`の形式で`POST`で以下のデータを送信します。

* `ver` String - Electronのバージョン。
* `platform` String - 'win32'など。
* `process_type` String - 'renderer'など.
* `guid` String - '5e1286fc-da97-479e-918b-6bfb0c3d1c72'など。
* `_version` String - `package.json`内のバージョン。
* `_productName` String - `crashReporter`の`options`内のproductName。
* `prod` String - 基底のプロダクト。この場合はElectron。
* `_companyName` String - `crashReporter`の`options`内のcompanyName。
* `upload_file_minidump` File - `minidump`フォーマットのクラッシュレポート。
* `crashReporter`の`options`内の`extra`オブジェクトの全ての最上位プロパティ。