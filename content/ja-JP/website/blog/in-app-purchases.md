---
title: "Electron 2 の新機能: アプリ内課金"
author: zeke
date: '2018-04-04'
---
  
新しい Electron 2.0 リリースラインは新しい機能と修正が [詰め込まれて](https://github.com/electron/electron/releases/tag/v2.0.0-beta.1) います。 この新しいメジャーバージョンのハイライトの1つは、Apple の [Mac App Store](https://support.apple.com/en-us/HT202023) 向けの [ `inAppPurchase` API](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) です。

---

アプリ内課金により、コンテンツやサブスクリプションをアプリ内から直接購入できます。 これにより、開発者は [基本無料ビジネスモデル](https://developer.apple.com/app-store/freemium-business-model/) を簡単に取り入れることができます。これは、プレミアム機能、追加コンテンツ、サブスクリプションのための任意のアプリ内課金が提供されるものです。

新しい API は、コミュニティのコントリビューター [Adrien Fery](https://github.com/AdrienFery) によって Electron に追加され、講義や会議用のメモをとる Electron アプリ [Amanote](https://amanote.com/) でアプリ内購入ができるようになりました。 Amanote は無料でダウンロードでき、数式、図面、音声録音などの機能を備え、明確で構造化されたメモを PDF に追加できます。

Mac 版 Amanote にアプリ内購入サポートを追加して以来、Adrien は **売り上げが40％増加した** ことに注目しました!

## 始めましょう

新しい [`inAppPurchase`](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) API には、すでに最新の Electron ベータ版に入っています。

```sh
npm i -D electron@beta
```

API のドキュメントは [GitHub にあります](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md)。Adrien の API の使用方法に関するチュートリアルも十二分に親切です。 アプリへアプリ内課金を追加していくには [チュートリアルを参照してください](https://github.com/AdrienFery/electron/blob/a69bbe882aed1a5aee2b7910afe09900275b2bf6/docs/tutorial/in-app- purchases.md)。

[APIの改善](https://github.com/electron/electron/pull/12464) は現在進行中です。間もなくリリースされる Electron ベータリリースで公開されます。

## 次は Windows かも

次に、Adrien は Electron に Microsoft Store のアプリ内課金サポートを追加することで、Amanote の新しい収益口を開くこうと考えています。 今後の開発にご期待ください!