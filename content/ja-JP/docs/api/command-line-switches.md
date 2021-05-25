# サポートしているコマンドラインスイッチ

> Electronによってサポートされているコマンドラインスイッチ。

[app][app] モジュールで [ready][ready] イベントが発生する前に、アプリのメインスクリプトで [app.commandLine.appendSwitch][append-switch] を使って、コマンドラインスイッチを追加することができます。

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.whenReady().then(() => {
  // コードをここに
})
```

## Electron CLI フラグ

### --auth-server-whitelist=`url`

統合認証が有効であるサーバーのコンマ区切りのリスト。

例:

```sh
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

末尾が `example.com`、`foobar.com`、`baz` である `url` は、統合認証の対象になります。 `*` のプリフィックスがない場合は、URL は厳密に一致する必要があります。

### --auth-negotiate-delegate-whitelist=`url`

ユーザー資格情報の委任が必要なサーバのコンマ区切りリスト。 `*` のプリフィックスがない場合は、URL は厳密に一致する必要があります。

### --disable-ntlm-v2

POSIX プラットフォーム向けに NTLM v2 を無効化します。他プラットフォームでの効果はありません。

### --disable-http-cache

HTTPリクエストに対するディスクキャッシュを無効にします。

### --disable-http2

HTTP/2 および SPDY/3.1 プロトコルを無効にします。

### --disable-renderer-backgrounding

Chromiumが隠れたページのレンダラープロセスの優先順位を下げるのを防止します。

このフラグはすべてのレンダラープロセスに影響を及ぼすので、1つのウインドウの制限を無効にしたいだけの場合、[無音のオーディオを再生する][play-silent-audio]というテクニックを使うことができます。

### --disk-cache-size=`size`

ディスクキャッシュによって使用されるバイト単位での最大のディスク容量を強制的に設定します。

### --enable-api-filtering-logging

以下の API の呼び出し元スタックログを有効にします (イベントのフィルタリング)。

* `desktopCapturer.getSources()` / `desktop-capturer-get-sources`
* `remote.require()` / `remote-require`
* `remote.getGlobal()` / `remote-get-builtin`
* `remote.getBuiltin()` / `remote-get-global`
* `remote.getCurrentWindow()` / `remote-get-current-window`
* `remote.getCurrentWebContents()` / `remote-get-current-web-contents`

### --enable-logging

コンソールにChromiumのログを出力します。

このスイッチは、ユーザのアプリがロードされるよりも早く解析されるため、`app.commandLine.appendSwitch` で使用することはできませんが、同じ効果を得るために `ELECTRON_ENABLE_LOGGING` 環境変数を設定することができます。

### --force-fieldtrials=`trials`

フィールド トライアルを強制的に有効または無効にします。

例: `WebRTC-Audio-Red-For-Opus/Enabled/`

### --host-rules=`rules`

ホスト名をどのようにマッピングするかを制御する `rules` のコンマ区切りのリスト。

例:

* `MAP * 127.0.0.1` は、すべてのホスト名を強制的に127.0.0.1にマッピングします。
* `MAP *.google.com proxy` は、すべてのgoogle.comのサブドメインを強制的に "proxy" で解決されるようにします。
* `MAP test.com [::1]:77` は "test.com" を強制的に IPv6 ループバックへ解決されるようにします。 また、ソケットアドレスのポートを 77 に強制します。
* `MAP * baz, EXCLUDE www.google.com` は、"www.google.com" 以外のすべてを "baz" に再マッピングします。

これらのマッピングは、ネットワークリクエストのエンドポイントのホスト (直接接続でのTCP接続とホストリゾルバー、HTTPプロキシ接続での `CONNECT`、`SOCKS` プロキシ接続でのエンドポイントホスト) に対して適用されます。

### --host-resolver-rules=`rules`

`--host-rules` と似ていますが、これらの `rules` は、ホストリゾルバーにしか適用されません。

### --ignore-certificate-errors

証明書関連のエラーを無視します。

### --ignore-connections-limit=`domains`

`,` で区切られた `domains` リストに対する接続数の制限を無視します。

### --js-flags=`flags`

Node.js エンジンへ渡されるフラグを指定します。 `flags` をメインプロセスで有効化したい場合は、 Electron の開始時に与えられる必要があります。

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

利用できるフラグの一覧については、[Node.js のドキュメント][node-cli]を参照するか、ターミナルで `node --help` を実行してください。 さらに、Node.js の V8 JavaScript エンジンに関するフラグの一覧を具体的に見るには、`node --v8-options` を実行してください。

### --lang

カスタムロケールを設定します。

### --log-net-log=`path`

保存されるネットワークログイベントを有効にし、`path` にそれらを書き込みます。

### --no-proxy-server

プロキシサーバを使わず、常に直接接続を行います。 他に与えられたプロキシサーバのフラグをすべて上書きします。

### --no-sandbox

Chromium の [サンドボックス](https://www.chromium.org/developers/design-documents/sandbox) を無効化します。 レンダラープロセスと Chromium ヘルパープロセスにサンドボックスなしの実行を強制します。 テスト時のみ使用すべきです。

### --proxy-bypass-list=`hosts`

セミコロン区切りで与えられたホストに対してプロキシサーバを回避するように Electron へ指示します。 このフラグは `—proxy-server` と共に使用される場合のみ有効です。

例:

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

ローカルアドレス (`localhost`、`127.0.0.1` など)、`google.com` のサブドメイン、`foo.com` で終わるホストと `1.2.3.4:5678` を除く、すべてのホストに対してプロキシサーバーが使用されます。

### --proxy-pac-url=`url`

指定した `url` のPACスクリプトを使用します。

### --proxy-server=`address:port`

システム設定よりも優先して、指定したプロキシサーバーを使用します。 このスイッチは、HTTPSとWebSocketリクエストを含むHTTPプロトコルでのリクエストにしか影響しません。 また、すべてのプロキシサーバーがHTTPSとWebSocketリクエストに対応している訳ではないことにも注意してください。 プロキシ URL は [各 Chromium issue](https://bugs.chromium.org/p/chromium/issues/detail?id=615947) でのユーザー名とパスワードによる認証をサポートしていません。

### --remote-debugging-port=`port`

指定された `port` でHTTP越しのリモートデバッグを有効にします。

### --v=`log_level`

既定で有効な最高の V ロギングレベルを設定します。既定値は 0 です。 通常、正の値は V ロギングレベルに使用されます。

このスイッチは、`--enable-logging` が一緒に渡されたときのみ機能します。

### --vmodule=`pattern`

`--v` で指定された値を上書きするモジュール単位の最大のVログレベルを指定します。 以下は例です。 `my_module=2,foo*=3` は、`my_module.*` と `foo*.*` のソースファイルにあるすべてのコードのログレベルを変更します。

スラッシュまたはバックスラッシュを含むパターンは、モジュールだけでなく全体のパス名に対してテストされます。 以下は例です。 `*/foo/bar/*=2` は、`foo/bar` ディレクトリの下にあるソースファイルのすべてのコードのログレベルを変更します。

このスイッチは、`--enable-logging` が一緒に渡されたときのみ機能します。

### --force_high_performance_gpu

複数のGPUが利用可能な場合、離散GPUを強制的に使用します。

### --force_low_power_gpu

複数のGPUが利用可能な場合、統合GPUを強制的に使用します。

## Node.js フラグ

Electron は Node.js でサポートされている [CLI フラグ][node-cli] の一部をサポートしています。

**注:** `ELECTRON_RUN_AS_NODE` で実行していないときに未サポートのコマンドラインスイッチを Electron に渡しても、効果はありません。

### --inspect-brk[=[host:]port]

host:port でインスペクタを起動し、ユーザスクリプトの開始時にブレークします。 host:port の省略値は 127.0.0.1:9229 です。

`--debug-brk=[host:]port` のエイリアスです。

### --inspect-port=[host:]port

インスペクタが起動したときに使用する `host:port` を設定します。 SIGUSR1 シグナルを送信してインスペクタを起動するときに便利です。 host の省略値は `127.0.0.1` です。

`--debug-port=[host:]port` のエイリアスです。

### --inspect[=[host:]port]

`host:port` でインスペクタを有効にします。 省略値は `127.0.0.1:9229` です。

V8 インスペクタの統合により、Chrome デベロッパー ツールや IDE などのツールで Electron インスタンスのデバッグやプロファイルが可能になりました。 ツールは TCP ポートを介して Electron インスタンスにアタッチし、[Chrome デベロッパー ツールプロトコル](https://chromedevtools.github.io/devtools-protocol/) を使用して通信します。

詳細は [メインプロセスのデバッグ][debugging-main-process] ガイドを参照してください。

`--debug[=[host:]port]` のエイリアスです。

### --inspect-publish-uid=stderr,http

インスペクタの WebSocket URL の公開方法を指定します。

デフォルトでは、インスペクタの WebSocket URL は標準エラーで、http://host:port/json/list の /json/list エンドポイント下にあります。

[app]: app.md
[append-switch]: command-line.md#commandlineappendswitchswitch-value
[ready]: app.md#event-ready
[play-silent-audio]: https://github.com/atom/atom/pull/9485/files
[debugging-main-process]: ../tutorial/debugging-main-process.md
[node-cli]: https://nodejs.org/api/cli.html
[node-cli]: https://nodejs.org/api/cli.html
