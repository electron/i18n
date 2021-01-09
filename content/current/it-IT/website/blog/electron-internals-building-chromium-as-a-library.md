---
title: 'Electron Internals: Costruire il cromo come una biblioteca'
author: zcbenz
date: '2017-03-03'
---

Electron si basa su Chromium open-source di Google, un progetto che non è necessariamente progettato per essere utilizzato da altri progetti. Questo post introduce come Chromium è costruito come una biblioteca per uso di Electron, e come il sistema di costruzione si è evoluto nel corso degli anni.

---

## Uso Del Cif

The Chromium Embedded Framework (CEF) is a project that turns Chromium into a library, and provides stable APIs based on Chromium's codebase. Molto versioni iniziali di Atom editor e NW.js usato CEF.

Per mantenere stabile l'API, CEF nasconde tutti i dettagli del cromo e avvolge le API di Chromium con la propria interfaccia. Quindi, quando avevamo bisogno di accedere alle API cromo sottostanti, come integrare Node.js nelle pagine web, i vantaggi di CEF sono diventati bloccanti.

So in the end both Electron and NW.js switched to using Chromium's APIs directly.

## Costruire come parte del cromo

Anche se Chromium non sostiene ufficialmente progetti esterni, il codebase è modulare ed è facile costruire un browser minimale basato su Chromium. Il modulo core che fornisce l'interfaccia del browser si chiama Content Module.

Per sviluppare un progetto con Content Module, il modo più semplice è costruire il progetto come parte di Chromium. Questo può essere fatto verificando prima il codice sorgente di Chromium, e quindi aggiungendo il progetto al file `DEPS` di Chromium.

NW.js e le prime versioni di Electron stanno usando questo modo per costruire.

Il rovescio della medaglia è, Chromium è un codice molto grande e richiede macchine molto potenti per costruire. Per i computer portatili normali, che possono richiedere più di 5 ore. Questo ha un impatto notevole sul numero di sviluppatori che possono contribuire al progetto e rende anche più lento lo sviluppo.

## Costruire il cromo come una singola libreria condivisa

Come utente di Content Module, Electron non ha bisogno di modificare il codice di Chrome nella maggior parte dei casi, quindi un modo ovvio per migliorare la costruzione di Electron è costruire Chromium come una libreria condivisa, e poi collegarsi con esso in Electron. In questo modo gli sviluppatori non hanno più bisogno di costruire tutto fuori Chromium quando contribuiscono a Electron.

Il progetto [libchromiumcontent](https://github.com/electron/libchromiumcontent) è stato creato da [@aroben](https://github.com/aroben) per questo scopo. Costruisce il modulo Contenuto di Chromium come una libreria condivisa, e quindi fornisce intestazioni di Chromium e binari precostruiti per il download. Il codice della versione iniziale di libchromiumcontent può essere trovato [in questo link](https://github.com/electron/libchromiumcontent/tree/873daa8c57efa053d48aa378ac296b0a1206822c).

Il progetto [brightray](https://github.com/electron/brightray) è nato anche come parte del libchromiumcontent che fornisce un sottile strato attorno al Content Module.

Utilizzando libchromiumcontent e brightray insieme, gli sviluppatori possono costruire rapidamente un browser senza entrare nei dettagli della costruzione di Chromium. E rimuove il requisito di una rete veloce e potente macchina per costruire il progetto.

Oltre a Electron, ci sono stati anche altri progetti basati su Chromium costruiti in questo modo, come il [Breach browser](https://www.quora.com/Is-Breach-Browser-still-in-development).

## Filtrare i simboli esportati

Su Windows c'è una limitazione di quanti simboli una libreria condivisa può esportare. Man mano che il codice di Chromium cresceva, il numero di simboli esportati in libchromiumcontent superava presto la limitazione.

La soluzione era filtrare i simboli non necessari durante la generazione del file DLL. Ha funzionato [fornendo un `. ef` file al linker](https://github.com/electron/libchromiumcontent/pull/11/commits/85ca0f60208eef2c5013a29bb4cf3d21feb5030b), e poi usando uno script per [giudicare se i simboli sotto uno spazio dei nomi debbano essere esportati](https://github.com/electron/libchromiumcontent/pull/47/commits/d2fed090e47392254f2981a56fe4208938e538cd).

Prendendo questo approccio, anche se Chromium ha continuato ad aggiungere nuovi simboli esportati, libchromiumcontent potrebbe ancora generare file di libreria condivisi strippando più simboli.

## Component build

Prima di parlare dei prossimi passi compiuti in libchromiumcontent è importante introdurre il concetto di costruzione di componenti in cromo prima.

Come un progetto enorme, il passo di collegamento richiede molto tempo a Chromium quando si costruisce. Normalmente quando uno sviluppatore fa un piccolo cambiamento, possono volerci 10 minuti per vedere l'uscita finale . Per risolvere questo, Chromium introdotto componente costruito, che costruisce ogni modulo in Chromium come librerie condivise separate, così il tempo trascorso nel passaggio finale di collegamento diventa inosservabile.

## Spedizione di binari grezzi

Con cromo continua a crescere, c'erano così tanti simboli esportati in Chromium che anche i simboli di Content Module e Webkit erano più della limitazione . Era impossibile generare una libreria condivisa utilizzabile semplicemente simboli di stripping.

Alla fine, abbiamo dovuto [spedire i binari grezzi di Chromium](https://github.com/electron/libchromiumcontent/pull/98) invece di generare una singola libreria condivisa.

Come introdotto prima ci sono due modalità di costruzione in Chromium. Come risultato di binari grezzi di spedizione, dobbiamo spedire due diverse distribuzioni di binari in libchromiumcontent. Uno si chiama `static_library` build, che include tutte le librerie statiche di ogni modulo generate dalla normale build di Chromium. L'altro è `shared_library`, che include tutte le librerie condivise di ogni modulo generato dalla generazione del componente.

In Electron, la versione di Debug è collegata alla versione `shared_library` di libchromiumcontent, perché è piccolo da scaricare e richiede poco tempo quando si collega l'eseguibile finale. E la versione Release di Electron è collegata alla versione `static_library` di libchromiumcontent così il compilatore può generare simboli completi che sono importanti per il debug, e il linker può fare un'ottimizzazione molto migliore poiché sa quali file di oggetto sono necessari e quali no.

Quindi, per lo sviluppo normale, gli sviluppatori devono solo costruire la versione di debug, che non richiede una buona rete o una macchina potente. Anche se la versione Release richiede hardware molto migliore per la creazione, può generare binari ottimizzati.

## Aggiornamento `gn`

Essendo uno dei più grandi progetti al mondo, la maggior parte dei sistemi normali non sono adatti alla costruzione di Chromium, e il team di Chromium sviluppa i propri strumenti di costruzione.

Le versioni precedenti di Chromium stavano usando `gyp` come sistema di costruzione, ma soffre di essere lento, e il suo file di configurazione diventa difficile da capire per progetti complessi. Dopo anni di sviluppo, Chromium è passato a `gn` come un sistema di costruzione, che è molto più veloce e ha una chiara architettura.

Uno dei miglioramenti di `gn` è introdurre `source_set`, che rappresenta un gruppo di file di oggetti. In `gyp`, ogni modulo è stato rappresentato da `static_library` o `shared_library`, e per la normale costruzione di Chromium, ogni modulo ha generato una libreria statica e sono stati collegati insieme nell'eseguibile finale . Utilizzando `gn`, ogni modulo ora genera solo un mazzo di file oggetto, e l'eseguibile finale collega tutti i file oggetto insieme, in modo che i file statici intermedi della libreria non siano più generati.

Questo miglioramento però ha fatto grandi problemi a libchromiumcontent perché i file statici intermedi della libreria erano effettivamente necessari da libchromiumcontent.

Il primo tentativo di risolvere questo problema è stato [patch `gn` per generare i file della libreria statica](https://github.com/electron/libchromiumcontent/pull/239), che ha risolto il problema, ma non è stata una soluzione decente .

La seconda prova è stata fatta da [@alespergl](https://github.com/alespergl) a [produrre librerie statiche personalizzate dall'elenco dei file oggetto](https://github.com/electron/libchromiumcontent/pull/249). Ha usato un trucco per avviare prima una build fittizia per raccogliere una lista di file di oggetti generati, e poi costruisci effettivamente le librerie statiche alimentando `gn` con la lista. Ha apportato solo modifiche minime al codice sorgente di Chromium, e ha mantenuto ancora l'architettura di costruzione di Electron.

## Summary

Come potete vedere, rispetto alla costruzione Electron come parte di Chromium, costruzione Cromo come biblioteca richiede sforzi maggiori e richiede la manutenzione continua . Tuttavia quest'ultimo rimuove il requisito di hardware potente per costruire Electron, consentendo così a una gamma molto più ampia di sviluppatori di costruire e contribuire a Electron. Lo sforzo ne vale la pena.

