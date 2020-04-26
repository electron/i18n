---
title: Electron が新しくなりました
author: jlord
date: '2015-10-15'
---

近日中、Electron に面白いアップデートと講演がいくつかあります。ここではそのまとめを紹介します。

---

## 資料

Electron は `v0.32.0` で Chrome 45 に更新します。 その他アップデートもあります...

### ドキュメントの改善

![新しくなったドキュメント](https://cloud.githubusercontent.com/assets/1305617/10520600/d9dc0ae8-731f-11e5-9bd7-c1651639eb2a.png)

見た目と読みやすさを向上するために、ドキュメントを再構成し標準化しました。 日本語や韓国語など、コミュニティが寄稿したドキュメントの翻訳もあります。

関連するプルリクエストは次の通りです。 [electron/electron#2028](https://github.com/electron/electron/pull/2028)、 [electron/electron#2533](https://github.com/electron/electron/pull/2533)、 [electron/electron#2557](https://github.com/electron/electron/pull/2557)、 [electron/electron#2709](https://github.com/electron/electron/pull/2709)、 [electron/electron#2725](https://github.com/electron/electron/pull/2725)、 [electron/electron#2698](https://github.com/electron/electron/pull/2698)、 [electron/electron#2649](https://github.com/electron/electron/pull/2649)。

### Node.js 4.1.0

`v0.33.0` から Electron は Node.js 4.1.0 を同梱します。

関連するプルリクエストは [electron/electron#2817](https://github.com/electron/electron/pull/2817) です。

### node-pre-gyp

`node-pre-gyp` 依存のモジュールは、ソースからビルドするときに Electron に対してコンパイルできるようになりました。

関連するプルリクエストは [mapbox/node-pre-gyp#175](https://github.com/mapbox/node-pre-gyp/pull/175) です。

### ARM サポート

Electron は ARMv7 の Linux 向けビルドを提供するようになります。 Chromebook や Raspberry Pi 2 といった人気プラットフォームで動きます。

関連する Issue は次の通りです。 [atom/libchromiumcontent#138](https://github.com/atom/libchromiumcontent/pull/138)、 [electron/electron#2094](https://github.com/electron/electron/pull/2094)、 [electron/electron#366](https://github.com/electron/electron/issues/366)。

### Yosemite 式フレームレスウインドウ

![フレームレスウィンドウ](https://cloud.githubusercontent.com/assets/184253/9849445/7397d308-5aeb-11e5-896f-08ac7693c8c0.png)

[@jaanus](https://github.com/jaanus) によるパッチがマージされました。OS X Yosemite 以降は、他の組み込み OS X アプリと同様に、システム信号機ボタンが統合されたフレームレスウィンドウを作成できます。

関連するプルリクエストは [electron/electron#2776](https://github.com/electron/electron/pull/2776) です。

### Google Summer of Code 印刷サポート

Google Summer of Code 開催後、[@hokein](https://github.com/hokein) によるパッチをマージして、印刷サポートを改善し、ページを PDF ファイルに印刷する機能を追加しました。

関連する Issue は次の通りです。 [electron/electron#2677](https://github.com/electron/electron/pull/2677)、 [electron/electron#1935](https://github.com/electron/electron/pull/1935)、 [electron/electron#1532](https://github.com/electron/electron/pull/1532)、 [electron/electron#805](https://github.com/electron/electron/issues/805)、 [electron/electron#1669](https://github.com/electron/electron/pull/1669)、 [electron/electron#1835](https://github.com/electron/electron/pull/1835)。

## Atom

Atom は Chrome 44 を動かしている Electron `v0.30.6` にアップグレードされました。 `v0.33.0` へのアップグレードは [atom/atom#8779](https://github.com/atom/atom/pull/8779) で進行中です。

## 講演

GitHubber の [Amy Palamountain](https://github.com/ammeep) は、[Nordic.js](https://nordicjs2015.confetti.events) の講演で Electron について素晴らしい紹介をしました。 彼女は [electron-accelerator](https://github.com/ammeep/electron-accelerator) ライブラリも作成しています。

#### Amy Palomountain による Electron でのネイティブアプリケーション構築

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/OHOPSvTltPI" frameborder="0" allowfullscreen></iframe></div>

同じく Atom チームの [Ben Ogle](https://github.com/benogle) は、[YAPC Asia](http://yapcasia.org/2015/) で Electron の講演を行いました。

#### Ben Ogle によるウェブ技術を使用したデスクトップアプリ構築

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/WChjh5zaUdw" frameborder="0" allowfullscreen></iframe></div>

Atom チームのメンバー [Kevin Sawicki](https://github.com/kevinsawicki) などが最近 [Bay Are Electron User Group](http://www.meetup.com/Bay-Area-Electron-User-Group/) 交流会で Electron について講演しました。 こちらに [映像](http://www.wagonhq.com/blog/electron-meetup) が二つ投稿されています。

#### Kevin Sawicki による Electron 史

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/tP8Yp1boQ9c" frameborder="0" allowfullscreen></iframe></div>

#### Ben Gotow によるネイティブ風ウェブアプリ制作

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/JIRXVGVPzn8" frameborder="0" allowfullscreen></iframe></div>

