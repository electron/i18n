---
title: 网络首选项脆弱性修复
author: ckerr
date: '2018-08-22'
---

已经发现远程代码执行功能，影响到能够在 Electron 版本上打开嵌套子窗口的应用 (3)。 0-6、2.0.7、1.8.7和1.7.15。 这个脆弱性已经被分配到CVE标识符 [CVE-2018-15685](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-15685)。

---

## 受影响的平台

您受到影响的条件是：

1. 您嵌入 _任何_ 远程用户内容，甚至在沙盒中
2. 您接受任何XSS 脆弱性的用户输入

_详细信息_

如果任何用户代码运行在 `iframe` / 可以创建 `iframe` 中，您将受到影响。 鉴于可能存在的 XSS 弱点，可以假定大多数应用都易受此情况的影响。

如果您使用 `原生WindowOpen: true` 或 `sandbox: true` 选项打开任何窗口，您也会受到影响。  虽然这种脆弱性还需要您的应用程序中存在XSS 脆弱性， 如果您使用这些选项中的任何一种，您仍然应该应用下面的缓减之一。

## 减轻影响

我们已经发布了新版本的 Electron ，其中包括对此易受伤害性的修复： [`。 .0-β.7`](https://github.com/electron/electron/releases/tag/v3.0.0-beta.7), [`2。 8`](https://github.com/electron/electron/releases/tag/v2.0.8) [`1.8.8`](https://github.com/electron/electron/releases/tag/v1.8.8) [` 1.7.16`](https://github.com/electron/electron/releases/tag/v1.7.16). 我们敦促所有Electron开发者立即更新他们的应用程序到最新稳定版本。

如果出于某些原因，您无法升级您的 Electron 版本，您可以通过总拨调用 `事件来保护您的应用程序。 emaltDefault()` on the `new-window` event for all  `webContent`'. 如果您根本不使用 `window .open` 或任何子窗口，这也是您应用的一个有效缓解。

```javascript
mainWindow.webContents.on('new-window', e => e.preventDefault())
```

如果你依靠你的子窗口制造孙子窗口的能力， 然后第三个缓减策略是在您的顶级窗口上使用以下代码：

```javascript
继续执行继承=（顶部网络控制）=> {
  续句柄=（网络控制）=> {
    网络控制。on（"新窗口"，（事件，网址，帧名， 处置，选项）=> {
      如果（！选项.webPreences）{
        选项。webPrefers={}
      =
      对象。分配（选项.Web高级，顶部Web会议。获取 如果（选项.web会议）=
        处理（选项.web会议）
      [
    ]）
  =
  句柄（顶部网络会议）
=

执行继承（主窗口。web会议），则

```

此代码将手动强制执行顶级窗口 `web 首选项` 被手动应用到所有子窗口深度。

## 更多信息

由 [Matt Austin](https://twitter.com/mattaustin) [对比安全](https://www.contrastsecurity.com/security-influencers/cve-2018-15685) 中发现了这个脆弱性并负责任地报告给Electron 项目。

要了解更多关于维护您的 Electron 应用安全的最佳做法，请参阅我们的 [安全教程](https://electronjs.org/docs/tutorial/security)。

如果您想要报告Electron中的脆弱性，电子邮件security@electronjs.org。
