# İnşaa Talimatları (Linux)

Electron'u linux üzerinde inşaa etmek için aşağıdaki yönlendirmeleri takip edin.

## Ön gereklilikler

* En az 25GB disk alanı ve 8GB hafıza.
* Python 2.7.x. CentOS gibi bazı dağıtımlar hala Python 2.6.x kullanmakta, dolayısıyla Python versiyonunuzu `python -V` komutu ile ile kontrol edin.
    
    Please also ensure that your system and Python version support at least TLS 1.2. For a quick test, run the following script:
    
    ```sh
    $ npm run check-tls
    ```
    
    If the script returns that your configuration is using an outdated security protocol, use your system's package manager to update Python to the latest version in the 2.7.x branch. Alternatively, visit https://www.python.org/downloads/ for detailed instructions.

* Node.js. Node'u kurmanın birden fazla yolu var. [nodejs.org](https://nodejs.org)'tan indirip derleyebilirsiniz. Bu şekilde Node'u kullanıcı dizinine standart bir şekilde kurabilirsiniz. Ya da [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories) gibi depoları deneyebilirsiniz.

* [clang](https://clang.llvm.org/get_started.html) 3.4 veya sonrası.
* GTK+ ve libnotify için geliştirme başlıkları.

Ubuntu üzerinde, aşağıdaki kütüphaneleri kurun:

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison
```

RHEL / CentOS üzerinde aşağıdaki kütüphaneleri kurun:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Fedora üzerinde aşağıdaki kütüphaneleri kurun:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Diğer linux dağıtımları pacman gibi paket yöneticileri üzerinden benzer paketler sunuyor olabilir. Ya da kaynak kodtan derleyebilirsiniz.

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

And to cross-compile for `arm` or `ia32` targets, you should pass the `target_cpu` parameter to `gn gen`:

```sh
$ gn gen out/Debug --args='import(...) target_cpu="arm"'
```

## İnşaa

See [Build Instructions: GN](build-instructions-gn.md)

## Arıza giderme

### Hata mesajı: Error While Loading Shared Libraries: libtinfo.so.5

Önceden inşaa edilmiş `clang` `libtinfo.so.5` bağlantısını yapmaya çalışacak. Makinanın mimarisine göre, uygun `libncurses`'e smylink yapın:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## İleri düzey başlıklar

Varsayılan inşaa konfigurasyon'u belli başlı Linux masaüstü dağıtımları içindir. Özel bir dağıtım veya cihaz için, aşağıdaki bilgiler işinize yarayabilir.

### İndirdiğıniz `clang` yerine sistem `clang`'ini kullanmak

Varsayılan olarak önceden oluşturulmuş electron [`clang`](https://clang.llvm.org/get_started.html) tarafından sağlanan iki dosyalar chromium projesi. If for some reason you want to build with the `clang` installed in your system, you can specify the `clang_base_path` argument in the GN args.

For example if you installed `clang` under `/usr/local/bin/clang`:

```sh
$ gn gen out/Debug --args='import("//electron/build/args/debug.gn") clang_base_path = "/usr/local/bin"'
```

### `clang` dışında derleyicileri kullanarak

Building Electron with compilers other than `clang` is not supported.