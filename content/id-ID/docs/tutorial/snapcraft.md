# Panduan Snapcraft (Ubuntu Software Pusat & amp; Lebih)

Panduan ini memberikan informasi tentang bagaimana mengemas aplikasi Elektron Anda untuk lingkungan Snapcraft manapun, termasuk Ubuntu Software Center.

## Latar Belakang dan Persyaratan

Bersama dengan komunitas Linux yang lebih luas, Canonical bertujuan untuk memperbaiki banyak masalah instalasi perangkat lunak yang umum dengan  ` snapcraft </ code> </a> proyek. Snaps adalah paket perangkat lunak kemasan yang mencakup kebutuhan
dependensi, auto-update, dan bekerja pada semua distribusi Linux utama tanpa modifikasi sistem.</p>

<p>Ada tiga cara untuk membuat file <code> .snap </ code>:</p>

<p>1) Menggunakan <a href="https://github.com/electron-userland/electron-forge"> <code> electron-forge </ code> </a> atau <a href="https://github.com/electron-userland/electron-builder"> <code> pembangun elektron </ code> </a>, kedua alat yang disertakan dengan <code> snap </ code> dukung di luar kotak. Ini adalah pilihan termudah.
2) Menggunakan <code> electron-installer-snap </ code>, yang mengambil <code> electron-packager </ code> 's output.
3) Menggunakan paket <code> .deb </ code> yang sudah dibuat.</p>

<p>Dalam semua kasus, Anda perlu menginstal <code> snapcraft </ code>. Kita
merekomendasikan membangun di Ubuntu 16.04 (atau LTS saat ini).</p>

<pre><code class="sh">snap install snapcraft - kelas
`</pre> 

Sementara * mungkin </ em> untuk menginstal ` snapcraft </ code> di macos menggunakan Homebrew, itu tidak bisa membangun paket <code> snap </ code> dan berfokus pada pengelolaan paket di toko.</p>

<h2>Menggunakan <code> electron-installer-snap </ code></h2>

<p>Modul ini bekerja seperti <a href="https://github.com/electron/windows-installer"> <code> electron-winstaller </ code> </a> dan serupa modul dalam lingkup yang terbatas pada bangunan paket snap. Anda bisa menginstal dengan:</p>

<pre><code class="sh">npm install --simpan-dev electron-installer-snap
`</pre> 

### Langkah 1: Kemas Aplikasi Elektron Anda

Kemas aplikasi menggunakan [ paket elektron ](https://github.com/electron-userland/electron-packager) (atau alat serupa). Pastikan untuk menghapus ` node_modules </ code> yang tidak Anda butuhkan di komputer Anda Aplikasi terakhir, karena setiap modul yang sebenarnya tidak Anda butuhkan hanya akan meningkat ukuran aplikasi anda.</p>

<p>Outputnya harus terlihat kira-kira seperti ini:</p>

<pre><code class="text">.
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
        ├── snapshot_blob.bin
        └── version
`</pre> 

### Langkah 2: Menjalankan ` electron-installer-snap </ code></h3>

<p>Dari terminal yang memiliki <code> snapcraft </ code> di <code> PATH </ code>, jalankan <code> electron-installer-snap </ code> dengan hanya parameter yang dibutuhkan <code> - src </ code>, yang merupakan lokasi paket Anda Aplikasi elektron dibuat pada langkah pertama.</p>

<pre><code class="sh">npx electron-installer-snap --src=out/myappname-linux-x64
`</pre> 

Jika Anda memiliki jaringan pipa yang ada, Anda dapat menggunakan `` electron-installer-snap </ code> pemrograman. Untuk informasi lebih lanjut, lihat <a href="https://docs.snapcraft.io/build-snaps/syntax">dokumentasi Snapcraft API</a>.</p>

<pre><code class="js">const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Created snap at ${snapPath}!`))
``</pre> 

## Menggunakan Paket Debian yang Ada

Snapcraft mampu mengambil file ` .deb </ code> yang ada dan mengubahnya menjadi file <code> .snap </ code>. Pembuatan snap dikonfigurasi menggunakan <code> snapcraft.yaml </ code>
file yang menggambarkan sumber, dependensi, deskripsi, dan blok bangunan inti lainnya.</p>

<h3>Langkah 1: Buat Paket Debian</h3>

<p>Jika Anda belum memiliki paket <code> .deb </ code>, gunakan <code> electron-installer-snap </ code> mungkin jalan yang lebih mudah untuk membuat paket snap. However, multiple solutions
for creating Debian packages exist, including <a href="https://github.com/electron-userland/electron-forge"><code>electron-forge`</a>, [`electron-builder`](https://github.com/electron-userland/electron-builder) or [`electron-installer-debian`](https://github.com/unindented/electron-installer-debian).

### Step 2: Create a snapcraft.yaml

For more information on the available configuration options, see the [documentation on the snapcraft syntax](https://docs.snapcraft.io/build-snaps/syntax). Let's look at an example:

```yaml
name: myApp
version: 2.0.0
summary: A little description for the app.
description: |
 You know what? This app is amazing! It does all the things
 for you. Some say it keeps you young, maybe even happy.

grade: stable
confinement: classic

parts:
  slack:
    plugin: dump
    source: my-deb.deb
    source-type: deb
    after:

      - desktop-gtk2
    stage-packages:
      - libasound2
      - libgconf2-4
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
```

As you can see, the `snapcraft.yaml` instructs the system to launch a file called `electron-launch`. In this example, it simply passes information on to the app's binary:

```sh
#!/bin/sh

exec "$@" --executed-from="$(pwd)" --pid=$$ > /dev/null 2>&1 &
```

Alternatively, if you're building your `snap` with `strict` confinement, you can use the `desktop-launch` command:

```yaml
apps:
  myApp:
    # Correct the TMPDIR path for Chromium Framework/Electron to ensure
    # libappindicator has readable resources.
    command: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
```