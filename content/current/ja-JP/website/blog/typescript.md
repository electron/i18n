---
title: "Electron での TypeScript サポートを発表"
author: zeke
date: '2017-06-01'
---

`Electron` npm パッケージに、Electron API 全体の詳細なアノテーションを提供する TypeScript 定義ファイルが含まれるようになりました。 これらのアノテーションは、たとえ純粋なJavaScriptを書いていていても、Electron の**開発エクスペリエンスを向上させることができます**。 ただ`npm install electron` を実行して、あなたのプロジェクトに最新の Electron の入力を取得できます。

---

TypeScript は、Microsoft が作成したオープンソースのプログラミング言語です。 これは、静的型をサポート追加することで言語を拡張する JavaScript のスーパーセットです。 TypeScript のコミュニティは近年急速に成長しています。そしてTypeScriptは、最近のStack Overflow開発者調査で [最も愛されているプログラミング言語](https://stackoverflow.com/insights/survey/2017#technology-most-loved-dreaded-and-wanted-languages)にランクインしました。  TypeScript は「スケールする JavaScript」と説明されています。[GitHub](https://githubengineering.com/how-four-native-developers-wrote-an-electron-app/)、[Slack](https://slack.engineering/typescript-at-slack-a81307fa288d)と[Microsoft](https://github.com/Microsoft/vscode)のチームはこれを使って数百万人が使用する、スケーラブルな Electron アプリを作成しています。

TypeScript は、JavaScript により新しい多くの言語機能を提供しています。クラス、オブジェクトの破棄、非同期/待機などです。しかしその本当の差別化機能は**型アノテーション **です。 プログラムに期待される入出力データ型を宣言すると、コンパイル時にエラーを見つけることができ、[バグを減らすことができます](https://slack.engineering/typescript-at-slack-a81307fa288d)。そしてアノテーションは[プログラムがどのように動作するか](https://staltz.com/all-js-libraries-should-be-authored-in-typescript.html)を形式的に説明することになります。

純粋な Javascript でライブラリが書かれている場合、ドキュメントを書くときには、その型はしばしば漠然と定義されます。 関数は、多くの場合、ドキュメントで指定された型よりも多くの型を受け入れることもありますし、関数にドキュメント化されていない、暗黙の型の制約を持つ場合があります。そのためにランタイムエラーが発生する可能性もあります。

TypeScript は **定義ファイル** でこの問題を解決します。 TypeScript の定義ファイルには、ライブラリのすべての関数と、それらの関数で期待される入出力の型が記述されています。 ライブラリの作成者が公開ライブラリに TypeScript 定義ファイルをバンドルする場合、そのライブラリを使って開発するユーザーは、[そのライブラリのAPIをエディタ内ですぐに調べ](https://code.visualstudio.com/docs/editor/intellisense)られるようになります。そして、ライブラリのドキュメントを参照することなく、すぐに開発を開始できます。

[Angular](https://angularjs.org/)や[Vue.js](http://vuejs.org/)や[node-github](https://github.com/mikedeboer/node-github)(そして Electron も!)のように多くの人気の高いプロジェクトは自身の定義ファイルをコンパイルし、それをnpm の公開パッケージにバンドルしています。 独自の定義ファイルをバンドルしていないプロジェクトのために、[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) というコミュニティがメンテナンスする定義ファイルを扱う、サードパーティのエコシステムがあります。

## インストール

バージョン 1.6.10 以降の、Electron のすべてのリリースには独自の TypeScript 定義ファイルが含まれています。 Npm から `electron` パッケージをインストールすると、 `electron.d.ts` ファイルがインストールパッケージに自動的にバンドルされます。

Electron をインストールする [最も安全な方法は](https://electronjs.org/docs/tutorial/electron-versioning/) であり、正確なバージョン番号を使用することです:

```sh
npm install electron --save-dev --save-exact
```

または、 [yarn](https://yarnpkg.com/lang/en/docs/migrating-from-npm/#toc-cli-commands-comparison) を使っているなら：

```sh
yarn add electron --dev --exact
```

`@types/electron` や `@types/node`などのサードパーティの定義を既に使用している場合は、衝突しないように、Electronプロジェクトからそれらの定義ファイルを削除する必要があります。

定義ファイルは、[構造化 API ドキュメント](https://electronjs.org/blog/2016/09/27/api-docs-json-schema)から導出します。そのため、[Electron の API ドキュメント](https://electronjs.org/docs/api/)と常に 一致します。 `Electron` をインストールするだけで、使用している Electron のバージョンの最新の TypeScript 定義が得られます。

## 使い方

Electron の新しい TypeScript 注釈をインストールして使用する方法の概要については、 デモ用スクリーンキャストをご覧ください。 <iframe width="100%" height="420" src="https://www.youtube.com/embed/PJRag0rYQt8" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

[Visual Studio Code](https://code.visualstudio.com/)を使用している場合、 はすでにTypeScript をサポートしています。 There are also community-maintained plugins for [Atom](https://atom.io/packages/atom-typescript), [Sublime](https://github.com/Microsoft/TypeScript-Sublime-Plugin), [vim](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support#vim), and [other editors](https://www.typescriptlang.org/index.html#download-links).

Once your editor is configured for TypeScript, you'll start to see more context-aware behavior like autocomplete suggestions, inline method reference, argument checking, and more.

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128017/f6318c20-3a3f-11e7-9c2c-401a32d1f9fb.png" alt="メソッドの自動完了">
  <figcaption>自動補完メソッド</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128018/f6352600-3a3f-11e7-8d92-f0fb88ecc53e.png" alt="メソッドの参照">
  <figcaption>インラインメソッド参照</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128021/f6b1ca0c-3a3f-11e7-8161-ce913268a9f0.png" alt="引数の確認">
  <figcaption>確認する引数</figcaption>
</figure>

## TypeScriptを始める

If you're new to TypeScript and want to learn more, this [introductory video from Microsoft](http://video.ch9.ms/ch9/4ae3/062c336d-9cf0-498f-ae9a-582b87954ae3/B881_mid.mp4) provides a nice overview of why the language was created, how it works, how to use it, and where it's headed.

公式TypeScriptウェブサイトには [ハンドブック](https://www.typescriptlang.org/docs/handbook/basic-types.html) と [遊び場](https://www.typescriptlang.org/play/index.html) もあります。

TypeScript は JavaScript のスーパーセットであるため、既存の JavaScript コードは すでに有効な TypeScript です。 つまり、既存の JavaScript プロジェクトを TypeScript に徐々に移行し、必要に応じて新しい言語機能を振りかけることができます。

## 謝辞

このプロジェクトは、Electron の オープンソースメンテナのコミュニティの助けを借りなければ実現できなかったでしょう。 Thanks to [Samuel Attard](https://github.com/MarshallOfSound), [Felix Rieseberg](https://github.com/felixrieseberg), [Birunthan Mohanathas](https://github.com/poiru), [Milan Burda](https://github.com/miniak), [Brendan Forster](https://github.com/shiftkey), and many others for their bug fixes, documentation improvements, and technical guidance.

## サポート

If you encounter any issues using Electron's new TypeScript definition files, please file an issue on the [electron-typescript-definitions](https://github.com/electron/electron-typescript-definitions/issues) repository.

ハッピーTypeScripting!
