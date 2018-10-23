# ビルドシステムの概要

Electronは、プロジェクト生成に[GN](https://gn.googlesource.com/gn)を用い、ビルドには [ninja](https://ninja-build.org/)を使用します。 プロジェクト設定は`.gn` と `.gni` ファイルを見てください。

## GN ファイル

以下の`gn`ファイルにはElectronのビルトのメインルールを含んでいます：

* `BUILD.gn` は、Electronそのものをどのようにビルドするかを定義しています。
* `brightray/BUILD.gn`は、`brightray`をどのようにビルドするかを定義し、Chromiumとリンクするデフォルト設定を含んでいます。
* `build/args/{debug,release,all}.gn` には、Electronをビルドするためのデフォルトのビルド引数が含まれています。

## コンポーネントのビルド

Chromiumはとても巨大なプロジェクトですので、最終的なリンクの段階でかなりの時間を要し、それが開発を難しくしてしまいます。 これを解決するために、Chromiumはそれぞれのコンポーネントを別々の共有ライブラリとしてビルドを行う、「コンポーネントビルド」を採用しており、これによりファイルサイズとパフォーマンスを犠牲にすることでビルドを高速で行っています。

ElectronはChromiumビルドオプションを継承します。 In `Debug` builds, the binary will be linked to a shared library version of Chromium's components to achieve fast linking time; for `Release` builds, the binary will be linked to the static library versions, so we can have the best possible binary size and performance.

## テスト

**NB** *この章の内容は古くなっており、GNでビルドしたElectronに当たらない情報です。*

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