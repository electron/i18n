# Installazione

Per installare binari Electron precostruiti, utilizzare [`npm`](https://docs.npmjs.com). Il metodo preferito è installare Electron come dipendenza da sviluppo nella tua app :

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

Inoltre per cambiare architettura, puoi anche specificare la piattaforma (ad esempio, `win32`, `linux`, etc.) usando la flag `--piattaforma`:

```shell
npm install --platform=win32 electron
```

## Proxy

Se ti serve usare un HTTP proxy, devi impostare `ELECTRON_GET_USE_PROXY` variable to any value, plus additional environment variables depending on your host system's Node version:

* [Nodo 10 e superiore](https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables)
* [Prima Del Nodo 10](https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config)

## Personalizza Specchi e Cache
Durante l'installazione, il modulo `electron` chiamerà [`@electron/get`](https://github.com/electron/get) per scaricare i binari precostruiti di Electron per la tua piattaforma. Lo farà contattanto la pagina di rilascio download di GitHub (`https://github.com/electron/electron/releases/tag/v$VERSION`, dove `$VERSION` è l'esatta versione di Electron).

Se non puoi accedere a GitHub o necessiti di fornire una build personalizzata, puoi farla o fornendo uno specchio o una directory della cache esistente.

#### Specchio
Puoi usare le variabili ambiente per annullare l'URL base, il percorso a cui si guarda per i binari Electron e per i nomi dei file binari. L'URL utilizzato da `@electron/get` è composto come segue:

```javascript
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

Per esempio, utilizzare lo specchio CDN Cina:

```shell
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
```

Per impostazione predefinita, `ELECTRON_CUSTOM_DIR` è impostato a `v$VERSION`. Per cambiare il formato, usa il segnaposto `{{ version }}`. Ad esempio, `version-{{ version }}` risolve `version-5.0.`, `{{ version }}` risolve a `5.0.`, e `v{{ version }}` è equivalente al valore predefinito. Come esempio più concreto, per utilizzare lo specchio cinese non-CDN:

```shell
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
ELECTRON_CUSTOM_DIR="{{ version }}"
```

La configurazione sopra descritta scaricherà da URL come `https://npm.taobao.org/mirrors/electron/8.0.0/electron-v8.0.0-linux-x64.zip`.

#### Cache
Alternativamente, puoi annullare la cache locale. `@electron/get` inserirà nella cache i binari scaricati in una directory locale per non stressare la rete. Puoi usare la cartella della cache per fornire build personalizzate di Electron o per evitare di entrare totalmente a contatto con la rete.

* Linux: `$XDG_CACHE_HOME` or `~/.cache/electron/`
* macOS: `~/Libreria/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` or `~/AppData/Locale/electron/Cache/`

In ambienti che usano versioni di Electron precedenti, potresti trovare la cache anche in `~/.electron`.

Puoi anche sovrascrivere la posizione della cache locale fornendo una variabile di ambiente `electron_config_cache` .

La cache contiene il file zip ufficiale della versione e un checksum, memorizzato come un file di testo. Una cache tipica potrebbe assomigliare a questa:

```sh
├── httpsgithub.comelectronelectronreleasesdownloadv1.7.9electron-v1.7.9-darwin-x64.zip
│   └── electron-v1.7.9-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.7.9SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.1electron-v1.8.1-darwin-x64.zip
│   └── electron-v1.8.1-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.1SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.1electron-v1.8.2-beta.1-darwin-x64.zip
│   └── electron-v1.8.2-beta.1-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.1SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.2electron-v1.8.2-beta.2-darwin-x64.zip
│   └── electron-v1.8.2-beta.2-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.2SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.3electron-v1.8.2-beta.3-darwin-x64.zip
│   └── electron-v1.8.2-beta.3-darwin-x64.zip
└── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.3SHASUMS256.txt
    └── SHASUMS256.txt
```

## Salta download binario
Quando si installa il pacchetto NPM `electron` , si scarica automaticamente il binario elettronico.

A volte ciò può risultare inutile, ad esempio in un ambiente IC, durante la prova di un altro componente.

Per evitare che il binario venga scaricato quando si installa tutte le dipendenze npm è possibile impostare la variabile di ambiente `ELECTRON_SKIP_BINARY_DOWNLOAD`. Ad esempio:
```sh
ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm install
```

## Risoluzione dei problemi

Quando si esegue `npm install electron`, alcuni utenti occasionalmente si imbattono in errori di installazione.

In quasi tutti i casi, questi errori sono il risultato di problemi di rete e non problemi reali con il pacchetto npm `electron`. Errori come `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` sono tutte indicazioni di un problemi di rete. La migliore soluzione è provare a cambiare rete, oppure attendere un po' di tempo e provare nuovamente ad eseguire l'installazione.

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
