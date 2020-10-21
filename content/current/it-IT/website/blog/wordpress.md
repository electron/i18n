---
title: 'Progetto della settimana: WordPress Desktop'
author:
  - mkaz
  - johngodley
  - zeke
date: '2017-02-28'
---

Questa settimana abbiamo preso con persone a [Automattic](https://automattic.com/) per parlare di [WordPress Desktop](https://apps.wordpress.com/desktop/), un client desktop open-source per la gestione dei contenuti di WordPress.

---

[![Applicazioni WordPress](https://cloud.githubusercontent.com/assets/2289/23391881/ea54d52e-fd2c-11e6-86ec-98fe466d5c5c.gif)](https://apps.wordpress.com/desktop/)

## Tutti sanno di WordPress, ma che cosa è WordPress Desktop?

La [WordPress. om Desktop app](https://apps.wordpress.com/desktop/) offre un'esperienza multi-piattaforma senza soluzione di continuità che ti permette di concentrarti sui tuoi contenuti e sul design senza schede del browser per distrarti o per tenere i tuoi siti accesi ma accessibili. In combinazione con il supporto del browser e l'app mobile, puoi costruire il tuo sito ovunque, in qualsiasi modo ti aiuti a fare il tuo lavoro.

## Perché costruire un'app Desktop per la gestione dei siti WordPress? Non è stato possibile basare tutto sul web?

In realtà sta utilizzando esattamente la stessa tecnologia che si ottiene quando si visita [WordPress.com](https://wordpress.com) nel tuo browser. Tuttavia, è tutto localmente ospitato, quindi ha tempi di carico minimi. Con il vantaggio di caratteristiche native, come ad esempio essere nel vostro dock, notifiche, ecc, si può davvero concentrarsi sui vostri siti WordPress e blogging.

## Perché hai scelto di costruire WordPress Desktop su Electron?

Alla fine del 2015 abbiamo ricostruito gran parte di WordPress.com sotto forma di [Calypso](https://github.com/automattic/wp-calypso), una moderna app open source JavaScript utilizzando React. Abbiamo iniziato a guardare Electron e con alcune modifiche a Calypso sono stati in grado di farlo funzionare localmente. E' stata un'esperienza avvincente e abbiamo pensato che ci fosse molto valore per svilupparla ulteriormente.

Abbiamo avuto diverse squadre di lavoro su Calypso. Per fare un client GUI multi-piattaforma completo che ha abbinato questo utilizzando le tecnologie desktop tradizionali avrebbe preso più lavoro. Utilizzando Electron, un piccolo team di 2-4 di noi è stato in grado di sfruttare gli sforzi dell’altra squadra e costruire l’app Desktop in un paio di mesi.

## Quali sono alcune sfide che hai affrontato durante la costruzione di WordPress Desktop?

Abbiamo ottenuto una versione iniziale dell'app in esecuzione molto rapidamente, ma sintonizzarlo per comportarsi in modo ottimale come un'applicazione desktop ha richiesto molto più tempo. Una grande sfida con l'app è che stai effettivamente eseguendo una copia di Calypso sulla tua macchina - è puramente un API driven UI. C'era un sacco di lavoro ponte coinvolti in questo, e i cambiamenti sono stati alimentati di nuovo a Calypso stesso.

Inoltre è stato speso molto sforzo per confezionare l'app per diverse piattaforme - forniamo Windows, versioni macOS, e Linux - e ci sono differenze sufficienti per rendere questo complicato.

Al momento Electron era relativamente nuovo e abbiamo continuato a correre in problemi che sono stati presto risolti (a volte lo stesso giorno!)

## In quali settori bisognerebbe migliorare Electron?

Electron fornisce già la maggior parte di ciò di cui abbiamo bisogno per l'applicazione desktop, ed è progredito rapidamente da quando abbiamo iniziato a usarlo. Detto questo, ci sono alcune aree che vengono date per scontate in un app desktop, come il controllo ortografico e la ricerca / sostituzione, che sono più difficili da replicare con Electron as-is.

Ci piacerebbe anche vedere alcune delle più recenti tecnologie Chrome filtrare giù in Electron troppo. Siamo particolarmente interessati a sperimentare con WebVR.

## Quali sono le tue cose preferite di Electron?

Il motivo principale per cui abbiamo scelto Electron, ed è la più grande forza, è la comunità molto attiva e aperta. Automattic ha sempre creduto in open source. È uno dei nostri principi principali, e il progetto e la comunità di Electron seguono molte delle credenze fondamentali di essere molto aperti e positivi.

## Cosa sta succedendo in WordPress Desktop?

La cosa grande del nostro modello è che l'applicazione Desktop beneficia di qualsiasi nuova funzione Calypso - ci sono miglioramenti costanti. Speriamo di poter aggiungere ulteriori funzionalità all'app come il supporto offline, che realmente prendere l'app in territorio nativo, e migliori notifiche di sistema.

## Ci sono dei team di Automattic che lavorano su altre app Electron?

Sì, dopo i nostri sforzi sull'app desktop, il team Simplenote ha deciso di utilizzare Electron per creare applicazioni desktop per Windows e Linux (un client Mac nativo esiste già). L'app [Simplenote Electron](https://github.com/Automattic/simplenote-electron) è anche open source e disponibile su Github.

Abbiamo anche una prossima integrazione Raspberry Pi che utilizza Electron.

If any of that sounds interesting then we'd [love to hear from you](https://automattic.com/work-with-us/)!

## Eventuali suggerimenti Electron che potrebbero essere utili ad altri sviluppatori?

Il processo di spedizione firmata software desktop è relativamente nuovo per noi, in particolare per Windows. abbiamo scritto un articolo per [Code Signing a Windows App](https://mkaz.blog/code/code-signing-a-windows-application/) che include il processo e alcuni degli ostacoli che abbiamo attraversato per farlo bene.

