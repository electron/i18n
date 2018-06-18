# 使用 Widevine CDM 插件

在 Electron 中，你可以使用 Widevine CDM 插件装载 Chrome 浏览器。

## 获取插件

Electron 没有为 Widevine CDM 插件配置许可 reasons，为了获得它，首先需要安装官方的 Chrome 浏览器，这匹配了体系架构和 Electron 构建使用的 Chrome 版本。

**注意：** Chrome 浏览器的主要版本必须和 Electron 使用的版本一样，否则插件不会有效，虽然 `navigator.plugins` 会显示你已经安装了它。

### Windows & macOS

在 Chrome 浏览器中打开 `chrome://components/`，找到 `WidevineCdm` 并且确定它更新到最新版本，然后你可以从 `APP_DATA/Google/Chrome/WidevineCDM/VERSION/_platform_specific/PLATFORM_ARCH/` 路径找到所有的插件二进制文件。

`APP_DATA` 是系统存放数据的地方，在 Windows 上它是 `%LOCALAPPDATA%`，在 macOS 上它是 `~/Library/Application Support`. `VERSION` 是 Widevine CDM 插件的版本字符串，类似 `1.4.8.866`. `PLATFORM` 是 `mac` 或 `win`. `ARCH` 是 `x86` 或 `x64`。

在 Windows，必要的二进制文件是 `widevinecdm.dll` and `widevinecdmadapter.dll`，在 macOS，它们是 `libwidevinecdm.dylib` 和 `widevinecdmadapter.plugin`。 你可以将它们复制到任何你喜欢的地方，但是它们必须要放在一起。

### Linux

在 Linux，Chrome 浏览器将插件的二进制文件装载在一起，你可以在 `/opt/google/chrome` 下找到，文件名是 `libwidevinecdm.so` 和 `libwidevinecdmadapter.so`。

## 使用插件

在获得了插件文件后，你可以使用 `--widevine-cdm-path` 命令行开关来将 `widevinecdmadapter` 的路径传递给 Electron ，插件版本使用 `--widevine-cdm-version` 开关.

**注意:** 虽然只有 `widevinecdmadapter` 的二进制文件传递给了 Electron，`widevinecdm` 二进制文件应当放在它的旁边。

必须在 `app` 模块的 `ready` 事件触发之前使用命令行开关，并且 page 使用的插件必须激活。

示例代码：

```javascript
const {app, BrowserWindow} = require('electron')

// 这里你必须传入 `widevinecdmadapter` 的文件名, 它是
// * 在 macOS 上 `widevinecdmadapter.plugin`,
// * 在 Linux 上 `libwidevinecdmadapter.so`,
// * 在 Windows 上 `widevinecdmadapter.dll`.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevinecdmadapter.plugin')
// 插件版本可以从 Chrome 浏览器的 `chrome://plugins` 页面获得。
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      // 这里的 `plugins` 需要启用
      plugins: true
    }
  })
  win.show()
})
```

## 验证插件

为了验证插件是否工作，你可以使用下面的方法：

* 打开开发者工具查看 `navigator.plugins` 是否包含了 Widevine CDM 插件。
* 打开 https://shaka-player-demo.appspot.com/ 加载一个使用 `Widevine` 的 manifest。
* 打开 http://www.dash-player.com/demo/drm-test-area/，检查是否界面输出 `bitdash uses Widevine in your browser`，然后播放 video。