---
title: Electron のガバナンス
author:
  - ckerr
  - sofianguy
date: '2019-03-18'
---

Electron がデスクトップアプリケーションで人気を博すにつれて、取り組むチームも成長しました。さまざまな企業で働き、タイムゾーンに住み、関心を持つ専任メンテナーが増えています。 よりスムーズに成長し続けることができるように、我々にガバナンス機構を導入します。

---

## なぜ変革するのですか?

Electron プロジェクトの人々は、世界中のタイムゾーンに居るボランティア、専任メンテナー、Electron に依存しているいくつかの企業と調整しています。 これまで、形式的でない調整で上手くいっていました。しかし、チームが成長するにつれてこのやり方がスケールしないことがわかりました。 また、新規のコントリビューターをプロジェクト内に呼び戻しやすくしたいのです。

## ワーキンググループ

Electron ガバナンスは、プロジェクトのさまざまな部分を担当するワーキンググループを含みます。 我々は以下の 7 つのグループから始めることにします。
 * コミュニティ & 安全性: [行動規範](https://github.com/electron/governance/blob/master/CODE_OF_CONDUCT.md) の問題を執る。
 * ドキュメント & ツール: 外部向けツール ([Fiddle](https://electronjs.org/fiddle)、[Forge](https://electronforge.io/) など) の監督と Electron の [ドキュメント化](https://electronjs.org/docs) を行う。
 * 支援: Electron コミュニティの成長を支援する。
 * リリース: リリースが安定かつ予定通りであることを確認する。
 * セキュリティ: セキュリティテストを行い、セキュリティの問題に対応する。
 * アップグレード: 新しいバージョンの V8、Chromium、Node などの、上流のアップグレードを統合する。
 * ウェブサイト: [Electron のウェブサイト](https://electronjs.org/) を維持し改善する。

これらのグループは相互に調整し合いますが、グループは各々のの会議スケジュールと議題を保持し、生産的に活動してください。 これらのグループの詳細は [ガバナンスリポジトリ](https://github.com/electron/governance/blob/master/README.md) で見ることができます。

## Electron プロジェクトの方向性は変わりますか?

これは Electron の方向性に直接影響しません。 私たちの戦略が成功した場合、ワーキンググループは、新しいコントリビューターが関心のあるトピックを見つけやすくし、それぞれの日常業務と無関係の議論を他グループに移行することで、メンテナーの活動が楽になります。 こうなると、制限されない人々の間接的な働きかけがより影響するでしょう。

## 詳細はどこですか?

 * ガバナンス [レポジトリ](https://github.com/electron/governance/) と [チャーター](https://github.com/electron/governance/tree/master/charter) に、新しいガバナンス構造に関する情報があります。
 * 各ワーキンググループはそれぞれのページを保有しています。[コミュニティ](https://github.com/electron/governance/tree/master/wg-community-safety)、[ドキュメント & ツール](https://github.com/electron/governance/tree/master/wg-docs-tools)、[支援](https://github.com/electron/governance/tree/master/wg-outreach)、[リリース](https://github.com/electron/governance/tree/master/wg-releases)、[セキュリティ](https://github.com/electron/governance/tree/master/wg-security)、[アップグレード](https://github.com/electron/governance/tree/master/wg-upgrades)、[ウェブサイト](https://github.com/electron/governance/tree/master/wg-website) があります。
 * メンテナと連絡するには、[Issue を開く](https://github.com/electron/governance/issues) か、[info@electronjs.org](mailto:info@electronjs.org) までメールでお問い合わせください。
