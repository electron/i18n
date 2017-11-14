# C++ 코드에서 clang-format 사용하기

[`clang-format`](http://clang.llvm.org/docs/ClangFormat.html) 은 C/C++/Objective-C 코드 자동 서식 맞춤 도구입니다. 그래서 개발자들은 코드 검토시에 스타일 문제에 대해 걱정할 필요가 없습니다.

풀 리퀘스트를 하기 전에 변경된 C++ 코드의 서식을 맞추는 것이 좋습니다. 이것은 당신과 검토자들의 시간을 절약해 줄 것입니다.

You can install `clang-format` and `git-clang-format` via `npm install -g clang-format`.

To automatically format a file according to Electron C++ code style, simply run `clang-format -i path/to/electron/file.cc`. It should work on macOS/Linux/Windows.

The workflow to format your changed code:

1. Make codes changes in Electron repository.
2. Run `git add your_changed_file.cc`.
3. Run `git-clang-format`, and you will probably see modifications in `your_changed_file.cc`, these modifications are generated from `clang-format`.
4. Run `git add your_changed_file.cc`, and commit your change.
5. Now the branch is ready to be opened as a pull request.

If you want to format the changed code on your latest git commit (HEAD), you can run `git-clang-format HEAD~1`. See `git-clang-format -h` for more details.

## Editor Integration

You can also integrate `clang-format` directly into your favorite editors. For further guidance on setting up editor integration, see these pages:

- [Atom](https://atom.io/packages/clang-format)
- [Vim & Emacs](http://clang.llvm.org/docs/ClangFormat.html#vim-integration)
- [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)