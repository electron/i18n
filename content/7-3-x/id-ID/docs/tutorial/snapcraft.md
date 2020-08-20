# Panduan Snapcraft (Ubuntu Software Pusat & amp; Lebih)

Panduan ini memberikan informasi tentang bagaimana mengemas aplikasi Elektron Anda untuk lingkungan Snapcraft manapun, termasuk Ubuntu Software Center.

## Latar Belakang dan Persyaratan

Bersama dengan komunitas Linux yang lebih luas, Canonical bertujuan untuk memperbaiki banyak masalah instalasi perangkat lunak yang umum dengan [`snapcraft`](https://snapcraft.io/) proyek. Snaps adalah paket perangkat lunak kemasan yang mencakup kebutuhan dependensi, auto-update, dan bekerja pada semua distribusi Linux utama tanpa modifikasi sistem.

Ada tiga cara untuk membuat file ` .snap </ code>:</p>

<p spaces-before="0">1) Menggunakan <a href="https://github.com/electron-userland/electron-forge" f-id="electron-forge" fo="5"> <code> electron-forge </ code> </a> atau <a href="https://github.com/electron-userland/electron-builder" f-id="electron-builder" fo="6"> <code> pembangun elektron </ code> </a>, kedua alat yang disertakan dengan <code> snap </ code> dukung di luar kotak. Ini adalah pilihan termudah.
2) Using <code>electron-installer-snap`, which takes `electron-packager`'s output. 3) Menggunakan paket `.deb` yang sudah dibuat.

In all cases, you will need to have the `snapcraft` tool installed. We recommend building on Ubuntu 16.04 (or the current LTS).

```sh
snap install snapcraft - kelas
```

Sementara _mungkin_ untuk menginstal `snapcraft` di macos menggunakan Homebrew, itu tidak bisa membangun paket `snap` dan berfokus pada pengelolaan paket di toko.

## Menggunakan `elektron-installer-snap`

Modul ini bekerja seperti [`electron-winstaller`][electron-winstaller] dan serupa modul dalam lingkup yang terbatas pada bangunan paket snap. Anda bisa menginstal dengan:

```sh
npm install --simpan-dev electron-installer-snap
```

### Langkah 1: Kemas Aplikasi Elektron Anda

Kemas aplikasi menggunakan [paket elektron][electron-packager] (atau alat serupa). Make sure to remove `node_modules` that you don't need in your final application, since any module you don't actually need will increase your application's size.

Outputnya harus terlihat kira-kira seperti ini:

```plaintext
.
└── dist
    └── app-linux-x64
        ├── LICENSE
        ├── LICENSES.chromium.html
        ├── content_shell.pak
        ├── app
        ├── icudtl.dat
        ├── libgcrypt.so.11
        ├── libnode.so
        ├── locales
        ├── natives_blob.bin
        ├── resources
        ├── v8_context_snapshot.bin
        └── version
```

### Langkah 2: Menjalankan ` electron-installer-snap </ code></h3>

<p spaces-before="0">Dari terminal yang memiliki <code> snapcraft </ code> di <code> PATH </ code>, jalankan <code> electron-installer-snap </ code> dengan hanya parameter yang dibutuhkan <code> - src </ code>, yang merupakan lokasi paket Anda Aplikasi elektron dibuat pada langkah pertama.</p>

<pre><code class="sh">npx electron-installer-snap --src=out/myappname-linux-x64
`</pre>

Jika Anda memiliki jaringan pipa yang ada, Anda dapat menggunakan `` electron-installer-snap </ code> pemrograman. Untuk informasi lebih lanjut, lihat <a href="https://docs.snapcraft.io/build-snaps/syntax" f-id="snapcraft-syntax" fo="3">dokumentasi Snapcraft API</a>.</p>

<pre><code class="js">const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Created snap at ${snapPath}!`))
``</pre>

## Menggunakan Paket Debian yang Ada

Snapcraft mampu mengambil file ` .deb </ code> yang ada dan mengubahnya menjadi file <code> .snap </ code>. Pembuatan snap dikonfigurasi menggunakan <code> snapcraft.yaml </ code>
file yang menggambarkan sumber, dependensi, deskripsi, dan blok bangunan inti lainnya.</p>

<h3 spaces-before="0">Langkah 1: Buat Paket Debian</h3>

<p spaces-before="0">Jika Anda belum memiliki paket <code> .deb </ code>, gunakan <code> electron-installer-snap </ code> mungkin jalan yang lebih mudah untuk membuat paket snap. Namun, beberapa solusi untuk membuat paket Debian ada, termasuk <a href="https://github.com/electron-userland/electron-forge" f-id="electron-forge" fo="5"> <code> electron-forge </ code> </a>,<a href="https://github.com/electron-userland/electron-builder" f-id="electron-builder" fo="6"> <code> pembangun elektron </ kode> </a> atau <a href="https://github.com/unindented/electron-installer-debian" f-id="electron-installer-debian" fo="7"> <code> electron-installer-debian </ code> </a>.</p>

<h3 spaces-before="0">Langkah 2: Buat snapcraft.yaml</h3>

<p spaces-before="0">For more information on the available configuration options, see the
<a href="https://docs.snapcraft.io/build-snaps/syntax" f-id="snapcraft-syntax" fo="3">documentation on the snapcraft syntax</a>.
Let's look at an example:</p>

<pre><code class="yaml">name: myApp
version: '2.0.0'
summary: A little description for the app.
deskripsi: |
Kamu tahu apa? Aplikasi ini luar biasa! Itu semua untuk anda. Ada yang mengatakan itu membuat Anda muda, bahkan mungkin bahagia.

grade: stable
confinement: classic

parts:
  slack:
    plugin: dump
    source: my-deb.deb
    source-type: deb
    after:
      - desktop-gtk3
    stage-packages:
      - libasound2
      - libnotify4
      - libnspr4
      - libnss3
      - libpcre3
      - libpulse0
      - libxss1
      - libxtst6
  electron-launch:
    plugin: dump
    source: files/
    prepare: |
      chmod +x bin/electron-launch

apps:
  myApp:
    command: bin/electron-launch $SNAP/usr/lib/myApp/myApp
    desktop: usr/share/applications/myApp.desktop
    # Correct the TMPDIR path for Chromium Framework/Electron to ensure
    # libappindicator has readable resources.
    environment:
      TMPDIR: $XDG_RUNTIME_DIR
`</pre>

As you can see, the `snapcraft.yaml` instructs the system to launch a file called `electron-launch`. In this example, it passes information on to the app's binary:

```sh
#!/bin/sh

exec "$@" --executed-from="$(pwd)" --pid=$$ > /dev/null 2>&1 &
```

Atau, jika Anda membuat ` snap </ code> dengan <code> strict </ code> confinement, Andandapat menggunakan perintah <code> desktop-launch </ code>:</p>

<pre><code class="yaml">aplikasi:
  myApp:
    # Perbaiki jalur TMPDIR untuk Kerangka / Elemen Kromium untuk memastikannya
    # libappindicator memiliki sumber yang mudah dibaca.
    command: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
`</pre>

[electron-packager]: https://github.com/electron/electron-packager
[electron-winstaller]: https://github.com/electron/windows-installer
