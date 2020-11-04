---
title: 'Progetto della settimana: Jasper'
author:
  - h13i32maru
  - watilde
  - zeke
date: '2017-03-21'
---

Questa settimana abbiamo intervistato il creatore di [Jasper](https://jasperapp.io), uno strumento basato su Elettronica per gestire le notifiche GitHub.

---

## Ciao! Chi sei?

Sono [Ryo Maruyama](https://github.com/h13i32maru), uno sviluppatore di software in Giappone. Sto sviluppando [Jasper](https://jasperapp.io) e [ESDoc](https://esdoc.org).

## Che cos’è Jasper?

[Jasper](https://jasperapp.io) è un lettore di problemi flessibile e potente per GitHub. Supporta problemi e richieste di pull su github.com e GitHub Enterprise.

[![Schermata App Jasper](https://cloud.githubusercontent.com/assets/2289/24108647/75ef131e-0d4b-11e7-945b-27dd50cb03ab.png)](https://jasperapp.io/)

## Perché l'ha fatta?

Quando le persone usano GitHub nel loro lavoro o attività OSS, tendono a ricevere molte notifiche su base giornaliera. Come modo per iscriversi alle notifiche, GitHub fornisce e-mail e [notifiche web](https://github.com/notifications). Ho usato questi per un paio di anni, ma ho affrontato i seguenti problemi:

- È facile trascurare i problemi in cui sono stato menzionato, ho commentato, o sto guardando.
- Ho messo alcuni problemi in un angolo della mia testa per controllare più tardi, ma a volte mi dimentico di loro.
- Per non dimenticare problemi, mantengo molte schede aperte nel mio browser.
- È difficile controllare tutti i problemi che sono legati a me.
- È difficile cogliere tutte le attività della mia squadra.

Stavo spendendo molto tempo ed energia cercando di prevenire questi problemi, così ho deciso di fare un lettore di problemi per GitHub per risolvere questi problemi in modo efficiente, e ha iniziato a sviluppare Jasper.

## Chi sta usando Jasper?

Jasper è utilizzato da sviluppatori, designer e manager in diverse aziende che utilizzano GitHub. Naturalmente, anche alcuni sviluppatori OSS lo stanno utilizzando. Ed è anche usato da alcune persone a GitHub!

<a href="https://twitter.com/mistydemeo/status/778841101109080064"><img src="https://cloud.githubusercontent.com/assets/2289/24108650/75f87706-0d4b-11e7-8fcb-9fbedf2f66ea.png" width="500"></a>

<a href="https://twitter.com/jna_sh/status/798283937344651264"><img src="https://cloud.githubusercontent.com/assets/2289/24108649/75f4b9e0-0d4b-11e7-9701-24a0ef251ad2.png" width="500"></a>

## Come agisce Jasper?

Una volta che Jasper è configurato, appare la seguente schermata. Da sinistra a destra, puoi vedere "lista dei flussi", "lista dei problemi" e "corpo dei problemi".

[![Schermata Iniziale Jasper](https://cloud.githubusercontent.com/assets/2289/24108645/75ae3786-0d4b-11e7-9a1a-3c270ae33cba.png)](https://jasperapp.io/)

Questo "stream" è la caratteristica principale di Jasper. Ad esempio, se si desidera vedere "problemi che sono assegnati a @zeke nel repository elettronico/elettronica", si crea il seguente stream:

```
repo:electron/electron assignee:zeke è:issue
```

[![Schermata Iniziale Jasper 2](https://cloud.githubusercontent.com/assets/2289/24108648/75f403ec-0d4b-11e7-9ed4-4599ecd26b78.png)](https://jasperapp.io/)

Dopo aver creato il flusso e attendere alcuni secondi, è possibile vedere i problemi che soddisfano le condizioni.

[![Schermata Iniziale Jasper 3](https://cloud.githubusercontent.com/assets/2289/24108646/75b7fea6-0d4b-11e7-9d05-7dd4e595403c.png)](https://jasperapp.io/)

## Cosa possiamo fare con i flussi?

Presenterò che tipo di condizioni possono essere utilizzate per il flusso.

### Utenti e squadre

| Stream                                        | Problemi                                                                 |
| --------------------------------------------- | ------------------------------------------------------------------------ |
| `menzioni:gatto menzioni:cane`                | Problemi che menzionano l'utente `gatto` o `cane`                        |
| `autore:cat-autore:cane`                      | Problemi creati dall'utente `gatto` o `cane`                             |
| `assegnatario:gatto assegnato:cane`           | Problemi assegnati a `gatto` o `cane`                                    |
| `commenter:cat commenter:dog`                 | Problemi che `gatto` o `cane` hanno commentato su                        |
| `coinvolgi:il gatto coinvolge:cane`           | Problemi che "involve" `cat` o `bob`                                     |
| `team:animal/white-cat team:animal/black-dog` | Problemi che `animale/white-cat` o `animal/black-dog` sono menzionati in |

`coinvolge` significa `menzione`, `autore`, `assegnatario` o `commentatore`

### Repositories ed Organizzazioni

| Stream                           | Problemi                               |
| -------------------------------- | -------------------------------------- |
| `repo:cat/jump repo:dog/run`     | Problemi in `cat/jump` o `dog/run`     |
| `org:electron user:cat user:dog` | Problemi in `electron`, `cat` or `dog` |

`org` è uguale a `utente`

### Attributi

| Stream                                            | Problemi                                               |
| ------------------------------------------------- | ------------------------------------------------------ |
| `repo:cat/jump milestone:v1.0.0 milestone:v1.0.1` | Problemi collegati a `v1.0.0` o `v1.0.1` in `cat/jump` |
| `repo:cat/jump label:bug label:blocker`           | Problemi allegati `bug` **e** `blocker` in `cat/jump`  |
| `Elettronica O atomshell`                         | Problemi che includono `electron` o `atomshell`        |

### Stato Di Revisione

| Stream                       | Problemi                                                                                              |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- |
| `is:pr review:required`      | Problemi che sono richiesti revisione in `gatto/salto`                                                |
| `is:pr review-requested:cat` | Problemi che sono richiesti di revisione da `gatto`. <br/> Ma questi non sono ancora recensiti. |
| `is:pr revisionato da:cat`   | Problemi che sono esaminati da `gatto`                                                                |

<br/>

Come potresti aver notato guardando questi, i flussi possono utilizzare le query di ricerca di GitHub . Per maggiori informazioni su come utilizzare gli stream e cercare interrogazioni, vedere i seguenti URL.

- [jasperapp.io/doc.html#stream](https://jasperapp.io/doc.html#stream)
- [help.github.com/articles/searching-issues](https://help.github.com/articles/searching-issues/)
- [help.github.com/articles/search-syntax](https://help.github.com/articles/search-syntax/)

Jasper ha anche caratteristiche per la gestione dei problemi non letti, la gestione dei commenti non letti, le stelle di marcatura, l'aggiornamento delle notifiche, i problemi di filtraggio, le scorciatoie da tastiera, ecc.

## Jasper è un prodotto pagato? Quanto costa?

Jasper è $12. Tuttavia è possibile utilizzare l'edizione di prova gratuita [](https://jasperapp.io/) per 30 giorni.

## Perché hai scelto di costruire Jasper su Electron?

Mi piacciono i seguenti aspetti di Electron:

- Le applicazioni possono essere sviluppate con JavaScript/CSS/HTML.
- Le applicazioni possono essere costruite per le piattaforme Windows, Mac e Linux.
- Electron è attivamente sviluppato e ha una grande comunità.

Queste funzionalità consentono uno sviluppo rapido e semplice delle applicazioni desktop. È fantastico! Se avete qualche idea di prodotto, si dovrebbe prendere in considerazione l'uso di Electron con tutti i mezzi.

## Quali sono alcune sfide che hai affrontato durante lo sviluppo di Jasper?

Ho avuto difficoltà a capire il concetto di "stream". All'inizio ho preso in considerazione l'utilizzo dell'API [Notifiche di GitHub](https://developer.github.com/v3/activity/notifications/). Comunque ho notato che non supporta alcuni casi di utilizzo. Dopo di che ho considerato di utilizzare l'API [Problemi](https://developer.github.com/v3/issues/) e [Pull Requests API](https://developer.github.com/v3/pulls/), in aggiunta all'API di notifica. Ma non è mai diventato quello che volevo. Poi, mentre pensavo a vari metodi, mi sono reso conto che il sondaggio di GitHub [Search API](https://developer.github.com/v3/search/) offrirebbe la massima flessibilità. Ci è voluto circa un mese di sperimentazione per arrivare a questo punto, poi ho implementato un prototipo di Jasper con il concetto di flusso in due giorni.

Nota: Il sondaggio è limitato a una volta ogni 10 secondi al massimo. Questo è abbastanza accettabile per la restrizione di GitHub API.

## Cosa succederà?

Ho un piano per sviluppare le seguenti caratteristiche:

- **Un flusso filtrato**: Un flusso ha un flusso filtrato che filtra i problemi nel flusso. È come la vista di SQL.
- **Account multipli**: sarai in grado di utilizzare sia github.com che GHE
- **Migliora le prestazioni**: Per ora il caricamento di un problema in WebView è a bassa velocità rispetto al normale browser.

Segui [@jasperappio](https://twitter.com/jasperappio) su Twitter per aggiornamenti.

