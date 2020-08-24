# 升级 Chromium

本文概述了在Electron中升级Chromium所需的步骤。

- 将libcc升级到新的Chromium版本
- 使Electron兼容新的libcc
- 如有必要，请更新Electron的相关依赖（如崩溃报告，NodeJS等）
- 创建libcc和Electron的内部编译本
- 如有需要，请更新Electron文档


## 将`libcc`升级到新的Chromium版本

1. 取得代码并初始化项目：
  ```sh
  $ git clone git@github.com:electron/libchromiumcontent.git
  $ cd libchromiumcontent
  $ ./script/bootstrap -v
  ```
2. 更新 Chromium 快照
  - Choose a version number from [OmahaProxy](https://omahaproxy.appspot.com/) and update the `VERSION` file with it
    - 这可以通过在浏览器中访问 OmahaProxy 手动完成，或自动完成：
    - 最新稳定版 Mac 可用的一键脚本：`curl -so- https://omahaproxy.appspot.com/mac > VERSION`
    - 最新测试版 win64 一键脚本： `curl -so- https://omahaproxy.appspot.com/all | grep "win64,beta" | awk -F, 'NR==1{print $3}' > VERSION`
  - run `$ ./script/update`
    - 倒杯茶吧 -- 这可能会运行 30 分钟或更长。
    - 补丁的应用可能会失败。
3. Fix `*.patch` files in the `patches/` and `patches-mas/` folders.
4. (Optional) `script/update` applies patches, but if multiple tries are needed you can manually run the same script that `update` calls: `$ ./script/apply-patches`
  - There is a second script, `script/patch.py` that may be useful. Read `./script/patch.py -h` for more information.
5. Run the build when all patches can be applied without errors
  - `$ ./script/build`
  - If some patches are no longer compatible with the Chromium code, fix compilation errors.
6. When the build succeeds, create a `dist` for Electron
  - `$ ./script/create-dist --no_zip`
    - It will create a `dist/main` folder in the libcc repo's root. You will need this to build Electron.
7. (Optional) Update script contents if there are errors resulting from files that were removed or renamed. (`--no_zip` prevents script from create `dist` archives. You don't need them.)


## 更新Electron代码

1. 获取代码:
  ```sh
  $ git clone git@github.com:electron/electron.git
  $ cd electron
  ```
2. If you have libcc built on your machine in its own repo, tell Electron to use it:
  ```sh
  $ ./script/bootstrap.py -v \
    --libcc_source_path <libcc_folder>/src \
    --libcc_shared_library_path <libcc_folder>/shared_library \
    --libcc_static_library_path <libcc_folder>/static_library
  ```
3. If you haven't yet built libcc but it's already supposed to be upgraded to a new Chromium, bootstrap Electron as usual `$ ./script/bootstrap.py -v`
  - Ensure that libcc submodule (`vendor/libchromiumcontent`) points to the right revision

4. Set `CLANG_REVISION` in `script/update-clang.sh` to match the version Chromium is using.
  - Located in `electron/libchromiumcontent/src/tools/clang/scripts/update.py`

5. Checkout Chromium if you haven't already:
  - https://chromium.googlesource.com/chromium/src.git/+/{VERSION}/tools/clang/scripts/update.py
    - (Replace the `{VERSION}` placeholder in the url above to the Chromium version libcc uses.)
6. 构建Electron。
  - Try to build Debug version first: `$ ./script/build.py -c D`
  - You will need it to run tests
7. 修复编译和链接错误
8. 确保也可以构建发布版本
  - `$ ./script/build.py -c R`
  - Often the Release build will have different linking errors that you'll need to fix.
  - Some compilation and linking errors are caused by missing source/object files in the libcc `dist`
9. Update `./script/create-dist` in the libcc repo, recreate a `dist`, and run Electron bootstrap script once again.

### 关于修复编译错误的提示
- 首先修复构建配置的错误
- 首先修复致命错误，例如丢失文件和与编译器相关的错误 标志或定义
- 尝试尽快识别复杂错误。
  - 如果您不确定如何修复问题，请寻求帮助
- 禁用所有 Electron 功能，修复构建，然后逐个启用它们
- 添加更多构建标志以在构建时禁用功能。

When a Debug build of Electron succeeds, run the tests: `$ npm run test` Fix the failing tests.

按照上述所有步骤在所有支持的平台上修复 Electron 代码。


## 更新崩溃报告（Crashpad）

如果有任何与Crashpad相关的编译错误，则可能意味着您需要将fork更新为更新的版本。 查阅 [更新崩溃报告](upgrading-crashpad.md) 了解相关步骤。


## 更新NodeJS

Upgrade `vendor/node` to the Node release that corresponds to the v8 version used in the new Chromium release. See the v8 versions in Node on

请参见 [更新 Node ](upgrading-node.md) 有关这方面的说明。

## 验证 ffmpeg 支持

Electron 发行版的 `ffmpeg`，默认包括专有的编解码器 没有这些编解码器的版本也被构建并分发到每个版本。 每个Chrome升级都应该验证是否仍然支持切换此版本。

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
      video.addEventListener('error', ({ target }) => {
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

## 相关链接

- [Chrome 发布日程](https://www.chromium.org/developers/calendar)
- [OmahaProxy](http://omahaproxy.appspot.com)
- [Chromium 问题追踪器](https://bugs.chromium.org/p/chromium)
