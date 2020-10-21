---
title: Napraw przezroczystość certyfikatu
author: kevinsawicki
date: '2016-12-09'
---

Electron [1.4. 2](https://github.com/electron/electron/releases/tag/v1.4.12) zawiera ważny plaster, który naprawia problem z Chrome na górze , gdzie niektóre Symantec, GeoTrust, i Thawte certyfikaty SSL/TLS są niepoprawnie odrzucane 10 tygodni z czasu budowy [libchromiumcontent](https://github.com/electron/libchromiumcontent), Podstawowej biblioteki Chrome Electron. Nie ma problemów z certyfikatami używanymi na dotkniętych witrynach i zastąpienie tych certyfikatów nie pomoże.

---

W Electron 1.4.0 &mdash; 1.4.11 Żądania HTTPS do witryn korzystających z tych certyfikatów nie przyniosą błędów sieciowych po określonej dacie. Ma to wpływ na żądania HTTPS wykonane przy użyciu bazowych API sieci Chrome , takich jak okno `. etch`, Ajax requests, `net` API, `BrowserWindow. oadURL`, `webContent. oadURL`, atrybut `src` na tagu `<webview>` i inne.

Aktualizacja aplikacji do 1.4.12 zapobiegnie wystąpieniu błędów żądań .

**Uwaga:** Ten problem został wprowadzony w Chrome 53, więc wersja Electron wcześniej niż 1.4.0 nie uległa zmianie.

### Daty wpływu

Poniżej znajduje się tabela każdej wersji Electron 1.4 i data, kiedy zapytań do stron korzystających z tych certyfikatów zacznie się nie powieść.

<table class="table table-ruled table-full-width">
    <thead>
        <tr class="text-left">
            <th>Wersja Electron</th>
            <th>Data wpływu</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1.3.x</td>
            <td>Unafferowane</td>
        </tr>
        <tr>
            <td>1.4.0</td>
            <td>Już nie powiodło się</td>
        </tr>
        <tr>
            <td>1.4.1</td>
            <td>Już nie powiodło się</td>
        </tr>
        <tr>
            <td>1.4.2</td>
            <td>Już nie powiodło się</td>
        </tr>
        <tr>
            <td>1.4.3</td>
            <td>10 grudnia, 2016 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.4</td>
            <td>10 grudnia, 2016 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.5</td>
            <td>10 grudnia, 2016 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.6</td>
            <td>14 stycznia 2017 r. 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.7</td>
            <td>14 stycznia 2017 r. 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.8</td>
            <td>14 stycznia 2017 r. 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.9</td>
            <td>14 stycznia 2017 r. 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.10</td>
            <td>14 stycznia 2017 r. 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.11</td>
            <td>11 lutego 2017 r. 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.12</td>
            <td>Unafferowane</td>
        </tr>
    </tbody>
</table>

Możesz zweryfikować datę oddziaływania aplikacji, ustawiając zegar komputera a następnie sprawdzić czy [https://symbeta. ymantec.com/welcome/](https://symbeta.symantec.com/welcome/) pomyślnie załadowano z niego.

## Więcej informacji

Możesz przeczytać więcej na ten temat, oryginalny problem i naprawić w następujących miejscach:

- [Czym jest przejrzystość certyfikatu?](https://www.certificate-transparency.org/what-is-ct)
- [Artykuł bazy wiedzy symbolicznej](https://knowledge.symantec.com/support/ssl-certificates-support/index?page=content&id=ALERT2160)
- [Zagadnienie Chrome 664177](https://bugs.chromium.org/p/chromium/issues/detail?id=664177)
- [Chrome fix dla wydania 664177](https://codereview.chromium.org/2495583002)
- [plaster z zawartością libchromu do wydania 664177](https://github.com/electron/libchromiumcontent/pull/248)

