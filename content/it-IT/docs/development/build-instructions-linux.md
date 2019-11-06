# Istruzioni per la compilazione (Linux)

Segui le seguenti linee guida per compilare Electron su Linux.

## Prerequisiti

* Almeno 25 GB di spazio su disco e 8 GB di RAM.
* Python 2.7.x. Alcune distribuzioni, come ad esempio CentOS 6.x, utilizzano ancora Python 2.6.x potresti quindi avere la necessità di controllare la versione di Python installata con `python -V`.
    
    Ti preghiamo inoltre di verificare che il tuo sistema e la versione di Python attualmente installata supportino almeno TLS 1.2. Puoi controllare rapidamente eseguendo questo script:
    
    ```sh
    $ npx @electron/check-python-tls
    ```
    
    Se il valore di ritorno dello script dice che la tua configurazione sta utilizzando un protocollo di sicurezza scaduto, utilizza il gestore di pacchetti del tuo sistema per aggiornare Python all'ultima versione nel ramo 2.7.x. In alternativa, visita l'indirizzo https://www.python.org/downloads/ per istruzioni dettagliate.

* Node.js. Ci sono diversi modi per installare Node. Puoi scaricare i sorgenti da [nodejs.org](https://nodejs.org) e compilarli. Ciò consente di installare Node nella propria home directory come utente standard. O puoi scaricarlo da un repository come ad esempio [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).

* [clang](https://clang.llvm.org/get_started.html) 3.4 o successiva.
* Headers di sviluppo per GTK+ e libnotify.

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

Altre distribuzioni possono offrire pacchetti simili per l'installazione tramite gestori di pacchetti come pacman. Oppure si possono compilare dai sorgenti.

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

E per cross-compilare per `arm` o `ia32` devi passare il parametro `target_cpu` a `gn gen`:

```sh
$ gn gen out/Debug --args='import(...) target_cpu="arm"'
```

## Compilazione

Vedi [Istruzioni di Compilazione: GN](build-instructions-gn.md)

## Risoluzione dei problemi

### Errore Durante il Caricamento delle Librerie Condivise: libtingo.so.5

`clang` precostruito proverà a collegarsi a `libtinfo.so.5`. In base all'architettura dell'host, symlink a `libncurses` appropriate:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Argomenti avanzati

La configurazione di costruzione predefinita è destinata alle principali distribuzioni Linux desktop. Per creare una distribuzione o un dispositivo specifico, le seguenti informazioni potrebbero essere di aiuto.

### Usare `clang` di sistema invece dei binari `clang` scaricati

Per impostazione predefinita Electron è compilato con binari [`clang`](https://clang.llvm.org/get_started.html) forniti dal progetto Chromium. Se per qualche ragione vuoi compilare con il `clang` installato nel tuo sistema, puoi specificare l'argomento `clang_base_path` negli argomenti GN.

Per esempio se hai installato `clang` sotto `/usr/local/bin/clang`:

```sh
$ gn gen out/Debug --args='import("//electron/build/args/debug.gn") clang_base_path = "/usr/local/bin"'
```

### Usare compilatori diversi da `clang`

Non è possibile compilare Electron con compilatori diversi da `clang`.