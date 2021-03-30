---
title: 证书透明度修复
author: kevinsawicki
date: '2016-12-09'
---

电子 [1.412][] 包含一个重要的修补程序，可以修复上游铬 问题，其中一些赛门铁克、GeoTrust 和 Thawte SSL/TLS 证书 在 [][]的构建时间 10 周内被错误地拒绝，电子公司的基础 Chrome 库。 在受影响的网站上使用的 证书没有问题，替换这些证书将无济于事。

---

在 Electron 1.4.0 &mdash; 1.4.11 对使用这些受影响的 证书的站点的HTTPS 请求将在特定日期之后因网络错误而失败。 这影响使用 Chrome 的基础网络 API 做出的 HTTPS 请求，例如 `窗口。 etch`, Ajax request, Electron's `net` API, `BrowserWindow. oadURL`, `webContents. loadURL`, `src` 属性在一个 `<webview>` 标签等等。

将您的应用程序升级到1.4.12将防止这些请求失败 发生。

**注意：** 此问题是在 Chrome 中引入的，所以早于 1.4.0 版本的 Electron 不会受到影响。

### 影响日期

下面是每一个 Electron 1.4 版本的表，使用这些受影响证书的 请求的日期将开始失败。

<table class="table table-ruled table-full-width">
    <thead>
        <tr class="text-left">
            <th>Electron 版本</th>
            <th>影响日期</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1.3.x</td>
            <td>不受影响</td>
        </tr>
        <tr>
            <td>1.4.0</td>
            <td>已经失败</td>
        </tr>
        <tr>
            <td>1.4.1</td>
            <td>已经失败</td>
        </tr>
        <tr>
            <td>1.4.2</td>
            <td>已经失败</td>
        </tr>
        <tr>
            <td>1.4.3</td>
            <td>2016 年 12 月 10 日9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.4</td>
            <td>2016 年 12 月 10 日9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.5</td>
            <td>2016 年 12 月 10 日9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.6</td>
            <td>1月14日，2017年9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.7</td>
            <td>1月14日，2017年9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.8</td>
            <td>1月14日，2017年9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.9</td>
            <td>1月14日，2017年9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.10</td>
            <td>1月14日，2017年9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.11</td>
            <td>2月11日，2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.12</td>
            <td>不受影响</td>
        </tr>
    </tbody>
</table>

您可以通过设置您的计算机的时钟在 之前验证您的应用程序的影响日期，然后检查是否 [https://symbeta。 ymantec.com/welcome/](https://symbeta.symantec.com/welcome/) 成功地从它中下载。

## 更多信息

您可以阅读更多关于这个主题、最初问题以及以下 处的修复：

- [证书透明度是什么？](https://www.certificate-transparency.org/what-is-ct)
- [Symtantec知识基础文章](https://knowledge.symantec.com/support/ssl-certificates-support/index?page=content&id=ALERT2160)
- [Chrome issue 664177](https://bugs.chromium.org/p/chromium/issues/detail?id=664177)
- [664177 Chrome 修复问题](https://codereview.chromium.org/2495583002)
- [签发的 libchromiumcontent 补丁](https://github.com/electron/libchromiumcontent/pull/248)

[3]: https://github.com/electron/libchromiumcontent

[2]: https://github.com/electron/libchromiumcontent
[1.412]: https://github.com/electron/electron/releases/tag/v1.4.12

