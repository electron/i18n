# C++ Kodunda Clang-Format Kullanma

[`clang-format`](http://clang.llvm.org/docs/ClangFormat.html), C/C++/Objective-C kodlarını otomatik olarak biçimlendiren bir araçtır, böylelikle kod incelemesi sırasında stil sorunları hakkında endişelenmenize gerek kalmaz.

Çekilen istekleri açmadan önce değiştirilen C++ kodunuzu formatlamanız şiddetle tavsiye edilir; bu da sizi ve incelemecilerin zamanını kurtaracaktır.

`npm install -g clang-format` vasıtasıyla `clang-format` ve `git-clang-format` kurabilirsiniz.

To automatically format a file according to Electron C++ code style, run `clang-format -i path/to/electron/file.cc`. It should work on macOS/Linux/Windows.

Değiştirilen kodunuzu biçimlendirmek için iş akışı:

1. Electron deposunda kod değişiklikleri yapın.
2. Çalıştır `git add your_changed_file.cc`.
3. `git-clang-format` çalıştırın ve muhtemelen `your_changed_file.cc`'de değişiklikler göreceksiniz, bu değişiklikler `clang-format`'dan üretilir.
4. `git add your_changed_file.cc` çalıştırın ve değişikliğinizi yapın.
5. Şimdi dal bir çekme isteği olarak açılmaya hazır.

Değiştirilen kodu en son git commit'inizde (HEAD) biçimlendirmek istiyorsanız, `git-clang-format HEAD~1`'i çalıştırabilirsiniz. Daha fazla ayrıntı için `git-clang-format -h` bölümüne bakın.

## Editör Tümleştirme

Ayrıca `clang-formatını` doğrudan en sevdiğiniz editörlerinize entegre edebilirsiniz. Editör entegrasyonu hakkında daha fazla bilgi için şu sayfalara bakın:

- [Atom](https://atom.io/packages/clang-format)
- [Vim amp; Emacs](http://clang.llvm.org/docs/ClangFormat.html#vim-integration)
- [Visual Studio Kodu](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)