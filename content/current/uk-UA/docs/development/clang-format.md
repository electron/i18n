# Використання clang-format в C++ Коді

[`clang-format`](http://clang.llvm.org/docs/ClangFormat.html) is a tool to automatically format C/C++/Objective-C code, so that developers don't need to worry about style issues during code reviews.

It is highly recommended to format your changed C++ code before opening pull requests, which will save you and the reviewers' time.

Ви можете встановити `clang-format` та `git-clang-format` через `npm install -g clang-format`.

To automatically format a file according to Electron C++ code style, run `clang-format -i path/to/electron/file.cc`. It should work on macOS/Linux/Windows.

Процес форматування зміненого вами коду:

1. Внести зміни кодів в репозиторії Electron.
2. Запустіть `git add your_changed_file.cc`.
3. Виконайте `git-clang-format`, і ви, ймовірно, побачите зміни у `your_changed_file.cc`, ці зміни сформовані з `clang-format`.
4. Запустіть `git add your_changed_file.cc`, та закомітьте зміни.
5. Now the branch is ready to be opened as a pull request.

If you want to format the changed code on your latest git commit (HEAD), you can run `git-clang-format HEAD~1`. See `git-clang-format -h` for more details.

## Editor Integration

You can also integrate `clang-format` directly into your favorite editors. For further guidance on setting up editor integration, see these pages:

  * [Atom](https://atom.io/packages/clang-format)
  * [Vim & Emacs](http://clang.llvm.org/docs/ClangFormat.html#vim-integration)
  * [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)
