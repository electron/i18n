# Gamit ang Widevine CMD Plugin

Sa Elektron maaari mong gamitin ang Widevine CDM plugin na naipadala sa Chrome browser.

## Pagkuha ng plugin

Ang elektron ay hindi nagpapadala sa Widevine CDM plugin para sa mga dahilan ng lisensya, upang makuha ito, kailangan mong i-install muna ang opisyal na browser ng Chrome, na kailangang tumugma ang arkitektura at Chrome na bersyon ng Elektron na iyong ginagamit.

**Tandaan:** Ang pangunahing bersyon ng Chrome browser ay dapat na pareho sa Chrome sa bersyon na ginamit ng Elektron, kung hindi ang plugin ay hindi gagana kahit na `navigator.plugins ` ay ipapakita na ito ay na-load.

### Windows & macOS

Buksan ang `chrome: //components/` sa browser ng Chrome, hanapin ang `WidevineCdm` at gawing sigurado na napapanahon, pagkatapos ay maaari mong mahanap ang lahat ng mga binaries ng plugin mula sa `APP_DATA/Google/Chrome/WidevineCDM/VERSION/_platform_specific/PLATFORM_ARCH/` direktoryo.

`APP_DATA` is system's location for storing app data, on Windows it is `%LOCALAPPDATA%`, on macOS it is `~/Library/Application Support`. `VERSION` is Widevine CDM plugin's version string, like `1.4.8.866`. `PLATFORM` is `mac` or `win`. `ARCH` is `x86` or `x64`.

On Windows the required binaries are `widevinecdm.dll` and `widevinecdmadapter.dll`, on macOS they are `libwidevinecdm.dylib` and `widevinecdmadapter.plugin`. You can copy them to anywhere you like, but they have to be put together.

### Linux

On Linux the plugin binaries are shipped together with Chrome browser, you can find them under `/opt/google/chrome`, the filenames are `libwidevinecdm.so` and `libwidevinecdmadapter.so`.

## Using the plugin

After getting the plugin files, you should pass the `widevinecdmadapter`'s path to Electron with `--widevine-cdm-path` command line switch, and the plugin's version with `--widevine-cdm-version` switch.

**Note:** Though only the `widevinecdmadapter` binary is passed to Electron, the `widevinecdm` binary has to be put aside it.

The command line switches have to be passed before the `ready` event of `app` module gets emitted, and the page that uses this plugin must have plugin enabled.

Example code:

```javascript
const {app, BrowserWindow} = require('electron')

// You have to pass the filename of `widevinecdmadapter` here, it is
// * `widevinecdmadapter.plugin` on macOS,
// * `libwidevinecdmadapter.so` on Linux,
// * `widevinecdmadapter.dll` on Windows.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevinecdmadapter.plugin')
// The version of plugin can be got from `chrome://plugins` page in Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      // The `plugins` have to be enabled.
      plugins: true
    }
  })
  win.show()
})
```

## Verifying the plugin

To verify whether the plugin works, you can use following ways:

* Open devtools and check whether `navigator.plugins` includes the Widevine CDM plugin.
* Open https://shaka-player-demo.appspot.com/ and load a manifest that uses `Widevine`.
* Open http://www.dash-player.com/demo/drm-test-area/, check whether the page says `bitdash uses Widevine in your browser`, then play the video.