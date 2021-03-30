---
title: 検索
author:
  - echjordan
  - vanessayuenn
  - zeke
date: '2018-06-21'
---

Electron のウェブサイトに、APIドキュメント、チュートリアル、Electron 関連の npm パッケージなどを瞬時に検索できる新しい検索エンジンを導入しました。

<figure>
  <a href="https://electronjs.org/?query=resize" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/41683719-417ca80a-7490-11e8-9a52-fb145f4251ba.png" alt="Electron 検索のスクリーンショット">
  </a>
</figure>

---

Electron のような新しい技術やフレームワークを覚えるのは大変なことです。 [クイックスタート][] の段階を過ぎると、ベストプラクティスを学んだり、適切な API を見つけたり、夢のアプリを構築するのに役立つツールを発見したりするのが難しくなっていきます。 Electron のウェブサイトを、より早く、より簡単なアプリ構築のために必要なリソースを探せるより良いツールにしたいと考えています。

[electronjs.org](https://electronjs.org) の任意のページにアクセスすると、ページ上部に新しい検索欄が表示されます。

## 検索エンジン

ウェブサイトに検索を追加しようと思った当初は、バックエンドに GraphQL を使った独自の検索エンジンを試運転しました。 GraphQL の作業は楽しく、検索エンジンは高パフォーマンスでしたが、この構築は分かりきった作業ではないとすぐに気づきました。 複数語での検索やタイプミス検出のようなものは、正しく動くために多くの作業を必要とします。 車輪を再発明するのではなく、既存の検索ソリューション [アAlgolia][] を使用することにしました。

Algolia は、React、Vue、Bootstrap、Yarn、[その他多数](https://community.algolia.com/docsearch/) の人気オープンソースプロジェクトの間で急速に選ばれる検索エンジンとなったホスト型検索サービスです。

ここでは、Algolia が Electron プロジェクトに適していた機能をいくつか紹介します。

- [InstantSearch.js](https://community.algolia.com/instantsearch.js) はタイプして通常 1ms 以内に結果を提供します。
- [タイプミス寛容性](https://www.algolia.com/doc/guides/textual-relevance/typo-tolerance/) により [`widnow`] と入力しても結果が得られます。
- [高度なクエリ構文](https://www.algolia.com/doc/api-reference/api-parameters/advancedSyntax/) により `"引用符で囲まれた完全一致"` と `-除外` ができます。
- [API クライアント](https://www.algolia.com/doc/api-client/javascript/getting-started/) はオープンソースで、十分にドキュメント化されています。
- [分析](https://www.algolia.com/doc/guides/analytics/analytics-overview/) により頻繁に検索されるものや、検索しても見つけらないものがわかります。 これにより、Electron のドキュメントの改善策について、貴重な知見を得ることができます。
- Algolia は [オープンソースプロジェクトのための無料](https://www.algolia.com/for-open-source) です。

## APIドキュメント

時折、*何を達成したいか* 分かっていても、*どのように* それを行うかが正確に分からないことがあります。 Electron には 750 以上の API メソッド、イベント、プロパティがあります。 人間は簡単に全部覚えられませんが、コンピュータにとっては得意分野です。 Electron の [JSON API ドキュメント](https://electronjs.org/blog/api-docs-json-schema) を利用して、Algolia にあるすべてのデータをインデックス化し、探している APIを簡単に見つけられます。

ウインドウをサイズ変更してみたいのですか? [`resize`] で検索して、必要なメソッドに直接ジャンプしましょう。

## チュートリアル

Electron では、API ドキュメントを補完するチュートリアルのコレクションが増え続けています。 これで、関連する API ドキュメントと一緒に、特定トピックのチュートリアルもより簡単に見つけられるようになりました。

セキュリティのベストプラクティスをお探しですか? [`security`] と検索しましょう。

## npm パッケージ

npm レジストリには現在 70 万以上のパッケージがあり、必要なパッケージを見つけるのは簡単ではありません。 これらのモジュールをより簡単に探せるように、Electron 向けに特別に作られた 3400 以上のモジュールを集めた [`electron-npm-packages`] を作成しました。

[Libraries.io][] の方々は、コード、コミュニティ、ドキュメント、使用状況などのメトリクスの組み合わせに基づいてソフトウェアプロジェクトをスコアリングするシステム、[SourceRank][] を作成しています。 これらのスコアを使って、npm レジストリ内のすべてのモジュールのスコアを含む [`sourceranks`] モジュールを作成しパッケージの結果をソートしています。

Electron 内蔵の IPC モジュールの代替品をお探しですか? [`is:package ipc`] と検索しましょう。

## Electron アプリ

[Algolia でデータをインデックスするのが簡単](https://github.com/electron/algolia-indices) なので、[electron/apps](https://github.com/electron/apps) から既存のアプリリストを追加しました。

[`music`] や [`homebrew`] と検索してみてください。

## 結果のフィルタリング

GitHub の [コード検索](https://github.com/search) を使ったことがある人なら、`extension:js` や `user:defunkt` のようなコロンで区切られたキーバリューフィルタが存在すると気づいているでしょう。 このフィルタリング技術は非常に強力なものであると考えており、Electron の検索に `is:` キーワードを追加しました。これにより、一種類の結果のみを表示するようにフィルタできます。

- [`[<code>is:api thumbnail`]</code>][]
- [`[<code>is:tutorial security`]</code>][]
- [`[<code>is:package ipc`]</code>][]
- [`[<code>is:app graphql`]</code>][]

## キーボードナビゲーション

キーボードショートカットはみんな大好き! キーボードから指を離さずに検索できるようになっています。

- <kbd>/</kbd> 検索欄にフォーカス
- <kbd>esc</kbd> 検索欄にフォーカスしてそれを消去
- <kbd>down</kbd> 次の結果に移動
- <kbd>up</kbd> 前の結果か検索欄に移動
- <kbd>enter</kbd> 結果を開く

また、このキーボード操作を可能にする [モジュール](https://github.com/electron/search-with-your-keyboard/) もオープンソース化しました。 Algolia InstantSearch 用に設計されていますが、他の検索実装と互換になるように一般化してあります。

## フィードバック募集中

新しい検索ツールで何か問題が発生した場合は、それについてお聞かせください!

フィードバックを提出する最善の方法は、GitHub で適切なリポジトリに Issue を提出することです。

- [electron/electronjs.org](https://github.com/electron/electronjs.org) は Electron のウェブサイトです。 どこに問題を提出すればよいかわからない場合は、これが最善の方法です。
- [electron/algolia-indices](https://github.com/electron/algolia-indices) は検索可能な Electron データすべてをコンパイルしてあります。
- [electron/search-with-your-keyboard](https://github.com/electron/search-with-your-keyboard) が検索インターフェイスをキーボードでナビゲーション可能にします。
- [algolia/instantsearch.js](https://github.com/algolia/instantsearch.js) はタイプして検索を有効にするブラウザ側のクライアントです。
- [algolia/algoliasearch-client-javascript](https://github.com/algolia/algoliasearch-client-javascript) はデータを Algolia のサーバーにアップロードする Node.js クライアントです。

## 謝辞

これらの新しい検索機能を構築してくださった [Emily Jordan](https://github.com/echjordan) と [Vanessa Yuen](https://github.com/vanessayuenn)、[Libraries.io][] のスコアを提供してくださった [SourceRank][] 、そして私たちの活動を支援してくださった Algolia のチームに感謝します。 🍹

[`[&lt;code>is:api thumbnail`]</code>]: https://electronjs.org/?query=is%3Aapi%20thumbnail
[`[&lt;code>is:app graphql`]</code>]: https://electronjs.org/?query=is%3Aapp%20graphql
[`[&lt;code>is:package ipc`]</code>]: https://electronjs.org/?query=is%3Apackage%20ipc
[`[&lt;code>is:tutorial security`]</code>]: https://electronjs.org/?query=is%3Atutorial%20security
[アAlgolia]: https://algolia.com
[Libraries.io]: https://libraries.io
[クイックスタート]: https://github.com/electron/electron-quick-start
[SourceRank]: https://docs.libraries.io/overview.html#sourcerank