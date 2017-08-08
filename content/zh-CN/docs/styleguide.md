# Electron 文档风格指南

这里是一些编写 Electron 文档的指南.

## 标题

* 每个页面顶部必须有一个单独的 `＃`级标题。
* 同一页面中的章节必须有` ##` 级标题。
* 子章节需要根据它们的嵌套深度增加标题中的`＃`数量
* 页面标题中的所有单词首字母都必须大写，除了 “of” 和 “and” 之类的连接词。
* 只有章节标题的第一个单词首字母必须是大写.

举一个`Quick Start`的例子:

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

对于 API 参考, 可以例外于这些规则.

## Markdown 规则

* 在代码块中使用`bash`而不是`cmd`（由于语法高亮问题）.
* 行长度应该控制在80列内.
* 列表嵌套不超出2级 (由于 Markdown 渲染问题).
* 所有的` js` 和` javascript `代码块均被标记为[ standard-markdown](http://npm.im/standard-markdown).

## 用词选择

* 在描述结果时，使用 “will” 而不是 “would”。
* 首选 "in the ___ process" 而不是 "on".

## API 参考

以下规则仅适用于 API 的文档。

### 页面标题

每个页面必须使用由 `require（'electron'）` 返回的实际对象名称作为标题，例如` BrowserWindow`，`autoUpdater` 和 `session`。

在页面标题下必须是以`>`开头的单行描述。

举一个 `session` 的例子:

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

* API classes or classes that are part of modules must be listed under a `## Class: TheClassName` chapter.
* One page can have multiple classes.
* Constructors must be listed with `###`-level titles.
* [Static Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) must be listed under a `### Static Methods` chapter.
* [Instance Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) must be listed under an `### Instance Methods` chapter.
* All methods that have a return value must start their description with "Returns `[TYPE]` - Return description" 
  * If the method returns an `Object`, its structure can be specified using a colon followed by a newline then an unordered list of properties in the same style as function parameters.
* Instance Events must be listed under an `### Instance Events` chapter.
* Instance Properties must be listed under an `### Instance Properties` chapter. 
  * Instance properties must start with "A [Property Type] ..."

Using the `Session` and `Cookies` classes as an example:

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

### Methods

The methods chapter must be in the following form:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Integer (optional) - Another parameter description.

...
```

The title can be `###` or `####`-levels depending on whether it is a method of a module or a class.

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

For example, the methods of the `Session` class under the `session` module must use `ses` as the `objectName`.

The optional arguments are notated by square brackets `[]` surrounding the optional argument as well as the comma required if this optional argument follows another argument:

    required[, optional]
    

Below the method is more detailed information on each of the arguments. The type of argument is notated by either the common types:

* [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Or a custom type like Electron's [`WebContent`](api/web-contents.md)

If an argument or a method is unique to certain platforms, those platforms are denoted using a space-delimited italicized list following the datatype. Values can be `macOS`, `Windows`, or `Linux`.

```markdown
* `animate` Boolean (optional) _macOS_ _Windows_ - Animate the thing.
```

`Array` type arguments must specify what elements the array may include in the description below.

The description for `Function` type arguments should make it clear how it may be called and list the types of the parameters that will be passed to it.

### Events

The events chapter must be in following form:

```markdown
### Event: 'wake-up'

Returns:

* `time` String

...
```

The title can be `###` or `####`-levels depending on whether it is an event of a module or a class.

The arguments of an event follow the same rules as methods.

### Properties

The properties chapter must be in following form:

```markdown
### session.defaultSession

...
```

The title can be `###` or `####`-levels depending on whether it is a property of a module or a class.

## Documentation Translations

Translations of the Electron docs are located within the `docs-translations` directory.

To add another set (or partial set):

* Create a subdirectory named by language abbreviation.
* Translate the files.
* Update the `README.md` within your language directory to link to the files you have translated.
* Add a link to your translation directory on the main Electron [README](https://github.com/electron/electron#documentation-translations).

Note that the files under `docs-translations` must only include the translated ones, the original English files should not be copied there.