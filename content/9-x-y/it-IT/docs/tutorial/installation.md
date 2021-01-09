# Installazione

To install prebuilt Electron binaries, use [`npm`][npm]. Il metodo preferito è installare Electron come dipendenza da sviluppo nella tua app :

```sh
npm install electron --save-dev
```

Vedi il [documento di versione Electron][versioning] per informazioni su come gestire le versioni di Electron nelle tue app.

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

* [Nodo 10 e superiore][proxy-env-10]
* [Prima Del Nodo 10][proxy-env]

## Personalizza Specchi e Cache
During installation, the `electron` module will call out to [`@electron/get`][electron-get] to download prebuilt binaries of Electron for your platform. Lo farà contattanto la pagina di rilascio download di GitHub (`https://github.com/electron/electron/releases/tag/v$VERSION`, dove `$VERSION` è l'esatta versione di Electron).

Se non puoi accedere a GitHub o necessiti di fornire una build personalizzata, puoi farla o fornendo uno specchio o una directory della cache esistente.

#### Specchio
Puoi usare le variabili ambiente per annullare l'URL base, il percorso a cui si guarda per i binari Electron e per i nomi dei file binari. The url used by `@electron/get` is composed as follows:

```plaintext
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

Per istanza, usare lo specchio Cina:

```plaintext
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
```

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

You can also attempt to download Electron directly from [electron/electron/releases][releases] if installing via `npm` is failing.

If installation fails with an `EACCESS` error you may need to [fix your npm permissions][npm-permissions].

If the above error persists, the [unsafe-perm][unsafe-perm] flag may need to be set to true:

```sh
sudo npm install electron --unsafe-perm=true
```

Su reti più lenti potrebbe essere corretto usare la bandiera `--verbose` per mostrare i progressi di download:

```sh
npm install --verbose electron
```

Se devi forzare un ri-scaricamento dell'assetto e il file SHASUM della variabile ambiente `forza_no_cache` è impostata su `true`.

[npm]: https://docs.npmjs.com
[versioning]: ./electron-versioning.md
[releases]: https://github.com/electron/electron/releases
[proxy-env-10]: https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables
[proxy-env]: https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config
[electron-get]: https://github.com/electron/get
[npm-permissions]: https://docs.npmjs.com/getting-started/fixing-npm-permissions
[unsafe-perm]: https://docs.npmjs.com/misc/config#unsafe-perm
