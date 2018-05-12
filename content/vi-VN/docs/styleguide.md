# Tài liệu về Styleguide của Electron

Đây là những nguyên tắc để viết tài liệu Electron.

## Tiêu đề

* Mỗi trang chỉ có một tiêu đề ở cấp `#` và được viết ngay đầu trang.
* Các tiêu đề của các chương trong cùng một trang phải có cấp độ `##`.
* Chương nhỏ cần được tăng số lượng của `#` theo chiều sâu mà nó nằm so với chương chứa nó.
* Tất cả các từ trong tiêu đề của trang phải được viết hoa, ngoại trừ các liên từ như "của" và "và".
* Chỉ từ đầu tiên của một tiêu đề chương phải được viết hoa.

Lấy `Quick Start` để làm ví dụ:

```markdown
# Quick Start

...

## Main process

...

## Renderer process

...

## Run your app

...

### Run as a distribution

...

### Manually downloaded Electron binary

...
```

Cũng được dùng cho các tài liệu của API, không có ngoại lệ.

## Quy tắc sử dụng Markdown

* Use `sh` instead of `cmd` in code blocks (due to the syntax highlighter).
* Một dòng nên chứa tối đa 80 kí tự kể cả khoảng cách.
* Phân cấp tiêu đề không được quá 2 cấp (vì markdown sẽ không render quá 2 cấp).
* Tất cả code `js` và `javascript` nên được linted với [tiêu chuẩn của markdown](http://npm.im/standard-markdown).

## Chọn từ

* Sử dụng "will" thay vì "would" khi mô tả các kết quả.
* Sử dụng "in the ___ process" thay vì "on".

## Tài liệu tham khảo về API

Các quy định sau đây chỉ áp dụng cho các tài liệu API.

### Tiêu đề Trang

Mỗi trang phải dùng tên đối tượng thực tế được trả về bởi `require('electron')` như tiêu đề, chẳng hạn như `BrowserWindow`, `autoUpdater`, và `session`.

Under the page title must be a one-line description starting with `>`.

Sử dụng một đoạn văn trên đầu của trang `session` làm ví dụ:

```markdown
# session

> Manage browser sessions, cookies, cache, proxy settings, etc.
```

### Các phương thức và sự kiện của module

Với các module không phải là một class, các phương thức và các sự kiện của nó phải được liệt kê trong hai mục sau `## Các phương thức` và `## Các sự kiện`.

Ví dụ như `autoUpdater` là một ví dụ:

```markdown
# autoUpdater

## Events

### Event: 'error'

## Methods

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### Các class

* API classes or classes that are part of modules must be listed under a `## Class: TheClassName` chapter.
* Một trang có thể có nhiều class.
* Constructors must be listed with `###`-level titles.
* [Static Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) phải được liệt kê trong phần `### Static Methods`.
* [Instance Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) must be listed under an `### Instance Methods` chapter.
* Tất cả phương thức có trả về giá trị phải được bắt đầu bằng đoạn mô tả: "Returns `[TYPE]` - Return description" 
  * If the method returns an `Object`, its structure can be specified using a colon followed by a newline then an unordered list of properties in the same style as function parameters.
* Instance Events must be listed under an `### Instance Events` chapter.
* Instance Properties must be listed under an `### Các Thuộc Tính` chapter. 
  * Instance properties must start with "A [Property Type] ..."

Sử dụng tài liệu của các class `Session` và `Cookies` làm ví dụ:

```markdown
# session

## Methods

### session.fromPartition(partition)

## Properties

### session.defaultSession

## Class: Session

### Instance Events

#### Event: 'will-download'

### Instance Methods

#### `ses.getCacheSize(callback)`

### Instance Properties

#### `ses.cookies`

## Class: Cookies

### Instance Methods

#### `cookies.get(filter, callback)`
```

### Các phương thức

Chương viết về các phương thức phải viết trong các hình thức sau đây:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Integer (optional) - Another parameter description.

...
```

Tiêu đề có thể ở các mức độ `###` hoặc `####`. Cho dù nó là một phương thức của một module hay của một class.

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

For example, the methods of the `Session` class under the `session` module must use `ses` as the `objectName`.

The optional arguments are notated by square brackets `[]` surrounding the optional argument as well as the comma required if this optional argument follows another argument:

```sh
required[, optional]
```

Below the method is more detailed information on each of the arguments. The type of argument is notated by either the common types:

* [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Hoặc một loại tùy chỉnh như của Electron: [`WebContent`](api/web-contents.md)

If an argument or a method is unique to certain platforms, those platforms are denoted using a space-delimited italicized list following the datatype. Values can be `macOS`, `Windows` or `Linux`.

```markdown
* `animate` Boolean (optional) _macOS_ _Windows_ - Animate the thing.
```

`Array` type arguments must specify what elements the array may include in the description below.

The description for `Function` type arguments should make it clear how it may be called and list the types of the parameters that will be passed to it.

### Các sự kiện

Các chương về các sự kiện phải được viết theo kiểu dưới đây:

```markdown
### Event: 'wake-up'

Returns:

* `time` String

...
```

Tiêu đề có thể ở các mức độ `###` hoặc `####`. Cho dù nó là một sự kiện của một module hay của một class.

Các đối số của một sự kiện được viết theo các quy tắc tương tự như các quy tắc của các phương thức.

### Các thuộc tính

Các chương của thuộc tính phải theo quy tắc:

```markdown
### session.defaultSession

...
```

Tiêu đề có thể ở các mức độ `###` hoặc `####`. Cho dù nó là thuộc tính của một module hay của một class.

## Các bản dịch của tài liệu

See [electron/i18n](https://github.com/electron/i18n#readme)