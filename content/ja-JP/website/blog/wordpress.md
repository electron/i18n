---
title: '今週のプロジェクト: WordPress デスクトップ'
author:
  - mkaz
  - johngodley
  - zeke
date: '2017-02-28'
---

今週の [Automattic](https://automattic.com/) では [WordPress デスクトップ](https://apps.wordpress.com/desktop/) について話をしました。これは、WordPress コンテンツを管理するためのオープンソースのデスクトップクライアントです。

---

[![WordPress Apps](https://cloud.githubusercontent.com/assets/2289/23391881/ea54d52e-fd2c-11e6-86ec-98fe466d5c5c.gif)](https://apps.wordpress.com/desktop/)

## WordPress は誰でも知っているけれど、WordPress デスクトップって何?

[WordPress.com デスクトップアプリ](https://apps.wordpress.com/desktop/) は、コンテンツとデザインに集中できる、シームレスなクロスプラットフォーム体験を提供します。ブラウザタブが無いので、あなたの集中を削いだり、サイト作りを放って違うサイトを見てしまったりすることはありません。 ブラウザーサポートとモバイルアプリを組み合わせることで、どこでもサイトを作れます。

## なぜ WordPress サイトを管理するデスクトップアプリを作るのですか? ウェブベースで十分じゃないですか?

実際、ブラウザで [WordPress.com](https://wordpress.com) にアクセスしたときと全く同じ技術を使用しています。 しかし、これはすべてローカルでホストされるため、読み込み時間が最小限になります。 Dock や通知などのネイティブ機能の恩恵を活用し、WordPress のサイトとブログにより集中できます。

## Electron で WordPress デスクトップを構築することにしたのはなぜですか?

2015 年末に、WordPress.com の多くを [Calypso](https://github.com/automattic/wp-calypso) 形式で再構築しました。これは、React を使用したオープンソースのモダン JavaScript アプリです。 私たちは Electron の検討を開始し、Calypso にいくつかの変更を加えて、ローカルで実行できるようにしました。 それは信じられないような体験で、さらなる開発に多くの価値を見出しました。

我々には Calypso に取り組むチームがいくつかありました。 従来のデスクトップ技術を使用して、これに一致する完全なマルチプラットフォーム GUI クライアントを作成するには、さらに多くの作業が必要でした。 Electron を使用することで、2 ~ 4 人の小さなチームが他のチームの成果を活用する形で数ヶ月でデスクトップアプリを構築できました。

## WordPress デスクトップ構築の際に直面した課題はありますか?

アプリの初期バージョンは非常に速く動作しましたが、デスクトップアプリとして最適な動作をするよう調整するには、より多くの時間がかかりました。 このアプリの大きな課題の 1 つは、実際に自身のマシン上で Calypso のコピーを実行していることです。これは純粋に API が駆動する UI です。 ブリッジ作業が多く、変更は Calypso 自体にフィードバックされました。

さらに、Windows、macOS、Linux バージョンを提供するために、各プラットフォーム向けにアプリをパッケージ化する多大な労力が費やされました。

当時、Electron は比較的新しいものであり、すぐに (時には同日中に!) 修正される問題に直面し続けました。

## In what areas should Electron be improved?

Electron already provides most of what we need for the Desktop app, and it's progressed rapidly since we started using it. That said, there are some areas that are taken for granted in a desktop app, such as spell checking and find/replace, that are harder to replicate with Electron as-is.

We’d also love to see some of the newer Chrome technologies filtering down into Electron too. We’re particularly keen on experimenting with WebVR.

## What are your favorite things about Electron?

The main reason we chose Electron, and it's biggest strength, is the very active and open community. Automattic has always believed in open source. It is one of our core tenets, and the Electron project and community follows a lot of the core beliefs of being very open and positive.

## What's coming next in WordPress Desktop?

The great thing about our model is that the Desktop app benefits from any new Calypso feature - there are constant improvements. We’re hoping we can add additional features to the app such as offline support, which would really take the app into native territory, and better system notifications.

## Are there any teams at Automattic working on other Electron apps?

Yes, after our efforts on the Desktop app, the Simplenote team decided to use Electron to build desktop apps for Windows and Linux (a native Mac client already exists). The [Simplenote Electron app](https://github.com/Automattic/simplenote-electron) is also open source and available on Github.

We've also got an upcoming Raspberry Pi integration that uses Electron.

If any of that sounds interesting then we'd [love to hear from you](https://automattic.com/work-with-us/)!

## Any Electron tips that might be useful to other developers?

The process of shipping signed desktop software is relatively new to us, especially for Windows. we wrote up an article for [Code Signing a Windows App](https://mkaz.blog/code/code-signing-a-windows-application/) which includes the process and a few of the hurdles we went through to do it right.

