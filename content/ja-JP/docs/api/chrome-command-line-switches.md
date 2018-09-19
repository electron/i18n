# サポートされているChromeのコマンドラインスイッチ

> Electronによってサポートされているコマンドラインスイッチ。

[app](app.md) モジュールで [ready](app.md#event-ready) イベントが発生する前に、アプリのメインスクリプトで [app.commandLine.appendSwitch](app.md#appcommandlineappendswitchswitch-value) を使って、コマンドラインスイッチを追加することができます。

```javascript
const {app} = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.on('ready', () => {
  // ここにあなたのコード
})
```

## --ignore-connections-limit=`domains`

`,` で区切られた `domains` リストに対する接続数の制限を無視します。

## --disable-http-cache

HTTPリクエストに対するディスクキャッシュを無効にします。

## --disable-http2

HTTP/2 および SPDY/3.1 プロトコルを無効にします。

## --lang

カスタムロケールを設定します。

## --inspect=`port` and --inspect-brk=`port`

デバッグ関連のフラグです。詳細については、[メインプロセスのデバッグ](../tutorial/debugging-main-process.md)ガイドを参照してください。

## --remote-debugging-port=`port`

指定された `port` でHTTP越しのリモートデバッグを有効にします。

## --disk-cache-size=`size`

ディスクキャッシュによって使用されるバイト単位での最大のディスク容量を強制的に設定します。

## --js-flags=`flags`

Node JSエンジンに渡すフラグを指定します。メインプロセスで `flags` を有効にしたい場合、Electronを開始するときに渡す必要があります。

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

利用できるフラグの一覧については、[Nodeのドキュメント](https://nodejs.org/api/cli.html)を参照するか、ターミナルで `node --help` を実行してください。 さらに、NodeのV8 JavaScriptエンジンに関するフラグの一覧を具体的に見るには、`node --v8-options` を実行してください。

## --proxy-server=`address:port`

システム設定よりも優先して、指定したプロキシサーバーを使用します。 このスイッチは、HTTPSとWebSocketリクエストを含むHTTPプロトコルでのリクエストにしか影響しません。 また、すべてのプロキシサーバーがHTTPSとWebSocketリクエストに対応している訳ではないことにも注意してください。

## --proxy-bypass-list=`hosts`

指定したホストのセミコロン区切りのリストに対してプロキシサーバーをバイパスするよう、Electronに指示します。このフラグは、`--proxy-server` と併用する場合にしか効果がありません。

例:

```javascript
const {app} = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

ローカルアドレス (`localhost`、`127.0.0.1` など)、`google.com` のサブドメイン、`foo.com` で終わるホストと `1.2.3.4:5678` を除く、すべてのホストに対してプロキシサーバーが使用されます。

## --proxy-pac-url=`url`

指定した `url` のPACスクリプトを使用します。

## --no-proxy-server

プロキシサーバーを使用せず、常に直接接続します。渡された他のプロキシサーバーのフラグを上書きします。

## --host-rules=`rules`

ホスト名をどのようにマッピングするかを制御する `rules` のコンマ区切りのリスト。

例:

* `MAP * 127.0.0.1` は、すべてのホスト名を強制的に127.0.0.1にマッピングします。
* `MAP *.google.com proxy` は、すべてのgoogle.comのサブドメインを強制的に "proxy" で解決されるようにします。
* `MAP test.com [::1]:77` は、"test.com" を強制的にIPv6ループバックにします。また、最終的なソケットアドレスのポートを強制的に77にします。
* `MAP * baz, EXCLUDE www.google.com` は、"www.google.com" 以外のすべてを "baz" に再マッピングします。

これらのマッピングは、ネットワークリクエストのエンドポイントのホスト (直接接続でのTCP接続とホストリゾルバー、HTTPプロキシ接続での `CONNECT`、`SOCKS` プロキシ接続でのエンドポイントホスト) に対して適用されます。

## --host-resolver-rules=`rules`

`--host-rules` と似ていますが、これらの `rules` は、ホストリゾルバーにしか適用されません。

## --auth-server-whitelist=`url`

統合認証が有効であるサーバーのコンマ区切りのリスト。

例:

```sh
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

末尾が `example.com`、`foobar.com`、`baz` である `url` は、統合認証の対象になります。 `*` のプリフィックスがない場合は、URLは厳密に一致する必要があります。

## --auth-negotiate-delegate-whitelist=`url`

ユーザーの資格情報の委任が必要となるサーバーのコンマ区切りのリスト。`*` のプリフィックスがない場合は、URLは厳密に一致する必要があります。

## --ignore-certificate-errors

証明書関連のエラーを無視します。

## --ppapi-flash-path=`path`

Pepper Flashプラグインの `path` を設定します。

## --ppapi-flash-version=`version`

Pepper Flashプラグインの `version` を設定します。

## --log-net-log=`path`

保存されるネットワークログイベントを有効にし、`path` にそれらを書き込みます。

## --disable-renderer-backgrounding

Chromiumが隠れたページのレンダラープロセスの優先順位を下げるのを防止します。

このフラグはすべてのレンダラープロセスに影響を及ぼすので、1つのウインドウの制限を無効にしたいだけの場合、[無音のオーディオを再生する](https://github.com/atom/atom/pull/9485/files)というテクニックを使うことができます。

## --enable-logging

コンソールにChromiumのログを出力します。

このスイッチは、ユーザのアプリがロードされるよりも早く解析されるため、`app.commandLine.appendSwitch` で使用することはできませんが、同じ効果を得るために `ELECTRON_ENABLE_LOGGING` 環境変数を設定することができます。

## --v=`log_level`

既定の最大のアクティブなVログレベルを指定します。0が省略値です。通常、正の値がVログレベルには使われます。

このスイッチは、`--enable-logging` が一緒に渡されたときのみ機能します。

## --vmodule=`pattern`

`--v` で指定された値を上書きするモジュール単位の最大のVログレベルを指定します。 例えば、`my_module=2,foo*=3` は、`my_module.*` と `foo*.*` のソースファイルにあるすべてのコードのログレベルを変更します。

スラッシュまたはバックスラッシュを含むパターンは、モジュールにだけでなく、全体のパス名に対してテストされます。 例えば、`*/foo/bar/*=2` は、`foo/bar` ディレクトリの下にあるソースファイルのすべてのコードのログレベルを変更します。

このスイッチは、`--enable-logging` が一緒に渡されたときのみ機能します。