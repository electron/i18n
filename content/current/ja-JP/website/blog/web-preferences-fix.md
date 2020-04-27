---
title: WebPreferences 脆弱性の修正
author: ckerr
date: '2018-08-22'
---

Electron バージョン (3.0.0-beta.6 、 2.0.7 、 1.8.7 、 1.7.15) において、ネストされた子ウィンドウを開くことのできるアプリに影響するリモートコード実行の脆弱性が発見されました。 この脆弱性には CVE 識別子 [CVE-2018-15685](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-15685) が割り当てられています。

---

## 影響を受けるプラットフォーム

以下の条件に該当する場合、影響を受けます。

1. サンドボックス内を含め、_なんらかの_ 外部ユーザコンテンツを埋め込んでいる
2. XSS 脆弱性のあるユーザの入力受け付けがある

_詳細_

いずれかのユーザコードが `iframe` 内で動作している、または `iframe` を作成できる場合に影響を受けます。 XSS の脆弱性が発生する可能性を考えると、ほとんどのアプリがこのケースに対して脆弱であると想定できます。

ウインドウを `nativeWindowOpen: true` や `sandbox: true` で開いている場合でも影響を受けます。  この脆弱性はアプリ内に XSS 脆弱性が存在することも条件にありますが、先述のオプションを使用している場合、以下の緩和策のどれかを適用する必要があります。

## 緩和策

私たちはこの脆弱性の修正を含む新しいバージョンの Electron を公開しました: [`3.0.0-beta.7`](https://github.com/electron/electron/releases/tag/v3.0.0-beta.7) 、 [`2.0.8`](https://github.com/electron/electron/releases/tag/v2.0.8) 、 [`1.8.8`](https://github.com/electron/electron/releases/tag/v1.8.8) 、 [`1.7.16`](https://github.com/electron/electron/releases/tag/v1.7.16) 。 Electron 開発者全員は、アプリをすぐに最新の安定バージョンに更新することを推奨します。

何らかの理由で Electron のバージョンをアップグレードできない場合は、すべての `webContents` に対して `new-window` イベントで `event.preventDefault()` を呼ぶことであなたのアプリを保護できます。 `window.open` や子ウィンドウを用いないこともまた有効な緩和策です。

```javascript
mainWindow.webContents.on('new-window', e => e.preventDefault())
```

子ウインドウが孫ウインドウを作ることに依存している場合、3 つ目の緩和策として、最上位ウインドウに以下のコードを使用すると良いでしょう。

```javascript
const enforceInheritance = (topWebContents) => {
  const handle = (webContents) => {
    webContents.on('new-window', (event, url, frameName, disposition, options) => {
      if (!options.webPreferences) {
        options.webPreferences = {}
      }
      Object.assign(options.webPreferences, topWebContents.getLastWebPreferences())
      if (options.webContents) {
        handle(options.webContents)
      }
    })
  }
  handle(topWebContents)
}

enforceInheritance(mainWindow.webContents)
```

このコードは、最上位ウインドウの `webPreferences` がすべての子ウィンドウへ無限に適用されるように手動で強制します。

## 詳細情報

この脆弱性は [Contrast Security](https://www.contrastsecurity.com/security-influencers/cve-2018-15685) の [Matt Austin](https://twitter.com/mattaustin) により発見され、責任を持って Electron プロジェクトへ報告されました。

Electron アプリを堅牢に保つベストプラクティスの詳細は、[セキュリティチュートリアル](https://electronjs.org/docs/tutorial/security) を参照してください。

Electron の脆弱性を報告する場合は、security@electronjs.org にメールでご連絡お願いします。
