---
title: Certificaat Transparantie Fix
author: kevinsawicki
date: '2016-12-09'
---

Electron [1.4. 2](https://github.com/electron/electron/releases/tag/v1.4.12) bevat een belangrijke patch die een upstream Chrome oplost probleem waarbij wat Symantec, GeoTrust, is en Thawte SSL/TLS-certificaten zijn ten onrechte afgewezen 10 weken vanaf de bouwtijd van [libchromiumcontent](https://github.com/electron/libchromiumcontent), onderliggende Chrome library van Electron. Er zijn geen problemen met de certificaten die op de betreffende locaties worden gebruikt en het vervangen van deze certificaten zal niet helpen.

---

In Electron 1.4.0 &mdash; 1.4.11 HTTPS verzoeken aan sites die deze beïnvloede certificaten zullen na een bepaalde datum mislukken met netwerkfouten. Dit beïnvloedt HTTPS-verzoeken die zijn gemaakt met behulp van Chrome's onderliggende netwerkAPI's zoals `venster. etch`, Ajax verzoeken, Electron's `net` API, `BrowserWindow. oadURL`, `webcontent. oadURL`, het `src` attribuut op een `<webview>` tag en anderen.

Upgrade je toepassingen naar 1.4.12 om te voorkomen dat deze aanvraag mislukt.

**Opmerking:** Dit probleem is geïntroduceerd in Chrome 53 zodat Electron versies eerder dan 1.4.0 niet van invloed zijn.

### Impact datums

Hieronder staat een tabel van elke Electron 1.4 versie en de datum waarop verzoeken om sites die deze relevante certificaten gebruiken te laten mislukken.

<table class="table table-ruled table-full-width">
    <thead>
        <tr class="text-left">
            <th>Electron versie</th>
            <th>Impact datum</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1.3.x</td>
            <td>Onbeïnvloed</td>
        </tr>
        <tr>
            <td>1.4.0</td>
            <td>Reeds mislukt</td>
        </tr>
        <tr>
            <td>1.4.1</td>
            <td>Reeds mislukt</td>
        </tr>
        <tr>
            <td>1.4.2</td>
            <td>Reeds mislukt</td>
        </tr>
        <tr>
            <td>1.4.3</td>
            <td>10 december 2016 9:00 PST</td>
        </tr>
        <tr>
            <td>1.4.4</td>
            <td>10 december 2016 9:00 PST</td>
        </tr>
        <tr>
            <td>1.4.5</td>
            <td>10 december 2016 9:00 PST</td>
        </tr>
        <tr>
            <td>1.4.6</td>
            <td>14e januari, 2017 9:00 PST</td>
        </tr>
        <tr>
            <td>1.4.7</td>
            <td>14e januari, 2017 9:00 PST</td>
        </tr>
        <tr>
            <td>1.4.8</td>
            <td>14e januari, 2017 9:00 PST</td>
        </tr>
        <tr>
            <td>1.4.9</td>
            <td>14e januari, 2017 9:00 PST</td>
        </tr>
        <tr>
            <td>1.4.10</td>
            <td>14e januari, 2017 9:00 PST</td>
        </tr>
        <tr>
            <td>1.4.11</td>
            <td>11e februari, 2017 9.00 uur PST</td>
        </tr>
        <tr>
            <td>1.4.12</td>
            <td>Onbeïnvloed</td>
        </tr>
    </tbody>
</table>

Je kunt de impact datum van je app verifiëren door de klok van je computer vooruit te zetten en vervolgens te kijken of [https://symbeta. ymantec.com/welcome/](https://symbeta.symantec.com/welcome/) laadt er succesvol vanaf.

## Meer informatie

U kunt meer lezen over dit onderwerp, het oorspronkelijke probleem en de oplossing op de volgende plaatsen :

- [Wat is certificaattransparantie?](https://www.certificate-transparency.org/what-is-ct)
- [Symtanische kennisbank artikel](https://knowledge.symantec.com/support/ssl-certificates-support/index?page=content&id=ALERT2160)
- [Chrome probleem 664177](https://bugs.chromium.org/p/chromium/issues/detail?id=664177)
- [Chrome fix voor issue 664177](https://codereview.chromium.org/2495583002)
- [libchromiumcontent patch voor issue 664177](https://github.com/electron/libchromiumcontent/pull/248)

