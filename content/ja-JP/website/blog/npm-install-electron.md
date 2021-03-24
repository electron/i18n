---
title: npm install electron
author: zeke
date: '2016-08-16'
---

Electron バージョン 1.3.1 では、 `npm install electron --save-dev` とすればコンパイル済みの Electron をアプリにインストールできます。

---

![npm install electron](https://cloud.githubusercontent.com/assets/378023/17259327/3e3196be-55cb-11e6-8156-525e9c45e66e.png)

## ビルド済み Electron ライブラリ

Electron アプリの開発経験があれば、おそらく `electron-prebuilt` npm パッケージを触ったことがあるでしょう。 このパッケージはほぼすべての Electron プロジェクトにおいて不可欠なものです。 インストールされると、オペレーティングシステムを検出し、ビルド済みバイナリの中からそのシステムアーキテクチャに適したものをダウンロードします。

## 新しい名前

Electron のインストール過程は、新規開発者にとっての壁となりがちでした。 多くの勇敢な人々が、`npm install electron-prebuilt` ではなく `npm install electron` を実行して Electron アプリの開発を始めようとして散っていきました。(大抵は混乱してから) 探していた `electron` ではなかったと気づいたのです。

これは、 GitHub の Electron プロジェクトが作られる前から `electron` プロジェクトが npm に存在していたためです。 Electron での開発がより簡単で直感的になるよう、私たちは既存の `electron` の所有者に連絡を取り、名前を使わせてもらえないかを交渉しました。 幸いにも彼は私たちのプロジェクトに賛同し、名前の再利用に協力していただけることになりました。

## Prebuilt との営み

バージョン 1.3.1 では、[`electron`](https://www.npmjs.com/package/electron) と `electron-prebuilt` のパッケージを npm に同時公開するようになりました。 2 つのパッケージは同じです。 現在プロジェクトで `electron-prebuilt` を使用している数多の開発者のために、しばらくの間、両方の名前でパッケージを公開することを決めました。 新しい `electron` に依存するように `package.json` ファイルを更新することを推奨しますが、 2016 年末までは新しいバージョンの `electron-prebuilt` もリリースされます。

[electron-userland/electron-prebuilt](https://github.com/electron-userland/electron-prebuilt) は `electron` npm パッケージに対する正規のホームリポジトリとして残ります。

## 謝辞

[@mafintosh](https://github.com/mafintosh)、[@maxogden](https://github.com/maxogden)、その他多くの [コントリビュータ](https://github.com/electron-userland/electron-prebuilt/graphs/contributors) の方々による `electron-prebuilt` の作成と保守、JavaScript、Node.js、Electron コミュニティによる不断のサービス提供に感謝します。

そして npm で `electron` パッケージを引き取らせてくれた [@logicalparadox](https://github.com/logicalparadox) に感謝します。

## プロジェクトの更新

この変更に影響される人気のパッケージを更新するために、コミュニティと協力してきました。 [electron-packager](https://github.com/electron-userland/electron-packager) 、 [electron-rebuild](https://github.com/electron/electron-rebuild) 、 [electron-builder](https://github.com/electron-userland/electron-builder) のようなパッケージは、古い名前をサポートしつつ、既に新しい名前で動作するように更新されています。

新しいパッケージをインストールするときに何らかの問題が発生した場合、 [electron-userland/electron-prebuilt](https://github.com/electron-userland/electron-prebuilt/issues) リポジトリに Issue を開いてお知らせください。

Electron に関する他の問題については、 [electron/electron](https://github.com/electron/electron/issues) リポジトリを使用してください。

