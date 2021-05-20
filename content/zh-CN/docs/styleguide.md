# Electron 文档风格指南

这里是一些编写 Electron 文档的指南。

## 标题

* 每个页面顶部必须有一个 `#` 级标题。
* 同一页面中的各章节必须有 `##` 级标题。
* 各小节需要根据其嵌套层级在头部增加 `#` 的数量。
* 页面标题必须按照 [APA 标题大小写][title-case]。
* 所有章节都必须遵循 [APA语句大小写][sentence-case]。

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

这个仓库使用 [`markdownline`][markdownlint] 软件包来实行前后一致的 Markdown 风格。 有关确切规则，请参阅根文件夹中的 `.markdownlint.json` 文件。

有几个样式准则不在 linter 规则范围之内：

<!--TODO(erickzhao): make sure this matches with the lint:markdownlint task-->
* 在代码块中使用`bash`而不是`cmd`（由于语法高亮问题）.
* 为了可读性，如果可能，保持一行长度在80到100个字符之间。
* 列表嵌套不超出2级 (由于 Markdown 渲染问题).
* 所有的` js` 和` javascript `代码块均被标记为[ standard-markdown](https://www.npmjs.com/package/standard-markdown).
* 对于无序列表，请使用星号而不是破折号.

## 用词选择

* 在描述结果时，使用 “will” 而不是 “would”。
* 首选 "in the ___ process" 而不是 "on".

## API 参考

以下规则仅适用于 API 的文档。

### 标题和描述

每个模块的API文档必须使用由 `require('electron')` 返回的实际对象名称作为标题。(例如` BrowserWindow``autoUpdater` 和 `session`)。

直接在页面标题下方，添加一行模块描述作为Markdown 引用(以 `>` 开头)。

以使用 `session` 模块作为例子:

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
* 构造函数必须用 `###` 级标题列出。
* [静态方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) 必须在 `### Static Methods` 章节中列出。
* [实例方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) 必须在 `### Instance Methods` 章节中列出。
* 所有具有返回值的方法都必须以“Returns `[TYPE]` - [Return description]”开始
  * 如果该方法返回一个 `Object`，其结构可以使用冒号后跟换行符的方式，然后使用与函数参数相同样式的无序属性列表。
* 实例事件必须在 `### Instance Events` 章节中列出.
* 实例属性必须列在 `### 实例属性` 章节下。
  * 实例属性必须以 "[属性类型] ..." 开头。

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

### 方法及其参数

方法章节必须采用以下形式：

```markdown
### `objectName.methodName(required[, optional])`

* `requird` String - A 参数描述。
* `optional` 整数(可选) - 另一个参数描述。

...
```

#### 标题级别

标题可以是 `###` 级别或 `####` 级别，具体取决于该方法是属于模块还是类。

#### 函数签名

对于模块， `objectName` 是模块的名称。 对于类，它必须是类实例的名称，而且不能与模块名称相同。

例如，`session` 模块下的 `Session` 类的方法必须使用 `ses` 作为 `objectName` 。

可选参数使用方括号 `[]` 表示，并且多个参数之间以逗号分隔：

```markdown
required[, optional]
```

#### 参数描述

关于每个参数的更详细信息将在方法下面的无序列表中列出。 参数类型是由 JavaScript 原始类型(例如: `String`, `Promise`, 或 `Object`)；自定义 API 结构，像Electron的 [`Cookie`](api/structures/cookie.md)；或通配符 `any` 注明。

如果参数是 `Array` 类型，请使用带有数组内值类型的 `[]` 缩写 (例如，`any[]` 或 `String[]`)。

如果参数类型为 `Promise`, 则将promise resolve时的类型作为参数(例如 `Promise<void>` 或 `Promise<String>`)。

如果参数可以是多种类型，则将类型通过 `|`分开。

`Function` 类型参数的描述应该清楚描述它是如何被调用的，并列出将被传递给它的参数的类型.

#### 平台特定功能

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

标题可以是 `###` 级别或 `####` 级别，具体取决于该事件是属于模块还是类。

事件的参数遵循与方法相同的规则.

### Properties

属性章节必须采用以下形式:

```markdown
### session.defaultSession

...
```

标题可以是 `###` 级别或 `####` 级别，具体取决于该属性属于模块还是类。

## 文档翻译

请参见 [ electron/i18n ](https://github.com/electron/i18n#readme)

[title-case]: https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case
[sentence-case]: https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case
[markdownlint]: https://github.com/DavidAnson/markdownlint
