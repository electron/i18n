# アプリケーションのパッケージ化

Windows上の長いパス名の周りの [問題](https://github.com/joyent/node/issues/6960) を軽減したり、`require` をわずかにスピードアップしたり、ソースコードを簡単な調査から隠したりするために、ソースコードを少し変更することであなたのアプリを [asar](https://github.com/electron/asar) アーカイブにパッケージする選択ができます。

Most users will get this feature for free, since it's supported out of the box by [`electron-packager`](https://github.com/electron-userland/electron-packager), [`electron-forge`](https://github.com/electron-userland/electron-forge), and [`electron-builder`](https://github.com/electron-userland/electron-builder). If you are not using any of these tools, read on.

## `asar` アーカイブの生成

[asar](https://github.com/electron/asar) アーカイブは、ファイルを1つに連結するtarライクなシンプルなフォーマットです。 Electron はファイル全体を展開しなくても任意のファイルを読み込めます。

アプリを `asar` アーカイブにパッケージ化する手順：

### 1. asar ユーティリティをインストール

```sh
$ npm install -g asar
```

### `asar pack`でパッケージ化

```sh
$ asar pack your-app app.asar
```

## `asar` アーカイブを使用する

Electronには、2組のAPIがあります：Node.js により提供される Node API、そして Chromium により提供される Web API です。どちらの API も `asar` アーカイブからのファイル読み込みに対応しています。

### Node API

ElectronではNode.jsを改修し、`fs.readFile` や `require` のようなNode APIは、`asar` アーカイブを仮想ディレクトリのように扱い、ファイルをファイルシステム上の通常のファイルのように扱います。

例えば、`/path/to` 配下に、`example.asar` アーカイブがあると仮定します:

```sh
$ asar list /path/to/example.asar
/app.js
/file.txt
/dir/module.js
/static/index.html
/static/main.css
/static/jquery.min.js
```

`asar` アーカイブ内のファイルを読み込む:

```javascript
const fs = require('fs')
fs.readFileSync('/path/to/example.asar/file.txt')
```

アーカイブのルート配下にあるすべてのファイルの一覧を取得する:

```javascript
const fs = require('fs')
fs.readdirSync('/path/to/example.asar')
```

アーカイブからモジュールを使用する:

```javascript
require('/path/to/example.asar/dir/module.js')
```

`BrowserWindow` を使って `asar` アーカイブ内の Web ページを表示することもできます:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.loadURL('file:///path/to/example.asar/static/index.html')
```

### Web API

Webページで、アーカイブ内のファイルを `file:` プロトコルでリクエストできます。 Node API と同様、`asar` アーカイブはディレクトリのように扱われます。

例えば、`$.get` でファイルを取得するには:

```html
<script>
let $ = require('./jquery.min.js')
$.get('file:///path/to/example.asar/file.txt', (data) => {
  console.log(data)
})
</script>
```

### `asar` アーカイブを通常のファイルのように扱う

`asar`アーカイブそのもののチェックサムを検証する等のいくつかのケースでは、`asar` アーカイブをファイルとして読み込む必要があります。 この目的のために、 `asar` サポートしないオリジナルの `fs` API を提供するビルトインの `original-fs` モジュールを使用できます。

```javascript
const originalFs = require('original-fs')
originalFs.readFileSync('/path/to/example.asar')
```

もしくは、`process.noAssar` に `true` をセットして `fs` モジュールの `asar` サポートを無効にすることができます：

```javascript
const fs = require('fs')
process.noAsar = true
fs.readFileSync('/path/to/example.asar')
```

## Node API の制限

Node APIで、`asar` アーカイブがディレクトリのように動作するよう可能な限り懸命に作成していますが、低レベル環境での Node API に起因した制限がいくつかあります。

### アーカイブは読み取り専用

アーカイブは修正できないため、ファイルを変更できる変更できる全ての Node API は `asar` アーカイブに対して動作しません。

### 作業ディレクトリは、アーカイブ内のディレクトリに設定できません

`asar` アーカイブはディレクトリのように扱われるにも関わらず、ファイルシステム上には実際のディレクトリが存在しないため、`asar` アーカイブ内のディレクトリを作業ディレクトリとして設定することはできません。 いくつかの API の `cwd`の引数としてアーカイブ内のディレクトリを渡すのも同様にエラーの原因になります。

### いくつかのAPIで追加の展開がされます

たいていの `fs` APIは展開せずに、 `asar` アーカイブからファイルを読み込んだり、ファイル情報を取得できます。しかし、システムコールに実際のファイルパスを渡すようになっている幾つかの API では、Electron は必要なファイルを一時ファイルとして展開し、API に一時ファイルのパスを渡して、API が動作するようにします。 このため、当該 API には多少のオーバーヘッドがあります。

追加の展開が必要なAPIです:

* `child_process.execFile`
* `child_process.execFileSync`
* `fs.open`
* `fs.openSync`
* `process.dlopen` - ネイティブモジュールの`require`で使用されます。

### `fs.stat` の偽の統計情報

`asar` アーカイブ内のファイルはファイルシステム上に存在しないので、`fs.stat` および `asar` アーカイブ内のファイルへの関連情報によって返される<0>Stats</0> オブジェクトは、推測して生成されます。 ファイルサイズの取得とファイルタイプのチェックを除いて、 `Stats` オブジェクトを信頼すべきではありません。

### `asar` アーカイブ内のバイナリの実行

`child_process.exec`, `child_process.spawn`, `child_process.execFile` のようなバイナリを実行できるNode APIがあります。しかし、`execFile` だけが、`asar` アーカイブ内でのバイナリ実行をサポートしています。

なぜならば、`exec` と `spawn` は入力として `file` の代わりに `command` を受け取り、`command` はシェル配下で実行されるからです。 コマンドが asar アーカイブ内のファイルを使うかどうかを決定するための信頼できる方法はありませんし、そうするとしてもコマンドで使うファイルパスを副作用なしに置き換えることができるかどうかを確認することはできません。

## Adding Unpacked Files to `asar` Archives

As stated above, some Node APIs will unpack the file to the filesystem when called. Apart from the performance issues, various anti-virus scanners might be triggered by this behavior.

As a workaround, you can leave various files unpacked using the `--unpack` option. In the following example, shared libraries of native Node.js modules will not be packed:

```sh
$ asar pack app app.asar --unpack *.node
```

After running the command, you will notice that a folder named `app.asar.unpacked` was created together with the `app.asar` file. It contains the unpacked files and should be shipped together with the `app.asar` archive.