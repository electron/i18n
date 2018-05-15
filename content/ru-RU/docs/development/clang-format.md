# Использование clang-format для кода на C++

[`clang-format`](http://clang.llvm.org/docs/ClangFormat.html) это инструмент для автоматического форматирования кода на C/C++/Objective-C code, он используется для того, чтобы в процессе ревью разработчики не беспокоились о проблемах, связанных с форматированием.

Настоятельно рекомендуется форматировать измененный вами код C++ перед открытием пулл-реквестов, это сэкономят время вам и ревьюверам.

Вы можете установить `clang-format` и `git-clang-format` командой `npm install -g clang-format`.

To automatically format a file according to Electron C++ code style, run `clang-format -i path/to/electron/file.cc`. It should work on macOS/Linux/Windows.

Процесс форматирования измененного вами кода:

1. Сделать изменения кода в репозитории Electron.
2. Запустите `git add your_changed_file.cc`.
3. Выполните `git-clang-format`, и вы вероятно увидите изменения в `your_changed_file.cc`, эти изменения сформированы из `clang-format`.
4. Запустите `git add your_changed_file.cc`, и выполните commit.
5. Теперь эта ветка готова для открытия пулл-реквеста.

Если вы хотите отформатировать измененный код из вашего последнего git commit (HEAD), вы можете запустить `git-clang-format HEAD~1`. Подробнее см. `git-clang-format -h`.

## Интеграция с редактором кода

Вы также можете интегрировать `clang-format` напрямую с вашим любимым редактором. Дальнейшие указания по настройке интеграции с редакторами вы найдете на этих страницах:

- [Atom](https://atom.io/packages/clang-format)
- [Vim и Emacs](http://clang.llvm.org/docs/ClangFormat.html#vim-integration)
- [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)