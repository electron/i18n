# Electron 文档风格指南

这里是一些编写 Electron 文档的指南。

## 标题

* 每个页面顶部必须有一个 `#` 级标题。
* Chapters in the same page must have `##`-level headings.
* Sub-chapters need to increase the number of `#` in the heading according to their nesting depth.
* The page's title must follow [APA title case][title-case].
* All chapters must follow [APA sentence case][sentence-case].

举一个`Quick Start`的例子:

```markdown
# 快速启动

...

## 主要进程

...

## 渲染进程

...

## 运行您的应用程序

...

### 以发行版

 运行...

### 手动下载 Electron 二进制文件

...
```

对于 API 参考, 可以例外于这些规则.

## Markdown 规则

This repository uses the [`markdownlint`][markdownlint] package to enforce consistent Markdown styling. For the exact rules, see the `.markdownlint.json` file in the root folder.

There are a few style guidelines that aren't covered by the linter rules:

<!--TODO(erickzhao): make sure this matches with the lint:markdownlint task-->
* 在代码块中使用`bash`而不是`cmd`（由于语法高亮问题）.
* Keep line lengths between 80 and 100 characters if possible for readability purposes.
* 列表嵌套不超出2级 (由于 Markdown 渲染问题).
* 所有的` js` 和` javascript `代码块均被标记为[ standard-markdown](https://www.npmjs.com/package/standard-markdown).
* 对于无序列表，请使用星号而不是破折号.

## 用词选择

* 在描述结果时，使用 “will” 而不是 “would”。
* 首选 "in the ___ process" 而不是 "on".

## API 参考

以下规则仅适用于 API 的文档。

### Title and description

Each module's API doc must use the actual object name returned by `require('electron')` as its title (such as `BrowserWindow`, `autoUpdater`, and `session`).

Directly under the page title, add a one-line description of the module as a markdown quote (beginning with `>`).

Using the `session` module as an example:

```markdown
# session

> Manage browser sessions, cookies, cache, proxy settings, etc.
```

### 模块方法和事件

对于非类的模块，它们的方法和事件必须在 `## Methods` 和 `## Events `章节中列出

举一个 `autoUpdater` 的例子:

```markdown
# autoUpdater

## Events

### Event: 'error'

## Methods

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### 类

* API 类或作为模块一部分的类必须在 `## Class: TheClassName` 章节中列出.
* 一个页面可以有多个类.
* Constructors must be listed with `###`-level headings.
* [Static Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) must be listed under a `### Static Methods` chapter.
* [Instance Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) must be listed under an `### Instance Methods` chapter.
* All methods that have a return value must start their description with "Returns `[TYPE]` - [Return description]"
  * If the method returns an `Object`, its structure can be specified using a colon followed by a newline then an unordered list of properties in the same style as function parameters.
* 实例事件必须在 `### Instance Events` 章节中列出.
* 实例属性必须列在 `### 实例属性` 章节下。
  * Instance Properties must start with "A [Property Type] ..."

这里用 `Session` 和 `Cookies` 类作为例子:

```markdown
# session

## Methods

### session.fromPartition(partition)

## Static Properties

### session.defaultSession

## Class: Session

### Instance Events

#### Event: 'will-download'

### Instance Methods

#### `ses.getCacheSize()`

### Instance Properties

#### `ses.cookies`

## Class: Cookies

### Instance Methods

#### `cookies.get(filter, callback)`
```

### Methods and their arguments

方法章节必须采用以下形式：

```markdown
### `objectName.methodName(required[, optional])`

* `requird` String - A 参数描述。
* `optional` 整数(可选) - 另一个参数描述。

...
```

#### Heading level

The heading can be `###` or `####`-levels depending on whether the method belongs to a module or a class.

#### Function signature

对于模块， `objectName` 是模块的名称。 对于类，它必须是类实例的名称，而且不能与模块名称相同。

例如，`session` 模块下的 `Session` 类的方法必须使用 `ses` 作为 `objectName` 。

Optional arguments are notated by square brackets `[]` surrounding the optional argument as well as the comma required if this optional argument follows another argument:

```markdown
required[, optional]
```

#### Argument descriptions

More detailed information on each of the arguments is noted in an unordered list below the method. The type of argument is notated by either JavaScript primitives (e.g. `String`, `Promise`, or `Object`), a custom API structure like Electron's [`Cookie`](api/structures/cookie.md), or the wildcard `any`.

If the argument is of type `Array`, use `[]` shorthand with the type of value inside the array (for example,`any[]` or `String[]`).

If the argument is of type `Promise`, parametrize the type with what the promise resolves to (for example, `Promise<void>` or `Promise<String>`).

If an argument can be of multiple types, separate the types with `|`.

`Function` 类型参数的描述应该清楚描述它是如何被调用的，并列出将被传递给它的参数的类型.

#### Platform-specific functionality

如果参数或方法对某些平台是唯一的，那么这些平台将使用数据类型后面的空格分隔的斜体列表来表示。 值可以是 `macOS`，`Windows` 或 `Linux`.

```markdown
* `animate` Boolean (optional) _macOS_ _Windows_ - 进行动画处理的事情.
```

### 事件

事件章节必须采用以下形式:

```markdown
### Event: 'wake-up'

Returns:

* `time` String

...
```

The heading can be `###` or `####`-levels depending on whether the event belongs to a module or a class.

事件的参数遵循与方法相同的规则.

### Properties

属性章节必须采用以下形式:

```markdown
### session.defaultSession

...
```

The heading can be `###` or `####`-levels depending on whether the property belongs to a module or a class.

## Documentation translations

请参见 [ electron/i18n ](https://github.com/electron/i18n#readme)

[title-case]: https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case
[sentence-case]: https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case
[markdownlint]: https://github.com/DavidAnson/markdownlint
