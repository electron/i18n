# ビルドシステムの概要

Electronは、プロジェクト生成に[gyp](https://gyp.gsrc.io/)を用いており、ビルドには [ninja](https://ninja-build.org/)を使用しています。 プロジェクト設定は`.gyp`, `.gypi`ファイルで見つけることが出来ます。

## Gypファイル

以下の`gyp`ファイルがElectronのビルドに必要な情報を含んでいます：

* `electron.gyp` では、Electronそのものをビルドするのに必要な情報が含まれています。
* `common.gypi` では、ChromiumとともにNodeのビルド調整を行う設定が含まれています。
* `brightray/brightray.gyp`では、`brightray`をChromiumとリンクさせるビルド設定が含まれています。
* `brightray/brightray.gypi` には、ビルドに関する一般的な設定を含んでいます。

## コンポーネントのビルド

Chromiumはとても巨大なプロジェクトですので、最終的なリンクの段階でかなりの時間を要し、それが開発を難しくしてしまいます。 これを解決するために、Chromiumはそれぞれのコンポーネントを別々の共有ライブラリとしてビルドを行う、「コンポーネントビルド」を採用しており、これによりファイルサイズとパフォーマンスを犠牲にすることでビルドを高速で行っています。

Electronでも同様のアプローチを取っています。`デバッグ`ビルドでは、ライブラリはリンク時間を節約するために、Chromiumのコンポーネントの共有ライブラリにバイナリがリンクされます。`リリースビルドでは`バイナリは静的ライブラリにリンクされますので、良いファイルサイズとパフォーマンスを得ることが出来る可能性があります。

## 最低限のブートストラップ

すべてのChromiumのプレビルド版バイナリ(`libchromiumcontent`) は、ブートストラップスクリプトの実行時にダウンロードされます。 標準では、静的ライブラリと共有ライブラリがダウンロードされますので、最終的なサイズは、環境にも寄りますが、800MBから2GBです。

標準では、`libchromiumcontent` はAmazon Web Servicesからダウンロードされます。 もし `LIBCHROMIUMCONTENT_MIRROR` 環境変数が設定されていたら、ブートストラップスクリプトはそちらからのダウンロードを行います。 [`libchromiumcontent-qiniu-mirror`](https://github.com/hokein/libchromiumcontent-qiniu-mirror) は `libchromiumcontent` のミラーサイトです。 AWSへのアクセスで困ったことがあるのであれば、 `export LIBCHROMIUMCONTENT_MIRROR=http://7xk3d2.dl1.z0.glb.clouddn.com/`と指定することで、ダウンロードアドレスを変更できます。

テスト・開発のためにElectronをビルドしたいだけなら、`--dev`オプションを指定することで、共有ライブラリ版のみをダウンロードすることが出来ます。

```sh
$ ./script/bootstrap.py --dev
$ ./script/build.py -c D
```

## 2段階のプロジェクト生成

エレクトロンは`Release` と `Debug`ビルドでそれぞれ別々のライブラリとリンクされます。 しかし、`gyp`は、設定を変えてリンクの方法を変えることには対応していません。

そのため、Electron では `gyp` 変数の `libchromiumcontent_component` を使用して、`gyp`実行時にどのリンクの設定を使用するかを制御しています。

## ターゲット名

Electron以外のほとんどのプロジェクトで`Release`, `Debug`をビルドターゲットメイトして使用していると思います。が、Electron では`R` と `D`を代わりに使用しています。 これは、`Release` または `Debug`ビルドのどちらかのみが定義されているときに、`gyp`がランダムにクラッシュするためであり、またEletronは上記で示したように一度には一つだけのビルドターゲットを生成するためです。

この挙動は(Electronの) 開発者のみに影響があることであり、Electronでアプリを開発する方は気にしなくてかまいません。

## テスト

プロジェクトのコードのスタイルを確認するためには：

```sh
$ npm run lint
```

機能テストを行うには：

```sh
$ npm test
```

Electronのソースコードを変更して、再ビルドとテストを行うには：

```sh
$ npm run build && npm test
```

Mochaの[限定テスト (exclusive tests)](https://mochajs.org/#exclusive-tests)機能を使用することで、特定のテストやブロックを切り離すことが出来、一連のテストを早く終わらせることが出来ます。 `.only`を`describe` や `it` に追加してください。

```js
describe.only('some feature', function () {
  // このブロックのテストのみが実行されます
})
```

その他の方法としては、Mochaの`grep` オプションを使用して、特定のテストのみを実行することが出来ます。

```sh
$ npm test -- --grep child_process
```

`runas` といったネイティブモジュールを含んだテストは、デバッグビルドでは実行できず(詳細に関しては[#2558](https://github.com/electron/electron/issues/2558)を参照のこと)、リリースビルドのみで動作します。

リリースビルドでテストを行うには、以下のようにしてください：

```sh
$ npm test -- -R
```