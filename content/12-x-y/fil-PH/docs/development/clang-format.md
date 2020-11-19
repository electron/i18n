# Paggamit ng kumakalat na-format C++ Code

Ang gamit ng[`clang-format`](https://clang.llvm.org/docs/ClangFormat.html)ay upang kusang umayos ang code na C/C++/Objective-C, upang sa gayon, ang mga naglilinang ay 'di nangangailangan na mangamba tungkol sa istilo ng mga isyu sa tuwing nagsasagawa ng mga pagsusuri sa code.

Lubos na pinapayuhan na iayos ang nabagong code sa C++ bago magbukas ng mga pull request, na syang magpapadali para sa'yo at sa nagsusuri.

Maaaring ikabit ang `clang-format` at `git-clang-format ` gamit ang `npm install -g clang-format`.

To automatically format a file according to Electron C++ code style, run `clang-format -i path/to/electron/file.cc`. It should work on macOS/Linux/Windows.

Ang workflow upang iayos ang nabagong code ay:

1. Gumawa ng mga pagbabago sa mga code ng repository ng Electron.
2. Run `git add your_changed_file.cc`.
3. Run `git-clang-format`, at maaari mong makita ang ilang pagbabago sa `your_changed_file.cc`, ang mga pagbabago na ito ay gawa galing sa `clang-format`.
4. Run `git add your_changed_file.cc`, at gumawa ng pagbabago.
5. Ngayon, ang sangay ay maaari nang mabuksan bilang pull request.

If you want to format the changed code on your latest git commit (HEAD), you can run `git-clang-format HEAD~1`. See `git-clang-format -h` for more details.

## Editor Integration

You can also integrate `clang-format` directly into your favorite editors. For further guidance on setting up editor integration, see these pages:

* [Atom](https://atom.io/packages/clang-format)
* [Vim & Emacs](https://clang.llvm.org/docs/ClangFormat.html#vim-integration)
* [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)
