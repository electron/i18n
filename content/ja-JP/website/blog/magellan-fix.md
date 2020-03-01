---
title: SQLite の脆弱性の修正
author: ckerr
date: '2018-12-18'
---

リモートコード実行の脆弱性 "[Magellan](https://blade.tencent.com/magellan/index_en.html)" が発見されました。SQLite、Chromium、全バージョンの Electron ベースのソフトウェアに影響します。

---

## 影響範囲

Web SQL を使用する Electron アプリケーションが影響を受けます。


## 緩和策

影響を受けるアプリは、Web SQL を使用停止するか、パッチを当てたバージョンの Electron にアップグレードする必要があります。

以下の通り、この脆弱性に対する修正を含む新しいバージョンの Electron を公開しました。
  * [4.0.0-beta.11](https://github.com/electron/electron/releases/tag/v4.0.0-beta.11)
  * [3.1.0-beta.4](https://github.com/electron/electron/releases/tag/v3.1.0-beta.4)
  * [3.0.13](https://github.com/electron/electron/releases/tag/v3.0.13)
  * [2.0.16](https://github.com/electron/electron/releases/tag/v2.0.16)

これに関する被害報告はありませんが、影響を受けるアプリケーションは緩和策を実施してください。

## 詳細情報

この脆弱性は Tencent Blade チームによって発見されました。彼らは [この脆弱性について論じたブログ記事](https://blade.tencent.com/magellan/index_en.html) を公開しています。

Electron アプリを堅牢に保つベストプラクティスの詳細は、[セキュリティチュートリアル](https://electronjs.org/docs/tutorial/security) を参照してください。

Electron の脆弱性を報告する場合は、security@electronjs.org にメールでご連絡お願いします。
