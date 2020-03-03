---
title: Webview の脆弱性の修正
author: ckerr
date: '2018-03-21'
---

Node.js インテグレーションを無効している Electron アプリケーションで、再度有効にできる脆弱性が発見されました。 この脆弱性には CVE 識別子 [CVE-2018-1000136](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000136) が割り当てられています。

---

## 影響するアプリケーション

以下の *すべて* に当てはまる場合、そのアプリケーションは影響します。

 1. Electron 1.7, 1.8, か 2.0.0-beta で実行している
 2. 任意のリモートコードの実行を許可している
 3. Node.js インテグレーションを無効にしている
 4. webPreferences で `webviewTag: false` を明示的に宣言していない
 5. `nativeWindowOption` オプションを有効にしていない
 6. `new-window` イベントをインターセプトしておらず、提供された options タグを使用せずに `event.newGuest` を手動でオーバーライドしている

これはごく少数の Electron アプリケーションになりますが、予防としてすべてのアプリケーションはアップグレードすることを推奨します。

## 緩和策

この脆弱性は本日の [1.7.13](https://github.com/electron/electron/releases/tag/v1.7.13)、[1.8.4](https://github.com/electron/electron/releases/tag/v1.8.4)、[2.0.0-beta.5](https://github.com/electron/electron/releases/tag/v2.0.0-beta.5) のリリースで修正されました。

アプリケーションの Electron のバージョンをアップグレードできない開発者は、以下のコードで脆弱性を軽減できます。

```js
app.on('web-contents-created', (event, win) => {
  win.on('new-window', (event, newURL, frameName, disposition,
                        options, additionalFeatures) => {
    if (!options.webPreferences) options.webPreferences = {};
    options.webPreferences.nodeIntegration = false;
    options.webPreferences.nodeIntegrationInWorker = false;
    options.webPreferences.webviewTag = false;
    delete options.webPreferences.preload;
  })
})

// WebView も全く使用しない *場合* は、
// 以下も必要になる場合があります
app.on('web-contents-created', (event, win) => {
  win.on('will-attach-webview', (event, webPreferences, params) => {
    event.preventDefault();
  })
})
```

## 詳細情報

この脆弱性は [Trustwave SpiderLabs](https://www.trustwave.com/Company/SpiderLabs/) の Brendan Scarvell によって発見され、Electron プロジェクトに責任ある形で報告されました。

Electron アプリを堅牢に保つベストプラクティスの詳細は、[セキュリティチュートリアル](https://electronjs.org/docs/tutorial/security) を参照してください。

Electron の脆弱性を報告する場合は、security@electronjs.org にメールでご連絡お願いします。

[メールリスト](https://groups.google.com/forum/#!forum/electronjs) に参加すると、リリースとセキュリティアップデートに関する更新情報を受信できます。

