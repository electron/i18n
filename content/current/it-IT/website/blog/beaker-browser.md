---
title: 'Progetto della settimana: Beaker Browser'
author:
  - pfrazee
  - zeke
date: '2017-02-07'
---

Questa settimana abbiamo incontrato [Paul Frazee](http://pfrazee.github.io/), creatore di [Beaker Browser](https://beakerbrowser.com/). Beaker è un browser peer-to-peer sperimentale che utilizza il protocollo Dat per ospitare siti da dispositivi degli utenti.

---<iframe width="100%" height="420" src="https://www.youtube.com/embed/Bem9nRpyPEs" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

## Cos'è Beaker e perché lo hai creato?

Beaker è un browser partecipativo. È un browser per gli hacker indie.

Il Web è un sorgente chiuso. Se vuoi influenzare il funzionamento dei social media, devi lavorare su Facebook o Twitter. Per la ricerca, Google. Il controllo è nelle mani delle imprese, piuttosto che degli utenti stessi.

Con Beaker abbiamo un nuovo protocollo Web: il [trasporto di archivi decentralizzati](https://datprotocol.com). "Dat." Crea siti su richiesta, gratuitamente, e poi li condivide dal dispositivo. Nessun server richiesto. È la nostra innovazione.

![Protocolli Beakers](https://cloud.githubusercontent.com/assets/2289/22560648/3defed5c-e92a-11e6-93f8-956cafafe3be.jpg)

Quando si visita un sito Dat a Beaker, si scarica i file. Il sito è tuo, per sempre. È possibile salvarlo, forkare, modificarlo, e condividere la nuova versione gratuitamente. È tutto open-source.

Quindi questo è ciò di cui si tratta: stiamo facendo un browser per siti Web open-source. Vogliamo che sia uno strumento per l'hacking sociale.

## Chi dovrebbe usare Beaker?

Hacker. Modders. Tipi creativi. Persone a cui piace tinker.

## Come faccio a creare un nuovo progetto che utilizza Dat?

Abbiamo [uno strumento a riga di comando chiamato bkr](https://github.com/beakerbrowser/bkr) che è tipo di git + npm. Qui sta creando un sito:

```bash
$ cd ~/my-site
$ bkr init
$ echo "Ciao, mondo!" > index.html
$ bkr publish
```

E qui si forgia un sito:

```bash
$ bkr fork dat://0ff7d4c7644d0aa19914247dc5dbf502d6a02ea89a5145e7b178d57db00504cd/ ~/my-fork
$ cd ~/my-fork
$ echo "Il mio fork non ha alcuna considerazione per l'indice precedente. tml!" > index.html
$ bkr publish
```

Quei siti poi vengono ospitati dal vostro browser. È un po' come BitTorrent; condividi i siti in una rete P2P.

Se vuoi una GUI, abbiamo alcuni strumenti di base integrati nel browser, ma stiamo spingendo questi strumenti nel userland. Sarà tutto moddable app utente.

## Perché hai scelto di costruire Beaker su Electron?

Era ovvio per questo progetto. Se ho biforcuto Chrome me stesso, Scrivo C++ in questo momento! Nessuno lo vuole fare. Conosco il Web stack, e posso lavorare rapidamente con esso. È un no-brainer.

La verità è, non sono sicuro di poter fare tutto questo senza Electron. È un grande pezzo di software.

## Quali sono alcune sfide che hai affrontato durante la costruzione di Beaker?

Metà di esso sta puntando gli strumenti e capire quanto posso ottenere via con.

Rendere il browser stesso è stato abbastanza facile. Electron è praticamente un toolkit per la realizzazione di browser. ...Tranne le schede del browser; che mi ha portato per sempre per ottenere giusto. Finalmente mi sono rotto e ho imparato a fare SVG. È molto meglio guardare, ma ci sono volute 3 o 4 iterazioni prima che io abbia capito bene.

## In quali settori bisognerebbe migliorare Electron?

Sarebbe davvero bello se potessi agganciare i devtools all'interno di una webview.

## Cosa sta succedendo a Beaker?

Nomi DNS sicuri per i siti Dat. Uno schema URL socialmente configurabile, chiamato lo ["schema app".](https://github.com/beakerbrowser/beaker/wiki/App-Scheme) Più API Dat.

## Per le persone che potrebbero essere interessate a contribuire al progetto, in quali aree ha bisogno di aiuto Beaker?

Abbiamo molte questioni aperte. Non abbiate paura di prendermi. #beakerbrowser su freenode. Manteniamo una pagina [per i collaboratori](https://beakerbrowser.com/docs/team.html) e ti aggiungeremo ad essa. E se visitate Austin, vi comprerò una birra.

## Eventuali suggerimenti Electron che potrebbero essere utili ad altri sviluppatori?

1. Utilizzare lo strumento di costruzione che è là fuori. Non vuoi combattere con le tue soluzioni, fidati di me. Usa electron-builder. Utilizzare una piastra di caldaia repo.
2. Se avete bisogno di aprire un problema nel repo Electron, andare il miglio in più per rendere facile la riproduzione. Otterrai una risposta molto più rapidamente, e la squadra lo apprezzerà. Ancor meglio, prova a ripararlo da soli. In realtà è piuttosto interessante vedere le interne.
3. Leggi tutte le guide e i documenti avanzati almeno una volta.
4. Non costruire un browser, è un mercato saturo.

