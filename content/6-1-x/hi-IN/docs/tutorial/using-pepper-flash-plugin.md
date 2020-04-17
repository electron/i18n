# पेप्पर फ़्लैश प्लगइन का इस्तेमाल

Electron supports the Pepper Flash plugin. To use the Pepper Flash plugin in Electron, you should manually specify the location of the Pepper Flash plugin and then enable it in your application.

## फ़्लैश प्लगइन की एक कॉपी तैयार करें

On macOS and Linux, the details of the Pepper Flash plugin can be found by navigating to `chrome://flash` in the Chrome browser. उसकी लोकेशन और संस्करण, इलेक्ट्रॉन के पेप्पर फ़्लैश प्लगइन के समर्थन के लिए बहुत उपयोगी है | आप उसे किसी दूसरी लोकेशन पर भी कॉपी कर सकते हैं |

## इलेक्ट्रॉन स्विच जोड़ें

आप `--ppapi-flash-path` और `--ppapi-flash-version` को सीधे ही इलेक्ट्रॉन कमांड लाइन से जोड़ सकते हैं या फ़िर एप्प रेडी इवेंट से पहले `app.commandLine.appendSwitch` मेथड का इस्तेमाल कर सकते हैं| साथ ही, `ब्राउज़रविंडो` के `प्लगइनस` विकल्प को भी चालू कर दें |

उदाहरण के लिए:

```javascript
const { app, BrowserWindow } = require('electron') 
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
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## समस्या निवारण

डेवटूल्स के कंसोल में `नेविगेटर.प्लगइनस` को जाँच कर आप यह पता लगा सकते हैं कि क्या पेप्पर फ़्लैश प्लगइन लोड हुआ था (हालँकि आप यह नहीं पता लगा सकते कि प्लगइन का पथ सही है या नहीं) |

The architecture of Pepper Flash plugin has to match Electron's one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

On Windows the path passed to `--ppapi-flash-path` has to use `\` as path delimiter, using POSIX-style paths will not work.

आरटीएमपी का इस्तेमाल कर मीडिया स्ट्रीम करने जैसे कुछ कामों के लिए, यह ज़रूरी है कि प्लेयर की `.एसडब्यूऍफ़` फाइल्स को व्यापक अनुमतियाँ प्रदान की जायें | इस को पूरा करने का एक तरीका है, [एनडब्यू-फ़्लैश-ट्रस्ट](https://github.com/szwacz/nw-flash-trust) का इस्तेमाल करना।
