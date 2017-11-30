# Electron 文件編寫風格

Electron 說明文件撰寫指導方針。

## 標題

* 每一頁的最上方都要有單獨一個 `#` 級別的標題。
* 同一頁中的各章必須有 `##` 級別的標題。
* 子章節需要根據其深度來增加標題中的 `#` 數量。
* 除了 “of” 和 “and” 等連詞外，頁面標題中的所有單詞都必須以大寫開頭。
* 只有章節標題的第一個詞必須大寫開頭。

以 `Quick Start` 快速入門應用程式為例:

```markdown
# 快速入門

...

## 主處理序

...

## 畫面轉譯處理序

...

## 執行你的應用程式

...

### 以發佈檔執行

...

### 手動下載 Electron 二進位

...
```

對於 API 參照，則有些例外。

## Markdown 規則

* 在程式碼區塊中使用 `bash` 而不是 `cmd` (以便語法上色)。
* 一行長度以 80 個半形字元為限，超過請換行。
* 縮排以兩階為限 (受限於 Markdown 畫面轉譯器)。
* All `js` and `javascript` code blocks are linted with [standard-markdown](http://npm.im/standard-markdown).

## 選字

* Use "will" over "would" when describing outcomes.
* Prefer "in the ___ process" over "on".

## API 參考

The following rules only apply to the documentation of APIs.

### 頁面標題

Each page must use the actual object name returned by `require('electron')` as the title, such as `BrowserWindow`, `autoUpdater`, and `session`.

Under the page tile must be a one-line description starting with `>`.

Using `session` as example:

```markdown
# session

> 管理瀏覽器 Session、Cookie、快取、代理伺服器設定等。
```

### 模組方法和事件

For modules that are not classes, their methods and events must be listed under the `## Methods` and `## Events` chapters.

Using `autoUpdater` as an example:

```markdown
# autoUpdater

## 事件

### 事件: 'error'

## 方法

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### 類別

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

## 方法

### session.fromPartition(partition)

## 屬性

### session.defaultSession

## Class: Session

### 物件事件

#### 事件: 'will-download'

### 物件方法

#### `ses.getCacheSize(callback)`

### 物件屬性

#### `ses.cookies`

## Class: Cookies

### 物件方法

#### `cookies.get(filter, callback)`
```

### 方法

「方法」小節必須遵照下列格式:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - 參數描述。
* `optional` Integer (選用) - 另一個參數的描述。

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
* 或自訂類別，例如 Electron 的 [`WebContent`](api/web-contents.md)

If an argument or a method is unique to certain platforms, those platforms are denoted using a space-delimited italicized list following the datatype. Values can be `macOS`, `Windows`, or `Linux`.

```markdown
* `animate` Boolean (選用) _macOS_ _Windows_ - 使用動畫。
```

`Array` type arguments must specify what elements the array may include in the description below.

The description for `Function` type arguments should make it clear how it may be called and list the types of the parameters that will be passed to it.

### 事件

「事件」小節必須遵照下列格式:

```markdown
### 事件: 'wake-up'

回傳:

* `time` String

...
```

The title can be `###` or `####`-levels depending on whether it is an event of a module or a class.

The arguments of an event follow the same rules as methods.

### 屬性

「屬性」小節必須遵照下列格式:

```markdown
### session.defaultSession

...
```

標題可以是 `###` 或 `####` 級別，取決於它是模組還是類別的屬性。

## 文件翻譯

Electron 文件的翻譯放在 `docs-translations` 目錄裡。

如果要新增別種語言:

* 建立名稱為語言縮寫的子目錄。
* 翻譯檔案。
* 更新語言目錄中的 `README.md`，連結到你翻譯好的檔案去。
* 在 Electron 主 [README](https://github.com/electron/electron#documentation-translations) 中加入連結，指到你翻譯的目錄。

請注意，`docs-translations` 下請只放翻譯過的文件，不要將原文的檔案直接複製進去。