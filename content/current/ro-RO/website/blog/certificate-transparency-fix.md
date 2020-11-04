---
title: Rezolvarea transparenței certificatului
author: kevinsawicki
date: '2016-12-09'
---

Electron [1.4. 2](https://github.com/electron/electron/releases/tag/v1.4.12) conține un plasture important care rezolvă o problemă în amonte Chrome în care unele SymConfirm GeoTrust, iar certificatele Thawte SSL/TLS sunt incorect respinse timp de 10 săptămâni de la crearea [libchromiumcontent](https://github.com/electron/libchromiumcontent), biblioteca Chrome subiacentă Electron. Nu există probleme cu certificatele utilizate pe site-urile afectate, iar înlocuirea acestor certificate nu va ajuta.

---

În Electron 1.4.0 &mdash; 1.4.11 cereri HTTPS către site-uri folosind aceste date afectate certificatele vor eșua cu erori de rețea după o anumită dată. Aceasta afectează cererile HTTPS făcute folosind API-ul de bază pentru rețele cum ar fi `fereastră. Ia`, cereri Ajax, Electron `net` API, `BrowserWindow. oadURL`, `Contentii web. oadURL`, atributul `src` pe un tag `<webview>` și altele.

Actualizarea aplicațiilor la 1.4.12 va împiedica aceste solicitări să eșueze .

**Notă:** Această problemă a fost introdusă în Chrome 53 astfel încât versiunile Electron mai devreme decât 1.4.0 nu sunt afectate.

### Date de impact

Mai jos este un tabel cu fiecare versiune Electron 1.4 și data la care cererile către site-uri folosind aceste certificate afectate vor începe să eșueze.

<table class="table table-ruled table-full-width">
    <thead>
        <tr class="text-left">
            <th>Versiune Electron</th>
            <th>Data impactului</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1,3,x</td>
            <td>Neafectat</td>
        </tr>
        <tr>
            <td>1.4.0</td>
            <td>Deja eșuat</td>
        </tr>
        <tr>
            <td>1.4.1</td>
            <td>Deja eșuat</td>
        </tr>
        <tr>
            <td>1.4.2</td>
            <td>Deja eșuat</td>
        </tr>
        <tr>
            <td>1.4.3</td>
            <td>10 decembrie 2016 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.4</td>
            <td>10 decembrie 2016 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.5</td>
            <td>10 decembrie 2016 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.6</td>
            <td>14 ianuarie 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.7</td>
            <td>14 ianuarie 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.8</td>
            <td>14 ianuarie 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.9</td>
            <td>14 ianuarie 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.10</td>
            <td>14 ianuarie 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.11</td>
            <td>11 februarie 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.12</td>
            <td>Neafectat</td>
        </tr>
    </tbody>
</table>

Puteți verifica data impactului aplicației dvs. setând ceasul calculatorului înaintea și apoi verificați dacă [https://symbeta. ymhis.com/welcome/](https://symbeta.symantec.com/welcome/) se încarcă cu succes.

## Mai multe informații

Poți citi mai multe despre acest subiect, problema originală și reparația la următoarele locuri:

- [Ce este Certificate Transparency?](https://www.certificate-transparency.org/what-is-ct)
- [Articol de bază de cunoștințe Symtantec](https://knowledge.symantec.com/support/ssl-certificates-support/index?page=content&id=ALERT2160)
- [Problema Chrome 664177](https://bugs.chromium.org/p/chromium/issues/detail?id=664177)
- [Remedierea prin crom a emisiunii 664177](https://codereview.chromium.org/2495583002)
- [libchromiumcontent patch pentru problema 664177](https://github.com/electron/libchromiumcontent/pull/248)

