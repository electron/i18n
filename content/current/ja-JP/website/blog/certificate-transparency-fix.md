---
title: 証明書の透明性の修正
author: kevinsawicki
date: '2016-12-09'
---

Electron の基盤となる Chrome のライブラリ [libchromiumcontent](https://github.com/electron/libchromiumcontent) には、ビルド時間から 10 週間ずれた時間になることによって、一部の Symantec、GeoTrust、Thawte SSL/TLS 証明書が拒否されてしまう問題があります。Electron [1.4.12](https://github.com/electron/electron/releases/tag/v1.4.12) には、この上流の Chrome の問題を修正する重要なパッチが含まれています。 影響を受けるサイトの証明書自体に問題はなく、これらの証明書を置き換えても何もありません。

---

Electron 1.4.0 &mdash; 1.4.11 では、これらの影響を受ける証明書のサイトへの HTTPS リクエストは、特定の日付以降、ネットワークエラーになります。 これは、`window.fetch`、Ajax リクエスト、Electron の `net` API、`BrowserWindow.loadURL`、`webContents.loadURL`、`<webview>` タグの `src` 属性など、Chrome の基盤となるネットワーク API を使用して行われた HTTPS 要求に影響します。

アプリケーションを 1.4.12 にアップグレードすると、これらのリクエストエラーが発生しなくなります。

**注釈:** この問題は Chrome 53 から発生したため、1.4.0 以前のバージョンの Electron は影響を受けません。

### 影響日

以下は、Electron 1.4 の各バージョンと、影響を受ける証明書のサイトへのリクエストが失敗し始める日付の表です。

<table class="table table-ruled table-full-width">
    <thead>
        <tr class="text-left">
            <th>Electron のバージョン</th>
            <th>影響日</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1.3.x</td>
            <td>影響なし</td>
        </tr>
        <tr>
            <td>1.4.0</td>
            <td>既に失敗します</td>
        </tr>
        <tr>
            <td>1.4.1</td>
            <td>既に失敗します</td>
        </tr>
        <tr>
            <td>1.4.2</td>
            <td>既に失敗します</td>
        </tr>
        <tr>
            <td>1.4.3</td>
            <td>2016 年 12 月 10 日 午後 9:00 PST</td>
        </tr>
        <tr>
            <td>1.4.4</td>
            <td>2016 年 12 月 10 日 午後 9:00 PST</td>
        </tr>
        <tr>
            <td>1.4.5</td>
            <td>2016 年 12 月 10 日 午後 9:00 PST</td>
        </tr>
        <tr>
            <td>1.4.6</td>
            <td>2017 年 1 月 14 日 午後 9:00 PST</td>
        </tr>
        <tr>
            <td>1.4.7</td>
            <td>2017 年 1 月 14 日 午後 9:00 PST</td>
        </tr>
        <tr>
            <td>1.4.8</td>
            <td>2017 年 1 月 14 日 午後 9:00 PST</td>
        </tr>
        <tr>
            <td>1.4.9</td>
            <td>2017 年 1 月 14 日 午後 9:00 PST</td>
        </tr>
        <tr>
            <td>1.4.10</td>
            <td>2017 年 1 月 14 日 午後 9:00 PST</td>
        </tr>
        <tr>
            <td>1.4.11</td>
            <td>2017 年 2 月 11 日 午後 9:00 PST</td>
        </tr>
        <tr>
            <td>1.4.12</td>
            <td>影響なし</td>
        </tr>
    </tbody>
</table>

アプリの影響日へコンピューターの時計を進めて、[https://symbeta.symantec.com/welcome/](https://symbeta.symantec.com/welcome/) から正常に読み込まれるかどうか確認してください。

## 詳細情報

このトピック、大元の問題、修正の詳細については、以下のサイトで見ることができます。

- [証明書の透明性とは?](https://www.certificate-transparency.org/what-is-ct)
- [Symtantec ナレッジデータベースの記事](https://knowledge.symantec.com/support/ssl-certificates-support/index?page=content&id=ALERT2160)
- [Chrome issue 664177](https://bugs.chromium.org/p/chromium/issues/detail?id=664177)
- [issue 664177 の Chrome 修正](https://codereview.chromium.org/2495583002)
- [issue 664177 の libchromiumcontent パッチ](https://github.com/electron/libchromiumcontent/pull/248)

