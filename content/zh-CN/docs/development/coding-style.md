# 代码规范

这些是 Electron 编码风格指南。

您可以运行 `npm run lint` 来显示 `cpplint` 和`eslint` 检测到的任何样式问题。

## 通用代码

* 用换行符结束文件。
* Place requires in the following order: 
  * 内置Node模块（如 `path`）
  * 内置Electron模块（如 `ipc`、`app`）
  * 本地模块（使用相对路径）
* Place class properties in the following order: 
  * Class methods and properties (methods starting with a `@`)
  * Instance methods and properties
* 避免与平台相关的代码： 
  * Use `path.join()` to concatenate filenames.
  * 请使用`os.tmpdir()`而不是`/tmp`来引用临时目录。
* Using a plain `return` when returning explicitly at the end of a function. 
  * Not `return null`, `return undefined`, `null` or `undefined`

## C + + 和 Python

对于 C++ 和 Python, 我们遵循 Chromium 的[编码风格](https://www.chromium.org/developers/coding-style). 你可以使用 [clang-format](clang-format.md) 来自动格式化 C++ 代码. 你可以使用 `script/cpplint.py` 来检验文件是否符合要求。

我们现在使用的 Python 版本是 Python 2.7。

C++ 代码使用了大量 Chromium 的抽象和类型，因此建议您熟悉它们。 一个起步的好地方是 Chromium 的 [重要的抽象概念和数据库结构](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) 文档. 该文档提到一些特殊类型，范围类型(超出范围时自动释放其内存), 记录机制等。

## 文档

* 使用[remark](https://github.com/remarkjs/remark) Markdown样式

You can run `npm run lint-docs` to ensure that your documentation changes are formatted correctly.

## JavaScript

* 书写 [标准](https://npm.im/standard) JavaScript 样式
* 文件名应使用 `-` 连接而不是 `_`, 例如. `file-name.js` 而不是 `file_name.js`, 因为在 [github/atom](https://github.com/github/atom)中模块名通常是 `module-name` 形式. 此规则仅适用于 `.js` 文件。
* 酌情使用更新的 ES6 / ES2015 语法 
  * [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) 用于需要的和其他的常数
  * [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) 用于定义变量
  * [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) 代替 `function () { }`
  * [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) 而不是使用字符串连接符 `+`

## 命名相关

Electron API 使用与 Node.js 相同的大小写方案：

* When the module itself is a class like `BrowserWindow`, use `PascalCase`.
* When the module is a set of APIs, like `globalShortcut`, use `camelCase`.
* 当 API 是对象的属性时, 并且它复杂到足以成为一个单独的块, 比如 `win.webContents`, 使用 `mixedCase`.
* 对于其他非模块API, 使用自然标题, 比如 `<webview> Tag` 或 `Process Object`.

当创建新的 API 时， 最好使用 getter 和 setter 而不是 jQuery 的一次性函数。 举个例子, `.getText()` 和 `.setText(text)` 优于 `.text([text])`. 这是一些相关的 [讨论](https://github.com/electron/electron/issues/46)