---
title: Zertifikattransparenz Fix
author: kevinsawicki
date: '2016-12-09'
---

Elektron [1.4. 2](https://github.com/electron/electron/releases/tag/v1.4.12) enthält einen wichtigen Patch, der ein Upstream Chrome Problem behebt, bei dem einige Symantec, GeoTrust, und Thawte SSL/TLS-Zertifikate werden 10 Wochen nach der Build-Zeit von [libchromiumcontent](https://github.com/electron/libchromiumcontent), der zugrundeliegenden Chrome-Bibliothek von Electronic falsch abgelehnt. Es gibt keine Probleme mit den Zertifikaten , die auf den betroffenen Seiten verwendet werden und das Ersetzen dieser Zertifikate hilft nicht.

---

In Electron 1.4.0 &mdash; 1.4.11 HTTPS-Anfragen an Sites, die diese betroffenen Zertifikate verwenden, werden nach einem bestimmten Datum bei Netzwerkfehlern fehlschlagen. Dies wirkt sich auf HTTPS-Anfragen aus, die unter Verwendung der Chrome-Netzwerk-APIs gemacht wurden, wie zum Beispiel `Fenster. etch`, Ajax-Anfragen, Electron's `netto` API, `BrowserWindow. oadURL`, `WebInhalte. oadURL`, das `src` Attribut auf einem `<webview>` Tag und andere.

Das Aktualisieren Ihrer Anwendungen auf 1.4.12 verhindert, dass diese Anforderungsfehler auftreten.

**Hinweis:** Dieses Problem wurde in Chrome 53 eingeführt, so dass Electron-Versionen vor als 1.4.0 nicht betroffen sind.

### Impact Daten

Unten ist eine Tabelle jeder Electron 1.4 Version und das Datum, an dem Anfragen an Sites, die diese betreffenden Zertifikate verwenden, scheitern.

<table class="table table-ruled table-full-width">
    <thead>
        <tr class="text-left">
            <th>Electron-Version</th>
            <th>Impact Datum</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1.3.x</td>
            <td>Unberührt</td>
        </tr>
        <tr>
            <td>1.4.0</td>
            <td>Bereits fehlgeschlagen</td>
        </tr>
        <tr>
            <td>1.4.1</td>
            <td>Bereits fehlgeschlagen</td>
        </tr>
        <tr>
            <td>1.4.2</td>
            <td>Bereits fehlgeschlagen</td>
        </tr>
        <tr>
            <td>1.4.3</td>
            <td>10. Dezember 2016 um 21.00 Uhr PST</td>
        </tr>
        <tr>
            <td>1.4.4</td>
            <td>10. Dezember 2016 um 21.00 Uhr PST</td>
        </tr>
        <tr>
            <td>1.4.5</td>
            <td>10. Dezember 2016 um 21.00 Uhr PST</td>
        </tr>
        <tr>
            <td>1.4.6</td>
            <td>14. Januar 2017 9:00 Uhr PST</td>
        </tr>
        <tr>
            <td>1.4.7</td>
            <td>14. Januar 2017 9:00 Uhr PST</td>
        </tr>
        <tr>
            <td>1.4.8</td>
            <td>14. Januar 2017 9:00 Uhr PST</td>
        </tr>
        <tr>
            <td>1.4.9</td>
            <td>14. Januar 2017 9:00 Uhr PST</td>
        </tr>
        <tr>
            <td>1.4.10</td>
            <td>14. Januar 2017 9:00 Uhr PST</td>
        </tr>
        <tr>
            <td>1.4.11</td>
            <td>11. Februar 2017 9:00 Uhr PST</td>
        </tr>
        <tr>
            <td>1.4.12</td>
            <td>Unberührt</td>
        </tr>
    </tbody>
</table>

Sie können das Datum Ihrer Anwendung überprüfen, indem Sie die Uhr Ihres Computers vor setzen und überprüfen, ob [https://symbeta angezeigt wird. ymantec.com/welcome/](https://symbeta.symantec.com/welcome/) lädt erfolgreich davon.

## Weitere Informationen

Sie können mehr über dieses Thema, das ursprüngliche Problem und die Korrektur an den folgenden Orten lesen:

- [Was ist Zertifikattransparenz?](https://www.certificate-transparency.org/what-is-ct)
- [Symtantec Wissensdatenbank-Artikel](https://knowledge.symantec.com/support/ssl-certificates-support/index?page=content&id=ALERT2160)
- [Chrome-Problem 664177](https://bugs.chromium.org/p/chromium/issues/detail?id=664177)
- [Chrome-Korrektur für Fall 664177](https://codereview.chromium.org/2495583002)
- [libchromiumcontent Patch für Ausgabe 664177](https://github.com/electron/libchromiumcontent/pull/248)

