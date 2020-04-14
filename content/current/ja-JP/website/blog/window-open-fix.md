---
title: BrowserView window.open() の脆弱性の修正
author: ckerr
date: '2019-02-03'
---

Node を子ウィンドウで再度有効にできるというコードの脆弱性が発見されました。

---

`sandbox: true` または `nativeWindowOpen: true` と `nodeIntegration: false` で BrowserView を開くと、そこから `window.open` を呼び出すことができます。そうして新しく開いた子ウィンドウでは `nodeIntegration` が有効な webContents が生成されます。 この脆弱性は、すべてのサポートされているバージョンの Electron に影響します。

## 緩和策

この脆弱性に対する修正を含む新しいバージョンの Electron を公開しました。 [`2.0.17`](https://github.com/electron/electron/releases/tag/v2.0.17)、 [`3.0.15`](https://github.com/electron/electron/releases/tag/v3.0.15)、 [`3.1.3`](https://github.com/electron/electron/releases/tag/v3.1.3)、 [`4.0.4`](https://github.com/electron/electron/releases/tag/v4.0.4)、 [`5.0.0-beta.2`](https://github.com/electron/electron/releases/tag/v5.0.0-beta.2) です。 すべての Electron 開発者は、アプリをすぐに最新の安定バージョンに更新することを推奨します。

何らかの理由で Electron バージョンをアップグレードできない場合は、すべての子ウェブコンテンツを無効にすることでこの問題を緩和できます。

```javascript
view.webContents.on('-add-new-contents', e => e.preventDefault());
```

## 詳細情報

この脆弱性は [PalmerAL](https://github.com/PalmerAL) によって発見され、Electron プロジェクトに責任ある形で報告されました。

Electron アプリを堅牢に保つベストプラクティスの詳細は、[セキュリティチュートリアル](https://electronjs.org/docs/tutorial/security) を参照してください。

Electron の脆弱性を報告する場合は、security@electronjs.org にメールでご連絡お願いします。
