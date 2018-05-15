# Danh sách các câu hỏi hay gặp của Electron

## Tại sao tôi lại gặp sự cố trong khi cài đặt Electron?

Khi chạy `npm install electron`, một số người dùng đôi khi gặp phải lỗi cài đặt.

Trong hầu hết các trường hợp, các lỗi này là kết quả của các vấn đề về mạng và không phải là vấn đề với gói npm của `electron`. Các lỗi như `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, và `ETIMEDOUT` tất cả là biểu hiện của các vấn đề về mạng. The best resolution is to try switching networks, or wait a bit and try installing again.

Bạn cũng có thể tải Electron trực tiếp từ [electron/electron/releases](https://github.com/electron/electron/releases) nếu quá trình cài đặt `npm` bị lỗi.

## Khi nào Chrome được cập nhật phiên bản mới nhất vào Electron?

Phiên bản của Chrome trong Electron thường được cài đặt vào trong khoảng một hoặc hai tuần sau khi phiên bản ổn định mới nhất đó được phát hành. Ước tính này không được đảm bảo và phụ thuộc vào công việc tham gia nâng cấp.

Chỉ có các luồn phiên bản ổn định của Chrome mới được cập nhật. Nếu có một sửa lỗi quan trọng từ Chrome nằm ở phiên bản beta hoặc dev, chúng tôi sẽ sử dụng nó.

Để biết thêm thông tin, vui lòng xem [thông tin bảo mật](tutorial/security.md).

## Khi nào thì Electron sử dụng phiên bản mới nhất của Node.js?

Khi một phiên bản mới nhất của Node.js được phát hành, chúng tôi thường chờ khoảng một tháng rồi mới cập nhật nó vô Electron. Nhờ vậy chúng tôi có thể tránh bị ảnh hưởng bởi các lỗi trong phiên bản Node.js mới, điều này xảy ra thường xuyên.

Các tính năng mới của Node.js thường được cung cấp bởi V8, kể từ khi Electron cũng sử dụng V8 từ trình duyệt Chrome, các tính năng mới của JavaScript trong các phiên bản mới nhất của Node.js thường đã sẳn sàng trong Electron.

## Làm thế nào để chia sẻ dữ liệu giữa các trang web?

Các đơn giản nhất để chia sẻ dữ liệu giữa các trang web (trong quá trình renderer) là sử dụng HTML5 API, đã có sẵn trong trình duyệt. Đề nghị tốt nhất cho bạn là [API Storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) và [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

Hoặc bạn có thể sử dụng hệ thống IPC của Electron, để lưu trữ các đối tượng trong main process như là một biến toàn cầu, và sau đó truy cập chúng từ các renderer thông qua các property `điều khiển (remote)` của module `electron`:

```javascript
// Trong main process.
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
// Trong trang 1.
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// Trong trang 2.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## Cửa sổ của ứng dụng hoặc icon dưới taskbar (tray) của tôi đột nhiên biến mất chỉ sau một vài phút xuất hiện.

Điều này xảy ra khi các biến được sử dụng để lưu trữ các cửa sổ/tray được bộ dọn rác dọn đi.

Nếu bạn gặp vấn đề này, bài viết sau đây có thể hữu ích:

* [Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Variable Scope](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

Nếu bạn chỉ muốn một sửa lỗi này nhanh chóng, bạn có thể tạo ra các biến toàn cầu bằng cách thay đổi code của bạn từ:

```javascript
const {app, Tray} = require('electron')
app.on('ready', () => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

thành:

```javascript
const {app, Tray} = require('electron')
let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## Tại sao tôi không thể sử dụng jQuery/RequireJS/Meteor/AngularJS trong Electron.

Do Node.js được tích hợp trong Electron, do đó có một số symbol bổ sung được chèn vào DOM như `module`, `exports`, `require`. Điều này gây ra vấn đề cho một số thư viện khi họ muốn chèn các symbols với cùng một tên.

Để giải quyết vấn đề này, bạn có thể tắt tích hợp Node trong Electron:

```javascript
// Trong main process.
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

Tuy nhiên, nếu bạn muốn giữ lại khả năng sử dụng Node.js và các Electron API, bạn phải đổi tên những symbol trong các trang trước khi cài các thư viện khác vào ứng dụng:

```html
<head>
<script>
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
</script>
<script type="text/javascript" src="jquery.js"></script>
</head>
```

## `require('electron').xxx` bị undefined.

Khi sử dụng các module được build sẵn trong Electron, bạn có thể gặp phải các lỗi như sau:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

Điều này xảy ra bởi vì bạn có một phiên bản khác của [npm của module của `electron`](https://www.npmjs.com/package/electron) được cài đặt tại thư mục hiện tại hoặc trên global, nó đã ghi đè vào các module được xây dựng sẵn bên trong Electron.

Để chắc chắn, cho dù bạn đang sử dụng chính xác module được xây dựng sẳn đó, hãy xem thử đường dẫn của module `electron` đó nằm, ở đâu:

```javascript
console.log(require.resolve('electron'))
```

và sau đó kiểm tra nếu nó có kiểu giống dưới đây:

```sh
"/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
```

Nếu nó là một cái gì đó như `node_modules/electron/index.js`, thì bạn phải loại bỏ các module npm `electron`, hoặc đổi tên nó.

```sh
npm uninstall electron
npm uninstall -g electron
```

Tuy nhiên nếu bạn đang sử dụng các module được xây dựng sẵn nhưng vẫn nhận được lỗi này, rất có thể bạn đang sử dụng module của process khác. Ví dụ `electron.app` chỉ có thể sử dụng trong main process, giống như `electron.webFrame` chỉ có thể sử dụng trong các renderer process.