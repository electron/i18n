---
title: 辅助工具
author: 吉尔福德
date: '2016-08-23'
---

提供可访问的应用程序很重要，我们很乐意为 [Devtron](https://electronjs.org/devtron) and [Spectron](https://electronjs.org/spectron) 引入新的功能，让开发者有机会为每个人提供更好的应用。

---

Electron 应用程序中的辅助功能关注类似于网站的关注，因为它们最终都是 HTML。 然而，通过 Electron 应用，您不能使用在线资源进行辅助审核，因为您的应用没有一个URL来指向审计师。

这些新功能将这些审核工具带到您的电子应用。 您可以选择使用 Spectron 将审核添加到您的测试中，或在 DevTools 中与 Devtron 一起使用它们。 阅读工具摘要或结算我们的 [辅助文档](https://electronjs.org/docs/tutorial/accessibility/) 以获取更多信息。

### Spectron

在 Spectron 测试框架中，您现在可以在您的应用程序中审计每个窗口和 `<webview>` 标签。 例如：

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

你可以从这里[Spectron文档](https://github.com/electron/spectron#accessibility-testing)阅读到更多有关于这个功能的信息。

### Devtron

Devtron 有一个新的辅助选项卡，允许您在应用中审核一个页面，并排序和过滤结果。

![devtron 截图](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

这两个工具都使用谷歌为Chrome构建的 [辅助开发工具](https://github.com/GoogleChrome/accessibility-developer-tools) 库。 您可以了解更多有关该库在该存储库的维基 [](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules)上使用的辅助功能审核规则。

如果您知道电子的其他绝佳辅助工具，请将它们添加到带有拉拔请求</a> 的 辅助功能文档中。</p>

