---
title: '今週のプロジェクト: Voltra'
author:
  - '0x00A'
  - aprileelcich
  - zeke
date: '2017-03-07'
---

今週は、[Aprile Elcich](https://twitter.com/aprileelcich) さんと [Paolo Fragomeni](https://twitter.com/0x00A) さんにお会いして、Electron を搭載した音楽プレイヤー Voltra についてお話を伺いました。

---

## Voltra とは何ですか?

[Voltra](https://voltra.co/) は、自分の音楽を所有したい人のための音楽プレイヤーです。 すでに持っているものから新しい音楽を見つけたり、購入したりできるストアでもあります。 広告なしで、デスクトップとモバイル向けのクロスプラットフォームです。 情報収集もしません。

[![voltra-artistview](https://cloud.githubusercontent.com/assets/2289/23670061/4db0323c-031b-11e7-81fd-128e714e911c.jpg)](https://voltra.co/)

## Voltra はどんな人が対象ですか?

音楽を聴くすべての人です。

## Voltra を作ったきっかけは何ですか?

ラジオは昔からリスナーの大きなシェアを獲得しています。 今や電波からインターネットへと移行しています。 オンデマンドで音楽をレンタルできるようにもなりました - ラジオの復活です! そのために多くの新しい製品やサービスが登場しています。しかし、ストリーミングラジオはまだ、音楽とその視聴手段を掌握されています。

私たちは、自分が持っている音楽というものに全面的にこだわったプロダクトを望みました。 アーティストやレーベルから直接、新しい音楽を発見したり購入したりすることを容易にするものです。

## 無料版はありますか?

デスクトッププレイヤーは完全に無料です。 [あなたの音楽を販売するのも無料です!](https://voltra.co/artists) 当サイトに広告はありません。

このアプリは無料なので、後にオープンソース化するかもしれません。 今のところそれを管理する余裕はありません。 機能や採り入れる方向性についても、とても具体的なアイデアを持っています。 活発なベータコミュニティもあり、そのフィードバックを大切にしています。

## どうやって収益化するのですか?

プレミアム機能があります!

[Voltra Audio Archive](https://voltra.co/premium/) は、音楽に特化したクラウドバックアップサービスです。 データブロックを圧縮、共有はしません。 あなたの音楽コレクションは、物理的なバックアップです。

アーティストやレーベル向けの [プロ会員](https://voltra.co/artists/pro) は、アナリティクスやプロアーティストのウェブページなど、より関連する視聴者に届けるためのツールを提供しています。

## Voltra は何が特色なのですか?

デザインとユーザビリティは、私たちにとって非常に重要です。 リスナーの皆様に、煩わせない視聴体験を提供したいのです! 興味深い音楽プレーヤーやストアはすでにいくつか出ています。 しかし、その多くは作者が思っているよりも高度で使いづらいのです。 一人でも多くの人が Voltra を利用できるようにしたいです。

また、アーティストやレーベルからの引き抜きはしていません。 これが差別化しているポイントです。 アーティストが自分の音楽を市場に出すための障壁を下げるには、本当に重要なことなのです。

## どのようなデザイン & 技術的な決定をしましたか?

Voltra をデザインするにあたって、ネイティブアプリやウェブの UI の慣習を考慮し、何を削るかということもたくさん考えました。 私たちには、ここ数ヶ月の間で批判的なフィードバックをくれた活発なプライベートベータグループがいます。

人々は、アルバムアートや写真を本当に大切にしているということがわかりました。 多くのプレイヤーはファイルのリストでしかありません。 アルバムアートは物理アルバムを所有するにあたって格好いい所の一つですが、Voltra デスクトップアプリではこの点を強調したいと思いました。

[![voltra-albumview](https://cloud.githubusercontent.com/assets/2289/23670056/4b0c18d4-031b-11e7-89e1-539e927a380d.jpg)](https://voltra.co/)

他人のファイルに手を出さないようにも気をつけました。 ファイルを見るだけなので、それ自体は好きな場所に置くことができます。名前を変更したり、移動したりすることはありません。 プロセスが実行されていなくても新規ファイルを追跡できるように、見ているディレクトリの状態を追跡する埋め込みデータベースがあります。

## Voltra 構築の際に直面した課題はありますか?

パフォーマンスを重視して、そこに時間をかけました。 最初はフレームワークから始めましたが、バニラ JavaScript に移行しました。 経験上、フレームワークが提供する一般的な抽象化は、導入することによるパフォーマンスの対価や儀式的な記述を上回ります。

We handle very large collections pretty well at this point. Large collections means possibly tens of thousands of images! Having Node.js’ file system module directly available from the render process made it really easy to lazy load and unload lots of images super quickly based on DOM events.

一般的に、*[setImmediate](https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate)* と *[requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)* は、UI の応答性を維持しながら多くの処理を実行するにあたってとてつもなく重要な道具です。 具体的には、CPU に依存するタスクを別のプロセスに分散させることで、ユーザーインターフェースの応答性を保つことができます。 たとえば、実際のオーディオコンテキストを別のプロセスに移動し、ビジーな UI による潜在的な中断を [IPC](https://electronjs.org/docs/glossary/#ipc) を介した通信で回避しました。

## Electron で Voltra を構築することにしたのはなぜですか?

ブラウザのサンドボックスはとても制限されていますが、私たちはウェブプレイヤーも開発しています。 そのため、2 つの実装間でほぼ 100% のコードを共有できるのは大きな利点です。

実際には、Swift でネイティブアプリを構築するところから始めました。 一番の問題点は、多くの再発明をしていることでした。 ウェブには世界最大のオープンソースエコシステムがあります。 そこで、すぐに Electron に切り替えました。

最も重要なのは、Electron で一度開発すれば、すべての主要なプラットフォームで Just Work™ するということです。 保証はありませんが、各プラットフォームのためのネイティブコーディングのコストは、Electron を導入するコストを確実に上回っています。

## Electron の好きなところは何ですか?

**GTD!**: Having Node.js’ networking stack and Chromium’s presentation layer packaged together is a recipe for getting things done.

**Competency**: It’s just the web stack, so literally our whole team is involved in actually building the product.

**Community**:  There is a highly organized community that knows how to communicate really well! We feel pretty great about developing with support like that.

## In what areas could Electron be improved?

We would like to see Electron endorse a single packager. The packager is as important to Electron what the package manager is to Node. There are multiple packagers in user-land, each with interesting features but each with bugs. Consensus by the community would help to direct the energy being spent by contributors.

## What's coming next?

We‘re currently developing a mobile app, and working with artists and labels to add their music to the Voltra shop. Hey! If you’re an artist or label, [sign up now](https://admin.voltra.co/signup)! We plan on opening up the shop when we reach our goal of 10 million tracks.

