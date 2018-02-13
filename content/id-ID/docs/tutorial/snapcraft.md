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
        ├── LISENSI
        ├── LICENSES.chromium.html
        ├── content_shell.pak
        ├── aplikasi
        ├── icudtl.dat
        ├── libgcrypt.so.11
        ├── libnode.so
        ├── lokal
        ├── natives_blob.bin
        Sumber daya
        ├── snapshot_blob.bin
        Versi └──
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

<p>Jika Anda belum memiliki paket <code> .deb </ code>, gunakan <code> electron-installer-snap </ code> mungkin jalan yang lebih mudah untuk membuat paket snap. Namun, beberapa solusi untuk membuat paket Debian ada, termasuk <a href="https://github.com/electron-userland/electron-forge"> <code> electron-forge </ code> </a>,<a href="https://github.com/electron-userland/electron-builder"> <code> pembangun elektron </ kode> </a> atau <a href="https://github.com/unindented/electron-installer-debian"> <code> electron-installer-debian </ code> </a>.</p>

<h3>Langkah 2: Buat snapcraft.yaml</h3>

<p>Untuk informasi lebih lanjut tentang pilihan konfigurasi yang tersedia, lihat
<a href="https://docs.snapcraft.io/build-snaps/syntax"> dokumentasi tentang sintaks snapcraft </a>.Mari kita lihat sebuah contoh:</p>

<pre><code class="yaml">nama: myApp
versi: 2.0.0
ringkasan: Sedikit deskripsi untuk aplikasi
deskripsi: |
Kamu tahu apa? Aplikasi ini luar biasa! Itu semua untuk anda. Ada yang mengatakan itu membuat Anda muda, bahkan mungkin bahagia.

grade: stabil
kurungan: klasik

bagian:
  kendur:
    plugin: dump
    sumber: my-deb.deb
    tipe sumber: deb
    setelah:

      - desktop-gtk2
    paket panggung:
      - libasound2
      - libgconf2-4
      - libnotify4
      - libnspr4
      - libnss3
      - libpcre3
      - libpulse0
      - libxss1
      - libxtst6
  peluncuran elektron:
    plugin: dump
    sumber: file /
    siapkan:
      chmod + x bin / peluncuran elektron

aplikasi:
  myApp:
    perintah: bin / peluncuran elektron $ SNAP / usr / lib / myApp / myApp
    desktop: usr / share / applications / myApp.desktop
    # Perbaiki jalur TMPDIR untuk Kerangka / Elemen Kromium untuk memastikannya
    # libappindicator memiliki sumber yang mudah dibaca.
    environment:
      TMPDIR: $XDG_RUNTIME_DIR
`</pre> 

Seperti yang Anda lihat, kode <kode> snapcraft.yaml </ code> menginstruksikan sistem untuk meluncurkan sebuah file disebut ` peluncuran elektron </ code>. Dalam contoh ini, informasi itu hanya lewat ke biner aplikasi:</p>

<pre><code class="sh">#!/bin/sh

exec "$@" --executed-from="$(pwd)" --pid=$$ > /dev/null 2>&1 &
`</pre> 

Atau, jika Anda membuat ` snap </ code> dengan <code> strict </ code> confinement, Andandapat menggunakan perintah <code> desktop-launch </ code>:</p>

<pre><code class="yaml">aplikasi:
  myApp:
    # Perbaiki jalur TMPDIR untuk Kerangka / Elemen Kromium untuk memastikannya
    # libappindicator memiliki sumber yang mudah dibaca.
    command: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
`</pre>