# Istruzioni per la compilazione (Linux)

Di seguito sono riportate le linee guida per compilare Electron in ambiente Linux.

## Prerequisiti

* Almeno 25 GB di spazio su disco e 8 GB di RAM.
* Python 2.7.x. Some distributions like CentOS 6.x still use Python 2.6.x so you may need to check your Python version with `python -V`.

  Please also ensure that your system and Python version support at least TLS 1.2. For a quick test, run the following script:

  ```sh
  $ npx @electron/check-python-tls
  ```

  Se il valore di ritorno dello script dice che la tua configurazione sta utilizzando un protocollo di sicurezza scaduto, utilizza il gestore di pacchetti del tuo sistema per aggiornare Python all'ultima versione nel ramo 2.7.x. In alternativa, visita l'indirizzo https://www.python.org/downloads/ per istruzioni dettagliate.

* Node.js. Ci sono diversi modi per installare Node. Puoi scaricare i sorgenti da [nodejs.org](https://nodejs.org) e compilarli. Ciò consente di installare Node nella propria home directory come utente standard. O puoi scaricarlo da un repository come ad esempio [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
* [clang](https://clang.llvm.org/get_started.html) 3.4 o successiva.
* Intestazioni di sviluppo di GTK 3 e libnotify.

Su Ubuntu, installa le seguenti librerie:

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison python-dbusmock openjdk-8-jre
```

Su RHEL / CentOS, installa le seguenti librerie:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   nss-devel python-dbusmock openjdk-8-jre
```

Su Fedora, installa le seguenti librerie:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   nss-devel python-dbusmock openjdk-8-jre
```

Other distributions may offer similar packages for installation via package managers such as pacman. Or one can compile from source code.

### Compilazione per altre architetture

Se vuoi compilare per un target `arm` è necessario installare in aggiunta le seguenti dipendenze:

```sh
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                       g++-arm-linux-gnueabihf
```

Similarmente per `arm64`, installa i seguenti:

```sh
$ sudo apt-get install libc6-dev-arm64-cross linux-libc-dev-arm64-cross \
                       g++-aarch64-linux-gnu
```

E per compilare anche per le architetture `arm` o `ia32` devi passare il parametro `target_cpu` a `gn gen`:

```sh
$ gn gen out/Testing --args='import(...) target_cpu="arm"'
```

## Costruzione

Vedi [Istruzioni di Compilazione: GN](build-instructions-gn.md)

## Risoluzione dei problemi

### Errore Durante il Caricamento delle Librerie Condivise: libtinfo.so.5

Prebuilt `clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Impostazioni avanzate

The default building configuration is targeted for major desktop Linux distributions. To build for a specific distribution or device, the following information may help you.

### Usare `clang` di sistema invece dei binari `clang` scaricati

Per impostazione predefinita Electron è compilato con binari [`clang`](https://clang.llvm.org/get_started.html) forniti dal progetto Chromium. Se per qualche ragione vuoi compilare con il `clang` installato nel tuo sistema, puoi specificare l'argomento `clang_base_path` negli argomenti GN.

Per esempio se hai installato `clang` nella cartella `/usr/local/bin/clang`:

```sh
$ gn gen out/Testing --args='import("//electron/build/args/testing.gn") clang_base_path = "/usr/local/bin"'
```

### Usare compilatori diversi da `clang`

Non è possibile compilare Electron con compilatori diversi da `clang`.
