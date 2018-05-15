# Installazione

Per l'installazione di file binari precompilati, usa [`npm`](https://docs.npmjs.com). Il metodo preferito è installare Electron come dipendenza a scopo di sviluppo nella tua applicazione:

```sh
npm install electron --save-dev
```

Vedi il [documento di versione Electron](./electron-versioning.md) per informazioni su come gestire le versioni di Electron nelle tue app.

## Installazione globale

È inoltre possibile installare il comando `electron` a livello globale nel tuo `$PATH`:

```sh
npm install electron -g
```

## Personalizzazione

Se desideri modificare l'architettura che verrà scaricata (ad esempio, `ia32` su una macchina `x64`), puoi usare il flag `--arch` con npm installa oppure impostare la variabile di ambiente `npm_config_arch`:

```shell
npm install --arch=ia32 electron
```

Inoltre per cambiare architettura, puoi anche specificare la piattaforma (ad esempio, `win32`, `linux`, etc.) usando la bandiera `--piattaforma`:

```shell
npm install --platform=win32 electron
```

## Proxy

Se devi usare un proxy HTTP puoi [impostare queste variabili ambiente](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables).

## Personalizza Specchi e Cache

Durante l'installazione, il modulo `electron` richiamerà il [`download-electron`](https://github.com/electron-userland/electron-download) per scaricare binari precostruiti di Electron per la tua piattaforma. Lo farà contattanto la pagina di rilascio download di GitHub (`https://github.com/electron/electron/releases/tag/v$VERSION`, dove `$VERSION` è l'esatta versione di Electron).

Se non puoi accedere a GitHub o necessiti di fornire una build personalizzata, puoi farla o fornendo uno specchio o una directory della cache esistente.

#### Specchio

Puoi usare le variabili ambiente per annullare l'URL base, il percorso a cui si guarda per i binari Electron e per i nomi dei file binari. L'url usata da `electron-download` è composta come segue:

```txt
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

Per istanza, usare lo specchio Cina:

```txt
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
```

#### Cache

Alternativamente, puoi annullare la cache locale. `electron-download` accumulerà i binari scaricati in una directory locale per non stressare la tya rete. Puoi usare la cartella della cache per fornire build personalizzate di Electron o per evitare di entrare totalmente a contatto con la rete.

* Linux: `$XDG_CACHE_HOME` or `~/.cache/electron/`
* MacOS: `~/Libreria/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` or `~/AppData/Locale/electron/Cache/`

In ambienti che usano versioni di Electron precedenti, potresti trovare la cache anche in `~/.electron`.

Puoi anche annullare la posizione della cache locale fornendo una variabile ambiente `ELECTRON_CACHE`.

La cache contiene il file zip ufficiale così come una somma di dati, archiviati come file di testo. Una cache tipica potrebbe sembrare come la seguente:

```sh
├── electron-v1.7.9-darwin-x64.zip
├── electron-v1.8.1-darwin-x64.zip
├── electron-v1.8.2-beta.1-darwin-x64.zip
├── electron-v1.8.2-beta.2-darwin-x64.zip
├── electron-v1.8.2-beta.3-darwin-x64.zip
├── SHASUMS256.txt-1.7.9
├── SHASUMS256.txt-1.8.1
├── SHASUMS256.txt-1.8.2-beta.1
├── SHASUMS256.txt-1.8.2-beta.2
├── SHASUMS256.txt-1.8.2-beta.3
```

## Risoluzione dei problemi

Quando si esegue `npm install electron`, alcuni utenti occasionalmente si imbattono in errori di installazione.

In quasi tutti i casi, questi errori sono il risultato di problemi di rete e non problemi reali con il pacchetto npm `electron`. Errori come `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` sono tutte indicazioni di un problemi di rete. The best resolution is to try switching networks, or wait a bit and try installing again.

Puoi anche provare a scaricare Electron direttamente da [electron/electron/releases](https://github.com/electron/electron/releases) se l'installazione tramite `npm` non funziona.

Se l'installazione fallisce con un errore `EACCESS` potresti necessitare di [risolvere i tuoi permessi npm](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

Se l'errore suddetto persiste, la bandiera [permesso-insicuro](https://docs.npmjs.com/misc/config#unsafe-perm) potrebbe necessitare di essere impostata su true:

```sh
sudo npm install electron --unsafe-perm=true
```

Su reti più lenti potrebbe essere corretto usare la bandiera `--verbose` per mostrare i progressi di download:

```sh
npm install --verbose electron
```

Se devi forzare un ri-scaricamento dell'assetto e il file SHASUM della variabile ambiente `forza_no_cache` è impostata su `true`.