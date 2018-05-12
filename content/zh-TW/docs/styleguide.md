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

* API 類別或屬於該模組的類別，必須條列在 `## Class: 類別名稱` 章節下。
* 同一頁裡可以有多個類別。
* 建構式必須用 `###` 級別的標題列出。
* [靜態方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static)必須列在 `### 靜態方法` 章節下。
* [物件方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods)必須列在 `### 物件方法` 章節下。
* 具有回傳值的方法第一行描述必須是「回傳 `[TYPE]` - 回傳內容描述」 
  * 如果方法回傳的是 `Object`，其結構可以在冒號及分行符號後以無序的屬性清單描述，格式與函數參數相同。
* 物件事件必須列在 `### 物件事件` 章節下。
* 物件屬性必須列在 `### 物件屬性` 章節下。 
  * 物件屬性必須以「一個 [屬性型別] ...」開頭。

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

標題可以是 `###` 或 `####` 級別，取決於它是屬於模組還是類別的方法。

對於模組而言，`objectName` 是模組的名稱。對於類別，則必須是類別物件的名稱，而且並且不得與模組名稱相同。

例如 `session` 模組下的 `Session` 類別方法必須使用 `ses` 作為 `objectName`。

選用的參數以方括號 `[]` 包住，如果這個選用參數跟在其他參數後面，也必須包進對應的逗號:

```sh
required[, optional]
```

方法後接每個參數的詳細資訊。參數的類型可使用一般型別:

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