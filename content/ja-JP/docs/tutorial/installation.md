# インストール作業

> ElectronのインストールのためのTips

Electronのビルド済みバイナリを使用するためには、[`npm`](https://docs.npmjs.com/)を使用してください。 Electronをアプリでの開発用依存ファイルとして追加するのにおすすめの方法は：

```sh
npm install electron --save-dev
```

See the [Electron versioning doc](electron-versioning.md) for info on how to manage Electron versions in your apps.

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

アーキテクチャに加えて`win32`, `linux`といったプラットフォームも変更する場合は、`--platform`フラグを指定します:

```shell
npm install --platform=win32 electron
```

## プロキシ環境下

HTTP プロキシを使用する必要がある場合は、[これらの環境変数を設定](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables)してください。

## トラブルシューティング

`npm install electron`を実行するとき、ユーザによっては時にインストール時エラーが発生する場合があります。

ほとんどの場合、これらのエラーはネットワークの問題の結果としてのものであり、`electron`のnpmパッケージには実際の問題はありません。 `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, および `ETIMEDOUT` というエラーはすべてそういったネットワークの問題を示しています。 最も良い解決法はネットワークを切り替えること、あるいは少し待ってからもう一度インストールしてみることです。

`npm`経由でのインストールが失敗する場合、Electronを[electron/electron/releases](https://github.com/electron/electron/releases) から直接ダウンロードするという方法もあります。

`EACCESS`エラーでインストールが失敗した場合は、おそらく[npmのパーミション](https://docs.npmjs.com/getting-started/fixing-npm-permissions)を修正する必要があります。

上記のエラーが継続する場合は、[unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm)フラグをtrueにする必要があるかもしれません。

```sh
sudo npm install electron --unsafe-perm=true
```

速度の遅いネットワークでは、`--verbose`を指定してダウンロード進捗を表示することでなにか役に立つ情報が得られるかもしれません。

```sh
npm install --verbose electron
```

強制的に再ダウンロードする必要がある場合は、`force_no_cache`環境変数を`true`に設定してください。