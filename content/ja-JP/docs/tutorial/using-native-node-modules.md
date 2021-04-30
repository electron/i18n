# ネイティブのNodeモジュールを使用する

Electron ではネイティブ Node.js モジュールがサポートされていますが、Electron は (OpenSSL ではなく Chromium の BoringSSL を使用するなどの違いにより) 指定の Node.js バイナリと異なる [アプリケーションバイナリインターフェイス (ABI)][abi] であるため、使用するネイティブモジュールを Electron 向けに再コンパイルする必要があります。 そうしなければ、以下の類のエラーが実行しようとしたときに発生します。

```sh
Error: The module '/path/to/native/module.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION $XYZ. This version of Node.js requires
NODE_MODULE_VERSION $ABC. Please try re-compiling or re-installing
the module (for instance, using `npm rebuild` or `npm install`).
```

## ネイティブモジュールのインストール方法

ネイティブモジュールをインストールするにはいくつかの異なる方法があります。

### モジュールをインストールして Electron をリビルド

他の Node プロジェクト同様にモジュールをインストールしてから、[`electron-rebuild`][electron-rebuild] パッケージで Electron 向けにモジュールを再ビルドします。 このモジュールは自動で Electron のバージョンを取得でき、ヘッダのダウンロードやアプリ向けにネイティブモジュールを再ビルドする手動の手順を処理できます。 [Electron Forge][electron-forge] を使用している場合、このツールは開発モードでも頒布物の作成でも自動で使用されます。

例えば、スタンドアローンの `electron-rebuild` ツールをインストールして、コマンドラインからモジュールを再ビルドするには、以下のようにします。

```sh
npm install --save-dev electron-rebuild

# "npm install" を実行するごとに、こちらを実行します。
./node_modules/.bin/electron-rebuild

# Windows で問題が発生する場合はこちらをお試しください。
.\node_modules\.bin\electron-rebuild.cmd
```

[Electron Packager][electron-packager] のような他ツールとの統合や使い方の詳細は、当該プロジェクトの README を参照してください。

### `npm` を使用

いくつかの環境変数を設定することにより、モジュールを直接インストールするのに `npm` を使用できます。

例として、以下のように Electron 向けにすべての依存関係をインストールします。

```sh
# Electronのバージョン
export npm_config_target=1.2.3
# Electron のアーキテクチャ。サポートされているアーキテクチャについては、 https://electronjs.org/docs/tutorial/support#supported-platforms
# を参照してください。
export npm_config_arch=x64
export npm_config_target_arch=x64
# Electronのヘッダファイルをダウンロード
export npm_config_disturl=https://electronjs.org/headers
# node-pre-gyp にElectronのビルドであることを知らせる
export npm_config_runtime=electron
# node-pre-gypにソースコードからのビルドであることを知らせる
export npm_config_build_from_source=true
# すべての依存をインストールし、キャッシュを~/.electron-gypに保存する
HOME=~/.electron-gyp npm install
```

### Electron の手動ビルド

もしあなたがネイティブモジュールの開発者でElectronでの動作を検証したいのであれば、Electron用にモジュールを手動で再構築したいことと思います。 `node-gyp`を使用することで、モジュールをElectron用にビルドできます。

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://electronjs.org/headers
```

* `HOME=~/.electron-gyp` は開発用のヘッダーを探す場所によって変わります。
* `--target=1.2.3` は Electron のバージョンです。
* `--dist-url=...` はヘッダをダウンロードする場所を指定します。
* `--arch=x64` はモジュールを 64bit システム向けにビルドします。

### Electron のカスタムビルドを手動ビルド

公開されているリリースと一致しない Electron のカスタムビルドに対してネイティブの Node モジュールをコンパイルするには、カスタムビルドにバンドルされている Node のバージョンを使用するように `npm` に指示します。

```sh
npm rebuild --nodedir=/path/to/electron/vendor/node
```

## トラブルシューティング

もしネイティブモジュールがインストールされていてもうまく動いていないと気づいた場合は、下記のことを確認してみてください。

* 何かおかしいと思ったら、まず `electron-rebuild` を実行しましょう。
* ネイティブモジュールが Electron アプリのターゲットプラットフォームおよびアーキテクチャと互換性があることを確認してください。
* モジュールの `binding.gyp` 内の `win_delay_load_hook` が `false` にセットされていないことを確認してください。
* Electron のアップグレード後は、モジュールの再ビルドが必要になります。

### `win_delay_load_hook` についての注釈

Windows のデフォルトでは、`node-gyp` は `node.dll` に対してネイティブモジュールをリンクします。 しかし Electron 4.x 以降では、ネイティブモジュールで必要とされるシンボルは `electron.exe` によってエクスポートされ、`node.dll` は存在しません。 Windows にネイティブモジュールをロードするために、`node-gyp` はネイティブモジュールがロードされたときにトリガーされる [delay-load-hook](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) をインストールします。これはライブラリの (何も出てこない) 検索パスで `node.dll` を探す代わりに、ロード可能な実行可能ファイルを使用するように `node.dll` 参照をリダイレクトします。 そのため、Electron 4.x 以降でネイティブモジュールをロードするには `'win_delay_load_hook': 'true'` が必要です。

`モジュールが自己登録されなかった` や `指定されたプロシージャが見つかりませんでした` のようなエラーが得られた場合は、使用しようとしているモジュールが見つからないことを意味しているかもしれません。遅延読み込みフックを正しくインクルードしてください。  モジュールが node-gyp でビルドされている場合、`binding.gyp` ファイルで `win_delay_load_hook` 変数が `true` に設定されておらず、どこかで上書きされていないことを確認します。  モジュールが別のシステムでビルドされている場合は、メインの `.node` ファイルにインストールされている遅延読み込みフックを使用してビルドする必要があります。 `link.exe` の呼び出しは以下ようにしなければなりません。

```plaintext
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

特に、次のことが重要です。

* Node ではなく _Electron_ の `node.lib` に対してリンクします。 間違った `node.lib` に対してリンクすると、Electron のモジュールが必要になったときにロード時エラーが発生します。
* `/DELAYLOAD:node.exe` フラグをインクルードします。 `node.exe` のリンクが遅延されていない場合、遅延読み込みフックが起動する機会がなく、Node のシンボルは正しく解決されません。
* `win_delay_load_hook.obj` は、最終的な DLL に直接リンクされます。 依存 DLL にフックが設定されていると、正しいタイミングで起動しません。

遅延ロードフックを独自で実装する例については [`node-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) を参照してください。

## `prebuild`を使用したモジュール

[`prebuild`](https://github.com/prebuild/prebuild) は、ネイティブの Node モジュールを複数の Node と Electron のバージョン向けに、ビルド済みバイナリとともに公開する方法を提供します。

`prebuild` を搭載したモジュールが Electron 向けのバイナリを提供している場合、ビルド済みバイナリを最大限に活用するために `--build-from-source` と `npm_config_build_from_source` 環境変数は省略してください。

## `node-pre-gyp`を使用したモジュール

[`node-pre-gyp`][node-pre-gyp]は、ビルド済みのバイナリを含んだネイティブNodeモジュールを展開する方法を提供します。多くの人気のモジュールがこのツールを使用しています。

これらのモジュールが Electron でも正常に動作することはありますが、Electron 固有のバイナリがない場合はソースからビルドする必要があります。 このため、これらのモジュールには `electron-rebuild` の使用を推奨します。

`npm` でモジュールをインストールする場合は、`--build-from-source` を `npm` に渡すか `npm_config_build_from_source` 環境変数を設定する必要があります。

[abi]: https://en.wikipedia.org/wiki/Application_binary_interface
[electron-rebuild]: https://github.com/electron/electron-rebuild
[electron-forge]: https://electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[node-pre-gyp]: https://github.com/mapbox/node-pre-gyp
