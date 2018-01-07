# पेप्पर फ़्लैश प्लगइन का इस्तेमाल

इलेक्ट्रॉन पेप्पर फ़्लैश प्लगइन का समर्थन करता है | इलेक्ट्रॉन में पेप्पर फ़्लैश प्लगइन इस्तेमाल करने के लिए, आपको पेप्पर फ़्लैश प्लगइन की लोकेशन मैन्युअली निर्दिष्ट करनी होगी और फिर उसे अपनी एप्लीकेशन में शुरू करना होगा |

## फ़्लैश प्लगइन की एक कॉपी तैयार करें

मैकओएस और लिनक्स पर, पेप्पर फ़्लैश प्लगइन का विवरण क्रोम ब्राउज़र में `chrome://plugins` पर जाकर पाया जा सकता है | उसकी लोकेशन और संस्करण, इलेक्ट्रॉन के पेप्पर फ़्लैश प्लगइन के समर्थन के लिए बहुत उपयोगी है | आप उसे किसी दूसरी लोकेशन पर भी कॉपी कर सकते हैं |

## इलेक्ट्रॉन स्विच जोड़ें

आप `--ppapi-flash-path` और `--ppapi-flash-version` को सीधे ही इलेक्ट्रॉन कमांड लाइन से जोड़ सकते हैं या फ़िर एप्प रेडी इवेंट से पहले `app.commandLine.appendSwitch` मेथड का इस्तेमाल कर सकते हैं| साथ ही, `ब्राउज़रविंडो` के `प्लगइनस` विकल्प को भी चालू कर दें |

उदाहरण के लिए:

```javascript
const {app, BrowserWindow} = require('electron') 
const path = require('path') 

// फ़्लैश पथ निर्दिष्ट करें, यह मान कर कि वह मेन.जेएस के साथ उसी डायरेक्टरी में है |
let pluginName 
switch (process.platform) {   
 case 'win32':
     pluginName = 'pepflashplayer.dll'
     break
   case 'darwin':
     pluginName = 'PepperFlashPlayer.plugin'
     break
   case 'linux':
     pluginName = 'libpepflashplayer.so'
     break
 }
 app.commandLine.appendSwitch('ppapi-flash-path',
 path.join(__dirname, pluginName))

 // वैकल्पिक: फ़्लैश संस्करण निर्दिष्ट करें, जैसे कि, v17.0.0.169 app.commandLine.appendSwitch('ppapi-flash-version', '17.0.0.169')

 app.on('ready', () => {
   let win = new BrowserWindow({
     width: 800,
     height: 600,
     webPreferences: {
       plugins: true
     }
   })
   win.loadURL(`file://${__dirname}/index.html`)
   // और कुछ
 })
```

प्लगइनस खुद पहुँचाने की बजाये, आप चाहे तो सिस्टम वाइड पेप्पर फ़्लैश प्लगइन भी लोड कर सकते हैं, उसका पथ आपको `app.getPath('pepperFlashSystemPlugin')` बुला कर मिल जायेगा |

## `<webview>` टैग में पेप्पर फ़्लैश प्लगइन चालू करें

`प्लगइनस` एट्रिब्यूट को `<webview>` टैग से जोड़ें |

```html
<webview src="http://www.adobe.com/software/flash/about/" plugins></webview>
```

## समस्या निवारण

You can check if Pepper Flash plugin was loaded by inspecting `navigator.plugins` in the console of devtools (although you can't know if the plugin's path is correct).

The architecture of Pepper Flash plugin has to match Electron's one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

On Windows the path passed to `--ppapi-flash-path` has to use `` as path delimiter, using POSIX-style paths will not work.

For some operations, such as streaming media using RTMP, it is necessary to grant wider permissions to players’ `.swf` files. One way of accomplishing this, is to use [nw-flash-trust](https://github.com/szwacz/nw-flash-trust).