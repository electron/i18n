---
title: Oprava průhlednosti certifikátů
author: kevinsawicki
date: '2016-12-09'
---

Elektron [1.4. 2](https://github.com/electron/electron/releases/tag/v1.4.12) obsahuje důležitý patch, který řeší problém s Chrome , kde někteří Symantec, GeoTrust, a Thawte SSL/TLS certifikáty jsou nesprávně odmítnuty 10 týdnů od doby sestavení [libchromiumcontent](https://github.com/electron/libchromiumcontent), Electronu základní knihovny Chrome. Na dotčených místech nejsou žádné problémy s certifikáty a nahrazení těchto certifikátů nepomůže.

---

V Electronu 1.4.0 &mdash; 1.4.11 HTTPS požadavky na weby, které používají tyto ovlivněné certifikáty, po určitém datu selže chyba sítě. Toto ovlivní HTTPS požadavky vytvořené pomocí základních síťových API společnosti Chrome, jako je okno `. etch`, Ajax požadavky, Electron's `net` API, `BrowserWindow. oadURL`, `webový obsah. oadURL`, atribut `src` na značce `<webview>` a další.

Aktualizací vašich aplikací na 1.4.12 zabráníte výskytu těchto chyb v požadavku .

**Poznámka:** Tento problém byl zaveden v prohlížeči Chrome 53, takže nejsou ovlivněny verze Electronu dříve než 1.4.0.

### Data dopadu

Níže je tabulka každé verze Electronu 1.4 a datum, kdy požadavků na stránky používající tyto ovlivněné certifikáty začnou selhat.

<table class="table table-ruled table-full-width">
    <thead>
        <tr class="text-left">
            <th>Verze Electronu</th>
            <th>Datum dopadu</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1.3.x</td>
            <td>Použité</td>
        </tr>
        <tr>
            <td>1.4.0</td>
            <td>Již selhalo</td>
        </tr>
        <tr>
            <td>1.4.1</td>
            <td>Již selhalo</td>
        </tr>
        <tr>
            <td>1.4.2</td>
            <td>Již selhalo</td>
        </tr>
        <tr>
            <td>1.4.3</td>
            <td>Desátý prosinec, 2016 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.4</td>
            <td>Desátý prosinec, 2016 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.5</td>
            <td>Desátý prosinec, 2016 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.6</td>
            <td>Čtvrtý leden 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.7</td>
            <td>Čtvrtý leden 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.8</td>
            <td>Čtvrtý leden 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.9</td>
            <td>Čtvrtý leden 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.10</td>
            <td>Čtvrtý leden 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.11</td>
            <td>Zákon o dani z příjmu</td>
        </tr>
        <tr>
            <td>1.4.12</td>
            <td>Použité</td>
        </tr>
    </tbody>
</table>

Datum dopadu vaší aplikace můžete ověřit nastavením hodin před Vaším počítačem a poté zkontrolovat zda [https://symbeta. ymantec.com/welcome/](https://symbeta.symantec.com/welcome/) byl úspěšně načten z něj.

## Další informace

Více o tomto tématu, původním problému a opravě můžete číst na následujících místech:

- [Co je to transparentnost certifikátů?](https://www.certificate-transparency.org/what-is-ct)
- [Článek znalostní základny Symtantec](https://knowledge.symantec.com/support/ssl-certificates-support/index?page=content&id=ALERT2160)
- [Chrome issue 664177](https://bugs.chromium.org/p/chromium/issues/detail?id=664177)
- [Oprava Chrome pro vydání 664177](https://codereview.chromium.org/2495583002)
- [patch libchromia pro vydání 664177](https://github.com/electron/libchromiumcontent/pull/248)

