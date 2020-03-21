---
title: '今週のプロジェクト: Beaker ブラウザ'
author:
  - pfrazee
  - zeke
date: '2017-02-07'
---

今週は、[Beaker ブラウザ](https://beakerbrowser.com/) の作者 <a href = "http://pfrazee.github.io/">Paul Frazee</a> に突撃しました。 Beaker は実験的な P2P ウェブブラウザで、Dat プロトコルでユーザーのデバイスからサイトをホストします。

---<iframe width="100%" height="420" src="https://www.youtube.com/embed/Bem9nRpyPEs" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

## Beaker とは何ですか? なぜ作ったのですか?

Beaker は参加型ブラウザです。 個人ハッカー向けのブラウザなのです。

ウェブはオープンソースではありません。 ソーシャルメディアの機能に影響を与えたい場合、Facebook や Twitter に働きかける必要があります。 検索なら、Google です。 この制御は、ユーザー自身ではなく企業が握ってます。

Beaker には、新しいウェブプロトコル [Decentralized Archive Transport](https://datprotocol.com) があります。 "Dat"。それはオンデマンドかつ無料でサイトを作成し、デバイスから共有します。 サーバーは要りません。 これは革命です。

![Beakers Protocols](https://cloud.githubusercontent.com/assets/2289/22560648/3defed5c-e92a-11e6-93f8-956cafafe3be.jpg)

Beaker で Dat サイトを訪れると、そのファイルをダウンロードします。 これで、このサイトは永遠にあなたのものです。 保存したり、フォークしたり、変更したり、新しいバージョンを無料で共有したりできます。 全てがオープンソースです。

これこそが、私たちがオープンソースウェブサイト向けブラウザを作っているということです。 これをソーシャルハッキングのツールキットにしたいのです。

## どんな人が Beaker を使うべきですか?

ハッカー。 モッダー。 創り手。 弄り回すのが好きな人。

## Dat を使った新規プロジェクトの作り方は?

git + npm のような [bkr というコマンドラインツール](https://github.com/beakerbrowser/bkr) があります。 これで以下のようにしてサイトを作ります。

```bash
$ cd ~/my-site
$ bkr init
$ echo "Hello, world!" > index.html
$ bkr publish
```

そして、サイトのフォークはこのようにします。

```bash
$ bkr fork dat://0ff7d4c7644d0aa19914247dc5dbf502d6a02ea89a5145e7b178d57db00504cd/ ~/my-fork
$ cd ~/my-fork
$ echo "My fork has no regard for the previous index.html!" > index.html
$ bkr publish
```

これらのサイトは、ブラウザからホストされます。 BitTorrent に少し似た、P2P メッシュでのサイト共有です。

GUI が必要な場合でも、ブラウザにはユーザーランドに押し込んでいる基本的なツールがいくつか組み込まれています。 これによって全て変更可能なユーザーアプリになります。

## Electron で Beaker を構築することにしたのはなぜですか?

このプロジェクトにとっては言うまでもありませんでした。 If I forked Chrome myself, I'd be writing C++ right now! Nobody wants to do that. I know the Web stack, and I can work quickly with it. It's a no-brainer.

The truth is, I'm not sure I could do any of this without Electron. It's a great piece of software.

## What are some challenges you've faced while building Beaker?

Half of it is poking at the tools and figuring out how much I can get away with.

Making the browser itself was pretty easy. Electron is practically a toolkit for making browsers. ...Except for the browser tabs; that took me forever to get right. I finally broke down and learned how to do SVGs. It's much better looking, but it took 3 or 4 iterations before I got that right.

## In what areas should Electron be improved?

It'd be really great if I could dock the devtools inside a webview.

## What's coming next in Beaker?

Secure DNS names for Dat sites. A socially configurable URL scheme, called the ["app scheme."](https://github.com/beakerbrowser/beaker/wiki/App-Scheme) More Dat APIs.

## For folks who may be interested in contributing to the project, in what areas does Beaker need help?

We have lots of open issues. Don't be afraid to ping me. #beakerbrowser on freenode. We keep a [page for contributors](https://beakerbrowser.com/docs/team.html) and we'll add you to it. And if you visit Austin, I'll buy you a beer.

## Any Electron tips that might be useful to other developers?

1. Use the build tooling that's out there. You don't want to wrestle with your own solutions, trust me. Use electron-builder. Use a boilerplate repo.
2. If you need to open an issue in the Electron repo, go the extra mile to make it easy to reproduce. You'll get a response much more quickly, and the team will appreciate it. Even better, try fixing it yourself. It's actually pretty interesting to see the innards.
3. Read through all the guides and advanced docs at least once.
4. Don't build a browser, it's a saturated market.

