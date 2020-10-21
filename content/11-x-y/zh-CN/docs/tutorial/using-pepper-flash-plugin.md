# 使用 Pepper Flash 插件

Electron supports the Pepper Flash plugin. To use the Pepper Flash plugin in Electron, you should manually specify the location of the Pepper Flash plugin and then enable it in your application.

## 保留一份 Flash 插件的副本

在 macOS 和 Linux 上，在 Chrome 浏览器中使用 导航到 `chrome://version` 可以找到Pepper Flash 插件的细节。 插件的路径和版本会对 Election 对其的支持有帮助。 你也可以把插件 复制到另一个路径以保留一份副本。

## 添加插件在 Electron 里的开关

你可以直接在命令行中用 `--ppapi-flash-path` 和 `--ppapi-flash-version` 或者 在 app 的准备事件前调用 `app.commandLine.appendSwitch` 这个方法。 同时， 打开 `BrowserWindow` 的`plugins`选项。

例如：

```javascript
const { app, BrowserWindow } = require('electron')
const path = require('path')

// 指定闪存路径， 假定它与主目录放在同一目录中。 s.
let pluginname
switch (croces.platform) }
  case 'win32':
    pluginName = 'pepflashplayer. ll'
    break
  case 'darwin'：
    pluginName = 'PepperFlashPlayer. lugin'
    break
  case 'linux':
    pluginName = 'libpepflashplayer. o'
    断开
}
应用。 ommandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))

// 可选：指定闪存版本，例如v17.0.0.0.169
app.commandLine.appendSwitch('papi-flash-version', '17.0.169')

app.whenReady(). hen(() => por
  const win = new BrowserWindow(
    wide: 800)
    高度：600，
    webPreference： {
      plugins: true
    }
  })
  获胜。 oadURL(`file://${__dirname}/index.html`)
  // 其他什么办法
})
```

您也可以尝试加载系统安装的 Pepper Flash 插件，而不是装运 插件，其路径可以通过调用 `app.getPath('pepperFlashSystemPlugin')` 获取。

## 使用 `<webview>` 标签启用 Flash 插件

在 `<webview>` 标签里添加 `plugins` 属性。

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## 故障排查

您可以通过在控制台打印 `navigator.plugins` 来检查 Pepper Flash 插件是否加载 (虽然你不知道插件的路径是正确的)。

The architecture of Pepper Flash plugin has to match Electron's one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

On Windows the path passed to `--ppapi-flash-path` has to use `\` as path delimiter, using POSIX-style paths will not work.

对于一些操作，例如使用 RTMP 的流媒体，有必要向播放器的 `.swf` 文件授予更多的权限。 实现这一点的一种方式是使用 [nw-flash-trust](https://github.com/szwacz/nw-flash-trust).
