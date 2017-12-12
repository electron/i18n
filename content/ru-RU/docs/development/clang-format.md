# Использование clang-format для кода на C++

[`clang-format`](http://clang.llvm.org/docs/ClangFormat.html) это инструмент для автоматического форматирования кода на C/C++/Objective-C code, он используется для того, чтобы в процессе ревью разработчики не беспокоились о проблемах, связанных с форматированием.

Настоятельно рекомендуется форматировать измененный вами код C++ перед открытием пулл-реквестов, это сэкономят время вам и ревьюверам.

Вы можете установить `clang-format` и `git-clang-format` командой `npm install -g clang-format`.

To automatically format a file according to Electron C++ code style, simply run `clang-format -i path/to/electron/file.cc`. It should work on macOS/Linux/Windows.

Процесс форматирования измененного вами кода:

1. Сделать изменения кода в репозитории Electron.
2. Run `git add your_changed_file.cc`.
3. Run `git-clang-format`, and you will probably see modifications in `your_changed_file.cc`, these modifications are generated from `clang-format`.
4. Run `git add your_changed_file.cc`, and commit your change.
5. Now the branch is ready to be opened as a pull request.

If you want to format the changed code on your latest git commit (HEAD), you can run `git-clang-format HEAD~1`. See `git-clang-format -h` for more details.

## Интеграция с редактором кода

You can also integrate `clang-format` directly into your favorite editors. For further guidance on setting up editor integration, see these pages:

- [Atom](https://atom.io/packages/clang-format)
- [Vim & Emacs](http://clang.llvm.org/docs/ClangFormat.html#vim-integration)
- [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)