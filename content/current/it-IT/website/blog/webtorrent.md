---
title: 'Progetto della settimana: WebTorrent'
author:
  - feros
  - zeke
date: '2017-03-14'
---

Questa settimana abbiamo incontrato [@feross](https://github.com/feross) e [@dcposch](https://github.com/dcposch) per parlare di WebTorrent, il client torrent web-powered che collega gli utenti insieme per formare una rete di browser distribuita e decentralizzata.

---

## Che cos’è WebTorrent?

[WebTorrent](https://webtorrent.io) è il primo client torrent che funziona nel browser. È scritto completamente in JavaScript e può utilizzare WebRTC per il trasporto peer-to-peer. Non è richiesto alcun plugin del browser, estensione o installazione.

Utilizzando standard web aperti, WebTorrent connette gli utenti del sito web insieme per formare una rete di browser distribuita e decentralizzata per un trasferimento efficiente di file.

Puoi vedere una demo di WebTorrent in azione qui: [webtorrent.io](https://webtorrent.io/).

<a href="https://webtorrent.io/">
  <img alt="webtorrent homepage" src="https://cloud.githubusercontent.com/assets/2289/23912149/1543d2ce-089c-11e7-8519-613740c82b47.jpg">
</a>

## Perché questo è cool?

Immaginate un sito video come YouTube, ma dove i visitatori aiutano ad ospitare il contenuto del sito. Più persone utilizzano un sito web alimentato da WebTorrent, più veloce e più resiliente.

La comunicazione da browser a browser taglia il medio-uomo e permette alle persone di comunicare ai propri termini. Niente più client/server – solo una rete di pari, tutti uguali. WebTorrent è il primo passo nel viaggio per ri-decentralizzare il Web.

## Dove entra in scena Electron?

Circa un anno fa, abbiamo deciso di costruire [WebTorrent Desktop](https://webtorrent.io/desktop/), una versione di WebTorrent che viene eseguita come app desktop.

[![Finestra del lettore Desktop WebTorrent](https://cloud.githubusercontent.com/assets/2289/23912152/154aef0a-089c-11e7-8544-869b0cd642b1.jpg)](https://webtorrent.io/desktop/)

Abbiamo creato WebTorrent Desktop per tre motivi:

1. Volevamo un'app per torrent open source pulita, leggera, senza pubblicità
2. Volevamo un'app torrent con un buon supporto per lo streaming
3. Abbiamo bisogno di un "client ibrido" che colleghi le reti BitTorrent e WebTorrent

## Se siamo già in grado di scaricare torrent nel mio browser web, perché un app desktop?

In primo luogo, un po 'di sfondo sul design di WebTorrent.

<a href="https://webtorrent.io/desktop/">
  <img alt="logo desktop webtorrent" src="https://cloud.githubusercontent.com/assets/2289/23912151/154657e2-089c-11e7-9889-6914ce71ebc9.png" width="200" align="right">
</a>

Nei primi giorni, BitTorrent ha utilizzato TCP come protocollo di trasporto. Più tardi, uTP è venuto lungo promettenti migliori prestazioni e vantaggi aggiuntivi rispetto a TCP. Ogni client torrent mainstream alla fine ha adottato uTP, e oggi è possibile utilizzare BitTorrent su entrambi i protocolli. Il protocollo WebRTC è il passo logico successivo. Porta la promessa di interoperabilità con i browser web – una gigantesca rete P2P composta da tutti i client desktop BitTorrent e milioni di browser web.

“Web peers” (peer torrent che vengono eseguiti in un browser web) rendere la rete BitTorrent più forte aggiungendo milioni di nuovi peer, e diffondendo BitTorrent a decine di nuovi casi di utilizzo. WebTorrent segue la specifica BitTorrent il più vicino possibile, per rendere facile per i client BitTorrent esistenti per aggiungere il supporto per WebTorrent.

Alcune applicazioni torrent come [Vuze](https://www.vuze.com/) supportano già i web peer, ma non volevamo aspettare il resto per aggiungere supporto. **Quindi, fondamentalmente, WebTorrent Desktop è stato il nostro modo di accelerare l'adozione del protocollo WebTorrent.** Facendo un fantastico app torrent che le persone vogliono davvero usare, aumentiamo il numero di peer nella rete che possono condividere torrent con web peers (i. . utenti sui siti web).

## Quali sono alcuni casi d'uso interessanti per i torrent al di là di ciò che la gente sa già che possono fare?

Uno degli usi più emozionanti per WebTorrent è la consegna assistita da pari. Progetti senza scopo di lucro come [Wikipedia](https://www.wikipedia.org/) e [Internet Archive](https://archive.org/) potrebbero ridurre la larghezza di banda e i costi di hosting consentendo ai visitatori di effettuare il chip in. I contenuti popolari possono essere serviti dal browser al browser, in modo rapido ed economico. I contenuti accessibili raramente possono essere serviti in modo affidabile su HTTP dal server di origine.

L'Archivio Internet ha effettivamente già aggiornato i loro file torrent in modo che funzionino bene con WebTorrent. Quindi, se si desidera incorporare contenuto di Archivio Internet sul vostro sito, puoi farlo in modo da ridurre i costi di hosting per l'Archivio, permettendo loro di dedicare più soldi per archiviare realmente il web!

Ci sono anche eccitanti casi di utilizzo aziendale, dai CDN alla consegna di app su P2P.

## Quali sono alcuni dei vostri progetti preferiti che utilizzano WebTorrent?

![schermata app gaia](https://cloud.githubusercontent.com/assets/2289/23912148/154392c8-089c-11e7-88a8-3d4bcb1d2a94.jpg)

La cosa più cool costruita con WebTorrent, mani in giù, è probabilmente [Gaia 3D Star Map](http://charliehoey.com/threejs-demos/gaia_dr1.html). Si tratta di una sottile simulazione interattiva 3D della Via Lattea. I dati vengono caricati da un torrent, proprio nel tuo browser. E 'incredibilmente stimolante volare attraverso il nostro sistema stellare e capire quanto poco noi umani sono paragonati alla vastità del nostro universo.

Puoi leggere come questo è stato fatto in [Torrenting The Galaxy](https://medium.com/@flimshaw/torrenting-the-galaxy-extracting-2-million-3d-stars-from-180gb-of-csvs-457ff70c0f93), un post sul blog in cui l'autore, Charlie Hoey, spiega come ha costruito la mappa stellare con WebGL e WebTorrent.

<a href="https://brave.com/">
  <img alt="logo coraggioso" src="https://cloud.githubusercontent.com/assets/2289/23912147/1542ad4a-089c-11e7-8106-15c8e34298a9.png" width="150" align="left">
</a>

Siamo anche grandi fan di [Brave](https://brave.com/). Brave è un browser che blocca automaticamente gli annunci e i tracker per rendere il web più veloce e sicuro. Brave ha recentemente aggiunto il supporto al torrent in modo da poter [visualizzare i torrent tradizionali senza utilizzare un'applicazione separata](https://torrentfreak.com/brave-a-privacy-focused-browser-with-built-in-torrent-streaming-170219/). Quella funzione è alimentata da WebTorrent.

Così, proprio come la maggior parte dei browser può rendere i file PDF, Brave può rendere i collegamenti magnetici e file torrent. Sono solo un altro tipo di contenuto che il browser supporta nativamente.

Uno dei co-fondatori di Brave è in realtà Brendan Eich, il creatore di JavaScript, la lingua in cui abbiamo scritto WebTorrent, quindi pensiamo che sia abbastanza bello che Brave abbia scelto di integrare WebTorrent.

## Perché hai scelto di costruire WebTorrent Desktop su Electron?

<a href="https://webtorrent.io/desktop/">
  <img alt="Finestra principale del desktop WebTorrent" src="https://cloud.githubusercontent.com/assets/2289/23912150/15444542-089c-11e7-91ab-7fe3f1e5ee43.jpg" align="right" width="450">
</a>

C'è un meme che le applicazioni Electron sono "bloated" perché includono l'intero modulo di contenuti Chrome in ogni app. In alcuni casi, questo è parzialmente vero (un installatore di app Electron è di solito ~40MB, dove un installatore di app specifico per il sistema operativo è di solito ~20MB).

Tuttavia, nel caso di WebTorrent Desktop, utilizziamo quasi ogni funzione Electron e molte decine di caratteristiche Chrome nel corso del normale funzionamento. Se volevamo implementare queste funzionalità da zero per ogni piattaforma, ci sarebbero voluti mesi o anni più per costruire la nostra app, o avremmo potuto rilasciare solo per una singola piattaforma.

Solo per avere un'idea, usiamo l'integrazione [dock](https://electronjs.org/docs/api/app/#appdockbouncetype-macos) di Electron's (per mostrare il progresso di download), [integrazione nella barra dei menu](https://electronjs.org/docs/api/menu) (da eseguire in background), [registrazione gestore protocollo](https://electronjs.org/docs/api/app/#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) (per aprire collegamenti magnetici), [blocco di risparmio energetico](https://electronjs.org/docs/api/power-save-blocker/) (per evitare il sonno durante la riproduzione video) e [aggiornatore automatico](https://electronjs.org/docs/api/auto-updater). Per quanto riguarda le funzionalità di Chrome, usiamo molto: il tag `<video>` (per riprodurre molti formati video diversi), il tag `<track>` (per il supporto per le didascalie chiuse), trascinare e rilasciare il supporto e WebRTC (che non è banale da usare in un'app nativa).

Per non menzionare: il nostro motore torrent è scritto in JavaScript e assume l'esistenza di un sacco di API Node, ma soprattutto `require('net')` e `require('dgram')` per il supporto del socket TCP e UDP.

Fondamentalmente, Electron è proprio quello che ci serviva e aveva l'esatta serie di caratteristiche di cui avevamo bisogno per spedire un'app solida e lucidata in tempo record.

## Quali sono le tue cose preferite di Electron?

La libreria WebTorrent è in sviluppo come progetto open source lato per due anni. **Abbiamo fatto WebTorrent Desktop in quattro settimane.** Electron è il motivo principale per cui siamo stati in grado di costruire e spedire la nostra app così rapidamente.

Proprio come Node. s ha reso la programmazione del server accessibile ad una generazione di programmatori jQuery che utilizzano il front-end, Electron rende lo sviluppo nativo delle app accessibile a chiunque abbia familiarità con il Web o il Node. s sviluppo. Electron è estremamente abilitante.

## Il sito web e il codice di condivisione client desktop?

Sì, il pacchetto [`webtorrent` npm](https://npmjs.com/package/webtorrent) funziona in Node.js, nel browser e in Electron. Lo stesso codice può essere eseguito in tutti gli ambienti – questa è la bellezza di JavaScript. È la corsa universale di oggi. Java Applets ha promesso "Scrivi una volta, Esegui ovunque" apps, ma quella visione non si è mai materializzata per una serie di motivi. Electron, più di qualsiasi altra piattaforma, in realtà diventa piuttosto darn vicino a quell'ideale.

## Quali sono alcune sfide che hai affrontato durante la costruzione di WebTorrent?

Nelle prime versioni dell'app, abbiamo lottato per rendere l'interfaccia utente performante. Abbiamo messo il motore torrent nello stesso processo di rendering che disegna la finestra principale dell'app che, prevedibilmente, ha portato a lentezza in qualsiasi momento c'è stata intensa attività CPU dal motore torrent (come verificare i pezzi torrent ricevuti da peers).

Abbiamo fissato questo spostando il motore torrent ad un secondo processo di renderer invisibile che comunichiamo con oltre [IPC](https://electronjs.org/docs/api/ipc-main/). In questo modo, se questo processo utilizza brevemente un sacco di CPU, il thread dell'interfaccia utente non sarà influenzato. Scorrimento liscio del burro e animazioni sono così soddisfacenti.

Nota: abbiamo dovuto mettere il motore torrent in un processo di renderer, invece di un processo "principale", perché abbiamo bisogno di accesso a WebRTC (che è disponibile solo nel renderer.)

## In quali settori bisognerebbe migliorare Electron?

Una cosa che ci piacerebbe vedere è una migliore documentazione su come costruire e spedire applicazioni pronti per la produzione, soprattutto intorno a soggetti difficili come la firma del codice e l'aggiornamento automatico. Abbiamo dovuto imparare le migliori pratiche scavando nel codice sorgente e chiedendo in giro su Twitter!

## Il desktop di WebTorrent è fatto? In caso contrario, cosa succederà?

Pensiamo che l'attuale versione di WebTorrent Desktop sia eccellente, ma c'è sempre spazio per miglioramenti. Attualmente stiamo lavorando per migliorare il supporto di polacchi, prestazioni, sottotitoli e video codec supporto.

Se sei interessato a partecipare al progetto, consulta [la nostra pagina GitHub](https://github.com/feross/webtorrent-desktop)!

## Eventuali suggerimenti per lo sviluppo di Electron che potrebbero essere utili ad altri sviluppatori?

[Feross](http://feross.org/), uno dei collaboratori del desktop WebTorrent, recentemente ha tenuto un colloquio *"Real world Electron: Building Cross-platform desktop apps with JavaScript"* a NodeConf Argentina che contiene suggerimenti utili per il rilascio di un'app Electron lucida. Il discorso è particolarmente utile se sei nella fase in cui hai un'app di lavoro di base e stai cercando di portarlo al livello successivo di lucidatura e professionalità.

[Guarda qui](https://www.youtube.com/watch?v=YLExGgEnbFY): <iframe width="100%" height="360" src="https://www.youtube.com/embed/YLExGgEnbFY?rel=0" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

[Diapositive qui](https://speakerdeck.com/feross/real-world-electron):

<script async class="speakerdeck-embed" data-id="5aae08bb7c5b4dbd89060cff11bb1300" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

[DC](https://dcpos.ch/), un altro collaboratore di WebTorrent, ha scritto [una lista di controllo delle cose che puoi fare](https://blog.dcpos.ch/how-to-make-your-electron-app-sexy) per far sentire la tua app lucida e nativa. Viene fornito con esempi di codice e copre cose come integrazione dock macOS, drag-and-drop, notifiche desktop, e assicurandosi che la tua app carica rapidamente.

