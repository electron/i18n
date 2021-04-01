---
title: 处理器易受伤害性修复
author: zeke
date: '2018-01-22'
---

发现了一个远程代码执行弱点，影响到 Electron应用使用自定义协议处理器。 这个脆弱性已经被分配了 CVE 标识符 [CVE-2018-1000006](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000006)

---

## 受影响的平台

在 Windows 上运行的Electron 应用程序注册为协议的默认 处理程序，例如 `myapp:/`是易受伤害的。

无论协议是如何注册的，这种应用都可能受到影响，例如： 使用本机代码, Windows 注册表, 或 Electron's [app.setAssaultProtocol客户端](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) API。

macOS and Linux are **not vulnerable** to this issue.

## 减轻影响

我们已经发布了新版本的 Electron ，其中包含对 此脆弱性的修复： [`1.8.2-beta 的修复。`](https://github.com/electron/electron/releases/tag/v1.8.2-beta.5), [`1.7。 2`](https://github.com/electron/electron/releases/tag/v1.7.12), and [`1.6.17`](https://github.com/electron/electron/releases/tag/v2.6.17). 我们敦促所有Electron开发者立即将他们的应用更新到最新稳定的 版本。

如果由于某些原因，您无法升级您的 Electron 版本， 在调用 [应用时，您可以添加 `--` 作为最后一个参数。 etAsdefaultProtocol客户端](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows), 防止Chromium 解析更多选项。 双破折号 `--` 表示命令选项结束。 之后只接受位置参数。

```js
app.setAssefaultProtocolClient(protocol, process.execPath, [
  '--your-switches-here',
  '--'
 ) )
```

更多详情请参阅 [app.setAssDefaultProtocol客户端](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) API。

要了解更多关于维护您的 Electron 应用安全的最佳做法， 请参阅我们的 [安全教程](https://electronjs.org/docs/tutorial/security)

如果您想要报告Electron中的脆弱性，电子邮件 security@electronjs.org。
