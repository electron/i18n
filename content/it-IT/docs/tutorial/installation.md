# Installazione

> Suggerimenti per installare Electron

Per l'installazione di file binari precompilati, usa [`npm`](https://docs.npmjs.com/). Il metodo preferito è installare Electron come dipendenza a scopo di sviluppo nella tua applicazione:

```sh
npm install electron --save-dev
```

Guarda il [documento sulle versioni di Electron](electron-versioning.md) per informazioni su come gestire versioni di Electron nelle tue applicazioni.

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

In aggiunta alla modifica dell'architettura, è inoltre possibile specificare la piattaforma (ad es., `win32`, `linux`, ecc.) utilizzando il flag `--platform`:

```shell
npm install --platform=win32 electron
```

## Proxies

If you need to use an HTTP proxy you can [set these environment variables](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables).

## Risoluzione dei problemi

When running `npm install electron`, some users occasionally encounter installation errors.

In almost all cases, these errors are the result of network problems and not actual issues with the `electron` npm package. Errors like `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` are all indications of such network problems. The best resolution is to try switching networks, or just wait a bit and try installing again.

You can also attempt to download Electron directly from [electron/electron/releases](https://github.com/electron/electron/releases) if installing via `npm` is failing.

If installation fails with an `EACCESS` error you may need to [fix your npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

If the above error persists, the [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) flag may need to be set to true:

```sh
sudo npm install electron --unsafe-perm=true
```

On slower networks, it may be advisable to use the `--verbose` flag in order to show download progress:

```sh
npm install --verbose electron
```

If you need to force a re-download of the asset and the SHASUM file set the `force_no_cache` enviroment variable to `true`.