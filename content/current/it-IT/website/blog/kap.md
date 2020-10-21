---
title: 'Progetto della settimana: Kap'
author:
  - skllcrn
  - sindresorhus
  - zeke
date: '2017-01-31'
---

La comunità di Electron sta crescendo rapidamente e le persone stanno creando nuove app e strumenti potenti ad un ritmo sorprendente. Per celebrare questo slancio creativo e tenere la comunità informata di alcuni di questi nuovi progetti, abbiamo deciso di avviare una serie di blog settimanali con interessanti progetti relativi a Electron.

---

Questo post è il primo della serie, e dispone di [Kap](https://getkap.co/), un'applicazione open source per la registrazione dello schermo costruita da [Wulkano](https://wulkano.com/), un team geodistribuito di progettisti e sviluppatori freelance.

[![Schermata Kap](https://cloud.githubusercontent.com/assets/2289/22439463/8f1e509e-e6e4-11e6-9c32-3a9db63fc9a1.gif)](https://getkap.co/)

## Che cos’è Kap?

[Kap è un registratore dello schermo open-source](https://getkap.co) costruito principalmente per progettisti e sviluppatori per catturare facilmente il loro lavoro. Le persone lo usano per condividere prototipi animati, bug del documento, creare GIF stupide e tutto in mezzo.

Abbiamo visto persone di tutte le età e sfondi utilizzarlo in impostazioni educative, screencasts, tutorial... la lista continua. Anche per creare asset di produzione! Siamo completamente spazzati via da quanto ben accolto il nostro piccolo progetto laterale è stato.

## Perché l'ha costruita?

Questa è una domanda molto buona, non è come se ci fosse una mancanza di registratori di schermo là fuori! Abbiamo ritenuto che le alternative fossero troppo complesse, troppo costose o troppo limitate. Niente si sentiva *giusto* per le nostre esigenze quotidiane. Pensiamo anche che sia bello quando gli strumenti che usiamo per fare il nostro lavoro sono open-source, in modo che tutti possano aiutarli a formarli. [Costruzione Kap è finito per essere altrettanto su quello che non abbiamo fatto](https://medium.com/wulkano-friends/from-idea-to-product-and-beyond-a12850403c38). È tutto nei dettagli, un accumulo di piccoli miglioramenti che è diventato il contorno di uno strumento che volevamo usare.

Tuttavia, e forse più importante, Kap è diventato un luogo per noi per lasciare le nostre preoccupazioni alla porta e solo divertirsi a costruire qualcosa per noi stessi e le persone come noi. E 'così importante creare un ambiente in cui si arriva a solo sfogliare, provare nuove sottili e godere il vostro mestiere. Nessun requisito, nessuna pressione, nessuna aspettativa. I progettisti e gli sviluppatori dovrebbero progettare lateralmente? Perché, sì. Sì, dovrebbero.

## Perché hai scelto di costruire Kap su Electron?

Ci sono state diverse ragioni:

* Web tech
* La maggior parte del team sono sviluppatori web
* Siamo investiti in JavaScript
* Si apre la porta a più persone per contribuire
* Electron stesso è open-source
* La potenza e la modularità facilmente mantenibile di `node_modules`
* Possibilità trasversali

Pensiamo che il futuro delle applicazioni siano nel browser, ma non siamo ancora abbastanza lì. Electron è un passo importante nel cammino verso quel futuro. Non solo rende le app stesse più accessibili, ma anche il codice con cui sono costruite. Un pensiero interessante sta immaginando un futuro in cui il sistema operativo è un browser, e le schede sono essenzialmente applicazioni Electron.

Inoltre, essendo principalmente sviluppatori web, siamo grandi fan della natura isomorfa di JavaScript, in quanto è possibile eseguire JS sul client, sul server e ora sul desktop. Con web tech (HTML, CSS e JS), molte cose sono molto più semplici del nativo: prototipazione più veloce, meno codice, flexbox > auto-layout (macOS/iOS).

## Quali sono alcune sfide che hai affrontato durante la costruzione di Kap?

Utilizzando le risorse Electron ha a disposizione per registrare lo schermo è stata la sfida più grande. Semplicemente non erano abbastanza performanti per soddisfare le nostre esigenze e renderebbero il progetto un fallimento nei nostri occhi. Anche se per nessuna colpa di Electron stesso, c'è ancora un divario tra lo sviluppo nativo e la costruzione di applicazioni desktop con web tech.

Abbiamo passato molto tempo a cercare di aggirare le scarse prestazioni dell'API `getUserMedia` di Chromium. Uno dei nostri obiettivi principali quando abbiamo deciso di fare Kap era quello di costruire l'intera app con web tech. Dopo aver provato tutto quello che potevamo per farlo funzionare (il requisito minimo è 30 FPS su uno schermo Retina), alla fine abbiamo dovuto trovare un'altra soluzione.

## Vedo un po' di codice Swift nel repo. Di cosa si tratta?

Essendo costretto a cercare alternative a `getUserMedia`, abbiamo iniziato a sperimentare con `ffmpeg`. Oltre ad essere uno dei migliori strumenti per la conversione audio e video ha la funzionalità di registrazione dello schermo in quasi tutti i sistemi operativi, e siamo stati in grado di registrare video croccante soddisfare il nostro requisito minimo di 30 FPS su uno schermo Retina. Problema? Le prestazioni erano ":weary:", l'utilizzo della CPU stava andando haywire. Siamo quindi tornati al tavolo, abbiamo discusso le nostre opzioni e ci siamo resi conto che dovevamo raggiungere un compromesso. Ciò ha portato a [Aperture](https://github.com/wulkano/aperture), la nostra libreria di registrazione dello schermo per macOS scritta in Swift.

## In quali settori bisognerebbe migliorare Electron?

Sappiamo tutti che le applicazioni Electron possono avere una cosa per usare la RAM, ma ancora una volta, è davvero una cosa di cromo. Fa parte di come funziona e dipende davvero da quello che stai correndo, per esempio Kap e Hyper usano in genere meno di 100MB di memoria.

Una delle più grandi aree di miglioramento che vediamo è il carico utile, in particolare come Electron distribuisce il cromo. Un'idea sarebbe quella di avere un nucleo di Electron condiviso e di rendere gli installatori di app controllare se è già presente sul sistema.

Creare applicazioni Electron multipiattaforma potrebbe essere un'esperienza migliore. In questo momento ci sono troppe incongruenze, API specifiche per la piattaforma e caratteristiche mancanti tra le piattaforme, rendendo il codice disseminato di istruzioni if-else . Ad esempio, la vibrazione è supportata solo su macOS, l'aggiornamento automatico funziona diversamente su macOS e Windows e non è nemmeno supportato su Linux. La trasparenza è un successo o una mancanza su Linux, di solito manca.

Dovrebbe anche essere più facile chiamare API sistema nativo. Electron viene fornito con un ottimo set di API, ma a volte hai bisogno di funzionalità che non fornisce. Creare un addon nativo Node.js è un'opzione, ma è doloroso lavorare con. Idealmente Electron avrebbe spedito con una buona API [FFI](https://en.wikipedia.org/wiki/Foreign_function_interface) , come [`fastcall`](https://github.com/cmake-js/fastcall). Questo ci avrebbe permesso di scrivere la parte Swift in JavaScript.

## Quali sono le tue cose preferite di Electron?

La nostra cosa preferita è facilmente il fatto che chiunque con la conoscenza di creare per il web può costruire e contribuire a esperienze native multi-piattaforma. Per non parlare della facilità e della gioia di sviluppare su di esso, l'eccellente documentazione e l'ecosistema fiorente.

Dal punto di vista front-end, la costruzione di Kap non si sentiva diversa dalla costruzione di un semplice sito web utilizzando le API del browser. Electron fa un lavoro davvero grande di rendere lo sviluppo di app simile (fondamentalmente identico) allo sviluppo web. Così semplice infatti che non c'era bisogno di quadri o simili per aiutarci, solo JS e CSS puliti e modulari.

Siamo anche grandi fan del team che lo costruisce, la loro dedizione e il loro sostegno, e la comunità attiva e amichevole che mantengono. Abbracci a tutti voi!

## Cosa sta succedendo a Kap?

Il prossimo passo per noi è quello di rivedere l'app in preparazione per il nostro 2.0. milestone, che include una riscrittura React oltre al supporto per i plugin, consentendo agli sviluppatori di estendere la funzionalità di Kap! Invitiamo tutti a seguire il progetto e a contribuire sul nostro [repository GitHub](https://github.com/wulkano/kap). Stiamo ascoltando e vogliamo sentire il maggior numero possibile di voi, [fateci sapere come possiamo fare di Kap il miglior strumento possibile per voi](https://wulkano.typeform.com/to/BIvJKz)!

## Che cos’è Wulkano?

[Wulkano](https://wulkano.com) è uno studio di design e un collettivo digitale, un team di tecnici remoti che amano lavorare insieme sia per i clienti che per i nostri progetti. Siamo un gruppo distribuito ma stretto di persone provenienti da diversi luoghi e sfondi, condividendo conoscenze, idee, esperienze, ma soprattutto GIF e memi sciocche, nel nostro ufficio virtuale (che sembra essere la Slack basata su Electron!).

## Eventuali suggerimenti Electron che potrebbero essere utili ad altri sviluppatori?

Approfitta della fantastica [community](https://discuss.atom.io/c/electron), dai un'occhiata a [Awesome Electron](https://github.com/sindresorhus/awesome-electron), guarda [esempi](https://github.com/electron/electron-api-demos) e usa i grandi [documenti](https://electronjs.org/docs/)!

