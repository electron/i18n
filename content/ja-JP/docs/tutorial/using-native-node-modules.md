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

# "npm install" を実行するごとに、これを実行します
./node_modules/.bin/electron-rebuild

# Windows でトラブルがあれば、これを試してください
.\node_modules\.bin\electron-rebuild.cmd
```

### Electron の手動ビルド

もしあなたがネイティブモジュールの開発者でElectronでの動作を検証したいのであれば、Electron用にモジュールを手動で再構築したいことと思います。 `node-gyp`を使用することで、モジュールをElectron用にビルドできます。

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://atom.io/download/electron
```

`HOME=~/.electron-gyp`は開発用のヘッダーを探す場所によって変わります。 `--target=1.2.3`はElectronのバージョンです。 `--dist-url=...`では、ヘッダーのダウンロードのためのURLを指定します。 `--arch=x64`は、モジュールを64bitシステム用にビルドすることを意味しています。

### Electron のカスタムビルドを手動ビルド

公開されているリリースと一致しない Electron のカスタムビルドに対してネイティブの Node アドオンをコンパイルするには、カスタムビルドにバンドルされている Node のバージョンを使用するように `npm` に指示します。

```sh
npm rebuild --nodedir=$HOME/.../path/to/electron/vendor/node
```

## トラブルシューティング

もしネイティブモジュールがインストールされているがうまく動いていないことが分かった場合は、下記のことを確認してみてください。

- モジュールのアーキテクチャがElectronのアーキテクチャと一致する (ia32 または x64)。
- モジュールの `binding.gyp` 内の `win_delay_load_hook` が `false` にセットされていない。
- Electron のアップグレード語は、モジュールの再ビルドが必要。
- 何かおかしいと思ったら、まず `electron-rebuild` を走らせてみてください。

### `win_delay_load_hook` についての注釈

Windows のデフォルトでは、node-gyp は `node.dll` に対してネイティブモジュールをリンクします。 しかし Electron 4.x 以降では、ネイティブモジュールで必要とされるシンボルは `electron.exe` によってエクスポートされ、Electron 4.x に `node.dll` はありません。Windows にネイティブモジュールをロードするため、node-gyp はネイティブモジュールがロードされたときにトリガーされる [遅延読み込みフック](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) をインストールします。これは、ライブラリの検索パス (何も表示されません) で `node.dll` を検索する代わりに、ロード可能な実行可能ファイルを使用するように `node.dll` 参照をリダイレクトします。 そのため、Electron 4.x 以降でネイティブモジュールをロードするには `'win_delay_load_hook': 'true'` が必要です。

`モジュールが自己登録されなかった` や `指定されたプロシージャが見つかりませんでした` のようなエラーが得られた場合は、使用しようとしているモジュールが見つからないことを意味しているかもしれません。遅延読み込みフックを正しくインクルードしてください。 モジュールが node-gyp でビルドされている場合、`binding.gyp` ファイルで `win_delay_load_hook` 変数が `true` に設定されておらず、どこかで上書きされていないことを確認します。 モジュールが別のシステムでビルドされている場合は、メインの `.node` ファイルにインストールされている遅延読み込みフックを使用してビルドする必要があります。 `link.exe` の呼び出しは以下ようにしなければなりません。

```text
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

特に、次のことが重要です。

- Node ではなく *Electron* の `node.lib` に対してリンクします。 間違った `node.lib` に対してリンクすると、Electron のモジュールが必要になったときにロード時エラーが発生します。
- `/DELAYLOAD:node.exe` フラグをインクルードします。 `node.exe` のリンクが遅延されていない場合、遅延読み込みフックが起動する機会がなく、Node のシンボルは正しく解決されません。
- `win_delay_load_hook.obj` は、最後の DLL に直接リンクされます。フックが依存 DLL に設定されていると、適切なタイミングで起動されません。

自前で実装している遅延ロードフックの例については [node-gyp](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) を参照してください。

## `prebuild`を使用したモジュール

[`prebuild`](https://github.com/mafintosh/prebuild) は、ネイティブNodeモジュールをいろいろなNodeとElectronのバージョン用のビルド済みバイナリとともにパブリッシュする方法を提供します。

もしモジュールがElectronで使用するためのバイナリを提供しているなら、ビルド済みのバイナリを最大限活用できるように、`--build-from-source`と `npm_config_build_from_source`環境変数が外されていることを確認してください。

## `node-pre-gyp`を使用したモジュール

[`node-pre-gyp`](https://github.com/mapbox/node-pre-gyp)は、ビルド済みのバイナリを含んだネイティブNodeモジュールを展開する方法を提供します。多くの人気のモジュールがこのツールを使用しています。

これらのモジュールの多くはElectronの環境下でも動きますが、ElectronがNodeよりも新しいバージョンのV8を使用していてABI変更を含んでいるときには、うまく動作しないかもしれません。 そのため、通常であれば、ソースコードからネイティブNodeモジュールを常にビルドすることが勧められます。

`npm`でモジュールをインストールする際は、これが標準の動作です。 もしそうなっていない場合は、`--build-from-source`を`npm`に渡してやるか、`npm_config_build_from_source`環境変数を設定してください。