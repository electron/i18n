# crashReporter

> クラッシュレポートをリモートサーバーに送信します。

プロセス: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

以下は、Electron が外部サーバーにクラッシュレポートを自動送信するように設定する例です。

```javascript
const { crashReporter } = require('electron')

crashReporter.start({ submitURL: 'https://your-domain.com/url-to-submit' })
```

クラッシュレポートを受信して処理するサーバーをセットアップするには、以下のプロジェクトを使用することができます。

* [socorro](https://github.com/mozilla/socorro)
* [mini-breakpad-server](https://github.com/electron/mini-breakpad-server)

また、サードパーティによる解決方法も使用できます。

* [Backtrace](https://backtrace.io/electron/)
* [Sentry](https://docs.sentry.io/clients/electron)
* [BugSplat](https://www.bugsplat.com/docs/platforms/electron)

クラッシュレポートは、アップロードされる前にアプリのユーザーデータディレクトリ下にあるディレクトリに一時保存されます (Windows と Mac では 'Crashpad'、Linux では 'Crash Reports' と呼びます)。 クラッシュし始める前に `app.setPath('crashDumps', '/path/to/crashes')` を呼び出すことで、このディレクトリをオーバーライドできます。

Windows と macOS において、Electron は [crashpad](https://chromium.googlesource.com/crashpad/crashpad/+/master/README.md) を使用してクラッシュを監視し報告します。 Linux では、Electron は [breakpad](https://chromium.googlesource.com/breakpad/breakpad/+/master/) を使用します。 これは Chromium が動かす内部実装によるもので、将来的に変更される可能性があります。 特に crashpad は新しく、最終的には全プラットフォームで breakpad を置き換える可能性が高いです。

### Linux 上の Node 子プロセスに関する注意

Node.js の `child_process` モジュールを使用していて、Linux 上でそれらのプロセスからクラッシュを報告したい場合、子プロセスのクラッシュレポーターを適切に初期化するために追加の手順が必要になります。 Mac や Windows のプラットフォームでは、子プロセスを自動的に監視する Crashpad を使用しているため不要です。

`require('electron')` は Node の子プロセスでは利用できないので、Node の子プロセスでは `process` オブジェクトの以下の API を利用することができます。 注意として、Linux では、Node の子プロセスはそれぞれ別々の breeakpad クラッシュレポーターのインスタンスを保持します。 これはレンダラーの子プロセスとは異なり、情報をメインプロセスに返してレポートする "スタブ" breakpad レポーターです。

#### `process.crashReporter.start(options)`

[`crashReporter.start()`](#crashreporterstartoptions) をご参照ください。

#### `process.crashReporter.getParameters()`

[`crashReporter.getParameters()`](#crashreportergetparameters) をご参照ください。

#### `process.crashReporter.addExtraParameter(key, value)`

[`crashReporter.addExtraParameter(key, value)`](#crashreporteraddextraparameterkey-value) をご参照ください。

#### `process.crashReporter.removeExtraParameter(key)`

[`crashReporter.removeExtraParameter(key)`](#crashreporterremoveextraparameterkey) をご参照ください。

## メソッド

`crashReporter` モジュールには以下のメソッドがあります。

### `crashReporter.start(options)`

* `options` Object
  * `submitURL` String (optional) - URL that crash reports will be sent to as POST. Required unless `uploadToServer` is `false`.
  * `productName` String (任意) - 省略値は、`app.name` です。
  * `companyName` String (任意) _非推奨_ - `{ globalExtra: { _companyName: ... } }` の非推奨な別名です。
  * `uploadToServer` Boolean (任意) - クラッシュレポートをサーバーに送信するかどうか。 false の場合、クラッシュレポートは収集されてクラッシュのディレクトリに保存されますが、アップロードされません。 省略値は `true` です。
  * `ignoreSystemCrashHandler` Boolean (任意) - true の場合、メインプロセスで発生したクラッシュをシステムクラッシュハンドラに転送しません。 省略値は、`false` です。
  * `rateLimit` Boolean (任意) _macOS_ _Windows_ - true の場合、アップロードされるクラッシュの数を 1 時間につき 1 つに制限します。 省略値は、`false` です。
  * `compress` Boolean (任意) - true の場合、クラッシュレポートは圧縮され `Content-Encoding: gzip` でアップロードされます。 省略値は `true` です。
  * `extra` Record<String, String> (任意) - メインプロセスが生成するクラッシュレポートと一緒に送信される追加のキー/バリューアノテーションの文字列。 文字列のみをサポートしています。 子プロセスから生成されたクラッシュレポートはこれらの追加パラメータを含みません。子プロセスが生成したクラッシュにこれらを含める場合は、子プロセスから [`addExtraParameter`](#crashreporteraddextraparameterkey-value) を呼び出してください。
  * `globalExtra` Record<String, String> (任意) - 任意のプロセスが生成したクラッシュレポートと一緒に送信される、追加のキー/バリューアノテーションの文字列。 これらのアノテーションは、クラッシュレポーターを起動すると変更できません。 グローバル追加パラメータとプロセス固有の追加パラメータの両方に同じキーが存在する場合、グローバルのものが優先されます。 デフォルトでは、 `productName` と、Electron のバージョンと同様のアプリのバージョンが含まれています。

このメソッドは、他の `crashReporter` API を使用する前に呼ばれなければなりません。 このように初期化すると、crashpad ハンドラは、以降作成されたすべてのプロセスからクラッシュを収集します。 一度起動したクラッシュレポーターは無効にできません。

このメソッドは、アプリの起動時にできるだけ早く、できれば `app.on('ready')` の前に呼び出す必要があります。 レンダラープロセスの作成時にクラッシュレポーターが初期化されていない場合、そのレンダラープロセスはクラッシュレポーターに監視されません。

**注:** `process.crash()` でクラッシュを生成することで、クラッシュレポーターをテストできます。

**注意:** 最初の `start` 呼び出しの後に追加/更新された `extra` パラメータを送信する必要がある場合は、`addExtraParameter` を呼び出すことでできます。

**注:** `extra`、`globalExtra` で渡すパラメータや `addExtraParameter` で設定するパラメータは、キーと値の長さに制限があります。 キー名の長さは最大 39 バイト、値の長さは 127 バイト以下でなければなりません。 最大値より長い名前を持つキーは警告を出さずに無視されます。 キーの値が最大長より長ければ切り捨てられます。

**注意:** このメソッドはメインプロセスからのみ利用できます。

### `crashReporter.getLastCrashReport()`

戻り値 [`CrashReport`](structures/crash-report.md) - 最後のクラッシュレポートの日付と ID。 アップロードされたクラッシュレポートだけを返します。例えば、クラッシュレポートがディスク上に存在したとしても、アップロードしていなければそれを返しません。 アップロードされたレポートがない場合これは、`null` を返します。

**注意:** このメソッドはメインプロセスからのみ利用できます。

### `crashReporter.getUploadedReports()`

戻り値 [`CrashReport[]`](structures/crash-report.md):

アップロードされたすべてのクラッシュレポートを返します。 各レポートには、日付とアップロードされた ID が含まれています。

**注意:** このメソッドはメインプロセスからのみ利用できます。

### `crashReporter.getUploadToServer()`

戻り値 `Boolean` - レポートがサーバに送信されるべきかどうか。 `start` メソッドまたは `setUploadToServer` を通して設定されます。

**注意:** このメソッドはメインプロセスからのみ利用できます。

### `crashReporter.setUploadToServer(uploadToServer)`

* `uploadToServer` Boolean - レポートがサーバーに送信されるかどうか.

これは通常、ユーザーの設定によって制御されます。 `start` が呼ばれるまでは何もしません。

**注意:** このメソッドはメインプロセスからのみ利用できます。

### `crashReporter.addExtraParameter(key, value)`

* `key` String - パラメータキー。39 バイト未満でなければなりません。
* `value` String - パラメータの値。127 バイト未満でなければなりません。

クラッシュレポートで送信される追加のパラメータを設定します。 ここで指定された値は、`start` が呼ばれたときに `extra` オプションで設定された値に加えて送信されます。

この方法 (または `crashReporter.start` の`extra` パラメータ) で追加されたパラメータは、呼び出すプロセスに固有のものです。 メインプロセスに追加パラメータを追加しても、それらのパラメータはレンダラーや他の子プロセスからのクラッシュとは一緒に送信されません。 同様に、レンダラープロセスでパラメータを追加しても、他のレンダラープロセスやメインプロセスで発生するクラッシュでそれらのパラメータは送信されません。

**注:** パラメータはキーと値の長さに制限があります。 キー名の長さは 39 バイト未満、値の長さは 20320 バイト未満でなければなりません。 最大値より長い名前を持つキーは警告を出さずに無視されます。 キーの値が最大長より長ければ切り捨てられます。

**注:** Linux では、127 バイトより長い値は複数のキーに分割され、それぞれの長さが 127 バイトになります。  以下は例です。 `addExtraParameter('foo', 'a'.repeat(130))` の場合、2 つにチャンク化されたキー `foo__1` と `foo__2` が生成され、1 つ目のキーには最初の 127 バイトが、2 つ目のキーには残りの 3 バイトが含まれます。  クラッシュレポートのバックエンドでは、この形式のキーをつなぎ合わせる必要があります。

### `crashReporter.removeExtraParameter(key)`

* `key` String - パラメータキー。39 バイト未満でなければなりません。

現在のパラメータセットから追加パラメータを削除します。 今後のクラッシュにこのパラメータは含まれなくなります。

### `crashReporter.getParameters()`

戻り値 `Record<String, String>` - クラッシュレポーターの現在の '追加' パラメータ。

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
