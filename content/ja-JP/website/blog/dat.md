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

[CACivicData](http://www.californiacivicdata.org/) is an open-source archive serving up daily downloads from CAL-ACCESS, California's database tracking money in politics. They do [daily releases](http://calaccess.californiacivicdata.org/downloads/0), which means hosting a lot of duplicate data across their zip files. We're working on hosting their data as a Dat repository which will reduce the amount of hassle and bandwidth needed to refer to specific version or update to a newer version.

## Electron Updates

This one isn't concrete yet, but we think a fun use case would be putting a compiled Electron app in a Dat repository, then using a Dat client in Electron to pull the latest deltas of the built app binary, to save on download time but also to reduce bandwidth costs for the server.

## Who should be using Dat Desktop?

Anyone who wants to share and update data over a p2p network. Data scientists, open data hackers, researchers, developers. We're super receptive to feedback if anyone has a cool use case we haven't thought of yet. You can drop by our [Gitter Chat](https://gitter.im/datproject/discussions) and ask us anything!

## What's coming next in Dat and Dat Desktop?

User accounts and metadata publishing. We are working on a Dat registry web app to be deployed at [datproject.org](https://datproject.org/) which will basically be an 'NPM for datasets', except the caveat being we are just going to be a metadata directory and the data can live anywhere online (as opposed to NPM or GitHub where all the data is centrally hosted, because source code is small enough you can fit it all in one system). Since many datasets are huge, we need a federated registry (similar to how BitTorrent trackers work). We want to make it easy for people to find or publish datasets with the registry from Dat Desktop, to make the data sharing process frictionless.

Another feature is multi-writer/collaborative folders. We have big plans to do collaborative workflows, maybe with branches, similar to git, except designed around dataset collaboration. But we're still working on overall stability and standardizing our protocols right now!

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

