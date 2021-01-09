---
title: 'Electron Internals: Using Node as a Library'
author: zcbenz
date: '2016-08-08'
---

Questo è il secondo post di una serie in corso che spiega gli interni di Electron. Scopri il [primo post](https://electronjs.org/blog/2016/07/28/electron-internals-node-integration) sull'integrazione del ciclo dell'evento se non hai già.

La maggior parte delle persone usa [Nodo](https://nodejs.org) per applicazioni lato server, ma a causa del ricco set API di Node e la fiorente comunità, è anche una grande misura per una libreria incorporata. Questo post spiega come il Nodo è usato come una biblioteca in Electron.

---

## Build system

Sia il Nodo che Electron usano [`GYP`](https://gyp.gsrc.io) come loro sistemi di costruzione. Se vuoi incorporare Nodo all'interno della tua app, devi usarlo anche come sistema di compilazione.

Nuovo a `GYP`? Leggi [questa guida](https://gyp.gsrc.io/docs/UserDocumentation.md) prima di continuare in questo post.

## Bandiere del nodo

Il nodo [`. file yp`](https://github.com/nodejs/node/blob/v6.3.1/node.gyp) nella directory del codice sorgente di Node, descrive come viene costruito il Nodo , insieme a molte variabili [`GYP`](https://gyp.gsrc.io) che controllano quali parti di Nodo sono abilitate e se aprire determinate configurazioni.

Per modificare i flag di generazione, è necessario impostare le variabili nel file `.gypi` di il tuo progetto. Lo script `configure` in Node può generare alcune configurazioni comuni per te, ad esempio eseguendo `. configure --shared` genererà a `config.gypi` con variabili che istruiscono il nodo da costruire come una libreria condivisa.

Electron non utilizza lo script `configure` poiché ha i propri script di compilazione. Le configurazioni per il Nodo sono definite nel file [`common.gypi`](https://github.com/electron/electron/blob/master/common.gypi) nella directory radice del codice sorgente di Electron.

## Collega il nodo con Electron

In Electron, Il nodo è collegato come libreria condivisa impostando la variabile `GYP` `node_shared` a `true`, so Node's build type will be changed from `executable` to `shared_library`, e il codice sorgente contenente il punto di ingresso `del Nodo` non sarà compilato.

Dato che Electron utilizza la libreria V8 fornita con Chromium, non viene utilizzata la libreria V8 inclusa nel codice sorgente di Node. Questo viene fatto impostando sia `node_use_v8_platform` che `node_use_bundled_v8` a `false`.

## Libreria condivisa o libreria statica

Quando si collega con Node, ci sono due opzioni: è possibile creare Nodo come una libreria statica e includerlo nell'eseguibile finale, oppure puoi costruirlo come libreria condivisa e spedirlo accanto all'eseguibile finale.

In Electron, Nodo è stato costruito come una libreria statica per molto tempo. Questo ha reso semplice la build , ha abilitato le migliori ottimizzazioni del compilatore e ha permesso a Electron di essere distribuito senza un file extra `node.dll`.

Tuttavia, questo è cambiato dopo che Chrome è cambiato per utilizzare [BoringSSL](https://boringssl.googlesource.com/boringssl). BoringSSL è un fork di [OpenSSL](https://www.openssl.org) che rimuove diverse API inutilizzate e cambia molte interfacce esistenti. Poiché il nodo utilizza ancora OpenSSL, il compilatore genererebbe numerosi errori di collegamento dovuti a simboli in conflitto se fossero collegati insieme.

Electron non è riuscito ad usare BoringSSL nel nodo o OpenSSL in Chromium, quindi l'unica opzione era quella di passare alla costruzione di Nodo come una libreria condivisa, e [nascondere i simboli BoringSSL e OpenSSL](https://github.com/electron/electron/blob/v1.3.2/common.gypi#L209-L218) nei componenti di ciascuno.

Questo cambiamento ha portato Electron alcuni effetti collaterali positivi. Prima di questo cambiamento, non è possibile rinominare il file eseguibile di Electron su Windows se hai usato moduli nativi perché il nome dell'eseguibile è stato codificato con hard code nella libreria di importazione. Dopo che il Nodo è stato costruito come una libreria condivisa, questa limitazione è andata perché tutti i moduli nativi sono stati collegati al nodo `. ll`, il cui nome non ha bisogno di essere cambiato.

## Supporto moduli nativi

[Moduli nativi](https://nodejs.org/api/addons.html) in Nodo lavorano definendo una funzione di inserimento per il Nodo da caricare, e poi cercare i simboli di V8 e libuv da Node. Questo è un po ' fastidioso per gli embedders perché di default i simboli di V8 e libuv sono nascosti quando si costruisce il Nodo come una libreria e i moduli nativi non saranno in grado di caricare perché non riescono a trovare i simboli.

Quindi, per far funzionare i moduli nativi, i simboli V8 e libuv sono stati esposti in Electron. Per V8 questo è fatto [forzando tutti i simboli nel file di configurazione di Chromium ad essere esposto](https://github.com/electron/libchromiumcontent/blob/v51.0.2704.61/chromiumcontent/chromiumcontent.gypi#L104-L122). Per libuv, si ottiene impostando [la definizione `BUILDING_UV_SHARED=1`](https://github.com/electron/electron/blob/v1.3.2/common.gypi#L219-L228).

## Avvio Nodo nella tua app

Dopo tutto il lavoro di costruzione e collegamento con Node, il passo finale è quello di eseguire Nodo nella tua app.

Il nodo non fornisce molte API pubbliche per incorporarsi in altre applicazioni. Di solito, puoi solo chiamare [`node::Start` and `node::Init`](https://github.com/nodejs/node/blob/v6.3.1/src/node.h#L187-L191) per avviare una nuova istanza di Node. Tuttavia, se stai costruendo un'app complessa basata su Node, devi usare le API come `node::CreateEnvironment` per controllare con precisione ogni passo.

In Electron, il nodo viene avviato in due modalità: la modalità standalone che viene eseguita nel processo principale , che è simile ai binari ufficiali del Nodo e alla modalità embedded che inserisce le API del Nodo nelle pagine web. I dettagli di questo sarà spiegato in un futuro post.

