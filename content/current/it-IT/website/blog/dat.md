---
title: 'Progetto della settimana: data'
author:
  - karissa
  - yoshuawuyts
  - maxogden
  - zeke
date: '2017-02-21'
---

Il progetto in evidenza di questa settimana è [Dat](https://datproject.org/), un [sovvenzionato](https://changelog.com/rfc/6), open source, strumento decentralizzato per la distribuzione di set di dati. Dat è costruito e mantenuto da un [team geodistribuito](https://datproject.org/team), molti dei quali hanno aiutato a scrivere questo post.

---

[![Uno screenshot della vista principale del dat-desktop, che mostra alcune righe di dati
condivisi](https://cloud.githubusercontent.com/assets/2289/23175925/dbaee7ec-f815-11e6-80cc-3041203c7842.png)](https://github.com/datproject/dat-desktop)

## Prima di che cosa è Dat?

Volevamo portare le parti migliori dei sistemi peer to peer e distribuiti per la condivisione dei dati. Abbiamo iniziato con la condivisione dei dati scientifici e poi abbiamo iniziato a ramificare in istituti di ricerca, governo, servizio pubblico e team open source.

Un altro modo per pensarci è una sincronizzazione e caricare app come Dropbox o BitTorrent Sync, tranne Dat è [open source](https://github.com/datproject). Il nostro obiettivo è quello di essere un software di condivisione di dati potente, open source, senza scopo di lucro per i dati grandi, piccoli, medio, piccolo-batch e big-batch.

Per utilizzare lo strumento CLI `dat` , tutto quello che devi digitare è:

```sh
dat share path/to/my/folder
```

E dat creerà un link che puoi usare per inviare quella cartella a qualcun altro - nessun server centrale o terze parti hanno accesso ai tuoi dati. A differenza di BitTorrent, è anche impossibile stuzzicare chi sta condividendo ciò che ([vedi la bozza Dat Paper per maggiori dettagli](https://github.com/datproject/docs/blob/master/papers/dat-paper.md)).

## Ora sappiamo cos'è Dat. Come si inserisce Dat Desktop?

[Dat Desktop](https://github.com/datproject/dat-desktop) è un modo per rendere Dat accessibile a persone che non possono o non vogliono usare la riga di comando. È possibile ospitare più dati sul computer e servire i dati attraverso la rete.

## Riesci a condividere alcuni casi di uso cool?

### DataRefuge + Progetto Svalbard

Stiamo lavorando su una cosa chiamata in codice [Progetto Svalbard](https://github.com/datproject/svalbard) che è correlata a [DataRefuge](http://www.ppehlab.org/datarefuge), un gruppo che lavora per sostenere i dati sul clima governativo a rischio di scomparsa. Svalbard prende il nome dalla Svalbard Global Seed Vault nell'Artico che ha una grande libreria sotterranea di backup del DNA dell'impianto. La nostra versione è una grande collezione controllata di serie di dati scientifici pubblici. Una volta che conosciamo e possiamo fidarci dei metadati, possiamo costruire altri progetti cool come una [rete di archiviazione dati distribuita dai volontari](https://github.com/datproject/datasilo/).

### Coalizione Di Dati Civici California

[CACivicData](http://www.californiacivicdata.org/) è un archivio open-source che serve download giornalieri da CAL-ACCESS, database California che tiene traccia di denaro in politica. Fanno [uscite giornaliere](http://calaccess.californiacivicdata.org/downloads/0), il che significa ospitare un sacco di dati duplicati attraverso i loro file zip. Stiamo lavorando sull'hosting dei loro dati come repository Dat che ridurrà la quantità di fastidio e larghezza di banda necessaria per fare riferimento a una versione specifica o aggiornare a una versione più recente.

## Aggiornamenti Electron

Questo non è ancora concreto, ma pensiamo che un caso di utilizzo divertente sarebbe mettere un'app Electron compilata in un repository Dat, quindi utilizzando un client Dat in Electron per tirare le ultime delta dell'app binaria integrata, per risparmiare sul tempo di download ma anche per ridurre i costi di banda per il server.

## Chi dovrebbe usare Dat Desktop?

Chiunque voglia condividere e aggiornare i dati su una rete p2p. Scienziati di dati, hacker di dati aperti, ricercatori, sviluppatori. Siamo super ricettivi al feedback se qualcuno ha un caso di utilizzo fresco che non abbiamo ancora pensato. Puoi lasciare il nostro [Gitter Chat](https://gitter.im/datproject/discussions) e chiederci qualsiasi cosa!

## Cosa sta succedendo a Dat e Dat Desktop?

Pubblicazione di account utente e metadati. Stiamo lavorando su una web app del registro dati da distribuire su [datproject. rg](https://datproject.org/) che sarà fondamentalmente un 'NPM per set di dati', tranne l'avvertimento di essere stiamo solo per essere una directory di metadati e i dati possono vivere ovunque online (al contrario di NPM o GitHub dove tutti i dati sono ospitati centralmente, perché il codice sorgente è abbastanza piccolo si può adattare tutto in un unico sistema). Poiché molti set di dati sono enormi, abbiamo bisogno di un registro federato (simile a come funzionano i tracker BitTorrent). Vogliamo rendere più facile per le persone trovare o pubblicare set di dati con il registro da Dat Desktop, per rendere il processo di condivisione dei dati senza attriti.

Un'altra caratteristica è multi-scrittore/cartelle collaborative. Abbiamo grandi piani per fare flussi di lavoro collaborativi, forse con rami, simili a git, tranne progettato intorno alla collaborazione dataset. Ma stiamo ancora lavorando sulla stabilità globale e standardizzare i nostri protocolli in questo momento!

## Perché hai scelto di costruire Dat Desktop su Electron?

Dat è costruito utilizzando Node.js, quindi era una misura naturale per la nostra integrazione. Oltre a questo, i nostri utenti utilizzano una varietà di macchine da scienziati, ricercatori e funzionari governativi possono essere costretti a utilizzare determinate impostazioni per le loro istituzioni - questo significa che dobbiamo essere in grado di raggiungere Windows e Linux così come Mac. Dat Desktop ci dà abbastanza facilmente.

## Quali sono alcune sfide che hai affrontato durante la costruzione di Dat e Dat Desktop?

Definire ciò che la gente vuole. Abbiamo iniziato con set di dati tabulari, ma ci siamo resi conto che era un po 'di un problema complicato da risolvere e che la maggior parte delle persone non usano i database. Quindi, a metà del progetto, abbiamo ridisegnato tutto da zero per utilizzare un filesystem e non abbiamo guardato indietro.

Abbiamo anche incontrato alcuni problemi generali di infrastruttura di Electron, tra cui:

- Telemetria - come acquisire statistiche anonime di utilizzo
- Aggiornamenti - È una sorta di frazionamento e magia per impostare aggiornamenti automatici
- Rilascio - la firma di XCode, le versioni di costruzione su Travis, facendo beta builds, tutte erano sfide.

Usiamo anche Browserify e alcuni fantastici Browserify Transforms sul codice 'front end' in Dat Desktop (che è un tipo di strano perché abbiamo ancora bundle anche se abbiamo nativo `richiedono` -- ma è perché vogliamo le Trasforme). Per aiutare meglio a gestire il nostro CSS abbiamo passato da Sass all'utilizzo di [sheetify](https://github.com/stackcss/sheetify). Ci ha aiutato notevolmente a modulare il nostro CSS e ha reso più facile spostare la nostra interfaccia utente in un'architettura orientata ai componenti con dipendenze condivise. Ad esempio, [dat-colors](https://github.com/Kriesse/dat-colors) contiene tutti i nostri colori ed è condiviso tra tutti i nostri progetti.

Siamo sempre stati un grande fan degli standard e delle astrazioni minime. Tutta la nostra interfaccia è costruita utilizzando i nodi DOM regolari con poche librerie helper. Abbiamo iniziato a spostare alcuni di questi componenti in [elementi base](https://base.choo.io), una libreria di componenti riutilizzabili a basso livello. Come per la maggior parte della nostra tecnologia continuiamo a ripeterla fino a quando non riusciamo a farla corretta, ma come squadra abbiamo la sensazione che stiamo andando nella giusta direzione qui.

## In quali settori bisognerebbe migliorare Electron?

Pensiamo che il punto di dolore più grande sia i moduli nativi. La necessità di ricostruire i moduli per Electron con npm aggiunge complessità al flusso di lavoro. Il nostro team ha sviluppato un modulo chiamato [`prebuild`](http://npmjs.org/prebuild) che gestisce i binari pre-costruiti, che ha funzionato bene per Node, ma i flussi di lavoro di Electron hanno ancora richiesto un passo personalizzato dopo l'installazione, di solito `npm run rebuild`. Era fastidioso. Per risolvere questo problema abbiamo recentemente passato a una strategia in cui impacchettiamo tutte le versioni binarie compilate di tutte le piattaforme all'interno del npm tarball. Ciò significa che i tarball diventano più grandi (anche se questo può essere ottimizzato con `. o` file - librerie condivise), questo approccio evita di dover eseguire gli script post-installazione ed evita anche il modello `npm run rebuild` completamente. Significa che `npm install` fa la cosa giusta per Electron la prima volta.

## Quali sono le tue cose preferite di Electron?

Le API sembrano abbastanza ben pensate, è relativamente stabile, e fa un lavoro abbastanza buono a tenere aggiornato con le versioni di Nodo a monte, non molto altro possiamo chiedere!

## Eventuali suggerimenti Electron che potrebbero essere utili ad altri sviluppatori?

Se si utilizzano moduli nativi, dare [prebuild](https://www.npmjs.com/package/prebuild) uno sparo!

## Qual è il modo migliore per seguire gli sviluppi dei dat?

Segui [@dat_project](https://twitter.com/dat_project) su Twitter, o iscriviti alla nostra [newsletter email](https://tinyletter.com/datdata).

