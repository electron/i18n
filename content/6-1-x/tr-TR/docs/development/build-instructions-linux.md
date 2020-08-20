# İnşaa Talimatları (Linux)

Electron'u linux üzerinde inşaa etmek için aşağıdaki yönlendirmeleri takip edin.

## Ön gereklilikler

* En az 25GB disk alanı ve 8GB hafıza.
* Python 2.7.x. CentOS gibi bazı dağıtımlar hala Python 2.6.x kullanmakta, dolayısıyla Python versiyonunuzu `python -V` komutu ile ile kontrol edin.

  Lütfen sisteminizin ve Python sürümünün en az TLS 1.2'yi desteklediğinden emin olun. Hızlı bir test için aşağıdaki komut dosyasını çalıştırın:

  ```sh
  $ npm run check-tls
  ```

  Komut dosyası yapılandırmanızın eski bir güvenlik protokolu kullandığını döndürürse, Python'u 2.7.x sürümünün en son versiyonuna güncelleştirmek için sisteminizin paket yöneticisini kullanın. Alternatif olarak, daha detaylı açıklamalar için https://www.python.org/downloads/ adresini ziyaret edin.

* Node.js. Node'u kurmanın birden fazla yolu var. [nodejs.org](https://nodejs.org)'tan indirip derleyebilirsiniz. Bu şekilde Node'u kullanıcı dizinine standart bir şekilde kurabilirsiniz. Ya da [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories) gibi depoları deneyebilirsiniz.
* [clang](https://clang.llvm.org/get_started.html) 3.4 veya sonrası.
* GTK+ ve libnotify için geliştirme başlıkları.

Ubuntu üzerinde, aşağıdaki kütüphaneleri kurun:

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison python-dbusmock openjdk-8-jre
```

RHEL / CentOS üzerinde aşağıdaki kütüphaneleri kurun:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel python-dbusmock openjdk-8-jre
```

Fedora üzerinde aşağıdaki kütüphaneleri kurun:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel python-dbusmock openjdk-8-jre
```

Other distributions may offer similar packages for installation via package managers such as pacman. Or one can compile from source code.

### Başka sistemler için derleme

Eğer `arm` üstüne inşaa etmek istiyorsanız aşağıdaki bağımlılıkları da indirmeniz gerekir:

```sh
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                       g++-arm-linux-gnueabihf
```

Benzer olarak `arm64` için:

```sh
$ sudo apt-get install libc6-dev-arm64-cross linux-libc-dev-arm64-cross \
                       g++-aarch64-linux-gnu
```

Ve `arm` veya `ia32` hedeflerine çarpraz derlemek için `gn gen` 'e `target_cpu` parametresini vermelisiniz:

```sh
$ gn gen out/Debug --args='import(...) target_cpu="arm"'
```

## İnşaa

Bakmak [Derleme Komutları: GN](build-instructions-gn.md)

## Arıza giderme

### Hata mesajı: Error While Loading Shared Libraries: libtinfo.so.5

Prebuilt `clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## İleri düzey başlıklar

The default building configuration is targeted for major desktop Linux distributions. To build for a specific distribution or device, the following information may help you.

### İndirdiğıniz `clang` yerine sistem `clang`'ini kullanmak

Varsayılan olarak önceden oluşturulmuş electron [`clang`](https://clang.llvm.org/get_started.html) tarafından sağlanan iki dosyalar chromium projesi. Herhangi bir sebepten dolayı sisteminizde yüklü olan `clang` ile inşa etmek istiyorsanız, `clang_base_path` argümanını GN args içinde belirtebilirsiniz.

Örneğin, eğer `clang` 'ı `/usr/local/bin/clang` dizinine yüklediyseniz:

```sh
$ gn gen out/Debug --args='import("//electron/build/args/debug.gn") clang_base_path = "/usr/local/bin"'
```

### `clang` dışında derleyicileri kullanarak

Building Electron with compilers other than `clang` is not supported.
