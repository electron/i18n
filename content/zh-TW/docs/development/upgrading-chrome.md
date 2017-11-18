# Chrome 升級檢查清單

This document is meant to serve as an overview of what steps are needed on each Chrome upgrade in Electron.

These are things to do in addition to updating the Electron code for any Chrome/Node API changes.

- Verify the new Chrome version is available from https://github.com/zcbenz/chromium-source-tarball/releases
- Update the `VERSION` file at the root of the `electron/libchromiumcontent` repository
- Update the `CLANG_REVISION` in `script/update-clang.sh` to match the version Chrome is using in `libchromiumcontent/src/tools/clang/scripts/update.py`
- Upgrade `vendor/node` to the Node release that corresponds to the v8 version being used in the new Chrome release. See the v8 versions in Node on https://nodejs.org/en/download/releases for more details
- Upgrade `vendor/crashpad` for any crash reporter changes needed
- Upgrade `vendor/depot_tools` for any build tools changes needed
- Update the `libchromiumcontent` SHA-1 to download in `script/lib/config.py`
- Open a pull request on `electron/libchromiumcontent` with the changes
- Open a pull request on `electron/electron` with the changes 
  - This should include upgrading the submodules in `vendor/` as needed
- Verify debug builds succeed on: 
  - macOS
  - 32-bit Windows
  - 64-bit Window
  - 32-bit Linux
  - 64-bit Linux
  - ARM Linux
- Verify release builds succeed on: 
  - macOS
  - 32-bit Windows
  - 64-bit Window
  - 32-bit Linux
  - 64-bit Linux
  - ARM Linux
- Verify tests pass on: 
  - macOS
  - 32-bit Windows
  - 64-bit Window
  - 32-bit Linux
  - 64-bit Linux
  - ARM Linux

## Verify ffmpeg Support

Electron ships with a version of `ffmpeg` that includes proprietary codecs by default. A version without these codecs is built and distributed with each release as well. Each Chrome upgrade should verify that switching this version is still supported.

You can verify Electron's support for multiple `ffmpeg` builds by loading the following page. It should work with the default `ffmpeg` library distributed with Electron and not work with the `ffmpeg` library built without proprietary codecs.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>專有轉碼器檢查</title>
  </head>
  <body>
    <p>由 http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4 載入影片，檢查 Electron 是否使用了專有轉碼器。</p>
    <p id="outcome"></p>
    <video style="display:none" src="http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4" autoplay></video>
    <script>
      const video = document.querySelector('video')
      video.addEventListener('error', ({target}) => {
        if (target.error.code === target.error.MEDIA_ERR_SRC_NOT_SUPPORTED) {
          document.querySelector('#outcome').textContent = '沒有專有轉碼器，影片發出「無法支援的來源檔」事件。'
        } else {
          document.querySelector('#outcome').textContent = `預期外的錯誤: ${target.error.code}`
        }
      })
      video.addEventListener('playing', () => {
        document.querySelector('#outcome').textContent = '使用專有轉碼器，影片開始播放。'
      })
    </script>
  </body>
</html>
```

## 連結

- [Chrome Release Schedule](https://www.chromium.org/developers/calendar)