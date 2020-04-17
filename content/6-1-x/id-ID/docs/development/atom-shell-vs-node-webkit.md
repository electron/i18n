# Perbedaan Teknis Antara Elektron dan NW.js (sebelumnya node-webkit)

__Catatan: Elektron sebelumnya bernama Atom Shell.__

Seperti NW.js, Electron menyediakan platform untuk menulis aplikasi desktop dengan JavaScript dan HTML dan memiliki integrasi Node untuk memberi akses ke sistem tingkat rendah dari halaman web.

Tapi ada juga perbedaan mendasar antara kedua proyek yang menjadikan Elektron produk terpisah dari NW.js:

__1. Masuknya Aplikasi__

Di NW.js titik masuk utama aplikasi adalah halaman web atau skrip JS. Anda menentukan file html atau js di ` package.json ` dan dibuka di jendela browser sebagai jendela utama aplikasi (jika ada entri html) atau skrip dijalankan.

Di Elektron, titik masuknya adalah skrip JavaScript Alih-alih memberikan URL secara langsung, Anda secara manual membuat jendela browser dan memuat file HTML menggunakan API. Anda juga perlu mendengarkan acara di jendela untuk memutuskan kapan harus berhenti dari aplikasi.

Electron works more like the Node.js runtime. Electron's APIs are lower level so you can use it for browser testing in place of [PhantomJS](http://phantomjs.org/).

__2. Membangun Sistem__

Untuk menghindari kompleksitas membangun semua Chromium, Elektron menggunakan [` libchromiumcontent `](https://github.com/electron/libchromiumcontent) untuk mengakses API Konten Chromium. ` libchromiumcontent ` adalah satu perpustakaan bersama yang termasuk modul Konten Chromium dan semua dependensinya. Pengguna tidak perlu butuh mesin yang kuat untuk membangun Elektron.

__3. Integrasi Node__

Di NW.js, integrasi Node di halaman web memerlukan kromium patch untuk bekerja, sementara di Elektron kita memilih cara yang berbeda untuk mengintegrasikan loop libuv dengan lingkaran pesan masing-masing platform untuk menghindari peretasan kromium. Lihat kode [` node_bindings `](https://github.com/electron/electron/tree/master/atom/common) untuk bagaimana hal itu dilakukan.

__4. Multi-konteks__

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

Dengan menggunakan [ multi-context ](https://github.com/nodejs/node-v0.x-archive/commit/756b622) Fitur Node, Electron tidak mengenalkan konteks JavaScript baru di halaman web.

Catatan: NW.js secara opsional mendukung multi-konteks sejak 0,13.
