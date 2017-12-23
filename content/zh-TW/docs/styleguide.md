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

* 在程式碼區塊中使用 `sh` 而不是 `cmd` (以便語法上色)。
* 一行長度以 80 個半形字元為限，超過請換行。
* 縮排以兩階為限 (受限於 Markdown 畫面轉譯器)。
* 所有的 `js` 及 `javascript` 程式碼區塊都由 [standard-markdown](http://npm.im/standard-markdown) lint 過。

## 用詞

* 描述結果時使用 “will”，而不是 “would”。
* 用 “in the ___ process”，不要用 “on”。

## API 參考

下列規則只適用於 API 文件。

### 頁面標題

每一頁的標題都必須是 `require('electron')` 回傳的實際物件名稱，例如 `BrowserWindow`、`autoUpdater` 和 `session`。

頁標題後必須使用單行來描述，並以 `>` 開頭。

以 `session` 為例:

```markdown
# session

> 管理瀏覽器 Session、Cookie、快取、代理伺服器設定等。
```

### 模組方法和事件

對於類別以外的模組，其方法及事件必須條列在 `## 方法` 及 `## 事件` 章節下。

以 `autoUpdater` 為例:

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
* Instance Properties must be listed under an `### 物件屬性` chapter. 
  * Instance properties must start with "A [Property Type] ..."

以 `Session` 及 `Cookies` 類別為例:

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

```sh
required[, optional]
```

Below the method is more detailed information on each of the arguments. The type of argument is notated by either the common types:

* [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* 或自訂類別，例如 Electron 的 [`WebContent`](api/web-contents.md)

If an argument or a method is unique to certain platforms, those platforms are denoted using a space-delimited italicized list following the datatype. 可用的值有 `macOS`, `Windows` 及 `Linux`。

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

參考 [electron/electron-i18n](https://github.com/electron/electron-i18n#readme)