# 應用程式打包

為了避開 Windows 處理長路徑名稱的[問題](https://github.com/joyent/node/issues/6960)，並稍微加快 `require` 效能，防止原始程式碼一眼就被看到。只需要一點點修改，就能把你的應用程式打包進 [asar](https://github.com/electron/asar) 封存檔。

## 產生 `asar` 封存檔

[asar](https://github.com/electron/asar)壓縮檔類似 tar 格式，將多個檔案串接成單一檔案。 Electron 可以讀取當中的任意檔案，而不用整包解開。

將應用程式打包進 `asar` 封存檔的步驟:

### 1. 安裝 asar 工具

```sh
$ npm install -g asar
```

### 2. 透過 `asar pack` 打包

```sh
$ asar pack your-app app.asar
```

## 使用 `asar` 封存檔

Electron 中有兩大塊 API: 由 Node.js 提供的 Node API，以及 Chromium 提供的 Web API。兩種 API 都能由 `asar` 封存檔中讀取檔案。

### Node API

透過 Electron 的特別修改，`fs. readFile` 和 `require` 等 Node API 會將 `asar` 封存檔視為虛擬目錄，裡面的檔案就像是檔案系統中的一般檔案。

舉例來說，假設在 `/path/to` 目錄下有一個 `example.asar` 封存檔:

```sh
$ asar list /path/to/example.asar
/app.js
/file.txt
/dir/module.js
/static/index.html
/static/main.css
/static/jquery.min.js
```

由 `asar` 封存檔中讀取檔案:

```javascript
const fs = require('fs')
fs.readFileSync('/path/to/example.asar/file.txt')
```

列出封存檔根目錄下的所有檔案:

```javascript
const fs = require('fs')
fs.readdirSync('/path/to/example.asar')
```

使用封存檔中的模組:

```javascript
require('/path/to/example.asar/dir/module.js')
```

你也可以在 `BrowserWindow` 中顯示 `asar` 封存檔中的網頁:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('file:///path/to/example.asar/static/index.html')
```

### Web API

在網頁方面，可以使用 `file:` 通訊協定讀取封存檔中的檔案。與 Node API 相同，`asar` 封存檔將被視為目錄。

例如，使用 `$.get` 取得檔案:

```html
<script>
let $ = require('./jquery.min.js')
$.get('file:///path/to/example.asar/file.txt', (data) => {
  console.log(data)
})
</script>
```

### 將 `asar` 封存檔視為一般檔案

在某些情況下，例如驗證 `asar` 封存檔的總和檢查碼，我們需要將整個 `asar` 封存檔的內容當做一般檔案讀取。 為此，你可以使用內建的 `original-fs` 模組，它提供不支援 `asar` 的原始 `fs` API:

```javascript
const originalFs = require('original-fs')
originalFs.readFileSync('/path/to/example.asar')
```

你也可以將 `process.noAsar` 設為 `true`，停用 `fs` 模組中的 `asar` 功能:

```javascript
const fs = require('fs')
process.noAsar = true
fs.readFileSync('/path/to/example.asar')
```

## Node API 的限制

雖然我們盡可能讓 `asar` 封存檔在 Node API 中像個目錄，但受限於 Node API 的低階特性，仍會有些限制。

### 封存檔是唯讀的

無法修改封存檔的內容。因此，所有可以修改檔案的 Node API 在 `asar` 封檔案中都無法使用。

### 不能將封存檔中的目錄設為工作目錄

雖然我們將 `asar` 封存檔視為目錄，但在檔案系統中並不存在這些目錄，因此你無法將工作目錄設為 `asar` 封存檔中的目錄。 將它們作為某些 API 的 `cwd` 參數將會出錯。

### 針對某些 API 額外解開

大多數 `fs` API 都可以直接從 `asar` 封存檔中讀取檔案或取得檔案資訊，無需解開。不過某些 API 需要將實際檔路徑傳給底層的系統呼叫，Electron 會把所需的檔案解到暫存目錄中，並將暫存檔路徑傳給 API，使其能正常運作。 這會對這些 API 增加額外負荷。

需要額外解開的 API 有:

* `child_process.execFile`
* `child_process.execFileSync`
* `fs.open`
* `fs.openSync`
* `process.dlopen` - 用來 `require` 原生模組

### `fs.stat` 的假資訊

由 `fs.stat` 那一掛 API 回傳的 `asar` 封存檔中的檔案 `Stats` 物件是用猜的，因為那些檔案並不在檔案系統中。 因此，除了取得檔案大小和檢查檔案類型之外，不要相信 `Stats` 物件裡的資訊。

### 執行 `asar` 封存檔中的二進位檔

有的 Node API 能執行二進位檔，例如 `child_process.exec`, `child_process.spawn` 及 `child_process.execFile`，但只有 `execFile` 支援執行 `asar` 封存檔中的二進位檔。

這是因為 `exec` 和 `spawn` 收的參數是 `command` (指令) 而不是 `file` (檔案)，而且 `command` 是在 shell 下執行的。 沒有萬無一失的方法判斷指令是否有用到 asar 封存檔中的檔案，就算我們真的做到了，也無法保證能毫無副作用的代換指令中的路徑。

## 將無法封存的檔案與 `asar` 封存檔整合

如上所述，使用某些 Node API 時會將檔案解回檔案系統，除了效能問題外，有的防毒軟體也會誤判。

要避開這些問題，你可以在建立封存檔時使用 `--unpack` 選項，將部分檔案「解開」，排除與原生模組共用的程式庫的例子長這樣:

```sh
$ asar pack app app.asar --unpack *.node
```

執行完這個指令後，除了 `app.asar` 以外，還會產生 `app.asar.unpacked` 目錄，存放那些解開的檔案。交給使用者的時候，應該將這個目錄與 `app.asar` 一起複製過去。