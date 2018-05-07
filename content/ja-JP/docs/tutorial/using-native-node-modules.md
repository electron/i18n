# ネイティブのNodeモジュールを使用する

Electronは、ネイティブのNodeモジュールをサポートしていますが、システム上にインストールされたNodeとは異なるV8バージョンを使用しているので、ネイティブモジュールでビルドする時、Electronのヘッダーの場所を手動で指定する必要があります。

## ネイティブモジュールのインストール方法

ネイティブモジュールのインストールには3通りの方法があります。

### `npm`を使用

いくつかの環境変数を設定することにより、モジュールを直接インストールするのに `npm` を使用できます。

Electronにすべての依存モジュールをインストールする例

```sh
# Electron's version.
export npm_config_target=1.2.3
# The architecture of Electron, can be ia32 or x64.
export npm_config_arch=x64
export npm_config_target_arch=x64
# Download headers for Electron.
export npm_config_disturl=https://atom.io/download/electron
# Tell node-pre-gyp that we are building for Electron.
export npm_config_runtime=electron
# Tell node-pre-gyp to build module from source code.
export npm_config_build_from_source=true
# Install all dependencies, and store cache to ~/.electron-gyp.
HOME=~/.electron-gyp npm install
```

### モジュールをインストールしてElectronをリビルド

他のNodeプロジェクト同様にモジュールをインストールすることを選ぶこともでき、[`electron-rebuild`](https://github.com/paulcbetts/electron-rebuild)でElectron用にモジュールをリビルドすることも出来ます。 このモジュールは、Electronのバージョンを取得し、ヘッダのダウンロードとアプリ用にネイティブモジュールをビルドする手動の手順を処理できます。

`electron-rebuild`をインストールして、モジュールをリビルドする手順の例です：

```sh
npm install --save-dev electron-rebuild

# Every time you run "npm install", run this:
./node_modules/.bin/electron-rebuild

# On Windows if you have trouble, try:
.\node_modules\.bin\electron-rebuild.cmd
```

### Electron用にマニュアルリビルド

もしあなたがネイティブモジュールの開発者でElectronでの動作を検証したいのであれば、Electron用にモジュールを手動で再構築したいことと思います。 `node-gyp`を使用することで、モジュールをElectron用にビルドできます。

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://atom.io/download/electron
```

`HOME=~/.electron-gyp`は開発用のヘッダーを探す場所によって変わります。 `--target=1.2.3`はElectronのバージョンです。 `--dist-url=...`では、ヘッダーのダウンロードのためのURLを指定します。 `--arch=x64`は、モジュールを64bitシステム用にビルドすることを意味しています。

## トラブルシューティング

もしネイティブモジュールがインストールされているがうまく動いていないことが分かった場合は、下記のことを確認してみてください：

* The architecture of the module has to match Electron's architecture (ia32 or x64).
* After you upgrade Electron, you usually need to rebuild the modules.
* 何かおかしいと思ったら、まず`electron-rebuild`を走らせてみてください。

## `prebuild`を使用したモジュール

[`prebuild`](https://github.com/mafintosh/prebuild) provides a way to publish native Node modules with prebuilt binaries for multiple versions of Node and Electron.

もしモジュールがElectronで使用するためのバイナリを提供しているなら、ビルド済みのバイナリを最大限活用できるように、`--build-from-source`と `npm_config_build_from_source`環境変数が外されていることを確認してください。

## `node-pre-gyp`を使用したモジュール

[`node-pre-gyp`](https://github.com/mapbox/node-pre-gyp)は、ビルド済みのバイナリを含んだネイティブNodeモジュールを展開する方法を提供します。多くの人気のモジュールがこのツールを使用しています。

これらのモジュールの多くはElectronの環境下でも動きますが、ElectronがNodeよりも新しいバージョンのV8を使用していてABI変更を含んでいるときには、うまく動作しないかもしれません。 そのため、通常であれば、ソースコードからネイティブNodeモジュールを常にビルドすることが勧められます。

`npm`でモジュールをインストールする際は、これが標準の動作です。 もしそうなっていない場合は、`--build-from-source`を`npm`に渡してやるか、`npm_config_build_from_source`環境変数を設定してください。