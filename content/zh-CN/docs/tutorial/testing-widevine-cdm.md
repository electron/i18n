# Testing Widevine CDM

In Electron you can use the Widevine CDM library shipped with Chrome browser.

## Getting the library

Open `chrome://components/` in Chrome browser, find `Widevine Content Decryption Module` and make sure it is up to date, then you can find the library files from the application directory.

### Windows 中

The library file `widevinecdm.dll` will be under `Program Files(x86)/Google/Chrome/Application/CHROME_VERSION/WidevineCdm/_platform_specific/win_(x86|x64)/` directory.

### On MacOS

The library file `libwidevinecdm.dylib` will be under `/Applications/Google Chrome.app/Contents/Versions/CHROME_VERSION/Google Chrome Framework.framework/Versions/A/Libraries/WidevineCdm/_platform_specific/mac_(x86|x64)/` directory.

**Note:** Make sure that chrome version used by Electron is greater than or equal to the `min_chrome_version` value of Chrome's widevine cdm component. The value can be found in `manifest.json` under `WidevineCdm` directory.

## Using the library

After getting the library files, you should pass the path to the file with `--widevine-cdm-path` command line switch, and the library's version with `--widevine-cdm-version` switch. The command line switches have to be passed before the `ready` event of `app` module gets emitted.

示例代码：

```javascript
const {app, BrowserWindow} = require('electron')

// You have to pass the directory that contains widevine library here, it is
// * `libwidevinecdm.dylib` on macOS,
// * `widevinecdm.dll` on Windows.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevine_library')
// The version of plugin can be got from `chrome://plugins` page in Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.on('ready', () => {
  win = new BrowserWindow()
  win.show()
})
```

## Verifying Widevine CDM support

To verify whether widevine works, you can use following ways:

* 打开 https://shaka-player-demo.appspot.com/ 加载一个使用 `Widevine` 的 manifest。
* 打开 http://www.dash-player.com/demo/drm-test-area/，检查是否界面输出 `bitdash uses Widevine in your browser`，然后播放 video。