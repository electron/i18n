# インストール

Electron のビルド済みバイナリをインストールするには、[`npm`](https://docs.npmjs.com) を使用します。 アプリの開発用依存関係として Electron をインストールする方法を推奨します。

```sh
npm install electron --save-dev
```

アプリ内で Electron のバージョンを管理する方法については、[Electron のバージョン管理](./electron-versioning.md) を参照して下さい。

## グローバルインストール

`$PATH` に `electron` コマンドをグローバルインストールするには、以下も実行します。

```sh
npm install electron -g
```

## カスタマイズ

ダウンロードするアーキテクチャを変更したい (例えば `ia32` を `x64` マシン上にインストールする) 場合、以下のように npm install に `--arch` フラグを指定するか、`npm_config_arch` 環境変数を指定してください。

```shell
npm install --arch=ia32 electron
```

アーキテクチャに加えてプラットフォーム (`win32`、`linux`など) も変更する場合は、更に `--platform`フラグを指定できます。

```shell
npm install --platform=win32 electron
```

## プロキシ環境下

HTTP プロキシを使用する必要がある場合は、`ELECTRON_GET_USE_PROXY` 変数を任意の値に設定する必要があります。さらに、ホストシステムの Node のバージョンに応じて追加の環境変数を設定する必要があります。

* [Node 10 以降](https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables)
* [Node 10 以前](https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config)

## ミラーとキャッシュのカスタマイズ
インストール中、`electron` モジュールは [`@electron/get`](https://github.com/electron/get) を呼び出して、プラットフォーム用のビルド済み Electron バイナリをダウンロードします。 これは Github のリリースダウンロードページ (`https://github.com/electron/electron/releases/tag/v$VERSION`、 `$VERSION` は Electron の正確なバージョン) からダウンロードします。

もし Github にアクセス出来ないかカスタムビルドを提供する必要がある場合、他に提供されているミラーや既存のキャッシュからダウンロードできます。

#### ミラー
基底URL、Electron のバイナリを見つけるためのパス、バイナリのファイル名は、環境変数を用いて上書きできます。 `@electron/get` で使われる URL は以下の組み合わせです。

```javascript
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

例として、中国の CDN ミラーを使うにはこうします。

```shell
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
```

既定の `ELECTRON_CUSTOM_DIR` は `v$VERSION` です。 この形式を変更するには、`{{ version }}` プレースホルダーを使用します。 例えば、`version-{{ version }}` は `version-5.0.0` に解決され、`{{ version }}` は `5.0.0` に解決されます。`v{{ version }}` は既定と等価です。 より具体的な例として、中国の非 CDN ミラーを使用してみます。

```shell
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
ELECTRON_CUSTOM_DIR="{{ version }}"
```

上記の構成では、`https://npm.taobao.org/mirrors/electron/8.0.0/electron-v8.0.0-linux-x64.zip` の URL からダウンロードされます。

#### キャッシュ
代わりに、ローカルキャッシュを上書きできます。 `@electron/get` はあなたのネットワークに負荷がかからないように、ダウンロードしたバイナリをローカルディレクトリにキャッシュします。 そのキャッシュフォルダは、Electron のカスタムビルドの提供やネットワークとの接続を回避するために使用できます。

* Linux: `$XDG_CACHE_HOME` または `~/.cache/electron/`
* macOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` または `~/AppData/Local/electron/Cache/`

古いバージョンの Electron を使用していた環境の場合は、`~/.electron` 内にもキャッシュがあるかもしれません。

また、`electron_config_cache` 環境変数を設けることでローカルキャッシュの場所を上書きできます。

キャッシュには、バージョンの公式の zip ファイルと共に、テキストファイルとして格納されているチェックサムが含まれています。 典型的なキャッシュは、次のようになっています。

```sh
├── httpsgithub.comelectronelectronreleasesdownloadv1.7.9electron-v1.7.9-darwin-x64.zip
│   └── electron-v1.7.9-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.7.9SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.1electron-v1.8.1-darwin-x64.zip
│   └── electron-v1.8.1-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.1SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.1electron-v1.8.2-beta.1-darwin-x64.zip
│   └── electron-v1.8.2-beta.1-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.1SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.2electron-v1.8.2-beta.2-darwin-x64.zip
│   └── electron-v1.8.2-beta.2-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.2SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.3electron-v1.8.2-beta.3-darwin-x64.zip
│   └── electron-v1.8.2-beta.3-darwin-x64.zip
└── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.3SHASUMS256.txt
    └── SHASUMS256.txt
```

## バイナリダウンロードのスキップ
`electron` NPM パッケージをインストールすると、electron バイナリが自動的にダウンロードされます。

これは時々不要になることがあります。CI 環境で、他のコンポーネントをテストするときなどです。

すべての npm 依存関係をインストールするときにバイナリがダウンロードされないようにするには、環境変数 `ELECTRON_SKIP_BINARY_DOWNLOAD` を設定します。 以下はその例です。
```sh
ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm install
```

## トラブルシューティング

`npm install electron` を実行するとき、インストール時エラーが発生する場合があります。

ほとんどの場合、このエラーはネットワークによるもので、`electron` の npm パッケージに問題はありません。 `ELIFECYCLE`、`EAI_AGAIN`、`ECONNRESET`、`ETIMEDOUT` といったエラーは、ネットワーク上の問題を示しています。 最善の解決策は、ネットワークを切り替えるか、少し待ってからもう一度インストールしてることです。

`npm` でのインストールに失敗する場合、Electron を [electron/electron/releases](https://github.com/electron/electron/releases) から直接ダウンロードすることもできます。

`EACCESS` エラーでインストールが失敗した場合は、おそらく [npmの権限を修正する](https://docs.npmjs.com/getting-started/fixing-npm-permissions) 必要があります。

上記のエラーが継続する場合は、 [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) フラグをtrueにする必要があるかもしれません。

```sh
sudo npm install electron --unsafe-perm=true
```

速度の遅いネットワークでは、`--verbose`を指定してダウンロード進捗を表示することでなにか役に立つ情報が得られるかもしれません。

```sh
npm install --verbose electron
```

強制的に再ダウンロードする必要がある場合は、`force_no_cache`環境変数を`true`に設定してください。
