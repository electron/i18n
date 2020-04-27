# アプリケーションのパッケージ化

Windows上の長いパス名の周りの [問題](https://github.com/joyent/node/issues/6960) を軽減したり、`require` をわずかにスピードアップしたり、ソースコードを簡単な調査から隠したりするために、ソースコードを少し変更することであなたのアプリを [asar](https://github.com/electron/asar) アーカイブにパッケージする選択ができます。

ほとんどのユーザーは、この機能を無料で利用できます。これは、[`electron-packager`](https://github.com/electron/electron-packager)、[`electron-forge`](https://github.com/electron-userland/electron-forge)、[`electron-builder`](https://github.com/electron-userland/electron-builder) でそのままサポートされているためです。 これらのツールを使用していない場合は、以下を読んでください。

## `asar` アーカイブの生成

[asar](https://github.com/electron/asar) アーカイブは、ファイルを1つに連結する tar ライクなシンプルなフォーマットです。 Electron はファイル全体を展開しなくても任意のファイルを読み込めます。

以下はアプリを `asar` アーカイブにパッケージする手順です。

### 1. asar ユーティリティをインストール

```sh
$ npm install -g asar
```

### 2. `asar pack`でパッケージ化

```sh
$ asar pack your-app app.asar
```

## `asar` アーカイブを使用する

Electron には、2 組の API があります。Node.js により提供される Node API、そして Chromium により提供されるウェブ API です。 どちらの API も `asar` アーカイブからのファイル読み込みに対応しています。

### Node API

Electron では Node.js をパッチしていて、`fs.readFile` や `require` のような Node API は、`asar` アーカイブを仮想ディレクトリのように扱い、その中のファイルをファイルシステム上の通常のファイルのように扱います。

例えば、`/path/to` 配下に、`example.asar` アーカイブがあると仮定します。

```sh
$ asar list /path/to/example.asar
/app.js
/file.txt
/dir/module.js
/static/index.html
/static/main.css
/static/jquery.min.js
```

`asar` アーカイブ内のファイルを読み込みます。

```javascript
const fs = require('fs')
fs.readFileSync('/path/to/example.asar/file.txt')
```

アーカイブのルート下にあるすべてのファイルを一覧します。

```javascript
const fs = require('fs')
fs.readdirSync('/path/to/example.asar')
```

アーカイブからモジュールを使用します。

```javascript
require('/path/to/example.asar/dir/module.js')
```

`BrowserWindow` で `asar` アーカイブ内のウェブページを表示することもできます。

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.loadURL('file:///path/to/example.asar/static/index.html')
```

### Web API

ウェブページで、アーカイブ内のファイルを `file:` プロトコルでリクエストできます。 Node API と同様、`asar` アーカイブはディレクトリのように扱われます。

例えば、`$.get` でファイルを取得するには以下のようにします。

```html
<script>
let $ = require('./jquery.min.js')
$.get('file:///path/to/example.asar/file.txt', (data) => {
  console.log(data)
})
</script>
```

### `asar` アーカイブを通常のファイルのように扱う

`asar` アーカイブそのもののチェックサムを検証するようないくつかのケースでは、`asar` アーカイブをファイルとして読み込む必要があります。 この目的のために、 `asar` をサポートしないオリジナルの `fs` API を提供する組み込みの `original-fs` モジュールを使用できます。

```javascript
const originalFs = require('original-fs')
originalFs.readFileSync('/path/to/example.asar')
```

もしくは、`process.noAssar` に `true` をセットして `fs` モジュールの `asar` サポートを無効にすることができます。

```javascript
const fs = require('fs')
process.noAsar = true
fs.readFileSync('/path/to/example.asar')
```

## Node API の制限

Node API で、`asar` アーカイブがディレクトリのように動作するよう可能な限り懸命に作成していますが、ローレベル環境での Node API に起因した制限がいくつかあります。

### アーカイブは読み取り専用

アーカイブは修正できないため、ファイルを変更できる変更できる全ての Node API は `asar` アーカイブに対して動作しません。

### 作業ディレクトリは、アーカイブ内のディレクトリに設定できない

`asar` アーカイブはディレクトリのように扱われるにも関わらず、ファイルシステム上には実際のディレクトリが存在しないため、`asar` アーカイブ内のディレクトリを作業ディレクトリとして設定することはできません。 いくつかの API の `cwd` 引数としてアーカイブ内のディレクトリを渡すのもエラーの原因になります。

### いくつかの API で余分な展開がされる

たいていの `fs` API は、展開せずに `asar` アーカイブからファイルを読み込んだり、ファイル情報を取得できます。しかし、システムコールに実際のファイルパスを渡すようになっているいくつかの API では、Electron は必要なファイルを一時ファイルとして展開し、API に一時ファイルのパスを渡して、API が動作するようにします。 このため、当該 API には多少のオーバーヘッドがあります。

以下は余分な展開が必要なAPIです。

* `child_process.execFile`
* `child_process.execFileSync`
* `fs.open`
* `fs.openSync`
* `process.dlopen` - ネイティブモジュールの `require` で使用されます。

### `fs.stat` の偽の統計情報

ファイルシステム上にアーカイブ内のファイルは存在しないので、`fs.stat`によって返される `Stats` オブジェクトと `asar` アーカイブ内のファイルへの関連情報は、推測して生成されます。 ファイルサイズの取得とファイルタイプのチェックを除いて、 `Stats` オブジェクトを信頼すべきではありません。

### `asar` アーカイブ内のバイナリの実行

`child_process.exec`、`child_process.spawn`、`child_process.execFile` のようなバイナリを実行できる Node API があります。しかし、`execFile` だけが `asar` アーカイブ内のバイナリ実行をサポートしています。

なぜならば、`exec` と `spawn` は入力として `file` の代わりに `command` を受け取り、`command` はシェル配下で実行されるからです。 コマンドが asar アーカイブ内のファイルを使うかどうかを決定するための信頼できる方法はありませんし、そうするとしてもコマンドで使うファイルパスを副作用なしに置き換えることができるかどうかを確認することはできません。

## `asar` アーカイブへパックされていないファイルを追加

上で述べたように、いくつかの Node API は、呼び出されたときにファイルをファイルシステムに解凍します。 パフォーマンスの問題とは別に、この動作によってさまざまなウイルス対策スキャナが起動される可能性があります。

回避策として、`--unpack` オプションを使用して様々なファイルを解凍したままにできます。 以下の例では、ネイティブ Node.js モジュールの共有ライブラリはパッケージされません。

```sh
$ asar pack app app.asar --unpack *.node
```

コマンドを実行すると、`app.asar.unpacked` という名前のフォルダが `app.asar` ファイルとともに作成されていることがわかります。 それには解凍されたファイルが含まれており、`app.asar` アーカイブと共に送られる必要があります。

