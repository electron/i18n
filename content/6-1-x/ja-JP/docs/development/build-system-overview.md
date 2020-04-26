# ビルドシステムの概要

Electronは、プロジェクト生成に[GN](https://gn.googlesource.com/gn)を用い、ビルドには [ninja](https://ninja-build.org/)を使用します。 プロジェクト設定は`.gn` と `.gni` ファイルを見てください。

## GN ファイル

以下の`gn`ファイルにはElectronのビルトのメインルールを含んでいます：

* `BUILD.gn` は、Electron 自身をどのようにビルドするかを定義し、Chromium とリンクするデフォルト設定を含んでいます。
* `build/args/{debug,release,all}.gn` には、Electronをビルドするためのデフォルトのビルド引数が含まれています。

## コンポーネントのビルド

Chromiumはとても巨大なプロジェクトですので、最終的なリンクの段階でかなりの時間を要し、それが開発を難しくしてしまいます。 これを解決するために、Chromiumはそれぞれのコンポーネントを別々の共有ライブラリとしてビルドを行う、「コンポーネントビルド」を採用しており、これによりファイルサイズとパフォーマンスを犠牲にすることでビルドを高速で行っています。

ElectronはChromiumビルドオプションを継承します。 `Debug` ビルドでは、ライブラリはリンク時間を節約するために、Chromium のコンポーネントの共有ライブラリにバイナリがリンクされます。`Release` ビルドではバイナリは静的ライブラリにリンクされるので、適したファイルサイズとパフォーマンスを得ることができます。

## テスト

**注意** _この章は古い内容であり、この情報は GN でビルドされた Electron には該当しません。_

プロジェクトのコーディングスタイルは以下で確認できます。

```sh
$ npm run lint
```

以下で機能テストをします。

```sh
$ npm test
```

Electron のソースコードを変更したため再ビルドとテストを行う場合は以下を実行します。

```sh
$ npm run build && npm test
```

Mocha の[排他テスト (exclusive tests)](https://mochajs.org/#exclusive-tests) 機能を使用することで、特定のテストやブロックが切り離され、連続したテストを早く実行できます。 以下のような `.only` を `describe` か `it` 関数呼び出しに加えます。

```js
describe.only('some feature', function () {
  // ... このブロックのテストのみ実行されます
})
```

他に、Mocha の `grep` オプションで指定した正規表現に一致したテストのみを実行できます。

```sh
$ npm test -- --grep child_process
```

ネイティブモジュール (`runas` など) を含むテストは、デバッグビルドでは実行できません (詳細は [#2558](https://github.com/electron/electron/issues/2558) を参照)。リリースビルドでは動作します。

リリースビルドでテストを行うには、以下のようにします。

```sh
$ npm test -- -R
```
