# C++ Kodunda Clang-Format Kullanma

[`clang-format`](http://clang.llvm.org/docs/ClangFormat.html), C/C++/Objective-C kodlarını otomatik olarak biçimlendiren bir araçtır, böylelikle kod incelemesi sırasında stil sorunları hakkında endişelenmenize gerek kalmaz.

Çekilen istekleri açmadan önce değiştirilen C++ kodunuzu formatlamanız şiddetle tavsiye edilir; bu da sizi ve incelemecilerin zamanını kurtaracaktır.

`npm install -g clang-format` vasıtasıyla `clang-format` ve `git-clang-format` kurabilirsiniz.

Bir dosyayı Electron C++ kod stiline göre otomatik olarak biçimlendirmek için `clang-format -i path/to/electron/file.cc`'yi çalıştırmanız yeterlidir. MacOS/Linux/Windows üzerinde çalışmalıdır.

Değiştirilen kodunuzu biçimlendirmek için iş akışı:

1. Elektron deposunda kod değişiklikleri yapın.
2. Çalıştır `git add your_changed_file.cc`.
3. Run `git-clang-format`, and you will probably see modifications in `your_changed_file.cc`, these modifications are generated from `clang-format`.
4. Run `git add your_changed_file.cc`, and commit your change.
5. Now the branch is ready to be opened as a pull request.

If you want to format the changed code on your latest git commit (HEAD), you can run `git-clang-format HEAD~1`. See `git-clang-format -h` for more details.

## Editör Tümleştirme

You can also integrate `clang-format` directly into your favorite editors. For further guidance on setting up editor integration, see these pages:

- [Atom](https://atom.io/packages/clang-format)
- [Vim amp; Emacs](http://clang.llvm.org/docs/ClangFormat.html#vim-integration)
- [Visual Studio Kodu](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)