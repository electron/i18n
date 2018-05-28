# Paggamit ng ekstensyong Widevine CDM

Sa Elektron maaari mong gamitin ang Widevine CDM plugin na naipadala sa Chrome browser.

## Pagkuha ng plugin

Ang elektron ay hindi nagpapadala sa Widevine CDM plugin para sa mga dahilan ng lisensya, upang makuha ito, kailangan mong i-install muna ang opisyal na browser ng Chrome, na kailangang tumugma ang arkitektura at Chrome na bersyon ng Elektron na iyong ginagamit.

**Tandaan:** Ang pangunahing bersyon ng Chrome browser ay dapat na pareho sa Chrome sa bersyon na ginamit ng Elektron, kung hindi ang plugin ay hindi gagana kahit na `navigator.plugins ` ay ipapakita na ito ay na-load.

### Windows & macOS

Open `chrome://components/` in Chrome browser, find `WidevineCdm` and make sure it is up to date, then you can find all the plugin binaries from the `Program Files(x86)/Google/Chrome/Application/VERSION/WidevineCDM/_platform_specific/PLATFORM_ARCH/` directory.

`APP_DATA` ay ang lokasyon ng system para sa pagtatago ng data ng app, sa Windows ito ay `%LOCALAPPDATA%`, sa macOS ito ay `~/Library/Application Support`. `BERSYON` ay Bersyon string ng Widevine CDM plugin, tulad ng `1.4.8.866`. `PLATFORM` ay `mac` o `manalo`. `ARKO` ay `x86` o `x64`.

Sa Windows ang mga kinakailangang binary ay `widevinecdm.dll` at `widevinecdmadapter.dll`, sa macOS ang mga ito ay `libwidevinecdm.dylib ` at `widevinecdmadapter.plugin`. Maaari mong kopyahin ang mga ito sa kahit saan na gusto mo, ngunit sila ay kailangang magkasama.

### Linux

Sa Linux ang binaries ng plugin ay ipinadala nang magkasama sa browser ng Chrome, maaari mong hanapin ang mga ito sa ilalim ng `/opt/google /chrome`, ang mga filename ay `libwidevinecdm.so` at `libwidevinecdmadapter.so`.

## Gamit ang Plugin

Pagkatapos makuha ang mga file ng plugin, dapat mong ipasa sa `widevinecdmadapter`'s path sa may Elektron`--widevine-cdm-path`utos na pag palitin ang linya, at ang bersyon ng plugin na may `--widevine-cdm-bersyon` palit.

<**Tandaan:**Kahit na ang ` widevinecdmadapter ` binary ay ipinasa sa Electron, ang ` widevinecdm ` binary ay dapat na isantabi ito.

Ang utos ay pagpalitin ang mga linya na kailangang maipasa bago ang `handa`kaganapan ng`app` nakakakuha ang modyul, at ang pahina na gumagamit ng plugin na ito ay dapat na magkaroon ng plugin na gumagana.

Halimbawa ng kodigo:

```javascript
const {app, BrowserWindow} = nangangailangan ('elektron')

// Dapat mong ipasa ang filename ng `widevinecdmadapter` dito, ito ay
// * `widevinecdmadapter.plugin` sa macOS,
// * `libwidevinecdmadapter.so` sa Linux,
// * `widevinecdmadapter.dll` sa Windows.
app.commandLine.appendSwitch ('widevine-cdm-path', '/path/to/widevinecdmadapter.plugin')
// Maaaring makuha ang bersyon ng plugin mula sa pahina ng `chrome: // plugin 'sa Chrome.
app.commandLine.appendSwitch ('widevine-cdm-version', '1.4.8.866')

hayaan ang panalo = null
app.on ('handa', () = > {
  manalo = bagong BrowserWindow ({
    webPreferences: {
      // Ang mga `plugins` ay dapat na gumagana.
      plugins: totoo
    }
  })
  win.show ()
})
```

## Pag-verify ng plugin

Upang ma-verify kung gumagana ang plugin, maaari mong gamitin ang mga sumusunod na paraan:

* Buksan ang devtools at tingnan kung ang `navigator.plugins` ay kinabibilangan ng Widevine CDM plugin.
* Buksan ang https://shaka-player-demo.appspot.com/ at i-load ang manifest na gumagamit ng `Widevine`.
* Buksan ang http://www.dash-player.com/demo/drm-test-area/, tingnan kung ang pahina ay nagsasabing `ginagamit ng bitdash ang Widevine sa iyong browser`, pagkatapos ay i-play ang video.