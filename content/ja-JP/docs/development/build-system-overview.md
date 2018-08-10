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

Electron以外のほとんどのプロジェクトで`Release`, `Debug`をビルドターゲットメイトして使用していると思います。が、Electron では`R` と `D`を代わりに使用しています。 This is because `gyp` randomly crashes if there is only one `Release` or `Debug` build configuration defined, and Electron only has to generate one target at a time as stated above.

This only affects developers, if you are building Electron for rebranding you are not affected.

## テスト

Test your changes conform to the project coding style using:

```sh
$ npm run lint
```

Test functionality using:

```sh
$ npm test
```

Whenever you make changes to Electron source code, you'll need to re-run the build before the tests:

```sh
$ npm run build && npm test
```

You can make the test suite run faster by isolating the specific test or block you're currently working on using Mocha's [exclusive tests](https://mochajs.org/#exclusive-tests) feature. Append `.only` to any `describe` or `it` function call:

```js
describe.only('some feature', function () {
  // このブロックのテストのみが実行されます
})
```

Alternatively, you can use mocha's `grep` option to only run tests matching the given regular expression pattern:

```sh
$ npm test -- --grep child_process
```

Tests that include native modules (e.g. `runas`) can't be executed with the debug build (see [#2558](https://github.com/electron/electron/issues/2558) for details), but they will work with the release build.

To run the tests with the release build use:

```sh
$ npm test -- -R
```