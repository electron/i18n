# Struktur Direktori Sumber Kode

Kode sumber dari electron dipisahkan menjadi beberapa bagian, sebagian besar mengikuti Chromium pada konvensi pemisahan.

Anda mungkin perlu terbiasa dengan [multi-proses Chromium's arsitektur](http://dev.chromium.org/developers/design-documents/multi-process-architecture) untuk memahami kode sumber yang lebih baik.

## Struktur Sumber Kode

```sh
Electron
├── atom/ - C++ sumber kode.
|   ├── app / - Sistem daftar kode.
|   ├── browser/ -  Frontend termasuk jendela utama, UI, dan semua
|   |   hal proses utama. Ini berbicara kepada renderer untuk mengelola halaman web.
|   |   ├── ui/ - Implementasi barang UI untuk platform yang berbeda.
|   |   |   ├── cocoa/ - Kode sumber spesifik kakao.
|   |   |   ├── win/ - Windows GUI sumber kode spesifik.
|   |   |   └── x/ - X11 sumber kode spesifik.
|   |   ├── api/ - Implementasi dari proses utama APIs.
|   |   ├── net/ - kode jaringan terkait.
|   |   ├── mac/ - Sumber kode Objective-C Mac tertentu.
|   |   └── resources/ - Ikon, file yang bergantung pada platform, dll.
|   ├── renderer/ - Kode yang berjalan dalam proses renderer.
|   |   └── api/ - Implementasi proses renderer APIs.
|   └── common/ - Kode yang digunakan oleh proses utama dan renderer,
|       termasuk beberapa fungsi utilitas dan kode untuk mengintegrasikan pesan node
|       loop ke loop pesan Chromium.
|       └── api/ - Pelaksanaan API umum, dan yayasan
|           Modul built-in Electron.
├── chromium_src / - Sumber kode disalin dari Chromium. Lihat di bawah.
├── default_app / - Halaman default untuk ditampilkan saat Electron dimulai tanpa
|   menyediakan sebuah aplikasi.
├── docs/ - Dokumentasi.
├── lib/ - Sumber kode JavaScript.
|   ├── browser/ - kode inisialisasi proses utama javascript.
|   |   └── api/ - Implementasi API Javascript.
|   ├── common/ - JavaScript digunakan oleh proses utama dan renderer
|   |   └── api/ - Implementasi API Javascript.
|   └── renderer/ - Kode inisialisasi proses renderer utama javascript.
|       └── api/ - Implementasi API Javascript.
├── spec / - tes otomatis.
├── electron.gyp - Aturan pembangunan electron.
└── common.gypi - Pengaturan spesifik Compiler dan aturan bangunan untuk lainnya
     komponen seperti `node` dan` breakpad`.
```

## `/chromium_src`

File di `/chromium_src` cenderung menjadi potongan Chromium yang bukan bagian dari lapisan konten. Misalnya untuk menerapkan Pepper API, kita memerlukan beberapa kabel mirip dengan yang dilakukan Chrome resmi. Kita bisa membangun yang relevan sumber sebagai bagian dari [libcc](../glossary.md#libchromiumcontent) tapi kebanyakan Seringkali kita tidak memerlukan semua fitur (beberapa cenderung berpemilik, barang analisis) jadi kami hanya mengambil bagian dari kode. These could have easily been patches in libcc, but at the time when these were written the goal of libcc was to maintain very minimal patches and chromium_src changes tend to be big ones. Also, note that these patches can never be upstreamed unlike other libcc patches we maintain now.

## Structure of Other Directories

* **script** - Scripts used for development purpose like building, packaging, testing, etc.
* **tools** - Helper scripts used by gyp files, unlike `script`, scripts put here should never be invoked by users directly.
* **vendor** - Source code of third party dependencies, we didn't use `third_party` as name because it would confuse it with the same directory in Chromium's source code tree.
* **node_modules** - Third party node modules used for building.
* **out** - Temporary output directory of `ninja`.
* **dist** - Temporary directory created by `script/create-dist.py` script when creating a distribution.
* **external_binaries** - Downloaded binaries of third-party frameworks which do not support building with `gyp`.

## Keeping Git Submodules Up to Date

The Electron repository has a few vendored dependencies, found in the [/vendor](https://github.com/electron/electron/tree/master/vendor) directory. Occasionally you might see a message like this when running `git status`:

```sh
$ git status

    modified:   vendor/libchromiumcontent (new commits)
    modified:   vendor/node (new commits)
```

To update these vendored dependencies, run the following command:

```sh
git submodule update --init --recursive
```

If you find yourself running this command often, you can create an alias for it in your `~/.gitconfig` file:

```sh
[alias]
    su = submodule update --init --recursive
```