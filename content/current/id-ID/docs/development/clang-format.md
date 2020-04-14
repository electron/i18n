# Menggunakan dentang-format pada kode C++ Code

[` clang-format `](http://clang.llvm.org/docs/ClangFormat.html) adalah alat untuk secara otomatis format C/C++/Objective-C code, sehingga pengembang tidak perlu khawatir tentang masalah gaya selama pengkajian kode.

Sangat disarankan untuk memformat kode C++ yang Anda ubah sebelum membuka tarik permintaan, yang akan menghemat waktu Anda dan pengulas.

Anda bisa memasang `clang-format` dan `git-clang-format` via `npm install -g clang-format`.

To automatically format a file according to Electron C++ code style, run `clang-format -i path/to/electron/file.cc`. It should work on macOS/Linux/Windows.

Alur kerja untuk memformat kode yang Anda ubah:

1. Buat perubahan kode pada repositori Electron.
2. Jalankan `git tambahkan your_changed_file.cc`.
3. Jalankan `git-clang-format`, dan Anda mungkin akan melihat modifikasi masuk `your_changed_file.cc`, modifikasi ini dihasilkan dari `clang-format`.
4. Run `git add your_changed_file.cc`, dan lakukan perubahan Anda.
5. Kini cabang tersebut siap dibuka sebagai permintaan tarik.

Jika Anda ingin memformat kode yang diubah pada komit git terakhir Anda (HEAD), Anda bisa jalankan `git-clang-format HEAD~1`. Lihat `git-clang-format -h` untuk lebih jelasnya.

## Integrasi Editor

Anda juga bisa mengintegrasikan `clang-format` langsung ke editor favorit Anda. Untuk panduan lebih lanjut tentang menyiapkan integrasi editor, lihat halaman ini:

- [Atom](https://atom.io/packages/clang-format)
- [Vim & Emacs](http://clang.llvm.org/docs/ClangFormat.html#vim-integration)
- [Kode Visual Studio](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)