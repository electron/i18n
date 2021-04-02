---
title: 新的 Electron 发布时间
author: 索菲亚格文
date: '2019-05-13'
---

🎉 Electron 正在移动，每隔12周发布一个新的主要稳定版本！ 🎉

---

## :hig_voltage: Wow 那么快！ 但为什么？

简而言之，Chromium不会停止航运，因此Electron也不会减速。

Chromium 在前后一致的 6 周 [schedule](https://www.chromium.org/developers/calendar) 发布. 要在 Electron 中提供最新版本的 Chromium ，我们的时间表需要跟踪他们的数据。 有关Chromium发行周期的更多信息可以在这里找到 [](https://chromium.googlesource.com/chromium/src/+/master/docs/process/release_cycle.md)。

## :ro火箭：为什么每12周一次？

每隔6个星期，一个新的Chromium版本会带有新的功能，错误修复/安全修复，以及V8改进。 Electron用户已经响亮而清楚地表示希望及时进行这些更改。 所以我们已经调整了我们的稳定释放日期，以匹配每个其他的Chromium稳定释放。 先上 Electron v6.0 将包含 M76 并计划于 [7月30日稳定释放， 2019](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule), 与 [Chromium M76](https://www.chromestatus.com/features/schedule) 相同的发布日。

## 🚧 这对我和我的 Electron 应用程序意味着什么？

您将比以往更快地访问新的Chromium和V8功能和修复。 重要的是，您还可以知道这些新更改何时</em> _，因此您将能够以比以前更好的信息进行规划。</p>

电子团队将继续 [支持](https://electronjs.org/docs/tutorial/support#supported-versions) 最新的三个主要版本。 例如，当 [v6.0.0 于7月30日稳定下来，2019](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule)时，我们将支持v6.x、v5.x和v4.x，而v3.x将达到终身寿命。

## 💬 应用反馈项目

请考虑加入我们的 [App反馈程序](https://electronjs.org/blog/app-feedback-program) ，以帮助我们测试我们的 beta 版本的发布和稳定性。 参与此程序测试的项目 Electron 测试他们的应用; 反过来，他们发现的新的 bug 也是稳定释放的优先事项。

## 📝 Electron 版本的简短历史

关于在 v3.0.0 之前稳定释放的决定没有按照时间表进行。 我们添加了项目的内部时间表与 v3.0.0 和 v4.0.0。 今年早些时候，我们决定首次发布 [Electron v5.0.0](https://electronjs.org/blog/electron-5-0-timeline) 的稳定发布日期。 宣布我们稳定的发布日期总体上得到好评，我们很高兴为今后的发布继续这样做。

为了更好地简化这些与升级有关的努力， 我们的 [升级](https://github.com/electron/governance/tree/master/wg-upgrades) 和 [发布](https://github.com/electron/governance/tree/master/wg-releases) 工作组是在我们的 [治理](https://electronjs.org/blog/governance) 系统中创建的。 它们使我们能够更好地优先安排和授权这项工作，我们希望随着随后每次公布情况而变得更加明显。

与Chromium的干部相比，我们的新干部将在这里：
<img alt="线形图比较Electron 和 Chromium 版本" src="https://user-images.githubusercontent.com/2138661/57543187-86340700-7308-11e9-9745-a9371bb29275.png" />

📨如果您有问题，请 [info@electronjs.org](mailto:info@electronjs.org)邮寄给我们。
