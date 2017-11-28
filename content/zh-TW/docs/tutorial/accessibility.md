# 協助工具

應用程式的易用性很重要，所以我們在 [Devtron](https://electron.atom.io/devtron) 及 [Spectron](https://electron.atom.io/spectron) 中加入了新功能，讓開發人員更容易打造出適用每個人的應用程式。

* * *

Electron 應用程式中的易用性考量與網站類似，畢竟兩者都是 HTML。 然而，你不能用線上的資源來稽查 Electron 應用程式的易用性，畢竟應用程式根本沒有網址可以給稽查程式用。

這些新功能讓你能稽查 Electron 應用程式。你可以用 Spectron 將稽查項目放進測試案例裡，或是透過 Devtron 直接在 DevTools 中使用。 接下來將會簡述這些工具，你也可以在[協助工具說明文件](https://electron.atom.io/docs/tutorial/accessibility)中看到更多細節。

### Spectron

在 Spectron 測試框架中，你可以稽查應用程式中的每個視窗及 `<webview>` 標籤。例如:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

你可以在 [Spectron 說明文件](https://github.com/electron/spectron#accessibility-testing)中看到這個功能的更多資訊。

### Devtron

Devtron 中有新的「協助工具」頁籤，讓你能稽查應用程式中的頁面，並能排序或篩選結果。

![devtron 擷圖](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

上述兩組工具都是用 Google 為了 Chrome 打造的 [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) 程式庫。 You can learn more about the accessibility audit rules this library uses on that [repository's wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

If you know of other great accessibility tools for Electron, add them to the [accessibility documentation](https://electron.atom.io/docs/tutorial/accessibility) with a pull request.