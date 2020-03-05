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

If you're contributing to Electron itself, the process of checking out and building Electron from `master` or 4.0.0 is very different than it was in 3.0.0 and earlier. See the [GN build instructions](https://github.com/electron/electron/blob/master/docs/development/build-instructions-gn.md) for details.

If you're developing an app with Electron, there are a few minor changes you might notice in the new Electron 4.0.0-nightly; but more than likely, Electron's change in build system will be totally transparent to you.

# What this means for Electron

GN is [faster](https://chromium.googlesource.com/chromium/src/tools/gn/+/48062805e19b4697c5fbd926dc649c78b6aaa138/README.md) than GYP and its files are more readable and maintainable. Moreover, we hope that using a single build configuration system will reduce the work required to upgrade Electron to new versions of Chromium.

 * It's already helped development on Electron 4.0.0 substantially because Chromium 67 removed support for MSVC and switched to building with Clang on Windows. With the GN build, we inherit all the compiler commands from Chromium directly, so we got the Clang build on Windows for free!

 * It's also made it easier for Electron to use [BoringSSL](https://boringssl.googlesource.com/boringssl/) in a unified build across Electron, Chromium, and Node -- something that was [problematic before](https://electronjs.org/blog/electron-internals-using-node-as-a-library#shared-library-or-static-library).
