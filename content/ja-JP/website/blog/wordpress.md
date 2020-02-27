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

我々には Calypso に取り組むチームがいくつかありました。 To make a full multi-platform GUI client that matched this using traditional desktop technologies would have taken more work. By using Electron, a small team of 2-4 of us were able to leverage the other team’s efforts and build the Desktop app in a couple of months.

## What are some challenges you've faced while building WordPress Desktop?

We got an initial version of the app running very quickly, but tuning it to behave optimally as a desktop app took a lot more time. One big challenge with the app is that you're actually running a copy of Calypso on your own machine - it’s purely an API driven UI. There was a lot of bridging work involved in this, and changes were fed back to Calypso itself.

Additionally a lot of effort was spent packaging the app for different platforms - we provide Windows, macOS, and Linux versions - and there are sufficient differences to make this tricky.

At the time Electron was relatively new and we kept running into issues that were shortly fixed (sometimes the same day!)

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

