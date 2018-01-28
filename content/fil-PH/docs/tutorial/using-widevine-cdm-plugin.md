# Gamit ang Widevine CMD Plugin

Sa Elektron maaari mong gamitin ang Widevine CDM plugin na naipadala sa Chrome browser.

## Pagkuha ng plugin

Ang elektron ay hindi nagpapadala sa Widevine CDM plugin para sa mga dahilan ng lisensya, upang makuha ito, kailangan mong i-install muna ang opisyal na browser ng Chrome, na kailangang tumugma ang arkitektura at Chrome na bersyon ng Elektron na iyong ginagamit.

**Tandaan:** Ang pangunahing bersyon ng Chrome browser ay dapat na pareho sa Chrome sa bersyon na ginamit ng Elektron, kung hindi ang plugin ay hindi gagana kahit na `navigator.plugins ` ay ipapakita na ito ay na-load.

### Windows & macOS

Buksan ang `chrome: //components/` sa browser ng Chrome, hanapin ang `WidevineCdm` at gawing sigurado na napapanahon, pagkatapos ay maaari mong mahanap ang lahat ng mga binaries ng plugin mula sa `APP_DATA/Google/Chrome/WidevineCDM/VERSION/_platform_specific/PLATFORM_ARCH/` direktoryo.

`APP_DATA` ay ang lokasyon ng system para sa pagtatago ng data ng app, sa Windows ito ay `%LOCALAPPDATA%`, sa macOS ito ay `~/Library/Application Support`. `BERSYON` ay Bersyon string ng Widevine CDM plugin, tulad ng `1.4.8.866`. `PLATFORM` ay `mac` o `manalo`. `ARKO` ay `x86` o `x64`.

Sa Windows ang mga kinakailangang binary ay `widevinecdm.dll` at `widevinecdmadapter.dll`, sa macOS ang mga ito ay `libwidevinecdm.dylib ` at `widevinecdmadapter.plugin`. Maaari mong kopyahin ang mga ito sa kahit saan na gusto mo, ngunit sila ay kailangang magkasama.

### Linux

Sa Linux ang binaries ng plugin ay ipinadala nang magkasama sa browser ng Chrome, maaari mong hanapin ang mga ito sa ilalim ng `/opt/google /chrome`, ang mga filename ay `libwidevinecdm.so` at `libwidevinecdmadapter.so`.

## Gamit ang Plugin

Pagkatapos makuha ang mga file ng plugin, dapat mong ipasa sa `widevinecdmadapter`'s path sa may Elektron`--widevine-cdm-path`utos na pag palitin ang linya, at ang bersyon ng plugin na may `--widevine-cdm-bersyon` palit.

<**Tandaan:**Kahit na ang ` widevinecdmadapter ` binary ay ipinasa sa Electron, ang ` widevinecdm ` binary ay dapat na isantabi ito.

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