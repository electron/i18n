---
title: 网络视图脆弱性修复
author: ckerr
date: '2018-03-21'
---

发现了一个易受伤害性，可以在某些禁用 Electron 应用程序中重新启用Node.js集成。 这个脆弱性已经被分配到CVE标识符 [CVE-2018-1000136](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000136)。

---

## 受影响的应用程序

如果 *以下所有* 都属实，则应用程序将受到影响：

 1. 在 Electron 1.7, 1.8, 或 2.0.0-beta 运行
 2. 允许执行任意远程代码
 3. 禁用 Node.js 集成
 4. 没有明确声明 `webviewTag: false` 在其网页首选项
 5. 不启用 `原生窗口选项`
 6. 不在没有使用提供的选项标签的情况下截取 `新窗口` 事件并手动覆盖 `event.newGuest`

虽然这似乎是Electron应用程序中的少数，但我们鼓励所有应用程序升级，以此作为一种预防措施。

## 减轻影响

这种脆弱性在今日 [1.7.13](https://github.com/electron/electron/releases/tag/v1.7.13), [1.8.4](https://github.com/electron/electron/releases/tag/v1.8.4)和 [2.0.0-bet.5](https://github.com/electron/electron/releases/tag/v2.0.0-beta.5) 发布版本中已经固定下来。

无法升级其应用程序的 Electron 版本的开发者可以通过以下代码来降低脆弱性：

```js
应用程序。on（"网络内容创建"， （事件，胜利）=> {
  赢。on（"新窗口"，（事件，新URL，帧名称，处置，
                        选项，附加内容）=> {
    如果（！选项.webPrepreences）选项。webPrepreence ={};
    选项。webPrepreences.节点=错误：
    选项.webPrefers.节点工作=错误;
    选项.webPreference.webviewtag=错误;
    删除选项.webPrepreence.预加载;
  [）
}）

//和*如果*您根本不使用webView，
/ /您可能还需要
应用程序。on（"网络内容创建"，"事件，赢"=> {
  赢。on（"将附加网络视图"，（事件，WebPrefers，参数）=> {
    事件

  。
```

## 更多信息

[Trustwave SpiderLabs](https://www.trustwave.com/Company/SpiderLabs/) 的Brendan Scavell向Electron 项目报告了这种脆弱性。

要了解更多关于维护您的 Electron 应用安全的最佳做法，请参阅我们的 [安全教程](https://electronjs.org/docs/tutorial/security)。

若要报告Electron中的脆弱性，请电子邮件security@electronjs.org。

请加入我们的 [电子邮件列表](https://groups.google.com/forum/#!forum/electronjs) 来接收有关发布和安全更新的更新。

