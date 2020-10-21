---
title: Correzione Trasparenza Certificato
author: kevinsawicki
date: '2016-12-09'
---

Electron [1.4. 2](https://github.com/electron/electron/releases/tag/v1.4.12) contiene una patch importante che risolve un problema Chrome a monte dove alcuni Symantec, GeoTrust, e i certificati Thawte SSL/TLS sono erroneamente rifiutati 10 settimane dal tempo di compilazione di [libchromiumcontent](https://github.com/electron/libchromiumcontent), la libreria Chrome sottostante. Non ci sono problemi con i certificati utilizzati nei siti interessati e la sostituzione di questi certificati non aiuterà.

---

In Electron 1.4.0 &mdash; 1.4.11 le richieste HTTPS ai siti che utilizzano questi certificati interessati falliranno con errori di rete dopo una certa data. Questo influenza le richieste HTTPS fatte utilizzando le API di rete sottostanti di Chrome come la finestra `. etch`, Ajax requests, Electron's `net` API, `BrowserWindow. oadURL`, `contenuti web. oadURL`, l'attributo `src` su un tag `<webview>` e altri.

L'aggiornamento delle applicazioni a 1.4.12 impedirà che si verifichino questi fallimenti della richiesta .

**Nota:** Questo problema è stato introdotto in Chrome 53 in modo che le versioni di Electron precedenti di 1.4.0 non sono interessati.

### Date Di Impatto

Di seguito è riportata una tabella di ogni versione di Electron 1.4 e la data in cui richiede ai siti che utilizzano questi certificati interessati inizierà a fallire.

<table class="table table-ruled table-full-width">
    <thead>
        <tr class="text-left">
            <th>Versione Electron</th>
            <th>Data Impatto</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1.3.x</td>
            <td>Inalterato</td>
        </tr>
        <tr>
            <td>1.4.0</td>
            <td>Già fallito</td>
        </tr>
        <tr>
            <td>1.4.1</td>
            <td>Già fallito</td>
        </tr>
        <tr>
            <td>1.4.2</td>
            <td>Già fallito</td>
        </tr>
        <tr>
            <td>1.4.3</td>
            <td>10 Dicembre, 2016 9:00 PM Pst</td>
        </tr>
        <tr>
            <td>1.4.4</td>
            <td>10 Dicembre, 2016 9:00 PM Pst</td>
        </tr>
        <tr>
            <td>1.4.5</td>
            <td>10 Dicembre, 2016 9:00 PM Pst</td>
        </tr>
        <tr>
            <td>1.4.6</td>
            <td>14 Gennaio 2017 9:00 PM Pst</td>
        </tr>
        <tr>
            <td>1.4.7</td>
            <td>14 Gennaio 2017 9:00 PM Pst</td>
        </tr>
        <tr>
            <td>1.4.8</td>
            <td>14 Gennaio 2017 9:00 PM Pst</td>
        </tr>
        <tr>
            <td>1.4.9</td>
            <td>14 Gennaio 2017 9:00 PM Pst</td>
        </tr>
        <tr>
            <td>1.4.10</td>
            <td>14 Gennaio 2017 9:00 PM Pst</td>
        </tr>
        <tr>
            <td>1.4.11</td>
            <td>11 Febbraio 2017 9:00 PM Pst</td>
        </tr>
        <tr>
            <td>1.4.12</td>
            <td>Inalterato</td>
        </tr>
    </tbody>
</table>

Puoi verificare la data di impatto della tua app impostando l'orologio del tuo computer e quindi controllare se [https://symbeta. ymantec.com/welcome/](https://symbeta.symantec.com/welcome/) viene caricato con successo.

## Ulteriori Informazioni

È possibile leggere di più su questo argomento, il problema originale, e la correzione in luoghi seguenti:

- [Che cos’è la trasparenza dei certificati?](https://www.certificate-transparency.org/what-is-ct)
- [Articolo di base di conoscenze Symtantec](https://knowledge.symantec.com/support/ssl-certificates-support/index?page=content&id=ALERT2160)
- [Chrome problema 664177](https://bugs.chromium.org/p/chromium/issues/detail?id=664177)
- [Chrome correzione per il problema 664177](https://codereview.chromium.org/2495583002)
- [libchromiumcontent patch per il problema 664177](https://github.com/electron/libchromiumcontent/pull/248)

