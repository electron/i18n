# インストール作業

Electronのビルド済みバイナリを使用するためには、[`npm`](https://docs.npmjs.com)を使用してください。 Electronをアプリでの開発用依存ファイルとして追加するのにおすすめの方法は：

```sh
npm install electron --save-dev
```

あなたのアプリ内でElectronのバージョンを管理する方法については、[Electronのバージョン管理](./electron-versioning.md)を参照して下さい。

## グローバルインストール

`$PATH`に`electron`コマンドをグローバルインストールするにはこう実行してください：

```sh
npm install electron -g
```

## カスタマイズ

ダウンロードするアーキテクチャを変更したい場合(例えば`ia32`を、 `x64`マシン上にインストールする)、npm installに`--arch`フラグを指定するか、`npm_config_arch`環境変数を指定してください：

```shell
npm install --arch=ia32 electron
```

アーキテクチャに加えてプラットフォーム(`win32`、`linux`など)も変更する場合は、`--platform`フラグを更に指定できます。

```shell
npm install --platform=win32 electron
```

## プロキシ

If you need to use an HTTP proxy, you need to set the `ELECTRON_GET_USE_PROXY` variable to any value, plus additional environment variables depending on your host system's Node version:

* [Node 10 and above](https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables)
* [Before Node 10](https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config)

## ミラーとキャッシュのカスタマイズ

During installation, the `electron` module will call out to [`@electron/get`](https://github.com/electron/get) to download prebuilt binaries of Electron for your platform. これはGithubのリリースダウンロードページ(`https://github.com/electron/electron/releases/tag/v$VERSION`、 `$VERSION`はElectronの詳細なバージョン)からそうします。

もしGithubにアクセス出来ないかカスタムビルドを提供する必要がある場合、他に提供されているミラーや既存のキャッシュからダウンロードできます。

#### ミラー

基底URL、Electronのバイナリを見つけるためのパス、バイナリのファイル名は、環境変数を用いて上書きできます。 `electron-download`で使われるurlは以下の組み合わせです。

```plaintext
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

例として、中国のミラーを使うにはこうします。

```plaintext
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
```

#### キャッシュ

代わりに、ローカルキャッシュを上書きできます。 `electron-download`はあなたのネットワークに負荷がかからないようにダウンロードしたバイナリをローカルディレクトリにキャッシュします。 そのキャッシュフォルダは、Electronのカスタムビルドの提供やネットワークとの接続を回避するために使用できます。

* Linux: `$XDG_CACHE_HOME` または `~/.cache/electron/`
* MacOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` または `~/AppData/Local/electron/Cache/`

古いバージョンのElectronを使用していた場合は、`~/.electron`内にキャッシュがあるかもしれません。

更に `ELECTRON_CACHE` 環境変数を設けることで、ローカルキャッシュの場所を上書きできます。

キャッシュには、バージョンの公式のzipファイルと共に、テキストファイルとして格納されているチェックサムが含まれています。典型的なキャッシュは、次のようになっています。

```sh
├── electron-v1.7.9-darwin-x64.zip
├── electron-v1.8.1-darwin-x64.zip
├── electron-v1.8.2-beta.1-darwin-x64.zip
├── electron-v1.8.2-beta.2-darwin-x64.zip
├── electron-v1.8.2-beta.3-darwin-x64.zip
├── SHASUMS256.txt-1.7.9
├── SHASUMS256.txt-1.8.1
├── SHASUMS256.txt-1.8.2-beta.1
├── SHASUMS256.txt-1.8.2-beta.2
├── SHASUMS256.txt-1.8.2-beta.3
```

## バイナリダウンロードのスキップ

`electron` NPM パッケージをインストールすると、電子バイナリが自動的にダウンロードされます。

これは時々不要になることがあります。CI 環境で、他のコンポーネントをテストするときなどです。

すべての npm 依存関係をインストールするときにバイナリがダウンロードされないようにするには、環境変数 `ELECTRON_SKIP_BINARY_DOWNLOAD` を設定します。 例えば:

```sh
ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm install
```

## トラブルシューティング

`npm install electron` を実行するとき、インストール時エラーが発生する場合があります。

ほとんどの場合、これらのエラーはネットワークに起因し、`electron` のnpmパッケージに問題はないと考えられます。 `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, `ETIMEDOUT` といったエラーが表示されている場合、それはネットワークに問題があることを示しています。 最善の解決策は、ネットワークの切り替えを試みるか、少し待ってからもう一度インストールを試みることです。

`npm` 経由でのインストールに失敗する場合、Electronを [electron/electron/releases](https://github.com/electron/electron/releases) から直接ダウンロードするという方法もあります。

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