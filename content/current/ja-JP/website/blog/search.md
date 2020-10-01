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
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/41683719-417ca80a-7490-11e8-9a52-fb145f4251ba.png" alt="Electron Search Screenshot">
  </a>
</figure>

---

Electron のような新しい技術やフレームワークを覚えるのは大変なことです。 [クイックスタート](https://github.com/electron/electron-quick-start) の段階を過ぎると、ベストプラクティスを学んだり、適切な API を見つけたり、夢のアプリを構築するのに役立つツールを発見したりするのが難しくなっていきます。 Electron のウェブサイトを、より早く、より簡単なアプリ構築のために必要なリソースを探せるより良いツールにしたいと考えています。

[electronjs.org](https://electronjs.org) の任意のページにアクセスすると、ページ上部に新しい検索欄が表示されます。

## 検索エンジン

ウェブサイトに検索を追加しようと思った当初は、バックエンドに GraphQL を使った独自の検索エンジンを試運転しました。 GraphQL の作業は楽しく、検索エンジンは高パフォーマンスでしたが、この構築は分かりきった作業ではないとすぐに気づきました。 複数語での検索やタイプミス検出のようなものは、正しく動くために多くの作業を必要とします。 車輪を再発明するのではなく、既存の検索ソリューション [アAlgolia](https://algolia.com) を使用することにしました。

Algolia は、React、Vue、Bootstrap、Yarn、[その他多数](https://community.algolia.com/docsearch/) の人気オープンソースプロジェクトの間で急速に選ばれる検索エンジンとなったホスト型検索サービスです。

ここでは、Algolia が Electron プロジェクトに適していた機能をいくつか紹介します。

- [InstantSearch.js](https://community.algolia.com/instantsearch.js) provides results as you type, usually in about 1ms.
- [Typo tolerance](https://www.algolia.com/doc/guides/textual-relevance/typo-tolerance/) means you'll still get results even when you type [`widnow`].
- [Advanced query syntax](https://www.algolia.com/doc/api-reference/api-parameters/advancedSyntax/) enables `"exact quoted matches"` and `-exclusion`.
- [API clients](https://www.algolia.com/doc/api-client/javascript/getting-started/) are open source and with well-documented.
- [Analytics](https://www.algolia.com/doc/guides/analytics/analytics-overview/) tell us what people are searching for most, as well as what they're searching for but not finding. This will give us valuable insight into how Electron's documentation can be improved.
- Algolia is [free for open source projects](https://www.algolia.com/for-open-source).

## API Docs

Sometimes you know *what* you want to accomplish, but you don't know exactly *how* to do it. Electron has over 750 API methods, events, and properties. No human can easily remember all of them, but computers are good at this stuff. Using Electron's [JSON API docs](https://electronjs.org/blog/api-docs-json-schema), we indexed all of this data in Algolia, and now you can easily find the exact API you're looking for.

Trying to resize a window? Search for [`resize`] and jump straight to the method you need.

## チュートリアル

Electron has an ever-growing collection of tutorials to complement its API documentation. Now you can more easily find tutorials on a given topic, right alongside related API documentation.

Looking for security best practices? Search for [`security`].

## npm Packages

There are now over 700,000 packages in the npm registry and it's not always easy to find the one you need. To make it easier to discover these modules, we've created [`electron-npm-packages`], a collection of the 3400+ modules in the registry that are built specifically for use with Electron.

The folks at [Libraries.io](https://libraries.io) have created [SourceRank](https://docs.libraries.io/overview.html#sourcerank), a system for scoring software projects based on a combination of metrics like code, community, documentation, and usage. We created a [`sourceranks`] module that includes the score of every module in the npm registry, and we use these scores to sort the package results.

Want alternatives to Electron's built-in IPC modules? Search for [`is:package ipc`].

## Electron アプリ

It's [easy to index data with Algolia](https://github.com/electron/algolia-indices), so we added the existing apps list from [electron/apps](https://github.com/electron/apps).

Try a search for [`music`] or [`homebrew`].

## Filtering Results

If you've used GitHub's [code search](https://github.com/search) before, you're probably aware of its colon-separated key-value filters like `extension:js` or `user:defunkt`. We think this filtering technique is pretty powerful, so we've added an `is:` keyword to Electron's search that lets you filter results to only show a single type:

- [`is:api thumbnail`]
- [`is:tutorial security`]
- [`is:package ipc`]
- [`is:app graphql`]

## Keyboard Navigation

People love keyboard shortcuts! The new search can be used without taking your fingers off the keyboard:

- <kbd>/</kbd> focuses the search input
- <kbd>esc</kbd> focuses the search input and clears it
- <kbd>down</kbd> moves to the next result
- <kbd>up</kbd> moves to the previous result, or the search input
- <kbd>enter</kbd> opens a result

We also open-sourced the [module](https://github.com/electron/search-with-your-keyboard/) that enables this keyboard interaction. It's designed for use with Algolia InstantSearch, but is generalized to enable compatibility with different search implementations.

## We want your feedback

If you encounter any issues with the new search tool, we want to hear about it!

The best way to submit your feedback is by filing an issue on GitHub in the appropriate repository:

- [electron/electronjs.org](https://github.com/electron/electronjs.org) is the Electron website. If you don't know where to file an issue, this your best bet.
- [electron/algolia-indices](https://github.com/electron/algolia-indices) is where all the searchable Electron data is compiled.
- [electron/search-with-your-keyboard](https://github.com/electron/search-with-your-keyboard) makes the search interface navigable by keyboard.
- [algolia/instantsearch.js](https://github.com/algolia/instantsearch.js) is the browser-side client that enables find-as-you-type search.
- [algolia/algoliasearch-client-javascript](https://github.com/algolia/algoliasearch-client-javascript) is the Node.js client for uploading data to Algolia's servers.

## 謝辞

Special thanks to [Emily Jordan](https://github.com/echjordan) and [Vanessa Yuen](https://github.com/vanessayuenn) for building these new search capabilities, to [Libraries.io](https://libraries.io) for providing [SourceRank](https://docs.libraries.io/overview.html#sourcerank) scores, and to the team at Algolia for helping us get started. 🍹