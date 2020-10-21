# Packaging delle applicazioni

Per mitigare [problemi](https://github.com/joyent/node/issues/6960) intorno a lunghi nomi di percorso su Windows, velocizzare leggermente `richiedono` e nascondere il tuo codice sorgente dall'ispezione di cursore, puoi scegliere di imballare la tua app in un archivio [asar](https://github.com/electron/asar) con poche modifiche al tuo codice sorgente.

La maggior parte degli utenti potrà usufruire gratuitamente di questa funzionalità, in quanto pienamente supportata da [`electron-packager`](https://github.com/electron/electron-packager), [`electron-forge`](https://github.com/electron-userland/electron-forge), e [`electron-builder`](https://github.com/electron-userland/electron-builder). Se non stai usando nessuno di questi strumenti, leggi su.

## Generazione di `asar` Archivi

Un archivio [asar](https://github.com/electron/asar) è un semplice formato simile a tar, che concatena i file in un singolo file. Electron può leggere file arbitrari da esso senza scompattare l'intero file.

Passi per confezionare la tua app in un archivio `asar`:

### 1. Installare l'utilità asar

```sh
$ npm install -g asar
```

### 2. Pacchetto con `asar pack`

```sh
$ asar pack your-app app.asar
```

## Usare `asar` Archives

In Electron ci sono due insiemi di API: API Nodo fornite da Node.js e API Web fornite da Chromium. Entrambe le API supportano la lettura di file provenienti da archivi `asar`.

### Nodo API

Con patch speciali nelle API Electron, Node come `fs. eadFile` and `require` treat `asar` archivi come directory virtuali, e i file in esso come file normali nel filesystem.

Ad esempio, supponiamo di avere un archivio `example.asar` sotto `/path/to`:

```sh
$ asar list /path/to/example.asar
/app.js
/file.txt
/dir/module.js
/static/index.html
/static/main.css
/static/jquery.min.js
```

Leggi un file nell'archivio `asar`:

```javascript
const fs = require('fs')
fs.readFileSync('/path/to/example.asar/file.txt')
```

Elenca tutti i file nella radice dell'archivio:

```javascript
const fs = require('fs')
fs.readdirSync('/path/to/example.asar')
```

Usa un modulo dall'archivio:

```javascript
require('./path/to/example.asar/dir/module.js')
```

Puoi anche visualizzare una pagina web in un archivio `asar` con `BrowserWindow`:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.loadURL('file:///path/to/example.asar/static/index.html')
```

### Web API

In una pagina web, i file in un archivio possono essere richiesti con il protocollo `file:`. Come l'API Node, gli archivi `asar` sono trattati come directory.

Ad esempio, per ottenere un file con `$.get`:

```html
<script>
let $ = require('./jquery.min.js')
$.get('file:///path/to/example.asar/file.txt', (data) => {
  console.log(data)
})
</script>
```

### Trattare un archivio `asar` come un file normale

Per alcuni casi come verificare il checksum dell'archivio `asar` , abbiamo bisogno di leggere il contenuto di un archivio `asar` come file. A questo scopo è possibile utilizzare il modulo `originale-fs` integrato che fornisce `fs` API originali senza `asar` supporto:

```javascript
const originalFs = require('original-fs')
originalFs.readFileSync('/path/to/example.asar')
```

Puoi anche impostare il processo `. oAsar` to `true` to disable the support for `asar` in the `fs` module:

```javascript
const fs = require('fs')
process.noAsar = true
fs.readFileSync('/path/to/example.asar')
```

## Limitazioni delle API Nodo

Anche se abbiamo cercato duramente di rendere gli archivi `asar` nell'API Nodo funzionano per quanto possibile come directory, ci sono ancora limitazioni dovute alla natura di basso livello dell'API Node.

### Gli Archivi Sono In Sola Lettura

Gli archivi non possono essere modificati in modo da tutte le API Nodo che possono modificare i file non funzioneranno con gli archivi `asar`.

### Directory di lavoro non può essere impostato su directory in archivio

Sebbene gli archivi `asar` siano trattati come directory, non ci sono directory effettive nel filesystem, così non puoi mai impostare la directory di lavoro su directory negli archivi `asar`. Anche superarli come l'opzione `cwd` di alcune API causerà errori.

### Scompattamento extra su alcune API

La maggior parte delle API `fs` può leggere un file o ottenere le informazioni di un file da `asar` archivi senza scompattare, ma per alcune API che si basano sul passaggio del percorso del file reale a chiamate di sistema sottostanti, Electron estrarrà il file necessario in un file temporaneo e passerà il percorso del file temporaneo alle API per farle funzionare . Questo aggiunge un po 'di sovraccarico per quelle API.

Le API che richiedono uno scompenso extra sono:

* `child_process.execFile`
* `child_process.execFileSync`
* `fs.open`
* `fs.openSync`
* `process.dlopen` - Usato da `richiedono` sui moduli nativi

### Informazioni sulla statistica falsa di `fs.stat`

L'oggetto `Statistiche` restituito da `fs. tat` e i suoi amici sui file in `asar` archivi viene generato indovinando, perché questi file non esistono sul filesystem . Quindi non dovresti fidarti dell'oggetto `Statistiche` tranne che per ottenere la dimensione del file e controllare il tipo di file.

### Eseguire Binari All'interno `asar` Archivio

Ci sono API Nodo che possono eseguire binari come `child_process.exec`, `child_process.spawn` e `child_process. xecFile`, ma solo `execFile` è supportato per eseguire binari all'interno di `asar` archivio.

Questo perché `exec` e `spawn` accettano `comando` invece di `file` come input, e `comandi`s sono eseguiti sotto shell. Non esiste un modo affidabile per determinare se un comando utilizza un file nell'archivio asar, e anche se lo facciamo, non possiamo essere sicuri se possiamo sostituire il percorso nel comando senza effetti collaterali.

## Aggiunta di file non imballati agli archivi `asar`

Come detto sopra, alcune API Nodo scompongono il file nel filesystem quando chiamato. Oltre ai problemi di prestazioni, vari scanner anti-virus potrebbero essere attivati da questo comportamento.

Come risultato, puoi lasciare vari file scompattati usando l'opzione `--unpack`. Nell'esempio seguente, le librerie condivise dei moduli nativi Node.js non saranno imballate:

```sh
$ asar pack app app.asar --unpack *.node
```

Dopo aver eseguito il comando, noterai che una cartella chiamata `app.asar.unpacked` è stata creata insieme al file `app.asar`. Contiene i file scompattati e dovrebbe essere spedito insieme all'archivio `app.asar`.

