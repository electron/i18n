# Build Anweisungen (Linux)

Befolgen Sie die folgenden Richtlinien für den Aufbau von Electron unter Linux.

## Vorrausetzungen

* Mindestens 25 GB Speicherplatz und 8 GB RAM.
* Python 2.7.x. Einige Distributionen wie CentOS 6.x verwenden immer noch Python 2.6.x , so dass Sie möglicherweise Ihre Python-Version mit `python -V`überprüfen müssen.

  Stellen Sie außerdem sicher, dass Ihr System und Ihre Python-Version mindestens TLS 1.2 unterstützen. Führen Sie für einen Schnelltest das folgende Skript aus:

  ```sh
  $px @electron/check-python-tls
  ```

  Wenn das Skript zurückkehrt, dass Ihre Konfiguration ein veraltetes -Protokoll verwendet, verwenden Sie den Paket-Manager Ihres Systems, um Python auf die neueste Version im Zweig 2.7.x zu aktualisieren. Alternativ können Sie https://www.python.org/downloads/ für detaillierte Anweisungen besuchen.

* Node.js. Es gibt verschiedene Möglichkeiten, Node zu installieren. Sie können Quellcode aus [nodejs.org](https://nodejs.org) herunterladen und kompilieren. Dies ermöglicht die Installation von Node in Ihrem eigenen Home-Verzeichnis als Standardbenutzer. Oder versuchen Sie Repositories wie [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
* [clang](https://clang.llvm.org/get_started.html) 3.4 oder höher.
* Entwicklungsheader von GTK 3 und libnotify.

Installieren Sie auf Ubuntu die folgenden Bibliotheken:

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev
                       libnotify-dev libgnome-keyring-dev -
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev -
                       libxss1 libnss3-dev gcc-multilib g++-multilib
                       curl
```

Installieren Sie auf RHEL / CentOS die folgenden Bibliotheken:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel é
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-de
                   vel
```

Installieren Sie auf Fedora die folgenden Bibliotheken:

```sh
$udo dnf install clang dbus-devel gtk3-devel libnotify-devel
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel é
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-de
                   vel
```

Installieren Sie auf Arch Linux / Manjaro die folgenden Bibliotheken:

```sh
$udo pacman -Syu base-devel clang libdbus gtk2 libnotify é
                   libgnome-keyring alsa-lib libcap libcups libxtst '
                   libxss nss gcc-multilib curl gperf bison '
                   python2 python-dbusmock jdk8-openjdk
```

Andere Distributionen können ähnliche Pakete für die Installation über Paket- -Manager wie pacman anbieten. Oder man kann aus dem Quellcode kompilieren.

### Kreuzkompilierung

Wenn Sie für ein `arm` Ziel erstellen möchten, sollten Sie auch die folgenden Abhängigkeiten installieren:

```sh
$udo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross -
                       g++-arm-linux-gnueabihf
```

Installieren Sie für `arm64`auch Folgendes:

```sh
$udo apt-get install libc6-dev-arm64-cross linux-libc-dev-arm64-
                       cross
```

Und um für `arm` oder `ia32` Ziele zu kompilieren, sollten Sie den parameter `target_cpu` an `gn gen`übergeben:

```sh
$ gn gen out/Testing --args='import(...) target_cpu="arm"'
```

## Building

Siehe [Build Instruktionen: GN](build-instructions-gn.md)

## Problemlösungen

### Fehler beim Laden freigegebener Bibliotheken: libtinfo.so.5

Vorgefertigte `clang` versuchen, eine Verknüpfung mit `libtinfo.so.5`herzustellen. Je nach Host- -Architektur, symlink zu geeigneten `libncurses`:

```sh
$udo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Erweiterte Themen

Die Standard-Gebäudekonfiguration ist für wichtige Desktop-Linux- -Distributionen vorgesehen. Um für eine bestimmte Distribution oder ein bestimmtes Gerät zu erstellen, können Ihnen die folgenden Informationen helfen.

### Verwenden von `clang` anstelle von `clang` Binärdateien

Standardmäßig ist Electron mit vorgefertigten [`clang`](https://clang.llvm.org/get_started.html) Binärdateien des Chromium-Projekts erstellt. Wenn Sie aus irgendeinem Grund mit dem in Ihrem System installierten `clang` erstellen möchten, können Sie das argument `clang_base_path` in den GN args angeben.

Wenn Sie z. B. `clang` unter `/usr/local/bin/clang`installiert haben:

```sh
$ gn gen out/Testing --args='import(">electron/build/args/testing.gn") clang_base_path = "/usr/local/bin"'
```

### Verwenden anderer Compiler als `clang`

Das Erstellen von Electron mit anderen Compilern als `clang` wird nicht unterstützt.
