# Upgrade Node

## Diskusi

One upgrade issue is building all of Electron with a single copy of V8 to ensure compatibility. Hal ini penting karena hulu Node dan [libchromiumcontent](upgrading-chromium.md) keduanya menggunakan versi V8 mereka sendiri.

Upgrade Node jauh lebih mudah daripada meng-upgrade libchromiumcontent, jadi lebih sedikit konflik muncul jika seseorang mengupgrade konten libchromium terlebih dahulu, kemudian memilih rilis Node hulu yang V8 terdekat dengannya.

Elektron memiliki garpu [Node sendiri](https://github.com/electron/node) dengan modifikasi untuk detail build V8 yang berisiko di atas dan untuk mengekspos API yang dibutuhkan oleh Elektron. Setelah sebuah Node hulu Pelepasan dipilih, itu ditempatkan di cabang di garpu Node Elektron dan setiap patch Elektron Node diterapkan di sana.

Faktor lain adalah bahwa proyek Node menambal versinya dari V8. Seperti disebutkan di atas, Elektron membangun semuanya dengan satu salinan dari V8, jadi patch V8 Node harus dikirim ke salinan itu.

Setelah semua dependensi Elektron sedang membangun dan menggunakan yang sama salinan V8, langkah selanjutnya adalah memperbaiki masalah kode Elektron yang ditimbulkan dengan upgrade Node.

[FIXME] sesuatu tentang debugger Node di Atom yang kami (misalnya mendalam) Penggunaan dan perlu konfirmasi tidak rusak dengan upgrade Node?

Jadi singkatnya, langkah utamanya adalah:

1. Perbarui garpu Node Elektron ke versi yang diinginkan
2. Backport Node's V8 patches to our copy of V8
3. Update Elektron untuk menggunakan versi baru dari Node 
  - Perbarui submodul
  - Update Node.js buat konfigurasi

## Memperbarui Node Elektron [garpu](https://github.com/electron/node)

1. Pastikan `master` pada `electron/node` telah memperbarui tag rilis dari `nodejs/node`
2. Buat cabang di https://github.com/electron/node: `elektron-simpul-vX.X.X` where the base that you're branching from is the tag for the desired update 
  - `vX.X.X` Harus menggunakan versi node yang kompatibel dengan versi kromium kami saat ini
3. Lakukan kembali komitmen kami dari versi simpul sebelumnya yang kami gunakan (`vY.Y.Y`) to `v.X.X.X` 
  - Check release tag and select the range of commits we need to re-apply
  - Rentang komando ceri: 
    1. Checkout keduanya `vY.Y.Y` & `v.X.X.X`
    2. `git cherry-pick FIRST_COMMIT_HASH..LAST_COMMIT_HASH`
  - Selesaikan gabungan konflik di setiap file yang ditemui, lalu: 
    1. `git tambahkan <conflict-file>`
    2. `git cherry-pick --lanjutkan`
    3. Ulangi sampai selesai

## Memperbarui [V8](https://github.com/electron/node/src/V8) Patch

Kita perlu untuk menghasilkan file patch dari setiap patch yang diterapkan V8.

1. Dapatkan salinan garpu libcc Electron 
  - `$ git klon https://github.com/electron/libchromiumcontent`
2. Jalankan `script/perbarui` untuk mendapatkan libcc terbaru 
  - Ini akan memakan-waktu
3. Hapus salinan kita pada patch Node v8 yang lama 
  - (In libchromiumcontent repo) Baca `patches/v8/README.md` untuk melihat patchfiles mana diciptakan selama pembaharuan terakhir
  - Menghapus berkas tersebut dari `patches/v8/`: 
    - `git rm` data patch
    - edit `patches/v8/README.md`
    - melakukan penghapusan ini
4. Memeriksa Node [repo](https://github.com/electron/node) untuk melihat apakah patch upstream Node digunakan dengan v8 mereka setelah menabrak versinya 
  - `git log --oneline deps/V8`
5. Buat daftar periksa pada patch. Ini berguna untuk melacak pekerjaan anda dan untuk apa memiliki referensi cepat dari hash komit untuk digunakan pada langkah `git diff-tree` di bawah ini.
6. Baca `patches/v8/README.md` untuk melihat patchfiles mana yang berasal dari versi V8 sebelumnya dan karena itu perlu dihapus. 
  - Hapus setiap patchfile yang direferensikan di `patches/v8/README.md`
7. Untuk setiap patch, lakukan: 
  - (dalam node repo) `git diff-tree --patch HASH > ~/path_to_libchromiumcontent/patches/v8/xxx-patch_name.patch` 
    - `xxx` adalah angka tiga digit tambahan (untuk memaksa urutan patch)
    - `patch_name` harus secara longgar sesuai dengan node yang melakukan pesan, misalnya `030-cherry_pick_cc55747,patch` jika Node melakukan pesan "cherry-pick cc55747"
  - (sisa langkah di repo libchromium) Edit secara manual `.patch` file untuk mencocokkan direktori upstream V8's: 
    - Jika bagian yang berbeda tidak memiliki contoh `deps/V8`, lepaskan semuanya. 
      - Kami tidak ingin patch itu karena kami hanya patching V8.
    - Ganti contoh dari `a/deps/v8/filename.ext` dengan `a/filename.ext` 
      - Hal ini diperlukan karena upstream Node menyimpan file V8 di subdirektori
  - Pastikan status lokal bersih: `status git` untuk memastikan tidak ada perubahan yang tidak mencolok.
  - Konfirmasikan bahwa patch berlaku dengan rapi `script/patch.py -r src/V8 -p patches/v8/xxx-patch_name.patch.patch`
  - Buat salinan patch baru: 
    - `cd src/v8 && git diff > ../../test.patch && cd ../..`
    - Hal ini diperlukan karena patch pertama Node melakukan checksum yang tidak kita inginkan
  - Konfirmasikan bahwa checksum adalah satu-satunya perbedaan antara kedua patch tersebut: 
    - `diff -u test.patch patches/v8/xxx-patch_name.patch`
  - Ganti patch lama dengan yang baru: 
    - `mv test.patch patches/v8/xxx-patch_name.patch`
  - Tambahkan patch kode ke indeks *tanpa* melakukan: 
    - `cd src/v8 && git add . && cd ../..`
    - Kami tidak ingin melakukan perubahan (mereka disimpan di patchfiles) tetapi membutuhkan mereka secara lokal sehingga mereka tidak muncul dalam diffs berikutnya sementara kita terpelajar melalui patch lebih
  - Tambahkan kode patch ke indeks: 
    - `git tambahkan sebuah patches/v8/`
  - (Opsional) melakukan setiap data patch untuk memastikan Anda dapat mencadangkan jika anda mengacaukan sebuah langkah: 
    - `git melakukan patches/v8/`
8. Pembaharuan `patches/v8/README.md` dengan referensi ke semua patch baru yang telah ditambahkan sehingga orang berikutnya akan tahu mana yang perlu dihapus.
9. Perbaharui referensi submodul Electron: 
      sh
      $ cd electron/vendor/node
      electron/vendor/node$ git fetch
      electron/vendor/node$ git checkout electron-node-vA.B.C
      electron/vendor/node$ cd ../libchromiumcontent
      electron/vendor/libchromiumcontent$ git fetch
      electron/vendor/libchromiumcontent$ git checkout upgrade-to-chromium-X
      electron/vendor/libchromiumcontent$ cd ../..
      electron$ git add vendor
      electron$ git commit -m "update submodule referefences for node and libc"
      electron$ git pso upgrade-to-chromium-62
      electron$ script/bootstrap.py -d
      electron$ script/build.py -c -D

## Catatan

- libcc dan V8 diperlakukan sebagai satu kesatuan
- Node mempertahankan garpu sendiri dari V8 
  - Mereka mengemas sejumlah barang kecil sesuai kebutuhan
  - Dokumentasi di node tentang bagaimana [mereka bekerja dengan V8](https://nodejs.org/api/v8.html)
- Kami memperbarui kode sehingga kita hanya menggunakan satu salinan V8 di semua electron 
  - Misalnya electron, libcc, dan node
- Kami tidak melacak upstream karena logistik: 
  - Upstream menggunakan beberapa repo dan menggabungkannya ke satu repo tunggal akan menghasilkan sejarah yang hilang Jadi kita hanya pembaharuan saat kita sedang merencanakan sebuah versi node bertabrakan dalam electron.
- libcc itu besar dan memakan waktu untuk pembaharuan, jadi biasanya kita pilih versi node yang berdasarkan rilisnya yang memiliki versi dari V8 yang paling dekat dengan versi di libcc yang kita gunakan. 
  - Kadang kita harus menunggu rilis Node periodik berikutnya karena akan sinkron lebih dekat dengan versi V8 di libcc baru
  - Electron menyimpan semua patch di libcc karena lebih sederhana dari pada Mempertahankan repos yang berbeda untuk tambalan untuk setiap proyek upstream. 
    - Crashpad, node, libcc, dll patch semua disimpan di tempat yang sama
  - Membangun node: 
    - Ada kemungkinan kita perlu mengubah konfigurasi bangunan kita untuk mencocokkan bangunan flag yang diinginkan node di `node/common.gypi`