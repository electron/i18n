---
title: Apple Silicon サポート
author: MarshallOfSound
date: '2020-10-15'
---

Apple Silicon ハードウェアが下半期にリリース予定です。 新ハードウェアで Electron アプリを動作させるにはどうすればよいでしょうか?

---

Electron 11.0.0-beta.1 のリリースに伴い、Electron チームでは Apple が下半期に出荷予定の新 Apple Silicon ハードウェア上で動作する Electron ビルドを頒布しています。 `npm install electron@beta` で最新のベータ版を入手するか、 [releases website](https://electronjs.org/releases/stable) から直接ダウンロードできます。

## どのように動作しますか？

Electron 11 では、Intel Mac と Apple Silicon Mac で別々のバージョンの Electron がリリースされます。 これに先立ち、既に `darwin-x64` と `mas-x64` の 2 つのアーティファクトがリリースされました。 後者には Mac App Store との互換性があります。 上記のアーティファクトの Apple Silicon に相当する、`darwin-arm64` と `mas-arm64` の 2 つのアーティファクトもリリースしています。

## 必要事項は何ですか?

x64 (Intel Mac) 用 と arm64 (Apple Silicon) 用、2 つのバージョンのアプリを頒布する必要があります。 [`electron-packager`](https://github.com/electron/electron-packager/)と[`electron-rebuild`](https://github.com/electron/electron-rebuild/)と [`electron-forge`](https://github.com/electron-userland/electron-forge/) はすでにこの `arm64` アーキテクチャターゲットをサポートしていす。 これらのパッケージの最新バージョンを実行している限り、 ターゲットアーキテクチャを `arm64`に更新すると、アプリが完璧に動作するはずです。

将来的には、 `arm64` と`x64` アプリを単一のユニバーサルバイナリにマージできるパッケージをリリースしますが、このバイナリは_巨大になるため_、おそらくユーザーへのリリースには適していません。

## 潜在的な問題

### ネイティブモジュール

新しいアーキテクチャをターゲットにしているので、ビルドの問題を引き起こす可能性のあるいくつかの依存関係を更新する必要があります。 各依存関係の最小バージョンは、以下をご参照ください。

| 依存関係                | バージョン要件       |
| ------------------- | ------------- |
| Xcode               | `>=12.2.0` |
| `node-gyp`          | `>=7.1.0`  |
| `electron-rebuild`  | `>=1.12.0` |
| `electron-packager` | `>=15.1.0` |

これらの依存関係のバージョン要件のために、特定のネイティブモジュールを修正/更新しなければならない場合があるでしょう。  注意として、Xcode のアップグレードによって新しいバージョンの macOS SDK が導入されるため、ネイティブモジュールのビルドに失敗する可能性があります。


## どうすればテストできますか?

現在、Apple Silicon アプリケーションは、このブログ記事の執筆時点で市販されていない Apple Silicon ハードウェアでのみ動作します。 [開発者移行キット](https://developer.apple.com/programs/universal/) をお持ちの場合、そのマシン上でアプリケーションをテストできます。 さもなくば、アプリケーションの動作テストには、製品版の Apple Silicon ハードウェアのリリースを待つ必要があります。

## Rosetta 2 についてはどうなるのでしょうか?

Rosetta 2 は、Apple の [Rosetta](https://en.wikipedia.org/wiki/Rosetta_(software)) 技術の最新の成果で、同社の新しい arm64 Apple Silicon ハードウェア上でも x64 Intel アプリケーションを実行できます。 x64 Electron アプリは Rosetta 2 で動作すると推測していますが、注意すべき重要な点が (ネイティブ arm64 バイナリを頒布すべきかどうかについても) いくつかあります。

* アプリのパフォーマンスは大幅に低下します。 Electron / V8 は JavaScript を [JIT](https://en.wikipedia.org/wiki/Just-in-time_compilation) コンパイルしており、Rosetta が動作方式によっては、事実上 JIT を 2 回 (V8 で 1 回、Rosetta で 1 回) 実行します。
* メモリのページサイズ増大など、Apple Sillicon の新技術の恩恵を受けられなくなります。
* パフォーマンスが **大幅に** 低下するって言いましたよね?
