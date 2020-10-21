---
title: Виправлення прозорості сертифіката
author: kevinsawicki
date: '2016-12-09'
---

Електрон [1.4. 2](https://github.com/electron/electron/releases/tag/v1.4.12) містить важливий патч, який виправляє upstream Chrome проблема, де деякі Symantec, GeoTrust, і Thawte SSL/TLS-сертифікати не правильно відхилили 10 тижнів від часу побудови [libchromiumcontent](https://github.com/electron/libchromiumcontent), в основі Chrome бібліотеки. З сертифікатом немає проблем, які використовуються на постраждалих сайтах, і заміна цих сертифікатів не допоможе.

---

У Electron 1.4.0 &mdash; 1.4.11 HTTPS запитів на сайти, що використовують ці постраждалі сертифікати не працюватимуть із мережевими помилками після певної дати. This affects HTTPS requests made using Chrome's underlying networking APIs such as `window.fetch`, Ajax requests, Electron's `net` API, `BrowserWindow.loadURL`, `webContents.loadURL`, the `src` attribute on a `<webview>` tag, and others.

Оновлення ваших програм до 1.4.12 запобігає збіям цих запитів в .

**Примітка:** Ця проблема була введена в Chrome 53, тож на версії Electron раніше ніж 1.4.0 не впливають.

### Дати Вплив

Нижче наведено таблицю кожної версії Electron 1.4 і дата запитів на сайти, використовуючи ці постраждалі сертифікати почнуть провалюватися.

<table class="table table-ruled table-full-width">
    <thead>
        <tr class="text-left">
            <th>Версія Electron</th>
            <th>Вплив до дати</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1,3.x</td>
            <td>Незадоволені</td>
        </tr>
        <tr>
            <td>1.4.0</td>
            <td>Вже не вдалося</td>
        </tr>
        <tr>
            <td>1.4.1</td>
            <td>Вже не вдалося</td>
        </tr>
        <tr>
            <td>1.4.2</td>
            <td>Вже не вдалося</td>
        </tr>
        <tr>
            <td>1.4.3</td>
            <td>10 грудня 2016 року ШЛЯДКА</td>
        </tr>
        <tr>
            <td>1.4.4</td>
            <td>10 грудня 2016 року ШЛЯДКА</td>
        </tr>
        <tr>
            <td>1.4.5</td>
            <td>10 грудня 2016 року ШЛЯДКА</td>
        </tr>
        <tr>
            <td>1.4.6</td>
            <td>14 січня 2017 року PM PM PST</td>
        </tr>
        <tr>
            <td>1.4.7</td>
            <td>14 січня 2017 року PM PM PST</td>
        </tr>
        <tr>
            <td>1.4.8</td>
            <td>14 січня 2017 року PM PM PST</td>
        </tr>
        <tr>
            <td>1.4.9</td>
            <td>14 січня 2017 року PM PM PST</td>
        </tr>
        <tr>
            <td>1.4.10</td>
            <td>14 січня 2017 року PM PM PST</td>
        </tr>
        <tr>
            <td>1.4.11</td>
            <td>11 лютого 2017 р. Шкала PM</td>
        </tr>
        <tr>
            <td>1.4.12</td>
            <td>Незадоволені</td>
        </tr>
    </tbody>
</table>

Ви можете перевірити дату впливу програми, встановивши годинник в і потім перевірити чи [https://симбета. ymantec.com/welcome/](https://symbeta.symantec.com/welcome/) успішно завантажується з нього.

## Докладніше

Детальніше про цю тему ви можете прочитати і виправити її :

- [Що таке прозорість сертифіката?](https://www.certificate-transparency.org/what-is-ct)
- [Основна стаття для Symtantec](https://knowledge.symantec.com/support/ssl-certificates-support/index?page=content&id=ALERT2160)
- [Помилка в Chrome 664177](https://bugs.chromium.org/p/chromium/issues/detail?id=664177)
- [Виправлення проблеми з Chrome 664177](https://codereview.chromium.org/2495583002)
- [libchromiumcontent патч на випуск 664177](https://github.com/electron/libchromiumcontent/pull/248)

