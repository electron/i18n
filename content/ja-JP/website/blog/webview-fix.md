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

This vulnerability is fixed in today's [1.7.13](https://github.com/electron/electron/releases/tag/v1.7.13), [1.8.4](https://github.com/electron/electron/releases/tag/v1.8.4), and [2.0.0-beta.5](https://github.com/electron/electron/releases/tag/v2.0.0-beta.5) releases.

Developers who are unable to upgrade their application's Electron version can mitigate the vulnerability with the following code:

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

// and *IF* you don't use WebViews at all,
// you might also want
app.on('web-contents-created', (event, win) => {
  win.on('will-attach-webview', (event, webPreferences, params) => {
    event.preventDefault();
  })
})
```

## 詳細情報

This vulnerability was found and reported responsibly to the Electron project by Brendan Scarvell of [Trustwave SpiderLabs](https://www.trustwave.com/Company/SpiderLabs/).

Electron アプリを堅牢に保つベストプラクティスの詳細は、[セキュリティチュートリアル](https://electronjs.org/docs/tutorial/security) を参照してください。

To report a vulnerability in Electron, please email security@electronjs.org.

Please join our [email list](https://groups.google.com/forum/#!forum/electronjs) to receive updates about releases and security updates.

