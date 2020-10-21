# Installation

To install prebuilt Electron binaries, use [`npm`][npm]. Die bevorzugte Methode ist Electron als Entwicklungsabhängigkeit in Ihrer App zu installieren:

```sh
npm install electron --save-dev
```

See the [Electron versioning doc][versioning] for info on how to manage Electron versions in your apps.

## Globale Installation

Sie können den `electron`-Befehl auch global in Ihrer `$PATH`-Variable installieren:

```sh
npm install electron -g
```

## Individuelle Anpassung

Falls Sie die herunterzuladende Architektur ändern möchten (z.B. `ia32` auf einem `x64`-Rechner), dann können Sie den `--arch`-Flag verwenden oder die Umgebungsvariable `npm_config_arch` setzen:

```shell
npm install --arch=ia32 electron
```

Zusätzlich zur Änderung der Architektur können Sie auch die Plattform (z.B. `win32`, `linux`, usw.) mittels des `--platform`-Flags spezifizieren:

```shell
npm install --platform=win32 electron
```

## Proxys

Wenn Sie einen HTTP-Proxy verwenden möchten, müssen Sie die `ELECTRON_GET_USE_PROXY` Variable auf jeden Wert setzen plus zusätzliche Umgebungsvariablen, abhängig von der Knotenversion Ihres Host-Systems:

* [Knoten 10 und höher][proxy-env-10]
* [Vor Knoten 10][proxy-env]

## Benutzerdefinierte Mirrors und Caches
During installation, the `electron` module will call out to [`@electron/get`][electron-get] to download prebuilt binaries of Electron for your platform. Sie wird dies tun, indem Sie GitHubs Release-Download-Seite (`https://github. om/electron/releases/tag/v$VERSION`, wobei `$VERSION` die exakte Version von Electronic ist).

Wenn du nicht auf GitHub zugreifen kannst oder eine benutzerdefinierte Version bereitstellen musst, du kannst das tun, indem du entweder einen Mirror oder ein existierendes Cache-Verzeichnis bereitstellst.

#### Spiegeln
Sie können Umgebungsvariablen verwenden, um die Basis-URL zu überschreiben, den Pfad, mit dem Sie nach Electron-Binärdateien suchen und den Binärdateinamen überschreiben. The url used by `@electron/get` is composed as follows:

```plaintext
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

For instance, to use the China mirror:

```plaintext
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
```

#### Cache
Alternativ können Sie den lokalen Cache überschreiben. `@electron/get` speichert heruntergeladene Binärdateien in einem lokalen Verzeichnis, um Ihr Netzwerk nicht zu belasten. You can use that cache folder to provide custom builds of Electron or to avoid making contact with the network at all.

* Linux: `$XDG_CACHE_HOME` oder `~/.cache/electron/`
* MacOS: `~/Library/Caches/electron/`
* Fenster: `$LOCALAPPDATA/electron/Cache` oder `~/AppData/Lokal/Elektronik/Cache/`

Auf Umgebungen, die ältere Versionen von Electron verwendet haben, könnte der Cache auch in `~/.electron` gefunden werden.

You can also override the local cache location by providing a `ELECTRON_CACHE` environment variable.

Der Cache enthält die offizielle Zip-Datei der Version sowie eine Prüfsumme, die als eine Textdatei gespeichert wird. Ein typischer Cache könnte so aussehen:

```sh
<unk> 文<unk> httpsgithub.comelectronreleasesdownloadv1.7.9electron-v1.7.9-darwin-x64.zip
<unk> <unk> <unk> <unk> <unk> <unk> <unk> <unk> electron-v1.7.9-darwin-x64.zip
<unk> httpsgithub.comelectronreleasesdownloadv1.7.9SHASUMS256.txt
<unk> <unk> <unk> <unk> SHASUMS256.txt
<unk> httpsgithub.comelectronreleasesdownloadv1.8.1electron-v1.8.1-darwin-x64. ip
<unk> <unk> <unk> <unk> <unk> <unk> electron-v1.8.1-darwin-x64.zip
<unk> 本<unk> httpsgithub.comelectronreleasesdownloadv1.8.1SHASUMS256.txt
<unk> <unk> 日<unk> SHASUMS256.txt
<unk> httpsgiub. omelectronelectronreleasesdownloadv1.8.2-beta.1electron-v1.8.2-beta.1-darwin-x64.zip
<unk> <unk> <unk> <unk> <unk> electron-v1.8.2-beta.1-darwin-x64.zip
<unk> httpsgithub. omelectronelectronreleasesdownloadv1.8.2-beta.1SHASUMS256.txt
<unk> <unk> 本<unk> SHASUMS256.txt
<unk> httpsgithub.comelectronreleasesdownloadv1.8.2-beta.2electron-v1.8.2-beta.2-beta.2-darwin-x64.zip
<unk> <unk> <unk> <unk> <unk> <unk> electron-v1.8.2-beta.2-darwin-x64.zip
<unk> httpsgithub.comelectronreleasesdownloadv1.8.2-beta. SHASUMS256.txt
<unk> <unk> <unk> <unk> <unk> SHASUMS256.txt
<unk> 本<unk> httpsgithub.comelectronreleasesdownloadv1.8.2-beta.3electron-v1.8.2-beta.3-darwin-x64. ip
<unk> <unk> <unk> <unk> <unk> Electron-v1.8.2-beta.3-darwin-x64.zip
<unk> httpsgithub.comelectronreleasesdownloadv1.8.2-beta.3SHASUMS256.txt
    <unk> 日<unk> SHASUMS256.txt
```

## Binärdownload überspringen
Beim Installieren des `Elektron` NPM-Pakets wird das Elektron Programm automatisch heruntergeladen.

Dies kann manchmal unnötig sein, z.B. in einer CI-Umgebung, wenn eine andere Komponente getestet wird.

Um zu verhindern, dass das Programm heruntergeladen wird, wenn Sie alle npm Abhängigkeiten installieren, können Sie die Umgebungsvariable `ELECTRON_SKIP_BINARY_DOWNLOAD` setzen. Z.B.:
```sh
ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm Installation
```

## Problemlösungen

Beim Ausführen von `npm install electron` können bei einigen Nutzern gelegentlich Installationsfehler auftreten.

In fast allen Fällen sind diese Fehler das Ergebnis von Netzwerkproblemen und nicht von tatsächlichen Problemen mit dem Paket `electron` npm. Fehler wie `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` weisen alle auf ein Problem mit dem Netzwerk hin. Die beste Lösung ist es zu Versuchen die Netzwerkverbindung zu wechseln oder etwas zu warten und die Installation erneut zu versuchen.

You can also attempt to download Electron directly from [electron/electron/releases][releases] if installing via `npm` is failing.

If installation fails with an `EACCESS` error you may need to [fix your npm permissions][npm-permissions].

If the above error persists, the [unsafe-perm][unsafe-perm] flag may need to be set to true:

```sh
sudo npm install electron --unsafe-perm=true
```

In langsameren Netzwerken kann es ratsam sein, das `--verbose` Flag zu verwenden, um den Downloadfortschritt anzuzeigen:

```sh
npm install --verbose electron
```

Wenn Sie einen erneuten Download des Assets und der SHASUM-Datei erzwingen müssen, setzen Sie die `force_no_cache` Umgebungsvariable auf `true`.

[npm]: https://docs.npmjs.com
[versioning]: ./electron-versioning.md
[releases]: https://github.com/electron/electron/releases
[proxy-env-10]: https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables
[proxy-env]: https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config
[electron-get]: https://github.com/electron/get
[npm-permissions]: https://docs.npmjs.com/getting-started/fixing-npm-permissions
[unsafe-perm]: https://docs.npmjs.com/misc/config#unsafe-perm
