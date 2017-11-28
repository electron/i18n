# 可用性

创建可用的应用程序是很重要的，我们很乐意介绍能让开发者有机会让它们的应用程序让每个人都可用的[Devtron](https://electron.atom.io/devtron)和[Spectron](https://electron.atom.io/spectron)的新功能。

* * *

Electron 应用的可访问性问题和网站是相似的因为两者最终都是HTML. 然而, 对于Electron应用, 你不能把在线资源用于可访问性审查, 因为你的应用没有一个URL指向审查者.

These new features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. Read on for a summary of the tools or checkout our [accessibility documentation](https://electron.atom.io/docs/tutorial/accessibility) for more information.

### Spectron

In the testing framework Spectron, you can now audit each window and `<webview>` tag in your application. For example:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

You can read more about this feature in [Spectron's documentation](https://github.com/electron/spectron#accessibility-testing).

### Devtron

In Devtron, there is a new accessibility tab which will allow you to audit a page in your app, sort and filter the results.

![devtron screenshot](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Both of these tools are using the [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) library built by Google for Chrome. You can learn more about the accessibility audit rules this library uses on that [repository's wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

If you know of other great accessibility tools for Electron, add them to the [accessibility documentation](https://electron.atom.io/docs/tutorial/accessibility) with a pull request.