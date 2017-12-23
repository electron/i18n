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

Di NW.js, integrasi Node di halaman web memerlukan kromium patch untuk bekerja, sementara di Elektron kita memilih cara yang berbeda untuk mengintegrasikan loop libuv dengan lingkaran pesan masing-masing platform untuk menghindari peretasan kromium. Lihat kode [` node_bindings `](https://github.com/electron/electron/tree/master/atom/common) untuk bagaimana hal itu dilakukan.

**4. Multi-konteks**

Jika Anda pengguna NW.js berpengalaman, Anda harus terbiasa dengan konsep konteks Node dan konteks web. Konsep ini ditemukan karena bagaimana NW.js diterapkan.

Dengan menggunakan [ multi-context ](https://github.com/nodejs/node-v0.x-archive/commit/756b622) Fitur Node, Electron tidak mengenalkan konteks JavaScript baru di halaman web.

Catatan: NW.js secara opsional mendukung multi-konteks sejak 0,13.