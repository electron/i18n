# Cài đặt tại thư mục ứng dụng

> Các mẹo cài đặt Electron

Để cài đặt các tệp thực thi Electron buid sẵn, hãy sử dụng [`npm`](https://docs.npmjs.com/). Phương pháp cài đặt Electron khuyên dùng là cài các tệp tạo sẵn dành cho phát triển ứng dụng. Ứng dụng của bạn sẽ phụ thuộc vào các tệp này, để cài hãy sử dụng câu lệnh sau tại thư mục chứa ứng dụng:

```sh
npm install electron --save-dev
```

Xem [tài liệu về quản lý phiên bản Electron](electron-versioning.md) để biết thêm thông tin về cách quản lý phiên bản cho ứng dụng của bạn.

## Cặt đặt trên toàn hệ thống

Bạn cũng có thể cài `electron` vào `$PATH` để sử dụng trên toàn hệ thống:

```sh
npm install electron -g
```

## Tùy biến cài đặt

Nếu bạn muốn thay đổi kiểu kiến trúc hệ thống cho bản electron được tải về (ví dụ `ia32` trên hệ `x64`), bạn có thể sử dụng `--arch` trong lệnh npm hoặc đặt biến môi trường `npm_config_arch`:

```shell
npm install --arch=ia32 electron
```

Ngoài việc thay đổi kiến trúc, bạn có thể chỉ định nền tảng (ví dụ: `win32`, `linux`,...) bằng cách sử dụng `--platform` trong câu lệnh:

```shell
npm install --platform=win32 electron
```

## Proxy

Nếu bạn muốn sử dụng proxy HTTP bạn có thể [đặt một số biến môi trường](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables).

## Xử lý sự cố

Khi chạy `npm install electron`, một số người dùng đôi khi gặp phải lỗi cài đặt.

Trong hầu hết các trường hợp, các lỗi này là kết quả của các vấn đề về mạng và không phải là vấn đề thực tế với gói điện tử < 0> electron </ 0> npm . Errors like `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` are all indications of such network problems. Độ phân giải tốt nhất là thử chuyển mạng, hoặc chỉ cần đợi một chút và thử cài đặt lại.

Bạn cũng có thể tải Electron trực tiếp từ [electron/electron/releases](https://github.com/electron/electron/releases) nếu quá trình cài đặt `npm` bị lỗi.

Nếu cài đặt không thành công với lỗi `EACCESS` bạn có thể cần phải [chỉnh lại phân quyền npm](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

Nếu lỗi trên vẫn còn, [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) có thể cần phải được thiết lập là true:

```sh
sudo npm install electron --unsafe-perm=true
```

Với những mạng chậm, bạn nên sử dụng `--verbose` để hiển thị tiến trình tải về:

```sh
npm install --verbose electron
```

Nếu bạn cần buộc phải tải lại các tập tin và SHASUM hãy đặt biến môi trường `force_no_cache` thành `true`.