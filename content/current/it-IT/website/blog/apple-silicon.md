---
title: Supporto Silicone Apple
author: MarshallOfSound
date: '2020-10-15'
---

Con Apple Silicon hardware in uscita verso la fine di quest'anno, che aspetto ha il percorso per ottenere la tua app Electron in esecuzione sul nuovo hardware?

---

Con il rilascio di Electron 11.0.0-beta. , il team di Electron è ora costruzione spedizione di Electron che girano sul nuovo hardware Apple Silicon che Apple prevede di spedire entro la fine di quest'anno. Puoi prendere l'ultima beta con `npm install electron@beta` o scaricarla direttamente dal nostro sito [releases](https://electronjs.org/releases/stable).

## Come funziona?

A partire da Electron 11, spediremo versioni separate di Electron per Intel Mac e Apple Silicon Macs. Prima di questa modifica, stavamo già spedendo due artefatti, `darwin-x64` e `mas-x64`, con quest'ultimo è per l'utilizzo della compatibilità di Mac App Store. Ora stiamo spedendo altri due artefatti, `darwin-arm64` e `mas-arm64`, che sono gli equivalenti di Silicio Apple dei suddetti artefatti.

## Che cosa devo fare?

Dovrai spedire due versioni della tua app: una per x64 (Intel Mac) e una per l'arm64 (Apple Silicon). La buona notizia è che [`electron-packager`](https://github.com/electron/electron-packager/), [`electron-rebuild`](https://github.com/electron/electron-rebuild/) e [`electron-forge`](https://github.com/electron-userland/electron-forge/) già supportano il targeting dell'architettura `arm64`. Finché stai utilizzando le ultime versioni di questi pacchetti, la tua app dovrebbe funzionare perfettamente una volta che aggiorni l'architettura di destinazione a `arm64`.

In futuro, rilasceremo un pacchetto che ti permette di "unire" le tue app `arm64` e `x64` in un singolo binario universale, ma vale la pena notare che questo binario sarebbe _enorme_ e probabilmente non è ideale per la spedizione agli utenti.

## Problemi Potenziali

### Moduli Nativi

Poiché stai puntando su una nuova architettura, avrai bisogno di aggiornare diverse dipendenze che potrebbero causare problemi di costruzione. La versione minima di alcune dipendenze è inclusa di seguito per il vostro riferimento.

| Dipendenza          | Requisito Versione |
| ------------------- | ------------------ |
| Xcode               | `>=12,0,0`      |
| `node-gyp`          | `>=7.1.0`       |
| `electron-rebuild`  | `>=1.12.0`      |
| `electron-packager` | `>=15.1.0`      |

Come risultato di questi requisiti di dipendenza versione, potrebbe essere necessario correggere/aggiornare alcuni moduli nativi.  Una cosa di nota è che l'aggiornamento di Xcode introdurrà una nuova versione di macOS SDK, che può causare fallimenti di compilazione per i tuoi moduli nativi.


## Come posso provarlo?

Attualmente, Apple Silicon applicazioni eseguono solo su Apple Silicon hardware, che non è commercialmente disponibile al momento della scrittura di questo post sul blog. Se hai un [Developer Transition Kit](https://developer.apple.com/programs/universal/), puoi testare la tua applicazione su questo. Altrimenti, dovrai aspettare il rilascio dell'hardware Apple Silicon di produzione per testare se la tua applicazione funziona.

## Che ne dici di Rosetta 2?

Rosetta 2 è l'ultima iterazione di Apple della loro tecnologia [Rosetta](https://en.wikipedia.org/wiki/Rosetta_(software)) , che consente di eseguire x64 applicazioni Intel sul loro nuovo arm64 Apple Silicon hardware. Anche se crediamo che le app x64 Electron funzioneranno sotto Rosetta 2, ci sono alcune cose importanti da notare (e ragioni per cui si dovrebbe spedire un binario arm64 nativo).

* Le prestazioni della tua app saranno notevolmente degradate. Electron / V8 utilizza la compilazione [JIT](https://en.wikipedia.org/wiki/Just-in-time_compilation) per JavaScript, e a causa del funzionamento di Rosetta, eseguirà efficacemente JIT due volte (una volta in V8 e una volta in Rosetta).
* Si perde il vantaggio della nuova tecnologia in Silicio Apple, come ad esempio la dimensione aumentata della pagina di memoria.
* Abbiamo detto che le prestazioni saranno **significativamente** degradate?
