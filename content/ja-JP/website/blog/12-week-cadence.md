---
title: 新しい Electron リリースケイデンス
author: sofianguy
date: '2019-05-13'
---

🎉 Electron は 12 週ごとに新しいメジャー安定バージョンをリリースします! 🎉

---

## ⚡️ なんて速さだ! でもなんで?

簡単に言えば、Chromium は更新を止めないので Electron も遅くなりません。

Chromium は、一貫した 6 週間の [スケジュール](https://www.chromium.org/developers/calendar) でリリースされます。 Electron で Chromium の最新バージョンを提供するには、そのスケジュールを追う必要があります。 Chromium のリリースサイクルに関する詳細は [こちら](https://chromium.googlesource.com/chromium/src/+/master/docs/process/release_cycle.md) を参照してください。

## 🚀 なんで 12 週ごとに?

6 週ごとに、新しい機能、バグ修正/セキュリティ修正、V8 の改善が施された新しい Chromium リリースが出ます。 Electron ユーザーはこの変更を明確に待ち望んでおり、他の Chromium 安定リリースごとに安定リリース日を合わせていました。 最初に、Electron v6.0.0 には M76 が含まれます。これは、[Chromium M76](https://www.chromestatus.com/features/schedule) と同じリリース日である [2019 年 7 月 30 日](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule) で安定版リリースを予定しています。

## 🚧 私と自作 Electron アプリはどうなりますか?

新しい Chromium と V8 の機能と修正プログラムに以前よりも早くアクセスできるようになります。 重要なのは、これら新しい変更がいつ _いつ_ 行われるかもわかるため、以前よりも良質な情報で計画できるということです。

Electron チームは、新しい順に 3 つのメジャーバージョンを [継続サポート](https://electronjs.org/docs/tutorial/support#supported-versions) します。 例えば、[v6.0.0 が 2019 年 7 月 30 日に安定版になった](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule) 場合、v6.x、v5.x、v4.x はサポートします。v3.x はサポート終了になります。

## 💬 App のフィードバックプログラム

[アプリフィードバックプログラム](https://electronjs.org/blog/app-feedback-program) に参加して、ベータリリースと安定化のテストに役立ててください。 このプログラムに参加するプロジェクトは、そのアプリで Electron ベータ版をテストします。見返りとして、発見した新しいバグは安定版リリースのために優先します。

## 📝 Electronリリースの略歴

v3.0.0 より前の安定版リリースに関する決定は、スケジュールに従っていませんでした。 v3.0.0 と v4.0.0 において、プロジェクトに内部スケジュールを追加しました。今年の初めに [Electron v5.0.0](https://electronjs.org/blog/electron-5-0-timeline) の安定版リリース日を初めて公開することにしました。 安定版リリース日の発表は全体として好意的に受け止められており、今後のリリースでも継続リリースできることを楽しみにしています。

これらのアップグレード関連の作業を効率化するために、 [ガバナンス](https://electronjs.org/blog/governance) システム内に [アップグレード](https://github.com/electron/governance/tree/master/wg-upgrades) と [リリース](https://github.com/electron/governance/tree/master/wg-releases) の作業グループが作成されました。 これらにより、作業をより優先順位付けて委任できます。これは後のリリースごとに効果が出てくるでしょう。

Chromium のケイデンスと比較すると、我々の新たなケイデンスは以下のように位置します。
<img alt="Electron と Chromium のバージョンを比較する折れ線グラフ" src="https://user-images.githubusercontent.com/2138661/57543187-86340700-7308-11e9-9745-a9371bb29275.png" />

📨 ご質問は、[info@electronjs.org](mailto:info@electronjs.org) までメールでお問い合わせください。
