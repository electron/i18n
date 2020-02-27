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

新しい Chromium と V8 の機能と修正プログラムに以前よりも早くアクセスできるようになります。 Importantly, you'll also know _when_ those new changes are coming, so you'll be able to plan with better information than before.

The Electron team will [continue to support](https://electronjs.org/docs/tutorial/support#supported-versions) the latest three major versions. For example, when [v6.0.0 goes stable on July 30, 2019](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule), we will support v6.x, v5.x, and v4.x, while v3.x will reach End-Of-Life.

## 💬 App のフィードバックプログラム

Please consider joining our [App Feedback Program](https://electronjs.org/blog/app-feedback-program) to help us with testing our beta releases and stabilization. Projects who participate in this program test Electron betas on their apps; and in return, the new bugs they find are prioritized for the stable release.

## 📝 A brief history of Electron releases

The decisions around stable releases before v3.0.0 did not follow a schedule. We added internal schedules to the project with v3.0.0 and v4.0.0. Earlier this year, we decided to publicize our stable release date for the first time for [Electron v5.0.0](https://electronjs.org/blog/electron-5-0-timeline). Announcing our stable release dates was positively received overall and we're excited to continue doing that for future releases.

In order to better streamline these upgrade-related efforts, our [Upgrades](https://github.com/electron/governance/tree/master/wg-upgrades) and [Releases](https://github.com/electron/governance/tree/master/wg-releases) Working Groups were created within our [Governance](https://electronjs.org/blog/governance) system. They have allowed us to better prioritize and delegate this work, which we hope will become more apparent with each subsequent release.

Here is where our new cadence will put us in comparison to Chromium's cadence:
<img alt="line graph comparing Electron versus Chromium versions" src="https://user-images.githubusercontent.com/2138661/57543187-86340700-7308-11e9-9745-a9371bb29275.png" />

📨 If you have questions, please mail us at [info@electronjs.org](mailto:info@electronjs.org).
