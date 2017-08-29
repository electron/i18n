# ネイティブのNodeモジュールを使用する

Electronは、ネイティブのNodeモジュールをサポートしていますが、システム上にインストールされたNodeとは異なるV8バージョンを使用しているので、ネイティブモジュールでビルドする時、Electronのヘッダーの場所を手動で指定する必要があります。

## ネイティブモジュールのインストール方法

ネイティブモジュールのインストールには3通りの方法があります。

### `npm`を使用

いくつかの環境変数を設定することにより、モジュールを直接インストールするのに `npm` を使用できます。

Electronにすべての依存モジュールをインストールする例

```bash
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

```bash
npm install --save-dev electron-rebuild

# Every time you run "npm install", run this:
./node_modules/.bin/electron-rebuild

# On Windows if you have trouble, try:
.\node_modules\.bin\electron-rebuild.cmd
```

### Electron用にマニュアルリビルド

もしあなたがネイティブモジュールの開発者でElectronでの動作を検証したいのであれば、Electron用にモジュールを手動で再構築したいことと思います。 `node-gyp`を使用することで、モジュールをElectron用にビルドできます。

```bash
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://atom.io/download/electron
```

`HOME=~/.electron-gyp`は開発用のヘッダーを探す場所によって変わります。 `--target=1.2.3`はElectronのバージョンです。 `--dist-url=...`では、ヘッダーのダウンロードのためのURLを指定します。 `--arch=x64`は、モジュールを64bitシステム用にビルドすることを意味しています。

## トラブルシューティング

もしネイティブモジュールがインストールされているがうまく動いていないことが分かった場合は、下記のことを確認してみてください：

* モジュールのアーキテクチャがElectronのアーキテクチャと一致する(ia32 または x64)
* Electronのアップグレード後は、モジュールをリビルドする必要があります。
* 何かおかしいと思ったら、まず`electron-rebuild`を走らせてみてください。

## `prebuild`を使用したモジュール

[`prebuild`](https://github.com/mafintosh/prebuild)は、様々なバージョンのNodeやElectron用のビルド済みのバイナリを含んだネイティブNodeモジュールを簡単に公開する方法を提供します。

If modules provide binaries for the usage in Electron, make sure to omit `--build-from-source` and the `npm_config_build_from_source` environment variable in order to take full advantage of the prebuilt binaries.

## Modules that rely on `node-pre-gyp`

The [`node-pre-gyp` tool](https://github.com/mapbox/node-pre-gyp) provides a way to deploy native Node modules with prebuilt binaries, and many popular modules are using it.

Usually those modules work fine under Electron, but sometimes when Electron uses a newer version of V8 than Node, and there are ABI changes, bad things may happen. So in general it is recommended to always build native modules from source code.

If you are following the `npm` way of installing modules, then this is done by default, if not, you have to pass `--build-from-source` to `npm`, or set the `npm_config_build_from_source` environment variable.