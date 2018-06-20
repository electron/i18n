# Ambiente Sviluppatore

Lo sviluppo Electron è essenzialmente lo sviluppo Node.js. Per variare il tuo sistema operativo in un ambiente capiente delle app di costruzione desktop con Electron, dovrai meramente necessitare Node.js, npm, un editor di codice a tua scelta ed una conoscenza rudimentale delle linee di comando del client del tuo sistema operativo.

## Configurazione su macOS

> Electron supporta Mac OS X 10.9 (e tutte le versioni nominate macOS) e superiori. Apple Non consente l'esecuzione di macOS in macchine virtuali a meno che il computer ospitante sia già un computer apple, così se ti trovi in bisogno di un Mac, considera di usare un servizio cloud che noleggi accessi ai Mac (come [MacInCloud](https://www.macincloud.com/) o [xcloud](https://xcloud.me)).

Primo, installa una versione recente di Node.js. Ti raccomandiamo do installare almeno l'ultima `LTS` o `Corrente` versione disponibile. Visita la [pagina di download di Node.js](https://nodejs.org/en/download/) e seleziona l'`Installatore macOS`. Mentre Homebrew è un'opzione offerta, ma raccomandiamo di non usarla, degli strumenti saranno incompatibili con il metodo di installazione di Node.js da Homebrew.

Una volta scaricato, esegui l'installatore e permetti di essere guidato per l'installazione.

Una volta installato, conferma che tutto lavori come aspettato. Find the macOS `Terminal` application in your `/Applications/Utilities` folder (or by searching for the word `Terminal` in Spotlight). Apri il `Terminale` o un'altra linea di comando del client a tua scelta e conferma che sia `node` che `npm` siano disponibili:

```sh
# Questo comando dovrebbe stampare la versione di Node.js
Node -v

#Questo dovrebbe stampare la versione di npm
npm -v
```

Se entrambi i comandi hanno stampato un numero di versione, tutto è pronto! Prima di iniziare, puoi installare un [editor del codice](#a-good-editor) per lo sviluppo con JavaScript.

## Configurazione su Windows

> Electon supporta Windows 7 e versioni successive, provando a sviluppare app di Electron su versioni precedenti di Windows non funzionerebbe. Microsoft fornisce [immagini macchina virtuale con Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) gratuite per sviluppatori.

Primo, installa una versione recente di Node.js. Ti raccomandiamo do installare almeno l'ultima `LTS` o `Corrente` versione disponibile. Visita la [pagina di download di Node.js](https://nodejs.org/en/download/) e seleziona l'`Installatore Windows`. Una volta scaricato, esegui l'installatore e permetti di essere guidato per l'installazione.

Sulla schermata che ti permette di configuare l'installazione, assicurati di selezionare le opzioni `esegui Node.js`, `gestione pacchetto npm` e `Aggiungi al PERCORSO`.

Una volta installato, conferma che tutto lavori come aspettato. Find the Windows PowerShell by opening the Start Menu and typing `PowerShell`. Apri `PowerShell` o un'altra linea di comando del client a tua scelta e conferma che sia `node` che `npm` siano disponibili:

```powershell
# Questo comando dovrebbe stampare la versione di Node.js
Node -v

#Questo dovrebbe stampare la versione di npm
npm -v
```

Se entrambi i comandi hanno stampato un numero di versione, tutto è pronto! Prima di iniziare, puoi installare un [editor del codice](#a-good-editor) per lo sviluppo con JavaScript.

## Configurazione su Linux

> Generalmente parlando, Electron supporta Ubuntu 12.04, Fedora 21, Debian 8 e successive.

Primo, installa una versione recente di Node.js. In base alla distribuzione Linux, le fasi di installazione potrebbero differire. Considerato che tu installi normalmente il software usando la gestione pacchetto come `apt` o `pacman`, usa la [guida di installazione di Node.js per Linux](https://nodejs.org/en/download/package-manager/) ufficiale.

Stai eseguendo Linux, quindi sai già come operare su un client della linea di comando. Apri il tuo client preferito e conferma che sia `node` che `npm` siano globalmente disponibili:

```sh
# Questo comando dovrebbe stampare la versione di Node.js
Node -v

#Questo dovrebbe stampare la versione di npm
npm -v
```

Se entrambi i comandi hanno stampato un numero di versione, tutto è pronto! Prima di iniziare, puoi installare un [editor del codice](#a-good-editor) per lo sviluppo con JavaScript.

## Un Buon Editor

Potremmo suggerire due editor popolari gratuiti costruiti con Electron: GitHub [Atom](https://atom.io/) e [Visual Studio Code](https://code.visualstudio.com/) di Microsoft. Entrambi hanno un supporto JavaScript eccellente.

Se sei uno dei tanti sviluppatori con una forte preferenza, sappi che virtualmente tutti gli editor del codics e IDE ai giorni d'oggi supportano JavaScript.