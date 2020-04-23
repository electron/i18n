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

* API 類別或屬於該模組的類別，必須條列在 `## Class: 類別名稱` 章節下。
* 同一頁裡可以有多個類別。
* 建構式必須用 `###` 級別的標題列出。
* [靜態方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static)必須列在 `### 靜態方法` 章節下。
* [物件方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods)必須列在 `### 物件方法` 章節下。
* All methods that have a return value must start their description with "Returns `[TYPE]` - Return description"
  * 如果方法回傳的是 `Object`，其結構可以在冒號及分行符號後以無序的屬性清單描述，格式與函數參數相同。
* 物件事件必須列在 `### 物件事件` 章節下。
* Instance Properties must be listed under an `### Instance Properties` chapter.
  * 物件屬性必須以「一個 [屬性型別] ...」開頭。

以 `Session` 及 `Cookies` 類別為例:

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

#### `ses.getCacheSize()`

### Instance Properties

#### `ses.cookies`

## Class: Cookies

### Instance Methods

#### `cookies.get(filter, callback)`
```

### 方法

「方法」小節必須遵照下列格式:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Integer (optional) - Another parameter description.

...
```

標題可以是 `###` 或 `####` 級別，取決於它是屬於模組還是類別的方法。

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

例如 `session` 模組下的 `Session` 類別方法必須使用 `ses` 作為 `objectName`。

選用的參數以方括號 `[]` 包住，如果這個選用參數跟在其他參數後面，也必須包進對應的逗號:

```sh
required[, optional]
```

Below the method is more detailed information on each of the arguments. The type of argument is notated by either the common types:

* [`String`](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number`](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Object`](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* 或自訂類別，例如 Electron 的 [`WebContent`](api/web-contents.md)

如果某個參數或方法只適用某些平臺，請將這些平臺以空格分隔的斜體清單標註在資料型別之後。 Values can be `macOS`, `Windows` or `Linux`.

```markdown
* `animate` Boolean (選用) _macOS_ _Windows_ - 使用動畫。
```

`Array` 型別的參數必須在描述中說明陣列中可能出現的元素型別。

`Function` 型別的參數說明應清楚說明使用方式，並列出需送進去的參數型別。

### 事件

「事件」小節必須遵照下列格式:

```markdown
### 事件: 'wake-up'

回傳:

* `time` String

...
```

標題可以是 `###` 或 `####` 級別，取決於它是屬於模組還是類別的屬性。

事件的參數遵循跟方法相同的規則。

### 屬性

「屬性」小節必須遵照下列格式:

```markdown
### session.defaultSession

...
```

標題可以是 `###` 或 `####` 級別，取決於它是模組還是類別的屬性。

## 文件翻譯

參考 [electron/i18n](https://github.com/electron/i18n#readme)
