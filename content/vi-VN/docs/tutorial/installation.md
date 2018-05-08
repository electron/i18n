# Cài đặt tại thư mục ứng dụng

Để cài đặt các tệp thực thi Electron buid sẵn, hãy sử dụng [`npm`](https://docs.npmjs.com). Phương pháp cài đặt Electron khuyên dùng là cài các tệp tạo sẵn dành cho phát triển ứng dụng. Ứng dụng của bạn sẽ phụ thuộc vào các tệp này, để cài hãy sử dụng câu lệnh sau tại thư mục chứa ứng dụng:

```sh
npm install electron --save-dev
```

See the [Electron versioning doc](./electron-versioning.md) for info on how to manage Electron versions in your apps.

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

In addition to changing the architecture, you can also specify the platform (e.g., `win32`, `linux`, etc.) using the `--platform` flag:

```shell
npm install --platform=win32 electron
```

## Proxy

Nếu bạn muốn sử dụng proxy HTTP bạn có thể [đặt một số biến môi trường](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables).

## Custom Mirrors and Caches

During installation, the `electron` module will call out to [`electron-download`](https://github.com/electron-userland/electron-download) to download prebuilt binaries of Electron for your platform. It will do so by contacting GitHub's release download page (`https://github.com/electron/electron/releases/tag/v$VERSION`, where `$VERSION` is the exact version of Electron).

If you are unable to access GitHub or you need to provide a custom build, you can do so by either providing a mirror or an existing cache directory.

#### Mirror

You can use environment variables to override the base URL, the path at which to look for Electron binaries, and the binary filename. The url used by `electron-download` is composed as follows:

```txt
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

For instance, to use the China mirror:

```txt
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
```

#### Cache

Alternatively, you can override the local cache. `electron-download` will cache downloaded binaries in a local directory to not stress your network. You can use that cache folder to provide custom builds of Electron or to avoid making contact with the network at all.

* Linux: `$XDG_CACHE_HOME` or `~/.cache/electron/`
* MacOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` or `~/AppData/Local/electron/Cache/`

On environments that have been using older versions of Electron, you might find the cache also in `~/.electron`.

You can also override the local cache location by providing a `ELECTRON_CACHE` environment variable.

The cache contains the version's official zip file as well as a checksum, stored as a text file. A typical cache might look like this:

```sh
├── electron-v1.7.9-darwin-x64.zip
├── electron-v1.8.1-darwin-x64.zip
├── electron-v1.8.2-beta.1-darwin-x64.zip
├── electron-v1.8.2-beta.2-darwin-x64.zip
├── electron-v1.8.2-beta.3-darwin-x64.zip
├── SHASUMS256.txt-1.7.9
├── SHASUMS256.txt-1.8.1
├── SHASUMS256.txt-1.8.2-beta.1
├── SHASUMS256.txt-1.8.2-beta.2
├── SHASUMS256.txt-1.8.2-beta.3
```

## Xử lý sự cố

Khi chạy `npm install electron`, một số người dùng đôi khi gặp phải lỗi cài đặt.

Trong hầu hết các trường hợp, các lỗi này là kết quả của các vấn đề về mạng và không phải là vấn đề với gói npm của `electron`. Các lỗi như `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, và `ETIMEDOUT` tất cả là biểu hiện của các vấn đề về mạng. The best resolution is to try switching networks, or wait a bit and try installing again.

Bạn cũng có thể tải Electron trực tiếp từ [electron/electron/releases](https://github.com/electron/electron/releases) nếu quá trình cài đặt `npm` bị lỗi.

If installation fails with an `EACCESS` error you may need to [fix your npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

If the above error persists, the [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) flag may need to be set to true:

```sh
sudo npm install electron --unsafe-perm=true
```

On slower networks, it may be advisable to use the `--verbose` flag in order to show download progress:

```sh
npm install --verbose electron
```

If you need to force a re-download of the asset and the SHASUM file set the `force_no_cache` environment variable to `true`.