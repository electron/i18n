---
title: Chromium FileReader の脆弱性の修正
author: marshallofsound
date: '2019-03-07'
---

Chrome に高レベルの重大な脆弱性が発見されました。Electron を含む Chromium ベースのすべてのソフトウェアに影響します。

この脆弱性は `CVE-2019-5786` と命名されています。  詳細は [Chrome ブログ記事](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html) を参照してください。

Chrome でこの脆弱性が悪用されているという報告があります。なるべく早く Electron を更新することを強く推奨します。

---

## 影響範囲

これはサードパーティや信頼できない JavaScript を実行する恐れのある Electron アプリケーションに影響します。

## 緩和策

影響を受けるアプリは、パッチを当てたバージョンの Electron にアップグレードする必要があります。

以下の通り、この脆弱性に対する修正を含む新しいバージョンの Electron を公開しました。
  * [4.0.8](https://github.com/electron/electron/releases/tag/v4.0.8)
  * [3.1.6](https://github.com/electron/electron/releases/tag/v3.1.6)
  * [3.0.16](https://github.com/electron/electron/releases/tag/v3.0.16)
  * [2.0.18](https://github.com/electron/electron/releases/tag/v2.0.18)

Electron 5 の最新ベータ版は Chromium 73 を追っていたので、パッチは適用済みです。
  * [5.0.0-beta.5](https://github.com/electron/electron/releases/tag/v5.0.0-beta.5)

## 詳細情報

この脆弱性は Google の Threat Analysis Group の Clement Lecigne によって発見され、Chrome チームに報告されました。  その Chrome ブログ記事は [こちら](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html) です。

Electron アプリを堅牢に保つベストプラクティスの詳細は、[セキュリティチュートリアル](https://electronjs.org/docs/tutorial/security) を参照してください。

Electron の脆弱性を報告する場合は、security@electronjs.org にメールでご連絡お願いします。
