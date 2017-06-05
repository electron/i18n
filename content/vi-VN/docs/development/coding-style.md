# Phong cách lập trình

Đây là các hướng dẫn phong cách lập trình trong Electron.

Bạn có thể chạy `npm run lint` và xem bất kỳ vấn đề gì về phong cách lập trình được phát hiện bởi `cpplint` và `eslint`.

## C ++ và Python

Với C++ và Python, chúng tôi theo [phong cách lập trình của Chromium](http://www.chromium.org/developers/coding-style). Bạn có thể sử dụng [clang-format](clang-format.md) để tự động format cho code của C++. Hoặc cũng có thể sử dụng đoạn code trong `script/cpplint.py` để kiểm tra xem các file đã phù hợp hay chưa.

Chúng tôi đang sử dụng phiên bản Python 2.7.

The C++ code uses a lot of Chromium's abstractions and types, so it's recommended to get acquainted with them. A good place to start is Chromium's [Important Abstractions and Data Structures](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) document. The document mentions some special types, scoped types (that automatically release their memory when going out of scope), logging mechanisms etc.

## JavaScript

* [Các tiêu chuẩn](http://npm.im/standard) cho phong cách lập trình JavaScript.
* File names should be concatenated with `-` instead of `_`, e.g. `file-name.js` rather than `file_name.js`, because in [github/atom](https://github.com/github/atom) module names are usually in the `module-name` form. This rule only applies to `.js` files.
* Use newer ES6/ES2015 syntax where appropriate 
  * [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) for requires and other constants
  * [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) for defining variables
  * [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) instead of `function () { }`
  * [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) instead of string concatenation using `+`

## Cách đặt tên

Electron APIs uses the same capitalization scheme as Node.js:

* When the module itself is a class like `BrowserWindow`, use `CamelCase`.
* When the module is a set of APIs, like `globalShortcut`, use `mixedCase`.
* When the API is a property of object, and it is complex enough to be in a separate chapter like `win.webContents`, use `mixedCase`.
* For other non-module APIs, use natural titles, like `<webview> Tag` or `Process Object`.

When creating a new API, it is preferred to use getters and setters instead of jQuery's one-function style. For example, `.getText()` and `.setText(text)` are preferred to `.text([text])`. There is a [discussion](https://github.com/electron/electron/issues/46) on this.