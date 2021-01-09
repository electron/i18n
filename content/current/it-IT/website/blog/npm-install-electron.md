---
title: npm install electron
author: zeke
date: '2016-08-16'
---

A partire dalla versione 1.3.1 di Electron, puoi `npm install electron --save-dev` per installare l'ultima versione precompilata di Electron nella tua app.

---

![npm install electron](https://cloud.githubusercontent.com/assets/378023/17259327/3e3196be-55cb-11e6-8156-525e9c45e66e.png)

## Il binario di Electron precostruito

Se hai mai lavorato su un'app Electron prima, probabilmente ti sei imbattuto nel pacchetto `elettron-precostruito` npm. Questo pacchetto è una parte indispensabile di quasi ogni progetto Electron. Quando installato, rileva il tuo sistema operativo e scarica un binario precostruito che viene compilato per lavorare sull'architettura del tuo sistema.

## Il nuovo nome

Il processo di installazione di Electron è stato spesso un ostacolo per i nuovi sviluppatori. Molte persone coraggiose hanno cercato di iniziare a sviluppare un Electron by app eseguendo `npm install electron` invece di `npm install electron-prebuilt`, solo per scoprire (spesso dopo molta confusione) che non era l' `elettrone` che stavano cercando.

Questo perché c'era un progetto `electron` esistente su npm, creato prima che esistesse il progetto Electron di GitHub. Per contribuire a rendere lo sviluppo di Electron più facile e intuitivo per i nuovi sviluppatori, abbiamo contattato il proprietario del pacchetto esistente `electron` npm per chiedere se sarebbe disposto a farci usare il nome. Fortunatamente è stato un fan del nostro progetto, e ha accettato di aiutarci a riorientare il nome.

## Vita precostruita su

A partire dalla versione 1.3.1, abbiamo iniziato a pubblicare [`elettroni`](https://www.npmjs.com/package/electron) e `elettroni-precostruiti` pacchetti a npm in tandem. I due pacchetti sono identici. Abbiamo scelto di continuare a pubblicare il pacchetto sotto entrambi i nomi per un po 'in modo da non inconvenienti migliaia di sviluppatori che stanno attualmente utilizzando `elettron-precostruito` nei loro progetti. Ti consigliamo di aggiornare il tuo pacchetto `. son` files to use the new `electron` dependency, ma continueremo a pubblicare le nuove versioni di `elettroni-precostruiti` fino alla fine del 2016.

Il repository [electron-userland/electron-prebuilt](https://github.com/electron-userland/electron-prebuilt) rimarrà la casa canonica del pacchetto `electron` npm.

## Molte grazie

Dobbiamo un ringraziamento speciale a [@mafintosh](https://github.com/mafintosh), [@maxogden](https://github.com/maxogden), e molti altri [contributori](https://github.com/electron-userland/electron-prebuilt/graphs/contributors) per la creazione e il mantenimento di `electron-prebuilt`, e per il loro servizio instancabile al JavaScript, Node. s, e le comunità di Electron.

E grazie a [@logicalparadox](https://github.com/logicalparadox) per averci permesso di assumere il pacchetto `electron` su npm.

## Aggiornamento dei progetti

Abbiamo lavorato con la comunità per aggiornare i pacchetti popolari che sono interessati da questo cambiamento. Pacchetti come [electron-packager](https://github.com/electron-userland/electron-packager), [electron-rebuild](https://github.com/electron/electron-rebuild), e [electron-builder](https://github.com/electron-userland/electron-builder) sono già stati aggiornati per lavorare con il nuovo nome continuando a supportare il vecchio nome.

Se si riscontrano problemi nell'installazione di questo nuovo pacchetto, faccelo sapere aprendo un problema sul repository [electron-userland/electron-prebuilt](https://github.com/electron-userland/electron-prebuilt/issues) .

Per qualsiasi altro problema con Electron, si prega di utilizzare il repository [electron/electron](https://github.com/electron/electron/issues) .

