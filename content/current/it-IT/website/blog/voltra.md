---
title: 'Progetto della settimana: Voltra'
author:
  - '0x00A'
  - aprileelcich
  - zeke
date: '2017-03-07'
---

Questa settimana abbiamo incontrato [Aprile Elcich](https://twitter.com/aprileelcich) e [Paolo Fragomeni](https://twitter.com/0x00A) per parlare di Voltra, un musicista elettronico.

---

## Che cos’è Voltra?

[Voltra](https://voltra.co/) è un lettore musicale per le persone che vogliono possedere la loro musica. E 'anche un negozio dove è possibile scoprire e acquistare nuova musica in base a quello che già possiedi. E 'senza pubblicità, cross-piattaforma per desktop e mobile. Inoltre non ti spia.

[![voltra-artistview](https://cloud.githubusercontent.com/assets/2289/23670061/4db0323c-031b-11e7-81fd-128e714e911c.jpg)](https://voltra.co/)

## Per chi è Voltra?

Chiunque ascolti la musica.

## Cosa ti ha motivato a creare Voltra?

Radio ha sempre avuto una grande parte di ascoltatori. Si sta muovendo fuori dalle onde aeree e su Internet. Ora puoi noleggiare musica su richiesta — è un risveglio radio! Per questo motivo sono emersi molti nuovi prodotti e servizi, ma la radio in streaming lascia ancora qualcun altro nel controllo della tua musica e come la sperimenti.

Volevamo un prodotto che si concentrasse interamente sulla musica che possiedi. Qualcosa che ha reso facile scoprire e acquistare nuova musica direttamente da artisti o etichette.

## C'è una versione gratuita?

Il lettore desktop è completamente gratuito. [Vendere la tua musica è anche gratuito!](https://voltra.co/artists) Non siamo supportati dalla pubblicità.

Dal momento che l'app è gratuita, possiamo open source più tardi. In questo momento non abbiamo la larghezza di banda per gestirlo. Abbiamo anche idee molto specifiche per le caratteristiche e la direzione che vogliamo prendere le cose. Abbiamo una comunità beta attiva e prendiamo a cuore il nostro feedback.

## Come fai dei soldi?

Abbiamo funzionalità premium!

Il nostro [Voltra Audio Archive](https://voltra.co/premium/) è un servizio di backup cloud progettato appositamente per la musica. Non comprimiamo o condividiamo blocchi di dati. La tua collezione musicale è stata salvata fisicamente per te.

Per gli artisti e le etichette, il nostro [Pro Membership](https://voltra.co/artists/pro) offre strumenti per aiutarli a raggiungere un pubblico più rilevante, come le pagine web di analisi e artisti professionali.

## Cosa rende Voltra diverso?

Design e usabilità sono incredibilmente importanti per noi. Vogliamo dare agli ascoltatori un'esperienza di ascolto senza distrazioni! Ci sono alcuni interessanti lettori musicali e negozi là fuori. Ma molti di loro sono più avanzati e più difficili da usare di quanto i loro creatori realizzano. Vogliamo rendere Voltra accessibile a quante più persone possibile.

Non prendiamo nemmeno un taglio dall'artista o dall'etichetta. Questo è un differenziatore chiave per noi. E 'davvero importante perché abbassa la barriera per gli artisti per ottenere la loro musica sul mercato.

## Quali sono alcuni design & decisioni tecniche che hai preso?

Durante la progettazione di Voltra, abbiamo considerato convenzioni UI da applicazioni native e il web, abbiamo anche pensato molto a quello che potremmo rimuovere. Abbiamo un gruppo beta privato attivo che ci ha dato un feedback critico negli ultimi mesi.

Abbiamo scoperto che l'arte dell'album e la fotografia sono davvero importanti per la gente. Molti giocatori sono solo elenchi di file. Una delle cose interessanti del possedere gli album fisici è l'arte dell'album, e abbiamo voluto mettere l'accento su questo nell'app Voltra desktop.

[![voltra-albumview](https://cloud.githubusercontent.com/assets/2289/23670056/4b0c18d4-031b-11e7-89e1-539e927a380d.jpg)](https://voltra.co/)

Abbiamo anche fatto in modo di non pasticciare con i file delle persone. Usiamo il file watching in modo da poter mettere i file dove vuoi, e non rinominarli o spostarli per te. Abbiamo un database incorporato per monitorare lo stato delle directory guardate in modo da poter tracciare ciò che è nuovo, anche quando il processo non è in esecuzione.

## Quali sono alcune sfide che hai affrontato durante la costruzione di Voltra?

Passiamo un sacco di tempo focalizzato sulle prestazioni. Abbiamo iniziato con i frameworks ma spostato in vaniglia Javascript. Nella nostra esperienza, le astrazioni generalizzate che forniscono superano le penalità di prestazione e la cerimonia che introdurranno.

Gestiamo le collezioni molto grandi abbastanza bene a questo punto. Grandi collezioni significa forse decine di migliaia di immagini! Avendo Node. ’ modulo di file system direttamente disponibile dal processo di rendering ha reso davvero facile per il carico pigro e scaricare un sacco di immagini super rapidamente in base agli eventi DOM.

In generale *[setImmediate](https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate)* e *[requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)* sono stati strumenti super importanti per eseguire un sacco di elaborazione mantenendo l'interfaccia utente reattiva. Più specificamente, distribuire le attività legate alla CPU in processi separati aiuta davvero a mantenere l'interfaccia utente reattiva. Ad esempio, abbiamo spostato il contesto audio effettivo in un processo separato, comunicando con esso oltre [IPC](https://electronjs.org/docs/glossary/#ipc) per evitare potenziali interruzioni da un'interfaccia utente occupata.

## Perché hai scelto di costruire Voltra su Electron?

La sandbox del browser è troppo limitata per la nostra app. Ma stiamo anche sviluppando un web player. Quindi è una grande vittoria che possiamo condividere quasi il 100% del codice tra le due implementazioni.

In realtà abbiamo iniziato costruendo un'app nativa con Swift. Il problema principale che abbiamo trovato era che stavamo reinventando un sacco di cose. Il web ha il più grande ecosistema open source al mondo. Quindi siamo passati abbastanza rapidamente a Electron.

Inoltre, e soprattutto, con Electron si sviluppa una volta e dovrebbe solo WorkTM su tutte le principali piattaforme. Non è garantito, ma il costo della codifica nativamente per ogni piattaforma supera sicuramente qualsiasi altro costo che l'elettrone introduce.

## Quali sono le tue cose preferite di Electron?

**GTD!**: Avendo Node.js’ stack di rete e lo strato di presentazione di Chromium confezionato insieme è una ricetta per ottenere le cose fatte.

**Competenza**: È solo lo stack web, quindi letteralmente tutto il nostro team è coinvolto nella costruzione del prodotto.

**Community**: C'è una comunità altamente organizzata che sa comunicare davvero bene! Ci sentiamo abbastanza grandi di sviluppare con supporto come questo.

## In quali settori si potrebbe migliorare Electron?

Vorremmo che Electron approvasse un unico pacchetto. Il packager è importante per Electron ciò che il gestore dei pacchetti è Node. Ci sono più packager nella terra degli utenti, ognuno con caratteristiche interessanti ma ciascuno con bug. Il consenso della comunità contribuirebbe a orientare l'energia spesa dai contribuenti.

## Cosa succederà?

Attualmente stiamo sviluppando un’app per dispositivi mobili, e stiamo lavorando con artisti ed etichette per aggiungere la loro musica al negozio di Voltra. Ehi! Se sei un artista o un'etichetta, [iscriviti ora](https://admin.voltra.co/signup)! Abbiamo in programma di aprire il negozio quando raggiungeremo il nostro obiettivo di 10 milioni di piste.

