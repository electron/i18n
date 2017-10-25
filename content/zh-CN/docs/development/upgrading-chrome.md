# 更新 Chrome 的检查清单

本文档旨在概述 Electron 中每次 Chrome 升级需要执行哪些步骤。

除了更新任何 Chrome / Node API 更改的 Electron 代码之外，还需要做这些事情。

- 从 https://github.com/zcbenz/chromium-source-tarball/releases 验证新的 Chrome 版本是否可用
- 更新 `electron/libchromiumcontent` 副本根下的 `VERSION` 文件
- 更新 `CLANG_REVISION` 在 `script/update-clang.sh` 中到匹配的版本.Chrome正在使用`libchromiumcontent/src/tools/clang/scripts/update.py`
- 将 `vendor/node` 升级到对应于 v8 版本的 Node 版本以用于新的Chrome版本。 查看 Node 中的 v8 版本 从 https://nodejs.org/en/download/releases 获取更多详情
- 升级 `vendor/crashpad`，以便任意崩溃记录器变更需要
- 升级 `vendor / depot_tools` 用于所需的任何构建工具更改
- 升级 `libchromiumcontent` SHA-1 下载到 `script/lib/config.py`
- 打开一个 pull request 在 `electron/libchromiumcontent` 用所做的更改
- 开一个 pull request `electron/electron` 用所做的更改 
  - 这应该包括根据需要升级 `vendor/` 中的子模块
- 验证调试版本构建成功: 
  - macOS
  - 32 位 Windows
  - 64 位 Windows
  - 32 位 Linux
  - 64 位 Linux
  - ARM Linux
- 验证发行版本构建成功: 
  - macOS
  - 32 位 Windows
  - 64 位 Windows
  - 32 位 Linux
  - 64 位 Linux
  - ARM Linux
- 验证测试通过: 
  - macOS
  - 32 位 Windows
  - 64 位 Windows
  - 32 位 Linux
  - 64 位 Linux
  - ARM Linux

## 验证 ffmpeg 支持

Electron 发行版的 `ffmpeg`，默认包括专有的编解码器 没有这些编解码器的版本也被构建并分发到每个版本。 每个Chrome升级应验证是否仍然支持切换此版本。

您可以通过加载以下页面来验证Electron对多个`ffmpeg`构建的支持。 它应该与使用Electron分发的默认`ffmpeg`库一起工作，而不使用没有专有编解码器的`ffmpeg`库。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Proprietary Codec Check</title>
  </head>
  <body>
    <p>Checking if Electron is using proprietary codecs by loading video from http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4</p>
    <p id="outcome"></p>
    <video style="display:none" src="http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4" autoplay></video>
    <script>
      const video = document.querySelector('video')
      video.addEventListener('error', ({target}) => {
        if (target.error.code === target.error.MEDIA_ERR_SRC_NOT_SUPPORTED) {
          document.querySelector('#outcome').textContent = 'Not using proprietary codecs, video emitted source not supported error event.'
        } else {
          document.querySelector('#outcome').textContent = `Unexpected error: ${target.error.code}`
        }
      })
      video.addEventListener('playing', () => {
        document.querySelector('#outcome').textContent = 'Using proprietary codecs, video started playing.'
      })
    </script>
  </body>
</html>
```

## 链接

- [Chrome 发布日程](https://www.chromium.org/developers/calendar)