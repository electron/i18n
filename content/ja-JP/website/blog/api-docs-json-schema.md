---
title: Electron の API ドキュメントを構造化データに
author: zeke
date: '2016-09-27'
---

本日、Electron のドキュメントに対していくつか改善する点を発表します。 新しいリリースごとに、Electron のすべての公開 API を詳細に説明する [JSON ファイル](https://github.com/electron/electron/releases/download/v1.4.1/electron-api.json) を同梱します。 このファイルを作成したことで、開発者は Electron の API ドキュメントの面白くて新しい使用方法ができるようになりました。

---

## スキーマの概要

各 API は、名前、説明、型などの特性を持つオブジェクトです。 `BrowserWindow` や `Menu` のようなクラスには、インスタンスメソッド、インスタンスプロパティ、インスタンスイベントなどもあります。

以下は `BrowserWindow` クラスを説明しているスキーマからの抜粋です。

```js
{
  name: 'BrowserWindow',
  description: 'Create and control browser windows.',
  process: {
    main: true,
    renderer: false
  },
  type: 'Class',
  instanceName: 'win',
  slug: 'browser-window',
  websiteUrl: 'https://electronjs.org/docs/api/browser-window',
  repoUrl: 'https://github.com/electron/electron/blob/v1.4.0/docs/api/browser-window.md',
  staticMethods: [...],
  instanceMethods: [...],
  instanceProperties: [...],
  instanceEvents: [...]
}
```

次に、メソッドの説明の例を示します。以下は `apis.BrowserWindow.instanceMethods.setMaximumSize` インスタンスメソッドです。

```js
{
  name: 'setMaximumSize',
  signature: '(width, height)',
  description: 'Sets the maximum size of window to width and height.',
  parameters: [{
    name: 'width',
    type: 'Integer'
  }, {
    name: 'height',
    type: 'Integer'
  }]
}
```

## 新しいデータを使う

開発者がプロジェクトでこの構造化データを簡単に使用できるように、新しい Electron リリースごとに自動公開される小さな npm パッケージ [electron-docs-api](https://www.npmjs.com/package/electron-api-docs) を作成しました。

```sh
npm install electron-api-docs --save
```

すぐに試したいなら、Node.js REPL 内でこのモジュールを試してみてください。

```sh
npm i -g trymodule && trymodule electron-api-docs=apis
```

## データの収集方法

Electron の API ドキュメントは [Electron Coding Style](https://github.com/electron/electron/blob/master/docs/development/coding-style.md) と [Electron Styleguide](https://github.com/electron/electron/blob/master/docs/styleguide.md#readme) に準拠しているため、内容はプログラムで解析できます。

[electron-docs-linter](https://github.com/electron/electron-docs-linter) は `electron/electron` レポジトリの新しい開発用依存関係となります。 これは、すべての Markdown ファイルを lint し、スタイルガイドのルールを適用するコマンドラインツールです。 エラーが見つかった場合、それらが列挙され、リリースプロセスが停止します。 API ドキュメントが有効な場合、`electron-json.api` ファイルが作成され、Electron リリースの一部として [GitHub にアップロード](https://github.com/electron/electron/releases/tag/v1.4.1) されます。

## Standard Javascript と Standard Markdown

今年の始め頃に Electron のコードベースが更新され、全 JavaScript で [`standard`](http://standardjs.com/) リンターが使用されました。 Standard の README は、この決定の後ろ盾である理由の要約です。

> Standard スタイルを採用するということは、個人のスタイルよりもコードの明快さとコミュニティの慣習の重要性を高く位置付けるということです。 これはプロジェクトと開発の文化にとって 100% の意義を持たないかもしれませんが、オープンソースは初心者が嫌う場所になることがあるものです。 コントリビューターにしてほしいことを自動化して明確にすれば、プロジェクトがより健全になります。

また、ドキュメント内のすべての JavaScript コードスニペットが有効であり、コードベース自体のスタイルと一貫性があることを確認するために、少し前に [standard-markdown](https://github.com/zeke/standard-markdown) を作成しました。

これらのツールを組み合わせて、継続的インテグレーション (CI) がプルリクエストのエラーを自動的に見つけることができます。 これにより、コードをレビューする人間の負担が軽減され、ドキュメントの正確性に関する信頼性が高まります。

### コミュニティ活動

Electron のドキュメントは絶えず改善されており、素晴らしいオープンソースコミュニティがあることに感謝します。 このドキュメントの執筆時点で、約 300 人がドキュメントに貢献しています。

この新しい構造化データで皆さんが何をするのか楽しみです。 考えられる用途は以下の通りです。

- [https://electronjs.org/docs/](https://electronjs.org/docs/) の改善
- TypeScript を使用したプロジェクトで Electron の開発を効率的にする [TypeScript 定義ファイル](https://github.com/electron/electron-docs-linter/blob/master/README.md#typescript-definitions)。
- [Dash.app](https://kapeli.com/dash) や [devdocs.io](http://devdocs.io/) などの検索可能オフラインドキュメントツール用

