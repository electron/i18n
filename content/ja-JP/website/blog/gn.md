---
title: "GN を使って Electron を構築する"
author: nornagon
date: '2018-09-05'
---

Electron は、GN を使用して自身を構築しています。 その理由についてこちらで説明します。

---

# GYP と GN

2013 年、最初に Electron がリリースされたとき、Chromium のビルド構成は [GYP](https://gyp.gsrc.io/) で記述されていました。これは "Generate Your Projects" の略です。

2014 年、Chromium プロジェクトは [GN](https://gn.googlesource.com/gn/) ("Generate [Ninja](https://ninja-build.org/)") を導入しました。Chromium のビルドファイルは GN に移行され、GYP はソースコードから削除されました。

歴史的に、Electron はメインの [Electron コード](https://github.com/electron/electron) と [libchromiumcontent](https://github.com/electron/libchromiumcontent) を分離しています。これは、Chromium の 'content' サブモジュールをラップする Electron の一部です。 Electron は GYP を使用し続けましたが、Chromium の方の libchromiumcontent は GN に切り替えました。

ピッタリ噛まない歯車のように、2 つのビルドシステムの間に摩擦がありました。 互換性の維持にはエラーが発生しやすくなりました。コンパイラフラグと `#define` を Chromium、Node、V8、Electron 間で細心の注意を払って同期する必要があるからです。

これに対処するため、Electron チームは全てを GN へ移行してきました。 そしてついに、Electron 最後の GYP コード削除の [コミット](https://github.com/electron/electron/pull/14097)が master に乗りました。

# 開発者にとっての意義

Electron 自体にコントリビュートしている方は、`master` もしくは 4.0.0 から Electron をチェックアウトしてビルドするプロセスが 3.0.0 以前と大きく変わります。 詳細は [GN ビルド手順](https://github.com/electron/electron/blob/master/docs/development/build-instructions-gn.md) を参照してください。

Electron でアプリを開発している方は、新しい Electron 4.0.0-nightly でのいくつかの小さな変更に気付くかもしれません。しかし、Electron ビルドシステムが変わったことによる影響はおそらくありません。

# Electron にとっての意義

GN は GYP より [高速](https://chromium.googlesource.com/chromium/src/tools/gn/+/48062805e19b4697c5fbd926dc649c78b6aaa138/README.md) で、ファイルの可読性が高く保守も容易です。 さらに、単体のビルド構成システムを使用することで、Electron を Chromium の新バージョンへアップグレードするにあたって必要な作業が軽減されるでしょう。

 * Chromium 67 では MSVC サポートを削除し、Windows でも Clang を使用したビルドに切り替えました。そのため、Electron 4.0.0 での開発は既に大幅に支援されています。 GN ビルドでは、Chromium からすべてのコンパイラコマンドを直接継承するため、Windows 用 Clang ビルドを無料で入手できます!

 * また、Electron、Chromium、Node 間で同じビルドの [BoringSSL](https://boringssl.googlesource.com/boringssl/) を Electron に使用しやすくなりました。これはもはや [過去の問題](https://electronjs.org/blog/electron-internals-using-node-as-a-library#shared-library-or-static-library) です。
