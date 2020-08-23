---
title: 'Electron Internals: Building Chromium as a Library'
author: zcbenz
date: '2017-03-03'
---

Electron は、Google のオープンソースプロジェクト Chromium をベースにしています。このプロジェクトは、他のプロジェクトで使用することを想定していません。 この記事では、Electron のライブラリとしての Chromium がどのように構築されているのか、またビルドシステムがどのように進化してきたのかを紹介します。

---

## CEF の利用

Chromium Embedded Framework (CEF) は、Chromium をライブラリ化し、Chromium のコードベースに基づいて安定した API を提供するプロジェクトです。 黎明期の Atom エディタや NW.js では CEF を使用していました。

安定した API を維持するために、CEF は Chromium の詳細をすべて隠蔽し、独自のインターフェースで Chromium の API をラップします。 そのため、Node.js をウェブページに統合するような、内部の Chromium API にアクセスする必要があったとき、CEF の利点が障害になりました。

そのため、結局 Electron も NW.js も Chromium の API を直接使うように切り替えました。

## Chromium を部品としてビルドする

Chromium は公式には外部プロジェクトをサポートしていませんが、コードベースはモジュール化されており、Chromium をベースに小さなブラウザを簡単に構築できます。 ブラウザインターフェイスを提供するコアモジュールは、コンテンツモジュールと呼ばれています。

コンテンツモジュールでプロジェクトを開発する際は、Chromium をプロジェクトの部品としてビルドするのが一番簡単です。 このためには、まず Chromium のソースコードをチェックアウトしてから、プロジェクトを Chromium の `DEPS` ファイルに追加します。

NW.js や Electron の非常に初期のバージョンでは、このようなビルド方法を使用しています。

この欠点は、Chromium がとても大きいコードベースであるため、相応に強力な マシンでビルドする必要があるということです。 一般的なラップトップであれば、5 時間以上かかります。 そのため、貢献できる開発者の数に多大な影響を与え、開発も遅くなりかねません。

## 単一の共有ライブラリとして Chromium をビルドする

コンテンツモジュールのユーザからすれば、ほとんどの場合で Electron が Chromium のコードを修正する必要はないので、Electron のビルドを改善する明白な方法は Chromium を共有ライブラリとしてビルドして Electron 内でそれをリンクすることです。 これにより、開発者は Electron に貢献する際に Chromium すべてをビルドする必要がなくなります。

[libchromiumcontent](https://github.com/electron/libchromiumcontent) プロジェクトは [@aroben](https://github.com/aroben) によってこのために作成されました。 これは、Chromium のコンテンツモジュールを共有ライブラリとしてビルドし、Chromium のヘッダとビルド済みバイナリをダウンロードできるようにします。 libchromiumcontent の初期バージョンのコードは [こちらのリンクに](https://github.com/electron/libchromiumcontent/tree/873daa8c57efa053d48aa378ac296b0a1206822c) あります。

libchromiumcontent の一部として [brightray](https://github.com/electron/brightray) プロジェクトも生まれました。これはコンテンツモジュールの周りに薄い層を提供します。

libchromiumcontent と brightray を併用することで、開発者は Chromium のビルドの詳細に踏み込まずに素早くブラウザをビルドできます。 そして、プロジェクトをビルドするための高速なネットワークと強力なマシンが必要なくなります。

Electron 以外に、[Breach ブラウザ](https://www.quora.com/Is-Breach-Browser-still-in-development) のように、この方法でビルドされた Chromium をベースにしたプロジェクトもあります。

## エクスポートしたシンボルのフィルタリング

Windows では、単一の共有ライブラリでエクスポートできるシンボル数に制限があります。 Chromium のコードベースが大きくなるにつれ、libchromiumcontent がエクスポートするシンボル数はすぐに制限を超えてしまいました。

これは、DLL ファイル生成時に不要なシンボルをフィルタリングすることで解決しました。 [リンカに `.def` ファイルを提供し](https://github.com/electron/libchromiumcontent/pull/11/commits/85ca0f60208eef2c5013a29bb4cf3d21feb5030b)、[名前空間の中にあるシンボルをエクスポートするかどうか判断する](https://github.com/electron/libchromiumcontent/pull/47/commits/d2fed090e47392254f2981a56fe4208938e538cd) スクリプトを使うようにしました。

このアプローチを取ることで、Chromium がエクスポートされたシンボルを新しく追加し続けても、libchromiumcontent はより多くシンボルを削除することで共有ライブラリファイルを生成できるようになりました。

## コンポーネントビルド

libchromiumcontent の次の段階の話をする前に、まずは Chromium におけるコンポーネントビルドの概念を紹介しておきます。

巨大プロジェクトであるため、Chromium ではビルド時のリンクの段階で非常に長い時間がかかってしまいます。 大抵、開発者がちょっとした変更を加えると、最終的な出力が得られるまで 10 分ほどかかります。 これを解決するため、Chromium ではコンポーネントビルドを導入しました。Chromium 内の各モジュールを分離された共有ライブラリとしてビルドすることで、最終的なリンク作業に費やす時間が気にならないようにしました。

## 生バイナリの頒布

Chromium が成長を続ける中で、Chromium のエクスポートされたシンボルがあまりにも多くなり、コンテンツモジュールや Webkit のシンボルですらも制限を超えるようになりました。 シンボルを削減するだけでは、使用可能な共有ライブラリを生成できなくなったのです。

最終的に、単一の共有ライブラリを生成する代わりに [Chromium の生バイナリを頒布](https://github.com/electron/libchromiumcontent/pull/98) しなければなりませんでした。

先ほど紹介したように、Chromium には 2 つのビルドモードがあります。 生のバイナリを頒布した結果、libchromiumcontent ではバイナリに対して 2 種類のディストリビューションを頒布しなければならなくなりました。 1 つは `static_library` ビルドと呼ばれるもので、Chromium の通常ビルドで生成された各モジュールすべての静的ライブラリをインクルードします。 もう 1 つは `shared_library` で、コンポーネントビルドで生成された各モジュールの共有ライブラリすべてをインクルードします。

Electron では、デバッグ版を libchromiumcontent の `shared_library` 版とリンクしています。これは、ダウンロードが少なく、最終的な実行ファイルをリンクする際に時間がかからないためです。 また、リリース版の Electron は libchromiumcontent の `static_library` 版とリンクしています。コンパイラはデバッグに重要なシンボルを完全に生成でき、リンカはどのオブジェクトファイルが必要かそうでないかを知っているため、より良い最適化を行えます。

そのため、通常の開発において開発者はデバッグ版をビルドするだけでよく、良好なネットワークや強力なマシンは不要です。 リリース版では、ビルドにより良いハードウェアを必要としますが、より最適化されたバイナリを生成できます。

## `gn` の更新

世界的に見ても最大級のプロジェクトであるため、通常のビルドシステムはほとんど Chromium のビルドには適していません。Chromium チームは独自のビルドツールを開発しています。

Earlier versions of Chromium were using `gyp` as a build system, but it suffers from being slow, and its configuration file becomes hard to understand for complex projects. After years of development, Chromium switched to `gn` as a build system, which is much faster and has a clear architecture.

One of the improvements of `gn` is to introduce `source_set`, which represents a group of object files. In `gyp`, each module was represented by either `static_library` or `shared_library`, and for the normal build of Chromium, each module generated a static library and they were linked together in the final executable. By using `gn`, each module now only generates a bunch of object files, and the final executable just links all the object files together, so the intermediate static library files are no longer generated.

This improvement however made great trouble to libchromiumcontent, because the intermediate static library files were actually needed by libchromiumcontent.

The first try to solve this was to [patch `gn` to generate static library files](https://github.com/electron/libchromiumcontent/pull/239), which solved the problem, but was far from a decent solution.

The second try was made by [@alespergl](https://github.com/alespergl) to [produce custom static libraries from the list of object files](https://github.com/electron/libchromiumcontent/pull/249). It used a trick to first run a dummy build to collect a list of generated object files, and then actually build the static libraries by feeding `gn` with the list. It only made minimal changes to Chromium's source code, and kept Electron's building architecture still.

## 概要

As you can see, compared to building Electron as part of Chromium, building Chromium as a library takes greater efforts and requires continuous maintenance. However the latter removes the requirement of powerful hardware to build Electron, thus enabling a much larger range of developers to build and contribute to Electron. The effort is totally worth it.

