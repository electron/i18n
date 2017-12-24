# Menggunakan clang-format pada C ++ Code

[` clang-format `](http://clang.llvm.org/docs/ClangFormat.html) adalah alat untuk secara otomatis format C/C++/Objective-C code, sehingga pengembang tidak perlu khawatir tentang masalah gaya selama pengkajian kode.

Sangat disarankan untuk memformat kode C++ yang Anda ubah sebelum membuka tarik permintaan, yang akan menghemat waktu Anda dan pengulas.

Anda bisa memasang `clang-format` dan `git-clang-format` via `npm install -g clang-format`.

Untuk memformat file secara otomatis sesuai dengan kode gaya Elektron C++, jalankan saja `clang-format -i path/ke/electron/ file.cc`. Ini harus bekerja pada macOS/Linux/Windows.

Alur kerja untuk memformat kode yang Anda ubah:

1. Buat perubahan kode pada repositori Electron.
2. Jalankan `git tambahkan your_changed_file.cc`.
3. Jalankan `git-clang-format`, dan Anda mungkin akan melihat modifikasi masuk `your_changed_file.cc`, modifikasi ini dihasilkan dari `clang-format`.
4. Run `git add your_changed_file.cc`, and commit your change.
5. Now the branch is ready to be opened as a pull request.

If you want to format the changed code on your latest git commit (HEAD), you can run `git-clang-format HEAD~1`. See `git-clang-format -h` for more details.

## Editor Integration

You can also integrate `clang-format` directly into your favorite editors. For further guidance on setting up editor integration, see these pages:

- [Atom](https://atom.io/packages/clang-format)
- [Vim & Emacs](http://clang.llvm.org/docs/ClangFormat.html#vim-integration)
- [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)