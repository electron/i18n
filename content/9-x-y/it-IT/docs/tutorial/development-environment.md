# Ambiente Sviluppatore

Sviluppare con Electron è essenzialmente sviluppare con Node.js. Per rendere il tuo sistema operativo un ambiente capace di sviluppare applicazioni desktop con Electron, avrai semplicemente bisogno di Node.js, npm, un code editor di tua scelta ed una conoscenza rudimentale del command line client del tuo sistema operativo.

## Configurazione su macOS

> Electron supporta macOS 10.10 (Yosemite) e superiori. Apple Non consente l'esecuzione di macOS in macchine virtuali a meno che il computer ospitante non sia già un computer Apple, così se hai bisogno di un Mac, considera la possibilità di usare un servizio cloud che noleggi accessi ai Mac (come [MacInCloud][macincloud] o [xcloud](https://xcloud.me)).

Primo, installa una versione recente di Node.js. Ti raccomandiamo di installare almeno l'ultima `LTS` o `Corrente` versione disponibile. Visita la [pagina di download di Node.js][node-download] e seleziona l'`macOS Installer`. Mentre Homebrew è un'opzione offerta, ti raccomandiamo di non usarla - molti strumenti saranno incompatibili con il metodo con cui Homebrew installa Node.js.

Una volta scaricato, esegui l'installer e lascia che il wizard ti guidi nel processo di installazione.

Una volta installato, conferma che tutto lavori come previsto. Trova l'applicazione macOS `Terminal` nella tua cartella `/Applicazioni/Utilità` (o cercando la parola `Terminale` nello Spotlight). Apri il `Terminale` o un'altra linea di comando del client a tua scelta e conferma che sia `node` che `npm` siano disponibili:

```sh
# Questo comando dovrebbe stampare la versione di Node.js
Node -v

#Questo dovrebbe stampare la versione di npm
npm -v
```

Se entrambi i comandi hanno stampato un numero di versione, sei pronto! Prima di iniziare, puoi installare un [editor del codice](#a-good-editor) adatto per lo sviluppo con JavaScript.

## Configurazione su Windows

> Electon supporta Windows 7 e versioni successive, provare a sviluppare applicazioni Electron su versioni precedenti di Windows non funzionerà. Microsoft fornisce [immagini su macchina virtuale con Windows 10][windows-vm] gratuite per sviluppatori.

Primo, installa una versione recente di Node.js. Ti raccomandiamo di installare almeno l'ultima `LTS` o `Corrente` versione disponibile. Visita la [pagina di download di Node.js][node-download] e seleziona `Windows Installer`. Una volta scaricato, esegui l'installer e lascia che il wizard ti guidi nel processo di installazione.

Nella schermata che ti permette di configuare l'installazione, assicurati di selezionare le opzioni ` Node.js runtime`, `npm package manager`</code> e `Add to PATH</0>.</p>

<p spaces-before="0">Una volta installato, conferma che tutto lavori come previsto. Trova Windows PowerShell aprendo il menu Start e digitando <code>PowerShell`. Apri `PowerShell` o un altro command line client a tua scelta e conferma che sia `node` che `npm` siano disponibili:

```powershell
# Questo comando dovrebbe stampare la versione di Node.js
Node -v

#Questo dovrebbe stampare la versione di npm
npm -v
```

Se entrambi i comandi hanno stampato un numero di versione, sei pronto! Prima di iniziare, puoi installare un [editor del codice](#a-good-editor) adatto per lo sviluppo con JavaScript.

## Configurazione su Linux

> Generalmente parlando, Electron supporta Ubuntu 12.04, Fedora 21, Debian 8 e successive.

Primo, installa una versione recente di Node.js. In base alla distribuzione Linux, le fasi di installazione potrebbero differire. Considerato che tu installi normalmente il software usando la gestione pacchetto come `apt` o `pacman`, usa la [guida di installazione di Node.js per Linux][node-package] ufficiale.

Stai eseguendo Linux, quindi sai già come operare su un client della linea di comando. Apri il tuo client preferito e conferma che sia `node` che `npm` siano globalmente disponibili:

```sh
# Questo comando dovrebbe stampare la versione di Node.js
Node -v

#Questo dovrebbe stampare la versione di npm
npm -v
```

Se entrambi i comandi hanno stampato un numero di versione, sei pronto! Prima di iniziare, puoi installare un [editor del codice](#a-good-editor) adatto per lo sviluppo con JavaScript.

## Un Buon Editor

Potremmo suggerire due editor popolari gratuiti costruiti con Electron: GitHub [Atom][atom] e [Visual Studio Code][code] di Microsoft. Entrambi hanno un supporto JavaScript eccellente.

Se sei uno dei tanti sviluppatori con una forte preferenza, sappi che virtualmente tutti gli editor del codice e IDE ai giorni d'oggi supportano JavaScript.

[macincloud]: https://www.macincloud.com/
[node-download]: https://nodejs.org/en/download/
[node-package]: https://nodejs.org/en/download/package-manager/
[atom]: https://atom.io/
[code]: https://code.visualstudio.com/
[windows-vm]: https://developer.microsoft.com/en-us/windows/downloads/virtual-machines
