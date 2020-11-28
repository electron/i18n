---
title: 'Electron Internals: Message Loop Integration'
author: zcbenz
date: '2016-07-28'
---

Questo è il primo post di una serie che spiega gli interni di Electron. Questo post presenta come il ciclo evento di Node è integrato con Chromium in Electron.

---

Ci sono stati molti tentativi di utilizzare il Nodo per la programmazione GUI, like [node-gui](https://github.com/zcbenz/node-gui) for GTK+ bindings, and [node-qt](https://github.com/arturadib/node-qt) for QT bindings. Ma nessuno di loro lavora in produzione perché gli toolkit GUI hanno il loro messaggio loop mentre il Nodo usa libuv per il suo ciclo di eventi, e il thread principale può solo eseguire un ciclo allo stesso tempo. Quindi il trucco comune per eseguire il ciclo di messaggi GUI in Nodo è quello di pompare il ciclo di messaggi in un timer con un intervallo molto piccolo, che rende lenta la risposta dell'interfaccia GUI e occupa un sacco di risorse della CPU.

Durante lo sviluppo di Electron abbiamo incontrato lo stesso problema, anche se in modo invertito: abbiamo dovuto integrare il ciclo di eventi di Node nel ciclo del messaggio di Chromium.

## Il processo principale e renderer

Prima di immergerci nei dettagli dell'integrazione del ciclo di messaggi, spiegherò l'architettura multi-processo di Chromium.

In Electron ci sono due tipi di processi: il processo principale e il processo di renderer (in realtà questo è estremamente semplificato, per una vista completa vedi [Architettura multi-processo](http://dev.chromium.org/developers/design-documents/multi-process-architecture)). Il processo principale è responsabile per la GUI funziona come la creazione di finestre, mentre il processo di rendering si occupa solo di pagine web in esecuzione e rendering.

Electron consente di utilizzare JavaScript per controllare sia il processo principale che il renderer , il che significa che dobbiamo integrare il Nodo in entrambi i processi.

## Sostituire il ciclo di messaggi di Chromium con libuv

Il mio primo tentativo è stato reimplementare il ciclo di messaggio di Chromium con libuv.

E 'stato facile per il processo di renderer, dal momento che il suo ciclo di messaggi ha ascoltato solo descrittori di file e timer, e ho solo bisogno di implementare l'interfaccia con libuv.

Tuttavia, è stato molto più difficile per il processo principale. Ogni piattaforma ha un proprio tipo di ciclo di messaggi GUI. macOS Chromium utilizza `NSRunLoop`, mentre Linux utilizza glib. I tried lots of hacks to extract the underlying file descriptors out of the native GUI message loops, and then fed them to libuv for iteration, but I still met edge cases that did not work.

Così finalmente ho aggiunto un timer per sondare il ciclo del messaggio GUI in un piccolo intervallo. Come un risultato il processo ha richiesto un uso costante della CPU, e alcune operazioni hanno avuto lunghi ritardi.

## Ciclo evento di sondaggio di Nodo in un thread separato

Con la maturazione di libuv è stato possibile adottare un altro approccio.

Il concetto di backend fd è stato introdotto in libuv, che è un descrittore di file (o gestire) che libuv sondaggi per il suo ciclo di eventi. Quindi, sondando il backend fd è possibile ottenere una notifica quando c'è un nuovo evento in libuv.

Così in Electron ho creato un thread separato per sondare il backend fd, e dal momento che stavo usando le chiamate di sistema per il sondaggio invece di API libuv, è stato thread sicuro. And whenever there was a new event in libuv's event loop, a message would be posted to Chromium's message loop, and the events of libuv would then be processed in the main thread.

In questo modo ho evitato di patching cromo e nodo, e lo stesso codice è stato utilizzato in sia i processi principali e renderer.

## Il codice

Puoi trovare l'implementazione dell'integrazione del loop dei messaggi nei file `node_bindings` sotto [`electron/atom/common/`](https://github.com/electron/electron/tree/master/atom/common). Può essere facilmente riutilizzato per progetti che vogliono integrare Node.

