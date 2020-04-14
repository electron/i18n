---
title: アクセシビリティツール
author: jlord
date: '2016-08-23'
---

アクセシビリティの高いアプリケーションを作ることは重要です。開発者がすべてのユーザ向けのより良いアプリケーション開発を手助けする新機能 [Devtron](https://electronjs.org/devtron) と [Spectron](https://electronjs.org/spectron) を紹介します。

---

Electron アプリケーションのアクセシビリティに関する懸念は、どちらも最終的に HTML であるため、ウェブサイトと同様です。 しかし、Electron アプリケーションでは、アプリケーションに監査機を指す URL がないため、アクセシビリティ監査にオンラインリソースを使用することはできません。

これらの新機能は、監査ツールを Electron アプリに提供します。 Spectron でテストに監査を追加するか、開発者向けツール内で Devtron で監査を使用するかを選択できます。 詳細は、ツールの概要を読むか [アクセシビリティドキュメント](https://electronjs.org/docs/tutorial/accessibility/) をご覧ください。

### Spectron

Spectron テストフレームワークで、アプリケーション内の各ウィンドウと `<webview>` タグを監視できます。 例:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

この機能の詳細は [Spectron のドキュメント](https://github.com/electron/spectron#accessibility-testing) にて閲覧できます。

### Devtron

Devtronでは新機能のアクセシビリティタブが利用できます。このタブでは、アプリケーション内の監視結果をソートしたり、フィルタによって絞り込んだりできます。

![devtron screenshot](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

いずれのツールも Google が Chrome 向けに開発した [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) ライブラリを利用しています。 このライブラリが使用しているアクセシビリティ監査のルールに関する詳細は、[リポジトリの wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules) に記載されています。

これ以外の Electron 向けに使用可能な素晴らしいアクセシビリティツールをご存じの方は、 ぜひ[アクセシビリティに関するドキュメント](https://electronjs.org/docs/tutorial/accessibility/) に追加してプルリクエストをお送りください。

