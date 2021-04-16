# 测试 Widevine CDM

在 Electron 中，你可以使用 Widevine CDM 库装载 Chrome 浏览器。

Widevine Content Decryption Modules (CDMs) are how streaming services protect content using HTML5 video to web browsers without relying on an NPAPI plugin like Flash or Silverlight. 广义支持是目前依靠银灯来播放 DRM保护视频内容的 流媒体服务的替代解决方案。 它将允许网站在 Firefox 中显示 DRM 保护的视频 内容，而无需使用 NPAPI 插件。 宽体清洁发展机制运行于 开放源码清洁发展机制沙盒，比NPAPI插件提供更好的用户安全。

#### VMP 上的注释

从 [`Electron v1.8。 (Chrome v59)`](https://electronjs.org/releases#1.8.1), 以下步骤可能只是开启宽体的一些必要步骤； 任何版本上或之后打算使用宽广清洁发展机制的应用程序可能需要 使用从 [宽广获得的许可证进行签名](https://www.widevine.com/) 本身。

每 [宽度](https://www.widevine.com/):

> Chrome 59 (及以后)包括支持已验证的媒体路径(VMP)。 VMP 提供了验证设备平台真实性的方法。 对于浏览器 部署，这将提供一个额外的信号，以确定基于浏览器的 实现是否可靠和安全。
> 
> 代理集成指南已经更新，包含关于 VMP 和 如何颁发许可证的信息。
> 
> 广义建议我们基于浏览器的集成(供应商和基于浏览器的 应用程序)，增加对 VMP的支持。

要使用此新限制启用视频回放， [种姓标签](https://castlabs.com/open-source/downstream/) 创建了一个 [派生](https://github.com/castlabs/electron-releases) 已经实现了 所需的更改，以便在一个 Electron 应用程序中播放，如果 一个人已经从广泛获取了必要的许可的话。

## 获取库

在 Chrome 浏览器中打开 `chrome://compons/` 找到 `宽松内容解密模块` 并确保它是最新的 然后您可以从 应用程序目录中找到库文件。

### Windows 中

库文件 `widvinecdm.dll` 将在 `程序文件(x86)/Google/Chrome/Application/CHROME_VERSION/WidevineCdm/_platform_specific/win_(x86|x64)/` 目录。

### 在 macOS 中

库文件 `libwidivinecdm.dylib` 将在 下。`/Applications/Google Chrome.app/Contents/Versions/CHROME_VERSION/Google Chrome Framework.framework/versions/A/Libraries/WidevineCdm/_platform_specific/mac_(x86|x64)/` 目录。

**注意：** 请确保Electron 使用的chrome版本大于或 等于 `min_chrome_version` 值的 Chrome's widentific cdm 组件. 该值可以在 `manifest.json` 处在 `WidevineCdm` 目录下找到。

## 使用库

在获取库文件后，您应该将路径传递到文件 与 `--wandvine-cdm-path` 命令行开关， 和库版本 用 `--widvine-cdm-version` 开关。 The command line switches have to be passed before the `ready` event of `app` module gets emitted.

示例代码：

```javascript
const { app, BrowserWindow } = require('electron')

// 您必须在此传递包含宽带库的目录，它是
// * `libwidvinecdm。 macOS上的 ylib`，
// * Windows上的 `widvinecdm.dll` 。
app.commandLine.appendSwitch('widvine-cdm-path', '/path/to/warvine_library')
// 插件版本可以从 Chrome://components`页面获取。
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.whenReady().then(() => {
  win = new BrowserWindow()
  win.show()
})
```

## 验证广义清洁发展机制支持

要验证是否广泛工作，您可以使用以下方式：

* 打开 https://shaka-player-demo.appspot.com/ 加载一个使用 `Widevine` 的 manifest。
* 打开 http://www.dash-player.com/demo/drm-test-area/，检查是否界面输出 `bitdash uses Widevine in your browser`，然后播放 video。
