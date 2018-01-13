# वाइडवाइन सीडीएम प्लगइन का इस्तेमाल

इलेक्ट्रॉन में आप क्रोम ब्राउज़र के साथ भेजा गया वाइडवाइन सीडीएम प्लगइन इस्तेमाल कर सकते हैं |

## प्लगइन कैसे पायें

लाइसेंस कारणों के कारण इलेक्ट्रॉन, वाइडवाइन सीडीएम प्लगइन के साथ नहीं आता, उसे पाने के लिए आपको पहले आधिकारिक क्रोम ब्राउज़र इनस्टॉल करना होगा, जिसकी बनावट और क्रोम संस्करण इलेक्ट्रॉन की बनावट अनुरूप हो |

**नोट:** क्रोम ब्राउज़र का मुख्य संस्करण इलेक्ट्रॉन के क्रोम संस्करण के अनुरूप होना चाहिये, नहीं तो प्लगइन काम नहीं करेगा, भले ही `नेविगेटर.प्लगइनस` लोड हुआ दिखाये दें |

### विंडोज & मैकओएस

क्रोम ब्राउज़र में `chrome://components/` खोलें, `WidevineCdm` ढूँढेंऔर यह सुनिश्चित करें कि वह अपडेटेड है, और फ़िर आप सभी प्लगइन बाइनरिज़ को `APP_DATA/Google/Chrome/WidevineCDM/VERSION/_platform_specific/PLATFORM_ARCH/` डायरेक्टरी से ढूँढ सकते हैं |

`APP_DATA` सिस्टम का वह स्थान है जहाँ पर एप्प डाटा स्टोर किया जाता है, विंडोज पर यह `%LOCALAPPDATA%` है और मैकओएस पर `~/Library/Application Support` | `VERSION` वाइडवाइन सीडीएम प्लगइन का संस्करण स्ट्रिंग है, जैसे `1.4.8.866` | `PLATFORM` `mac` या `win` है | `ARCH` `x86` या `x64` है |

विंडोज पर `widevinecdm.dll` और `widevinecdmadapter.dll` आवश्यक बाइनरिज़ हैं, और मैकओएस पर वे `libwidevinecdm.dylib` और `widevinecdmadapter.plugin` हैं | आप उन्हें जहाँ चाहें वहाँ पर कॉपी कर सकते हैं, पर वे सभी एक साथ होनी चाहियें |

### लिनक्स

लिनक्स पर प्लगइन बाइनरिज़, क्रोम ब्राउज़र के साथ भेजी जाती हैं, आप उन्हें `/opt/google/chrome` के अंतर्गत ढूँढ सकते हैं, उनके फाइल नाम `libwidevinecdm.so` और `libwidevinecdmadapter.so` हैं |

## प्लगइन का इस्तेमाल करना

प्लगइन फाइल्स पाने के बाद, आपको `वाइडवाइनसीडीएमअडेप्टर` के पथ को `--widevine-cdm-path` कमांड लाइन स्विच, और प्लगइन के संस्करण `--widevine-cdm-version` स्विच के साथ इलेक्ट्रॉन में पास करना चाहिये|

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