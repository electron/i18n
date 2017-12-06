# Cài đặt tại thư mục ứng dụng

> Mẹo cài đặt Electron

Để cài đặt các tệp thực thi Electron buid sẵn, hãy sử dụng [`npm`](https://docs.npmjs.com/). Phương pháp cài đặt Electron khuyên dùng là cài các tệp tạo sẵn dành cho phát triển ứng dụng. Ứng dụng của bạn sẽ phụ thuộc vào các tệp này, để cài hãy sử dụng câu lệnh sau tại thư mục chứa ứng dụng:

```sh
npm install electron --save-dev
```

See the [Electron versioning doc](electron-versioning.md) for info on how to manage Electron versions in your apps.

## Cặt đặt trên toàn hệ thống

Bạn cũng có thể cài `electron` vào `$PATH` để sử dụng trên toàn hệ thống:

```sh
npm install electron -g
```

## Tùy biến cài đặt

If you want to change the architecture that is downloaded (e.g., `ia32` on an `x64` machine), you can use the `--arch` flag with npm install or set the `npm_config_arch` environment variable:

```shell
npm install --arch=ia32 electron
```

In addition to changing the architecture, you can also specify the platform (e.g., `win32`, `linux`, etc.) using the `--platform` flag:

```shell
npm install --platform=win32 electron
```

## Proxies

If you need to use an HTTP proxy you can [set these environment variables](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables).

## Xử lý sự cố

When running `npm install electron`, some users occasionally encounter installation errors.

In almost all cases, these errors are the result of network problems and not actual issues with the `electron` npm package. Errors like `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` are all indications of such network problems. The best resolution is to try switching networks, or just wait a bit and try installing again.

You can also attempt to download Electron directly from [electron/electron/releases](https://github.com/electron/electron/releases) if installing via `npm` is failing.

If installation fails with an `EACCESS` error you may need to [fix your npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

If the above error persists, the [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) flag may need to be set to true:

```sh
sudo npm install electron --unsafe-perm=true
```

On slower networks, it may be advisable to use the `--verbose` flag in order to show download progress:

```sh
npm install --verbose electron
```

If you need to force a re-download of the asset and the SHASUM file set the `force_no_cache` enviroment variable to `true`.