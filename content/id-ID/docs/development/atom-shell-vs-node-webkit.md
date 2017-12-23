# Perbedaan Teknis Antara Elektron dan NW.js (sebelumnya node-webkit)

**Catatan: Elektron sebelumnya bernama Atom Shell.**

Seperti NW.js, Electron menyediakan platform untuk menulis aplikasi desktop dengan JavaScript dan HTML dan memiliki integrasi Node untuk memberi akses ke sistem tingkat rendah dari halaman web.

Tapi ada juga perbedaan mendasar antara kedua proyek yang menjadikan Elektron produk terpisah dari NW.js:

**1. Masuknya Aplikasi**

Di NW.js titik masuk utama aplikasi adalah halaman web atau skrip JS. Anda menentukan file html atau js di ` package.json ` dan dibuka di jendela browser sebagai jendela utama aplikasi (jika ada entri html) atau skrip dijalankan.

Di Elektron, titik masuknya adalah skrip JavaScript Alih-alih memberikan URL secara langsung, Anda secara manual membuat jendela browser dan memuat file HTML menggunakan API. Anda juga perlu mendengarkan acara di jendela untuk memutuskan kapan harus berhenti dari aplikasi.

Elektron bekerja lebih mirip runtime Node.js. API Elektron lebih rendah sehingga Anda dapat menggunakannya untuk pengujian browser di tempat [ PhantomJS ](http://phantomjs.org/).

**2. Membangun Sistem**

Untuk menghindari kompleksitas membangun semua Chromium, Elektron menggunakan [` libchromiumcontent `](https://github.com/electron/libchromiumcontent) untuk mengakses API Konten Chromium. ` libchromiumcontent ` adalah satu perpustakaan bersama yang termasuk modul Konten Chromium dan semua dependensinya. Pengguna tidak perlu butuh mesin yang kuat untuk membangun Elektron.

**3. Integrasi Node**

Di NW.js, integrasi Node di halaman web memerlukan kromium patch untuk bekerja, sementara di Elektron kita memilih cara yang berbeda untuk mengintegrasikan loop libuv dengan lingkaran pesan masing-masing platform untuk menghindari peretasan kromium. See the [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) code for how that was done.

**4. Multi-context**

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

By using the [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) feature of Node, Electron doesn't introduce a new JavaScript context in web pages.

Note: NW.js has optionally supported multi-context since 0.13.