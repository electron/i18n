---
title: プロトコルハンドラの脆弱性の修正
author: zeke
date: '2018-01-22'
---

リモートコード実行の脆弱性が発見されました。カスタムプロトコルハンドラを使用している Electron アプリに影響します。 この脆弱性には CVE 識別子 [CVE-2018-1000006](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000006) が割り当てられています。

---

## 影響を受けるプラットフォーム

Windows 向けに設計された Electron アプリが影響を受けます。`myapp://` のようなプロトコルのデフォルトハンドラに自身を登録することで起きる脆弱性です。

ネイティブコード、Windows レジストリ、Electron の [app.setAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) API を使用しているようなアプリは、プロトコルの登録方法に関係なく影響を受ける可能性があります。

macOS と Linux には、この問題での **脆弱性はありません**。

## 緩和策

この脆弱性に対する修正を含む新しいバージョンの Electron を公開しました。 [`1.8.2-beta.5`](https://github.com/electron/electron/releases/tag/v1.8.2-beta.5)、 [`1.7.12`](https://github.com/electron/electron/releases/tag/v1.7.12)、 [`1.6.17`](https://github.com/electron/electron/releases/tag/v2.6.17) です。 Electron 開発者全員は、アプリをすぐに最新の安定バージョンに更新することを推奨します。

If for some reason you are unable to upgrade your Electron version, you can append `--` as the last argument when calling [app.setAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows), which prevents Chromium from parsing further options. The double dash `--` signifies the end of command options, after which only positional parameters are accepted.

```js
app.setAsDefaultProtocolClient(protocol, process.execPath, [
  '--your-switches-here',
  '--'
])
```

See the [app.setAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) API for more details.

Electron アプリを堅牢に保つベストプラクティスの詳細は、[セキュリティチュートリアル](https://electronjs.org/docs/tutorial/security) を参照してください。

If you wish to report a vulnerability in Electron, email security@electronjs.org.
