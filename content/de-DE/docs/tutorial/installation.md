# Installation

> Tipps zum Installieren von Electron

Nutzen Sie [`npm`](https://docs.npmjs.com/) um Electron als vorgefertigtes Archiv zu installieren. Die bevorzugte Methode ist jedoch, Electron als Abhängigkeit in Ihrer App einzubinden:

```sh
npm install electron --save-dev
```

Mehr Informationen zur Versionsverwaltung in ihren Apps entnehmen Sie bitte der Dokumentation zur [Versionierung von Electron](electron-versioning.md).

## Globale Installation

Sie können den `electron`-Befehl auch global in Ihrer `$PATH`-Variable installieren:

```sh
npm install electron -g
```

## Individuelle Anpassung

Falls Sie die herunterzuladende Architektur ändern möchten (z.B. `ia32` auf einem `x64`-Rechner), dann können Sie den `--arch` -Flag verwenden oder die Umgebungsvariable `npm_config_arch` setzen:

```shell
npm install --arch=ia32 electron
```

Zusätzlich zur Änderung der Architektur können Sie auch die Plattform (z.B. `win32`, `linux`, usw.) mittels des `--platform` -Flags spezifizieren:

```shell
npm install --platform=win32 electron
```

## Proxys

Sofern Sie einen HTTP-Proxy nutzen müssen, können Sie [diese Umgebungsvariablen](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables) setzen.

## Problemlösungen

Während der Installation mittels `npm install electron` stoßen einige Nutzer gelegentlich auf Fehler.

In beinahe allen Fällen entstehen diese Fehler durch Netzwerkprobleme und nicht durch tatsächliche Fehler mit dem `electron` npm-Paket. Fehler wie `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` und `ETIMEDOUT` weisen alle auf ein Problem mit dem Netzwerk hin. Die beste Lösung besteht oftmals darin, das Netzwerk zu wechseln oder nach kurzer Zeit die Installation erneut zu versuchen.

Sie können versuchen, Electron direkt von [electron/electron/releases](https://github.com/electron/electron/releases) herunterzuladen, falls die Installation mit `npm` fehlschlägt.

Sollte die Installation durch einen `EACCESS` -Fehler fehlschlagen, dann gibt es möglicherweise Probleme mit Ihren [npm-Berechtigungen](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

If the above error persists, the [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) flag may need to be set to true:

```sh
sudo npm install electron --unsafe-perm=true
```

On slower networks, it may be advisable to use the `--verbose` flag in order to show download progress:

```sh
npm install --verbose electron
```

If you need to force a re-download of the asset and the SHASUM file set the `force_no_cache` enviroment variable to `true`.