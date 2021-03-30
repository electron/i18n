---
title: Исправление прозрачности сертификата
author: kevinsawicki
date: '2016-12-09'
---

Electron [1.4.12][] contains an important patch that fixes an upstream Chrome issue where some Symantec, GeoTrust, and Thawte SSL/TLS certificates are incorrectly rejected 10 weeks from the build time of [libchromiumcontent][], Electron's underlying Chrome library. Нет никаких проблем с сертификатами используемыми на затронутых сайтах и замена этих сертификатов не будет помогать.

---

В Electron 1.4.0 &mdash; 1.4.11 HTTPS запросы на сайты с использованием этих сертификатов не будут обработаны после определенной даты. This affects HTTPS requests made using Chrome's underlying networking APIs such as `window.fetch`, Ajax requests, Electron's `net` API, `BrowserWindow.loadURL`, `webContents.loadURL`, the `src` attribute on a `<webview>` tag, and others.

Обновление ваших приложений до 1.4.12 предотвратит возникновение ошибок в запросе.

**Примечание:** Эта проблема была введена в Chrome 53 так что Electron версии раньше версии 1.4.0 не пострадали.

### Даты воздействия

Ниже приведена таблица каждой версии Electron 1.4 и дата, когда запросов на сайты, использующие эти сертификаты, начнут не выполняться.

<table class="table table-ruled table-full-width">
    <thead>
        <tr class="text-left">
            <th>Версия Electron</th>
            <th>Дата удара</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1,3.х</td>
            <td>Не затронуто</td>
        </tr>
        <tr>
            <td>1.4.0</td>
            <td>Уже не удалось</td>
        </tr>
        <tr>
            <td>1.4.1</td>
            <td>Уже не удалось</td>
        </tr>
        <tr>
            <td>1.4.2</td>
            <td>Уже не удалось</td>
        </tr>
        <tr>
            <td>1.4.3</td>
            <td>10 декабря 2016 вечера PST</td>
        </tr>
        <tr>
            <td>1.4.4</td>
            <td>10 декабря 2016 вечера PST</td>
        </tr>
        <tr>
            <td>1.4.5</td>
            <td>10 декабря 2016 вечера PST</td>
        </tr>
        <tr>
            <td>1.4.6</td>
            <td>14 января 2017 вечера PST</td>
        </tr>
        <tr>
            <td>1.4.7</td>
            <td>14 января 2017 вечера PST</td>
        </tr>
        <tr>
            <td>1.4.8</td>
            <td>14 января 2017 вечера PST</td>
        </tr>
        <tr>
            <td>1.4.9</td>
            <td>14 января 2017 вечера PST</td>
        </tr>
        <tr>
            <td>1.4.10</td>
            <td>14 января 2017 вечера PST</td>
        </tr>
        <tr>
            <td>1.4.11</td>
            <td>11 февраля 2017 21:00 PST</td>
        </tr>
        <tr>
            <td>1.4.12</td>
            <td>Не затронуто</td>
        </tr>
    </tbody>
</table>

Вы можете проверить дату появления вашего приложения, установив часы на вашем компьютере впереди и затем проверьте, что [https://symbeta. ymantec.com/welcome/](https://symbeta.symantec.com/welcome/) успешно загружен с него.

## Дополнительная информация

Вы можете прочитать больше об этой теме, оригинальной ошибке и исправлении в следующих местах:

- [Что такое Прозрачность Сертификата?](https://www.certificate-transparency.org/what-is-ct)
- [Статья базы знаний Symtantec](https://knowledge.symantec.com/support/ssl-certificates-support/index?page=content&id=ALERT2160)
- [Вопрос Chrome 664177](https://bugs.chromium.org/p/chromium/issues/detail?id=664177)
- [Исправлена ошибка Chrome 664177](https://codereview.chromium.org/2495583002)
- [патч libchromiumcontent для выпуска 664177](https://github.com/electron/libchromiumcontent/pull/248)

[libchromiumcontent]: https://github.com/electron/libchromiumcontent
[1.4.12]: https://github.com/electron/electron/releases/tag/v1.4.12

