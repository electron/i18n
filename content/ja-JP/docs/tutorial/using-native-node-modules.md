# ネイティブのNodeモジュールを使用する

Electronは、ネイティブのNodeモジュールをサポートしていますが、システム上にインストールされたNodeとは異なるV8バージョンを使用しているので、ネイティブモジュールをビルドする時、Electronのヘッダーの場所を手動で指定する必要があります。

## ネイティブモジュールのインストール方法

ネイティブモジュールのインストールには3通りの方法があります。

### `npm`を使用

いくつかの環境変数を設定することにより、モジュールを直接インストールするのに `npm` を使用できます。

Electronにすべての依存モジュールをインストールする例

```sh
# Electronのバージョン
export npm_config_target=1.2.3
# アーキテクチャタイプ (ia32 or x64)
export npm_config_arch=x64
export npm_config_target_arch=x64
# Electronのヘッダファイルをダウンロード
export npm_config_disturl=https://atom.io/download/electron
# node-pre-gyp にElectronのビルドであることを知らせる
export npm_config_runtime=electron
# node-pre-gypにソースコードからのビルドであることを知らせる
export npm_config_build_from_source=true
# すべての依存をインストールし、キャッシュを~/.electron-gypに保存する
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

### Manually building for a custom build of Electron

To compile native Node addons against a custom build of Electron that doesn't match a public release, instruct `npm` to use the version of Node you have bundled with your custom build.

```sh
npm rebuild --nodedir=$HOME/.../path/to/electron/vendor/node
```

## トラブルシューティング

もしネイティブモジュールがインストールされているがうまく動いていないことが分かった場合は、下記のことを確認してみてください：

- The architecture of the module has to match Electron's architecture (ia32 or x64).
- `win_delay_load_hook` is not set to `false` in the module's `binding.gyp`.
- Electron のアップグレード語は、モジュールの再ビルドが必要になります。
- 何かおかしいと思ったら、まず`electron-rebuild`を走らせてみてください。

### A note about `win_delay_load_hook`

On Windows, by default, node-gyp links native modules against `node.dll`. However, in Electron 4.x and higher, the symbols needed by native modules are exported by `electron.exe`, and there is no `node.dll` in Electron 4.x. In order to load native modules on Windows, node-gyp installs a [delay-load hook](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) that triggers when the native module is loaded, and redirects the `node.dll` reference to use the loading executable instead of looking for `node.dll` in the library search path (which would turn up nothing). As such, on Electron 4.x and higher, `'win_delay_load_hook': 'true'` is required to load native modules.

If you get an error like `Module did not self-register`, or `The specified
procedure could not be found`, it may mean that the module you're trying to use did not correctly include the delay-load hook. If the module is built with node-gyp, ensure that the `win_delay_load_hook` variable is set to `true` in the `binding.gyp` file, and isn't getting overridden anywhere. If the module is built with another system, you'll need to ensure that you build with a delay-load hook installed in the main `.node` file. Your `link.exe` invocation should look like this:

```text
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

In particular, it's important that:

- you link against `node.lib` from *Electron* and not Node. If you link against the wrong `node.lib` you will get load-time errors when you require the module in Electron.
- you include the flag `/DELAYLOAD:node.exe`. If the `node.exe` link is not delayed, then the delay-load hook won't get a chance to fire and the node symbols won't be correctly resolved.
- `win_delay_load_hook.obj` is linked directly into the final DLL. If the hook is set up in a dependent DLL, it won't fire at the right time.

See [node-gyp](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) for an example delay-load hook if you're implementing your own.

## `prebuild`を使用したモジュール

[`prebuild`](https://github.com/mafintosh/prebuild) は、ネイティブNodeモジュールをいろいろなNodeとElectronのバージョン用のビルド済みバイナリとともにパブリッシュする方法を提供します。

もしモジュールがElectronで使用するためのバイナリを提供しているなら、ビルド済みのバイナリを最大限活用できるように、`--build-from-source`と `npm_config_build_from_source`環境変数が外されていることを確認してください。

## `node-pre-gyp`を使用したモジュール

[`node-pre-gyp`](https://github.com/mapbox/node-pre-gyp)は、ビルド済みのバイナリを含んだネイティブNodeモジュールを展開する方法を提供します。多くの人気のモジュールがこのツールを使用しています。

これらのモジュールの多くはElectronの環境下でも動きますが、ElectronがNodeよりも新しいバージョンのV8を使用していてABI変更を含んでいるときには、うまく動作しないかもしれません。 そのため、通常であれば、ソースコードからネイティブNodeモジュールを常にビルドすることが勧められます。

`npm`でモジュールをインストールする際は、これが標準の動作です。 もしそうなっていない場合は、`--build-from-source`を`npm`に渡してやるか、`npm_config_build_from_source`環境変数を設定してください。