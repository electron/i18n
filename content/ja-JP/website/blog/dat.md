---
title: '今週のプロジェクト: Dat'
author:
  - karissa
  - yoshuawuyts
  - maxogden
  - zeke
date: '2017-02-21'
---

今週の特集プロジェクトは、[助成金](https://changelog.com/rfc/6)、オープンソース、データセットを配布するための分散ツール [Dat](https://datproject.org/) です。 Dat は [地理分散されたチーム](https://datproject.org/team) によって構築と保守がされており、その多くがこの記事の執筆を支援しました。

---

[![A screenshot of the main view of dat-desktop, showing a few rows of shared
dats](https://cloud.githubusercontent.com/assets/2289/23175925/dbaee7ec-f815-11e6-80cc-3041203c7842.png)](https://github.com/datproject/dat-desktop)

## まず、Dat とは何ですか?

私たちは P2P と分散システムの良い部分をデータ共有に昇華したいと考えました。 科学データの共有から始め、研究機関、政府、公共サービス、オープンソースチームにも分かれ始めました。

別の見方で考えると、Dat が [オープンソース](https://github.com/datproject) であることを除けば、これは Dropbox や BitTorrent Sync などのような同期アップロードアプリです。 大規模、小規模、中規模、小規模バッチ、大規模バッチデータ向けの強力でオープンソースな非営利データ共有ソフトウェアになることが目標です。

`dat` CLI ツールを使用方法は、以下のように入力するだけです。

```sh
dat share フォルダ/へ/の/パス
```

すると、dat はそのフォルダのリンクを作成します。これはそのフォルダを他人へ送信する際に使用できますが、中央サーバーやサードパーティがあなたのデータにアクセスすることはありません。 BitTorrent と異なり、誰が何を共有しているかを盗聴することも不可能です ([詳細は Dat Paper のドラフトを参照してください](https://github.com/datproject/docs/blob/master/papers/dat-paper.md))。

## Dat についてはわかりました。 Dat デスクトップは便利なのですか?

[Dat デスクトップ](https://github.com/datproject/dat-desktop) は、コマンドラインを使用できない、または使用したくない人が Dat に触れられる手段です。 マシン上で複数の Dat をホストし、ネットワーク経由でデータを提供できます。

## 成熟したユースケースをいくつか教えて頂けますか?

### DataRefuge + Project Svalbard

私たちは [Project Svalbard](https://github.com/datproject/svalbard) というコードネームの物に取り組んでおり、これは紛失のリスクに晒される政府の気候データをバックアップするために活動している [DataRefuge](http://www.ppehlab.org/datarefuge) というグループに関連しています。 Svalbard は、植物 DNA の巨大な地下バックアップ保管庫を持つ北極圏のスヴァールバル世界種子貯蔵庫にちなんで名付けられました。 私たちの場合は、公開科学データセットの巨大なバージョン管理コレクションといったところです。 メタデータを熟知して信頼できれば、[分散ボランティアデータストレージネットワーク](https://github.com/datproject/datasilo/) のような素晴らしいプロジェクトをも構築できます。

### California Civic Data Coalition

[CACivicData](http://www.californiacivicdata.org/) は、政治資金を追跡するカリフォルニア州のデータベース CAL-ACCESS からのダウンロードを毎日提供するオープンソースアーカイブです。 [毎日リリース](http://calaccess.californiacivicdata.org/downloads/0) していますが、これは各 zip ファイルのいたる所で大量の重複データをホストしているということです。 Dat リポジトリが、特定のバージョンを参照したり新しいバージョンへ更新したりするときに必要な手間と帯域幅の量を減らした形でデータホストできるように取り組んでいます。

## Electron の更新

これはまだ具体案ではありませんが、コンパイル済み Electron アプリを Dat リポジトリに配置し、Electron の Dat クライアントを使用してビルドされたアプリバイナリの最新の差分を落としすことでダウンロード時間を節約するという面白そうなユースケースがあります。これにより、サーバーの帯域幅コストも削減できます。

## どんな人が Dat デスクトップを使うべきですか?

P2P ネットワークを介してデータを共有、更新したい人。 データサイエンティスト、オープンデータのハッカー、研究者、開発者。 私たちの思いも寄らない素晴らしいユースケースをお持ちであれば、私たちはそのフィードバックを真摯に受け入れます。 [Gitter Chat](https://gitter.im/datproject/discussions) まで、何でもお問い合わせください!

## Dat と Dat デスクトップの今後の予定は何ですか?

ユーザーアカウントとメタデータの公開です。 私たちは [datproject.org](https://datproject.org/) にデプロイする Dat レジストリのウェブアプリ開発に取り組んでいます。これはメタデータディレクトリになり、データをオンライン上のどこにでも置くことができます (全データが集中ホストされる NPM や GitHubとは対照的に、ソースコードが十分小さいため 1 つのシステムにすべてを収めることができます)。 多くのデータセットは巨大なので、(BitTorrent トラッカーの仕組みと同様に) フェデレーションレジストリが必要です 。 データ共有プロセスを円滑にするため、Dat デスクトップのレジストリを使用してデータセットを簡単に検索または公開できるようにしたいと考えています。

もう 1 つの機能はマルチライター/共同フォルダーです。 We have big plans to do collaborative workflows, maybe with branches, similar to git, except designed around dataset collaboration. But we're still working on overall stability and standardizing our protocols right now!

## Why did you choose to build Dat Desktop on Electron?

Dat is built using Node.js, so it was a natural fit for our integration. Beyond this, our users use a variety of machines since scientists, researchers and government officials may be forced to use certain setups for their institutions -- this means we need to be able to target Windows and Linux as well as Mac. Dat Desktop gives us that quite easily.

## What are some challenges you've faced while building Dat and Dat Desktop?

Figuring out what people want. We started with tabular datasets, but we realized that it was a bit of a complicated problem to solve and that most people don't use databases. So half way through the project, we redesigned everything from scratch to use a filesystem and haven't looked back.

We also ran into some general Electron infrastructure problems, including:

- Telemetry - how to capture anonymous usage statistics
- Updates - It's kind of piecemeal and magic to set up automatic updates
- Releases - XCode signing, building releases on Travis, doing beta builds, all were challenges.

We also use Browserify and some cool Browserify Transforms on the 'front end' code in Dat Desktop (which is kind of weird because we still bundle even though we have native `require` -- but it's because we want the Transforms). To better help manage our CSS we switched from Sass to using [sheetify](https://github.com/stackcss/sheetify). It's greatly helped us modularize our CSS and made it easier to move our UI to a component oriented architecture with shared dependencies. For example [dat-colors](https://github.com/Kriesse/dat-colors) contains all of our colors and is shared between all our projects.

We've always been a big fan of standards and minimal abstractions. Our whole interface is built using regular DOM nodes with just a few helper libraries. We've started to move some of these components into [base-elements](https://base.choo.io), a library of low-level reusable components. As with most of our technology we keep iterating on it until we get it right, but as a team we have a feeling we're heading in the right direction here.

## Electron はどういった領域で改善されるべきでしょうか?

We think the biggest pain point is native modules. Having to rebuild your modules for Electron with npm adds complexity to the workflow. Our team developed a module called [`prebuild`](http://npmjs.org/prebuild) which handles pre-built binaries, which worked well for Node, but Electron workflows still required a custom step after installing, usually `npm run rebuild`. It was annoying. To address this we recently switched to a strategy where we bundle all compiled binary versions of all platforms inside the npm tarball. This means tarballs get larger (though this can be optimized with `.so` files - shared libraries), this approach avoids having to run post-install scripts and also avoids the `npm run rebuild` pattern completely. It means `npm install` does the right thing for Electron the first time.

## What are your favorite things about Electron?

The APIs seem fairly well thought out, it's relatively stable, and it does a pretty good job at keeping up to date with upstream Node releases, not much else we can ask for!

## 他の開発者に役立つ Electron のノウハウはありますか?

If you use native modules, give [prebuild](https://www.npmjs.com/package/prebuild) a shot!

## What's the best way to follow Dat developments?

Follow [@dat_project](https://twitter.com/dat_project) on Twitter, or subscribe to our [email newsletter](https://tinyletter.com/datdata).

