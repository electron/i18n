# Sử dụng clang-format trên Code C++

[`clang-format`](http://clang.llvm.org/docs/ClangFormat.html) là một công cụ định dạng lại Code cho C/C++/Objective-C, vì vậy các lập trình viên không cần phải lo lắng về các vấn đề phong cách lập trình khi xem lại code.

Nó rất được khuyến khích để định dạng lại các thay đổi trong code C++ của bạn trước khi tạo các pull request, điều này sẽ tiết kiệm thời gian của bạn bạn và của các reviewer.

Bạn có thể cài đặt `clang-format` và `git-clang-format` bằng cách sử dụng npm: `npm install -g clang-format`.

To automatically format a file according to Electron C++ code style, simply run `clang-format -i path/to/electron/file.cc`. It should work on macOS/Linux/Windows.

Quy trình làm việc để format lại code thay đổi của bạn:

  1. Make codes changes in Electron repository.
  2. Run `git add your_changed_file.cc`.
  3. Run `git-clang-format`, and you will probably see modifications in `your_changed_file.cc`, these modifications are generated from `clang-format`.
  4. Run `git add your_changed_file.cc`, and commit your change.
  5. Now the branch is ready to be opened as a pull request.

Nếu bạn muốn định dạng các code đã thay đổi của bạn trên git commit (HEAD), bạn có thể chạy lệnh `git-clang-format HEAD~1`. Chạy lệnh `git-clang-format -h` để xem thêm chi tiết.

## Tích hợp và trình soạn thảo

Bạn có thể tích hợp `clang-format` vào các trình soạn thảo yêu thích của bạn. Để biết thông các thông tin về việc tích hợp, xem các trang sau:

- [Atom](https://atom.io/packages/clang-format)
- [Vim & Emacs](http://clang.llvm.org/docs/ClangFormat.html#vim-integration)