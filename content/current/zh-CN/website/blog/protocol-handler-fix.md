---
title: 处理器易受伤害性修复
author: zeke
date: '2018-01-22'
---

发现了一个远程代码执行弱点，影响到 Electron应用使用自定义协议处理器。 This vulnerability has been assigned the CVE identifier [CVE-2018-1000006][].

---

## 受影响的平台

在 Windows 上运行的Electron 应用程序注册为协议的默认 处理程序，例如 `myapp:/`是易受伤害的。

Such apps can be affected regardless of how the protocol is registered, e.g. using native code, the Windows registry, or Electron's [app.setAsDefaultProtocolClient][] API.

macOS and Linux are **not vulnerable** to this issue.

## 减轻影响

我们已经发布了新版本的 Electron ，其中包含对 此脆弱性的修复： [`1.8.2-beta 的修复。`](https://github.com/electron/electron/releases/tag/v1.8.2-beta.5), [`1.7。 2`](https://github.com/electron/electron/releases/tag/v1.7.12), and [`1.6.17`](https://github.com/electron/electron/releases/tag/v2.6.17). 我们敦促所有Electron开发者立即将他们的应用更新到最新稳定的 版本。

If for some reason you are unable to upgrade your Electron version, you can append `--` as the last argument when calling [app.setAsDefaultProtocolClient][], which prevents Chromium from parsing further options. 双破折号 `--` 表示命令选项结束。 之后只接受位置参数。

```js
app.setAssefaultProtocolClient(protocol, process.execPath, [
  '--your-switches-here',
  '--'
 ) )
```

See the [app.setAsDefaultProtocolClient][] API for more details.

To learn more about best practices for keeping your Electron apps secure, see our [security tutorial][].

如果您想要报告Electron中的脆弱性，电子邮件 security@electronjs.org。

[security tutorial]: https://electronjs.org/docs/tutorial/security
[app.setAsDefaultProtocolClient]: https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows
[CVE-2018-1000006]: https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000006
