# ビルドシステムの概要

Electron uses [GN](https://gn.googlesource.com/gn) for project generation and [ninja](https://ninja-build.org/) for building. Project configurations can be found in the `.gn` and `.gni` files.

## GN Files

The following `gn` files contain the main rules for building Electron:

* `BUILD.gn` defines how Electron itself is built.
* `brightray/BUILD.gn` defines how `brightray` is built and includes the default configurations for linking with Chromium.
* `build/args/{debug,release,all}.gn` contain the default build arguments for building Electron.

## コンポーネントのビルド

Chromiumはとても巨大なプロジェクトですので、最終的なリンクの段階でかなりの時間を要し、それが開発を難しくしてしまいます。 これを解決するために、Chromiumはそれぞれのコンポーネントを別々の共有ライブラリとしてビルドを行う、「コンポーネントビルド」を採用しており、これによりファイルサイズとパフォーマンスを犠牲にすることでビルドを高速で行っています。

Electron inherits this build option from Chromium. In `Debug` builds, the binary will be linked to a shared library version of Chromium's components to achieve fast linking time; for `Release` builds, the binary will be linked to the static library versions, so we can have the best possible binary size and performance.

## テスト

**NB** *this section is out of date and contains information that is no longer relevant to the GN-built electron.*

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