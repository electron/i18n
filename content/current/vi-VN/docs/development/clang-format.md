# Sử dụng clang-format trên Code C++

[`clang-format`](https://clang.llvm.org/docs/ClangFormat.html) là một công cụ định dạng lại Code cho C/C++/Objective-C, vì vậy các lập trình viên không cần phải lo lắng về các vấn đề phong cách lập trình khi xem lại code.

Nó rất được khuyến khích để định dạng lại các thay đổi trong code C++ của bạn trước khi tạo các pull request, điều này sẽ tiết kiệm thời gian của bạn bạn và của các reviewer.

Bạn có thể cài đặt `clang-format` và `git-clang-format` bằng cách sử dụng npm: `npm install -g clang-format`.

To automatically format a file according to Electron C++ code style, run `clang-format -i path/to/electron/file.cc`. It should work on macOS/Linux/Windows.

Quy trình làm việc để format lại code thay đổi của bạn:

1. Thay đổi code trong repo của Electron.
2. Chạy `git add your_changed_file.cc`.
3. Chạy `git-clang-format`, và bạn sẽ thấy các thay đổi trong `your_changed_file.cc`, các thay đổi được tạo ra từ `clang-format`.
4. Chạy `git add your_changed_file.cc`, và commit thay đổi của bạn.
5. Bây giờ branch đó đã sẳn sàng để tạo ra một pull request.

If you want to format the changed code on your latest git commit (HEAD), you can run `git-clang-format HEAD~1`. See `git-clang-format -h` for more details.

## Tích hợp và trình soạn thảo

You can also integrate `clang-format` directly into your favorite editors. For further guidance on setting up editor integration, see these pages:

  * [Atom](https://atom.io/packages/clang-format)
  * [Vim & Emacs](https://clang.llvm.org/docs/ClangFormat.html#vim-integration)
  * [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)
