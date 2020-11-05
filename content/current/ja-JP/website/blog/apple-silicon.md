---
title: Apple Silicon サポート
author: MarshallOfSound
date: '2020-10-15'
---

Apple Silicon ハードウェアが今年後半にリリースされています。 新しいハードウェアで Electron アプリを動作させるためにはどのように方策がありますか?

---

Electron 11.0.0ベータ版のリリースで、現在、ElectronチームはAppleが今年後半に出荷する予定の新しいApple Silicon ハードウェア上で動作するElectronのビルドをはじめています。 `npm install electron@beta` で最新のベータ版を入手するか、 [releases website](https://electronjs.org/releases/stable) から直接ダウンロードできます。

## どのように動作しますか？

Electron 11 では、Intel Mac および Apple Silicon Mac 向けに別バージョンの Electron がリリースされます。 これに先立ち、既に `darwin-x64` と `mas-x64`の2つのアーティファクトがリリースされました。 後者はMac App Storeの互換性を使用しています。 上記のアーティファクトの Apple Silicon に相当する、 `darwin-arm64` と `mas-arm64`の2つのアーティファクトをリリースしています。

## 何をする必要がありますか?

アプリのバージョンを2つ出荷する必要があります。x64用(Intel Mac用) とarm64用(Apple Silicon用) です。 [`electron-packager`](https://github.com/electron/electron-packager/)と[`electron-rebuild`](https://github.com/electron/electron-rebuild/)と [`electron-forge`](https://github.com/electron-userland/electron-forge/) はすでにこの `arm64` アーキテクチャターゲットをサポートしていす。 これらのパッケージの最新バージョンを実行している限り、 ターゲットアーキテクチャを `arm64`に更新すると、アプリが完璧に動作するはずです。

将来的には、 `arm64` と`x64` アプリを単一のユニバーサルバイナリにマージできるパッケージをリリースしますが、このバイナリは_巨大になるため_、おそらくユーザーへのリリースには適していません。

## 潜在的な問題

### ネイティブモジュール

新しいアーキテクチャをターゲットにしているので、ビルドの問題を引き起こす可能性のあるいくつかの依存関係を更新する必要があります。 特定の依存関係の最小バージョンは、参照のために以下に含まれています。

| 依存関係                | バージョン要件       |
| ------------------- | ------------- |
| Xcode               | `>=12.2.0` |
| `node-gyp`          | `>=7.1.0`  |
| `electron-rebuild`  | `>=1.12.0` |
| `electron-packager` | `>=15.1.0` |

これらの依存性バージョン要件の結果、特定のネイティブモジュールを修正/更新する必要があります。  注意点の一つは、Xcode のアップグレードは、macOS SDK の新しいバージョンを導入することです。 ネイティブモジュールのビルドに失敗する可能性があります。


## どうすればテストできますか?

現在、Apple Silicon アプリケーションは、このブログ記事の執筆時点で市販されていない Apple Silicon ハードウェアでのみ動作します。 [開発者トランジションキット](https://developer.apple.com/programs/universal/)をお持ちの場合は、その上でアプリケーションをテストできます。 そうでなければ、アプリケーションが動作するかどうかをテストするために、本番の Apple Silicon ハードウェアのリリースを待つ必要があります。

## ロゼッタ2についてはどうですか?

ロゼッタ2はAppleの [ロゼッタ](https://en.wikipedia.org/wiki/Rosetta_(software)) テクノロジーの最新反復です これにより、新しい arm64 の Apple Silicon ハードウェア上で x64 Intel アプリケーションを実行できます。 ロゼッタ2以下では、x64アプリが動作すると考えていますが、 注意すべき重要なことがいくつかあります。(そしてこれがネイティブarm64バイナリをリリースする理由です。)

* アプリのパフォーマンスは大幅に低下します。 Electron / V8は、JavaScriptに [JIT](https://en.wikipedia.org/wiki/Just-in-time_compilation) コンパイルを使用します。これは、ロゼッタの動作に起因しています。 あなたは効果的にJITを2回(V8で1回、ロゼッタで1回)実行します。
* Apple Siliconでは、メモリページサイズの増加などの新しいテクノロジーの利点が失われます。
* パフォーマンスが著しく **** 劣化すると言及しましたか？
