# Accessibility

Making accessible applications is important and we're happy to introduce new functionality to [Devtron](https://electron.atom.io/devtron) and [Spectron](https://electron.atom.io/spectron) that gives developers the opportunity to make their apps better for everyone.

* * *

Accessibility concerns in Electron applications are similar to those of websites because they're both ultimately HTML. With Electron apps, however, you can't use the online resources for accessibility audits because your app doesn't have a URL to point the auditor to.

These new features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. Read on for a summary of the tools or checkout our [accessibility documentation](https://electron.atom.io/docs/tutorial/accessibility) for more information.

### Spectron

Trong framework test Spectron, bây giờ bạn có thể kiểm tra mỗi cửa sổ và `<webview>`tag trong ứng dụng của bạn. Ví dụ:</0>:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Bạn có thể đọc thêm về tính năng này trong [tài liệu của Spectron](https://github.com/electron/spectron#accessibility-testing).

### Devtron

Trong Devtron, đó là khả năng truy cập tab mới mà sẽ cho phép bạn kiểm tra một trang trong ứng dụng của bạn, sắp xếp và lọc kết quả.

![ảnh chụp màn hình devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Both of these tools are using the [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) library built by Google for Chrome. You can learn more about the accessibility audit rules this library uses on that [repository's wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Nếu bạn biết về các công cụ accessibility tuyệt vời khác cho Electron, thêm chúng vào [tài liệu này](https://electron.atom.io/docs/tutorial/accessibility) với một pull request.