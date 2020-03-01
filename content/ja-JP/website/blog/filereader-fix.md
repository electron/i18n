---
title: Chromium FileReader Vulnerability Fix
author: marshallofsound
date: '2019-03-07'
---

Chrome に高レベルの重大な脆弱性が発見されました。Electron を含む Chromium ベースのすべてのソフトウェアに影響します。

This vulnerability has been assigned `CVE-2019-5786`.  You can read more about it in the [Chrome Blog Post](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

Please note that Chrome has reports of this vulnerability being used in the wild so it is strongly recommended you upgrade Electron ASAP.

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

The latest beta of Electron 5 was tracking Chromium 73 and therefore is already patched:
  * [5.0.0-beta.5](https://github.com/electron/electron/releases/tag/v5.0.0-beta.5)

## 詳細情報

This vulnerability was discovered by Clement Lecigne of Google's Threat Analysis Group and reported to the Chrome team.  The Chrome blog post can be found [here](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

To learn more about best practices for keeping your Electron apps secure, see our [security tutorial](https://electronjs.org/docs/tutorial/security).

If you wish to report a vulnerability in Electron, email security@electronjs.org.
